import { formatToDecimal } from './../../src/utils/lib';
import assert from  'assert';

describe('formatDecimal 123.0134523 to 123.01', () => {
  it('converts 123.0134523 to 123.01', () => {
    assert.deepEqual(formatToDecimal(123.0134523), 123.01);
  });

  it('converts 123.01 to 123.01', () => {
    assert.deepEqual(formatToDecimal(123.01), 123.01);
  });

  it('gives error on NaN input', () => {
    assert.equal(isNaN(formatToDecimal('random')), true);
  });
});
