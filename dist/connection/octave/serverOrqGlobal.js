"use strict";

var _grpc = _interopRequireDefault(require("grpc"));

var _protoLoader = require("@grpc/proto-loader");

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _util = require("util");

var _clasificatorsOperations = _interopRequireDefault(require("./clasificatorsOperations"));

var _clientOctave = _interopRequireDefault(require("./clientOctave"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config({
  path: _path.default.join(__dirname, '../../../.env')
});

const PROTO_PATH = _path.default.join(__dirname, '/orqGlobal.proto');

const {
  ORQUESTADOR_URL
} = process.env;
const packageDef = (0, _protoLoader.loadSync)(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const grpcObject = _grpc.default.loadPackageDefinition(packageDef);

const {
  orqGlobalPackage
} = grpcObject;
const server = new _grpc.default.Server();

async function connectOctave(call, callback) {
  try {
    let out;
    const response = new Promise((resolve, reject) => {
      _clientOctave.default.octave(call.request, (err, res) => {
        if (res) resolve(res);else reject(err);
      });
    });

    if (response) {
      out = await response;

      if (out.results.length >= 2) {
        out.results.forEach((fact, index) => {
          if (['oct25', 'oct29', 'oct59', 'oct310'].includes(fact.idResultType) || index !== 2) {
            const aux = out.results[index];
            out.results[index] = out.results[2];
            out.results[2] = aux;
          }
        });
      }

      const result = await (0, _clasificatorsOperations.default)(out.results);

      if (!(0, _util.isError)(result[out.results.length + 1])) {
        const diagnosticResult = {
          idStudy: out.idStudy,
          results: result,
          globalResult: out.globalResult
        };
        callback(null, diagnosticResult);
      } else throw new Error('RunClassifiers error');
    } else throw new Error('There was error');
  } catch (err) {
    callback(null, err);
  }
}

server.bind(ORQUESTADOR_URL, _grpc.default.ServerCredentials.createInsecure());
server.addService(orqGlobalPackage.Octave.service, {
  connectOctave
});
server.start();
//# sourceMappingURL=serverOrqGlobal.js.map