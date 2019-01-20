/* eslint-disable no-console */
import {get, omit, set, update} from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';

export {default as Checkboxes} from './Checkboxes';
export {default as Input} from './Input';
export {default as RadioButtons} from './RadioButtons';
export {default as Select} from './Select';
export {default as TextArea} from './TextArea';

const MSG_PREFIX = 'vuex-easy method ';

Vue.use(Vuex);

let options, store;

const noOp = () => {};
const defaultOptions = {persist: true};

export function createStore(initialState, opts = {persist: defaultOptions}) {
  options = opts;

  if (!options.validate) {
    validateArrayPath = noOp;
    validateFunction = noOp;
    validateNumber = noOp;
    validatePath = noOp;
    validatePathType = noOp;
  }

  store = new Vuex.Store({
    strict: true,
    state: initialState,
    mutations: {
      decrement(state, {path, delta}) {
        validatePath('decrement', path);
        validateNumber('decrement', 'delta', delta);
        validatePathType('decrement', path, 'number', get(state, path));
        update(state, path, n => n - delta);
      },
      delete(state, path) {
        validatePath('delete', path);
        state = omit(state, path);
      },
      filter(state, {path, fn}) {
        validatePath('filter', path);
        validateArrayPath('filter', path, get(state, path));
        validateFunction('filter', fn);
        update(state, path, arr => arr.filter(fn));
      },
      increment(state, {path, delta}) {
        validatePath('increment', path);
        validateNumber('increment', 'delta', delta);
        validatePathType('increment', path, 'number', get(state, path));
        update(state, path, n => n + delta);
      },
      map(state, {path, fn}) {
        validatePath('map', path);
        validateArrayPath('map', path, get(state, path));
        validateFunction('map', fn);
        update(state, path, arr => arr.map(fn));
      },
      push(state, {path, values}) {
        validatePath('push', path);
        validateArrayPath('push', path, get(state, path));
        get(state, path).push(...values);
      },
      set(state, {path, value}) {
        validatePath('set', path);
        set(state, path, value);
      },
      toggle(state, path) {
        validatePath('toggle', path);
        validatePathType('toggle', path, 'boolean', get(state, path));
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
      },
      transform(state, {path, fn}) {
        validatePath('transform', path);
        validateFunction('transform', fn);
        update(state, path, fn);
      }
    },
    getters: {
      uncompletedCount: state => state.todos.filter(t => !t.done).length
    }
  });

  return store;
}

export const getStore = () => store;

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
  log(label) {
    console.info('vuex-easy:', label, 'state =', store.state);
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

let validatePathType = (methodName, path, expectedType) => {
  const typ = typeof value;
  if (typ === expectedType) return;
  throw new Error(
    `${MSG_PREFIX}${methodName} requires a path to a ${expectedType}, ` +
      `but the value at path "${path}" is a ${typ}`
  );
};
