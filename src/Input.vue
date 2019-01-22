<template>
  <input
    :autofocus="autofocus"
    :checked="checked"
    :type="type"
    :value="getValue"
    @input="updateValue"
    @keyup.enter="onenter"
  >
</template>

<script>
import {vxe} from './vuex-easy';

export default {
  name: 'Input',
  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
    onchange: Function,
    onenter: {
      type: Function,
      default: () => {}
    },
    path: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    value: String
  },
  computed: {
    checked() {
      return this.type === 'checkbox'
        ? vxe.get(this.path)
        : this.type === 'radio'
          ? this.value === vxe.get(this.path)
          : null;
    },
    getValue() {
      return this.value || vxe.get(this.path);
    }
  },
  methods: {
    updateValue(event) {
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
  }
};
</script>
