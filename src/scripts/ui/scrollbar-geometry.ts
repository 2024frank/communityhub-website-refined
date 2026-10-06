/** Geometry shared by pointer dragging and the visible thumb. */
export function scrollbarGeometry(viewport: number, content: number, track: number, offset: number) {
 const maximum = Math.max(0, content - viewport);
 const length = Math.max(0, track);
 const thumb = Math.min(length, Math.max(44, content > 0 ? length * viewport / content : length));
 const travel = length - thumb;
 const position = maximum > 0 ? Math.max(0, Math.min(maximum, offset)) / maximum * travel : 0;
 return { maximum, thumb, travel, position };
}
export function scrollOffsetAt(position: number, maximum: number, travel: number) {
 return travel > 0 ? Math.max(0, Math.min(travel, position)) / travel * maximum : 0;
}
