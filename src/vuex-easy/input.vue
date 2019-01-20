<template>
  <input
    :autofocus="autofocus"
    :type="type"
    :checked="value"
    :value="value"
    @input="updateValue"
    @change="onchange"
    @keyup.enter="onenter"
  >
</template>

<script>
/* eslint-disable no-console */
import {vxe} from './index';

export default {
  name: 'Input',
  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
    onchange: {
      type: Function,
      default: () => {}
    },
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
    }
  },
  computed: {
    value() {
      return vxe.get(this.path);
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