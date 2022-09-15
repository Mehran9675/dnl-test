<template>
  <div class="fill-height">
    <AppBar />
    <MainContainer>
      <v-row justify="space-between" align="center" class="mr-0 ml-0 mt-10 mb-1">
        <h2>Edit {{ companyName }}</h2>
        <div>
          <BtnMain @click="submit" class="mr-4" text="Save" />
          <BtnMain @click="$router.back()" text="Cancel" />
        </div>
      </v-row>
      <form>
        <template v-for="(value, key) in companyData">
          <v-text-field
            required
            v-if="key !== 'companyId' && key !== 'createdAt' && key !== 'updatedAt'"
            :label="key"
            v-model="companyData[key]"
            :key="key"
          ></v-text-field>
          <v-text-field
            disabled
            v-if="key === 'updatedAt'"
            :label="key"
            v-model="companyData[key]"
            :key="key"
          ></v-text-field>
        </template>
      </form>
    </MainContainer>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import MainContainer from '@/components/Containers/MainContainer.vue';
import { mapGetters } from 'vuex';
import AppBar from '@/components/UI/AppBar.vue';
import { Company } from '@/store/companies-types';
import BtnMain from '@/components/UI/BtnMain.vue';

export default Vue.extend({
  name: 'EditCompany',
  components: { BtnMain, AppBar, MainContainer },
  data: (): { companyName?: string; companyData: Company | null } => ({
    companyName: undefined,
    companyData: null,
  }),
  computed: {
    ...mapGetters({
      companies: 'companies/companies',
    }),
  },
  methods: {
    submit() {
      this.companies[
        this.companies.findIndex(
          (company: Company) => company.companyId === this.companyData?.companyId,
        )
      ] = { ...this.companyData, updatedAt: new Date().toLocaleDateString('en') };
      this.$router.back();
    },
  },
  mounted() {
    this.companyData = {
      ...this.companies.find((company: Company) => company.companyId === this.$route.params.id),
    };
    this.companyName = this.companyData?.companyName;
  },
});
</script>
