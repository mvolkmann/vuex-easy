/* eslint-disable no-console */
import {get, omit, set, update} from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';

export {default as Checkboxes} from './Checkboxes';
export {default as Input} from './Input';
//export {default as RadioButtons} from './radio-buttons';
//export {default as Select} from './select';
//export {default as TextArea} from './textarea';

Vue.use(Vuex);

let store;

export function createStore(initialState) {
  store = new Vuex.Store({
    strict: true,
    state: initialState,
    mutations: {
      decrement(state, {path, delta}) {
        update(state, path, n => n - delta);
      },
      delete(state, path) {
        state = omit(state, path);
      },
      filter(state, {path, fn}) {
        update(state, path, arr => arr.filter(fn));
      },
      increment(state, {path, delta}) {
        update(state, path, n => n + delta);
      },
      map(state, {path, fn}) {
        update(state, path, arr => arr.map(fn));
      },
      push(state, {path, values}) {
        get(state, path).push(...values);
      },
      set(state, {path, value}) {
        set(state, path, value);
      },
      toggle(state, path) {
        set(state, path, !get(state, path));
      },
      transform(state, {path, fn}) {
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
