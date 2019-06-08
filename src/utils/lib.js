// Convert degree to radians;
const _degToRad = deg => deg * Math.PI / 180;

export const formatToDecimal = (num, toPlaces = 2) =>
  Math.round(num * `1e${toPlaces}`) / `1e${toPlaces}`
;
