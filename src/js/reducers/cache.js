/**
 * @module reducers/cache
 * @description 需要cache的数据
 */

import { createReducers } from 'jscom/store/redux-tool';
import { actionIds } from '../actions/cache';

export const initialState = {
    /* 针对user的数据 */
    users: [],
    userOptions: [],
    userStatus: '',

    /* 针对company的数据 */
    companies: [],
    companyOptions: [],
    companyStatus: '',

};

export default createReducers(initialState, {

    // [`${actionIds.loadCompany}`]: (state) => ({
    //     ...state,
    //     companyStatus: 'loading'
    // }),

    // [`${actionIds.loadCompany}-success`]: (state, { body }) => {
    //     const data = body.data;
    //     const companies = data.map((item) => CompanySchema.fromAPI(item));
    //     const companyOptions = companies && companies.map((item) => CompanySchema.company2Option(item));
    //     return {
    //         ...state,
    //         companyStatus: 'done',
    //         companies,
    //         companyOptions,
    //     };
    // },

    // [`${actionIds.loadCompany}-failure`]: (state, { error }) => ({
    //     ...state,
    //     companyStatus: ''
    // }),

    RESETAPP: () => initialState

});
