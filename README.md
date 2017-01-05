Configuration Service for BCBSA Shell Application
-

Install instructions
-

1. install [node](https://nodejs.org/en/)

2. install bower globally

    `npm install bower -g`

3. install gulp globally

    `npm install gulp -g`

4. Open terminal and navigate to project's directory and then run following commands:

    `bower install`

    `npm install`

    The above commands will install all the client and server side dependencies for the application

5. run `gulp test` to run the unit tests

6. run `gulp build` to build the application and serve the content via web path

7. run `gulp` to start the server and launch the application in your default browser for you...

    By default port 8090 would be used, however, that can be changed in ./config/default.json
    
    `web: {
        port: 8090 // change it accordingly if needed
    }`
