'use strict';

// Opts object lets us not have to use string literals for our function opts
const Opts = {
  up: "UP",
  down: "DOWN",
  downRight: "DR",
  upLeft: "UL",
}

export function checkLines(line1: string, line2: string, line3: string, line4: string, opts: string) {
  let total = 0;

  // We want the fall through cases here, up and up left reverse the lines and that makes
  // the same case as down and down right. We could use a function for the line reverse to
  // keep with DRY, but it felt unnecessary
  /* eslint-disable no-fallthrough */
  switch (opts) {
    case Opts.up:
      [line1, line4] = [line4, line1];
      [line2, line3] = [line3, line2];
    case Opts.down:
      for (let i = 0; i <= line1.length; i++) {
        if (line1[i] === 'X') {
          if(line2[i] === 'M') {
            if(line3[i] === 'A') {
              if(line4[i] === 'S') {
                total += 1;
              }
            }
          }
        }
      }
      break;
    case Opts.upLeft:
      [line1, line4] = [line4, line1];
      [line2, line3] = [line3, line2];
    case Opts.downRight:
      for (let i = 0; i <= line1.length - 2; i++) {
        if (line1[i] === 'X') {
          if(line2[i + 1] === 'M') {
            if(line3[i + 2] === 'A') {
              if(line4[i + 3] === 'S') {
                total += 1;
              }
            }
          }
        }
      }
      break;
  }
  /* eslint-enable no-fallthrough */

  return total;
}

// Takes a string as input and returns the reverse of that string. 
export function reverseStr(str: string) {
  return str.split('').reverse().join('');
}

export default async function day4Part1() {
  // fetch our input
  const file = '/src/day4/day4Input.txt';
  const response = await fetch(file);
  if (!response.ok) {
    alert("response not good");
  }
  const rawData = await response.text();

  // use regex pattern to match the left/right cases
  let total = 0;
  const pattern = /XMAS|SAMX/g;
  const matches = rawData.match(pattern)!;

  total += matches.length;

  // split the raw data into each line
  const data = rawData.split('\n');

  // reverse each line to transform downleft into downright and upright into upleft
  const revData = [];
  for (const item of data) {
    revData.push(reverseStr(item));
  }

  for (let i = 0; i < data.length - 3; i++) {
    total += checkLines(data[i], data[i + 1], data[i + 2], data[i + 3], Opts.up);
    total += checkLines(data[i], data[i + 1], data[i + 2], data[i + 3], Opts.down);
    total += checkLines(data[i], data[i + 1], data[i + 2], data[i + 3], Opts.downRight);
    total += checkLines(data[i], data[i + 1], data[i + 2], data[i + 3], Opts.upLeft);

    total += checkLines(revData[i], revData[i + 1], revData[i + 2], revData[i + 3], Opts.downRight);
    total += checkLines(revData[i], revData[i + 1], revData[i + 2], revData[i + 3], Opts.upLeft);
  }
   
  console.log(total);
}
