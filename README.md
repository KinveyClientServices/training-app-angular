# training-app-angular

A sample Angular/Ionic app which demonstrates the basic functionality of the Kinvey SDK

### Preinstall
* make sure that you have nodejs installed https://nodejs.org/en/
* install cordova
  npm install -g cordova
* install ionic
  npm install -g ionic
* install bower
  npm install -g bower 
* install ios-sim to emulate app on iOS
  npm install -g ios-sim
  
Users that have Mac or Linux machines should run above commands with sudo

### Getting Started
* npm install
* bower install
* gulp && ionic serve
* npm emulate run-android
* npm emulate run-ios
* npm run run-android
* npm run run-ios

To deploy to a device modify package.json from cordova emulate ==> cordova run

The goal of the training is to be exposed to the different forms of data and auth access provides.

### Topics
* Auth
  * Kinvey Login
  * Mobile Identity Connect Login
* Products
  * Default Cache Data Store
  * Sort
  * Skip/Limit
  * Delete
* Partners
  * Cache Data Store
  * Cache data from Kinvey locally
  * Push local changes to Kinvey
  * Sync changes with Kinvey (push then pull)
* Todos
  * Sync Data Store
  * Push
  * Pull
* Collateral
  * Kinvey File Store
* Media
  * Network Data Store
  * Update Media
  * Delete media