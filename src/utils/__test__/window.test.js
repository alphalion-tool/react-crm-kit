

import {
    openWindow,
    openTab,
    openCompanyInfo,
    openUserInfo,
    gotoLoginPage,
    gotoRegisterPage,
    isOpenWindow,
    openCreatePage,
    commonFeatures
} from '../window';

xdescribe('utils window', () => {

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

    it('openCreatePage', () => {
        // openCreatePage('account');
        // expect(window.location.hash).toEqual('#/new/account');

        openCreatePage('company');
        expect(window.location.hash).toEqual('#/new/company');

        openCreatePage('user');
        expect(window.location.hash).toEqual('#/new/user');
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

    it('isOpenWindow', () => {
        const flag = isOpenWindow();
        expect(flag).toEqual(false);
    });

});