import {createStore, vxe} from '@/vuex-easy';
import {mount} from '@vue/test-utils';
import Select from '@/Select';

describe('Select', () => {
  const options = ['Red', 'Green', 'Blue'];
  const optionElements = options.map(option => `<option>${option}</option>`);
  const path = 'favorite.color';
  let wrapper;

  beforeAll(() => {
    createStore({});
    wrapper = mount(Select, {
      attachToDocument: true,
      propsData: {path},
      slots: {default: optionElements}
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('can select an option', () => {
    const optionElements = wrapper.findAll('option');

    function selectOption(option, index) {
      const optionElement = optionElements.at(index);
      optionElement.trigger('change');
      expect(vxe.get(path)).toBe(option);
    }

    options.forEach(selectOption);
  });
});
