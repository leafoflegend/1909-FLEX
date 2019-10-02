const ourTree = {
  // YOUR CODE HERE
};

const DOMRenderer = {
  append: (node, child) => node.appendChild(child),
  create: type => document.createElement(type),
  createText: str => document.createTextNode(str),
  remove: el => el.parentNode.removeChild(el),
};

const treeMaker = (soil, tree, renderer) => {
  // YOUR CODE HERE
};

const root = document.getElementById('root');

treeMaker(root, ourTree, DOMRenderer);
