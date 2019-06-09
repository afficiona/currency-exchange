import { normalizeExchangeRateData } from './../../src/utils/normalizer';
import assert from  'assert';

describe('Rate data Normalizer: ', () => {
  it('normalizes correct data from api', () => {
    assert.deepEqual(normalizeExchangeRateData({
        rates: {
            GBP: 123.01789
        }
    }), 123.02);
  });

  it('normalizes incorrect data from api', () => {
    assert.deepEqual(normalizeExchangeRateData({
        random: {
            data: 'not a number'
        }
    }), null);
  });
});
