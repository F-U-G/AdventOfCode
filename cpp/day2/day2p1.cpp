#include <iostream>
#include <fstream>
#include <vector>

std::vector<int> new_report(std::ifstream& file) {
  std::vector<int> report; 
  int tmp;
  char c = ' ';
  //while peek is 'space', newline or eof will break loop
  while (c == ' ') {
    //load int into array
    file >> tmp;
    report.insert(report.end(), tmp);
  
    //load next peek
    c = file.peek();
  }
  return report;
}

int main() {
  //open file
  std::ifstream file("day2.txt");

  if (!file) {
    std::cerr << "could not open file\n";
    return 1;
  }

  //count safe reports
  int count = 0;

  int repcount = 0;
  //iterate over file, to generate reports
  while (true) {

    //load a report
    std::vector<int> report = new_report(file);

    //check if end of file
    if (file.eof()) {
      break;
    }

    int diff = report[0] - report[1];
    bool safe = true;

    //check if less than 0(decreasing) or more than 0(increasing), equal to 0 skip
    if (diff < 0) {
      for (int i = 1; i < report.size(); i++) {
        diff = report[i - 1] - report[i];

        if (!(diff >= -3 && diff < 0)) {
          safe = false;
          break;
        }
      }
      
      if (safe) {
        count++;
      }
    }
    else if (diff > 0) {
      for (int i = 1; i < report.size(); i++) {
        diff = report[i - 1] - report[i];

        if (!(diff <= 3 && diff > 0)) {
          safe = false;
          break;
        }
      }
      
      if (safe) {
        count++;
      }
    }
  }

  std::cout << "The amount of safe reports is: " << count << '\n';

  file.close();
  return 0;
}
