import {createStore, vxe} from '@/vuex-easy';
import {mount} from '@vue/test-utils';
import RadioButtons from '@/RadioButtons';

describe('RadioButtons', () => {
  const path = 'favorite.flavor';
  const list = [
    {text: 'Chocolate', value: 'choc'},
    {text: 'Strawberry', value: 'straw'},
    {text: 'Vanilla', value: 'van'}
  ];
  let wrapper;

  beforeAll(() => {
    createStore({});
    wrapper = mount(RadioButtons, {
      attachToDocument: true,
      propsData: {list, path}
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('can click a radio button', () => {
    function clickRadioButton(index) {
      const rb = wrapper.find('.rb' + index);
      rb.trigger('click');
      expect(vxe.get(path)).toBe(list[index].value);
    }

    for (let index = 0; index < list.length; index++) {
      clickRadioButton(index);
    }
  });
});
