/* eslint-disable*/

// port of this fab post https://dassur.ma/things/raf-promise/

function transitionEndPromise(element, prop) {
  return new Promise(resolve => {
    const node = element.current;
    node.addEventListener("transitionend", function f(event) {
      if (event.target !== node) return;
      node.removeEventListener("transitionend", f);
      resolve();
    });
  });
}

function timeline() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}

function animate(element, stylz, prop) {
  Object.assign(element.current.style, stylz);
  return transitionEndPromise(element, prop).then(()=> timeline());
}

export { animate, timeline };
