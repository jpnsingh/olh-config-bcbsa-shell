## Configuration Service: Blue Cross Blue Shield Association Shell Application

### Installation

1. install [node](https://nodejs.org/en/)

2. install bower globally

    `npm install bower -g`

3. install gulp globally

    `npm install gulp -g`

4. Open terminal and navigate to project's directory and then run following commands:

    `npm install`

    `bower install`

    ###### The above two commands will install all the client (i.e. bower components) and server (i.e. node modules) dependencies for the application.

5. run `gulp test` in order to run and verify the unit tests

6. run `gulp coverage` in order to check the unit test coverage

7. run `gulp build` to build the application and serve the content via web path

8. run `gulp` to start the server and launch the application in your default browser for you...

    ###### By default port 8090 would be used, however, that can be changed in ./config/development.json
    
    ```
    web: {
        PORT: 8090 # change it accordingly if needed
    }
    ```

### MongoDB

1. In order to import the master data for starting up the application, run following commands:

    ```
    mongoimport --db bcbsa-shell-dev --collection roles --file roles.json
    
    mongoimport --db bcbsa-shell-dev --collection groups --file groups.json
    ```
    ###### NOTE: The json files i.e. "roles.json" and "groups.json" can be located under db directory in the root of the application. Open the terminal and navigate to the db directory before running these commands

2. In case if the modified data needs to be backed up further in future do following:
   
    ```
    mongoexport --db bcbsa-shell-dev --collection roles --out roles.json
    
    mongoexport --db bcbsa-shell-dev --collection groups -q "{name: 'Root'}" --out groups.json
    ```
