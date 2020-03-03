## beautifulDefaults/animations

> our requirements are more modest but at the same time more responsible: buildings,furniture,drinking glasses may well be consumer items that we can destroy without regret after they have served for some short or long period,but while we use them we expect them to fullfill their role and serve us perfectly, so perfectly that we can also derive aesthetic enjoyment from observing them in use.

- Mr Asplund on 'Swedish Grace'

🎡 🎢 🎠 [StoryBook with source code](https://polmoneys.github.io/defaults-animations/)

## Why

Animations surround us, we should have a 'native' way to play with them. The gist is to use promises, RAF and transitionend events to chain animations and provide sync callbacks. It all started with this fab [post](https://dassur.ma/things/raf-promise/). It runs on JavaScript and in passing a **ref** also in React. So much power in so little code, a beautiful default.

Polyfill as necessary, you might do/may wanna do it anyways. 

## Use

**Transitionend** event fires for **ALL** animated props. First thing to finish will resolve the promise, that's quite a limitation, either create multiple timelines, give elements multiple css transition declarations or give me some time to figure out a better way.

```javascript

    // define your refs, array them for convenience (example below)
    let shapeA = useRef();
    let shapeB = useRef();
    let shapeC = useRef();
    let shapeD = useRef();
    let allShapes = useRef([]);

    .timeline() // chain with .then all states to timeline
    .then(() => animate(shapeA, {
                transform: "scale(1.1) translate(10px,10px)"
                })
    )  // animated a shape
    .then( ()=> Promise.all(
                    allShapes.current.map(s => animate(s,
                    {opacity:0}))
                )
    )  // animated a bunch of shapes
    .then( ()=> {
        console.log('timeline ends')
      }
    )  // cb, toggle state etc...

```
