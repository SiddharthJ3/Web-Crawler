# Web-Crawler

This Python-based project is a web crawler that extracts product information from Amazon India's website and updates a MySQL database with the crawled data. 

Additionally, this project features three API endpoints:
-  User Registration Endpoint: This endpoint allows new users to register for access to the system, enabling them to obtain authentication tokens and access the data retrieval functionality.
-  Authentication Endpoint: Allows users to obtain a JSON Web Token (JWT) after successful authorization, ensuring secure access to the system's resources.
-  Data Retrieval Endpoint: Verifies the provided JWT token and facilitates the retrieval of web-scraped data from a stored .csv file, ensuring data integrity and confidentiality.

## Tech-Stack 

- ### `Python`
- ### `Selenium`
- ### `Pandas`
- ### `NodeJS`
- ### `mySQL`

## Features 

### Web Crawler:
- Extract product information from Amazon India's website.
- Utilizes Python's selenium library for web scraping.
- Navigate through product pages to gather product title, price, and URL data.

### Database Integration:
- Stores the extracted product data in a MySQL database.
- Utilizes Python's mysql-connector library to interact with the database.
- Ensures data persistence and integrity by securely storing crawled data.

### API Endpoints:
- #### Authentication Endpoint:
Enables users to obtain a JWT token upon successful authorization. Ensures secure access to the system's resources through token-based authentication.

- #### Data Retrieval Endpoint:
Verifies JWT tokens provided by users.
Facilitates the retrieval of web-scraped data from the MySQL database.
Guarantees data integrity and confidentiality by enforcing access controls.
- #### User Registration Endpoint:
Allows new users to register for access to the system.
Grants authentication tokens upon successful registration, enabling access to the data retrieval functionality.

### Secure Authentication:
- Implements JSON Web Tokens (JWT) for user authentication.
- Ensures secure transmission of credentials and access tokens over HTTP.

## How to use 

1. Clone the Repository:
   - Clone the project repository to your local machine using the following command:
   - ```git clone https://github.com/SiddharthJ3/Web-Crawler.git```
     
2. Install Dependencies:
   - Navigate to the project directory and install the required Python dependencies:
   - ```pip install selenium pandas numpy mysql-connector-python```
  
   - Install the necessary Node.js packages by running:
   - ```npm install express mysql jsonwebtoken```

3. Database Setup:
   - Create a new MySQL database named data.
   - Create two new schemas. One for the product and one for the users.
   - For product: ```CREATE TABLE products (
    title VARCHAR(255) NOT NULL,
    price INT,
    url VARCHAR(255) NOT NULL
);```
   - For users: ```CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);```

4. Web Crawling:
   - Run the web_crawler.py script located in the directory to initiate the web crawling process.
   - This script will extract product information and update the MySQL database with the crawled data.
  
5. API Endpoints:
   - User Registration Endpoint:
     - Send a POST request to ``/api/register`` with a JSON object containing a username and password to register a new user and obtain an authentication token.
    
   - Authentication Endpoint:
     - Send a POST request to ``/api/auth`` with a JSON object containing username and password to obtain a JWT token.

   - Data Retrieval Endpoint:
     - Send a GET request to ``/api/data`` with a valid JWT token in the Authorization header to retrieve the crawled data in JSON format.
