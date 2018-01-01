/* The abstract type for the global Vue constructor */
type vue;

/* The abstract type for an instance of the Vue constructor
   or its subclasses */
type vm;

/* INSTANCE METHODS / LIFECYCLE */
type htmlElement;

type el =
  | Selector string
  | Element htmlElement;

type definition 'data 'props;

type vmOptions 'data 'props;

type vmNext 'definition 'data 'props;

/* The actual value for the global Vue object */
external vue : vue = "" [@@bs.module];

external create :
  vue [@bs.ignore] => definition 'data 'props => vmNext (definition 'data 'props) 'data 'props =
  "vue" [@@bs.new] [@@bs.module];

external makeDefinition :
  props::'props? =>
  data::'data? =>
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


/* Getters for all VM instance data properties */
external getInstanceData : vmNext 'definition 'data 'props => 'data = "$props" [@@bs.get];
external getInstanceProps : vmNext 'definition 'data 'props  => 'props = "$props" [@@bs.get];

external getInstanceOptions : vmNext 'definition 'data 'props => 'definition =
  "$options" [@@bs.get];

external getInstanceParent : vm => string = "$parent" [@@bs.get];

external getInstanceRoot : vm => string = "$root" [@@bs.get];

external getInstanceChildren : vm => string = "$children" [@@bs.get];

external getInstanceSlots : vm => string = "$slot" [@@bs.get];

external getInstanceRefs : vm => string = "$refs" [@@bs.get];

external isInstanceServer : vm => Js.boolean = "$isServer" [@@bs.get];

external getInstanceAttrs : vm => string = "$attrs" [@@bs.get];

external getInstanceListeners : vm => string = "$listeners" [@@bs.get];

/* Externals and types for vm.$watch */
/* @TODO uncurry this */
type unwatchFn = unit => unit;

type watchCallback = unit => unit;

type watchExpr 'a 'b 'c = 'a => 'b => 'c;

external watchKeyPath : vm => string => (unit => unit) [@bs.uncurry] => unwatchFn =
  "$watch" [@@bs.send];

external watchExpression : vm => watchExpr 'a 'b 'c => watchCallback => unwatchFn =
  "$watch" [@@bs.send];

/* vm.$set */
/* @TODO */
/* vm.$delete */
/* @TODO */
/* vm.$on */
external onEvent : string => 'a => vm = "$on" [@@bs.send.pipe : vm];

external onEvents : vm => Js.Array.t string => 'a => vm = "$on" [@@bs.send.pipe : vm];

/* vm.$once */
external onceEvent : vm => string => 'a => unit = "$once" [@@bs.send];

/* vm.$off */
/* @TODO whats a better naming scheme here? */
external removeAllEventListeners : vm => unit = "$off" [@@bs.send];

external removeListenersForEvent : vm => string => unit = "$off" [@@bs.send];

external removeListenerForEvent : vm => string => 'a => unit = "$off" [@@bs.send];

/* vm.$emit */
/* @TODO anyway to use bs.splice with polymorphic args? */
external emit : vm => string => array 'a => unit = "$emit" [@@bs.send] [@@bs.splice];


/* vm.$mount */
external mount : vm => el => Js.boolean => unit = "$mount" [@@bs.send];

external mountOffDocument : vm => vm = "$mount" [@@bs.send];

external mountAndHydrate : vm => Js.boolean => vm = "$mount" [@@bs.send];

/* vm.$forceUpdate */
external forceUpdate : vm => unit = "$forceUpdate" [@@bs.send];

/* vm.$nextTick */
/* @TODO */
/* vm.$destroy */
external destroy : vm => unit = "$destroy" [@@bs.send];

/* Abstract type for the Vue instance's data */
/* @TODO this should be an open object type */
type data;

type props 'a =
  | Simple (Js.Array.t string)
  | Complex (Js.t 'a);

/* options that you can pass to the global Vue constructor */
type options 'a =
  Js.t {
    .
    /* An existind DOM element for Vue to mount on */
    el : el,
    /* A string template to be used as the markup for the Vue instance */
    template : string,
    /* The data object for the Vue instnace */
    data : data,
    /* Data to accept from the parent component */
    props : props 'a
  };

/* A merge strategy is used by config.optionalMergeStrategies */
type mergeStategy = string => string => vue => unit;

/* Error handlers are defined on Vue.config.errorHandler */
/* @TODO are these types right? */
type errorHandler = string => vue => string => unit;

/* Error handlers are defined on Vue.config.warnHandler */
/* @TODO are these types right? */
type warnHandler = string => vue => string => unit;

/* An ignored element is a string representing a DOM element
   That is being ignored by Vue. Usually a web component */
type ignoredElement = string;

/* Keycode variant */
type keyCode =
  | KeyCode int
  | KeyCodes (Js.Array.t int);

/* Keycode dictionary */
type keyCodes = Js.Dict.t keyCode;

/* Top-level config options set/get on Vue.config  */
module Config = {
  /* Get/set Vue.config.silent */
  external setSilent' : vue => Js.boolean => unit = "silent" [@@bs.scope "config"] [@@bs.set];
  external getSilent : vue => Js.boolean = "silent" [@@bs.scope "config"] [@@bs.get];
  /* Helper utility so config setting can be chained */
  let setSilent silent vue => {
    setSilent' vue silent;
    vue
  };
  /* Get/set Vue.config.devtools */
  external setDevtools' : vue => Js.boolean => unit = "devtools" [@@bs.scope "config"] [@@bs.set];
  external getDevtools : vue => Js.boolean = "devtools" [@@bs.scope "config"] [@@bs.get];
  /* Helper utility so config setting can be chained */
  let setDevtools devtools vue => {
    setDevtools' vue devtools;
    vue
  };
  /* Get/set Vue.config.errorHandler */
  external setErrorHandler' : vue => errorHandler => unit =
    "errorHandler" [@@bs.scope "config"] [@@bs.set];
  external getErrorHandler : vue => Js.Undefined.t errorHandler =
    "errorHandler" [@@bs.scope "config"] [@@bs.get];
  /* Hepler utiltiy so config setting can be chained */
  let setErrorHandler errorHandler vue => {
    setErrorHandler' vue errorHandler;
    vue
  };
  /* Get/set Vue.config.warnHandler */
  external setWarnHandler' : vue => warnHandler => unit =
    "warnHandler" [@@bs.scope "config"] [@@bs.set];
  external getWarnHandler : vue => Js.Undefined.t warnHandler =
    "warnHandler" [@@bs.scope "config"] [@@bs.get];
  /* Hepler utiltiy so config setting can be chained */
  let setWarnHandler warnHandler vue => {
    setWarnHandler' vue warnHandler;
    vue
  };
  /* Get/set for Vue.config.ignoredElements */
  external setIgnoredElements' : vue => Js.Array.t ignoredElement => unit =
    "ignoredElements" [@@bs.scope "config"] [@@bs.set];
  external getIgnoredElements : vue => Js.Array.t ignoredElement =
    "ignoredElements" [@@bs.scope "config"] [@@bs.get];
  /* Helper utility so config setting can be chained */
  let setIgnoredElements ignoredElements vue => {
    setIgnoredElements' vue ignoredElements;
    vue
  };
  /* TODO move this into a KeyCode module */
  external setKeyCodes' : vue => keyCodes => unit = "keyCodes" [@@bs.scope "config"] [@@bs.set];
  external getKeyCodes : vue => keyCodes = "keyCodes" [@@bs.scope "config"] [@@bs.get];
  let setKeyCodes keyCodes vue => {
    setKeyCodes' vue keyCodes;
    vue
  };
  let makeKeyCodes () :keyCodes => Js.Dict.empty ();
  let setKeyCodePair key (value: keyCode) keyCodes => {
    Js.Dict.set keyCodes key value;
    keyCodes
  };
  setKeyCodes
    (
      makeKeyCodes () |> setKeyCodePair "foo" (KeyCode 52) |> setKeyCodePair "foo" (KeyCode 52) |>
      setKeyCodePair "foo" (KeyCode 52)
    )
    vue;
  /* Get/set for Vue.config.performance */
  external setPerformance' : vue => Js.boolean => unit =
    "performance" [@@bs.scope "config"] [@@bs.set];
  external getPerformance : vue => Js.boolean = "performance" [@@bs.scope "config"] [@@bs.get];
  let setPerformance value vue => {
    setPerformance' vue value;
    vue
  };
  /* Get/set for Vue.config.productionTip */
  external setProductionTip' : vue => Js.boolean => unit =
    "productionTip" [@@bs.scope "config"] [@@bs.set];
  external getProductionTip : vue => Js.boolean = "productionTip" [@@bs.scope "config"] [@@bs.get];
  let setProductionTip value vue => {
    setPerformance' vue value;
    vue
  };
};

/* Vue.extend */
/* @TODO I don't know what this is */
type extendConfig = Js.t {. template : string};

external extend : extendConfig => vue = "extend" [@@bs.module "vue"];

/* Vue.nextTick */
/* Context can really be anything that you can pass to .bind() */
type context;

/* Let users convert whatever they want to a context type */
external anyToContext : 'a => context = "%identity";

external nextTick : (unit => unit) => context => unit = "nextTick" [@@bs.module "vue"];

/* Vue.set */
/* @TODO type 'a as Object | Array somehow */
/* @TODO type 'b as any value */
external set : 'a => string => 'b = "set" [@@bs.module "vue"];

/* Vue.delete */
/* @TODO type 'a as Object | Array somehow */
external delete : 'a => string => unit = "delete" [@@bs.module "vue"];

/* Vue.directive */
type directive;

/* @TODO add all the possible fields */
type directiveDefinition = Js.t {. bind : unit => unit};

/* TODO these names are verboseeeee */
external defineDirectiveWithObj : string => directiveDefinition => directive =
  "directive" [@@bs.module "vue"];

external defineDirectiveWithFunc : string => (unit => unit) => directive =
  "directive" [@@bs.module "vue"];

/* Vue.filter */
type filterFunction 'a 'b = 'a => 'b;

external defineFilter : string => filterFunction 'a 'b => unit = "filter" [@@bs.module "vue"];

/* TODO fix this so its not giving a generalized type variable error */
/* external getFilter : string => filterFunction 'a 'b = "fiter" [@@bs.module "vue"]; */
/* Vue.component */
/* TODO is there any reason to _use_ this returned component constructor? */
type component;

/* TODO type the 'a options */
external createComponent : string => 'a => component = "" [@@bs.module "vue"];

/* Vue.use */
/* @TODO implement this so you can write Vue plugins */
type plugin;

external usePlugin : vue => plugin => unit = "use" [@@module "vue"];

/* Vue.mixin */
/* @TODO */
/* Vue.compile */
type template;

external compile : string => template = "" [@@bs.module "vue"];

/* Vue.version */
external version : string = "" [@@bs.module "vue"];
