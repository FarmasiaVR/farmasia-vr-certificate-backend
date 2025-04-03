# Certificate flow

Server receives data to the API endpoint `/certificates/create` via POST request. This request must include the HTTP header `Authorization: <value>`, where `<value>` is the password set in the frontend. The request body will be JSON data about the game completion.