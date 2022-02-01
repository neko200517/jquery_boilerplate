/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/graph.js":
/*!*************************!*\
  !*** ./src/js/graph.js ***!
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
/* harmony import */ var _lib_cognito__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/_cognito */ "./src/js/lib/_cognito.js");
/* harmony import */ var _lib_graph_date__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/_graph_date */ "./src/js/lib/_graph_date.js");
/* harmony import */ var _lib_graph_month__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/_graph_month */ "./src/js/lib/_graph_month.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }










 //------------------------------------------------------------------//

_lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  (0,_lib_startup__WEBPACK_IMPORTED_MODULE_4__["default"])();
});
_lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()(window).on('_ready', function () {
  var username = (0,_lib_cognito__WEBPACK_IMPORTED_MODULE_7__.getCurrentUser)().username;
  isExistInterviewStartedAt(username);
  var btnChartDate = _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#btnChartDate');
  var btnChartMonth = _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#btnChartMonth');
  var chart = new _lib_graph_date__WEBPACK_IMPORTED_MODULE_8__["default"]();
  chart.setPaginationEnable(false);
  chart.createCardComponent();
  btnChartDate.on('click', function () {
    btnChartMonth.removeClass('active');
    btnChartDate.addClass('active');
    onBtnChartDate();
  });
  btnChartMonth.on('click', function () {
    btnChartDate.removeClass('active');
    btnChartMonth.addClass('active');
    onBtnChartMonth();
  });
}); // 日グラフボタン

var onBtnChartDate = function onBtnChartDate() {
  var chart = new _lib_graph_date__WEBPACK_IMPORTED_MODULE_8__["default"]();
  chart.setPaginationEnable(false);
  chart.createCardComponent();
}; // 月グラフボタン


var onBtnChartMonth = function onBtnChartMonth() {
  var chart = new _lib_graph_month__WEBPACK_IMPORTED_MODULE_9__["default"]();
  chart.createCardComponent();
}; // 面談開始日が登録されているか


var isExistInterviewStartedAt = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username) {
    var results, url, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = _lib_config__WEBPACK_IMPORTED_MODULE_6__["default"].api.getUser;
            json = {
              username: username
            };
            _context.next = 4;
            return _lib_utiltity__WEBPACK_IMPORTED_MODULE_5__.getApiAsync(url, json).then(function (x) {
              return results = x.results;
            });

          case 4:
            if (!results[0].interview_started_at) {
              _lib_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#lblWarning').show();
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isExistInterviewStartedAt(_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/js/lib/_graph_base.js":
/*!***********************************!*\
  !*** ./src/js/lib/_graph_base.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ChartBase; }
/* harmony export */ });
/* harmony import */ var _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_jquery-with-plugins */ "./src/js/lib/_jquery-with-plugins.js");
/* harmony import */ var _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utiltity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_utiltity */ "./src/js/lib/_utiltity.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_config */ "./src/js/lib/_config.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/chart.esm.js");
/* harmony import */ var _cognito__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_cognito */ "./src/js/lib/_cognito.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





 //------------------------------------------------------------------//

var ChartBase = /*#__PURE__*/function () {
  // チャートインスタンス
  // デフォルト値
  // チャートの設定
  // コンポーネントの設定
  // 初期化
  function ChartBase() {
    _classCallCheck(this, ChartBase);

    _defineProperty(this, "chartWeight", void 0);

    _defineProperty(this, "chartBp", void 0);

    _defineProperty(this, "chartStep", void 0);

    _defineProperty(this, "addDate", -14);

    _defineProperty(this, "chartMaxValue", 30);

    _defineProperty(this, "username", (0,_cognito__WEBPACK_IMPORTED_MODULE_4__.getCurrentUser)().username);

    _defineProperty(this, "chart", {
      weight: {
        label: '体重',
        color: '#38b48b',
        type: 'line'
      },
      bp1: {
        label: '朝',
        color: '#e9546b',
        type: 'bar'
      },
      bp2: {
        label: '夜',
        color: '#2ca9e1',
        type: 'bar'
      },
      step: {
        label: '歩数',
        color: '#f39800',
        type: 'bar'
      }
    });

    _defineProperty(this, "compornents", [{
      tag: 'weight',
      label: '体重',
      subLabel: '',
      paginationEnable: true,
      paginationMaxValue: 1
    }, {
      tag: 'bp',
      label: '血圧',
      subLabel: '',
      paginationEnable: true,
      paginationMaxValue: 1
    }, {
      tag: 'step',
      label: '歩数',
      subLabel: '',
      paginationEnable: true,
      paginationMaxValue: 1
    }]);

    chart_js__WEBPACK_IMPORTED_MODULE_3__.Chart.register.apply(chart_js__WEBPACK_IMPORTED_MODULE_3__.Chart, _toConsumableArray(chart_js__WEBPACK_IMPORTED_MODULE_3__.registerables));
    chart_js__WEBPACK_IMPORTED_MODULE_3__.Chart.defaults.font.size = 13;
    chart_js__WEBPACK_IMPORTED_MODULE_3__.Chart.defaults.font.weight = 600;
  } // 一括でページネーションの有効/無効化


  _createClass(ChartBase, [{
    key: "setPaginationEnable",
    value: function setPaginationEnable(value) {
      this.compornents.forEach(function (x) {
        x.paginationEnable = value;
      });
    } // コンポーネントの作成

  }, {
    key: "createCardComponent",
    value: function () {
      var _createCardComponent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var maxValue, index;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _utiltity__WEBPACK_IMPORTED_MODULE_1__.loading.show(); // データの最大数を算出

                maxValue = 1;
                _context.next = 4;
                return this.getPaginationMaxLength(this.username).then(function (x) {
                  return maxValue = x;
                });

              case 4:
                this.compornents.forEach(function (x) {
                  x.paginationMaxValue = maxValue;
                }); // メインコンポーネントの追加

                this.compornents.forEach(function (x) {
                  var canvalId = "chart-".concat(x.tag);
                  var navPgId = "nav-pg-".concat(x.tag);
                  var html = "\n        <div class=\"card-body\">\n          <div class=\"d-flex flex-row justify-content-between\" style=\"height: 48px\">\n            <div class=\"card-title-left mt-1\">\n              <h5 class=\"display-6\">".concat(x.label, "\n                <small style=\"font-size: 1rem\">\n                    <label>").concat(x.subLabel, "</label>\n                </small>\n              </h5>\n            </div>\n            <div class=\"card-title-right\">\n              <nav aria-label=\"Page navigation\" id=\"").concat(navPgId, "\"></nav>\n            </div>\n          </div>\n          <canvas id=\"").concat(canvalId, "\"></canvas>\n        </div>\n      ");
                  var id = "#card-".concat(x.tag);
                  _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()(id).empty();
                  _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()(id).append(html); // ページネーションの追加
                  // 固定幅、数値は現在のページ位置を表すだけにする

                  if (x.paginationEnable && x.paginationMaxValue >= 1) {
                    var navPgHtml = "\n          <ul class=\"pagination\" id=\"pg-".concat(x.tag, "\">\n              <li class=\"page-item\">\n                <button class=\"page-link\" aria-label=\"Previous\" id=\"pg-prev-").concat(x.tag, "\">\n                  <span aria-hidden=\"true\">&laquo;</span>\n                </button>\n              </li>\n              <li class=\"page-item\"><a class=\"page-link\" id=\"pg-current-").concat(x.tag, "\"></a></li>\n              <li class=\"page-item\">\n                <button class=\"page-link\" aria-label=\"Next\" id=\"pg-next-").concat(x.tag, "\">\n                  <span aria-hidden=\"true\">&raquo;</span>\n                </button>\n              </li>\n            </ul>\n          ");
                    _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(navPgId)).empty();

                    if (maxValue > 1) {
                      _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(navPgId)).append(navPgHtml);
                    } // 初期化


                    var pgPrev = _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()("#pg-prev-".concat(x.tag));
                    var pgNext = _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()("#pg-next-".concat(x.tag));

                    _this.setCurrentPage(x.tag, 1);

                    pgNext.on('click', function () {
                      _this.onPgNext(x.tag);
                    });
                    pgPrev.on('click', function () {
                      _this.onPgPrev(x.tag);
                    });

                    _this.refreshPagination(x.tag, false);
                  }
                }); // チャートの初期化

                index = 0;
                this.initChart(this.username, index);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createCardComponent() {
        return _createCardComponent.apply(this, arguments);
      }

      return createCardComponent;
    }() // 現在のページを取得

  }, {
    key: "getCurrentPage",
    value: function getCurrentPage(tag) {
      var pgCurrent = _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()("#pg-current-".concat(tag));
      return Number(pgCurrent.text());
    } // 現在のページを取得

  }, {
    key: "setCurrentPage",
    value: function setCurrentPage(tag, value) {
      var pgCurrent = _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()("#pg-current-".concat(tag));
      pgCurrent.text(value);
    } // ページネーション_更新

  }, {
    key: "refreshPagination",
    value: function refreshPagination(tag) {
      var isRefreshChart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var pgPrev = _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()("#pg-prev-".concat(tag));
      var pgNext = _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()("#pg-next-".concat(tag));
      var currentPage = this.getCurrentPage(tag);
      var target = this.compornents.find(function (x) {
        return x.tag == tag;
      });
      var max = target.paginationMaxValue;

      if (max <= currentPage) {
        pgNext.addClass('text-black-50');
        pgNext.prop('disabled', true);
      } else {
        pgNext.removeClass('text-black-50');
        pgNext.prop('disabled', false);
      }

      if (currentPage <= 1) {
        pgPrev.prop('disabled', true);
        pgPrev.addClass('text-black-50');
      } else {
        pgPrev.prop('disabled', false);
        pgPrev.removeClass('text-black-50');
      }

      if (isRefreshChart) {
        switch (tag) {
          case 'weight':
            this.refreshChart_weight(this.username, currentPage - 1);
            break;

          case 'bp':
            this.refreshChart_bp1(this.username, currentPage - 1);
            break;

          default:
            this.refreshChart_step(this.username, currentPage - 1);
            break;
        }
      }
    } // 前のページ

  }, {
    key: "onPgPrev",
    value: function onPgPrev(tag) {
      var currentPage = this.getCurrentPage(tag);
      currentPage -= 1;
      this.setCurrentPage(tag, currentPage);
      this.refreshPagination(tag);
    } // 次のページ

  }, {
    key: "onPgNext",
    value: function onPgNext(tag) {
      var currentPage = this.getCurrentPage(tag);
      currentPage += 1;
      this.setCurrentPage(tag, currentPage);
      this.refreshPagination(tag);
    } // チャートの初期化

  }, {
    key: "initChart",
    value: function () {
      var _initChart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(username, index) {
        var data, lblWeeks, dataWeight, dataBp1, dataBp2, dataBp3, dataBp4, dataStep, dataSetWeights, dataBp1s, dataBp2s, i, dataBp, dataSetSteps, scaleWeight, configWeight, scaleBp, configBp, configStep;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getData(username, index);

              case 2:
                data = _context2.sent;
                lblWeeks = data.lblWeeks;
                dataWeight = data.dataWeight;
                dataBp1 = data.dataBp1;
                dataBp2 = data.dataBp2;
                dataBp3 = data.dataBp3;
                dataBp4 = data.dataBp4;
                dataStep = data.dataStep;
                dataSetWeights = {
                  labels: lblWeeks,
                  datasets: [{
                    label: this.chart.weight.label,
                    backgroundColor: this.chart.weight.color,
                    borderColor: this.chart.weight.color,
                    data: dataWeight
                  }]
                };
                dataBp1s = [];
                dataBp2s = [];

                for (i = 0; i < dataBp1.length; i++) {
                  dataBp1s.push([dataBp1[i], dataBp2[i]]);
                  dataBp2s.push([dataBp3[i], dataBp4[i]]);
                }

                dataBp = {
                  labels: lblWeeks,
                  datasets: [{
                    label: this.chart.bp1.label,
                    data: dataBp1s,
                    backgroundColor: this.chart.bp1.color
                  }, {
                    label: this.chart.bp2.label,
                    data: dataBp2s,
                    backgroundColor: this.chart.bp2.color
                  }]
                };
                dataSetSteps = {
                  labels: lblWeeks,
                  datasets: [{
                    label: this.chart.step.label,
                    backgroundColor: this.chart.step.color,
                    borderColor: this.chart.step.color,
                    data: dataStep
                  }]
                };
                scaleWeight = this.getScales([dataWeight]);
                configWeight = {
                  type: this.chart.weight.type,
                  data: dataSetWeights,
                  options: {
                    plugins: {
                      legend: {
                        display: false
                      },
                      responsive: true
                    },
                    scales: scaleWeight
                  }
                };
                scaleBp = this.getScales([dataBp1, dataBp2, dataBp3, dataBp4]);
                configBp = {
                  type: this.chart.bp1.type,
                  data: dataBp,
                  options: {
                    responsive: true,
                    legend: {
                      position: 'top'
                    },
                    scales: scaleBp
                  }
                };
                configStep = {
                  type: this.chart.step.type,
                  data: dataSetSteps,
                  options: {
                    plugins: {
                      legend: {
                        display: false
                      },
                      responsive: true
                    }
                  }
                };
                this.chartWeight = new chart_js__WEBPACK_IMPORTED_MODULE_3__.Chart(_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#chart-weight'), configWeight);
                this.chartBp = new chart_js__WEBPACK_IMPORTED_MODULE_3__.Chart(_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#chart-bp'), configBp);
                this.chartStep = new chart_js__WEBPACK_IMPORTED_MODULE_3__.Chart(_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#chart-step'), configStep);
                _utiltity__WEBPACK_IMPORTED_MODULE_1__.loading.hide();

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function initChart(_x, _x2) {
        return _initChart.apply(this, arguments);
      }

      return initChart;
    }() // 配列の平均値

  }, {
    key: "getAverage",
    value: function getAverage(arr) {
      var total = arr.reduce(function (a, b) {
        return a + b;
      });
      return total / arr.length;
    } // 配列の最大値

  }, {
    key: "getMax",
    value: function getMax(arr) {
      return arr.reduce(function (a, b) {
        return a > b ? a : b;
      });
    } // 配列の最小値

  }, {
    key: "getMin",
    value: function getMin(arr) {
      // return arr.reduce((a, b) => (a < b ? a : b));
      var new_arr = [];
      arr.forEach(function (x) {
        if (x) {
          new_arr.push(x);
        }
      });
      var min = new_arr[0];
      new_arr.forEach(function (x) {
        if (x < min) {
          min = x;
        }
      });
      return min;
    } // グラフのy軸スケールを取得する

  }, {
    key: "getScales",
    value: function getScales(datas) {
      var _this2 = this;

      var padding = 10;
      var maxs = [];
      datas.forEach(function (x) {
        maxs.push(_this2.getMax(x));
      });
      var max = this.getMax(maxs);
      var yMax = Math.round((max + padding) / 10) * 10;
      var mins = [];
      datas.forEach(function (x) {
        mins.push(_this2.getMin(x));
      });
      var min = this.getMin(mins);
      var yMin = Math.round((min - padding) / 10) * 10;
      var isEnabled = false;

      for (var i = 0; i < datas.length; i++) {
        for (var j = 0; j < datas[i].length; j++) {
          if (datas[i][j]) {
            isEnabled = true;
            break;
          }
        }
      }

      var scales = {};

      if (isEnabled) {
        scales = {
          y: {
            max: yMax,
            min: yMin
          }
        };
      }

      return scales;
    } // チャートの更新

  }, {
    key: "refreshChart",
    value: function () {
      var _refreshChart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(username, index) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function refreshChart(_x3, _x4) {
        return _refreshChart.apply(this, arguments);
      }

      return refreshChart;
    }() // チャートの更新_体重

  }, {
    key: "refreshChart_weight",
    value: function () {
      var _refreshChart_weight = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(username, index) {
        var data, lblWeeks, dataWeight, scaleWeight;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getData(username, index, 'weight');

              case 2:
                data = _context4.sent;
                lblWeeks = data.lblWeeks;
                dataWeight = data.dataWeight;
                scaleWeight = this.getScales([dataWeight]);
                this.chartWeight.data.labels = lblWeeks;
                this.chartWeight.data.datasets[0].data = dataWeight;
                this.chartWeight.options.scales = scaleWeight;
                this.chartWeight.update();

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function refreshChart_weight(_x5, _x6) {
        return _refreshChart_weight.apply(this, arguments);
      }

      return refreshChart_weight;
    }() // チャートの更新_血圧１

  }, {
    key: "refreshChart_bp1",
    value: function () {
      var _refreshChart_bp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(username, index) {
        var data, lblWeeks, dataBp1, dataBp2, dataBp3, dataBp4, scaleBp, dataBp1s, dataBp2s, i;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getData(username, index, 'bp');

              case 2:
                data = _context5.sent;
                lblWeeks = data.lblWeeks;
                dataBp1 = data.dataBp1;
                dataBp2 = data.dataBp2;
                dataBp3 = data.dataBp3;
                dataBp4 = data.dataBp4;
                scaleBp = this.getScales([dataBp1, dataBp2, dataBp3, dataBp4]);
                dataBp1s = [];
                dataBp2s = [];

                for (i = 0; i < dataBp1.length; i++) {
                  dataBp1s.push([dataBp1[i], dataBp2[i]]);
                  dataBp2s.push([dataBp3[i], dataBp4[i]]);
                }

                this.chartBp.data.labels = lblWeeks;
                this.chartBp.data.datasets[0].data = dataBp1s;
                this.chartBp.data.datasets[1].data = dataBp2s;
                this.chartBp.options.scales = scaleBp;
                this.chartBp.update();

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function refreshChart_bp1(_x7, _x8) {
        return _refreshChart_bp.apply(this, arguments);
      }

      return refreshChart_bp1;
    }() // チャートの更新_歩数

  }, {
    key: "refreshChart_step",
    value: function () {
      var _refreshChart_step = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(username, index) {
        var data, lblWeeks, dataStep;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getData(username, index, 'step');

              case 2:
                data = _context6.sent;
                lblWeeks = data.lblWeeks;
                dataStep = data.dataStep;
                this.chartStep.data.labels = lblWeeks;
                this.chartStep.data.datasets[0].data = dataStep;
                this.chartStep.update();

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function refreshChart_step(_x9, _x10) {
        return _refreshChart_step.apply(this, arguments);
      }

      return refreshChart_step;
    }() // データの用意

  }, {
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(username, index) {
        var tag,
            _args7 = arguments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                tag = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : null;

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getData(_x11, _x12) {
        return _getData.apply(this, arguments);
      }

      return getData;
    }() // ページネーションの最大ページ数を求める

  }, {
    key: "getPaginationMaxLength",
    value: function () {
      var _getPaginationMaxLength = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(username) {
        var results, url, json, dt1, dt2, diffDate, count, maxPage;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                results = null;
                url = _config__WEBPACK_IMPORTED_MODULE_2__["default"].api.getUser;
                json = {
                  username: username
                };
                _context8.next = 5;
                return _utiltity__WEBPACK_IMPORTED_MODULE_1__.getApiAsync(url, json).then(function (x) {
                  return results = x.results;
                });

              case 5:
                // 面談開始日から現在の経過日 / 8 で最大週を求める
                dt1 = results[0].interview_started_at ? new Date(results[0].interview_started_at) : new Date();
                dt2 = new Date();
                diffDate = Math.floor((dt2 - dt1) / 86400000);
                count = Math.ceil(diffDate / 8);
                maxPage = Math.ceil(count / this.chartMaxValue); // this.chartMaxValueの余り

                return _context8.abrupt("return", new Promise(function (resolve) {
                  resolve(maxPage);
                }));

              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getPaginationMaxLength(_x13) {
        return _getPaginationMaxLength.apply(this, arguments);
      }

      return getPaginationMaxLength;
    }()
  }]);

  return ChartBase;
}();



/***/ }),

/***/ "./src/js/lib/_graph_date.js":
/*!***********************************!*\
  !*** ./src/js/lib/_graph_date.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ChartDate; }
/* harmony export */ });
/* harmony import */ var _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_jquery-with-plugins */ "./src/js/lib/_jquery-with-plugins.js");
/* harmony import */ var _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utiltity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_utiltity */ "./src/js/lib/_utiltity.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_config */ "./src/js/lib/_config.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dayjs_locale_ja__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dayjs/locale/ja */ "./node_modules/dayjs/locale/ja.js");
/* harmony import */ var dayjs_locale_ja__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs_locale_ja__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _graph_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_graph_base */ "./src/js/lib/_graph_base.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






 //------------------------------------------------------------------//
// 日グラフ

var ChartDate = /*#__PURE__*/function (_ChartBase) {
  _inherits(ChartDate, _ChartBase);

  var _super = _createSuper(ChartDate);

  // コンストラクタ
  function ChartDate() {
    var _this;

    _classCallCheck(this, ChartDate);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "currentDate", void 0);

    _defineProperty(_assertThisInitialized(_this), "refresh", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var isRereshChart,
          dtStart,
          dtEnd,
          disabled,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              isRereshChart = _args.length > 0 && _args[0] !== undefined ? _args[0] : true;

              if (_this.currentDate.isAfter(dayjs__WEBPACK_IMPORTED_MODULE_3___default()())) {
                _this.currentDate = dayjs__WEBPACK_IMPORTED_MODULE_3___default()();
              }

              dtStart = dayjs__WEBPACK_IMPORTED_MODULE_3___default()(_this.currentDate).add(_this.addDate + 1, 'days');
              dtEnd = dayjs__WEBPACK_IMPORTED_MODULE_3___default()(_this.currentDate);
              disabled = dtEnd.isSame(dayjs__WEBPACK_IMPORTED_MODULE_3___default()(), 'day');
              _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#btnNext').prop('disabled', disabled);

              if (disabled) {
                _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#btnNext').removeClass('btn-primary');
                _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#btnNext').addClass('btn-secondary');
              } else {
                _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#btnNext').removeClass('btn-secondary');
                _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#btnNext').addClass('btn-primary');
              }

              _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#lblDateTime').text("".concat(dtStart.format('MM/DD'), " - ").concat(dtEnd.format('MM/DD')));

              if (!isRereshChart) {
                _context.next = 13;
                break;
              }

              _utiltity__WEBPACK_IMPORTED_MODULE_1__.loading.show();
              _context.next = 12;
              return _this.refreshChart(_this.username, _this.addDate);

            case 12:
              _utiltity__WEBPACK_IMPORTED_MODULE_1__.loading.hide();

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "onPrev", function () {
      _this.currentDate = _this.currentDate.add(_this.addDate, 'days');

      _this.refresh();
    });

    _defineProperty(_assertThisInitialized(_this), "onNext", function () {
      _this.currentDate = _this.currentDate.add(-1 * _this.addDate, 'days');

      _this.refresh();
    });

    _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('.date-wrapper').show();
    _this.currentDate = dayjs__WEBPACK_IMPORTED_MODULE_3___default()();

    _this.refresh(false);

    _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#btnPrev').on('click', function () {
      _this.onPrev();
    });
    _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('#btnNext').on('click', function () {
      _this.onNext();
    });
    return _this;
  } // 再描画


  _createClass(ChartDate, [{
    key: "refreshChart",
    value: // チャートの更新
    function () {
      var _refreshChart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(username, index) {
        var data, lblWeeks, dataWeight, dataBp1, dataBp2, dataBp3, dataBp4, dataStep, scaleWeight, scaleBp, dataBp1s, dataBp2s, i;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getData(username, index);

              case 2:
                data = _context2.sent;
                lblWeeks = data.lblWeeks;
                dataWeight = data.dataWeight;
                dataBp1 = data.dataBp1;
                dataBp2 = data.dataBp2;
                dataBp3 = data.dataBp3;
                dataBp4 = data.dataBp4;
                dataStep = data.dataStep;
                scaleWeight = this.getScales([dataWeight]);
                scaleBp = this.getScales([dataBp1, dataBp2, dataBp3, dataBp4]);
                this.chartWeight.data.labels = lblWeeks;
                this.chartWeight.data.datasets[0].data = dataWeight;
                this.chartWeight.options.scales = scaleWeight;
                this.chartWeight.update();
                this.chartBp.data.labels = lblWeeks;
                dataBp1s = [];
                dataBp2s = [];

                for (i = 0; i < dataBp1.length; i++) {
                  dataBp1s.push([dataBp1[i], dataBp2[i]]);
                  dataBp2s.push([dataBp3[i], dataBp4[i]]);
                }

                this.chartBp.data.datasets[0].data = dataBp1s;
                this.chartBp.data.datasets[1].data = dataBp2s;
                this.chartBp.options.scales = scaleBp;
                this.chartBp.update();
                this.chartStep.data.labels = lblWeeks;
                this.chartStep.data.datasets[0].data = dataStep;
                this.chartStep.update();

              case 27:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function refreshChart(_x, _x2) {
        return _refreshChart.apply(this, arguments);
      }

      return refreshChart;
    }() // データの用意

  }, {
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(username, value) {
        var tag,
            obj,
            url,
            json,
            lblWeeks,
            dataWeight,
            dataBp1,
            dataBp2,
            dataBp3,
            dataBp4,
            dataStep,
            dt,
            defaultValue,
            _loop,
            i,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                tag = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : null;
                value = this.addDate;
                obj = null;
                url = _config__WEBPACK_IMPORTED_MODULE_2__["default"].api.getGraphDate;
                json = {
                  username: username,
                  addDate: value,
                  condition_date: this.currentDate.format('YYYYMMDD')
                };
                _context3.next = 7;
                return _utiltity__WEBPACK_IMPORTED_MODULE_1__.getApiAsync(url, json).then(function (x) {
                  return obj = x;
                });

              case 7:
                lblWeeks = [];
                dataWeight = [];
                dataBp1 = [];
                dataBp2 = [];
                dataBp3 = [];
                dataBp4 = [];
                dataStep = [];
                dt = this.currentDate ? dayjs__WEBPACK_IMPORTED_MODULE_3___default()(this.currentDate) : dayjs__WEBPACK_IMPORTED_MODULE_3___default()();
                dt = dt.add(value + 1, 'days');
                defaultValue = null;

                _loop = function _loop(i) {
                  var format_date = dt.format('YYYYMMDD');
                  var x = obj.results.find(function (x) {
                    return x.condition_date == format_date;
                  });

                  if (x) {
                    dataWeight.push(x.weight ? x.weight : defaultValue);
                    dataBp1.push(x.bp1 ? x.bp1 : defaultValue);
                    dataBp2.push(x.bp2 ? x.bp2 : defaultValue);
                    dataBp3.push(x.bp3 ? x.bp3 : defaultValue);
                    dataBp4.push(x.bp4 ? x.bp4 : defaultValue);
                    dataStep.push(x.step ? x.step : defaultValue);
                  } else {
                    dataWeight.push(defaultValue);
                    dataBp1.push(defaultValue);
                    dataBp2.push(defaultValue);
                    dataBp3.push(defaultValue);
                    dataBp4.push(defaultValue);
                    dataStep.push(defaultValue);
                  }

                  var lblWeekTexts = ['日', '月', '火', '水', '木', '金', '土'];
                  var label = lblWeekTexts[dt.day()];
                  lblWeeks.push(label);
                  dt = dt.add(1, 'days');
                };

                for (i = 0; i < Math.abs(value); i++) {
                  _loop(i);
                }

                return _context3.abrupt("return", {
                  lblWeeks: lblWeeks,
                  dataWeight: dataWeight,
                  dataBp1: dataBp1,
                  dataBp2: dataBp2,
                  dataBp3: dataBp3,
                  dataBp4: dataBp4,
                  dataStep: dataStep
                });

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getData(_x3, _x4) {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
  }]);

  return ChartDate;
}(_graph_base__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./src/js/lib/_graph_month.js":
/*!************************************!*\
  !*** ./src/js/lib/_graph_month.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ChartMonth; }
/* harmony export */ });
/* harmony import */ var _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_jquery-with-plugins */ "./src/js/lib/_jquery-with-plugins.js");
/* harmony import */ var _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utiltity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_utiltity */ "./src/js/lib/_utiltity.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_config */ "./src/js/lib/_config.js");
/* harmony import */ var _graph_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_graph_base */ "./src/js/lib/_graph_base.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




 //------------------------------------------------------------------//
// 月グラフ

var ChartMonth = /*#__PURE__*/function (_ChartBase) {
  _inherits(ChartMonth, _ChartBase);

  var _super = _createSuper(ChartMonth);

  // コンストラクタ
  function ChartMonth() {
    var _this;

    _classCallCheck(this, ChartMonth);

    _this = _super.call(this);
    _jquery_with_plugins__WEBPACK_IMPORTED_MODULE_0___default()('.date-wrapper').hide();
    return _this;
  } // データの用意


  _createClass(ChartMonth, [{
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username, value) {
        var tag,
            results,
            url,
            json,
            lblWeeks,
            dataWeight,
            dataBp1,
            dataBp2,
            dataBp3,
            dataBp4,
            dataStep,
            oi,
            digit,
            defaultValue,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                tag = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
                results = null;
                url = _config__WEBPACK_IMPORTED_MODULE_2__["default"].api.getGraphMonth;
                json = {
                  username: username,
                  index: value,
                  max: this.chartMaxValue
                };
                _context.next = 6;
                return _utiltity__WEBPACK_IMPORTED_MODULE_1__.getApiAsync(url, json).then(function (x) {
                  return results = x.results;
                });

              case 6:
                lblWeeks = [];
                dataWeight = [];
                dataBp1 = [];
                dataBp2 = [];
                dataBp3 = [];
                dataBp4 = [];
                dataStep = [];
                oi = 0;

                if (tag) {
                  oi = (Number(this.getCurrentPage(tag)) - 1) * this.chartMaxValue;
                }

                digit = 100;
                defaultValue = null;
                results.forEach(function (xx, i) {
                  var x = xx[0];
                  var weight = x.weight ? x.weight : defaultValue;
                  var bp1 = x.bp1 ? x.bp1 : defaultValue;
                  var bp2 = x.bp2 ? x.bp2 : defaultValue;
                  var bp3 = x.bp3 ? x.bp3 : defaultValue;
                  var bp4 = x.bp4 ? x.bp4 : defaultValue;
                  var step = x.step ? x.step : defaultValue;
                  weight = Math.round(weight * digit) / digit;
                  bp1 = Math.round(bp1 * digit) / digit;
                  bp2 = Math.round(bp2 * digit) / digit;
                  bp3 = Math.round(bp3 * digit) / digit;
                  bp4 = Math.round(bp4 * digit) / digit;
                  step = Math.round(step * digit) / digit;
                  dataWeight.push(weight);
                  dataBp1.push(bp1);
                  dataBp2.push(bp2);
                  dataBp3.push(bp3);
                  dataBp4.push(bp4);
                  dataStep.push(step);
                  lblWeeks.push("".concat(oi + i + 1, "\u9031"));
                });
                return _context.abrupt("return", {
                  lblWeeks: lblWeeks,
                  dataWeight: dataWeight,
                  dataBp1: dataBp1,
                  dataBp2: dataBp2,
                  dataBp3: dataBp3,
                  dataBp4: dataBp4,
                  dataStep: dataStep
                });

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getData(_x, _x2) {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
  }]);

  return ChartMonth;
}(_graph_base__WEBPACK_IMPORTED_MODULE_3__["default"]);



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
/******/ 			"graph": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/js/graph.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=graph.js.map