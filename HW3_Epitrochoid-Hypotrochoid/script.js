// assign resolution
const rows = 250;
const cols = 250;
// display [y][x]
let display = [];

// define color
const color = ['white','black', 'red', 'green', 'blue', 'purple'];

// define pixel's width and height
const pWidth = '3px';
const pHeight = '3px';

// create array2D
clearGraphic();


function clearGraphic() {
     for (let i = 0; i < rows; i++) {
          display[i] = [];
          for (let j = 0; j < cols; j++) {
               display[i][j] = 0;
          }
     }
}

function drawGraphic() {
     const graphicContainer = document.getElementById('graphic-container');
    
     for (let i = rows-1; i >= 0; i--) {     // turn back Y axis

          for (let j = 0; j < cols; j++) {
               let pixel = document.createElement('div');
               pixel.classList.add('pixel');
               pixel.setAttribute('id', `pixelx${i}y${j}`);

               // add width, height
               pixel.style.width = pWidth;
               pixel.style.height = pHeight;

               // add color
               let colorCode = display[i][j];
               pixel.style.backgroundColor = color[colorCode];

               graphicContainer.appendChild(pixel);
          }

          graphicContainer.appendChild(document.createElement('br'));
     }

}

function reDrawGraphic() {
    
     for (let i = rows-1; i >= 0; i--) {     // turn back Y axis

          for (let j = 0; j < cols; j++) {
               let pixel = document.getElementById(`pixelx${i}y${j}`);

               // add color
               let colorCode = display[i][j];
               pixel.style.backgroundColor = color[colorCode];

          }
     }

}

function setPixel(x, y, colorCode) {
     parseInt(x);
     parseInt(y);
     x = Math.round(x);
     y = Math.round(y);
     // console.log(x);
     // console.log(y);
     if (x >= 0 && x < cols
          && y >= 0 && y < rows) {
               display[y][x] = colorCode;
     }
}

function setPixelWidthY(x, y, w, colorCode) {

     let wd2u;
     let wd2d;

     if (w == 1) {
          setPixel(x, y, colorCode);
     } else if (w % 2 == 0) {
          // even
          wd2u = w / 2;   // width divined by 2 up
          wd2d = wd2u-1;  // width divined by 2 down
     } else {
          // odd
          wd2u = (w - 1) / 2;   // width divined by 2
          wd2d = wd2u
     }
     // set pixel up
     let ywu = y;  // y with width
     for (let i = 0; i < wd2u; i++) {
          ywu++;
          setPixel(x, ywu, colorCode);
     }
     // set pixel down
     let ywd = y;  // y with width
     for (let j = 0; j < wd2d; j++) {
          ywd--;
          setPixel(x, ywd, colorCode);
     }
}

function setPixelWidthX(x, y, w, colorCode) {

     let wd2l;
     let wd2r;

     if (w == 1) {
          setPixel(x, y, colorCode);
     } else if (w % 2 == 0) {
          // even
          wd2l = w / 2;   // width divined by 2 left
          wd2r = wd2l-1;  // width divined by 2 right
     } else {
          // odd
          wd2l = (w - 1) / 2;   // width divined by 2
          wd2r = wd2l;
     }
     // set pixel left
     let xwl = x;  // y with width
     for (let i = 0; i < wd2l; i++) {
          xwl--;
          setPixel(xwl, y, colorCode);
     }
     // set pixel right
     let xwr = x;  // y with width
     for (let j = 0; j < wd2r; j++) {
          xwr++;
          setPixel(xwr, y, colorCode);
     }
}

function drawLine(x1, y1, x2, y2, w, colorCode, pm) {

     if (w < 1) return;  // input invalid

     // pixel mask
     let pmCnt = 0;
     if (typeof(pm) !== 'string' || pm == '') pm = '1'

     // Bresenham's Line Algorithm
     let dx = Math.abs(x1 - x2);
     let dy = Math.abs(y1 - y2);

     if (dy < dx) { // m = dy/dx < 1
          // slopes range 0 < m < 1
          // width by +y
          let p = 2 * dy - dx;
          let dy2 = 2 * dy;
          let dxdy2 = 2 * (dy - dx);
          let x, y, xlast;
          let dm = false; // down m is minus
  
          if (x1 > x2) {
               x = x2;
               y = y2;
               xlast = x1;
               if (y1 < y2) {
                    dm = true;
               }
          } else {
               x = x1;
               y = y1;
               xlast = x2;
               if (y1 > y2) {
                    dm = true;
               }
          }
          xlast--;  // interior

          // set pixel
          if (pm[pmCnt] == '1') {
               setPixel(x, y, colorCode);
               if (w > 1) setPixelWidthY(x, y, w, colorCode);
          }
          pmCnt = (pmCnt + 1) % pm.length;
          
          if (dm) { // m is minus
               while (x < xlast) {
                    x++;
                    if (p < 0) {
                         p += dy2;
                    } else {
                         y--;
                         p += dxdy2;
                    }
                    // set pixel
                    if (pm[pmCnt] == '1') {
                         setPixel(x, y, colorCode);
                         if (w > 1) setPixelWidthY(x, y, w, colorCode);
                    }
                    pmCnt = (pmCnt + 1) % pm.length;
               }
          } else {
               while (x < xlast) {
                    x++;
                    if (p < 0) {
                         p += dy2;
                    } else {
                         y++;
                         p += dxdy2;
                    }
                    // set pixel
                    if (pm[pmCnt] == '1') {
                         setPixel(x, y, colorCode);
                         if (w > 1) setPixelWidthY(x, y, w, colorCode);
                    }
                    pmCnt = (pmCnt + 1) % pm.length;
               }
          }
          
     } else {
          // slopes range m > 1
          let p = 2 * dx - dy;
          let dx2 = 2 * dx;
          let dydx2 = 2 * (dx - dy);
          let x, y, ylast;
          let dm = false;
  
          if (y1 > y2) {
               x = x2;
               y = y2;
               ylast = y1;
               if (x1 < x2) {
                    dm = true;
               }
          } else {
               x = x1;
               y = y1;
               ylast = y2;
               if (x1 > x2) {
                    dm = true;
               }
          }
          ylast--;  // interior
  
          // set pixel
          if (pm[pmCnt] == '1') {
               setPixel(x, y, colorCode);
               if (w > 1) setPixelWidthX(x, y, w, colorCode);
          }
          pmCnt = (pmCnt + 1) % pm.length;
          
          if (dm) { // m is minus
               while (y < ylast) {
                    y++;
                    if (p < 0) {
                         p += dx2;
                    } else {
                         x--;
                         p += dydx2;
                    }
                    // set pixel
                    if (pm[pmCnt] == '1') {
                         setPixel(x, y, colorCode);
                         if (w > 1) setPixelWidthX(x, y, w, colorCode);
                    }
                    pmCnt = (pmCnt + 1) % pm.length;
               }
          } else {
               while (y < ylast) {
                    y++;
                    if (p < 0) {
                         p += dx2;
                    } else {
                         x++;
                         p += dydx2;
                    }
                    // set pixel
                    if (pm[pmCnt] == '1') {
                         setPixel(x, y, colorCode);
                         if (w > 1) setPixelWidthX(x, y, w, colorCode);
                    }
                    pmCnt = (pmCnt + 1) % pm.length;
               }
          }
          
     }
     //reDrawGraphic();
}

/* PATCH FROM HW2
     - *important* fixed bug from drawLine that cause can not check m < 0
     - array color
     - set pixel's color with color code
     - adjust resolution and clear border of pixel
*/

// HW3
// Write a program to draw an epitrochoid and a hypotrochoid to show what shapes will be drawn
// for the given values:
// (a) a = 20, b = 15, k = 30 with red color and 1-pixel thick
// (b) a = 30, b = 45, k = 20 with green color and 3-pixel thick
// (c) a = 50, b = 35, k = 15 with blue color and 2-pixel thick
// (d) a = 15, b = 55, k = 35 with purple color and 3-pixel thick

// def
const xCenter = 125;
const yCenter = 125;
const t = 2 * Math.PI * 5;
const f = t / 1000;

function epitrochoid(a, b, k, w, colorCode) {
     let x, y, x1, y1, x2, y2;
     
     
     for (let i = 0; i < t; i += f) {
          let ab = a + b;
          let pi2 = 2 * Math.PI;

          x = (ab * Math.cos( pi2 * i )) - (k * Math.cos( pi2 * ab * i / b));
          y = (ab * Math.sin( pi2 * i )) - (k * Math.sin( pi2 * ab * i /b));
          x += xCenter;
          y += yCenter;
          //x = Math.round(x);
          //y = Math.round(y);

          // set Pixel 
          //setPixel(x, y, colorCode);     
          if (i == 0) {
               x1 = x;
               y1 = y;
               continue;
          }
          
          x2 = x;
          y2 = y;
          //console.log(`${x1} ${y1} ${x2} ${y2}`);
          drawLine(x1, y1, x2, y2, w, colorCode, '1');
          x1 = x2;
          y1 = y2;
          
     }
     reDrawGraphic();
      
}

function hypotrochoid(a, b, k, w, colorCode) {
     let x, y, x1, y1, x2, y2;
     
     
     for (let i = 0; i < t; i += f) {
          let ab = a - b;
          let pi2 = 2 * Math.PI;

          x = (ab * Math.cos( pi2 * i )) + (k * Math.cos( pi2 * ab * i / b));
          y = (ab * Math.sin( pi2 * i )) - (k * Math.sin( pi2 * ab * i /b));
          x += xCenter;
          y += yCenter;
          //x = Math.round(x);
          //y = Math.round(y);

          // set Pixel 
          //setPixel(x, y, colorCode);     
          if (i == 0) {
               x1 = x;
               y1 = y;
               continue;
          }
          
          x2 = x;
          y2 = y;
          //console.log(`${x1} ${y1} ${x2} ${y2}`);
          drawLine(x1, y1, x2, y2, w, colorCode, '1');
          x1 = x2;
          y1 = y2;
          
     }
     reDrawGraphic();
      
}


// main
drawGraphic();
const buttonAnswer = document.getElementsByClassName("button-answer");
buttonAnswer[0].addEventListener("click", answer1);
buttonAnswer[1].addEventListener("click", answer2);
buttonAnswer[2].addEventListener("click", answer3);
buttonAnswer[3].addEventListener("click", answer4);
buttonAnswer[4].addEventListener("click", answer5);
buttonAnswer[5].addEventListener("click", answer6);
buttonAnswer[6].addEventListener("click", answer7);
buttonAnswer[7].addEventListener("click", answer8);
function answer1() {
     epitrochoid(20, 15, 30, 1, 2);
}
function answer2() {
     hypotrochoid(20, 15, 30, 1, 2);
     
}
function answer3() {
     epitrochoid(30, 45, 20, 3, 3);
     
}
function answer4() {
     hypotrochoid(30, 45, 20, 3, 3);
     
}
function answer5() {
     epitrochoid(50, 35, 15, 2, 4);
}
function answer6() {
     hypotrochoid(50, 35, 15, 2, 4);
}
function answer7() {
     epitrochoid(15, 55, 35, 3, 5);
}
function answer8() {
     hypotrochoid(15, 55, 35, 3, 5);
}
const buttonClear = document.getElementById('button-clear');
buttonClear.addEventListener('click', clearGraphic);
buttonClear.addEventListener('click', reDrawGraphic);







