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
  let node = '';

  if (typeof tree === 'object') {
    node = renderer.create(tree.type);

    const blackList = {
      children: true,
      type: true,
    };

    Object.entries(tree).forEach(([prop, val]) => {
      if (blackList[prop]) return;

      if (prop === 'style') {
        Object.entries(val).forEach(([styleProp, styleVal]) => {
          node.style[styleProp] = styleVal;
        });
      } else {
        node[prop] = val;
      }
    });

    if (Array.isArray(tree.children)) {
      tree.children.forEach(child => treeMaker(node, child, renderer));
    }
  } else {
    node = renderer.createText(tree);
  }

  renderer.append(soil, node);
};

const root = document.getElementById('root');

treeMaker(root, ourTree, DOMRenderer);
