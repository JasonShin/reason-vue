'use strict';

var Vue = require("vue");

function make$prime($staropt$star, _) {
  return {
          props: $staropt$star ? $staropt$star[0] : /* None */0
        };
}

function createInstance(definition) {
  return new Vue(definition);
}

exports.make$prime     = make$prime;
exports.createInstance = createInstance;
/* vue Not a pure module */
