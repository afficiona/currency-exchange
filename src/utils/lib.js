/**
 * Format the number to the decimal places(2 by default)
 * @param { Number } num 
 * @param { Number } toPlaces 
 */
export const formatToDecimal = (num, toPlaces = 2) =>
  Math.round(num * `1e${toPlaces}`) / `1e${toPlaces}`
;

/**
 * Check if the char code is number with decimal places not more than {decimalPlaces}.
 * NOTE: This may not work for Android mobile since keypress events are not recognized in mobile
 * browsers.
 * @param {*} e : Input keypress event
 * @param { Number } decimalPlaces : Decimal precision to set to val
 */
export const checkNumberWithDecimalPlaces = (e, decimalPlaces = 2) => {
  // Check if e is an event
  if (!e.target) {
    throw new Error(`Unexpected argument of type '${typeof e}' found`);
  }

  const keycode = e.which;
  const { value } = e.target;
  const digitsAfterDecimal = value.split('.')[1];

  // If keycode represents char in the range of valid number characters, like dot, 0-9
  if (keycode === 46 || keycode === 8 || keycode === 37 || keycode === 39 || (keycode >= 48 && keycode <= 57)) {
    if (
      // If the value already has a decimal dot, do not allow another dot.
      (keycode === 46 ? value.indexOf('.') === -1 : true) &&
      // Do not allow digits if decimalPlaces is already 2.
      (digitsAfterDecimal ? digitsAfterDecimal.length < 2 : true)
    ) {
      return true;
    }
  }
  e.preventDefault();
}
