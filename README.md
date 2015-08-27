## LAPD Community Map
Simple Map for residents to contact LAPD Division Senior Lead Officers in their neighborhood

## What is this project?
A recent [tweet](https://twitter.com/EmpowerLA/status/636701041803833344) by [EmpowerLA](http://empowerla.org/), (The city of LA's Department of Neighborhood Empowerment) posted a static map of contacts to Senior Lead Officers of the Northeast Division. 

As a way to help the public, LAPD and EmpowerLA, a web map will be made to help link residents to the officers in charge of bringing safety to their neighborhood.

All this map should do is allow residents to search for the senior lead officer of their neighborhood, as this could serve as a template and tutorial using csv data with [Papa Parse : An in-browser CSV parser](http://papaparse.com/) and [leaflet : An open-source javascript library for making web maps](http://leafletjs.com/).

**Current Project Status:** Data research, data cleaning/formatting, adding data to [Working Webmap](http://maptimela.github.io/lapd_divisions/)

##So far...
* A leaflet map was made using Stamen toner-lite and Mapbox Satellite imagery as baselayers
* The baselayers can be switched on the top-right corner
* An LAPD Division layer was added with each feature being labeled, labeled using the `L.divIcon` function of leaflet and styled in CSS
* An LAPD Patrol Car area layer was was added with each feature being labeled
** Labeling and placement of text used `papa.parse` to take the csv of LAPD contacts and create label markers using the  `L.divIcon` function. The csv contains latlng coordinates of the centroid of each patrol area to place each marker.
* Hightlight features upon mouse position
* Click feature to zoom and fit within map

## How can I help?

| Phase        | Task           | Contact  |
| ------------- |:-------------:| -----:|
| Fill out csv with contacts         | Use LAPD website to find out contacts             |   Issues            |
| Address Search Script     | Code to add address search to leaflet map      |   Issues/Pull Request |
| UX | Explore other ways of styling map data |  Issues |

##Datasets used so far
* [LAPD Basic Car Area](http://boundaries.latimes.com/set/lapd-basic-car-areas/), source LA TIMES
* [LAPD Divisions](http://boundaries.latimes.com/set/lapd-divisions/), source LA TIMES
