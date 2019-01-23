//import Vue from 'vue';
import {createStore, vxe} from '@/vuex-easy';
import {mount} from '@vue/test-utils';
import Input from '@/Input';

describe('Input', () => {
  const path = 'user.name';
  let wrapper;

  beforeAll(() => {
    createStore({user: {name: ''}});
    wrapper = mount(Input, {
      attachToDocument: true,
      propsData: {autofocus: true, path}
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('can change value', () => {
    const expected = 'Mark';
    wrapper.setValue(expected);
    expect(vxe.get(path)).toBe(expected);
  });

  test('can use autofocus', () => {
    const input = wrapper.find('input');
    expect(input.props('autofocus')).toBeDefined();
    //expect(input.element).toBe(document.activeElement);
  });
});
