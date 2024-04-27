import matplotlib.pyplot as plt
import numpy as np
import math

def bezier_curve(cp, num_points=100):
     # bezier uses cubic (n=3, cp have 4 points)
          
     # set of u   
     uArr = np.linspace(0, 1, num_points) #[0.00, 0.01, ... , 1.00]
     
     # n
     n = len(cp)
     
     # set of points
     xcp = cp[:,0]
     ycp = cp[:,1]

     # Bezier matrix
     Mbez = np.array([[-1, 3, -3, 1],
                      [3, -6, 3, 0],
                      [-3, 3, 0, 0],
                      [1, 0, 0, 0]])
     
     # matrix curve  
     #[[x1, x2, x3, ... , xn]
     #[y1, y2, y3, ... , yn]]
     pu = np.zeros((num_points, 2))
     
     
     ui = 0;
     for u in uArr:

          # u vector: [u^3, u^2, u, 1]
          uv = np.array([ pow(u,3), pow(u,2), u, 1])

          # x(u)
          #pu[u][0] = (cp[0][0] * pow((1 - u[i]),3)) + (cp[1][0] * 3 * u[i] * pow((1-u[i]),2)) + (cp[2][0] * 3 * u[i] * u[i] * (1-u[i])) + (cp[3][0] * u[i] * u[i] * u[i])
          pu[ui][0] = np.dot(np.dot(uv, Mbez), xcp)

          # y(u)
          #pu[u][1] = (cp[0][1] * pow((1 - u[i]),3)) + (cp[1][1] * 3 * u[i] * pow((1-u[i]),2)) + (cp[2][1] * 3 * u[i] * u[i] * (1-u[i])) + (cp[3][1] * u[i] * u[i] * u[i])
          pu[ui][1] = np.dot(np.dot(uv, Mbez), ycp)
          
          ui += 1

     plt.plot(pu[:, 0], pu[:, 1], color='blue')
     plt.scatter(cp[:, 0], cp[:, 1], color='red')
     
     return cp

def bezier_curve_nextCurve(cp, bcp, num_points=100):
     # bezier uses cubic (n=3, cp have 4 points)

     # set of u    
     uArr = np.linspace(0, 1, num_points) #[0.00, 0.01, ... , 1.00]
     
     # n
     n = len(cp)
     
     # set of points
     xcp = cp[:,0]
     ycp = cp[:,1]

     # find next spine with match curve tangents by
     # p1' = pn + n/n' * (pn - pn-1)
     # p1' = p3 + (p3 - p2)
     xbp3 = bcp[3][0]
     ybp3 = bcp[3][1]
     xbp2 = bcp[2][0]
     ybp2 = bcp[2][1]
     xcp1 = xbp3 + ( xbp3 - xbp2 )
     ycp1 = ybp3 + ( ybp3 - ybp2 )
     xcp[1] = xcp1
     ycp[1] = ycp1
     cp[1][0] = xcp1
     cp[1][1] = ycp1

     # set start point of next curve
     xcp[0] = xbp3
     ycp[0] = ybp3
     cp[0][0] = xbp3
     cp[0][1] = ybp3

     # Bezier matrix
     Mbez = np.array([[-1, 3, -3, 1],
                      [3, -6, 3, 0],
                      [-3, 3, 0, 0],
                      [1, 0, 0, 0]])
     
     # matrix curve  
     #[[x1, x2, x3, ... , xn]
     #[y1, y2, y3, ... , yn]]
     pu = np.zeros((num_points, 2))

     ui = 0;
     for u in uArr:

          # u vector: [u^3, u^2, u, 1]
          uv = np.array([ pow(u,3), pow(u,2), u, 1])

          # x(u)
          #pu[u][0] = (cp[0][0] * pow((1 - u[i]),3)) + (cp[1][0] * 3 * u[i] * pow((1-u[i]),2)) + (cp[2][0] * 3 * u[i] * u[i] * (1-u[i])) + (cp[3][0] * u[i] * u[i] * u[i])
          pu[ui][0] = np.dot(np.dot(uv, Mbez), xcp)

          # y(u)
          #pu[u][1] = (cp[0][1] * pow((1 - u[i]),3)) + (cp[1][1] * 3 * u[i] * pow((1-u[i]),2)) + (cp[2][1] * 3 * u[i] * u[i] * (1-u[i])) + (cp[3][1] * u[i] * u[i] * u[i])
          pu[ui][1] = np.dot(np.dot(uv, Mbez), ycp)
          
          ui += 1

     plt.plot(pu[:, 0], pu[:, 1], color='blue')
     plt.scatter(cp[:, 0], cp[:, 1], color='red')
     
     return cp

def B_curve(cp, num_points=100):
     # uniform quadratic B-spines (degree 2, n=3, d=3, have 4 control points)
          
     # n = 3, d = 3

     # set of u (n+d+1 = 3+3+1 = 7)
     # khots = [0, 1, 2, 3, 4, 5, 6]
     
     # set of points
     xcp = cp[:,0]
     ycp = cp[:,1]
   
     # matrix curve  
     #[[x1, x2, x3, ... , xn]
     #[y1, y2, y3, ... , yn]]

     # plot result in only interval from 2 to 4
     pu = np.zeros((num_points, 2))
     uArr = np.linspace(2, 4, num_points)
     ui = 0
     for u in uArr:
          B03 = 0
          B13 = 0
          B23 = 0
          B33 = 0
          if ( 0 <= u and u < 1 ) :
               B03 = u * u / 2
          elif ( 1 <= u and u < 2 ) :
               B03 = (u * (2-u) / 2) + ((u-1) * (3-u) / 2)
               B13 = (u-1) * (u-1) / 2
          elif ( 2 <= u and u < 3 ) :
               B03 = (3-u) * (3-u) / 2
               B13 = ((u-1) * (3-u) / 2) + ((u-2) * (4-u) / 2)
               B23 = (u-2) * (u-2) / 2
          elif ( 3 <= u and u < 4 ) :
               B13 = (4-u) * (4-u) / 2
               B23 = ((u-2) * (4-u) / 2) + ((u-3) * (5-u) / 2)
               B33 = (u-3) * (u-3) / 2
          elif ( 4 <= u and u < 5 )  :
               B23 = (5-u) * (5-u) / 2
               B33 = ((u-3) * (5-u) / 2) + ((u-4) * (6-u) / 2)
          elif ( 5 <= u and u < 6) :
               B33 = (6-u) * (6-u) / 2
          # x[u]
          pu[ui][0] = (xcp[0] * B03) + (xcp[1] * B13) + (xcp[2] * B23) + (xcp[3] * B33)
          # y[u] 
          pu[ui][1] = (ycp[0] * B03) + (ycp[1] * B13) + (ycp[2] * B23) + (ycp[3] * B33)

          ui += 1

     plt.plot(pu[:, 0], pu[:, 1], color='magenta')
     plt.scatter(cp[:, 0], cp[:, 1], color='orange')
     


# c = curve
# Control points for the Bezier curve

# jar
c1 = np.array([[2, 110], [23, 130], [35, 110], [48, 106]])
# find second spine with match curve tangents by
# p1' = pn + n/n' * (pn - pn-1)
# p1' = p3 + (p3 - p1)
# example
# x1' = 48 + (48 - 35) = 61
# y2' = 86 + (86 - 90) = 82
c2 = np.array([[48, 106], [0, 0], [70, 108], [78, 101]]) # use bezier_curve_nextCurve() to calculate p1 automated
c3 = np.array([[78, 101], [69, 83], [68, 74], [85, 61]])
c4 = np.array([[0, 0], [0, 0], [90, 22], [68, 10]])
c5 = np.array([[24, 10], [40, 5], [55, 6], [68, 10]])
c6 = np.array([[2, 110], [25, 105], [28, 92], [10, 65]])
c7 = np.array([[0, 0], [0, 0], [-3, 23], [24, 10]])

# water
c8 = np.array([[46, 82], [135, 75], [-49, 75], [46, 82]])
c9 = np.array([[46, 6], [118, 15], [-23, 15], [46, 6]])

# handle
c10 = np.array([[72, 82], [109, 113], [123, 59], [90, 32]])
c11 = np.array([[75, 72], [99, 97], [113, 69], [93, 48]])

# Control points for the B-spine curve

# jar
cb1 = np.array([[-12, 92], [15, 125], [40, 109], [60, 100]])
cb2 = np.array([[35, 110], [61, 100], [70, 108], [90, 95]])
cb3 = np.array([[92, 128], [68, 75], [78, 63], [90, 60]])
cb4 = np.array([[73, 68], [95, 55], [90, 22], [43, -2]])
cb5 = np.array([[16, 14], [40, 5], [55, 6], [77, 14]])
cb6 = np.array([[-20, 114], [23, 103], [23, 87], [-3, 45]])
cb7 = np.array([[25, 87], [-3, 48], [0, 23], [55, -4]])

# water
cb8 = np.array([[-8, 82], [100, 75], [-14, 75], [110, 82]])
cb9 = np.array([[-5, -5], [98, 15], [-3, 15], [97, -5]])

# handle
cb10 = np.array([[45, 55], [99, 103], [113, 59], [71, 12]])
cb11 = np.array([[51, 54], [94, 87], [108, 69], [78, 28]])

# Generate the Bezier curve
# jar
cp1 = bezier_curve(c1)
cp2 = bezier_curve_nextCurve(c2, c1)
cp3 = bezier_curve(c3)
cp4 = bezier_curve_nextCurve(c4, c3)
cp5 = bezier_curve(c5)
cp6 = bezier_curve(c6)
cp7 = bezier_curve_nextCurve(c7, c6)

# water
cp8 = bezier_curve(c8)
cp9 = bezier_curve(c9)

# handle
cp10 = bezier_curve(c10)
cp11 = bezier_curve(c11)

# Generate the B-spine curve

# jar
B_curve(cb1)
B_curve(cb2)
B_curve(cb3)
B_curve(cb4)
B_curve(cb5)
B_curve(cb6)
B_curve(cb7)

# water
B_curve(cb8)
B_curve(cb9)

# handle
B_curve(cb10)
B_curve(cb11)

# Plotting the Bezier curve and control points
plt.title('pitcher')
plt.plot([], [], label='Bezier Curve', color='blue')
plt.scatter([], [], label='Control Points', color='red')
plt.plot([], [], label='B-Spine Curve', color='magenta')
plt.scatter([], [], label='Control Points', color='orange')
plt.xlabel('X')
plt.ylabel('Y')
plt.legend()
plt.grid(True)
plt.axis('equal')
plt.show()



