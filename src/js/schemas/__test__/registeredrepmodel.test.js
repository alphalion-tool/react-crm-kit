/* eslint-disable max-len */

import RegisteredRepSchema from '../RegisteredRepSchema';
import { getRegisteredRepInfo } from 'jstest/helpers/store-info';

describe('models/RegisteredRepSchema', () => {

    let model;

    beforeEach(() => {
        model = RegisteredRepSchema.fromAPI(getRegisteredRepInfo());
    })

    it('fromAPI', () => {
        const model1 = RegisteredRepSchema.fromAPI({});
        expect(model1.toString()).toEqual('{"status":"undefined","__model__":true}')
        expect(model.toString()).toEqual('{"company":{"companyId":6350106,"companyName":"aliquip veniam"},"repName":"minim sunt ipsum non ullamco","number":"anim culpa dolore magna","status":"74138818","repId":-92702236,"__model__":true}');
    });

    it('toAPI', () => {
        const infoData = {
            ...getRegisteredRepInfo(),
            correspondentId: 0,
        };
        delete infoData.companyName;
        
        expect(model.toAPI()).toEqual(infoData);
    });

})