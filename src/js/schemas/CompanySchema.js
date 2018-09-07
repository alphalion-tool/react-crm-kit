import Schema from './Schema';
import { formatDate } from 'jscom/utils/formatter';
import { zip, phone, email, fax } from 'jscom/config/forms/rules'

// fax.push({ required: true })
// phone.push({ required: true })
// zip.push({ required: true })
// email.push({ required: true })

export default class CompanySchema extends Schema {

    static fields = {
        addressLine1: { type: 'string', rules: [{ type: 'string', min: 1, max: 250 }, { required: true }] },
        addressLine2: { type: 'string', rules: [{ type: 'string', min: 1, max: 250 }] },
        city: { type: 'string', rules: [{ type: 'string', min: 1, max: 150 }, { required: false }] },
        email: { type: 'string', rules: email },
        fax: { type: 'string', rules: fax },
        phone: { type: 'string', rules: phone },
        zip: { type: 'string', rules: zip },
        state: { type: 'string', rules: [{ type: 'string', min: 0, max: 10 }, { required: false }] },
        companyId: { type: 'int', validator: { type: 'int' } },
        companyName: { type: 'string', rules: [{ type: 'string', min: 1, max: 150 }, { required: true }] },
        country: { type: 'string', rules: { required: false } },
        description: { type: 'string', rules: [{ type: 'string', max: 250, min: 1 }, { required: true }] },
        createTime: { type: 'string' },
        hasFee: { type: 'boolean' }
    };

    // 从API构建数据
    static fromAPI (params) {
        return new CompanySchema({
            companyId: params.companyId,
            country: params.country,
            description: params.description,
            hasFee: params.hasFee,
            addressLine1: params.addressLine1,
            addressLine2: params.addressLine2,
            city: params.city,
            email: params.email,
            fax: params.fax,
            phone: params.phone,
            zip: params.zip,
            state: params.state,
            companyName: params.name,
            createTime: formatDate(params.createTime, 'YYYY-MM-DD HH:mm:ss', 'MM/DD/YYYY HH:mm:ss')
        });
    }

    static initialCompany () {
        return new CompanySchema({
            companyId: '',
            country: '',
            description: '',
            hasFee: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            email: '',
            fax: '',
            phone: '',
            zip: '',
            state: '',
            companyName: '',
            createTime: ''
        });
    }

    static company2Option (company = {}) {
        return {
            value: company.companyId,
            label: company.companyName,
            key: company.companyId,
            ins: company
        };
    }

    constructor (props) {
        super(props, CompanySchema.fields);
    }

    toAPI () {
        const json = { ...this.toJSON() }
        const temp = { ...json };
        temp.name = json.companyName;
        delete temp.companyName;
        temp.createTime = formatDate(temp.createTime, 'MM/DD/YYYY HH:mm:ss', 'YYYY-MM-DD HH:mm:ss');
        return temp;
    }
}