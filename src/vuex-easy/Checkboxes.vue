<template>
  <div class="checkboxes">
    <div v-for="(obj, index) in list" :key="getName(index)">
      <Input
        type="checkbox"
        :class="getName(index)"
        :checked="checked(obj.path)"
        :id="getName(index)"
        :key="obj.text"
        :path="obj.path"
      />
      <label for="getName(index)">{{obj.text}}</label>
    </div>
  </div>
</template>

<script>
import {Input, vxe} from './index';

/**
 * This component renders a set of checkboxes.
 * The `list` prop specifies the text and Redux state path
 * for each checkbox.
 * Specify a `className` prop to enable styling the checkboxes.
 */
export default {
  name: 'Checkboxes',
  props: {
    /* Will this be added automatically?
    class: {
      type: String,
      default: ''
    },
    */
    list: {
      type: Array,
      required: true
    }
  },
  components: {Input},
  methods: {
    checked(path) {
      return Boolean(vxe.get(path));
    },
    getName(index) {
      return 'cb' + index;
    }
  }
};
</script>