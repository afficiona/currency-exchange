// Convert degree to radians;
const _degToRad = deg => deg * Math.PI / 180;

export const formatToDecimal = (num, toPlaces = 2) =>
  Number(parseFloat(Math.round(num * 100) / 100).toFixed(toPlaces));
;
