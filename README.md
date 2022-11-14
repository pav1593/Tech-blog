# tibber Tech Blog

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses/mit/)

## Description
---  

A basic CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well developed following the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## How to Use
---
<br/>

### **Installation:**
<br/>
**IMPORTANT:** You will need to edit the ```.env.EXAMPLE``` file with your MySQL username and password, and rename it to ```.env``` in the root folder.  
<br/>
<br/>

1. You will need to install all of the required ```npm``` modules by running ```npm install```.
2. You will need to implement the ```schema.sql``` script using your local MySQL server and running ```source db/schema.sql```
3. You will need to seed the database by running ```npm run seed```
4. You can run the application using ```npm start``` or ```node server.js```
<br/>

### **Usage:**

* Homepage: User can view all of the blog posts and comments by clicking on the title. Once signed in user will be able to post comments when viewing a blog post. 

* Login: Existing user can sing-in, or new user can sign-up for an account.

* Dashboard: A signed in user can view/edit/delete their posts, or add new posts.

## Design requirements
---
<br/>

### **User Story**

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

### **Acceptance Criteria**

```md
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```

### **Requirements Mock-Up**

The following animation demonstrates the application functionality:

![Animation cycles through signing into the app, clicking on buttons, and updating blog posts.](./Assets/14-mvc-homework-demo-01.gif) 

## **Screenshots**
---
<br/>

![Screenshot1](./Assets/Screen%20Shot%202022-11-13%20at%208.41.56%20PM.png)  
<br/>

![Screenshot2](./Assets/Screen%20Shot%202022-11-13%20at%208.46.02%20PM.png)  
<br/>

![Screenshot3](./Assets/Screen%20Shot%202022-11-13%20at%208.49.02%20PM.png) 
<br/>

![Screenshot4](./Assets/Screen%20Shot%202022-11-13%20at%208.43.10%20PM.png)  
<br/>

![Screenshot5](./Assets/Screen%20Shot%202022-11-13%20at%208.43.59%20PM.png) 
<br/>

![Screenshot6](./Assets/Screen%20Shot%202022-11-13%20at%208.44.28%20PM.png) 
<br/>

## **Deployment**
<br/>

* URL: https://tibber.herokuapp.com/

* GitHub repository: https://github.com/pav1593/Tech-blog

