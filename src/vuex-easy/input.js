/* eslint-disable no-console */
import {getStore, vxe} from './index';

export default {
  name: 'Input',
  props: {
    autofocus: Boolean,
    onchange: Function,
    onenter: Function,
    path: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    handleChange(event) {
      const {checked, value} = event.target;
      const {onchange, path, type} = this;

      let v = value;
      if (type === 'checkbox') {
        v = checked;
      } else if (type === 'number' || type === 'range') {
        if (value.length) v = Number(value);
      }

      vxe.set(path, v);
      if (onchange) onchange(event);
    }
  },
  mounted() {
    const store = getStore();
    store.watch(
      () => vxe.get(this.path),
      value => {
        console.log('mounted: value =', value);
        if (!value) this.$forceUpdate();
      }
    );
  },
  render() {
    const {handleChange, onEnter, path} = this;
    let value = vxe.get(path);

    const isCheckbox = this.type === 'checkbox';
    if (value === undefined) value = isCheckbox ? false : '';

    const propName = isCheckbox ? 'checked' : 'value';
    const inputProps = {
      autofocus: this.autofocus,
      [propName]: value
    };

    if (onEnter) {
      //TODO: Handle this is a Vue-specific way.
      inputProps.onKeyPress = event => {
        if (event.key === 'Enter') onEnter();
      };
      delete inputProps.onEnter;
    }

    return <input type={this.type} onInput={handleChange} {...inputProps} />;
  }
};
