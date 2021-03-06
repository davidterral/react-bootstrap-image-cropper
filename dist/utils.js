"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createImageDomFromUrl = createImageDomFromUrl;
exports.limitImageSize = limitImageSize;
exports.getCroppedFile = getCroppedFile;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// 以下工具部分复制自 https://codesandbox.io/s/q8q1mnr01w
// 略有修改
function createImageDomFromUrl(_x) {
  return _createImageDomFromUrl.apply(this, arguments);
}

function _createImageDomFromUrl() {
  _createImageDomFromUrl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var image = new Image();
              image.addEventListener("load", function () {
                return resolve(image);
              });
              image.addEventListener("error", function (error) {
                return reject(error);
              });
              image.src = url;
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createImageDomFromUrl.apply(this, arguments);
}

function limitImageSize(_x2) {
  return _limitImageSize.apply(this, arguments);
}
/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {string} imageUrl - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @param {string} mimeType
 * @param {number} quality
 */


function _limitImageSize() {
  _limitImageSize = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
    var imageUrl, maxWidth, maxHeight, mimeType, quality, image, _limitSize, width, height, canvas, ctx;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            imageUrl = _ref.imageUrl, maxWidth = _ref.maxWidth, maxHeight = _ref.maxHeight, mimeType = _ref.mimeType, quality = _ref.quality;
            _context2.next = 3;
            return createImageDomFromUrl(imageUrl);

          case 3:
            image = _context2.sent;

            if (!(image.width <= maxWidth && image.height <= maxHeight)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", imageUrl);

          case 6:
            _limitSize = limitSize(image.width, image.height, maxWidth, maxHeight), width = _limitSize.width, height = _limitSize.height;
            canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, width, height);
            return _context2.abrupt("return", canvas.toDataURL(mimeType, quality));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _limitImageSize.apply(this, arguments);
}

function getCroppedFile(_x3, _x4, _x5, _x6, _x7, _x8) {
  return _getCroppedFile.apply(this, arguments);
}

function _getCroppedFile() {
  _getCroppedFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(imageUrl, pixelCrop, maxWidth, maxHeight, mimeType, quality) {
    var _limitSize2, width, height, image, canvas, ctx;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _limitSize2 = limitSize(pixelCrop.width, pixelCrop.height, maxWidth, maxHeight), width = _limitSize2.width, height = _limitSize2.height;
            _context3.next = 3;
            return createImageDomFromUrl(imageUrl);

          case 3:
            image = _context3.sent;
            canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext("2d");
            ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, width, height);
            return _context3.abrupt("return", new Promise(function (resolve) {
              canvas.toBlob(resolve, mimeType, quality);
            }));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getCroppedFile.apply(this, arguments);
}

function limitSize(width, height, maxWidth, maxHeight) {
  var widthRatio = width / maxWidth;
  var heightRation = height / maxHeight;
  var maxRation = Math.max(widthRatio, heightRation);

  if (maxRation > 1) {
    return {
      width: width / maxRation,
      height: height / maxRation
    };
  } else {
    return {
      width: width,
      height: height
    };
  }
}