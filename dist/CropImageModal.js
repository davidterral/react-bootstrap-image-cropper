"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CropImageModal;

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Slider = _interopRequireDefault(require("@material-ui/core/Slider"));

var _AddCircleOutline = _interopRequireDefault(require("@material-ui/icons/AddCircleOutline"));

var _RemoveCircleOutline = _interopRequireDefault(require("@material-ui/icons/RemoveCircleOutline"));

var _styles = require("@material-ui/core/styles");

var _useObjectUrl = _interopRequireDefault(require("use-object-url"));

var _CropImagePanel = _interopRequireDefault(require("./CropImagePanel"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CustomSlider = (0, _styles.withStyles)({
  root: {
    color: '#68b921',
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(_Slider["default"]);

function CropImageModal(_ref) {
  var show = _ref.show,
      imageFile = _ref.imageFile,
      value = _ref.value,
      onChange = _ref.onChange,
      onConfirm = _ref.onConfirm,
      onCancel = _ref.onCancel,
      onRemove = _ref.onRemove,
      _ref$inputOptions = _ref.inputOptions,
      inputOptions = _ref$inputOptions === void 0 ? {} : _ref$inputOptions,
      _ref$cropOptions = _ref.cropOptions,
      cropOptions = _ref$cropOptions === void 0 ? {} : _ref$cropOptions,
      _ref$outputOptions = _ref.outputOptions,
      outputOptions = _ref$outputOptions === void 0 ? {} : _ref$outputOptions,
      _ref$displayOptions = _ref.displayOptions,
      displayOptions = _ref$displayOptions === void 0 ? {} : _ref$displayOptions;
  var _inputOptions$maxWidt = inputOptions.maxWidth,
      inputMaxWidth = _inputOptions$maxWidt === void 0 ? Infinity : _inputOptions$maxWidt,
      _inputOptions$maxHeig = inputOptions.maxHeight,
      inputMaxHeight = _inputOptions$maxHeig === void 0 ? Infinity : _inputOptions$maxHeig,
      _inputOptions$mimeTyp = inputOptions.mimeType,
      inputMimeType = _inputOptions$mimeTyp === void 0 ? "image/jpeg" : _inputOptions$mimeTyp,
      inputQuality = inputOptions.quality;
  var aspect = cropOptions.aspect,
      maxZoom = cropOptions.maxZoom;
  var _outputOptions$maxWid = outputOptions.maxWidth,
      maxWidth = _outputOptions$maxWid === void 0 ? Infinity : _outputOptions$maxWid,
      _outputOptions$maxHei = outputOptions.maxHeight,
      maxHeight = _outputOptions$maxHei === void 0 ? Infinity : _outputOptions$maxHei,
      _outputOptions$mimeTy = outputOptions.mimeType,
      mimeType = _outputOptions$mimeTy === void 0 ? "image/jpeg" : _outputOptions$mimeTy,
      quality = outputOptions.quality;
  var _displayOptions$title = displayOptions.title,
      title = _displayOptions$title === void 0 ? "Crop Image" : _displayOptions$title,
      _displayOptions$remov = displayOptions.removeButtonText,
      removeButtonText = _displayOptions$remov === void 0 ? "Remove" : _displayOptions$remov,
      _displayOptions$confi = displayOptions.confirmButtonText,
      confirmButtonText = _displayOptions$confi === void 0 ? "Confirm" : _displayOptions$confi,
      _displayOptions$showR = displayOptions.showRemoveButton,
      showRemoveButton = _displayOptions$showR === void 0 ? true : _displayOptions$showR,
      _displayOptions$showC = displayOptions.showConfirmButton,
      showConfirmButton = _displayOptions$showC === void 0 ? true : _displayOptions$showC;
  var imageUrl = (0, _useObjectUrl["default"])(imageFile);

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      resizedUrl = _useState2[0],
      setResizedUrl = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      resizing = _useState4[0],
      setResizing = _useState4[1];

  (0, _react.useEffect)(function () {
    if (imageUrl) {
      setResizing(true);
      (0, _utils.limitImageSize)({
        imageUrl: imageUrl,
        maxWidth: inputMaxWidth,
        maxHeight: inputMaxHeight,
        mimeType: inputMimeType,
        quality: inputQuality
      }).then(function (url) {
        return setResizedUrl(url);
      })["catch"](function (err) {
        return console.error(err);
      })["finally"](function () {
        return setResizing(false);
      });
    } else {
      setResizedUrl();
    }
  }, [imageUrl]);
  var cropResultRef = (0, _react.useRef)();

  function handleCropComplete(croppedArea, croppedAreaPixels) {
    cropResultRef.current = {
      croppedArea: croppedArea,
      croppedAreaPixels: croppedAreaPixels
    };
  }

  function handleConfirm() {
    (0, _utils.getCroppedFile)(resizedUrl, cropResultRef.current.croppedAreaPixels, maxWidth, maxHeight, mimeType, quality).then(onConfirm);
  }

  function handleZoomChange(event, value) {
    onChange(function (prevValue) {
      return _objectSpread(_objectSpread({}, prevValue), {}, {
        zoom: value
      });
    });
  }

  return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal, {
    show: show,
    onHide: onCancel,
    size: "lg",
    backdrop: "static",
    centered: true
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Header, {
    closeButton: true
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
    xs: 12,
    md: 8
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Title, {
    style: {
      color: '#8c8c8d',
      fontSize: '18'
    }
  }, title)), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
    xs: 6,
    md: 4
  })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
    xs: 6,
    md: 4
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: "outline-secondary"
  }, "Change Image")), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
    xs: 6,
    md: 4
  }), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
    xs: 6,
    md: 4
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      color: '#b3b1b1',
      fontSize: '14'
    }
  }, headerText ? headerText : '')))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Body, {
    style: {
      height: "50vh"
    }
  }, resizing && /*#__PURE__*/_react["default"].createElement("div", {
    className: "d-flex justify-content-center align-items-center h-100"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Spinner, {
    animation: "grow"
  })), resizedUrl && /*#__PURE__*/_react["default"].createElement(_CropImagePanel["default"], {
    imageUrl: resizedUrl,
    value: value,
    onChange: onChange,
    onCropComplete: handleCropComplete,
    aspect: aspect,
    maxZoom: maxZoom
  })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Footer, null, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 2,
    style: {
      marginLeft: '20px',
      marginRight: 'auto',
      maxWidth: '40%'
    }
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true
  }, /*#__PURE__*/_react["default"].createElement(_RemoveCircleOutline["default"], {
    color: "disabled"
  })), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: true
  }, /*#__PURE__*/_react["default"].createElement(CustomSlider, {
    value: value ? value.zoom || 1 : 1,
    defaultValue: 1,
    max: maxZoom,
    step: 0.1,
    onChange: handleZoomChange
  })), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true
  }, /*#__PURE__*/_react["default"].createElement(_AddCircleOutline["default"], {
    color: "disabled"
  }))), showRemoveButton && /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: "light",
    onClick: onRemove
  }, removeButtonText), showConfirmButton && /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    onClick: handleConfirm,
    style: {
      backgroundColor: '#68b921',
      border: 'none'
    }
  }, confirmButtonText)));
}