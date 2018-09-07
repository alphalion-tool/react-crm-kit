/* eslint-disable max-len */

import CompanySchema from '../CompanySchema';
import { getCompanyInfo } from 'jstest/helpers/store';

describe('models/CompanySchema', () => {

    let model;

    beforeEach(() => {
        model = CompanySchema.fromAPI(getCompanyInfo());
    })

    it('fromAPI', () => {
        const company1 = CompanySchema.fromAPI({});
        expect(company1.toString()).toEqual('{"createTime":"","__model__":true}');

        expect(model.toString()).toEqual(
            '{"addressLine1":"beijing","addressLine2":"chaoyang","city":"LA","email":"xx@yy.com","fax":"12312313415","phone":"15167821929","zip":"232212","state":"CA","companyId":276,"companyName":"bluesea","country":"CCK","description":"bluesea fintech","createTime":"11/27/2017 17:26:23","hasFee":false,"__model__":true}'
        );
    });

    it('company2Option', () => {
        expect(CompanySchema.company2Option(model)).toEqual({
            label: 'bluesea',
            key: 276,
            value: 276,
            ins: model
        })
    });

    it('toAPI', () => {
        expect(model.toAPI()).toEqual(getCompanyInfo());
    });

})