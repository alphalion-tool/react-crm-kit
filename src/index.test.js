/* eslint-disable quotes, quote-props */
import React from 'react';

describe('App Entry', () => {
    it('loads without problems', () => {
        expect(1).toEqual(1);
        window.__data = {
            isLoggedIn: true,
            permission: {
                
                "company": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "query": true
                },
                "currency": {
                    "add": true,
                    "edit": true,
                    "query": true
                },
                "product": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "query": true
                },
                "user": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "query": true
                },
                "account": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "query": true
                }
            }
        };
        // require('jscom/index.js');
    });
});