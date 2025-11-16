"use strict";

// Seperated this as its one funciton, should be useful for part 2 of day 3.
// accepts a string "(*,*)" where * is a int with 1 to 3 digits
// returns an int of the two numbers multiplied 
export function mul(item: string) {
  // vars, changeVar is used to note when the next number starts in the string
  let x = "";
  let y = "";
  let changeVar = false;

  // iterate over string(item)
  for (const char of item) {
    if (char === '(' || char === ')') {
      continue;
    } else if (char === ',') {
      changeVar = true;
      continue;
    };

    if ( changeVar ) {
      y += char;
    } else {
      x += char;
    };
  };

  return Number(x) * Number(y);
}



async function runDay3() {
  // Regex pattern we will use, \d matches numbers(0-9) and {1,3} is the range of digits, we want 1 to 3 digits
  const regexmul = /mul\(\d{1,3},\d{1,3}\)/g;

  // Load the .txt file 
  const file = "/src/day3/day3Input.txt";
  const response = await fetch(file);

  // Error check
  if (!response.ok) {
    alert("response is NOT ok");
    return;
  };

  // Convert the respones to a big string, then parse the regex, data is Not null(!)
  const text = await response.text();
  const data = text.match(regexmul)!;

  let total = 0;

  data.map(item => {
    // create substring that removes the "mul" out of each string
    item = item.substring(3);

    // use our mul function to do a basic calc and conversion
    total += mul(item);
  })

  // This is it, Should work unless it was changed, Total should be 170068701
  console.log(total);
}

runDay3();

