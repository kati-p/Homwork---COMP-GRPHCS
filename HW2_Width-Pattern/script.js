// assign resolution
const rows = 20;
const cols = 20;
// display [y][x]
let display = [];

// define color
const color0 = 'white';
const color1 = 'black';
// define pixel's width and height
const pWidth = '20px';
const pHeight = '20px';

// create array2D
clearGraphic();

const buttonD = document.getElementById('button-draw');
buttonD.addEventListener('click', drawLine);
const buttonR = document.getElementById('button-reset');
buttonR.addEventListener('click', clearGraphic);
buttonR.addEventListener('click', reDrawGraphic);

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
               if (display[i][j] == 1) {
                    pixel.style.backgroundColor = color1;
               } else if (display[i][j] == 0) {
                    pixel.style.backgroundColor = color0;
               } else {
                    pixel.style.backgroundColor = "white";
               }

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
               if (display[i][j] == 1) {
                    pixel.style.backgroundColor = color1;
               } else if (display[i][j] == 0) {
                    pixel.style.backgroundColor = color0;
               } else {
                    pixel.style.backgroundColor = "white";
               }


          }
     }

}

function setPixel(x, y) {
     parseInt(x);
     parseInt(y);
     if (x >= 0 && x < cols
          && y >= 0 && y < rows) {
               display[y][x] = 1;
     }
}

function setPixelWidthY(x, y, w) {

     let wd2u;
     let wd2d;

     if (w == 1) {
          setPixel(x, y);
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
          setPixel(x, ywu);
     }
     // set pixel down
     let ywd = y;  // y with width
     for (let j = 0; j < wd2d; j++) {
          ywd--;
          setPixel(x, ywd);
     }
}

function setPixelWidthX(x, y, w) {

     let wd2l;
     let wd2r;

     if (w == 1) {
          setPixel(x, y);
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
          setPixel(xwl, y);
     }
     // set pixel right
     let xwr = x;  // y with width
     for (let j = 0; j < wd2r; j++) {
          xwr++;
          setPixel(xwr, y);
     }
}

function drawLine() {
     // input
     const x1Elm = document.getElementById('input-x1');
     const y1Elm = document.getElementById('input-y1');
     const x2Elm = document.getElementById('input-x2');
     const y2Elm = document.getElementById('input-y2');
     const wElm = document.getElementById('input-width');
     const pmElm = document.getElementById('input-pMask');

     // x y
     let x1 = parseInt(x1Elm.value);
     let x2 = parseInt(x2Elm.value);
     let y1 = parseInt(y1Elm.value);
     let y2 = parseInt(y2Elm.value);

     // width
     let w = parseInt(wElm.value);
     if (w < 1) return;  // input invalid

     // pixel mask
     let pm = String(pmElm.value);
     let pmCnt = 0;
     if (pm == '') pm = '1'

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

          // set pixel
          if (pm[pmCnt] == '1') {
               setPixel(x, y);
               if (w > 1) setPixelWidthY(x, y, w);
          }
          pmCnt = (pmCnt + 1) % pm.length;
          
  
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
                    setPixel(x, y);
                    if (w > 1) setPixelWidthY(x, y, w);
               }
               pmCnt = (pmCnt + 1) % pm.length;
          }
     } else {
          // slopes range m > 1
          let p = 2 * dx - dy;
          let dx2 = 2 * dx;
          let dydx2 = 2 * (dx - dy);
          let x, y, ylast;
  
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
  
          // set pixel
          if (pm[pmCnt] == '1') {
               setPixel(x, y);
               if (w > 1) setPixelWidthX(x, y, w);
          }
          pmCnt = (pmCnt + 1) % pm.length;
  
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
                    setPixel(x, y);
                    if (w > 1) setPixelWidthX(x, y, w);
               }
               pmCnt = (pmCnt + 1) % pm.length;
          }
     }
     reDrawGraphic();
}

// main
drawGraphic();