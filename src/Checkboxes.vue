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
  name: 'Checkboxes',
  props: {
    list: {
      type: Array,
      required: true,
      validator(value) {
        return (
          isArray(value) &&
          value.every(
            element =>
              isObject(element) &&
              isNonEmptyString(element.text) &&
              isNonEmptyString(element.path)
          )
        );
      }
    }
  },
  components: {Input},
  methods: {
    getName(index) {
      return 'cb' + index;
    }
  }
};
</script>
