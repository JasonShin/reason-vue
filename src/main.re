open Vue;

let data = {
  "name": "Brandon",
  "age": 24,
  "id": 1
};

let props = [|"foo"|];

let el = Selector("#test");

let template = Template("<div>");

let definition = makeDefinition
  data::data
  props::props
  template::template
  el::el
();

let vm = createInstance definition;
