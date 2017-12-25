# reason-vue

> Vue.js fueled by the power of reasonml

## Current stage of development <prototype>

### Immediate goal: MVP version

1. vue-loader under build/loaders/re-loader.js must be registered as a
custom loader via webpack using "resolveLoaders"

2. A simple Webpack build test that runs build and make sure it does not
fail while compiling

3. vue-loader should read source passed in by vue-loader and parse it as
raw JS using bsb-platform (bsb cli)

4. Once above requirements are done, the loader should work with
webpack-dev-server and standard webpack build task

### How does re-loader works right now and what is the plan?

I wasn't able to find how to compile reasonml on the fly using bsb cli.
At the moment the plan / implementation is:
  a) receive reasonml code in the re-loader as source variable, which may
  look like
  ```
  /* code is coming from App.vue <script lang='re'> */
  let ageAndName = (24, "Lil' Reason");
  let my3dCoordinates = (20.0, 30.5, 100.0);
  Js.log(my3dCoordinates);
  ```

  b) Write above input into a bundle file called bundle.re
  c) cd into `build/loaders/`
  d) make sure bsconfig.json file exists
  ```
  {
    "name" : "reason-vue",
    "sources": ".",
    "refmt": 3,
    "bsc-flags": ["-bs-no-version-header"]
  }
  ```
  e) run `bsb -make-world`
  f) see bsb cli compiles `bundle.re` in the `lib` folder
  h) `fs.readFileSync` the file `build/loaders/lib/js/bundle.js` and
  return it inside default exported function of re-loader.js

## How to test

``` bash
# 1. install dependencies
`npm install` or `yarn`

# 2. Trigger webpack build and test re-loader
`npm run build` or `yarn build`

Note: I encourage `yarn build` to debug so you can physically see compiled
JS in the build/loaders folder

# 3. Modify .vue files or re-loader.js and run build again
