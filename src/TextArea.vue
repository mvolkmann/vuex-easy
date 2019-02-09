<template>
  <textarea
    :autofocus="autofocus"
    :value="value"
    @input="updateValue"
    @keyup.enter="onenter"
  />
</template>

<script>
import {vxe} from './vuex-easy';

export default {
  name: 'TextArea',
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
