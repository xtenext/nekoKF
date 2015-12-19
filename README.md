NekoKF
======
NekoKF is a library/app that was created to help translate the adult visual novel Kyonyuu Fantasy. It should be compatible with other WAFFLE games as well, though it may require some additional configuration.

Contents
--------
- **app/** - The web-facing app. Opening index.html in a browser will let you use the tool. Index.html also contains the script which configures the app before it runs.
- **build/** - Contains the "compiled" neko script.
- **src/** - Contains the source files of the neko script.
- **test/** - Contains the QUnit tests for the scripts.

Usage
-----
1. Buy a copy of Kyonyuu Fantasy (or another WAFFLE game)
2. Install the game, and locate the scr.pak file associated with the game
3. Use [Crass](http://galcrass.blog124.fc2blog.us/) to extract the script files from scr.pak
4. Open nekoKF and browse to a script file
5. Translate the script file
6. Click the save button to recompile the script with the translation

Installation
------------
Just clone the repository. 
Make sure you have [Node](https://nodejs.org) and [Grunt](http://gruntjs.com/installing-grunt) installed for building.

Configuration
-------------
See [configuring.md](configuring.md)

Building
--------
Before your first build, run `npm install`.
Once you're ready to build, simply run `grunt`. The scripts will be compiled, minimized, and coppied into the app folder

Tests
-----
Tests can be found in the tests directory. `index.html` contains the tests for the "full" script and dictionary. 'min.html' contains the same tests, but for the uglified versions of the script and dictionary.

Licence
-------
[MIT Licence](README.md)