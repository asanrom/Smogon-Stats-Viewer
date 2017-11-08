Smogon Usage Stats Viewer
====================

This project is a viewer of [Pokemon Usage Stats (Smogon)](http://www.smogon.com/stats/) made in HTML5, CSS3 and Javascript. You can use it to visualize Smogon stats in a more visual and sorted format. 

Check it out here: [https://asanrom.github.io/Smogon-Stats-Viewer/](https://asanrom.github.io/Smogon-Stats-Viewer/)

Installation
------------

Install [node.js](http://nodejs.org/), version 4.0.0 or newer if you do not have it.

Download the lastest release and uncompress it.

Move the release to the `www` folder of your web server (for example Apache).

In order to install dependencies, open a shell / terminal / cmd an run the command:
```
npm install
```

Usage
------------

If you want to update the usage stats using the default configuration (gets stats for the last 2 months), run the command:
```
npm start
```

In order to update the months list use:
```
node usage-stats update
```

In order to get stats of a month run:
```
node usage-stats get yyyy-mm
```

In order to test the client, use the following (You can use 8000 or the port you prefer).
```
node usage-stats test 8000
```

For more options:
```
node usage-stats --help
```
