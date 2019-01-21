/* eslint-disable no-console */
import {get, omit, set, throttle, update} from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';

export {default as Checkboxes} from './Checkboxes';
export {default as Input} from './Input';
export {default as RadioButtons} from './RadioButtons';
export {default as Select} from './Select';
export {default as TextArea} from './TextArea';

const MSG_PREFIX = 'vuex-easy method ';
const STATE_KEY = 'vuex-easy-state';
const VERSION_KEY = '@vuexEasyVersion';

Vue.use(Vuex);

let initialState, options, store;

const identityFn = state => state;

function copyWithoutFunctions(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    if (typeof value !== 'function') acc[key] = value;
    return acc;
  }, {});
}

export function createStore(initState, opts = {}) {
  initialState = initState;
  options = opts;
  const {persist = true, replacerFn = identityFn, validate} = options;

  const throttledSave = throttle(() => {
    const json = JSON.stringify(replacerFn(store.state));
    sessionStorage.setItem(STATE_KEY, json);
  }, 1000);

  store = new Vuex.Store({
    strict: true,
    state: initialState,
    mutations: {
      decrement(state, {path, delta}) {
        if (validate) {
          validatePath('decrement', path);
          validateNumber('decrement', 'delta', delta);
          validatePathType('decrement', path, 'number', get(state, path));
        }
        update(state, path, n => n - delta);
        if (persist) throttledSave();
      },
      delete(state, path) {
        if (validate) validatePath('delete', path);
        state = omit(state, path);
        if (persist) throttledSave();
      },
      filter(state, {path, fn}) {
        if (validate) {
          validatePath('filter', path);
          validateArrayPath('filter', path, get(state, path));
          validateFunction('filter', fn);
        }
        update(state, path, arr => arr.filter(fn));
        if (persist) throttledSave();
      },
      increment(state, {path, delta}) {
        if (validate) {
          validatePath('increment', path);
          validateNumber('increment', 'delta', delta);
          validatePathType('increment', path, 'number', get(state, path));
        }
        update(state, path, n => n + delta);
        if (persist) throttledSave();
      },
      map(state, {path, fn}) {
        if (validate) {
          validatePath('map', path);
          validateArrayPath('map', path, get(state, path));
          validateFunction('map', fn);
        }
        update(state, path, arr => arr.map(fn));
        if (persist) throttledSave();
      },
      push(state, {path, values}) {
        if (validate) {
          validatePath('push', path);
          validateArrayPath('push', path, get(state, path));
        }
        get(state, path).push(...values);
        if (persist) throttledSave();
      },
      set(state, {path, value}) {
        if (validate) validatePath('set', path);
        set(state, path, value);
        if (persist) throttledSave();
      },
      toggle(state, path) {
        if (validate) {
          validatePath('toggle', path);
          validatePathType('toggle', path, 'boolean', get(state, path));
        }
        if (options.validate) {
          const value = get(state, path);
          const typ = typeof value;
          if (typ !== 'boolean' && typ !== 'undefined') {
            throw new Error(
              `${MSG_PREFIX}toggle requires a path to a boolean value, ` +
                `but the value at path "${path}" is a ${typ}`
            );
          }
        }
        set(state, path, !get(state, path));
        if (persist) throttledSave();
      },
      transform(state, {path, fn}) {
        if (validate) {
          validatePath('transform', path);
          validateFunction('transform', fn);
        }
        update(state, path, fn);
        if (persist) throttledSave();
      }
    },
    getters: {
      uncompletedCount: state => state.todos.filter(t => !t.done).length
    }
  });

  return store;
}

export const getStore = () => store;

export function loadState() {
  const {
    persist = true,
    replacerFn = identityFn,
    reviverFn = identityFn,
    version
  } = options;

  const {sessionStorage} = window; // not available in tests

  const cleanState = replacerFn(initialState);

  if (!persist || !sessionStorage) {
    store.replaceState(cleanState);
    return;
  }

  // If the version passed to createStore does not match the version
  // last saved in sessionStorage, assume that the shape of the state
  // may have changed and revert to initialState.
  const ssVersion = sessionStorage.getItem(VERSION_KEY);
  if (String(version) !== ssVersion) {
    sessionStorage.setItem(STATE_KEY, JSON.stringify(cleanState));
    sessionStorage.setItem(VERSION_KEY, version);
    store.replaceState(cleanState);
    return;
  }

  const json = sessionStorage.getItem(STATE_KEY);
  if (!json) return cleanState;

  try {
    const state = JSON.parse(json);
    const revived = reviverFn(state);
    store.replaceState(revived);
  } catch (e) {
    console.error('invalid json in sessionStorage:', e);
    store.replaceState(cleanState);
  }
}

export const vxe = {
  decrement(path, delta = 1) {
    store.commit('decrement', {path, delta});
  },
  delete(path) {
    store.commit('delete', path);
  },
  filter(path, fn) {
    store.commit('filter', {path, fn});
  },
  get(path) {
    return get(store.state, path);
  },
  increment(path, delta = 1) {
    store.commit('increment', {path, delta});
  },
  log(label = '') {
    console.info(
      'vuex-easy:',
      label,
      'state =',
      copyWithoutFunctions(store.state)
    );
  },
  map(path, fn) {
    store.commit('map', {path, fn});
  },
  push(path, ...values) {
    store.commit('push', {path, values});
  },
  set(path, value) {
    store.commit('set', {path, value});
  },
  toggle(path) {
    store.commit('toggle', path);
  },
  transform(path, fn) {
    store.commit('transform', {path, fn});
  }
};

let validateArrayPath = (methodName, path, value) => {
  if (Array.isArray(value)) return;
  throw new Error(
    `${MSG_PREFIX}${methodName} requires a path to an array, ` +
      `but the value at path "${path}" is a ${typeof value}`
  );
};

let validateFunction = (methodName, value) => {
  if (typeof value === 'function') return;
  throw new Error(
    MSG_PREFIX + methodName + ' requires a function, but got ' + value
  );
};

let validateNumber = (methodName, argName, value) => {
  const typ = typeof value;
  if (typ === 'number') return;
  throw new Error(
    `${MSG_PREFIX}${methodName} requires a number for the ` +
      `"${argName}" argument, but the value passed is a ${typ}`
  );
};

let validatePath = (methodName, path) => {
  const typ = typeof path;
  if (typ === 'string') return;
  throw new Error(
    `${MSG_PREFIX}${methodName} requires a string path, but got a ${typ}`
  );
};

let validatePathType = (methodName, path, expectedType, value) => {
  const typ = typeof value;
  if (typ === expectedType) return;
  throw new Error(
    `${MSG_PREFIX}${methodName} requires a path to a ${expectedType}, ` +
      `but the value at path "${path}" is a ${typ}`
  );
};
