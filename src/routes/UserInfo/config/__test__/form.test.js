
import {
    containerId,
    scrollMenus,
    formDescriptions,
    mapData2Fields
} from '../form';

import { getUserModel } from 'jstest/helpers/model';

describe('UserInfo/config/form', () => {

    it('formDesc test', () => {
        expect(JSON.stringify(Object.keys(formDescriptions).sort())).toEqual(
            '["description","email","firstName","lastName","password","phone","token","userId","userName"]'
        );
    });

    it('mapData2Fields, no data', () => {
        const fields = mapData2Fields({}, formDescriptions);
        Object.keys(formDescriptions).forEach((key) => {
            expect(fields[key].value).toEqual(undefined);
        });
    });

    xit('mapData2Fields, has data', () => {
        const model = getUserModel();
        const fields = mapData2Fields(model, formDescriptions);
        Object.keys(formDescriptions).forEach((key) => {
            // console.log(key);
            expect(fields[key].value).toEqual(model[key]);
        });
    });

});