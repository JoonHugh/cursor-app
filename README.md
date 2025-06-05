# Interactive Fully Functional Blog Application

In this project, I've combined several technologies and frameworks to create a fully functional blog application in which users can register, login, and create blog posts in a beautiful, responsive blog website. 

## Frontend 

The frontend is done usiing html/css/react. I did a lot of animations and tried to be as true to the reference as possible. A lot of what I'm doing is new to me, so I think this is a great chance to learn along the way. 

## Backend

For the backend, I used Node.js and expressjs to handle http requests and responses. I mainly chose the express framework to make things simpler and easier for me when implementing the custom RestAPI and I'm able to use other technologies such as MongoDB for the database.

## Database

For the database, I use MongoDB so that I can easily non-tabular, but documented data  (in the form of JSON) so that I'm able to store information about each user and blog entry in the application. This is important because it prevents everything form reseting when I exit/close the server and then reboot for whatever reason. This saves all data to the database so that even if I lose connection or whatever errors may happen, the data is safe accessible.

## Security 

For each user's password, I used bcrypt to encrypt their passwords and then store it in the databse since we never want to store user passwords in plaintext. This is very important if I ever want a functional application and it satisfies the confidentiality requirement. I'm also making sure that users are only allowed to see and interact with their own blogs and making sure that they cannot be deleted by another user. This is important because it preserves the integrity of the website and satisfies the availability principle. 