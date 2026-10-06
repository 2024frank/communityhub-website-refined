/** Wheel events have no physical contact/end signal. Keep momentum owned, but
 * recognize renewed acceleration as well as deliberate counter-swipes. Thresholds are
 * engineering heuristics, not a claim about any particular input device. */
export type WheelDecision = { kind: "native" | "consume" } | { kind: "step"; direction: number };
export class WheelGesture {
  private last = -Infinity;
  private owner: "page" | "native" | null = null;
  private direction = 0;
  private intent = 0;
  private reversed = 0;
  private started = -Infinity;
  private peak = 0;
  private previous = 0;
  private falling = 0;
  private valley = Infinity;
  private renewed = 0;
  private renewedAt = -Infinity;
  private startBurst(magnitude: number) {
    this.peak = this.previous = magnitude;
    this.falling = this.renewed = 0;
    this.valley = Infinity;
    this.renewedAt = -Infinity;
  }
  reset() {
    this.last = -Infinity;
    this.owner = null;
    this.direction = 0;
    this.intent = this.reversed = 0;
    this.started = -Infinity;
    this.startBurst(0);
  }
  next(delta: number, time: number, canScroll: boolean): WheelDecision {
    if (!Number.isFinite(delta) || !Number.isFinite(time))
      return { kind: "consume" };
    if (time - this.last > 260 || time < this.last) this.reset();
    this.last = time;
    const direction = Math.sign(delta), magnitude = Math.abs(delta);
    if (this.owner && direction === this.direction) {
      // A second finger stroke can arrive while the previous stroke is still
      // coasting. Require decay followed by two substantial renewed samples:
      // initial acceleration, small rebounds and lone outliers stay one gesture.
      const accelerating = Number.isFinite(this.valley) && time - this.started >= 80
        && magnitude >= Math.max(12, this.valley * 2.5);
      if (accelerating && this.renewed && time - this.renewedAt <= 80
          && magnitude >= this.renewed * .75) {
        this.owner = null;
        this.intent = this.renewed;
        this.reversed = 0;
        this.startBurst(magnitude);
      } else {
        this.renewed = accelerating ? magnitude : 0;
        this.renewedAt = time;
        this.peak = Math.max(this.peak, magnitude);
        if (magnitude < this.previous) this.falling++;
        if (this.falling >= 2 && magnitude <= this.peak * .5)
          this.valley = Math.min(this.valley, magnitude);
        this.previous = magnitude;
      }
    }
    if (magnitude < 1) {
      if (this.owner !== "page" && canScroll) {
        if (!this.owner) { this.owner = "native"; this.direction = direction; this.started = time; this.startBurst(magnitude); }
        return { kind: "native" };
      }
      return { kind: "consume" };
    }
    if (this.owner && direction !== this.direction) {
      // Tiny sign jitter is not a new intention. A meaningful opposite stroke
      // cancels the old directional burst instead of waiting out its inertia.
      if (magnitude >= 4) this.reversed += magnitude;
      if (this.reversed >= 40 && time - this.started >= 70) {
        this.owner = null;
        this.direction = direction;
        this.intent = this.reversed;
        this.reversed = 0;
        this.startBurst(magnitude);
      } else return { kind: this.owner === "native" && canScroll ? "native" : "consume" };
    } else this.reversed = 0;
    if (this.owner === "page") return { kind: "consume" };
    if (this.owner === "native") return { kind: canScroll ? "native" : "consume" };
    if (canScroll) {
      this.owner = "native";
      this.direction = direction;
      this.started = time;
      this.intent = 0;
      this.startBurst(magnitude);
      return { kind: "native" };
    }
    if (direction !== this.direction) { this.direction = direction; this.intent = 0; }
    this.intent += magnitude;
    if (this.intent < 28) return { kind: "consume" };
    this.owner = "page";
    this.started = time;
    this.intent = 0;
    this.startBurst(magnitude);
    return { kind: "step", direction };
  }
}
