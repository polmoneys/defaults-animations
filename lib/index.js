/**
 * React Animations 🎡 🎢 🎠
 * @polmoneys  #2020#
 * version 1.0.0
 * port of this fab post https://dassur.ma/things/raf-promise/
 */

/* eslint-disable*/

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

const lerp = (x, y, a) => x * (1 - a) + y * a;
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));

/**
 * 
 * What number is 35% between 56 and 132? lerp(56, 132, 0.35)

const howFar = invlerp(
  position.top - window.innerHeight,
  position.bottom,
  window.scrollY
);

 * Converts a value from one data range to another.
      const howFar = range(
        position.top - window.innerHeight,
        position.bottom,
        -20,
        20,
        window.scrollY
      );
 */