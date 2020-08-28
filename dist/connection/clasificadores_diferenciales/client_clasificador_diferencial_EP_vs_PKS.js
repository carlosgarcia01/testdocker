"use strict";

const grpc = require('grpc');

const protoLoader = require('@grpc/proto-loader');

const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../../../.env')
});

const PROTO_PATH = path.join(__dirname, 'clasificador.proto');
const {
  CLASIFICADOR_DIFERENCIA_EP_VS_PKS_URL
} = process.env;
const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const {
  clasificadorPackage
} = grpcObject;
const client = new clasificadorPackage.Clasificador(CLASIFICADOR_DIFERENCIA_EP_VS_PKS_URL, grpc.credentials.createInsecure());
module.exports = client;
//# sourceMappingURL=client_clasificador_diferencial_EP_vs_PKS.js.map