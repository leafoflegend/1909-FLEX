## Stretch Two
### Tell Me About It

```javascript
const aynRand = {
  faith: false,
  religion: false,
  reason: true,
  objectivism: true,
};

const galileoGalilei = {
  faith: true,
  religion: true,
  reason: true,
  gravity: true,
};

const tellMeAboutIt = someObject => {
  // YOUR CODE
};

const talkativeAynRand = tellMeAboutIt(aynRand);
const talkativeGalileoGalilei = tellMeAboutIt(galileoGalilei);

talkativeAynRand.tellMeAboutIt(); // => "I believe in: reason, objectivism"
talkativeGalileoGalilei.tellMeAboutIt(); // => "I believe in: faith, religion, reason, gravity"
```
