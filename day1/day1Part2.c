#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define DIAL_MIN 0
#define DIAL_MAX 99
#define BSIZE 8

int main(void) {
  // file variables
  char *r;
  FILE *fp;
  char fileName[] = "day1Input.txt";
  char buffer[BSIZE];

  // logic variables
  char dir;
  char turn[BSIZE];
  int turnNum;
  int dial = 50;
  int sum = 0;
  bool leftRun = false; // checks if the left turn while loop ran

  // file check
  fp = fopen(fileName, "r");
  if (fp == NULL) {
    fprintf(stderr, "Error, unable to open file: %s\n", fileName);
    exit(1);
  }

  while (!feof(fp)) {
    r = fgets(buffer, BSIZE, fp);

    if (r == NULL) {
      break;
    }

    dir = buffer[0];
    strncpy(turn, buffer + 1, BSIZE);
    turnNum = atoi(turn);


    if (dir == 'L') {
      leftRun = false;

      if (dial == 0) {
        // if dial starts a 0 on a left shift, then the while loop below will have have one incorrect addition to sum
        // (0 - any number) counts as plus one in the while loop when it was already counted in the last shift
        sum--;
      }

      dial -= turnNum;
      while (dial < DIAL_MIN) {
        leftRun = true;
        dial += 100;
        sum++;

        // covers the case where left shift goes past 0 and lands on -100(0 again), (50 - 150)
        if (dial == 0) {
          sum++;
        }
      }

      // covers the case where the while loop didnt run but dial lands on 0(50 - 50)
      if (!leftRun && dial == DIAL_MIN) {
        sum++;
      }
    } else {
      // covers right shift, a lot less complicated because the max is 99
      dial += turnNum;
      while (dial > DIAL_MAX) {
        dial -= 100;
        sum++;
      }
    }
  }

  printf("Total times passes 0: %d\n", sum);
}

// first try: 6591, incorrect 
// second try: 6507, incorrect
// Third try: 6616, correct!
