CXX ?= c++
CXXFLAGS ?= -std=c++17 -Wall -Wextra -Wpedantic -O2
chip8: main.cpp
	$(CXX) $(CXXFLAGS) -o $@ $<
clean:
	rm -f chip8