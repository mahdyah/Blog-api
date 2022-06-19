
# Blog API

This is an API for a  blog where Anyone can create a user account and access the content. The authors  would also be able to find, edit or delete his or her blog.

## ⚒️ Libraries, Middlewares, and dependencies 
```bash
 // npm is the default package manager for the JavaScript runtime environment Node.js. It consists of a command line client, also called npm, and an online database of public and paid-for private packages, called the npm registry.
npm init -y 
//It will simply generate an empty npm project without going through an interactive process.The -y stands for yes.
 
 npm i express
//Express is web framework for node.

npm i dotenv
//Dottenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code.

 npm i morgan
//Morgan is a middleware that gives information about the request you get on the server.

npm i helmet
//Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
 
 npm i bcrypt
// bcrypt is the library that hashes the password

npm i jsonwebtoken
//A package, dependency for security, transmitting information between parties as a jason object.

npm i mongoose
// The database

npm i express-validator
//The express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizer functions(Sometimes, receiving input in a HTTP request isn't only about making sure that the data is in the right format, but also that it is free of noise.

```
## 🚦 Routes

#### 1. Blog route: The blog route manages the blogs.

| Methods   | Url        | Description                |
| :-------- | :-------   | :------------------------- |
| GET       | /blogs     | Get all the blogs |
| POST       | /blogs     | Create new blogs |
| PUT       | /blogs/:id     | Update the blogs with a specific id. |
| DELETE       | /blogs/:id     | If the author and the use are the same, the user can delete the content. |

#### 2. User route: The user route manages the users.

| Methods   | Url        | Description                |
| :-------- | :-------   | :------------------------- |
| GET       | /user     | Get all the users|
| POST       | /user     | Create new users |

#### 3. login route: The login route manages the login.

| Methods   | Url        | Description                |
| :-------- | :-------   | :------------------------- |
| POST       | /auth    | It authenticates the user and provides a jwt to access and edit any content. |

# 📈 Upcoming Features:
1. Markdown files.
2. More routes.
