import { formatToDecimal } from './lib';

/**
 * The api is expected to return the data in format `rates: { EUR: 1.2345 }`;
 * The function normalizes such data to return just the rate value;
 * @param { Object } rawData 
 */
export const normalizeExchangeRateData = rawData => {
    let retData = null;
    if (rawData && rawData.rates) {
        Object.keys(rawData.rates).map(key => {
            if (!retData) {
                retData = formatToDecimal(rawData.rates[key]);
            }
        });
    }

    return retData;
}
