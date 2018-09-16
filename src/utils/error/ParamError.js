/* @flow */


export default class ParamError extends Error {

    errors: any;  // like { name: '长度不小于10' }

    constructor (message: string, errors: any) {
        super();
        this.message = message;
        this.stack = (new Error(message)).stack;
        this.name = 'ParamError';
        this.errors = errors;
    }

    toString () {
        return `${this.name}: ${JSON.stringify(this.errors)}`;
    }

}