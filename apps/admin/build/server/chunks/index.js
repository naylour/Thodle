import 'clsx';
const BROWSER = false;
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var array_from = Array.from;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var is_extensible = Object.isExtensible;
const noop = () => {};
function run_all(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i]();
    }
}
function equals(value) {
    return value === this.v;
}
function safe_not_equal(a, b) {
    return a != a
        ? b == b
        : a !== b ||
              (a !== null && typeof a === 'object') ||
              typeof a === 'function';
}
function safe_equals(value) {
    return !safe_not_equal(value, this.v);
}
const DERIVED = 1 << 1;
const EFFECT = 1 << 2;
const RENDER_EFFECT = 1 << 3;
const BLOCK_EFFECT = 1 << 4;
const BRANCH_EFFECT = 1 << 5;
const ROOT_EFFECT = 1 << 6;
const BOUNDARY_EFFECT = 1 << 7;
const UNOWNED = 1 << 8;
const DISCONNECTED = 1 << 9;
const CLEAN = 1 << 10;
const DIRTY = 1 << 11;
const MAYBE_DIRTY = 1 << 12;
const INERT = 1 << 13;
const DESTROYED = 1 << 14;
const EFFECT_RAN = 1 << 15;
const EFFECT_TRANSPARENT = 1 << 16;
const INSPECT_EFFECT = 1 << 17;
const HEAD_EFFECT = 1 << 18;
const EFFECT_PRESERVED = 1 << 19;
const EFFECT_IS_UPDATING = 1 << 20;
const USER_EFFECT = 1 << 21;
const STATE_SYMBOL = Symbol('$state');
const LEGACY_PROPS = Symbol('legacy props');
const STALE_REACTION = new (class StaleReactionError extends Error {
    name = 'StaleReactionError';
    message =
        'The reaction that called `getAbortSignal()` was re-run or destroyed';
})();
const COMMENT_NODE = 8;
const HYDRATION_START = '[';
const HYDRATION_END = ']';
const HYDRATION_ERROR = {};
const UNINITIALIZED = Symbol();
function lifecycle_outside_component(name) {
    {
        throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
    }
}
var current_component = null;
function getContext(key) {
    const context_map = get_or_init_context_map();
    const result =
        /** @type {T} */
        context_map.get(key);
    return result;
}
function setContext(key, context) {
    get_or_init_context_map().set(key, context);
    return context;
}
function get_or_init_context_map(name) {
    if (current_component === null) {
        lifecycle_outside_component();
    }
    return (current_component.c ??= new Map(
        get_parent_context(current_component) || void 0,
    ));
}
function push(fn) {
    current_component = { p: current_component, c: null, d: null };
}
function pop() {
    var component =
        /** @type {Component} */
        current_component;
    var ondestroy = component.d;
    if (ondestroy) {
        on_destroy.push(...ondestroy);
    }
    current_component = component.p;
}
function get_parent_context(component_context) {
    let parent = component_context.p;
    while (parent !== null) {
        const context_map = parent.c;
        if (context_map !== null) {
            return context_map;
        }
        parent = parent.p;
    }
    return null;
}
const BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
const BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;
class HeadPayload {
    /** @type {Set<{ hash: string; code: string }>} */
    css = /* @__PURE__ */ new Set();
    out = '';
    uid = () => '';
    title = '';
    constructor(
        css = /* @__PURE__ */ new Set(),
        out = '',
        title = '',
        uid = () => '',
    ) {
        this.css = css;
        this.out = out;
        this.title = title;
        this.uid = uid;
    }
}
class Payload {
    /** @type {Set<{ hash: string; code: string }>} */
    css = /* @__PURE__ */ new Set();
    out = '';
    uid = () => '';
    select_value = void 0;
    head = new HeadPayload();
    constructor(id_prefix = '') {
        this.uid = props_id_generator(id_prefix);
        this.head.uid = this.uid;
    }
}
function props_id_generator(prefix) {
    let uid = 1;
    return () => `${prefix}s${uid++}`;
}
function reset_elements() {
    return () => {};
}
let controller = null;
function abort() {
    controller?.abort(STALE_REACTION);
    controller = null;
}
let on_destroy = [];
function render(component, options = {}) {
    try {
        const payload = new Payload(
            options.idPrefix ? options.idPrefix + '-' : '',
        );
        const prev_on_destroy = on_destroy;
        on_destroy = [];
        payload.out += BLOCK_OPEN;
        let reset_reset_element;
        if (BROWSER);
        if (options.context) {
            push();
            current_component.c = options.context;
        }
        component(payload, options.props ?? {}, {}, {});
        if (options.context) {
            pop();
        }
        if (reset_reset_element) {
            reset_reset_element();
        }
        payload.out += BLOCK_CLOSE;
        for (const cleanup of on_destroy) cleanup();
        on_destroy = prev_on_destroy;
        let head = payload.head.out + payload.head.title;
        for (const { hash, code } of payload.css) {
            head += `<style id="${hash}">${code}</style>`;
        }
        return {
            head,
            html: payload.out,
            body: payload.out,
        };
    } finally {
        abort();
    }
}
export {
    define_property as A,
    BROWSER as B,
    CLEAN as C,
    DERIVED as D,
    EFFECT_RAN as E,
    COMMENT_NODE as F,
    HYDRATION_START as G,
    HYDRATION_ERROR as H,
    INSPECT_EFFECT as I,
    HYDRATION_END as J,
    array_from as K,
    LEGACY_PROPS as L,
    MAYBE_DIRTY as M,
    render as N,
    push as O,
    setContext as P,
    pop as Q,
    ROOT_EFFECT as R,
    STATE_SYMBOL as S,
    noop as T,
    UNINITIALIZED as U,
    getContext as V,
    safe_not_equal as W,
    array_prototype as a,
    get_prototype_of as b,
    UNOWNED as c,
    DIRTY as d,
    equals as e,
    BLOCK_EFFECT as f,
    get_descriptor as g,
    BRANCH_EFFECT as h,
    is_array as i,
    is_extensible as j,
    EFFECT_PRESERVED as k,
    BOUNDARY_EFFECT as l,
    HEAD_EFFECT as m,
    DESTROYED as n,
    object_prototype as o,
    INERT as p,
    EFFECT_TRANSPARENT as q,
    STALE_REACTION as r,
    safe_equals as s,
    RENDER_EFFECT as t,
    EFFECT as u,
    USER_EFFECT as v,
    run_all as w,
    DISCONNECTED as x,
    EFFECT_IS_UPDATING as y,
    index_of as z,
};
