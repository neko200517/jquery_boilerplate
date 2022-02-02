/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/home.js":
/*!************************!*\
  !*** ./src/js/home.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/_jquery-with-plugins */ "./src/js/lib/_jquery-with-plugins.js");
/* harmony import */ var _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-polyfill */ "./node_modules/babel-polyfill/lib/index.js");
/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/style.scss */ "./src/css/style.scss");
/* harmony import */ var _lib_startup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/_startup */ "./src/js/lib/_startup.js");
/* harmony import */ var _lib_utiltity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/_utiltity */ "./src/js/lib/_utiltity.js");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/_config */ "./src/js/lib/_config.js");
/* harmony import */ var _lib_cognito__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/_cognito */ "./src/js/lib/_cognito.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var dayjs_locale_ja__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! dayjs/locale/ja */ "./node_modules/dayjs/locale/ja.js");
/* harmony import */ var dayjs_locale_ja__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(dayjs_locale_ja__WEBPACK_IMPORTED_MODULE_9__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }










 //------------------------------------------------------------------//
// コントロール_宣言

var _controls = {
  lblDateTime: _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#lblDateTime'),
  btnPrev: _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#btnPrev'),
  btnNext: _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#btnNext'),
  cardConditions: _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#cardConditions'),
  btnGraph: _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#btnGraph')
}; // 宣言

var _currentDate;

var _username = (0,_lib_cognito__WEBPACK_IMPORTED_MODULE_7__.getCurrentUser)().username; //------------------------------------------------------------------//

_lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  (0,_lib_startup__WEBPACK_IMPORTED_MODULE_4__["default"])();
});
_lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()(window).on('_ready', function () {
  _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()(window).trigger('_refresh'); // 日付(YYYYMMDD)の保存
  // todo:5 ホーム画面の表示日時は本日を基本にする

  var fdate = _lib_utiltity__WEBPACK_IMPORTED_MODULE_5__.getParam('date');

  if (!fdate) {
    var fnow = dayjs__WEBPACK_IMPORTED_MODULE_8___default()().format('YYYYMMDD');
    fdate = fnow;
  }

  _currentDate = toDate(fdate); // イベントリスナーの付加

  _controls.btnPrev.on('click', function () {
    refresh(-1);
  });

  _controls.btnNext.on('click', function () {
    refresh(1);
  });

  refresh(0);
}); // YYYYMMDD形式の文字列をを日付型に変換

var toDate = function toDate(fdate) {
  var date = "".concat(fdate.substr(0, 4), "-").concat(fdate.substr(4, 2), "-").concat(fdate.substr(6, 2));
  return dayjs__WEBPACK_IMPORTED_MODULE_8___default()(new Date(date));
}; // 再描画


var refresh = function refresh(value) {
  // 日付を加算（減算）
  _currentDate = _currentDate.add(value, 'days');

  _controls.lblDateTime.text(_currentDate.format('YYYY年MM月DD日'));

  var fdate = _currentDate.format('YYYYMMDD'); // 日付変更のイベント発動


  _lib_config__WEBPACK_IMPORTED_MODULE_6__["default"].currentFormatDate = fdate;
  _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()(window).trigger('_refresh'); // todo:1 未来の入力は不可

  var fnow = dayjs__WEBPACK_IMPORTED_MODULE_8___default()().format('YYYYMMDD');

  _controls.btnNext.prop('disabled', fnow == fdate);

  if (fnow == fdate) {
    _controls.btnNext.removeClass('btn-primary');

    _controls.btnNext.addClass('btn-secondary');
  } else {
    _controls.btnNext.removeClass('btn-secondary');

    _controls.btnNext.addClass('btn-primary');
  } // カードの更新


  refreshCard(_username, fdate);
}; // カードを更新


var refreshCard = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username, date) {
    var obj, url, json, con, fdate, defs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _lib_utiltity__WEBPACK_IMPORTED_MODULE_5__.loading.show();
            obj = null;
            url = _lib_config__WEBPACK_IMPORTED_MODULE_6__["default"].api.getCondition;
            json = {
              username: username,
              startDate: date,
              endDate: date
            };
            _context.next = 6;
            return _lib_utiltity__WEBPACK_IMPORTED_MODULE_5__.getApiAsync(url, json).then(function (x) {
              return obj = x.results[0];
            });

          case 6:
            con = {
              weight: obj ? obj.weight : null,
              bp1: obj ? obj.bp1 : null,
              bp2: obj ? obj.bp2 : null,
              bp3: obj ? obj.bp3 : null,
              bp4: obj ? obj.bp4 : null,
              step: obj ? obj.step : null
            };
            fdate = _currentDate.format('YYYYMMDD');
            defs = [{
              id: 'lblWeight',
              data: con.weight,
              unit: "<span class=\"home-item-unit-big\">Kg</span>",
              href: "input.html?type=weight&date=".concat(fdate),
              icon: "<i class=\"fas fa-weight\"></i>",
              title: "\u4F53\u91CD",
              subtitle: "",
              type: 'card-weight'
            }, {
              id: 'lblBp1',
              data: con.bp1,
              unit: "<span class=\"home-item-unit-sm\">mmHg</span>",
              href: "input.html?type=bp1&date=".concat(fdate),
              icon: "<i class=\"fas fa-sun\"></i>",
              title: "<span class=\"home-item-morning\">\u671D : </span>",
              subtitle: "<span class=\"home-item-high\">\u6700\u9AD8\u8840\u5727</span>",
              type: 'card-bp1'
            }, {
              id: 'lblBp2',
              data: con.bp2,
              unit: "<span class=\"home-item-unit-sm\">mmHg</span>",
              href: "input.html?type=bp2&date=".concat(fdate),
              icon: "<i class=\"fas fa-sun\"></i>",
              title: "<span class=\"home-item-morning\">\u671D : </span>",
              subtitle: "<span class=\"home-item-low\">\u6700\u4F4E\u8840\u5727</span>",
              type: 'card-bp2'
            }, {
              id: 'lblBp3',
              data: con.bp3,
              unit: "<span class=\"home-item-unit-sm\">mmHg</span>",
              href: "input.html?type=bp3&date=".concat(fdate),
              icon: "<i class=\"fas fa-moon\"></i>",
              title: "<span class=\"home-item-night\">\u591C : </span>",
              subtitle: "<span class=\"home-item-high\">\u6700\u9AD8\u8840\u5727</span>",
              type: 'card-bp3'
            }, {
              id: 'lblBp4',
              data: con.bp4,
              unit: "<span class=\"home-item-unit-sm\">mmHg</span>",
              href: "input.html?type=bp4&date=".concat(fdate),
              icon: "<i class=\"fas fa-moon\"></i>",
              title: "<span class=\"home-item-night\">\u591C : </span>",
              subtitle: "<span class=\"home-item-high\">\u6700\u4F4E\u8840\u5727</span>",
              type: 'card-bp4'
            }, {
              id: 'lblStep',
              data: con.step,
              unit: "<span class=\"home-item-unit-big\">\u6B69</span>",
              href: "input.html?type=step&date=".concat(fdate),
              icon: "<i class=\"fas fa-walking\"></i>",
              title: '歩数',
              subtitle: '',
              type: 'card-step'
            }];

            _controls.cardConditions.empty();

            defs.forEach(function (x) {
              var html = "\n                    <a href=\"".concat(x.href, "\" class=\"btn card mb-2 ").concat(x.type, "\">\n                      <div class=\"d-flex align-items-center justify-content-start home-item-card\">\n                        <label class=\"col-6 home-item-title\">\n                          ").concat(x.title, "\n                          <span class=\"home-item-subtitle\">\n                            ").concat(x.subtitle, "\n                          </span>\n                        </label>\n                        <label class=\"col-4 home-item-data\" id=\"").concat(x.id, "\"></label>\n                        <label class=\"col-2\">\n                          ").concat(x.unit, "\n                        </label>\n                      </div>\n                    </a>\n                    ");

              _controls.cardConditions.append(html);

              if (!_lib_utiltity__WEBPACK_IMPORTED_MODULE_5__.isNull(x.data)) {
                _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(x.id)).text("".concat(x.data.toLocaleString()));
                _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(x.id)).addClass('text-success');
              } else {
                _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(x.id)).text("---");
                _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(x.id)).addClass('home-item-text-mute');
              }
            });
            drawRefresh();
            _lib_utiltity__WEBPACK_IMPORTED_MODULE_5__.loading.hide();

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function refreshCard(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // ウィンドウ_解像度変更


_lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()(window).on('resize', function () {
  drawRefresh();
});

var drawRefresh = function drawRefresh() {
  var height = (document.documentElement.clientHeight - 500) / 5 + 10;
  height = height > 75 ? 75 : height;
  _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('.home-item-card').css('height', height);
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"home": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebpack_test"] = self["webpackChunkwebpack_test"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/js/home.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=home.js.map