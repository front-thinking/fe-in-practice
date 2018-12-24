var utils = {};

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
                                     window.mozRequestAnimationFrame ||
                                     window.oRequestAnimationFrame ||
                                     window.msRequestAnimationFrame ||
                                     function (callback) {
                                         return window.setTimeout(callback, 1000/60)
                                     });
}

utils.captureMouse = function (element) {
  var mouse = {x: 0, y: 0};

  element.addEventListener('mousemove', function (e) {
      var x, y;
      if (e.pageX || e.pageY) {
          x = e.pageX;
          y = e.pageY;
      } else {
          x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      x -= element.offsetLeft;
      y -= element.offsetTop;
      mouse.x = x;
      mouse.y = y;
  }, false);
  return mouse;
};

utils.captureTouch = function (element) {
  var touch = {x: null, y: null, isPressed: false};

  element.addEventListener('touchstart', function (e) {
      touch.isPressed = true;
  }, false);

  element.addEventListener('touchend', function (e) {
      touch.isPressed = false;
      touch.x = null;
      touch.y = null;
  });

  element.addEventListener('touchmove', function (e) {
      var x, y, touch_event = e.touches[0];
      if (touch_event.pageX || touch_event.pageY) {
          x = touch_event.pageX;
          y = touch_event.pageY;
      } else {
          x = touch_event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          y = touch_event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      x -= element.offsetLeft;
      y -= element.offsetTop;
      touch.x = x;
      touch.y = y;
  }, false);

    return touch;

};
