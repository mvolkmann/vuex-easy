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

const defaultOptions = {persist: true};

export function createStore(initialState, opts = {persist: defaultOptions}) {
  options = opts;
  store = new Vuex.Store({
    strict: true,
    state: initialState,
    mutations: {
      decrement(state, {path, delta}) {
        validatePath('decrement', path);
        validateNumber('decrement', 'delta', delta);
        validateNumber('decrement', path, get(state, path));
        update(state, path, n => n - delta);
      },
      delete(state, path) {
        validatePath('delete', path);
        state = omit(state, path);
      },
      filter(state, {path, fn}) {
        validatePath('filter', path);
        validateArray('filter', path, get(state, path));
        validateFunction('filter', fn);
        update(state, path, arr => arr.filter(fn));
      },
      increment(state, {path, delta}) {
        validatePath('increment', path);
        validateNumber('increment', 'delta', delta);
        validateNumber('increment', path, get(state, path));
        update(state, path, n => n + delta);
      },
      map(state, {path, fn}) {
        validatePath('map', path);
        validateArray('map', path, get(state, path));
        validateFunction('map', fn);
        update(state, path, arr => arr.map(fn));
      },
      push(state, {path, values}) {
        validatePath('push', path);
        validateArray('push', path, get(state, path));
        get(state, path).push(...values);
      },
      set(state, {path, value}) {
        validatePath('set', path);
        set(state, path, value);
      },
      toggle(state, path) {
        validatePath('toggle', path);
        if (options.validate) {
          const value = get(state, path);
          const type = typeof value;
          if (type !== 'boolean' && type !== 'undefined') {
            throw new Error(
              MSG_PREFIX +
                'toggle requires a path to a boolean value, but found' +
                type
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
    store.commit('decrement', {path, fn: n => n - delta});
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
    store.commit('increment', {path, fn: n => n + delta});
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

let validateArray = (methodName, path, value) => {
  if (Array.isArray(value)) return;
  throw new Error(
    MSG_PREFIX +
      methodName +
      ' requires an array, but ' +
      path +
      ' value is ' +
      value
  );
};

let validateFunction = (methodName, value) => {
  if (typeof value === 'function') return;
  throw new Error(
    MSG_PREFIX + methodName + ' requires a function, but got ' + value
  );
};

let validateNumber = (methodName, path, value) => {
  if (typeof value === 'number') return;
  throw new Error(
    MSG_PREFIX +
      methodName +
      ' requires a number, but ' +
      path +
      ' value is ' +
      value
  );
};

let validatePath = (methodName, path) => {
  if (typeof path === 'string') return;
  throw new Error(
    MSG_PREFIX + methodName + ' requires a string path, but got ' + path
  );
};
