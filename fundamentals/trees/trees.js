const ourTree = {
  type: 'div',
  style: {
    ['background-color']: 'red',
    border: 'solid 1px black',
    width: '100%',
    ['min-height']: '3em',
  },
  children: [
    {
      type: 'span',
      innerHTML: 'hello there',
    },
    {
      type: 'button',
      name: 'the-button',
      onclick: ev => {
        console.log(ev.target);
        console.log(ev.target.name, ' was clicked.');
      },
      children: ['click me plz'],
    },
    {
      type: 'div',
      name: 'green-div',
      style: {
        ['background-color']: 'green',
        height: '250px',
        width: '500px',
        border: 'solid 1px lightgreen',
      },
      children: [
        'im a green box',
        {
          type: 'div',
          style: {
            height: '100px',
            width: '500px',
            display: 'flex',
            ['flex-direction']: 'row',
            ['justify-content']: 'flex-start',
            ['align-items']: 'center',
            ['background-color']: 'yellow',
          },
          children: [
            {
              type: 'div',
              style: {
                ['background-color']: 'blue',
                width: '100px',
                height: '100px',
              },
            },
            {
              type: 'div',
              style: {
                ['background-color']: 'lightblue',
                width: '100px',
                height: '100px',
              },
            },
          ],
        },
      ],
    },
  ],
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
