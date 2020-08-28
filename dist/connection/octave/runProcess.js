"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

var _child_process = require("child_process");

// llamado child_process
// const { spawn } = require('child_process');
// Funcion para crear consola y recibir comando a ejecutar
const runCommand = command => {
  // voy a retornar una promesa , funcion para crear el proces
  return new Promise((resolve, reject) => {
    try {
      // creo un comando sh
      const process = (0, _child_process.spawn)('bash'); // const process = spawn('shell');
      // creo un objeto para guardar la respuesta
      // const response = {};
      // ejecutar el comando

      process.stdin.end(command); // ejectuto el comando enviado en consola y guardo la data

      process.stdout.on('data', data => {
        resolve(data.toString());
      });
      /*       // ejectuto el comando enviado en consola y guardo cuando haya terminado el proceso
      process.on('close', (code) => {
        console.log("ESto es el code **   ",code);
        response.code = code;
        resolve(response);
      }); */
      // guardo la data en reject si hay un error

      process.stderr.on('data', data => reject(data));
    } catch (err) {
      reject(err); // console.log(err);
    }
  });
}; // closure para obtener y acceder a la funcion runCpmmand


const starProcess = () => runCommand; // exporto el modulo
// module.exports = starProcess;


var _default = starProcess;
exports.default = _default;
//# sourceMappingURL=runProcess.js.map