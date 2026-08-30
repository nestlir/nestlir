#include <cmath>
#include <fstream>
#include <iostream>

struct V { double x,y,z; };
static V sub(V a,V b){return {a.x-b.x,a.y-b.y,a.z-b.z};}
static double dot(V a,V b){return a.x*b.x+a.y*b.y+a.z*b.z;}
int main(){
    const int W=320,H=200; std::ofstream out("image.ppm");
    out<<"P3\n"<<W<<" "<<H<<"\n255\n";
    V c{0,0,-3}; double r=1;
    for(int y=0;y<H;y++) for(int x=0;x<W;x++){
        double px=(2.0*x/W-1.0)*1.6, py=(1.0-2.0*y/H);
        V d{px,py,-1}; double a=dot(d,d), b=2*dot(d,sub({0,0,0},c)), cc=dot(sub({0,0,0},c),sub({0,0,0},c))-r*r;
        double disc=b*b-4*a*cc;
        if(disc<0) out<<"30 30 45\n";
        else { double t=(-b-std::sqrt(disc))/(2*a); V p{d.x*t,d.y*t,d.z*t}; V n=sub(p,c); double l=std::max(0.0,n.z/r); int q=(int)(255*l); out<<q<<" "<<q<<" "<<q<<"\n"; }
    }
    std::cout<<"wrote image.ppm\n";
}