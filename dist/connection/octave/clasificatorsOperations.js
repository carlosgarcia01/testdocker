"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

var _util = require("util");

var _runProcess = _interopRequireDefault(require("./runProcess"));

var _client_clasificador_DCL = _interopRequireDefault(require("../clasificadores/client_clasificador_DCL"));

var _client_clasificador_DFT = _interopRequireDefault(require("../clasificadores/client_clasificador_DFT"));

var _client_clasificador_EA = _interopRequireDefault(require("../clasificadores/client_clasificador_EA"));

var _client_clasificador_EHM = _interopRequireDefault(require("../clasificadores/client_clasificador_EHM"));

var _client_clasificador_Parkinsionismos = _interopRequireDefault(require("../clasificadores/client_clasificador_Parkinsionismos"));

var _client_clasificador_Parkinson = _interopRequireDefault(require("../clasificadores/client_clasificador_Parkinson"));

var _client_clasificador_diferencial_DFT_vs_DCL = _interopRequireDefault(require("../clasificadores_diferenciales/client_clasificador_diferencial_DFT_vs_DCL"));

var _client_clasificador_diferencial_EA_vs_DCL = _interopRequireDefault(require("../clasificadores_diferenciales/client_clasificador_diferencial_EA_vs_DCL"));

var _client_clasificador_diferencial_EA_vs_DFT = _interopRequireDefault(require("../clasificadores_diferenciales/client_clasificador_diferencial_EA_vs_DFT"));

var _client_clasificador_diferencial_EP_vs_PKS = _interopRequireDefault(require("../clasificadores_diferenciales/client_clasificador_diferencial_EP_vs_PKS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

let runProcess = null;

async function Classifiers(fact) {
  let result = 'Hubo un problema';
  let out;
  let newResult;
  let response;
  const text = fact.result;
  const [, resultType] = fact.idResultType.split('oct');

  try {
    switch (fact.idResultType) {
      case 'oct2':
        response = new Promise((resolve, reject) => {
          _client_clasificador_EA.default.clasificador({
            text
          }, (err, res) => {
            if (res) resolve(res);else reject(err);
          });
        });
        break;

      case 'oct3':
        response = new Promise((resolve, reject) => {
          _client_clasificador_Parkinson.default.clasificador({
            text
          }, (err, res) => {
            if (res) resolve(res);else reject(err);
          });
        });
        break;

      case 'oct5':
        response = new Promise((resolve, reject) => {
          _client_clasificador_DFT.default.clasificador({
            text
          }, (err, res) => {
            if (res) resolve(res);else reject(err);
          });
        });
        break;

      case 'oct8':
        response = new Promise((resolve, reject) => {
          _client_clasificador_EHM.default.clasificador({
            text
          }, (err, res) => {
            if (res) resolve(res);else reject(err);
          });
        });
        break;

      case 'oct9':
        response = new Promise((resolve, reject) => {
          _client_clasificador_DCL.default.clasificador({
            text
          }, (err, res) => {
            if (res) resolve(res);else reject(err);
          });
        });
        break;

      case 'oct10':
        response = new Promise((resolve, reject) => {
          _client_clasificador_Parkinsionismos.default.clasificador({
            text
          }, (err, res) => {
            if (res) resolve(res);else reject(err);
          });
        });
        break;

      default:
        out = null;
        break;
    }

    if (response) out = await response;else throw new Error('There was no answer');
  } catch (err) {
    return err;
  }

  if (out) {
    newResult = {
      result: out.data,
      idResultType: resultType
    };
  }

  if (newResult) result = newResult;
  return result;
}

async function DifferentialClassifiers(fact) {
  let out;
  let result = 'Hubo un problema';
  let newResult;
  let response;
  const text = fact.result;
  const [, resultType] = fact.idResultType.split('oct');

  try {
    switch (fact.idResultType) {
      case 'oct59':
      case 'oct95':
        response = new Promise((resolve, reject) => {
          _client_clasificador_diferencial_DFT_vs_DCL.default.clasificador({
            text
          }, (err, res) => {
            if (res) resolve(res);else reject(err);
          });
        });
        break;

      case 'oct29':
      case 'oct92':
        response = new Promise((resolve, reject) => {
          _client_clasificador_diferencial_EA_vs_DCL.default.clasificador({
            text
          }, (err, res) => {
            if (res) resolve(res);else reject(err);
          });
        });
        break;

      case 'oct25':
      case 'oct52':
        response = new Promise((resolve, reject) => {
          _client_clasificador_diferencial_EA_vs_DFT.default.clasificador({
            text
          }, (err, res) => {
            if (res) resolve(res);else reject(err);
          });
        });
        break;

      case 'oct310':
      case 'oct103':
        response = new Promise((resolve, reject) => {
          _client_clasificador_diferencial_EP_vs_PKS.default.clasificador({
            text
          }, (err, res) => {
            if (res) resolve(res);else reject(err);
          });
        });
        break;

      default:
        out = null;
        break;
    }

    if (response) out = await response;else throw new Error('There was no answer');
  } catch (err) {
    return err;
  }

  if (out) {
    newResult = {
      result: out.data,
      idResultType: resultType
    };
  }

  if (newResult) result = newResult;
  return result;
}

async function RunClassifier(results) {
  let result;
  const newResults = [...results];
  let contPatologias = 0;
  let cont = 0;
  if (!runProcess) runProcess = (0, _runProcess.default)();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;

  var _iteratorError;

  try {
    for (var _iterator = _asyncIterator(results), _step, _value; _step = await _iterator.next(), _iteratorNormalCompletion = _step.done, _value = await _step.value, !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
      let fact = _value;

      if (cont <= 1) {
        if (['oct2', 'oct3', 'oct5', 'oct8', 'oct9', 'oct10'].includes(fact.idResultType)) {
          result = await Classifiers(fact);
          if (!['Hubo un problema', 'Category not found', '1.000000', null].includes(result.result)) contPatologias++;
          cont++;
        }
      } else if (contPatologias >= 2) result = await DifferentialClassifiers(fact);

      if (!['Hubo un problema', 'Category not found', null].includes(result.result) || !(0, _util.isError)(result.result)) newResults.push(result);
      result = null;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        await _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return newResults;
}

var _default = RunClassifier;
exports.default = _default;
//# sourceMappingURL=clasificatorsOperations.js.map