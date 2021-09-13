<template>
  <div>
    <v-select
      class="style-chooser"
      :value="selected.label ? selected.label : selected"
      :options="options"
      @input="onInput"
      @search="onSearch"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <!--:value="selected"-->
  </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { reactive, toRefs } from '@vue/composition-api'

export default {
  name: 'DropdownSearch',
  components: {
    'v-select': vSelect
  },

  props: {
    options: Array,
    selected: {
      type: [Object, String],
      default: ''
    },
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false
    },
    onInput: {
      type: Function,
      default: () => {}
    },
    onSearch: {
      type: Function,
      default: () => {}
    }
  },

  setup() {
    const data = reactive({
      selectedOption: {}
    })

    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="scss">
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  font-family: 'Circular', sans-serif !important;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding-bottom: 0;
  //padding-top: 0.75rem !important;
  //padding-bottom: 0.75rem !important;
  border-radius: 8px;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}

.style-chooser {
  .vs__search {
    margin-top: 0;
  }
}
</style>
