
import { createFormField } from 'antd/lib/form';
import UserSchema from 'jscom/schemas/UserSchema';

const containerId = 'scroll-user-info';

/* 表单里每项的描述 */
const formDescriptions = {
    userId: {
        rules: UserSchema.fields.userId.rules,
        label: 'User Id',
        key: 'userId'
    },
    userName: {
        rules: UserSchema.fields.userName.rules,
        label: 'User Name',
        key: 'userName'
    },
    email: {
        rules: UserSchema.fields.email.rules,
        label: 'Email',
        key: 'email'
    },
    firstName: {
        rules: UserSchema.fields.firstName.rules,
        label: 'First Name',
        key: 'firstName'
    },
    lastName: {
        rules: UserSchema.fields.lastName.rules,
        label: 'Last Name',
        key: 'lastName'
    },
    description: {
        rules: UserSchema.fields.description.rules,
        label: 'Description',
        key: 'description'
    },
    phone: {
        rules: UserSchema.fields.phone.rules,
        label: 'Phone',
        key: 'phone'
    },
    // company: {
    //     rules: UserSchema.fields.company.rules,
    //     label: 'Company',
    //     key: 'company'
    // },
    // correspondent: {
    //     rules: UserSchema.fields.correspondent.rules,
    //     label: 'Correspondent',
    //     key: 'correspondent'
    // },
    // role: {
    //     rules: UserSchema.fields.role.rules,
    //     label: 'Role',
    //     key: 'role'
    // },
    password: {
        rules: UserSchema.fields.password.rules,
        label: 'Password',
        key: 'password'
    },
    token: {
        // rules: UserSchema.fields.token.rules,
        label: 'Google Auth Code',
        key: 'token'
    }
};

function mapData2Fields(data, formDesc) {
    const ret = {};
    Object.keys(formDesc).forEach((key) => {
        ret[key] = {};
        // createFormField({
        //     value: data[key]
        // })
    });
    return ret;
}

/* 右侧滚动导航 */
const scrollMenus = [
    {
        title: 'Info',
        key: 'info',
        containerId,
    }
];

export {
    containerId,
    scrollMenus,
    formDescriptions,
    mapData2Fields
}