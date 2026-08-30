#include <array>
#include <cstdint>
#include <iomanip>
#include <iostream>

struct Chip8 {
    std::array<uint8_t,4096> memory{};
    std::array<uint8_t,16> v{};
    std::array<uint16_t,16> stack{};
    uint16_t pc=0x200, I=0;
    uint8_t sp=0, delay=0, sound=0;

    void step() {
        uint16_t op=(memory[pc]<<8)|memory[pc+1];
        pc+=2;
        uint8_t x=(op>>8)&0xF, kk=op&0xFF;
        switch(op&0xF000) {
            case 0x1000: pc=op&0x0FFF; break;
            case 0x6000: v[x]=kk; break;
            case 0x7000: v[x]=static_cast<uint8_t>(v[x]+kk); break;
            default: std::cerr<<"unimplemented opcode 0x"<<std::hex<<op<<"\n";
        }
    }
};

int main(){
    Chip8 vm;
    vm.memory[0x200]=0x60; vm.memory[0x201]=0x0A;
    vm.memory[0x202]=0x70; vm.memory[0x203]=0x05;
    vm.step(); vm.step();
    std::cout<<"V0="<<std::dec<<(int)vm.v[0]<<"\n";
}