-- Given lines of ints
-- Find out how many of the lines are safe.
-- A line is safe if the ints are increasing or decreasing by increments of 1-3.
-- A line is not safe if it does both increasing and decreasing or increments more than 3 or less than 1(0)

--problem 2 change: check if one number in the report can be removed to make the report safe

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

local file = io.open("day2test.txt", "r")

if file == nil then
  print("Can not open file")
  return
end

-- vars
local report = {}
local diff
-- skip is special, 0 is no skips have happend, 1 is skip has happend and next loop should skip the number, 2 means there has already been a skip 
local skip
local case
local count = 0

-- loop over each line in file to find the 'safe' reports
for line in file:lines("l") do

  -- turn line into table
  report = strToTable(line)
  diff = report[1] - report[2]

  -- reset 
  case = true
  skip = 0

  if diff == 0 then
    diff = report[2] - report[3]
  end

  -- decreasing
  if diff > 0 then
    for i in #report do
      if i == 1 then
        goto next
      end
      if skip == 0 or skip == 2 then
        diff = report[i - 1] - report[i]
      elseif skip == 1 then
        diff = report[i - 2] - report[i]
        skip = 2
      end

      -- check case
      if not (diff > 0 and diff <= 3 and diff ~= 0) then
        if skip ~= 2 then
          skip = 1
        else
          case = false
          break
        end
      end
      ::next::
    end

    -- check if loop completed properly
    if case == true then
      count = count + 1
    end

  -- increasing
  elseif diff < 0 then
    for i in #report do
      if i == 1 then
        goto next
      if skip == 0 or skip == 2 then
        diff = report[i - 1] - report[i]
      elseif skip == 1 then
        diff = report[i - 2] - report[i]
        skip = 2
      end

      if not (diff < 0 and diff >= -3 and diff ~= 0) then
        if skip ~= 2 then
          skip = 1
        else
          case = false
          break
        end
      end
      ::next::
    end

    -- check loop
    if case == true then
      count = count + 1
    end
  end
end
end
