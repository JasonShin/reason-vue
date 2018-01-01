'use strict';

var Vue   = require("./vue.bs.js");
var Vue$1 = require("vue");

Vue$1.config.ignoredElements = /* array */["custom-component"];

Vue$1.config.devtools = true;

Vue$1.config.productionTip = false;

var data = {
  name: "Brandon",
  age: 24,
  id: 1
};

var props = /* array */["foo"];

var definition = {
  props: props,
  data: data
};

var vm = Vue.createInstance(definition);

var d = vm.$props;

var p = vm.$props;

var o = vm.$options;

exports.data       = data;
exports.props      = props;
exports.definition = definition;
exports.vm         = vm;
exports.d          = d;
exports.p          = p;
exports.o          = o;
/*  Not a pure module */
