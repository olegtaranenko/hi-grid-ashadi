Setup environment
=================

Prerequisites
-------------

 * You should have an account at gitlab.com, its free, Not forget download to gitlab.com you public SSH key.
 * You have to be able download some distributives from www.sencha.com (~200MB), spam from sencha possible, but you can later unsubscribe.
 * You have to be able launch java runtime for ant scripts execution. (Sencha Cmd)
 * If you use windows, last version of msysgit should be installed, can be downloaded from http://git-scm.com/download/win. TortoiseGit, IDE plugins, etc not enough
 * Project IDE is WebStorm. 30-days trial version can be downloaded from https://www.jetbrains.com/webstorm/whatsnew/
 * local http-server (apache, ...) should be installed. You must be able to establish symbolic linking between project's folder and server's htdocs. (FOLLOWSYMLINK etc)
 * actual version of node.js http://www.nodejs.org


ExtJS Distros
-------------
 * goto http://www.sencha.com/products/extjs/evaluate, fill the form, get ExtJS 5.1.1 30-days evaluation distro, unpack it. Say it will be unziped to ~/Downloads/ext-5.1.1.365
 * http://pages.sencha.com/Ext-JS-6-Early-Release.html, fill the form, download Cmd 6.0 distro only, unpack it, run setup, check PATH after there 


Init (mac/linux, linux not tested)
----------------------------------

mkdir -p ~/dev/hi-grid/src
cd ~/dev/hi-grid/src
git clone git@gitlab.com:olegtaranenko/hi-grid.git hi-grid
ln -ns ~/Downloads/ext-5.1.1.365 ~/dev/hi-grid/ExtJS
cd ~/dev/hi-grid/src/hi-grid/icsClient
./genWorkspace.sh
./gen.sh mv
ln -ns ~ /dev/hi-grid/src/hi-grid/icsClient ~/Sites/hi-grid



Init (windows) (not tested, may happens quirks)
-----------------------------------------------

mkdir %YOUR-PROJECTS%\hi-grid\src
cd %YOUR-PROJECTS%\hi-grid\src
git clone git@gitlab.com:olegtaranenko/hi-grid.git hi-grid
mklink /J  %YOUR-PROJECTS%\hi-grid\ExtJS %EXTJS_UNZIPPED_PATH%
cd %YOUR-PROJECTS%\hi-grid\src\hi-gird\icsClient
genWorkspace.bat
gen.bat mv
mklink /J  %HTDOCS_PATH%\hi-grid %YOUR-PROJECTS%\hi-grid\src\icsClient


Run
---
open in WebStorm the project from icsClient folder
run api.js as a node application
open in browser http://localhost/hi-grid/icsgui?cache=false
you should see no error

add to your skype contacts skype:mv-oleg.taranenko
