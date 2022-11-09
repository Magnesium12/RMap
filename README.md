<a name="readme-top"></a>

# CSN-291 Course Project : IITR Map 

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li>
          <a href="#to-find-the-shortest-path-between-two-points">To find the shortest path between two points</a>
          <ul>
            <li><a href="#extra-features">Extra features</a></li>
          </ul>
        </li>
        <li>
        <a href="#common-meeting-point">Common Meeting Point</a>
        </li>
      </ul>
    </li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>

***

<!-- ABOUT THE PROJECT -->
## About The Project

A customized IITR map developed specifically for campus residents and visitors to aid navigation inside the large campus area. It has been developed completely based on our manually developed API, and it aims to provide the optimum route given the starting, intermediate and final points.

Features:
* Tells you the shortest path between 2 places of your choice
* Displays a map of IIT Roorkee and allows the user to choose places on the map
* Allows you to add stops in your path.

This is [our](#contributors) submission for CSN-291 Course Project.

---

<!-- GETTING STARTED -->
## Getting Started

The requisite tech stack to run the backend is listed in requirements.txt file that can be installed using the command `pip install -r requirements.txt`.
For installing requisites for frontend, type command `npm install` in frontend folder.
For running the frontend, type command `npm start` in the frontend folder and for backend, type `python manage.py runserver` in backend folder.

To use this application follow these steps:

### TO FIND THE SHORTEST PATH BETWEEN TWO POINTS

* The user can add a source and a destination point, which can be selected both by clicking on the map as well as selecting from the drop down menu. The map displays the shortest path using the Dijkstra's algorithm in the backend.

#### Extra features
* The user can also add multiple intermediate stoppages between the source and destination, and customize the course of shortest path

### COMMON MEETING POINT
* Two or more users can select their respective locations in the map, and the map shows the optimum meeting point for the users, such that the total time for all to reach that point is minimized.

---
<!-- Contributors -->
## Contributors
Contributors of this Group project:

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/i-love-chess"><img src="https://avatars.githubusercontent.com/u/101268569?v=4" width="100px;" alt="Ashutosh Kalidas Pise (21114073)"/><br /><sub><b>Ashutosh Kalidas Pise (21114073)</b></sub>
      </td>
      <td align="center"><a href="https://github.com/ashutoshkr129"><img src="https://avatars.githubusercontent.com/u/96130203?v=4" width="100px;" alt="Ashutosh Kumar (21114021)"/><br /><sub><b>Ashutosh Kumar (21114021)</b></sub>
      </td>
      <td align="center"><a href="https://github.com/kirtan03"><img src="https://avatars.githubusercontent.com/u/95969313?v=4" width="100px;" alt="KirtanKumar VijayKumar Patel (21114051)"/><br /><sub><b>KirtanKumar VijayKumar Patel (21114051)</b></sub>
      </td>
      <td align="center"><a href="https://github.com/Magnesium12"><img src="https://avatars.githubusercontent.com/u/99383854?v=4" width="100px;" alt="Mudit Gupta (21114061)"/><br /><sub><b>Mudit Gupta (21114061)</b></sub>
      </td>
      <td align="center"><a href="https://github.com/kej-r03"><img src="https://avatars.githubusercontent.com/u/99071926?v=4" width="100px;" alt="Rishi Kejriwal (21114081)"/><br /><sub><b>Rishi Kejriwal (21114081)</b></sub>
      </td>
      <td align="center"><a href="https://github.com/rohan-kalra904"><img src="https://avatars.githubusercontent.com/u/94923525?v=4" width="100px;" alt="Rohan Kalra (21114083)"/><br /><sub><b>Rohan Kalra (21114083)</b></sub>
      </td>
    </tr>
  </tbody>
  <tfoot>

  </tfoot>
</table>
