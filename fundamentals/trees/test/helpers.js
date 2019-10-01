const simulateClick = function(elem) {
  // Create our event (with options)
  var evt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
};

module.exports = { simulateClick };
