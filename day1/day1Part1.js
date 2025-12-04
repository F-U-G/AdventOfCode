"use strict";

import fs from "fs/promises";

const dialMax = 99;
const dialMin = 0;
const dialWrap = 100;

class Dial {
  constructor(startPos) {
    this.dialPos = startPos;
  }

  password = 0; // add one to password everytime dial hits 1
  RL = true; // RL: Right Left, true is right, false is left

  getPass() {
    return this.password;
  }

  parseLine(input) { // input should be one line from the input, Ex: 'L54'
    if (input[0] == "R") {
      this.RL = true;
    } else if (input[0] == "L") {
      this.RL = false;
    } else {
      throw new Error(`Input ${input} is not valid`);
    }

    let turn = Number(input.slice(1,)) // remove letter

    if (this.RL) { // Right
      this.dialPos += turn;
    } else { // Left
      this.dialPos -= turn;
    }

    while (this.dialPos > dialMax) {
      this.dialPos -= dialWrap;
    }

    while (this.dialPos < dialMin) {
      this.dialPos += dialWrap;
    }

    if (this.dialPos == 0) {
      this.password += 1;
    }
    return
  }

}

async function run() {
  const data = await fs.open("./day1Input.txt");

  // const data = response.text();
  const dial = new Dial(50); // dial starts at 50 in this puzzle

  for await (const line of data.readLines()) {
    dial.parseLine(line);
  }

  console.log(dial.getPass()); // should give the correct output
  return;
}

run();
