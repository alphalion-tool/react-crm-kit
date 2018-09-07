/* eslint-disable max-len */

import { isEqual } from 'lodash';

import {
    formatNumber, formatPrice, formatDate, formatWithDecimal,
    formatDateTime, formatDateToDash, formatDateToSlash, formatNestArr, formatRadioValue,
    formatTreeNestArrByName2Map, formatTreeNestArrByLevel2Map
} from '../formatter';

describe('utils formatter', () => {

    it('formatNumber', () => {
        expect(formatNumber('1')).toEqual('1');
        expect(formatNumber({ x: 1 })).toEqual({ x: 1 });
        expect(formatNumber(123)).toEqual('123.00');
        expect(formatNumber(12345)).toEqual('12,345.00');
        expect(formatNumber(123, true)).toEqual('123.000000');
        expect(formatNumber(12345, true)).toEqual('12,345.000000');
    });

    it('formatPrice', () => {
        expect(formatPrice(123)).toEqual('123.000000');
        expect(formatPrice(12345)).toEqual('12,345.000000');
    });

    it('formatWithDecimal', () => {
        expect(formatWithDecimal('123', 0)).toEqual('123');
        expect(formatWithDecimal('123', 1)).toEqual('123');
        expect(formatWithDecimal(123, 0)).toEqual('123');
        expect(formatWithDecimal(123, -1)).toEqual(123);
        expect(formatWithDecimal(123, -0)).toEqual('123');
        expect(formatWithDecimal('123', -1)).toEqual('123');
        expect(formatWithDecimal(123, 1)).toEqual('123.0');
        expect(formatWithDecimal(123, 20)).toEqual('123.00000000000000000000');
        expect(formatWithDecimal(12345, 6)).toEqual('12,345.000000');
    });

    it('formatDate', () => {
        expect(formatDate()).toEqual('');
        expect(formatDate('2018-11-12')).toEqual('11/12/2018');
        expect(formatDate(1520391994119)).toEqual('03/07/2018');
        expect(formatDate('09/15/2018', 'MM/DD/YYYY', 'YYYY-MM-DD')).toEqual('2018-09-15');
        expect(formatDate('09/15/2018', 'DD/MM/YYYY', 'YYYY-MM-DD')).toEqual('Invalid date');
    });

    it('formatDateTime', () => {
        expect(formatDateTime()).toEqual('');
        expect(formatDateTime('2017-09-15 12:00:01')).toEqual('09/15/2017 12:00:01');
        expect(formatDateTime('09/15/2017 12:00:01', 'MM/DD/YYYY HH:mm:ss', 'YYYY-MM-DD HH:mm:ss')).toEqual('2017-09-15 12:00:01');
    });

    it('formatDateToDash', () => {
        expect(formatDateToDash()).toEqual('');
        expect(formatDateToDash('10/15/2018')).toEqual('2018-10-15');
    });

    it('formatDateToSlash', () => {
        expect(formatDateToSlash()).toEqual('');
        expect(formatDateToSlash('2018-09-15')).toEqual('09/15/2018');
    });

    it('formatNestArr', () => {
        expect(formatNestArr([])).toEqual([]);
        const test = [
            {
                key: '1',
                value: 'test',
                child: [
                    {
                        key: '11',
                        value: 'child1'
                    }
                ]
            },
            {
                key: '2',
                value: 'test1',
                child: [
                ]
            }
        ];
        const resTest = [
            {
                key: '1',
                value: 'test',
                label: 'test',
                child: [
                    {
                        key: '11',
                        value: 'child1',
                        label: 'child1',
                    }
                ]
            },
            {
                key: '2',
                value: 'test1',
                label: 'test1',
                child: [
                ]
            }
        ];
        const res = formatNestArr(test, 'child', (src) => {
            return { ...src, label: src.value };
        });
        expect(isEqual(resTest, res)).toEqual(true);
    });

    it('formatTreeNestArrByName2Map', () => {
        const actypes = '[{"k":"CB","v":"Contra Broker","name":"classification","leafSize":1,"childList":[{"k":"20","v":"GL","name":"accountType","leafSize":1,"childList":[],"leaf":true}],"leaf":false},{"k":"CU","v":"Customer","name":"classification","leafSize":14,"childList":[{"k":"01","v":"Cash","name":"accountType","leafSize":6,"childList":[{"k":"CASH","v":"CASH","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"CSTH","v":"CSTH","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"CSTS","v":"CSTS","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"DVP","v":"DVP","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"OMNIBUS","v":"OMNIBUS","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"PB","v":"PB","name":"account sub type","leafSize":1,"childList":[],"leaf":true}],"leaf":false},{"k":"12","v":"Fully Paid Lending","name":"accountType","leafSize":1,"childList":[{"k":"CASH","v":"CASH","name":"account sub type","leafSize":1,"childList":[],"leaf":true}],"leaf":false},{"k":"03","v":"IRA","name":"accountType","leafSize":1,"childList":[{"k":"CASH","v":"CASH","name":"account sub type","leafSize":1,"childList":[],"leaf":true}],"leaf":false},{"k":"06","v":"Margin","name":"accountType","leafSize":5,"childList":[{"k":"MDT","v":"MDT","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"MPM","v":"MPM","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"MRT","v":"MRT","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"OMNIBUS","v":"OMNIBUS","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"PAIB","v":"PAIB","name":"account sub type","leafSize":1,"childList":[],"leaf":true}],"leaf":false},{"k":"05","v":"Short","name":"accountType","leafSize":1,"childList":[{"k":"MRT","v":"MRT","name":"account sub type","leafSize":1,"childList":[],"leaf":true}],"leaf":false}],"leaf":false},{"k":"GL","v":"General Ledger","name":"classification","leafSize":8,"childList":[{"k":"11","v":"Borrow","name":"accountType","leafSize":1,"childList":[],"leaf":true},{"k":"15","v":"GL Asset","name":"accountType","leafSize":1,"childList":[],"leaf":true},{"k":"17","v":"GL Capital","name":"accountType","leafSize":1,"childList":[],"leaf":true},{"k":"19","v":"GL Expense","name":"accountType","leafSize":1,"childList":[],"leaf":true},{"k":"18","v":"GL Income","name":"accountType","leafSize":1,"childList":[],"leaf":true},{"k":"16","v":"GL Liability","name":"accountType","leafSize":1,"childList":[],"leaf":true},{"k":"10","v":"Loan","name":"accountType","leafSize":1,"childList":[],"leaf":true},{"k":"09","v":"Suspense","name":"accountType","leafSize":1,"childList":[],"leaf":true}],"leaf":false},{"k":"PT","v":"Prop Trading","name":"classification","leafSize":1,"childList":[{"k":"07","v":"PROP","name":"accountType","leafSize":1,"childList":[],"leaf":true}],"leaf":false},{"k":"ST","v":"Street Side","name":"classification","leafSize":1,"childList":[{"k":"20","v":"GL","name":"accountType","leafSize":1,"childList":[],"leaf":true}],"leaf":false}]';
        const result = formatTreeNestArrByName2Map(JSON.parse(actypes), 'accountType');
        expect(JSON.stringify(result)).toEqual(
            '{"10":{"key":"10","value":"10","label":"Loan"},"11":{"key":"11","value":"11","label":"Borrow"},"12":{"key":"12","value":"12","label":"Fully Paid Lending"},"15":{"key":"15","value":"15","label":"GL Asset"},"16":{"key":"16","value":"16","label":"GL Liability"},"17":{"key":"17","value":"17","label":"GL Capital"},"18":{"key":"18","value":"18","label":"GL Income"},"19":{"key":"19","value":"19","label":"GL Expense"},"20":{"key":"20","value":"20","label":"GL"},"01":{"key":"01","value":"01","label":"Cash"},"03":{"key":"03","value":"03","label":"IRA"},"06":{"key":"06","value":"06","label":"Margin"},"05":{"key":"05","value":"05","label":"Short"},"09":{"key":"09","value":"09","label":"Suspense"},"07":{"key":"07","value":"07","label":"PROP"}}'
        );
    });

    it('formatTreeNestArrByLevel2Map', () => {
        const actypes = '[{"k":"CB","v":"Contra Broker","name":"classification","leafSize":1,"childList":[{"k":"20","v":"GL","name":"accountType","leafSize":1,"childList":[],"leaf":true}],"leaf":false},{"k":"CU","v":"Customer","name":"classification","leafSize":14,"childList":[{"k":"01","v":"Cash","name":"accountType","leafSize":6,"childList":[{"k":"CASH","v":"CASH","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"CSTH","v":"CSTH","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"CSTS","v":"CSTS","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"DVP","v":"DVP","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"OMNIBUS","v":"OMNIBUS","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"PB","v":"PB","name":"account sub type","leafSize":1,"childList":[],"leaf":true}],"leaf":false},{"k":"12","v":"Fully Paid Lending","name":"accountType","leafSize":1,"childList":[{"k":"CASH","v":"CASH","name":"account sub type","leafSize":1,"childList":[],"leaf":true}],"leaf":false},{"k":"03","v":"IRA","name":"accountType","leafSize":1,"childList":[{"k":"CASH","v":"CASH","name":"account sub type","leafSize":1,"childList":[],"leaf":true}],"leaf":false},{"k":"06","v":"Margin","name":"accountType","leafSize":5,"childList":[{"k":"MDT","v":"MDT","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"MPM","v":"MPM","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"MRT","v":"MRT","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"OMNIBUS","v":"OMNIBUS","name":"account sub type","leafSize":1,"childList":[],"leaf":true},{"k":"PAIB","v":"PAIB","name":"account sub type","leafSize":1,"childList":[],"leaf":true}],"leaf":false},{"k":"05","v":"Short","name":"accountType","leafSize":1,"childList":[{"k":"MRT","v":"MRT","name":"account sub type","leafSize":1,"childList":[],"leaf":true}],"leaf":false}],"leaf":false},{"k":"GL","v":"General Ledger","name":"classification","leafSize":8,"childList":[{"k":"11","v":"Borrow","name":"accountType","leafSize":1,"childList":[],"leaf":true},{"k":"15","v":"GL Asset","name":"accountType","leafSize":1,"childList":[],"leaf":true},{"k":"17","v":"GL Capital","name":"accountType","leafSize":1,"childList":[],"leaf":true},{"k":"19","v":"GL Expense","name":"accountType","leafSize":1,"childList":[],"leaf":true},{"k":"18","v":"GL Income","name":"accountType","leafSize":1,"childList":[],"leaf":true},{"k":"16","v":"GL Liability","name":"accountType","leafSize":1,"childList":[],"leaf":true},{"k":"10","v":"Loan","name":"accountType","leafSize":1,"childList":[],"leaf":true},{"k":"09","v":"Suspense","name":"accountType","leafSize":1,"childList":[],"leaf":true}],"leaf":false},{"k":"PT","v":"Prop Trading","name":"classification","leafSize":1,"childList":[{"k":"07","v":"PROP","name":"accountType","leafSize":1,"childList":[],"leaf":true}],"leaf":false},{"k":"ST","v":"Street Side","name":"classification","leafSize":1,"childList":[{"k":"20","v":"GL","name":"accountType","leafSize":1,"childList":[],"leaf":true}],"leaf":false}]';
        const result = formatTreeNestArrByLevel2Map(JSON.parse(actypes), 2);
        expect(JSON.stringify(result)).toEqual(
            '{"10":{"key":"10","value":"10","label":"Loan"},"11":{"key":"11","value":"11","label":"Borrow"},"12":{"key":"12","value":"12","label":"Fully Paid Lending"},"15":{"key":"15","value":"15","label":"GL Asset"},"16":{"key":"16","value":"16","label":"GL Liability"},"17":{"key":"17","value":"17","label":"GL Capital"},"18":{"key":"18","value":"18","label":"GL Income"},"19":{"key":"19","value":"19","label":"GL Expense"},"20":{"key":"20","value":"20","label":"GL"},"01":{"key":"01","value":"01","label":"Cash"},"03":{"key":"03","value":"03","label":"IRA"},"06":{"key":"06","value":"06","label":"Margin"},"05":{"key":"05","value":"05","label":"Short"},"09":{"key":"09","value":"09","label":"Suspense"},"07":{"key":"07","value":"07","label":"PROP"}}'
        );
        const result2 = formatTreeNestArrByLevel2Map(JSON.parse(actypes), 3);
        expect(JSON.stringify(result2)).toEqual(
            '{"CASH":{"key":"CASH","value":"CASH","label":"CASH"},"CSTH":{"key":"CSTH","value":"CSTH","label":"CSTH"},"CSTS":{"key":"CSTS","value":"CSTS","label":"CSTS"},"DVP":{"key":"DVP","value":"DVP","label":"DVP"},"OMNIBUS":{"key":"OMNIBUS","value":"OMNIBUS","label":"OMNIBUS"},"PB":{"key":"PB","value":"PB","label":"PB"},"MDT":{"key":"MDT","value":"MDT","label":"MDT"},"MPM":{"key":"MPM","value":"MPM","label":"MPM"},"MRT":{"key":"MRT","value":"MRT","label":"MRT"},"PAIB":{"key":"PAIB","value":"PAIB","label":"PAIB"}}'
        );
    });

    it('formatRadioValue', () => {
        expect(formatRadioValue('')).toEqual('');
        expect(formatRadioValue('123')).toEqual('');
        expect(formatRadioValue(123)).toEqual('');
        expect(formatRadioValue(true)).toEqual('Yes');
        expect(formatRadioValue(false)).toEqual('No');
        expect(formatRadioValue('true')).toEqual('Yes');
        expect(formatRadioValue('false')).toEqual('No');
    });

});