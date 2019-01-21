<template>
  <div class="radio-buttons">
    <div v-for="obj in list" :key="obj.value">
      <label :for="path">
        <Input
          type="radio"
          :class="obj.value"
          :key="obj.text"
          :name="path"
          :path="path"
          :value="obj.value || obj.text"
        />
        {{obj.text}}
      </label>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Input from './Input';

const isArray = value => Array.isArray(value);
const isNonEmptyString = value => typeof value === 'string' && Boolean(value);
const isObject = value => typeof value === 'object';

/**
 * This component renders a set of checkboxes.
 * The `list` prop specifies the text and Redux state path
 * for each checkbox.
 * Specify a `className` prop to enable styling the checkboxes.
 */
export default {
  name: 'RadioButtons',
  components: {Input},
  props: {
    list: {
      type: Array,
      required: true,
      validator(value) {
        return (
          isArray(value) &&
          value.every(
            element => isObject(element) && isNonEmptyString(element.text)
          )
        );
      }
    },
    path: {
      type: String,
      required: true
    }
  }
};
</script>
