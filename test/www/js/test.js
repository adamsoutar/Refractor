"use strict";
var _templateObject = _taggedTemplateLiteral(["world"], ["world"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var getAlertText = function getAlertText(name) {
  return "Hello, " + name + "!";
};
window.alert(getAlertText(_templateObject));
