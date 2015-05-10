Short instruction for install
=============================

To get Node.js installed please refer to the official site http://www.nodejs.org
If nodejs is correctly installed you can verify this with command

    node --version

If node workstation is behind proxy then need to configure npm proxy before
install modules

    npm config set proxy http://proxy:3128
    npm config set https-proxy http://proxy:3128

To remove any proxy from npm

    npm config rm proxy
    npm config rm https-proxy

To install all modules you have to be connected to the internet and proper configured proxy settings.

    cd nodejs
    (sudo) npm install
    node api.js

comment from fabio
