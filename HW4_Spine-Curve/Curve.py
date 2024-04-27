import numpy as np
import matplotlib.pyplot as plt
import math

# Bezier-Spline Curve

def Bez(k, n, u):
   return math.comb(n,k) * pow(u, k) * pow((1-u), n-k)

def Bezier_Curve(cp, num_points = 100):
   
   n = len(cp) - 1

   cpx = cp[:, 0]
   cpy = cp[:, 1]

   x = []
   y = []

   plotting = np.linspace(0, 1, num_points)
   for u in plotting :
         px = sum(cpx[k] * Bez(k, n, u) for k in range(n+1))
         x.append(px)
         py = sum(cpy[k] * Bez(k, n, u) for k in range(n+1))
         y.append(py)
   plt.plot(x, y, color='blue')

# B-Spline Curve
def B(u, d, k, knots):
   if d == 1:
      return 1.0 if (knots[k] <= u < knots[k+1]) else 0.0
   if knots[k+d-1] == knots[k]:
      c1 = 0.0
   else:
      c1 = (u - knots[k])/(knots[k+d-1] - knots[k]) * B(u, d-1, k, knots)
   if knots[k+d] == knots[k+1]:
      c2 = 0.0
   else:
      c2 = (knots[k+d] - u)/(knots[k+d] - knots[k+1]) * B(u, d-1, k+1, knots)
   return c1 + c2

def bspline(u, knots, cp, d):
   n = len(cp)
   assert (2 <= d) and (d <= n + 1)
   return sum(cp[k] * B(u, d, k, knots) for k in range(n))

def B_Curve_Uniform(cp, degreePoly, num_points = 1000):
     
     # degree of polynomial = d-1
     d = degreePoly + 1

     n = len(cp)
     cpx = cp[:, 0]
     cpy = cp[:, 1]

     # knots
     knots = [x for x in range(0, n+d+1)]

     x = []
     y = []

     # resulting B-spline curve is defined only in the interval from knot value
     # u_d-1 up to knot value u_n+1
     plotting = np.linspace(d-1, n, num_points)
     for u in plotting :
          px = bspline(u, knots, cpx, d)
          x.append(px)
          py = bspline(u, knots, cpy, d)
          y.append(py)
     plt.plot(x, y, color='magenta')
 
        
cp = np.array( [(15, 10), (25, 30), (35, 15)] )
cbp =np.array( [(10, 10), (20, 30), (30, -10), (50, 10), (60,40)] )

Bezier_Curve(cp)
B_Curve_Uniform(cbp, 2)

plt.plot([], [], label='Bezier Curve', color='blue')
plt.scatter(cp[:,0], cp[:,1], label='Control Points', color='red')
plt.plot([], [], label='B-Spine Curve', color='magenta')
plt.scatter(cbp[:,0], cbp[:,1], label='Control Points', color='orange')
plt.xlabel('X')
plt.ylabel('Y')
plt.legend()
plt.grid(True)
plt.axis('equal')
plt.show()


