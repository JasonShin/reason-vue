/* The abstract type for the global Vue constructor */
type vue;

/* The abstract type for an instance of the Vue constructor
   or its subclasses */
type vm;

/* INSTANCE METHODS / LIFECYCLE */
/* @TODO pull this in from bs-web-api */
type htmlElement;

type el =
  | Selector string
  | Element htmlElement;

type template =
  | Template string;

type definition 'data 'props;

type vmOptions 'data 'props;

type vmNext 'definition 'data 'props;

/* The actual value for the global Vue object */
external vue : vue = "" [@@bs.module];

external create :
  vue [@bs.ignore] =>
   definition 'data 'props =>
    vmNext (definition 'data 'props) 'data 'props =
  "vue" [@@bs.new] [@@bs.module];

external makeDefinition :
  props::'props? =>
  data::'data? =>
  template::template? =>
  el::el? =>
  unit =>
  definition 'data 'props =
  "" [@@bs.obj];

let make' ::props=None () => {
  {
    "props": props
  }
};

let createInstance definition => create vue definition;

type store = {. "getDate": [@bs.meth] (unit => float)};
[@bs.module] external store : store = "./store";
