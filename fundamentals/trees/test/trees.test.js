'use strict';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');

// jest and jsdom don't play nice with each other so we have to
// inject the html and script into our mock as strings
const htmlString = fs
  .readFileSync(path.join(__dirname, '..', 'trees.html'))
  .toString();

const scriptString = fs
  .readFileSync(path.join(__dirname, '..', 'trees.js'))
  .toString();

const domOptions = { runScripts: 'dangerously' };
const dom = new JSDOM(htmlString, domOptions);

const { document } = dom.window;

const DOMRenderer = {
  append: (node, child) => node.appendChild(child),
  create: type => document.createElement(type),
  createText: str => document.createTextNode(str),
  remove: el => el.parentNode.removeChild(el),
};

const body = document.querySelector('body');
const scriptEl = document.createElement('script');
scriptEl.innerHTML = scriptString;
body.appendChild(scriptEl);

describe('dont touch the html', () => {
  test('trees.html should remain unchanged', () => {
    expect(htmlString).toMatchSnapshot();
  });
});

describe('the website should render correctly', () => {
  const root = document.getElementById('root');
  const redBox = root.childNodes[0];
  test('the root div should only have one child, a red box, with some style', () => {
    const redBoxStyles = Object.values(redBox.style);

    expect(root.childNodes.length).toEqual(1);
    expect(redBox.nodeName).toBe('DIV');
    expect(redBoxStyles).toEqual(
      expect.arrayContaining([
        'background-color',
        'width',
        'min-height',
        'border',
      ]),
    );
    expect(redBox.style).toEqual(
      expect.objectContaining({ backgroundColor: 'red' }),
    );
  });

  let rbButton;
  let greenBox;

  test('the red box should contain a span element with text, a button, and a styled green box', () => {
    const redBoxChildren = Array.from(redBox.childNodes);
    expect(redBoxChildren.length).toBe(3);

    const redBoxChildNodes = redBoxChildren.map(({ nodeName }) => nodeName);

    expect(redBoxChildNodes).toEqual(
      expect.arrayContaining(['BUTTON', 'DIV', 'SPAN']),
    );

    const rbSpan = redBoxChildren.find(child => child.nodeName === 'SPAN');
    rbButton = redBoxChildren.find(child => child.nodeName === 'BUTTON');
    greenBox = redBoxChildren.find(child => child.nodeName === 'DIV');

    expect(rbSpan.innerHTML).toEqual('hello there');
    expect(rbButton.firstChild.nodeValue).toEqual(
      expect.stringContaining('click me'),
    );

    const greenBoxStyles = Object.values(greenBox.style);

    expect(greenBoxStyles).toEqual(
      expect.arrayContaining(['background-color', 'height', 'width', 'border']),
    );
    expect(greenBox.style.backgroundColor).toEqual('green');
  });

  test('the button should have an onclick handler that logs the event target and target name', () => {
    // inject custom console log function and
    // grab the console.log outputs from the click handler
    const consoleOutputs = [];
    const originalLog = global.console.log;
    function mockLog(outputLogs, ...output) {
      if (output.length === 1) outputLogs.push(output[0]);
      else if (output.every(el => typeof el === 'string')) {
        consoleOutputs.push(output.join(''));
      } else {
        outputLogs.push(output);
      }
    }
    global.console.log = mockLog.bind(null, consoleOutputs);

    rbButton.click();

    expect(consoleOutputs).toEqual(
      expect.arrayContaining([rbButton, `${rbButton.name} was clicked.`]),
    );

    // restore original console log functionality
    global.console.log = originalLog;
  });

  let yellowBox;

  test('the green box should contain some text and a styled yellow box', () => {
    const gbChildren = Array.from(greenBox.childNodes);
    const gbChildNodes = gbChildren.map(node => node.nodeName);

    expect(gbChildNodes).toEqual(expect.arrayContaining(['#text', 'DIV']));

    const gbText = greenBox.textContent;
    expect(gbText).toEqual('im a green box');

    yellowBox = gbChildren.find(({ nodeName }) => nodeName === 'DIV');
    const ybStyles = Object.values(yellowBox.style);

    expect(ybStyles).toEqual(
      expect.arrayContaining([
        'display',
        'flex-direction',
        'justify-content',
        'align-items',
        'width',
        'height',
        'background-color',
      ]),
    );
    expect(yellowBox.style.backgroundColor).toEqual('yellow');
  });

  test('the yellow box should contain two colored boxes', () => {
    const ybChildren = Array.from(yellowBox.childNodes);
    expect(ybChildren.length).toBe(2);
    ybChildren.forEach(child => {
      const styles = Object.values(Array.from(child.style));
      expect(child.nodeName).toBe('DIV');
      expect(styles).toEqual(
        expect.arrayContaining(['background-color', 'width', 'height']),
      );
    });
  });

  test('You actually wrote this as a javascript object and didnt cheat by just using create and append', () => {
    const counts = {};
    const typeMap = {
      div: true,
      span: true,
      button: true,
    };

    const recurseTypes = (obj) => {
      Object.values(obj).forEach(val => {
        if (typeof val === 'object') {
          recurseTypes(val);
        } else if (typeof val === 'string' && typeMap[val]) {
          counts[val] ? ++counts[val] : counts[val] = 1;
        }
      })
    };

    recurseTypes(dom.window.ourTree);

    expect(counts).toEqual(
      expect.objectContaining({
        div: 5,
        span: 1,
        button: 1,
      })
    )
  });
});
