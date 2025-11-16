#include <iostream>
#include <fstream>
#include <vector>

//report class
class report {
  public:
    // create report, takes info from file and loads into report_list
    report(std::ifstream& file) {
      int tmp;
      char c = ' ';
      //while peek is 'space', newline or eof will break loop
      while (c == ' ') {
        //load int into array
        file >> tmp;
        report_list.insert(report_list.end(), tmp);

        //load next peek
        c = file.peek();
      }
      dampen = true;
    }
    //checks if the pair in report within safe bounds
    bool is_safe(int& diff) {
      //inc
      if (type) {
        return (diff >= -3 && diff < 0);
      }
      //dec
      else {
        return (diff <= 3 && diff > 0);
      }
    }

    bool run_report() {
      for (int i = 1; i < report_list.size(); i++) {
        int diff = report_list[i - 1] - report_list[i];
        //check if the pair in the report is safe
        if (!is_safe(diff)) {
          if(dampen) {
            if (i + 1 == report_list.size()) {
              report_list.erase(report_list.begin() + i);
              dampen = false;
              return run_report();
            }
            diff = report_list[i - 1] - report_list[i + 1];

            if (is_safe(diff)) {
              report_list.erase(report_list.begin() + i);
              dampen = false;
              return run_report();
            }
            else {
              report_list.erase(report_list.begin() + i - 1);
              dampen = false;
              return run_report();
            }
          }
          else {
            return false;
          }
        }
      }
      return true;
    }
    
    //return true to skip this report, false keeps while loop going and sets type to increasing or decreasing
    bool check_type() {
      int diff[6];
      //check first diff
      diff[0] = report_list[0] - report_list[1];
      diff[1] = report_list[0] - report_list[2];
      diff[2] = report_list[0] - report_list[3];
      diff[3] = report_list[1] - report_list[2];
      diff[4] = report_list[1] - report_list[3];
      diff[5] = report_list[2] - report_list[3];

      //if diff == 0 for 1st and 2nd element then skip this report
      if (diff[0] == 0 && diff[1] == 0) {
        return true;
      }

      int count = 0;
      //loop over diff array(6 being the len of diff)
      for (int i = 0; i < 6; i++) {
        if (diff[i] < 0) {
          count++;
        }
        else if (diff[i] > 0) {
          count--;
        }
      }
      
      //if count is bigger than 0 then it is increasing, if less then decreasing
      if (count > 0) {
        type = true;
      }
      else if (count < 0) {
        type = false;
      }
      return false;
    }



  private:
    std::vector<int> report_list;
    // if type is true then the report is increasing, false means decreasing
    bool type;
    // if dampen is true then it has not be used and can be used to skip a number in a report
    bool dampen;
};


int main() {
  //open file
  std::ifstream file("day2.txt");

  int count = 0;
  bool type = true;

  //iterate over file reports
  while (true) {
    //create report
    report file_report(file); 

    if (file.eof()) {
      break;
    }

    //skip this report if needed
    if (file_report.check_type()) {
      continue;
    }

    
    //run report to see if it is safe, if true then add to count
    if(file_report.run_report()) {
      count++;
    }
  }

  std::cout << "The amount of safe reports is: " << count << '\n';
  return 0;
}
