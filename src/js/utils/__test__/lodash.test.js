
import { 
    assign,
    assignIn,
    cloneDeep,
    keys,
    filter,
    isNumber,
    isString,
    isObject,
    omit,
    merge,
    times,
    camelCase
} from '../lodash';

describe('utils lodash', () => {

    it('function test', () => {
        expect(typeof assign).toBe('function');
        expect(typeof assignIn).toBe('function');
        expect(typeof cloneDeep).toBe('function');
        expect(typeof keys).toBe('function');
        expect(typeof filter).toBe('function');
        expect(typeof isNumber).toBe('function');
        expect(typeof isString).toBe('function');
        expect(typeof isObject).toBe('function');
        expect(typeof omit).toBe('function');
        expect(typeof merge).toBe('function');
        expect(typeof times).toBe('function');
        expect(typeof camelCase).toBe('function');
    });

})