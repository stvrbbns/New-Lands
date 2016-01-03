/***  -- File Details --
 * Original Creation Date: 2010-08-18
 * Date Last Edited or Altered: 2010-08-18
 * Author List [most recent active month]:
 *      Stephen T. Robbins [2010-08]
 * File Dependencies:
 *      -none-
 * Function List:
 *      array_removeElementByValue(array, removeValue)
 *      isEmpty(variable)
 *      rand_int(max, min)
 *
 */
/* File Description: This is used to extend default/normal JavaScript objects
 *      with additional functionality.
 *
 * File Activity Explanation: This file contains a collection general utility
 *      functions for interacting with existing JavaScript elements/objects.
 */
/* -- Known Issues, Suggested Updates/Improvements, and Notices --
 * -none-
 */



/** array_removeElementByValue() removes all elements with the indicated target
 *      value from the passed array.
 * @param array       -- array - an array of $key=>$value pairs.
 * @param targetValue -- any type - the target value used to remove matching elements.
 * @return array -- the passed array with the target element(s) removed.
 */
function array_removeElementByValue(array, targetValue)
{
try {
  for(var arrayIndex=0; arrayIndex<array.length; arrayIndex++)
  {
    if(array[arrayIndex] == targetValue)
      array.splice(arrayIndex, 1);
  }
} catch(e) {alert('{' + e.description + '}: ' + e.message);}
} // End of array_removeElementByValue() function.



/** isEmpty() takes any variable and returns whether or not it is empty as a boolean.
 * @param variable -- any-type - a variable which may or may not be empty.
 * @return bool - whether or not the variable is empty.
 */
function isEmpty(variable)
{
  if(  (variable === undefined)
    || (typeof variable === 'undefined'))
  { return true; }
  if(  (variable === null)
    || (variable === false)
    || (variable === 0)
    || (variable === '0')
    || (variable === ''))
  { return true; }

  if (typeof variable == 'object')
  {
    for(var key in variable)
    {   // These include attributes, children, array elements, etc.
      return false;
    }
    return true;
  }
  return false;
} // End of isEmpty() function.



/** rand_int() generates a random integer from a specified range.
 * @param max -- integer - optional - high end of the range; 2147483647 if omitted.
 * @param min -- integer - optional - the low end of the range; 0 if omitted.
 * @return integer - a randomly generated integer bounded by the range.
 */
function rand_int(min, max)
{
  if(min == null) { min = 0; }
  if(max == null) { max = 2147483647; }
  return Math.floor(Math.random() * (max - min + 1)) + min;
} // End of rand_int() function.