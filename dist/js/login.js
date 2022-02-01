/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/login.js":
/*!*************************!*\
  !*** ./src/js/login.js ***!
  \*************************/
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
/* harmony import */ var _lib_localStorage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/_localStorage */ "./src/js/lib/_localStorage.js");
/* harmony import */ var _lib_cognito__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/_cognito */ "./src/js/lib/_cognito.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









 //------------------------------------------------------------------//

_lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  (0,_lib_startup__WEBPACK_IMPORTED_MODULE_4__["default"])();
});
_lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()(window).on('_ready', function () {
  _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#btnLogin').on('click', function (e) {
    e.preventDefault();
    onSignIn();
  });
}); // サインイン処理

var onSignIn = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var username, password;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#txtUserName').val();
            password = _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#txtPassword').val();

            if (username) {
              _context.next = 5;
              break;
            }

            _lib_utiltity__WEBPACK_IMPORTED_MODULE_5__.flash('ユーザ名を入力してください。');
            return _context.abrupt("return");

          case 5:
            if (password) {
              _context.next = 8;
              break;
            }

            _lib_utiltity__WEBPACK_IMPORTED_MODULE_5__.flash('パスワードを入力してください。');
            return _context.abrupt("return");

          case 8:
            _lib_utiltity__WEBPACK_IMPORTED_MODULE_5__.loading.show();
            _context.next = 11;
            return (0,_lib_cognito__WEBPACK_IMPORTED_MODULE_8__.signIn)(username, password).then(function (result) {
              var currentUserName = (0,_lib_cognito__WEBPACK_IMPORTED_MODULE_8__.getCurrentUser)().username;
              notExistedUserRegist(currentUserName).then(function (x) {
                confirmedUserGotoLocation(currentUserName);
              });
            })["catch"](function (error) {
              _lib_utiltity__WEBPACK_IMPORTED_MODULE_5__.flash(_lib_utiltity__WEBPACK_IMPORTED_MODULE_5__.translation(error, 'ログイン処理に失敗しました。'));
            });

          case 11:
            _lib_utiltity__WEBPACK_IMPORTED_MODULE_5__.loading.hide();

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function onSignIn() {
    return _ref.apply(this, arguments);
  };
}(); // Usersテーブルに存在しない場合はUserを自動作成


var notExistedUserRegist = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(username) {
    var url, json;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = _lib_config__WEBPACK_IMPORTED_MODULE_6__["default"].api.newUser;
            json = {
              username: username
            };
            _context2.next = 4;
            return _lib_utiltity__WEBPACK_IMPORTED_MODULE_5__.postApiAsync(url, json).then(function (x) {
              return new Promise(function (resolve) {
                resolve(true);
              });
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function notExistedUserRegist(_x) {
    return _ref2.apply(this, arguments);
  };
}(); // 初回登録済みで遷移先を決定する


var confirmedUserGotoLocation = function confirmedUserGotoLocation(username) {
  var url = _lib_config__WEBPACK_IMPORTED_MODULE_6__["default"].api.getUser;
  var json = {
    username: username
  };
  _lib_utiltity__WEBPACK_IMPORTED_MODULE_5__.getApiAsync(url, json).then(function (x) {
    var obj = x.results[0];
    _lib_localStorage__WEBPACK_IMPORTED_MODULE_7__["default"].setConfirmState(obj.is_confirm);
    location.href = obj.is_confirm ? 'home.html' : 'terms.html';
  });
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
/******/ 	/* webpack/runtime/amd options */
/******/ 	!function() {
/******/ 		__webpack_require__.amdO = {};
/******/ 	}();
/******/ 	
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
/******/ 			"login": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/js/login.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=login.js.map