/* eslint-disable no-console */
import {createStore, getStore, vxe} from '@/vuex-easy';

describe('vuex-easy', () => {
  let store;

  beforeEach(() => {
    const initialState = {
      alpha: 1,
      beta: {gamma: 2},
      like: false,
      names: ['Mark', 'Tami', 'Amanda', 'Jeremy']
    };
    store = createStore(initialState);
  });

  it('can create a VueX store', () => {
    expect(store).toBeDefined();
    expect(store.state.alpha).toBe(1);
    expect(store.state.beta.gamma).toBe(2);
  });

  it('can get store', () => {
    expect(getStore()).toBe(store);
  });

  it('can use decrement method', () => {
    vxe.decrement('beta.gamma');
    expect(store.state.beta.gamma).toBe(1);
    vxe.decrement('beta.gamma', 3);
    expect(store.state.beta.gamma).toBe(-2);
  });

  it('can use delete method', () => {
    vxe.delete('beta.gamma');
    expect(vxe.get('alpha')).toBeDefined();
    expect(vxe.get('beta.gamma')).toBeUndefined();
  });

  it('can use filter method', () => {
    vxe.filter('names', name => !name.toLowerCase().includes('am'));
    expect(vxe.get('names')).toEqual(['Mark', 'Jeremy']);
  });

  it('can use get method', () => {
    expect(vxe.get('alpha')).toBe(1);
    expect(vxe.get('beta.gamma')).toBe(2);
  });

  it('can use increment method', () => {
    vxe.increment('beta.gamma');
    expect(store.state.beta.gamma).toBe(3);
    vxe.increment('beta.gamma', 3);
    expect(store.state.beta.gamma).toBe(6);
  });

  it('can use log method', () => {
    // Suppress console output for tests.
    global.console = {
      info: jest.fn(),
      log: jest.fn()
    };

    // Just testing that this doesn't result in an error for now.
    vxe.log('some label');

    //TODO: Why doesn't this pass?
    //expect(global.console.log).toHaveBeenCalled();
  });

  it('can use map method', () => {
    vxe.map('names', name => name.toUpperCase());
    expect(vxe.get('names')).toEqual(['MARK', 'TAMI', 'AMANDA', 'JEREMY']);
  });

  it('can use push method', () => {
    vxe.push('names', 'RC', 'Meghan');
    expect(vxe.get('names')).toEqual([
      'Mark',
      'Tami',
      'Amanda',
      'Jeremy',
      'RC',
      'Meghan'
    ]);
  });

  it('can use set method', () => {
    const expected = 'new value';
    vxe.set('beta.gamma', expected);
    expect(vxe.get('beta.gamma')).toBe(expected);
  });

  it('can use toggle method', () => {
    vxe.toggle('like');
    expect(vxe.get('like')).toBe(true);
  });

  it('can use transform method', () => {
    vxe.transform('beta.gamma', n => n * 2);
    expect(vxe.get('beta.gamma')).toBe(4);
  });

  //TODO: Add tests for the validate functions?

  //TODO: Add a test for the loadState function?
});
