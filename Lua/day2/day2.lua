-- Given lines of ints
-- Find out how many of the lines are safe.
-- A line is safe if the ints are increasing or decreasing by increments of 1-3.
-- A line is not safe if it does both increasing and decreasing or increments more than 3 or less than 1(0)

-- func def
local function strToTable(s)
  -- input: string (s) of numbers separated by one space each.
  -- output: a table (t) consisting of ints from the input string.

  local t = {}
  local num = ""

  for c in s:gmatch(".") do
    if c == " " then
      table.insert(t, tonumber(num))
      num = ""
    else
      num = num .. c
    end
  end
  table.insert(t, tonumber(num))
  return t
end

--[[

main

]]

local file = io.open("day2.txt", "r")

if file == nil then
  print("Can not open file")
  return
end

-- vars
local count = 0
local diff
local report = {}
local case
local i

-- loop over each line in file to find the 'safe' reports
for line in file:lines("l") do

  -- turn line into table
  report = strToTable(line)
  diff = report[1] - report[2]

  -- reset case for checking while loops
  case = true

  -- check if decreasing 
  if diff > 0 then
  -- loop over each int in line 
    i = 1
    while i < #report do
      diff = report[i] - report[i + 1]
      if diff > 0 and diff <= 3 and diff ~= 0 then
        i = i + 1
      else
        case = false
        break
      end
    end
    if case == true then
      count = count + 1
    end
  end

  -- check if increasing 
  if diff < 0 then
  -- loop over each int in line 
    i = 1
    while i < #report do
      diff = report[i] - report[i + 1]
      if diff < 0 and diff >= -3 and diff ~= 0 then
        i = i + 1
      else
        case = false
        break
      end
    end
    if case == true then
      count = count + 1
    end
  end
end


print(count .. "end")

file:close()
