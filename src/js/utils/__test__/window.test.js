
import * as windows from '../window';
import queryString from 'query-string';

import {
    openWindow,
    openTab,
    openSMADetail,
    openMarginQuery,
    openActivity,
    openAccountInfo,
    openGLAccountInfo,
    openRegisteredRepInfo,
    openProductInfo,
    openCustodianInfo,
    openCompanyInfo,
    openBrokerInfo,
    openOfficeInfo,
    openCorrespondentInfo,
    openUserInfo,
    openCustomerInfo,
    jumpToCallLog,
    jumpToTransaction,
    jumpToFeeDetail,
    openRoleInfo,
    openTrialInfo,
    openMiddleMoneyInfo,
    openDefaultFee,
    openCreatePage,
    openCallLogInfo,
    openAuctionDetail,
    gotoLoginPage,
    gotoRegisterPage,
    gotoPosition,
    isOpenWindow,
    commonFeatures
} from '../window';


describe('utils window', () => {

    afterEach(() => {
        window.location.hash = '';
    });

    it('openWindow', () => {

        const windowSpy = spyOn(window, 'open');
        openWindow('/users', 'users');
        expect(windowSpy).toHaveBeenCalled();
        expect(windowSpy).toHaveBeenCalledWith('#/users', 'users', commonFeatures, true);

        openWindow('/offices', 'office', 'modal=no', false);
        expect(windowSpy).toHaveBeenCalledWith('#/offices', 'office', 'modal=no', false);

        windowSpy.and.callThrough();
    });

    it('openTab', () => {
        openTab('office');
        expect(window.location.hash).toEqual('#office');
        openTab('office?id=1');
        expect(window.location.hash).toEqual('#office?id=1');

        openTab('office', true);
        expect(window.location.hash).toMatch(/#office\?\d+/);

        openTab('office?id=1', true);
        expect(window.location.hash).toMatch(/#office\?id=1&\d+/);
    });

    it('openSMADetail', () => {
        const params = { accountId: '1', businessDate: '2018-01-01', accountName: 'a' };
        openSMADetail(params);
        expect(window.location.hash).toEqual(`#/margin/sma?${queryString.stringify(params)}`);
    });

    it('openMarginQuery', () => {
        const params = { accountId: '1', accountName: 'a' };
        openMarginQuery(params);
        expect(window.location.hash).toEqual(`#/margin/marginquery?${queryString.stringify(params)}`);
    });

    it('openActivity', () => {
        openActivity();
        expect(window.location.hash).toEqual('');
        openActivity(123);
        expect(window.location.hash).toEqual('#/ledgers/activities?tradeId=123');
    });

    it('openAccountInfo', () => {
        openAccountInfo();
        expect(window.location.hash).toEqual('');
        openAccountInfo(123);
        expect(window.location.hash).toEqual('#/account/123');

        const windowSpy = spyOn(window, 'open');
        openAccountInfo(123, true);
        expect(windowSpy).toHaveBeenCalled();
        expect(windowSpy).toHaveBeenCalledWith('#/account/123', 'accountInfo-0', commonFeatures, true);

        openAccountInfo(123, true, true);
        expect(windowSpy.calls.count()).toEqual(2);
        expect(windowSpy).toHaveBeenCalledWith('#/account/123', 'accountInfo-1', commonFeatures, true);

        // replace = true
        openAccountInfo(234, true, true);
        expect(windowSpy.calls.count()).toEqual(3);
        expect(windowSpy.calls.mostRecent().args).toEqual(['#/account/234', 'accountInfo-2', commonFeatures, true]);
    });

    it('openGLAccountInfo', () => {
        openGLAccountInfo();
        expect(window.location.hash).toEqual('');
        openGLAccountInfo(123);
        expect(window.location.hash).toEqual('#/glaccount/123');

        const windowSpy = spyOn(window, 'open');
        openGLAccountInfo(123, true);
        expect(windowSpy).toHaveBeenCalled();
        expect(windowSpy).toHaveBeenCalledWith('#/glaccount/123', 'GLaccountInfo-0', commonFeatures, true);

        openGLAccountInfo(123, true, true);
        expect(windowSpy.calls.count()).toEqual(2);
        expect(windowSpy).toHaveBeenCalledWith('#/glaccount/123', 'GLaccountInfo-1', commonFeatures, true);

        // replace = true
        openGLAccountInfo(234, true, true);
        expect(windowSpy.calls.count()).toEqual(3);
        expect(windowSpy.calls.mostRecent().args).toEqual(['#/glaccount/234', 'GLaccountInfo-2', commonFeatures, true]);
    });

    it('openRegisteredRepInfo', () => {
        openRegisteredRepInfo();
        expect(window.location.hash).toEqual('');
        openRegisteredRepInfo(123);
        expect(window.location.hash).toEqual('#/regrep/123');
    });

    it('openProductInfo', () => {
        openProductInfo();
        expect(window.location.hash).toEqual('');
        openProductInfo(123);
        expect(window.location.hash).toEqual('#/product/123');

        const windowSpy = spyOn(window, 'open');
        openProductInfo(123, true);
        expect(windowSpy).toHaveBeenCalled();
        expect(windowSpy).toHaveBeenCalledWith('#/product/123', 'productInfo-0', commonFeatures, true);

        openProductInfo(123, true, true);
        expect(windowSpy.calls.count()).toEqual(2);
        expect(windowSpy).toHaveBeenCalledWith('#/product/123', 'productInfo-1', commonFeatures, true);

        // replace = true
        openProductInfo(234, true, true);
        expect(windowSpy.calls.count()).toEqual(3);
        expect(windowSpy.calls.mostRecent().args).toEqual(['#/product/234', 'productInfo-2', commonFeatures, true]);
    });

    it('openCustodianInfo', () => {
        openCustodianInfo();
        expect(window.location.hash).toEqual('');

        openCustodianInfo(123);
        expect(window.location.hash).toEqual('#/custodian/123');

        const windowSpy = spyOn(window, 'open');
        openCustodianInfo(123, true);
        expect(windowSpy).toHaveBeenCalled();
        expect(windowSpy).toHaveBeenCalledWith('#/custodian/123', 'custodianInfo-0', commonFeatures, true);

        openCustodianInfo(123, true, true);
        expect(windowSpy.calls.count()).toEqual(2);
        expect(windowSpy).toHaveBeenCalledWith('#/custodian/123', 'custodianInfo-1', commonFeatures, true);

        // replace = true
        openCustodianInfo(234, true, true);
        expect(windowSpy.calls.count()).toEqual(3);
        expect(windowSpy.calls.mostRecent().args).toEqual(['#/custodian/234', 'custodianInfo-2', commonFeatures, true]);
    });


    it('openCompanyInfo', () => {
        openCompanyInfo();
        expect(window.location.hash).toEqual('');

        openCompanyInfo(123);
        expect(window.location.hash).toEqual('#/company/123');

        const windowSpy = spyOn(window, 'open');
        openCompanyInfo(123, true);
        expect(windowSpy).toHaveBeenCalled();
        expect(windowSpy).toHaveBeenCalledWith('#/company/123', 'companyInfo-0', commonFeatures, true);

        openCompanyInfo(123, true, true);
        expect(windowSpy.calls.count()).toEqual(2);
        expect(windowSpy).toHaveBeenCalledWith('#/company/123', 'companyInfo-1', commonFeatures, true);

        // replace = true
        openCompanyInfo(234, true, true);
        expect(windowSpy.calls.count()).toEqual(3);
        expect(windowSpy.calls.mostRecent().args).toEqual(['#/company/234', 'companyInfo-2', commonFeatures, true]);
    });


    it('openBrokerInfo', () => {
        openBrokerInfo();
        expect(window.location.hash).toEqual('');

        openBrokerInfo(123);
        expect(window.location.hash).toEqual('#/broker/123');

        const windowSpy = spyOn(window, 'open');
        openBrokerInfo(123, true);
        expect(windowSpy).toHaveBeenCalled();
        expect(windowSpy).toHaveBeenCalledWith('#/broker/123', 'brokerInfo-0', commonFeatures, true);

        openBrokerInfo(123, true, true);
        expect(windowSpy.calls.count()).toEqual(2);
        expect(windowSpy).toHaveBeenCalledWith('#/broker/123', 'brokerInfo-1', commonFeatures, true);

        // replace = true
        openBrokerInfo(234, true, true);
        expect(windowSpy.calls.count()).toEqual(3);
        expect(windowSpy.calls.mostRecent().args).toEqual(['#/broker/234', 'brokerInfo-2', commonFeatures, true]);
    });

    it('openOfficeInfo', () => {
        openOfficeInfo();
        expect(window.location.hash).toEqual('');

        openOfficeInfo(123);
        expect(window.location.hash).toEqual('#/office/123');

        const windowSpy = spyOn(window, 'open');
        openOfficeInfo(123, true);
        expect(windowSpy).toHaveBeenCalled();
        expect(windowSpy).toHaveBeenCalledWith('#/office/123', 'officeInfo-0', commonFeatures, true);

        openOfficeInfo(123, true, true);
        expect(windowSpy.calls.count()).toEqual(2);
        expect(windowSpy).toHaveBeenCalledWith('#/office/123', 'officeInfo-1', commonFeatures, true);

        // replace = true
        openOfficeInfo(234, true, true);
        expect(windowSpy.calls.count()).toEqual(3);
        expect(windowSpy.calls.mostRecent().args).toEqual(['#/office/234', 'officeInfo-2', commonFeatures, true]);
    });

    it('openCorrespondentInfo', () => {
        openCorrespondentInfo();
        expect(window.location.hash).toEqual('');

        openCorrespondentInfo(123);
        expect(window.location.hash).toEqual('#/correspondent/123');

        const windowSpy = spyOn(window, 'open');
        openCorrespondentInfo(123, true);
        expect(windowSpy).toHaveBeenCalled();
        expect(windowSpy).toHaveBeenCalledWith('#/correspondent/123', 'correspondentInfo-0', commonFeatures, true);

        openCorrespondentInfo(234, true, true);
        expect(windowSpy.calls.count()).toEqual(2);
        expect(windowSpy).toHaveBeenCalledWith('#/correspondent/234', 'correspondentInfo-1', commonFeatures, true);

        // replace = true
        openCorrespondentInfo(345, true, true);
        expect(windowSpy.calls.count()).toEqual(3);
        expect(windowSpy.calls.mostRecent().args).toEqual(['#/correspondent/345', 'correspondentInfo-2', commonFeatures, true]);
    });

    it('openUserInfo', () => {
        openUserInfo();
        expect(window.location.hash).toEqual('');

        openUserInfo(123);
        expect(window.location.hash).toEqual('#/user/123');

        const windowSpy = spyOn(window, 'open');
        openUserInfo(123, true);
        expect(windowSpy).toHaveBeenCalled();
        expect(windowSpy).toHaveBeenCalledWith('#/user/123', 'User Info', commonFeatures, true);
    });


    it('openCustomerInfo', () => {
        openCustomerInfo();
        expect(window.location.hash).toEqual('');

        openCustomerInfo(123);
        expect(window.location.hash).toEqual('#/customer/123');

        const windowSpy = spyOn(window, 'open');
        openCustomerInfo(123, true);
        expect(windowSpy).toHaveBeenCalled();
        expect(windowSpy).toHaveBeenCalledWith('#/customer/123', 'Customer Info', commonFeatures, true);
    });

    it('jumpToCallLog', () => {
        jumpToCallLog(1, 'a', 'a', 'a', false, false);
        expect(window.location.hash).toEqual(`#/margin/calllog?accountId=${1}&accountName=a&accountSynonym=a&accountNumber=a`)
    });

    xit('jumpToTransaction', () => {
        expect(false).toEqual(true);
    });

    xit('jumpToFeeDetail', () => {
        expect(false).toEqual(true);
    });

    it('openRoleInfo', () => {
        openRoleInfo();
        expect(window.location.hash).toEqual('');

        openRoleInfo(123);
        expect(window.location.hash).toEqual('#/role/123');

        const windowSpy = spyOn(window, 'open');
        openRoleInfo(123, true);
        expect(windowSpy).toHaveBeenCalled();
        expect(windowSpy).toHaveBeenCalledWith('#/role/123', 'Role Info', commonFeatures, true);
    });

    it('openTrialInfo', () => {

        openTrialInfo({ x: 1123 });
        expect(window.location.hash).toEqual('#/trial?x=1123');

        const windowSpy = spyOn(window, 'open');
        openTrialInfo({ x: 1123 }, true);
        expect(windowSpy).toHaveBeenCalled();
        expect(windowSpy).toHaveBeenCalledWith('#/trial?x=1123', 'trialInfo-0', commonFeatures, true);

        openTrialInfo({ x: 1123 }, true, true);
        expect(windowSpy.calls.count()).toEqual(2);
        expect(windowSpy).toHaveBeenCalledWith('#/trial?x=1123', 'trialInfo-1', commonFeatures, true);

        // replace = true
        openTrialInfo({ x: 1234 }, true, true);
        expect(windowSpy.calls.count()).toEqual(3);
        expect(windowSpy.calls.mostRecent().args).toEqual(['#/trial?x=1234', 'trialInfo-2', commonFeatures, true]);
    });

    xit('openMiddleMoneyInfo', () => {
        expect(false).toEqual(true);
    });


    xit('openDefaultFee', () => {
        expect(false).toEqual(true);
    });

    it('openCreatePage', () => {
        openCreatePage('account');
        expect(window.location.hash).toEqual('#/new/account');

        openCreatePage('accountGL');
        expect(window.location.hash).toEqual('#/new/glaccount');

        openCreatePage('broker');
        expect(window.location.hash).toEqual('#/new/broker');

        openCreatePage('customer');
        expect(window.location.hash).toEqual('#/new/customer');

        openCreatePage('company');
        expect(window.location.hash).toEqual('#/new/company');

        openCreatePage('product');
        expect(window.location.hash).toEqual('#/new/product');

        openCreatePage('correspondent');
        expect(window.location.hash).toEqual('#/new/correspondent');

        openCreatePage('office');
        expect(window.location.hash).toEqual('#/new/office');

        openCreatePage('custodian');
        expect(window.location.hash).toEqual('#/new/custodian');

        openCreatePage('middleMoney');
        expect(window.location.hash).toEqual('#/new/midmoney');

        openCreatePage('registerRep');
        expect(window.location.hash).toEqual('#/new/regrep');

        openCreatePage('user');
        expect(window.location.hash).toEqual('#/new/user');

        openCreatePage('role');
        expect(window.location.hash).toEqual('#/new/role');
    });


    it('openCallLogInfo', () => {
        openCallLogInfo(1, 1, false, false, false);
        const url = '/margin/calllog/1?accountID=1';
        expect(window.location.hash).toEqual(`#${url}`);
    });

    it('openAuctionDetail', () => {
        const params = {
            id: 1,
            status: 1,
            maxPrice: 10
        };
        openAuctionDetail(params, false, false, false);
        expect(window.location.hash).toEqual(`#/sec/auctions/${params.id}?status=${params.status}&maxPrice=${params.maxPrice}`);
    });

    it('gotoLoginPage', () => {
        gotoLoginPage();
        expect(window.location.hash).toEqual('#/auth/login');

        gotoLoginPage(true);
    });

    it('gotoRegisterPage', () => {
        gotoRegisterPage();
        expect(window.location.hash).toEqual('#/auth/register');
    });

    it('gotoPosition', () => {
        gotoPosition({ accountId: 1, businessDate: '2019', asOfDate: '2017' });
        expect(window.location.hash).toEqual('#/records/position/?accountId=1&asOfDate=2017&businessDate=2019');

        gotoPosition({ accountId: 1 });
        expect(window.location.hash).toEqual('#/records/position/?accountId=1');
    });

    it('isOpenWindow', () => {
        const flag = isOpenWindow();
        expect(flag).toEqual(false);
    });





});