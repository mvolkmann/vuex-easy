/* eslint-disable no-console */
import {get, omit, set, update} from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store;

export function createStore(initialState) {
  console.log('vuex-easy.js createStore: initialState =', initialState);
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
      log(state, label) {
        console.info('vuex-easy:', label, 'state =', state);
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

//TODO: Is this needed?
export const getStore = () => store;
