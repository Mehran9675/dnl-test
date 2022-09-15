import { ActionContext, ActionTree } from 'vuex';
import { BaseState } from '@/store/types';
import { CompaniesState, Company } from './companies-types';

export const ACTION_TYPES = {
  ADD_COMPANY: 'addCompany',
  EDIT_COMPANY: 'editCompany',
  DELETE_COMPANY: 'deleteCompany',
};

const companiesActions: ActionTree<CompaniesState, BaseState> = {
  addCompany(context: ActionContext<CompaniesState, BaseState>, data: Company) {
    context.commit(ACTION_TYPES.ADD_COMPANY, data);
  },
  editCompany(context: ActionContext<CompaniesState, BaseState>, newData: Company) {
    context.commit(ACTION_TYPES.EDIT_COMPANY, newData);
  },
  deleteCompany(context: ActionContext<CompaniesState, BaseState>, companyIdToRemove: string) {
    context.commit(ACTION_TYPES.DELETE_COMPANY, companyIdToRemove);
  },
};
export default companiesActions;
