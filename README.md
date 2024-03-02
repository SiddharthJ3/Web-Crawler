# Web-Crawler

This Python-based project delivers a robust web crawler engineered to extract valuable data from websites efficiently. It offers a versatile and adaptable framework tailored for retrieving information from web pages, catering to diverse applications in data mining, web indexing, and content aggregation.

Additionally, this project features two API endpoints:
-  Authentication Endpoint: Allows users to obtain a JSON Web Token (JWT) after successful authorization, ensuring secure access to the system's resources.
-  Data Retrieval Endpoint: Verifies the provided JWT token and facilitates the retrieval of web-scraped data from a stored .csv file, ensuring data integrity and confidentiality.

## Tech-Stack 

- ### `Python`
- ### `Selenium`
- ### `Pandas`
- ### `NodeJS`

## Features 

- ### The web crawler component traverses the web by following hyperlinks from a list of URLs.
- ### Users can define custom rules and filters to tailor the crawler and scraper behavior according to their requirements.
- ### It uses JWT token authorization on its API endpoints so that only authorized users can access the data.

## How to use 

1. Install ```node.js``` , ```python```, ```selenium```, ```pandas``` from the terminal.
2. Run the backend server (server.js) file by entering ```node server.js ``` in the terminal.
3. Open the web crawler file (amazon) and run the code blocks in order (wait for each block to finish running). 
4. After the web crawler file is fully executed, it will create a .csv file in the data folder.
5. Now we will access the API endpoints using POSTMAN.
6. Access the ```/api/auth``` API endpoint by setting ```Content-Type: application/JSON`` and enter raw JSON data in the payload ```{ "name": "user1", "password": "password1"}```
7. This will return a JWT token as a response.
8. Access the ```/api/data``` API endpoint by entering the ```Bearer <token>```.
9. If the token is correct, the API endpoint will give the .csv file's data in the form of JSON. 
