open Vue;

Config.setIgnoredElements' vue [| "custom-component" |];
Config.setDevtools' vue Js.true_;
Config.setProductionTip' vue Js.false_;

let data = {
  "name": "Brandon",
  "age": 24,
  "id": 1
};

let props = [|"foo"|];

let definition = makeDefinition
  data::data
  props::props
();

let vm = createInstance definition;

let d = getInstanceData vm;
let p = getInstanceProps vm;
let o = getInstanceOptions vm;
