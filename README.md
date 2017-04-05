# Configuration Service for Blue Cross Blue Shield Association Shell Application

## Installation

1. install [node](https://nodejs.org/en/)

2. install bower globally

    `npm install bower -g`

3. install gulp globally

    `npm install gulp -g`

4. Open terminal and navigate to project's directory and then run following commands:

    `npm install`

    `bower install`

    ###### The above commands will install all the client and server side dependencies for the application

5. run `gulp test` to run the unit tests

6. run `gulp build` to build the application and serve the content via web path

7. run `gulp` to start the server and launch the application in your default browser for you...

    ###### By default port 8090 would be used, however, that can be changed in ./config/default.json
    
    ```
    web: {
        port: 8090 # change it accordingly if needed
    }
    ```

## MongoDB

In order to import the master data for starting up the application run following commands:
###### The json files i.e. roles.json and groups.json can be located under db directory in the root of the app)
###### Open the terminal and navigate to db directory before running these commands`
    
    
    mongoimport --db bcbsa-shell-dev --collection roles --file roles.json
    
    mongoimport --db bcbsa-shell-dev --collection groups --file groups.json
    

In case if the modified data needs to be backed up further in future do following:

    
    mongoexport --db bcbsa-shell-dev --collection roles --out roles.json
    
    mongoexport --db bcbsa-shell-dev --collection groups -q "{name: 'Root'}" --out groups.json
    

