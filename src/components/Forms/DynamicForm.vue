<template>
  <v-form
    ref="form"
    @submit.prevent="$emit('submit', formData)"
    v-model="isFormValid"
    class="dynamic-form"
  >
    <template v-for="value in formStructure">
      <v-text-field
        :rules="[validate(value.required)]"
        v-if="value.type === 'textField'"
        :label="value.label"
        v-model="formData[value.key]"
        :key="value.key"
        :placeholder="value.placeholder"
      ></v-text-field>
    </template>
    <template v-for="value in formStructure">
      <v-select
        :rules="[validate(value.required)]"
        v-if="value.type === 'selectField'"
        :label="value.label"
        v-model="formData[value.key]"
        :key="value.key"
        :placeholder="value.placeholder"
        :items="value.items"
      ></v-select>
    </template>
    <template v-for="value in formStructure">
      <v-radio-group
        :rules="[validate(value.required)]"
        v-if="value.type === 'radioGroup'"
        v-model="formData[value.key]"
        :label="value.label"
        :key="value.key"
      >
        <v-radio
          v-for="radio of value.items"
          :label="radio.text"
          :value="radio.value"
          :key="radio.value"
        >
        </v-radio>
      </v-radio-group>
    </template>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn type="reset" color="blue darken-1" text @click.prevent="$emit('close')">
        Cancel
      </v-btn>
      <v-btn :disabled="!isFormValid" type="submit" color="blue darken-1" text> Save </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Company } from '@/store/companies-types';

export default Vue.extend({
  name: 'DynamicForm',
  components: {},
  props: {
    formStructure: {
      required: true,
      type: Array,
    },
  },
  methods: {
    validate(isRequired: boolean) {
      return (value: string) => {
        if (!value && isRequired) {
          this.isFormValid = false;
          return 'This is field is required';
        } else {
          this.isFormValid = true;
          return true;
        }
      };
    },
  },

  data(): { isFormValid: boolean; formData: Company } {
    return {
      isFormValid: false,
      formData: {} as Company,
    };
  },
});
</script>

<style lang="scss" scoped></style>
