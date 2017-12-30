'use strict';

var HelloWorld = require("./components/HelloWorld.bs.js");

var Stuff_001 = /* ageAndName : tuple */[
  24,
  "Lil' Reason"
];

var Stuff_002 = /* my3dCoordinates : tuple */[
  20.0,
  30.5,
  100.0
];

var Stuff = /* module */[
  /* score */10,
  Stuff_001,
  Stuff_002,
  /* test */HelloWorld.score
];

exports.Stuff = Stuff;
/* No side effect */
