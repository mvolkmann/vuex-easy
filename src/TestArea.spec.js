import {createStore, vxe} from '@/vuex-easy';
import {mount} from '@vue/test-utils';
import TextArea from '@/TextArea';

describe('TextArea', () => {
  const path = 'user.name';
  let wrapper;

  beforeAll(() => {
    createStore({user: {name: ''}});
    wrapper = mount(TextArea, {
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
    const textarea = wrapper.find('textarea');
    expect(textarea.props('autofocus')).toBeDefined();
    //expect(input.element).toBe(document.activeElement);
  });
});
