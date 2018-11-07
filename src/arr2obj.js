/*
 * lektorium course: Java Script
 * lesson #3 homework: task 2 -- converting an array to an object
 *
 * made by Vitaliy Dovgan
 */

var theArray = [NaN, undefined, 1, -7, null, 6, true, 0, Infinity, { key: 'val' }, false, () => {}, '', 0, ['arr'], -17]

var arr2obj = function (array) {
  var theObject = {}
  array.forEach((element, index) => {
    if ((!!element || (element === 0) || typeof element === 'boolean') &&
        typeof element !== 'object' &&
        typeof element !== 'function') { // avoiding some weird object keys
      theObject['' + element.toString()] = index
    }
  })
  return theObject
}

console.log(arr2obj(theArray))
