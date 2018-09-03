'use strict';

var HelloWorld = require("./components/HelloWorld.js");

console.log(HelloWorld.score);

var score = 10;

var ageAndName = /* tuple */[
  24,
  "Lil' Reason"
];

var my3dCoordinates = /* tuple */[
  20.0,
  30.5,
  100.0
];

exports.score = score;
exports.ageAndName = ageAndName;
exports.my3dCoordinates = my3dCoordinates;
/*  Not a pure module */
