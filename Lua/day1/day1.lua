-- input: 2 lists of IDs
-- find the smallest numbers in order and compare the difference between the two numbers.
-- add the defference of each number in the list to get the output.
-- output for test should be 11

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
local file = io.open("day1.txt", "r")

if file == nil then
  print("unable to open file")
  return
end

-- load each list into a table
local list1 = {}
local list2 = {}
local num1
local num2
local diff = 0
local total = 0

for line in file:lines("l") do
  num1, num2 = cutStr(line)
  table.insert(list1, num1)
  table.insert(list2, num2)
end

-- order each table
table.sort(list1)
table.sort(list2)

for i in pairs(list1) do
  if list1[i] < list2[i] then
    diff = list2[i] - list1[i]
  else
    diff = list1[i] - list2[i]
  end
  total = total + diff
end

print(total)

-- compare each element difference

file:close()

