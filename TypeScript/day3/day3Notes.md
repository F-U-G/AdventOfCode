## Day 3 Part 1

Refer to website for problem.

### What Needs to Happen

- Load input from txt file into a string
    - file i/o(using fetch to get the .txt file from the server, make sure to use the entire path from the root of the project)
- Regex, make a pattern that matches "mul(*,*)" where "*" is any 1 to 3 digit number
    - Flags:
        - g (match all, not just one)
- find the right function to match the pattern and return each occurance of the mul pattern.
    - it was .match(regexPattern), use that on a string object
- multiply the numbers and add them to a *total*
    - Use map, the match function returns an array(?, console says its and object, docs say an array)
    - iterate over the string, extract two numbers convert to int and multiply, add to total

## Part 2

Again refer to website.

### Tasks

- import our function from the first part(mul)
- Now we have to search for 3 regex patterns, we want to keep the order intact
- Get an array of do(), don't(), and mul(*,*)
- iterate over array, when do is reached, enable a bool to true, if a dont is reached then disable it
- when the bool is true calc the mul() that come up in the iterator. dont calc them if the bool is false
- Use mul function from part one to calc the mul strings and add to a total
