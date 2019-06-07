import { formatToDecimal } from './lib';

import { 
  ACCEPTABLE_DISTANCE_FROM_OFFICE,
  INTERCOM_OFFICE_LOCATION_LAT,
  INTERCOM_OFFICE_LOCATION_LON
 } from './../constants/States';
 
 export const normalizeExchangeRateData = rawData => {
   let retData = null;
   if (rawData && rawData.rates) {
     Object.keys(rawData.rates).map(key => {
       if (!retData) {
         retData = formatToDecimal(rawData.rates[key]); // Test this.
       }
     });
   }

   return retData;
 }
 