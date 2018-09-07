
import moment from 'moment';
import { stamp2date, moment2str, dateFormatChange,
    str2moment, diffSeconds, addDays, subtractDays, todayStr } from 'jscom/utils/time';

describe('utils time functions', () => {
    it('stamp2date', () => {
        expect('1/23/2017').toEqual(stamp2date(1485158737148));
        expect(stamp2date()).toEqual('');
    });

    it('moment2str', () => {
        expect(moment2str()).toEqual('');
        const m = moment('2017-09-15');
        expect(moment2str(m)).toEqual('2017-09-15');
        expect(moment2str(m, 'YYYY-MM-DD')).toEqual('2017-09-15');
        expect(moment2str(m, 'MM/DD/YYYY')).toEqual('09/15/2017');
    });

    it('dateFormatChange', () => {
        expect(dateFormatChange()).toEqual('');
        const date1 = '2018-09-14';
        const format1 = 'YYYY-MM-DD';
        const date2 = '09/14/2018'
        const format2 = 'MM/DD/YYYY';
        expect(dateFormatChange(date1, format1, format2)).toEqual(date2);
        expect(dateFormatChange(date2, format2, format1)).toEqual(date1);
    });

    it('str2moment', () => {
        expect(str2moment('2018-09-14', 'YYYY-MM-DD').isSame('2018-09-14')).toEqual(true);
        expect(str2moment('09/14/2018', 'MM/DD/YYYY').isSame('2018-09-14')).toEqual(true);
    });

    it('diffSeconds', () => {
        const m1 = moment('2018-09-10');
        const m2 = moment('2018-10-10');
        expect(diffSeconds(m1, m2)).toEqual(-2592000);
        expect(diffSeconds(m2, m1)).toEqual(2592000);
    });

    it('addDays', () => {
        expect(addDays('09/11/2017', 3)).toEqual('09/14/2017');
        expect(addDays('2017-09-11', 3, 'YYYY-MM-DD')).toEqual('2017-09-14');
        expect(addDays(moment('2018-09-11'), 3)).toEqual('09/14/2018');
    });

    it('subtractDays', () => {
        expect(subtractDays('09/15/2017', 3)).toEqual('09/12/2017');
        expect(subtractDays('2017-09-11', 3, 'YYYY-MM-DD')).toEqual('2017-09-08');
        expect(subtractDays(moment('2018-09-11'), 3)).toEqual('09/08/2018');
    });

    it('todayStr', () => {
        expect(todayStr()).toMatch(/\d{2}\/\d{2}\/\d{4}/);
        expect(todayStr('YYYY-MM-DD')).toMatch(/\d{4}-\d{2}-\d{2}/);
    });


})