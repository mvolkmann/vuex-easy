import {createStore, vxe} from '@/vuex-easy';
import {mount} from '@vue/test-utils';
import Checkboxes from '@/Checkboxes';

describe('Checkboxes', () => {
  const list = [
    {text: 'Red', path: 'color.red'},
    {text: 'Green', path: 'color.green'},
    {text: 'Blue', path: 'color.blue'}
  ];
  let wrapper;

  beforeAll(() => {
    createStore({});
    wrapper = mount(Checkboxes, {
      attachToDocument: true,
      propsData: {list}
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('can check a checkbox', () => {
    function checkAll(expected) {
      for (let index = 0; index < list.length; index++) {
        const cb = wrapper.find('.cb' + index);
        cb.trigger('click');
        expect(vxe.get(list[index].path)).toBe(expected);
      }
    }

    checkAll(true);
    checkAll(false);
  });
});
