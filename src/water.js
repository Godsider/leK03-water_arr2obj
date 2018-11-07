/*
 * lektorium course: Java Script
 * lesson #3 homework: task 1 -- calculating the capacity of water puddles :)
 *
 * made by Vitaliy Dovgan
 */

// representing arrays as a two-dimensional array
var arrays = [
  [2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 0], // 10
  [2, 5, 1, 3, 1, 2, 1, 7, 7, 6], // 17
  [7, 0, 1, 3, 4, 1, 2, 1], // 9
  [2, 2, 1, 2, 2, 3, 0, 1, 2], // 4
  [2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 8], // 24
  [2, 2, 2, 2, 2], // 0
  [0, 0, 2, 3, 4, 3, 2, 1, 1], // 0
  [] // 0
]

var waterAll, waterTemp, currDepth // water amounts
var borderIndexR, borderIndexL // range borders
var maxElemIndex // max value element index

var reducer = function (needNewRegion, currElem, currIndex, theArray) {
  if (currIndex === 0) return true // skipping the very first position -- the default left border

  if (needNewRegion) { // finding borders of a range able to contain puddles
    // looking for the nearest max element's index starting from current position
    maxElemIndex = theArray.slice(currIndex).reduce((lastIndex, nowElem, nowIndex, array) => {
      return nowElem > array[lastIndex] ? nowIndex : lastIndex
    }, 0) + currIndex

    if (maxElemIndex === currIndex) { // no puddle here, maxElemIndex can't be a right border,..
      borderIndexL = maxElemIndex // ...it can be a left border, so use maxElemIndex as a new left border
      return true // going on to find a right border
    } else { // we've found a new right border
      borderIndexR = maxElemIndex // use maxElemIndex as a right border
      currDepth = Math.min(theArray[borderIndexL], theArray[borderIndexR]) // getting a max possible water level between current borders
    }
  }

  // going on to find some water
  if (currIndex < borderIndexR) { // if right border isn't reached
    if (currElem > theArray[borderIndexL]) { // current puddle ended (if any), hence the possible left border for a new puddle found
      waterAll += waterTemp // accumulating water we have collected within the puddle (if any)
      waterTemp = 0 // starting a new puddle
      borderIndexL = currIndex // using current position as a new left border
      currDepth = Math.min(theArray[borderIndexL], theArray[borderIndexR]) // getting a max possible water level between current borders
    } else { // no new puddle, possible water found!
      waterTemp += currDepth - currElem // accumulating water for the current puddle
    }
    return false // looking for more water
  } else { // if right border reached (current range ended)
    waterAll += waterTemp // accumulating water we have collected within the last puddle (if any)
    waterTemp = 0 // starting a new puddle
    borderIndexL = borderIndexR // trying using last range end as a possible new range start
    return true // going on to find a right border
  }
}

var getWater = function (array) {
  console.log(array)
  if (array.length < 3) return 0 // acting fast on arrays too small to contain any puddle

  waterAll = waterTemp = currDepth = 0 // resetting water amounts
  borderIndexR = borderIndexL = 0 // setting range borders to the start of the array
  maxElemIndex = 0 // the default for the max value element index

  array.reduce(reducer, true) // do the magic!
  return waterAll // returning the global var -- just for convenience sake
}

console.clear()
arrays.forEach((oneArray, index) => {
  console.log('\n')
  console.log('^^ Landscape ' + index + ' -- straight, water amount: ' + getWater(oneArray))
  console.log('^^ Landscape ' + index + ' -- reversed, water amount: ' + getWater(oneArray.slice().reverse()))
})
