
import { 
    fromJS,
    is,
    IList,
    IMap,
    ISet,
    ICollection,
} from '../immutable';

describe('utils immutable', () => {
    
    it('function', () => {
        expect(typeof fromJS).toBe('function');
        expect(typeof is).toBe('function');
        expect(typeof IList).toBe('function');
        expect(typeof IMap).toBe('function');
        expect(typeof ISet).toBe('function');
        expect(typeof ICollection).toBe('function');
    });
})