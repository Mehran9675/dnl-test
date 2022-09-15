<template>
  <v-dialog v-model="isVisible" @click:outside="$emit('close')" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>

      <v-card-text>
        <v-container
          ><DynamicForm @submit="save" @close="$emit('close')" :form-structure="formStructure"
        /></v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import DynamicForm from '@/components/Forms/DynamicForm.vue';
import { mapActions } from 'vuex';
import randomStr from '@/functions/random-str';
import { Company } from '@/store/companies-types';

export default Vue.extend({
  name: 'FormDialog',
  components: { DynamicForm },
  props: {
    formStructure: {
      type: Array,
      required: true,
    },

    isVisible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(['companies/addCompany']),

    save(formData: Company) {
      const now = new Date().toLocaleDateString('en');
      formData.createdAt = now;
      formData.updatedAt = now;
      formData.companyId = randomStr();
      this['companies/addCompany'](formData);
      // this.$emit('close');
    },
  },
});
</script>

<style lang="scss" scoped></style>
