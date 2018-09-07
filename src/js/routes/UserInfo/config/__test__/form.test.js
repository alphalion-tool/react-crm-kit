
import {
    containerId,
    scrollMenus,
    formDescriptions,
    mapData2Fields
} from '../form';

import { getUserSchema } from 'jstest/helpers/model';

describe('UserInfo/config/form', () => {

    it('formDesc test', () => {
        expect(JSON.stringify(Object.keys(formDescriptions).sort())).toEqual(
            '["company","correspondent","description","email","firstName","lastName","password","phone","role","token","userId","userName"]'
        );
    });

    it('mapData2Fields, no data', () => {
        const fields = mapData2Fields({}, formDescriptions);
        Object.keys(formDescriptions).forEach((key) => {
            expect(fields[key].value).toEqual(undefined);
        });
    });

    it('mapData2Fields, has data', () => {
        const model = getUserSchema();
        const fields = mapData2Fields(model, formDescriptions);
        Object.keys(formDescriptions).forEach((key) => {
            expect(fields[key].value).toEqual(model[key]);
        });
    });

});