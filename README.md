# Interactive Fully Functional Blog Application

In this project, I've combined several technologies and frameworks to create a fully functional blog application in which users can register, login, and create blog posts in a beautiful, responsive blog website. 

## Frontend 

The frontend is done usiing **html/css/react**. I did a lot of animations and tried to be as true to the reference as possible. A lot of what I'm doing is new to me, so I think this is a great chance to learn along the way. 

## Backend

For the backend, I used **Node.js** and **expressjs** to handle HTTP requests and responses. I mainly chose the express framework to make things simpler and easier for me when implementing the custom RestAPI and I'm able to use other technologies such as MongoDB for the database.

## Database

For the database, I use **MongoDB** so that I can easily non-tabular, but documented data  (in the form of JSON) so that I'm able to store information about each user and blog entry in the application. This is important because it prevents everything form reseting when I exit/close the server and then reboot for whatever reason. This saves all data to the database so that even if I lose connection or whatever errors may happen, the data is safe accessible.

## Security 

For each user's password, I used **bcrypt** to encrypt their passwords and then store it in the databse since we never want to store user passwords in plaintext. This is very important if I ever want a functional application and it satisfies the **confidentiality** requirement. I'm also making sure that users are only allowed to see and interact with their own blogs and making sure that they cannot be deleted by another user. This is important because it preserves the **integrity** of the website and satisfies the **availability** principle. 

# Blogs

### Authorization <h2 style="color: grey;">Bearer Token</h2>
This folder is using Bearer Token from collection Blogs API

### <h2 style="color: green;">GET</h2> Get User Blogs 
```http://localhost:5000/blogs```

### Authorization <h2 style="color: grey;">Bearer Token</h2>
<hr>

| Key   | Value     |
| ----- | --------- |
| **Token** | `<token>` |



<hr>

### <h2 style="color: yellow;">POST</h2> Create Blogs 
```http://localhost:5000/blogs```

### Authorization <h2 style="color: grey;">Bearer Token</h2>
<hr>

| Key   | Value     |
| ----- | --------- |
| **Token** | `<token>` |


### Body <h2 style="color: grey;">urlencoded</h2>
<hr>

| Field     | Example                                                        |
| --------- | -------------------------------------------------------------- |
| **title**     | My First Blog Post                                             |
| **slug**      | my-first-blog-post                                             |
| **content**   | Lorem Ipsum text...                                            |
| **user**      | 665f0a1234abc5678def1234                                       |
| **category**  | Interior                                                       |
| **tags**      | \["interior", "minimalism"]                                    |
| **image**     | [https://example.com/image.jpg](https://example.com/image.jpg) |
| **published** | true                                                           |
| **readTime**  | 4                                                              |
| **likes**     | 42                                                             |
| **views**     | 992                                                            |
| **featured**  | true                                                           |
| **comments**  | Array of comment objects                                       |
| **createdAt** | Date                                                           |
| **updatedAt** | Date                                                           |


<hr>

### <h2 style="color: blue;">PUT</h2> Update Blog
```http://localhost:5000/blogs/:id```

### Authorization <h2 style="color: grey;">Bearer Token</h2>
<hr>

| Key   | Value     |
| ----- | --------- |
| **Token** | `<token>` |


### PATH VARIABLES
<hr>

| Key   | Value     |
| ----- | --------- |
| **id** |  |


### Body <h2 style="color: grey;">urlencoded</h2>
<hr>

| Field     | Example                                                        |
| --------- | -------------------------------------------------------------- |
| **title**     | My First Blog Post (updated)                                   |
| **slug**      | my-first-blog-post                                             |
| **content**   | Lorem Ipsum text...                                            |
| **user**      | 665f0a1234abc5678def1234                                       |
| **category**  | Interior                                                       |
| **tags**      | \["interior", "minimalism"]                                    |
| **image**     | [https://example.com/image.jpg](https://example.com/image.jpg) |
| **published** | true                                                           |
| **readTime**  | 4                                                              |
| **likes**     | 42                                                             |
| **views**     | 992                                                            |
| **featured**  | true                                                           |
| **comments**  | Array of comment objects                                       |
| **createdAt** | Date                                                           |
| **updatedAt** | Date                                                           |

<hr>


### <h2 style="color: red;">DELETE</h2> Delete Blog
```http://localhost:5000/blogs/:id```

### Authorization <h2 style="color: grey;">Bearer Token</h2>
<hr>

| Key   | Value     |
| ----- | --------- |
| **Token** | `<token>` |

### PATH VARIABLES
<hr>

| Key   | Value     |
| ----- | --------- |
| **id** |  |

<hr>


# Users

### Authorization <h2 style="color: grey;">Bearer Token</h2>
This folder is using Bearer Token from collection Blogs API

### <h2 style="color: yellow;">POST</h2> Register User
```http://localhost:5000/users```

### Authorization <h2 style="color: grey;">Bearer Token</h2>
<hr>

This request is using Bearer Token from colleection Blogs API

### Body <h2 style="color: grey;">urlencoded</h2>
<hr>

| Field    | Example                                 |
| -------- | --------------------------------------- |
| **name**     | John Doe                                |
| **email**    | [john@gmail.com](mailto:john@gmail.com) |
| **password** | 123456                                  |



| Key   | Value     |
| ----- | --------- |
| **Token** | `<token>` |

<hr>

### <h2 style="color: yellow;">POST</h2> Login User
```http://localhost:5000/users/login```

### Authorization <h2 style="color: grey;">Bearer Token</h2>
<hr>

This request is using Bearer Token from colleection Blogs API

### Body <h2 style="color: grey;">urlencoded</h2>
<hr>

| Field    | Example                                 |
| -------- | --------------------------------------- |
| **email**    | [john@gmail.com](mailto:john@gmail.com) |
| **password** | 123456                                  |

| Key   | Value     |
| ----- | --------- |
| **Token** | `<token>` |

<hr>

### <h2 style="color: green;">GET</h2> Get Current User
```http://localhost:5000/users/me```

### Authorization <h2 style="color: grey;">Bearer Token</h2>
<hr>

This request is using Bearer Token from colleection Blogs API

### Authorization <h2 style="color: grey;">Bearer Token</h2>
<hr>

| Key   | Value     |
| ----- | --------- |
| **Token** | `<token>` |

<hr>