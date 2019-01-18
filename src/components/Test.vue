<!--template>
  <div>Test component: name = {{name}}</div>
</template-->

<script>
/* eslint-disable no-console */
export default {
  name: 'Test',
  props: {
    name: String
  },
  data() {
    return {
      colors: ['red', 'green', 'blue']
    };
  },
  render(/*createElement*/) {
    //return createElement('h1', 'Hello from createElement!');
    //return <h1>Hello from JSX!</h1>;
    return <ul>{this.getItems()}</ul>;
  },
  methods: {
    getItems() {
      return this.colors.map(color => <li>{color}</li>);
    }
  },
  beforeCreate() {
    console.log('Test: beforeCreate entered');
  },
  created() {
    console.log('Test: created entered');
  },
  beforeMount() {
    console.log('Test: beforeMount entered');
  },
  mounted() {
    console.log('Test: mounted entered');
  },
  beforeUpdate() {
    console.log('Test: beforeUpdate entered');
  },
  updated() {
    console.log('Test: updated entered');
  }
};
</script>
