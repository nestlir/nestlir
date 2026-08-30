#include <array>
#include <cstdint>
#include <fstream>
#include <iostream>
struct Chip8{std::array<uint8_t,4096> m{},v{};std::array<uint16_t,16> stack{};std::array<uint8_t,64*32> screen{};uint16_t pc=0x200,I=0;uint8_t sp=0,delay=0,sound=0;
bool load(const char*file){std::ifstream f(file,std::ios::binary);if(!f)return false;f.read((char*)&m[0x200],4096-0x200);return true;}
void step(){uint16_t op=(m[pc]<<8)|m[pc+1];pc+=2;uint8_t x=(op>>8)&15,y=(op>>4)&15,n=op&15,kk=op&255;switch(op&0xF000){case 0x0000:if(op==0x00E0)screen.fill(0);else if(op==0x00EE)pc=stack[--sp];break;case 0x1000:pc=op&0xFFF;break;case 0x2000:stack[sp++]=pc;pc=op&0xFFF;break;case 0x3000:if(v[x]==kk)pc+=2;break;case 0x6000:v[x]=kk;break;case 0x7000:v[x]+=kk;break;case 0x8000:if(n==0)v[x]=v[y];else if(n==4){unsigned s=v[x]+v[y];v[15]=s>255;v[x]=s;}break;case 0xA000:I=op&0xFFF;break;case 0xD000:{v[15]=0;for(int row=0;row<n;row++){uint8_t bits=m[I+row];for(int col=0;col<8;col++)if(bits&(0x80>>col)){int q=((v[x]+col)%64)+((v[y]+row)%32)*64;v[15]|=screen[q];screen[q]^=1;}}break;}}}};
int main(int argc,char**argv){Chip8 vm;if(argc>1){if(!vm.load(argv[1]))return 1;for(int i=0;i<5000;i++)vm.step();std::cout<<"ROM executed\n";}else{vm.m[0x200]=0x60;vm.m[0x201]=10;vm.m[0x202]=0x70;vm.m[0x203]=5;vm.step();vm.step();std::cout<<"V0="<<(int)vm.v[0]<<"\n";}}