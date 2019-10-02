// Our representation of the DOM as a JS object.
const root = document.getElementById('root');

const ourTree = {
  // YOUR CODE
};

const DOMRenderer = {
  append: (node, child) => node.appendChild(child),
  create: type => document.createElement(type),
  createText: str => document.createTextNode(str),
  remove: el => el.parentNode.removeChild(el),
};

// The function that uses the rendering API object above (DOMRenderer) to build the page as expected!
const treeMaker = (soil, tree, renderer) => {
  // YOUR CODE
};

// DONT TOUCH BELOW
treeMaker(root, ourTree, DOMRenderer);

window.treeMaker = treeMaker;
window.ourTree = ourTree;
window.DOMRenderer = DOMRenderer;
