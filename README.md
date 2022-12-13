# Movie CRUD Application with Redux & React Query - Next.js

This application displays a movie table with different functions:

We can add a new movie, with the mandatory fields: title, description, age limit

In the table, we can filter the movies by age limit

By clicking on the green icon under the actions menu, we can display the data of the selected movie, which we can update by clicking the yellow (update) button if we wish

We can delete the selected movie from the table with the red trash button.

The backend is written in typescript and uses express framework.
Requests are logged by winston.
MongoDB is used as the database with mongoose library.

The Frontend is written in NextJS and uses Axios, Redux & React Query.

## The application is dockerized, so before running it, it needs to be installed.

# 🏃 Run Locally

Clone the project

git clone https://github.com/matefarsang/Movie-app.git

## Installation & Start of the application

Go to the project directory
as root, use the nvm use command for the corresponding node version

then

### docker-compose up command

Docker will install the dependencies, connect to MongoDb and start the backend & frontend

The application start on http://localhost:4001

# Enjoy : )

@matefarsang
