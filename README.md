# Interactive Fully Functional Blog Application

In this project, I've combined several technologies and frameworks to create a fully functional blog application in which users can register, login, and create blog posts in a beautiful, responsive blog website. 

## Frontend 

The frontend is done usiing **html/css/react**. I did a lot of animations and tried to be as true to the reference as possible. A lot of what I'm doing is new to me, so I think this is a great chance to learn along the way. 

## Backend

For the backend, I used **Node.js** and **expressjs** to handle HTTP requests and responses. I mainly chose the express framework to make things simpler and easier for me when implementing the custom RestAPI and I'm able to use other technologies such as MongoDB for the database.

## Database

For the database, I use **MongoDB** so that I can easily non-tabular, but documented data  (in the form of JSON) so that I'm able to store information about each user and blog entry in the application. This is important because it prevents everything form reseting when I exit/close the server and then reboot for whatever reason. This saves all data to the database so that even if I lose connection or whatever errors may happen, the data is safe accessible.

## Deployment

For my frontend, I was experimenting with AWS Amplify, but I honestly had such a terrible time trying to get it deployed, wasting an entire day. After I finally got it working, the backend was definitely broken, so I looked for backend hosting providers. I know AWS has backend hosting as well, but I could not figure it out, which is why I completely started over and deployed my frontend with vercel, and my backend with render. However, render's free tier does not do persistent disk storage, so my images would never save, which means that I would have to find ANOTHER provider, cloudinary, to upload my images. I had a seriously hard time trying to get everything working, but now things work as expected. However, because of render's inactivite slow downs and cold starts, I'm looking into ANOTHER back end hosting provider. 

Oh my goodness... Afte rspending multiple days and hours learning aws and trying to configure my backend for deployment, I came to the conclusion that I can't use aws because they don't give me an https endpoint but instead an http, which vercel does not work with. In order to get an https endpoint, I need to buy another domain, but I'm trying to keep the budget as low as possible, so this does not work for me. Therefore, after so much time searching and experimenting with so many different deployment / hosting providers, I'm going back to render.

Now that I got render working again, my database FINALLY works with the updated profile fields...

## Security 

For each user's password, I used **bcrypt** to encrypt their passwords and then store it in the databse since we never want to store user passwords in plaintext. This is very important if I ever want a functional application and it satisfies the **confidentiality** requirement. I'm also making sure that users are only allowed to see and interact with their own blogs and making sure that they cannot be deleted by another user. This is important because it preserves the **integrity** of the website and satisfies the **availability** principle. 

## Features

- Authentication
    I implemented authentication using JWT and Bcrypt to encrypt users' passwords. This is important because I don't want to store plaintext passwords in my database, and it allows users to login / register their blog profiles so that they can start interacting with the site and create blogs.

- Viewing Created Blogs
    Users can navigate to "My Blogs" or Dashboard page and is able to view their blogs using a search bar and filtering methods. These were inspired by Airbnb and I think they look quite nice. I'm thinking about adding a max blog count preset by the user so that the blog list doesn't stretch very far downwards. The search bar and filtering categories can be used in conjunction with each other.

- Creating Blogs
    In this tab, users can create their blog with whatever their imaginations can come up with. Each blog is equipped with a Title, a Featured Image (Hero image), and some content. If you don't have any of these three, the blog cannot be posted. 

    To feature an image, I implemented a drag and drop or click to upload the image into cloudinary service which stores images and videos specifically. However, this uploader cannot handle videos as of just yet, and I'm thinking about adding this feature in the future.

- Trending Algorithm
    I implemented a trending section using an algorithm that calculated an engagement score based off of the comments, likes, and views of a post.

- Like Posts
    After a lot of confusion, I was able to add the like functionality to my blogs. This allows users to upvote and increase  the trending score of individual blogs, which boosts its visibility to the trending home page or sidegrid trending.

- Markdown Text Editor
    The way users create and format their blog posts is through a mardown text editor instead of creating my own text editor from scratch becacuse that's insanity. There's a possibility I ccould have gone with a WYSIWYG text editor, but that is much more complex. 
    
    Users are able to preview how their markdown looks like before they post it. Users are also able to use images in the markdown browser, however, they must use a link because there's no way to save local images in the markdown browser.

- Markdown Blog Page Preview
    Users type their content in a Markdown Text Editor and then when entering the actual blog page, the markdown gets parsed into HTML and is displayed to the blog page.

- Friends Social Network Functionality ??
    I'm thinking about adding this feature, but as of right now, I would just like to finish this project.

- Public / Private Blog Posts
    Before posting, Users can choose to make their blog posts public or private. This makes it so that anyone that isn't authorized cannot see the blog post, and anyone who is authorized (Blog author and friends (not implemented)) can see thee post. 

- Menu Sidebar Navigation
    Clicking the menu button in the header will open a Sidebar Navigation, allowing users to navigate to different pages. 

- Profile
    Users can navigate to their profile page, and set various fields to reflect on their blog posts. Name is the user's real name (don't have to give accurate name), Username is what people who view the blogs sees, About is displayed below every blog posts, giving information about the author/creator. 

    I have not implemented any features with Gender, or Country as of just yet. I also need to implement a forget password link in the login page. This should send an email to the user and request a password reset. It does not make sense to be able to only have a  "New Password" field under profile, as that defeats the purpose if the user forgets their password.

    Under here, users can change their profile picture, which automatically deletes the old profile picture over at cloudinary, and uploads the recent one on pressing "Update Profile"

- Advertisers
    Future advertisers can have their ads displayed on the home page or other sections that I will eventually come up with. This feature is not yet implemented, but I used Parallax Scrolling for the advertisement which makes it pretty and futuristic. 

- Tags
    I'm not really doing much with these right now other than listing them below every blog post. Maybe later I can dedicate a whole page to filtering out different tags.


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
| **title**          | My First Blog Post                                             |
| **slug**           | my-first-blog-post                                             |
| **content**        | Lorem Ipsum text...                                            |
| **user**           | 665f0a1234abc5678def1234                                       |
| **category**       | Interior                                                       |
| **tags**           | \["interior", "minimalism"]                                    |
| **image**          | [https://example.com/image.jpg](https://example.com/image.jpg) |
| **published**      | true                                                           |
| **readTime**       | 4                                                              |
| **likes**          | 42                                                             |
| **views**          | 992                                                            |
| **featured**       | true                                                           |
| **trendingScore**  | true                                                           |
| **comments**       | Array of comment objects                                       |
| **createdAt**      | Date                                                           |
| **updatedAt**      | Date                                                           |


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
| **title**          | My First Blog Post (updated)                                   |
| **slug**           | my-first-blog-post                                             |
| **content**        | Lorem Ipsum text...                                            |
| **user**           | 665f0a1234abc5678def1234                                       |
| **category**       | Interior                                                       |
| **tags**           | \["interior", "minimalism"]                                    |
| **image**          | [https://example.com/image.jpg](https://example.com/image.jpg) |
| **published**      | true                                                           |
| **readTime**       | 4                                                              |
| **likes**          | 42                                                             |
| **views**          | 992                                                            |
| **featured**       | true                                                           |
| **trendingScore**  | true                                                           |
| **comments**       | Array of comment objects                                       |
| **createdAt**      | Date                                                           |
| **updatedAt**      | Date                                                           |

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

### <h2 style="color: green;">PUT</h2> Update Profile Info
```http://localhost:5000/users/me```

### Authorization <h2 style="color: grey;">Bearer Token</h2>
<hr>

This request is using Bearer Token from colleection Blogs API
<hr> 

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