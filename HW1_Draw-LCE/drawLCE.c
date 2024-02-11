#include<stdio.h>
#include<stdlib.h>

// resolution
#define capX 30
#define capY 30
// color output
#define WHITE "/"
#define BLACK "#"

#define ROUND(a) ((int)(a+0.5))

// array 2D for display
int display[capY][capX];
// keyboard command
int input;

void drawGraphic() {
     for (int i = capX-1; i >= 0; i--) {
          for (int j = 0; j < capY; j++) {
               
               int wob = display[i][j];
               if (wob == 0){
                    printf("%s ", WHITE);
               } else if (wob == 1){
                    printf("%s ", BLACK);
               }
          }
          printf("\n");
     }
}

void setPixel(int x, int y) {
     display[y][x] = 1;
}

void drawLine() {
     // parameter x1 y1 x2 y2
     int x1, x2, y1, y2;

     printf("Please enter x1, y1, x2, y2: \n");
     scanf("%d%d%d%d", &x1, &y1, &x2, &y2);
     
     // Bresenham's Line Algorithm
     int dx = abs(x1 - x2), dy = abs(y1 - y2);

     // m = dy/dx < 1
     if (dy < dx) {
          // slopes range 0 < m < 1
          int p = 2 * dy - dx;
          int dy2 = 2 * dy;
          int dxdy2 = 2 * (dy - dx);
          int x, y, xlast;

          if (x1 > x2) {
               x = x2;
               y = y2;
               xlast = x1;
          } else {
               x = x1;
               y = y1;
               xlast = x2;
          }
          xlast--;  // interior

          setPixel(x, y);

          while (x < xlast) {
               x++;
               if (p < 0) {
                    p += dy2;
               } else {
                    y++;
                    p += dxdy2;
               }
               setPixel(x, y);
          }
     } else {
          // slopes range m > 1
          int p = 2 * dx - dy;
          int dx2 = 2 * dx;
          int dydx2 = 2 * (dx - dy);
          int x, y, ylast;

          if (y1 > y2) {
               x = x2;
               y = y2;
               ylast = y1; 
          } else {
               x = x1;
               y = y1;
               ylast = y2;
          }
          ylast--;  // interior

          setPixel(x, y);

          while (y < ylast) {
               y++;
               if (p < 0) {
                    p += dx2;
               } else {
                    x++;
                    p += dydx2;
               }
               setPixel(x, y);
          }
     }
     
}

void circlePlotPoint(int xCenter, int yCenter, int x, int y) {
     setPixel(xCenter+x, yCenter+y);
     setPixel(xCenter-x, yCenter+y);
     setPixel(xCenter+x, yCenter-y);
     setPixel(xCenter-x, yCenter-y);
     setPixel(xCenter+y, yCenter+x);
     setPixel(xCenter-y, yCenter+x);
     setPixel(xCenter+y, yCenter-x);
     setPixel(xCenter-y, yCenter-x);
     
}

void drawCircle() {
     // parameter xCenter yCenter r
     int xCenter, yCenter, r;

     printf("Please enter xCenter, yCenter, r: \n");
     scanf("%d%d%d", &xCenter, &yCenter, &r);

     // midpoint Circle Algorithm
     int x = 0;
     int y = r;
     int p = 1-r;

     circlePlotPoint(xCenter, yCenter, x, y);
     while (x < y) {
          x++;
          if (p < 0) {
               p += 2 * x + 1;                        
          } else {                              
               y--;
               p += 2 * (x - y) + 1;
          }
          circlePlotPoint(xCenter, yCenter, x, y);
     }


}

void ellipsePlotPoint(int xCenter, int yCenter, int x, int y) {
     setPixel(xCenter+x,yCenter+y);
     setPixel(xCenter-x,yCenter+y);
     setPixel(xCenter+x,yCenter-y);
     setPixel(xCenter-x,yCenter-y);
}

void drawEllipse() {
     // parameter xCenter yCenter rx ry
     int xCenter, yCenter, rx, ry;

     printf("Please enter xCenter, yCenter, rx, ry: \n");
     scanf("%d%d%d%d", &xCenter, &yCenter, &rx, &ry);

     int rx2 = rx * rx;
     int ry2 = ry * ry;
     int rx22 = 2 * rx2;
     int ry22 = 2 * ry2;
     int p;
     int x = 0;
     int y = ry;
     int px = 0;
     int py = rx22 * y;

     ellipsePlotPoint(xCenter, yCenter, x, y);

     // Region 1
     p = ROUND(ry2-(rx2*ry)+(0.25*rx2));
     while(px < py) {
          x++;
          px += ry22;
          if (p < 0) {
               p+= ry2 + px;
          } else {
               y--;
               py -= rx22;
               p += ry2 + px - py;
          }
          ellipsePlotPoint(xCenter, yCenter, x, y);
     }

     // Region 2
     p = ROUND(ry2*(x+0.5)*(x+0.5)+rx2*(y-1)*(y-1)-rx2*ry2);
     while (y > 0) {
          y--;
          py -= rx22;
          if (p > 0) {
               p += rx2 - py;
          } else {
               x++;
               px += ry22;
               p += rx2 - py + px;
          }
          ellipsePlotPoint(xCenter, yCenter, x, y);
     }

}

void clearGraphic() {
     for (int i = 0; i < capY; i++) {
          for (int j = 0; j < capX; j++) {
               display[i][j] = 0;
          }
     }
}

int main() {

     drawGraphic();
     printf("Enter 0 to 'stop' and 4 to clear.");
     printf("\nPlease select 1 for 'line', 2 for 'circle' or 3 for 'ellipse': \n");
     scanf("%d", &input);
     while (input != 0){

          if (input == 1) {
               drawLine();
          } else if (input == 2) {
               drawCircle();
          } else if (input == 3) {
               drawEllipse();
          } else if (input == 4) {
               clearGraphic();
          }

          // end of loop
          input = -1;
          drawGraphic();
          printf("Enter 0 to 'stop' and 4 to clear.");
          printf("\nPlease select 1 for 'line', 2 for 'circle' or 3 for 'ellipse': \n");
          scanf("%d", &input);
     }

     return 0;
}
