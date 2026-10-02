/** Wheel events have no physical contact/end signal. Keep each directional
 * burst owned, but let a deliberate counter-swipe cancel it. Thresholds are
 * engineering heuristics, not a claim about any particular input device. */
export type WheelDecision = { kind: "native" | "consume" } | { kind: "step"; direction: number };
export class WheelGesture {
  private last = -Infinity;
  private owner: "page" | "native" | null = null;
  private direction = 0;
  private intent = 0;
  private reversed = 0;
  private started = -Infinity;
  reset() {
    this.last = -Infinity;
    this.owner = null;
    this.direction = 0;
    this.intent = this.reversed = 0;
    this.started = -Infinity;
  }
  next(delta: number, time: number, canScroll: boolean): WheelDecision {
    if (!Number.isFinite(delta) || !Number.isFinite(time))
      return { kind: "consume" };
    if (time - this.last > 260 || time < this.last) this.reset();
    this.last = time;
    const direction = Math.sign(delta), magnitude = Math.abs(delta);
    if (magnitude < 1) {
      if (this.owner !== "page" && canScroll) {
        if (!this.owner) { this.owner = "native"; this.direction = direction; this.started = time; }
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
      } else return { kind: this.owner === "native" && canScroll ? "native" : "consume" };
    } else this.reversed = 0;
    if (this.owner === "page") return { kind: "consume" };
    if (this.owner === "native") return { kind: canScroll ? "native" : "consume" };
    if (canScroll) {
      this.owner = "native";
      this.direction = direction;
      this.started = time;
      this.intent = 0;
      return { kind: "native" };
    }
    if (direction !== this.direction) { this.direction = direction; this.intent = 0; }
    this.intent += magnitude;
    if (this.intent < 28) return { kind: "consume" };
    this.owner = "page";
    this.started = time;
    this.intent = 0;
    return { kind: "step", direction };
  }
}
