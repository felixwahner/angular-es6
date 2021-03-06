'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.directives = directives;
exports.components = components;
exports.controllers = controllers;
exports.services = services;
exports.factories = factories;
exports.filters = filters;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _capitalize = require('lodash/string/capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _compileProvider = require('./compileProvider');

var _createDirectiveFactory = require('./createDirectiveFactory');

var _createDirectiveFactory2 = _interopRequireDefault(_createDirectiveFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function firstToLowerCase(str) {
  return str.substr(0, 1).toLowerCase() + str.substr(1);
}

// const req = require.context('./', true, /.*\.js$/);
function directives(req) {
  var namingConventions = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  req.keys().forEach(function (filePath) {
    var parts = filePath.split('/');
    if (namingConventions && parts.length !== 3) {
      return;
    }

    var name = '';

    var fileName = _path2.default.basename(filePath, _path2.default.extname(filePath));
    if (namingConventions) {
      name = parts[1];
    }
    if (namingConventions && (!fileName || !name || fileName.toLowerCase() !== name.toLowerCase())) {
      return;
    }

    var Direktive = req(filePath);
    if (!namingConventions) {
      name = Direktive.default ? Direktive.default.name : Direktive.name;
    }
    (0, _compileProvider.register)(name, (0, _createDirectiveFactory2.default)(Direktive.default ? Direktive.default : Direktive));
  });
}

// const req = require.context('./', true, /.*\.js$/);
function components(req) {
  var moduleName = arguments.length <= 1 || arguments[1] === undefined ? 'components' : arguments[1];
  var namingConventions = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  var module = _angular2.default.module(moduleName, []);

  req.keys().forEach(function (filePath) {
    var parts = filePath.split('/');
    if (namingConventions && parts.length !== 3) {
      return;
    }

    var name = '';

    var fileName = _path2.default.basename(filePath, _path2.default.extname(filePath));
    if (namingConventions) {
      name = parts[1];
    }
    if (namingConventions && (!fileName || !name || fileName.toLowerCase() !== name.toLowerCase())) {
      return;
    }

    var Component = req(filePath);

    if (!namingConventions) {
      name = Component.default ? Component.default.name : Component.name;
    }
    console.log(name);
    module.component(name, Component.default ? Component.default.config : Component.config);
  });
}

function controllers(req) {
  var moduleName = arguments.length <= 1 || arguments[1] === undefined ? 'controllers' : arguments[1];
  var namingConventions = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  var module = _angular2.default.module(moduleName, []);

  req.keys().forEach(function (filePath) {

    var parts = filePath.split('/');

    if (namingConventions && parts.length !== 3) {
      return;
    }

    var fileName = _path2.default.basename(filePath, _path2.default.extname(filePath));
    var folder = parts[1];

    if (namingConventions && (!fileName || !folder || fileName.toLowerCase() !== name.toLowerCase())) {
      return;
    }

    var Controller = req(filePath);
    var name = Controller.default ? Controller.default.name : Controller.name;
    module.controller((0, _capitalize2.default)(name), Controller.default ? Controller.default : Controller);
  });
}

function services(req) {
  var moduleName = arguments.length <= 1 || arguments[1] === undefined ? 'services' : arguments[1];
  var namingConventions = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  var module = _angular2.default.module(moduleName, []);

  req.keys().forEach(function (filePath) {
    var name = _path2.default.basename(filePath, _path2.default.extname(filePath));
    if (name === 'index') {
      return;
    }

    var Service = req(filePath);
    module.service(firstToLowerCase(name), Service.default ? Service.default : Service);
  });
}

function factories(req) {
  var moduleName = arguments.length <= 1 || arguments[1] === undefined ? 'factories' : arguments[1];
  var namingConventions = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  var module = _angular2.default.module(moduleName, []);

  req.keys().forEach(function (filePath) {
    var name = _path2.default.basename(filePath, _path2.default.extname(filePath));
    if (name === 'index') {
      return;
    }

    var factory = req(filePath);
    if (!namingConventions) {
      name = factory.default ? factory.default.name : factory.name;
    }
    module.factory((0, _capitalize2.default)(name), factory.default ? factory.default : factory);
  });
}

function filters(req) {
  var moduleName = arguments.length <= 1 || arguments[1] === undefined ? 'filters' : arguments[1];
  var namingConventions = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  var module = _angular2.default.module(moduleName, []);

  req.keys().forEach(function (filePath) {
    var name = _path2.default.basename(filePath, _path2.default.extname(filePath));
    if (name === 'index') {
      return;
    }

    var filter = req(filePath);
    if (!namingConventions) {
      name = filter.default ? filter.default.name : filter.name;
    }
    module.filter(name, filter.default ? filter.default : filter);
  });
}