/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/license.js":
/*!***************************!*\
  !*** ./src/js/license.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/_jquery-with-plugins */ "./src/js/lib/_jquery-with-plugins.js");
/* harmony import */ var _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-polyfill */ "./node_modules/babel-polyfill/lib/index.js");
/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/style.scss */ "./src/css/style.scss");
/* harmony import */ var _lib_startup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/_startup */ "./src/js/lib/_startup.js");




 //------------------------------------------------------------------//

_lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  (0,_lib_startup__WEBPACK_IMPORTED_MODULE_4__["default"])();
});
_lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()(window).on('_ready', function () {
  var type = {
    mit: 'MIT License',
    apache: 'Apache License 2.0',
    cc: 'CC BY 4.0',
    sil: 'SIL OFL 1.1',
    undefined: '-'
  };
  var licenses = [{
    name: 'amazon-cognito-identity-js',
    type: type.apache,
    copyright: '2016 Amazon.com',
    url: 'https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js'
  }, {
    name: 'aws-cognito-sdk',
    type: type.apache,
    copyright: '2016 Amazon.com',
    url: 'https://raw.githubusercontent.com/aws/amazon-cognito-identity-js/master/dist/aws-cognito-sdk.min.js'
  }, {
    name: 'aws-sdk-js',
    type: type.apache,
    copyright: '2016 Amazon.com',
    url: 'https://github.com/aws/aws-sdk-js'
  }, {
    name: 'bootstrap',
    type: type.mit,
    copyright: '2011-2021 Twitter, Inc.',
    url: 'https://github.com/twbs/bootstrap'
  }, {
    name: 'bootstrap-datepicker',
    type: type.apache,
    copyright: 'other contributors',
    url: 'https://github.com/uxsolutions/bootstrap-datepicker'
  }, {
    name: 'bootstrap-table',
    type: type.mit,
    copyright: '2012-2019 Zhixin Wen',
    url: 'https://github.com/wenzhixin/bootstrap-table'
  }, {
    name: 'Chart.js',
    type: type.mit,
    copyright: '2014-2021 Chart.js Contributors',
    url: 'https://github.com/chartjs/Chart.js'
  }, {
    name: 'Font Awesome Free',
    type: "\n          <ul style=\"margin:0;\">\n            <li class=\"text-muted\">\n              Icons: <a href=\"https://creativecommons.org/licenses/by/4.0/deed.en\">CC BY 4.0</a>\n            </li>\n            <li class=\"text-muted\">\n              Fonts: <a href=\"https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL\">\n                SIL OFL 1.1</a>\n            </li>\n            <li class=\"text-muted\">\n              Code: MIT License\n            </li>\n          </ul>\n        ",
    copyright: 'fontawesome.com',
    url: 'https://fontawesome.com/'
  }, {
    name: 'jquery',
    type: type.mit,
    copyright: 'jquery.com',
    url: 'https://github.com/jquery/jquery'
  }, {
    name: 'jquery-confirm',
    type: type.mit,
    copyright: '2019 Boniface Pereira',
    url: 'https://github.com/craftpip/jquery-confirm'
  }, {
    name: 'jsbn',
    type: type.undefined,
    copyright: "Tom Wu's",
    url: 'https://github.com/andyperlitch/jsbn'
  }, {
    name: 'jsbn2',
    type: type.undefined,
    copyright: "Tom Wu's",
    url: 'https://gist.github.com/Blackbaud-CameronBlack/76fbe4040818a4c5dd3ba59c4275ecb2'
  }, {
    name: 'Moment.js',
    type: type.mit,
    copyright: 'momentjs.com',
    url: 'https://github.com/moment/moment/'
  }, {
    name: 'sjcl',
    type: 'BSD-2-Clause, GPL-2.0',
    copyright: 'sjcl@ovt.me',
    url: 'https://github.com/bitwiseshiftleft/sjcl'
  }];
  licenses.forEach(function (x) {
    var html = '';
    html += "\n        <div class=\"card\">\n          <div class=\"card-body\">\n          <h2 class=\"card-title mb-2\">".concat(x.name, "</h2>\n          <h6 class=\"card-subtitle text-muted mb-2\">").concat(x.type, "</h6>\n          <h6 class=\"card-subtitle text-muted mb-1\">\n            Copyright(c) ").concat(x.copyright, " All rights reserved.\n          </h6>\n          <a href=\"").concat(x.url, "\" class=\"card-link\">").concat(x.url, "</a>\n          </div>\n        </div>\n      ");
    _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#license').append(html);
  });
});

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
/******/ 			"license": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/js/license.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=license.js.map