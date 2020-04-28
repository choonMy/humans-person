# humans-person
### platform
    - nodejs > ver 8.0
### Steps to setup 

1. Clone the repo into local computer.
2. mysql database schema and table 
    - run the scripts in db folder to create humans schema and person table.
3. Navigate to rest-api folder where the package.json is located, and run 
    ```
    npm install

    ```
4. Edit db settings in rest-api/app/config/db.config.js accordingly
    ```
        HOST: "localhost",
        USER: "root",
        PASSWORD: "password",
        DB: "humans"
    ```

5. Start the server by running 
    ```
    npm start
    ```
    If everything set correctly, you should see log showing the server started suscessfully and waiting to serve port 3000.

### Test using POSTMAN

1. **Postman** collection script was included in the repo to test all the endpoints, import _humans-test.postman_collection.json_ into postman, and run the tests.