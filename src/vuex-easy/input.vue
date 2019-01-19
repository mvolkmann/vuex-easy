<template>
  <input
    v-if="useChecked"
    :type="type"
    :checked="value"
    :autofocus="autofocus"
    @input="updateValue"
  >
  <input v-else :type="type" :value="value" :autofocus="autofocus" @input="updateValue">
</template>

<script>
/* eslint-disable no-console */
import {vxe} from './index';

export default {
  name: 'Input',
  props: {
    autofocus: Boolean,
    onchange: Function,
    //onenter: Function,
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
    useChecked() {
      return this.type === 'checkbox' || this.type === 'radiobutton';
    },
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
  /*
    if (onEnter) {
      //TODO: Handle this is a Vue-specific way.
      inputProps.onKeyPress = event => {
        if (event.key === 'Enter') onEnter();
      };
      delete inputProps.onEnter;
    }
  */
};
</script>