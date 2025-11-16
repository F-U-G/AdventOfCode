# Day 4 Part 1

Find the amount of times 'XMAS' shows up in the input.

The word can be in any direction, up down left right and 4 diagonals.

## The Idea

For left and right(XMAS, SAMX), we can just use regex through the whole input.

The rest are a little harder. I plan to load 4 lines of text at a time into arrays. Iterating over the whole file means moving our 4 lines down one line.

All Im gonna do is just check the top line. The function will take options(not sure how this works yet) that tell the function to check for the first letter
'X' or the last letter 'S'. If it finds the right letter then it checks for the next letter on the next line, if its up/down then it would check the same index,
if its diagonal then it would check index + 1. It should have error checking for if it checks past the last index and if it reaches the last line. Also one last 
thing is i will reverse the whole file(or just the lines) so that we dont have to change the function to check down left or up right diagonals. 

Thats a lot so Im gonna break it down into smaller functions:

- [x] string reverse funciton
- [ ] function that takes 4 strings(the lines) and checks them
    - [ ] takes options to check up, down, down right diag, and up left diag.
- [ ] the main function
    - [x] load the file into a string
    - [x] manage a total var
    - [x] check the regex for left and right cases
    - [ ] run the above functions on the whole file

That should be it... I think.


