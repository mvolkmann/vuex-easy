<template>
  <textarea
    :autofocus="autofocus"
    :value="value"
    @input="updateValue"
    @change="onchange"
    @keyup.enter="onenter"
  />
</template>

<script>
/* eslint-disable no-console */
import {vxe} from './index';

export default {
  name: 'TextArea',
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