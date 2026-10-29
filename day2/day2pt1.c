#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BSIZE 512

/*
   Day 2, Part 1

   Input:
   A one line file that is full of ID ranges.
   ID range example 12345-12350, this range of IDs is all numbers between the
   two numbers with a '-' between them. Each range is seperated by a ','.

   Problem:
   Find all invalid IDs, an invalid ID is a number with two of the same number within it.
   Example, 123123 would be invalid since it has '123' twice, 11, 11881188, 565565 would all be invalid.

   Solution:
   The sum of all invalid IDs.
*/

// use integer division to find the number of digits of the given integer n.
int getNumDigits(long n);

int main(void) {
  // file variables
  char *r;
  FILE *fp;
  char buffer[BSIZE];
  char fileName[] = "input.txt";

  // logic variables
  size_t size = 32;
  size_t len = 0;
  char c = '0';
  char *idRangeMin = (char *)malloc(size);
  char *idRangeMax = (char *)malloc(size);
  bool isMax = false;
  const char delim = ',';
  long num1;
  long num2;
  int num1stHalf;
  int num2ndHalf;
  int digits;
  int digitDivider;
  long sum = 0;

  // file error check
  fp = fopen(fileName, "r");
  if (fp == NULL) {
    fprintf(stderr, "Error, file %s not found\n", fileName);
    exit(1);
  }

  // main while loop, loop until the end of the line
  while (c != '\n') {
    len = 0;
    isMax = false;

    while ((c = fgetc(fp)) != delim && c != '\n') {

      if (c == '-') {
        idRangeMin[len] = '\0';
        isMax = true;
        len = 0;
      } else {

        if (isMax) {
          idRangeMax[len++] = c;
        } else {
          idRangeMin[len++] = c;
        }
      }
    }

    if (c != '\n') {
      idRangeMax[len] = '\0';

      // printf("Min: %s, Max: %s\n", idRangeMin, idRangeMax);
      num1 = atol(idRangeMin);
      num2 = atol(idRangeMax);
      printf("Min: %ld, Max: %ld\n", num1, num2);

      for (; num1 <= num2; num1++) {
        digits = getNumDigits(num1);

        // only run if number of digits is even, we only consider cases where
        // the number is the same number twice example: 11 is 1 twice, 124124 is
        // 124 twice, no odd number of digits can be a number twice.
        if (digits % 2 == 0) {
          digitDivider = 1;
          for (int i = 0; i < (digits / 2); i++) {
            digitDivider *= 10;
          }

          num1stHalf = num1 / digitDivider; // integer division to get the left half
          num2ndHalf = num1 % digitDivider; // mod to get the right side

          if (num1stHalf == num2ndHalf) {
            sum += num1;
          }
        }
      }
    }
  }

  printf("Total sum of all invalid ID's: %ld\n", sum);

  free(idRangeMin);
  free(idRangeMax);
  idRangeMin = NULL;
  idRangeMax = NULL;

  return 0;
}

int getNumDigits(long n) {
  int count = 0;

  if (n == 0) {
    return 1;
  }

  while (n != 0) {
    count++;
    n /= 10; // remove rightmost digit
  }
  return count;
}

// First answer: 21117820591, incorrect
// Second answer: 21139439274, incorrect
// Third answer: 21139440284, correct!
