/** Intersection alone does not establish visibility: inactive products occupy
 * the same CSS grid cell. Keep network activation tied to actual ownership. */
export function shouldLoadDeferredFrame(state:{loaded:boolean;inactive:boolean;visibility:string;width:number;height:number;top:number;bottom:number}, viewportHeight:number):boolean {
 return !state.loaded && !state.inactive && state.visibility !== 'hidden' && state.visibility !== 'collapse'
  && state.width > 0 && state.height > 0 && state.bottom > 0 && state.top < viewportHeight;
}

/** The published deck owns playback; respect reduced motion before loading it. */
export function deferredFrameSource(source:string, originalPresentation:boolean, reducedMotion:boolean):string {
 return originalPresentation && reducedMotion ? source.replace(/([?&])start=true(?=&|$)/, "$1start=false") : source;
}
