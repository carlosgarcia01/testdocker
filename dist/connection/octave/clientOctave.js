"use strict";

const grpc = require('grpc');

const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../../../.env')
});

const {
  loadSync
} = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, '/octave.proto');
const {
  OCTAVE_URL
} = process.env;
const packageDef = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const {
  octavePackage
} = grpcObject;
const client = new octavePackage.Octave(OCTAVE_URL, grpc.credentials.createInsecure());
module.exports = client;
//# sourceMappingURL=clientOctave.js.map