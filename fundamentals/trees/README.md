## 🌳🌳🌳 Trees 🌳🌳🌳

### Goals
_torture, mostly._ I jest. (you'll get that pun later).

The point of this workshop is to take a break from HTML/CSS, and jump into some implementation of the concepts behind the things we do. HTML is a tree structure.

![HTML as a Tree](http://web.simmons.edu/~grabiner/comm244/weekfour/tree.gif)

In the image above we can see that we could sketch a tree out of our HTML! The goal of today is **specifically to not use HTML**, and to instead, re-implement how HTML goes about parsing our tree structure (_that we spell out as XML_) by using a JS object to represent our DOM tree, and to write our own rendering logic. We have wrapped the `document` rendering methods with an object for your utility, this is to demonstrate that we could in fact replace those API's with any rendering logic and it should work as long as it is a tree structure!

### Some Caveats

You might notice that in `trees.js` we provide the following code:

```javascript
const DOMRenderer = {
  append: (node, child) => node.appendChild(child),
  create: type => document.createElement(type),
  createText: str => document.createTextNode(str),
  remove: el => el.parentNode.removeChild(el),
};
```

This is meant to be used as part of your `treeMaker` logic. Lets say, for some reason, you knew that part of consuming the DOM and building apage involved `create`, well, then in `treeMaker` you might use it.

```javascript
const treeMaker = (soil, tree, renderer) => {
    // Super beautiful code written by Eliot...
    const div = renderer.create('div');
    // etc.
}
```

### Instructions
1. `cd ?/1909-Flex/fundamentals/trees`
2. `npm i`
3. `npm run test-watch`

🎉 Now you'll have a bunch of failing tests!

My advice is to start by sketching out the object described in the first test as a `red box` in the file `1909-Flex/fundamentals/trees/test/trees.test.js`. You should be sketching this out in `ourTree` as a JS object.

Once you have the `redBox`, it is time to start working on the `treeMaker` function, that should be able to render that `redBox` to the DOM. Do not use the actual HTML file! That will immediately fail the test.
