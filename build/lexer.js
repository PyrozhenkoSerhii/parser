"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _tokens = require("./tokens");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var isDivider = function isDivider(_char) {
  var dividerRegex = /(\n|\s+|\t)/;
  return dividerRegex.test(_char);
};

var lexer = function () {
  var code = _fs["default"].readFileSync(process.env.FILE_PATH || '../tests/test1.lang').toString();

  var lines = code.split("\n").map(function (line) {
    return "".concat(line, "\n");
  });
  var sequenceList = [];
  lines.forEach(function (line, lineIndex) {
    var buffer = '';

    _toConsumableArray(line).forEach(function (_char2) {
      if (_tokens.tokens.SEMICOLON.test(_char2)) {
        sequenceList.push({
          line: lineIndex,
          value: buffer
        });
        sequenceList.push({
          line: lineIndex,
          value: _char2
        });
        buffer = '';
      } else if (!isDivider(_char2)) {
        buffer = "".concat(buffer).concat(_char2);
      } else {
        if (buffer) {
          sequenceList.push({
            line: lineIndex,
            value: buffer
          });
          buffer = '';
        }
      }
    });
  });
  var foundTokens = [];
  sequenceList.forEach(function (sequence) {
    var matchedToken = '';
    Object.entries(_tokens.tokens).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          tokenId = _ref2[0],
          tokenRegex = _ref2[1];

      if (tokenRegex.test(sequence.value)) {
        matchedToken = tokenId;
      }
    });
    foundTokens.push({
      line: sequence.line,
      type: matchedToken || "SyntaxError: Unexpected indentifier",
      lexeme: sequence.value
    });
  });
  console.table(foundTokens);
}();
//# sourceMappingURL=lexer.js.map