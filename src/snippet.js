function scrollToTop(scrollDuration) {
  var cosParameter = window.scrollY / 2,
    scrollCount = 0,
    oldTimestamp = performance.now();
  function step(newTimestamp) {
    scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
    if (scrollCount >= Math.PI) window.scrollTo(0, 0);
    if (window.scrollY === 0) return;
    window.scrollTo(
      0,
      Math.round(cosParameter + cosParameter * Math.cos(scrollCount))
    );
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}
/* 
  Explanations:
  - pi is the length/end point of the cosinus intervall (see above)
  - newTimestamp indicates the current time when callbacks queued by requestAnimationFrame begin to fire.
    (for more information see https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
  - newTimestamp - oldTimestamp equals the duration

    a * cos (bx + c) + d                      | c translates along the x axis = 0
  = a * cos (bx) + d                          | d translates along the y axis = 1 -> only positive y values
  = a * cos (bx) + 1                          | a stretches along the y axis = cosParameter = window.scrollY / 2
  = cosParameter + cosParameter * (cos bx)    | b stretches along the x axis = scrollCount = Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
  = cosParameter + cosParameter * (cos scrollCount * x)
*/

scrollToEnd = (scrollDuration, scrollDirection) => {
  let cosParameter = this.tabBlockHeaderEl.scrollX / 2;
  let scrollCount = 0;
  let oldTimestamp = performance.now();

  function step(newTimestamp) {
    scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));

    if (scrollCount >= Math.PI) this.tabBlockHeaderEl.scrollLeft(0);

    if (this.tabBlockHeaderEl.scrollX === 0) return;

    this.tabBlockHeaderEl.scrollLeft(
      Math.round(cosParameter + cosParameter * Math.cos(scrollCount))
    );

    oldTimestamp = newTimestamp;

    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
};
