'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = exceptionConfig;

function exceptionConfig($provide) {
  $provide.decorator('$exceptionHandler', function ($delegate) {
    return function (exception) {
      setTimeout(function () {
        throw exception;
      });
    };
  });
}

exceptionConfig.$inject = ['$provide'];
module.exports = exports['default'];