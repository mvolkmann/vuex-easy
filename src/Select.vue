<template>
  <select :value="value" @blur="updateValue" @change="updateValue">
    <slot></slot>
  </select>
</template>

<script>
/* eslint-disable no-console */
import {vxe} from './vuex-easy';

export default {
  name: 'Select',
  props: {
    onchange: Function,
    path: {
      type: String,
      required: true
    }
  },
  computed: {
    value() {
      return vxe.get(this.path);
    }
  },
  methods: {
    updateValue(event) {
      const {onchange, path} = this;
      vxe.set(path, event.target.value);
      if (onchange) onchange(event);
    }
  }
};
</script>