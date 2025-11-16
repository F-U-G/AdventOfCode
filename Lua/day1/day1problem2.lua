-- using the same list as an input, find the similarity score.
-- Using each number in the left list: take the first number and multipy it by the amount of times it 
-- appears in the right list.
-- if the first number is 3 and 3 appears 3 times in the right list then it would be 3 * 3.
-- add all of these up for each number in the left list and you get the similarity score.


-- function def
local function cutStr(s)
  -- input string 's' that has 2 numbers seperated by 3 spaces
  -- output: 2 ints, 'num1' and 'num2'
  local num1 = ""
  local num2 = ""
  local switch = false
  -- loop over string, when space is found switch to other output.
  for c in s:gmatch"." do
    if c == " " then
      switch = true
      goto continue
    end
    if switch == false then
      num1 = num1 .. c
    else
      num2 = num2 .. c
    end
    ::continue::
  end
  return tonumber(num1), tonumber(num2)
end

--[[

main

]]

-- open file
local file = io.open("day1.txt")

if file == nil then
  print("unable to open file")
  return
end

-- load each list into a table
local list1 = {}
local list2 = {}
local num1
local num2
local count
local similary = 0
local total = 0

for line in file:lines("l") do
  num1, num2 = cutStr(line)
  table.insert(list1, num1)
  table.insert(list2, num2)
end

-- loop over left list(list1) for each element
for i in pairs(list1) do
  count = 0
  -- loop over right list(list2) and count each element in list 2 that equals list 1
  for j in pairs(list2) do
    if list1[i] == list2[j] then
      count = count + 1
    end
  end
  -- cal the similary of the lists
  similary = list1[i] * count
  total = total + similary
end

print(total)
file:close()
