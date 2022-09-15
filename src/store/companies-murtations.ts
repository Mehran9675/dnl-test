import { MutationTree } from 'vuex';
import { CompaniesState, Company } from './companies-types';

const companiesMutations: MutationTree<CompaniesState> = {
  addCompany(state: CompaniesState, newData: Company) {
    state.companies?.push(newData);
  },
  editCompany(state: CompaniesState, newData: Company) {
    const targetIndex = state.companies?.findIndex(
      company => company.companyId === newData.companyId,
    );
    if (state.companies?.length && targetIndex && targetIndex > -1)
      state.companies[targetIndex] = newData;
  },
  deleteCompany(state: CompaniesState, companyId: string) {
    state.companies = state.companies?.filter(company => company.companyId !== companyId) || [];
  },
};
export default companiesMutations;
