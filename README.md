# humans-person
### Platform
    - nodejs > ver 8.0
    - npm

### Steps to setup 

1. Clone the repo into local computer.
2. Setup mysql database schema and table 
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

5. Start the app by running 
    ```
    npm start
    ```
    If everything set correctly, you should see console log output showing the server started suscessfully and waiting to serve on port 3000.

### Test using POSTMAN

1. **Postman** collection script was included in the repo to test all the endpoints, import _**humans-test.postman_collection.json**_ into postman, and run the tests.