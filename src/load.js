import path from 'path';
import capitalize from 'lodash/string/capitalize';
import angular from 'angular';
import { register } from './compileProvider';
import createDirectiveFactory from './createDirectiveFactory';

function firstToLowerCase(str) {
  return str.substr(0, 1).toLowerCase() + str.substr(1);
}

// const req = require.context('./', true, /.*\.js$/);
export function directives(req, namingConventions = true) {
  req.keys().forEach((filePath) => {
    const parts = filePath.split('/');
    if (namingConventions && parts.length !== 3) {
      return;
    }

    var name = '';

    const fileName = path.basename(filePath, path.extname(filePath));
    if( namingConventions ) {
      name = parts[1];
    }
    if (namingConventions && (!fileName || !name || fileName.toLowerCase() !== name.toLowerCase())) {
      return;
    }

    const Direktive = req(filePath);
    if(!namingConventions) {
      name = Direktive.default ? Direktive.default.name : Direktive.name;
    }
    register(name, createDirectiveFactory(Direktive.default ? Direktive.default : Direktive));
  });
}

export function controllers(req, moduleName = 'controllers', namingConventions = true) {
  const module = angular.module(moduleName, []);

  req.keys().forEach((filePath) => {

    const parts = filePath.split('/');

    if (namingConventions && parts.length !== 3) {
      return;
    }

    const fileName = path.basename(filePath, path.extname(filePath));
    const folder = parts[1];

    if (namingConventions && (!fileName || !folder || fileName.toLowerCase() !== name.toLowerCase())) {
      return;
    }

    const Controller = req(filePath);
    const name = Controller.default ? Controller.default.name : Controller.name;
    module.controller(capitalize(name), Controller.default ? Controller.default : Controller);
  });
}

export function services(req, moduleName = 'services', namingConventions = true) {
  const module = angular.module(moduleName, []);

  req.keys().forEach((filePath) => {
    var name = path.basename(filePath, path.extname(filePath));
    if (name === 'index') {
      return;
    }

    const Service = req(filePath);
    module.service(firstToLowerCase(name), Service.default ? Service.default : Service);
  });
}

export function factories(req, moduleName = 'factories', namingConventions = true) {
  const module = angular.module(moduleName, []);

  req.keys().forEach((filePath) => {
    var name = path.basename(filePath, path.extname(filePath));
    if (name === 'index') {
      return;
    }

    const factory = req(filePath);
    if(!namingConventions) {
      name = factory.default ? factory.default.name : factory.name;
    }
    module.factory(capitalize(name), factory.default ? factory.default : factory);
  });
}

export function filters(req, moduleName = 'filters', namingConventions = true) {
  const module = angular.module(moduleName, []);

  req.keys().forEach((filePath) => {
    var name = path.basename(filePath, path.extname(filePath));
    if (name === 'index') {
      return;
    }

    const filter = req(filePath);
    if(!namingConventions) {
      name = filter.default ? filter.default.name : filter.name;
    }
    module.filter(name, filter.default ? filter.default : filter);
  });
}
