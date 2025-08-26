# ![icon](static/img/logo.png) Sailboat Calc

Calculator for sailboat design ratios

## Description

There are a few ratios sailboat aficionados are interested in. There are sources where these numbers can be found, but this calculator allows you to calculate the ratios for any boat and save the data for later use.

## Calculated ratios:

- Sail area/Displacement
	- Larger number indicates a sportier boat
	- Cruisers are typically between 15-20
- Ballast/Displacement
	- The percentage of the boat that is ballast.
	- More ballast typically is more stable
	- More ballast enables better performance at higher winds
- Displacement/Length
	- Approximates the drag of the boat
	- 150-200 glide easy
	- 200-300 are heavy cruisers
	- over 300 is very heavy
- Comfort ratio
	- 20+ Coastal cruiser
	- 30+ Light bluewater cruiser
	- 40+ Comfortable bluewater cruiser
- Capsize screening index
	- Smaller is better
	- 2.0 or less is considered sufficient for bluewater and able to right itself after a capsize.
- S# Performance number
	- A synthetic index that tries to predict the relative performance of boats of similar size.
- Hull speed
	- Maximum speed the boat can have without planing.
-  Hull speed (LOA)
	- Some boats have large overhangs and their effective waterline increases when they heel over. This attempts to calculate the theoretical cap to this effect.

## Disclaimers

The formulas were obtained from [sailboatdata.com](https://sailboatdata.com/). While the metric system used by the calculator would allow for much more straight forward formulas, to keep the numbers comparable with the popular site, various correction factors are used. 

At times [sailboatdata.com](https://sailboatdata.com/) uses **inaccurate approximations** for their equations. A choise was made to replicate this to keep the numbers comparable. 

Equation for the **S# Number** doens't give correct results. I've looked at multiple sources for the equation, but I haven't been able to replicate the results from [sailboatdata.com](https://sailboatdata.com/).
