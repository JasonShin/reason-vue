<p align="center">
<a href="https://imgur.com/6TpYmIv"><img width="200" src="https://i.imgur.com/6TpYmIv.png" title="source: imgur.com" /></a>
</p>

# reason-vue

> Vue.js fueled by the power of reasonml

## Current stage of development <prototype>

### Immediate goal: MVP version

1. ~~vue-loader under build/loaders/re-loader.js must be registered as a custom loader via webpack using "resolveLoaders"~~

2. A simple Webpack build test that runs build and make sure it does not
fail while compiling

3. ~~vue-loader should read source passed in by vue-loader and parse it as raw JS using bsb-platform (bsb cli)~~

4. Once above requirements are done, the loader should work with
webpack-dev-server and standard webpack build task

5. Merge https://github.com/aweary/reason-vue/blob/master/src/vue.re into this project and use Vue binding inside main.re to initialise Vue instance

### How does re-loader works right now and what is the plan?

#### build

  a) Clone project_root/src into __dirname/src-cloned
 
  Why do we need this? By doing this, we do not clutter original src folder with .re and .bs.js mess

  b) Extract <script type='re'> sections from each vue file and write them into corresponding .bs.js files

  c) Write arbitary bsconfig.json file into __dirname/bsconfig.json

  d) Run `bsb -make-world` against __dirname/src-cloned

  e) todo: what do you do now with generated .bs.js files?

## How to test manually

### 1. install dependencies
`npm install` or `yarn`

### 2. Trigger webpack build and test re-loader
`npm run build` or `yarn build`

It will trigger `sync-files`, `bsb -make-world` internally


## Decisions

### 25 / 12 / 2017

- We are going to rely on bsb-cli as strictly as possible

- To allow bsb-cli to compile <script>s inside .vue files, we will
extract all scripts into .vue.re files

- Then bsb-cli will be able to compile .vue.re files located under
`build/loaders/compiled` into js files

- Once bsb compilation is complete without any errors, it will pipe the resulted files down to vue-loader for final bundling


### 26 / 12 / 2017

- Experiment what happens when you run bsb -make-world against raw .re files

- Find out how and when to sync files in Webpack

- Run BSB on synced folder

- Iteratively resolve any dependencies and use addDependency
