<template>
  <div class="checkboxes">
    <div v-for="(obj, index) in list" :key="getName(index)">
      <label for="getName(index)">
        <Input
          type="checkbox"
          :class="getName(index)"
          :id="getName(index)"
          :key="obj.text"
          :path="obj.path"
        />
        {{obj.text}}
      </label>
    </div>
  </div>
</template>

<script>
import {vxe} from './index';
import Input from './Input';

/**
 * This component renders a set of checkboxes.
 * The `list` prop specifies the text and Redux state path
 * for each checkbox.
 * Specify a `className` prop to enable styling the checkboxes.
 */
export default {
  name: 'Checkboxes',
  props: {
    list: {
      type: Array,
      required: true
    },
    dummy: {
      type: String,
      value: 'test1'
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