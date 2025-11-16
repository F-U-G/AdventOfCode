// take every mul(num,num) and multipy the nums, add all of the values to get the output
#include <iostream>
#include <fstream>
#include <string>

//load memory class
/*
   helps manage memory
   - func to help load a mul into a private var
*/
class memory {
  public:
    memory(std::ifstream& file) {
      total = 0;
      mem = "";
      std::string s;

      while(!file.eof()) {
        file >> s;
        mem += s;
        s = "";
      }
    }
    std::string& corrupted_mem() {
      return mem;
    }
    int memory_len() {
      return mem.length();
    }
    void restore_memory(int& i);
    char& operator[](int i) {
      return mem[i];
    }
  private:
    int total;
    std::string mem;
};

int main() {
  //load file
  std::ifstream file("test.txt");

  memory mem(file);

  std::cout << mem.memory_len() << '\n';
  // load file contents into some sort of object(string maybe?)

  // iterate over string
  for (int i = 0; i < mem.memory_len(); i++) {
    // find mul(x, y) pattern somehow
    if (mem[i] == 'm') {
      mem.restore_memory(i);
    }
    // load that mul into a value
  }

  //add them all together, maybe ill have to iterate again

  //print output, all muls multiplyed then added together

  /*
  notes:
 

  maybe use ignore function from string for the file,

  find a way to pull out chars from the string
  */
}

void memory::restore_memory(int& i) {
  // check if mul(x,y) is valid

  //extract numbers

  // multipy, then add numbers to total
  return;
}
