'use strict';

var Vue   = require("./Vue.bs.js");
var Block = require("bs-platform/lib/js/block.js");

var data = {
  name: "Brandon",
  age: 24,
  id: 1
};

var props = /* array */["foo"];

var el = /* Selector */Block.__(0, ["#test"]);

var template = /* Template */["<div>"];

var definition = {
  props: props,
  data: data,
  template: template,
  el: el
};

var vm = Vue.createInstance(definition);

exports.data       = data;
exports.props      = props;
exports.el         = el;
exports.template   = template;
exports.definition = definition;
exports.vm         = vm;
/* vm Not a pure module */
