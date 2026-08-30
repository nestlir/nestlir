CXX ?= c++
CXXFLAGS ?= -std=c++17 -Wall -Wextra -Wpedantic -O2
raytracer: main.cpp
	$(CXX) $(CXXFLAGS) -o $@ $<
clean:
	rm -f raytracer image.ppm