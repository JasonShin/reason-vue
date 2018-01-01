'use strict';

var Vue   = require("vue");
var Block = require("bs-platform/lib/js/block.js");

function make$prime($staropt$star, _) {
  return {
          props: $staropt$star ? $staropt$star[0] : /* None */0
        };
}

function createInstance(definition) {
  return new Vue(definition);
}

function setSilent(silent, vue) {
  vue.config.silent = silent;
  return vue;
}

function setDevtools(devtools, vue) {
  vue.config.devtools = devtools;
  return vue;
}

function setErrorHandler(errorHandler, vue) {
  vue.config.errorHandler = errorHandler;
  return vue;
}

function setWarnHandler(warnHandler, vue) {
  vue.config.warnHandler = warnHandler;
  return vue;
}

function setIgnoredElements(ignoredElements, vue) {
  vue.config.ignoredElements = ignoredElements;
  return vue;
}

function setKeyCodes(keyCodes, vue) {
  vue.config.keyCodes = keyCodes;
  return vue;
}

function makeKeyCodes() {
  return { };
}

function setKeyCodePair(key, value, keyCodes) {
  keyCodes[key] = value;
  return keyCodes;
}

setKeyCodes(setKeyCodePair("foo", /* KeyCode */Block.__(0, [52]), setKeyCodePair("foo", /* KeyCode */Block.__(0, [52]), setKeyCodePair("foo", /* KeyCode */Block.__(0, [52]), { }))), Vue);

function setPerformance(value, vue) {
  vue.config.performance = value;
  return vue;
}

function setProductionTip(value, vue) {
  vue.config.performance = value;
  return vue;
}

var Config = /* module */[
  /* setSilent */setSilent,
  /* setDevtools */setDevtools,
  /* setErrorHandler */setErrorHandler,
  /* setWarnHandler */setWarnHandler,
  /* setIgnoredElements */setIgnoredElements,
  /* setKeyCodes */setKeyCodes,
  /* makeKeyCodes */makeKeyCodes,
  /* setKeyCodePair */setKeyCodePair,
  /* setPerformance */setPerformance,
  /* setProductionTip */setProductionTip
];

exports.make$prime     = make$prime;
exports.createInstance = createInstance;
exports.Config         = Config;
/*  Not a pure module */
