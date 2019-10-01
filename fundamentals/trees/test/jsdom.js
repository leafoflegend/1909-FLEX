const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');

const html = fs
  .readFileSync(path.join(__dirname, '..', 'trees.html'))
  .toString();

const scriptString = fs
  .readFileSync(path.join(__dirname, '..', 'trees.js'))
  .toString();

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
});

const { document } = dom.window;

const body = document.querySelector('body');
const scriptEl = document.createElement('script');
scriptEl.innerHTML = scriptString;
body.appendChild(scriptEl);
document.addEventListener('DOMContentLoaded', () => {
  // We need to delay one extra turn because we are the first DOMContentLoaded listener,
  // but we want to execute this code only after the second DOMContentLoaded listener
  // (added by external.js) fires.
  setImmediate(() => {
    console.log(document.body.innerHTML);
  });
});
