<template>
  <div class="fill-height">
    <AppBar />
    <MainContainer>
      <v-row justify="space-between" align="center" class="mr-0 ml-0 mt-10 mb-1">
        <h2 class="grey--text text--darken-4">Companies</h2>
        <BtnMain text="Company" icon="mdi-plus" @click="isAddCompanyDialogVisible = true" />
      </v-row>
      <DataTableCompanies
        v-if="tableHeaders && tableItems"
        :tableHeaders="tableHeaders"
        :tableItems="tableItems"
        @deleteItem="showDeleteModal"
        @editItem="companyId => $router.push(`/edit-company/${companyId}`)"
      />
      <FormDialog
        v-if="formStructure"
        title="Add Company"
        :isVisible="isAddCompanyDialogVisible"
        :formStructure="formStructure"
        @close="closeAddCompanyDialogVisible()"
      />
      <DeleteDialog
        @delete="onDelete"
        :isVisible="isDeleteDialogVisible"
        @close="hideDeleteModal"
      />
    </MainContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/components/UI/AppBar.vue';
import MainContainer from '@/components/Containers/MainContainer.vue';
import DataTableCompanies from '@/components/Tables/DataTableCompanies.vue';
import BtnMain from '@/components/UI/BtnMain.vue';
import FormDialog from '@/components/Dialogs/FormDialog.vue';
import DeleteDialog from '@/components/Dialogs/DeleteDialog.vue';
import { mapActions, mapGetters } from 'vuex';
import { Company } from '@/store/companies-types';

export default Vue.extend({
  name: 'TheCompanies',
  components: { AppBar, MainContainer, DataTableCompanies, BtnMain, FormDialog, DeleteDialog },
  data: (): {
    formData: Company | null;
    isEditCompanyDialogVisible: boolean;
    isAddCompanyDialogVisible: boolean;
    isDeleteDialogVisible: boolean;
    formStructure: null | [];
    itemToBeDeleted: null | string;
  } => ({
    isEditCompanyDialogVisible: false,
    isAddCompanyDialogVisible: false,
    isDeleteDialogVisible: false,
    formStructure: null,
    formData: null,
    itemToBeDeleted: null,
  }),
  computed: {
    ...mapGetters({
      tableItems: 'companies/companies',
      tableHeaders: 'companies/companyTableHeaders',
      companyForm: 'companies/companyForm',
    }),
  },
  methods: {
    closeAddCompanyDialogVisible() {
      this.isAddCompanyDialogVisible = false;
    },
    showDeleteModal(companyId: string) {
      this.itemToBeDeleted = companyId;
      this.isDeleteDialogVisible = true;
    },
    hideDeleteModal() {
      this.itemToBeDeleted = null;
      this.isDeleteDialogVisible = false;
    },
    onDelete() {
      this['companies/deleteCompany'](this.itemToBeDeleted);
      this.itemToBeDeleted = null;
      this.isDeleteDialogVisible = false;
    },
    ...mapActions(['companies/deleteCompany', 'companies/editCompany']),
  },
  mounted() {
    this.formStructure = this.companyForm;
  },
});
</script>

<style lang="scss" scoped></style>
