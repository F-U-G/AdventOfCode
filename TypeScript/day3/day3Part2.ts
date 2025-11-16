"use strict";
import { mul } from "./day3Part1.ts";

export default async function runDay3() {
  // match do(), don't(), and mul(*,*) where * is a number with 1 to 3 digits
  // we want to match all 3 patterns in one array so that we can preform logic later
  const pattern = /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g

  const response = await fetch("/src/day3/day3Input.txt");
  if (!response.ok) {
    alert("Response is NOT ok");
    return;
  }

  const file = await response.text();
  const data = file.match(pattern)!;

  let doDont = true;
  const newData = [];
  let total = 0;

  // when hitting do we add all the muls we find after to a new array(newData)
  // hitting a don't will 'disable' the muls after and we dont add them to the array
  for (const item of data) {
    if (item === "do()") {
      doDont = true;
      continue;
    } else if (item === "don't()") {
      doDont = false;
      continue;
    }

    // push to array, substring removes the mul at the front of the string for our mul() function later
    if (doDont) {
      newData.push(item.substring(3));
    }
  }

  // calc the total using mul()
  newData.map(item => {
    total += mul(item);
  }) 

  // This should work, total is 78683433
  console.log(total)
}
