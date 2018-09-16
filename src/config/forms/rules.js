
const zip = [{ type: 'string', min: 4, max: 11 }, { type: 'string', pattern: /^[\d-]*$/, message: 'Must be numbers' }];
const phone = [{ type: 'string', min: 7, max: 25 }, { type: 'string', pattern: /^[\d-+]*$/, message: 'Must be Numbers or +/-' }];
const email = [{ type: 'email' }, { type: 'string', min: 5, max: 100 }];
const fax = [{ type: 'string', min: 7, max: 25 }, { type: 'string', pattern: /^[+-\d]*$/, message: 'Must be Numbers or +/-' }];

function textareaStr2Arr (str) {
    if (str) {
        let addressStr = str.replace(/(?:\r\n|\r|\n)/g, '\u21b5');
        return addressStr.split('\u21b5');
    } else {
        return [];
    }
}

function validateEmails (emails) { // 多邮箱验证
    let emailErr = null;
    if (emails) {
        let addressArray = textareaStr2Arr(emails);
        addressArray.forEach((emailItem) => {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailItem)) {
                emailErr = {
                    email: 'Invalidate Email Address'
                }
            }
        });
    }
    return emailErr;
}

export {
    zip,
    phone,
    email,
    fax,
    textareaStr2Arr,
    validateEmails
}