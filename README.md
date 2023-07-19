[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Social Media Backend API

## Table of Contents

 • [Description](#description)

 • [Installation](#installation)

 • [Usage](#usage)

 • [Features](#features)

 • [Technologies Used](#technologies-used)

 • [Contributing](#contributing)

 • [Questions](#questions)

 • [License](#license)

## Description

 The Social Media Backend API is a web application designed to provide backend functionality for a social network web application. It allows users to share their thoughts, react to friends' thoughts, and manage their friend lists. The API is built using Node.js with Express.js for routing, MongoDB for data storage, and Mongoose as the ODM (Object Data Modeling) library. This combination of technologies provides a scalable and flexible solution for handling large amounts of unstructured data, making it ideal for social networking platforms.

## Installation

To use the Social Media Backend API, follow these steps:

1. Make sure you have MongoDB installed on your machine. If not, follow the [MongoDB installation guide](https://www.mongodb.com/docs/manual/installation/) to install it locally.
2. Clone the repository to your local machine or download the source code.
3. Navigate to the project directory and install the required dependencies using npm:

```bash
npm install
```

1. Start the server:

```bash
npm start
```

The API will be accessible at <b>`http://localhost:3001`</b>.

## Usage

The Social Media Backend API provides several routes to interact with user data and thoughts. The routes include:

`/api/users`

+ `GET` all users
+ `GET` a single user by its _id and populated thought and friend data
+ `POST` a new user
+ `PUT` to update a user by its _id
+ `DELETE` to remove a user by its _id

`/api/users/:userId/friends/:friendId`

+ `POST` to add a new friend to a user's friend list
+ `DELETE` to remove a friend from a user's friend list

`/api/thoughts`

+ `GET` to get all thoughts
+ `GET` to get a single thought by its _id
+ `POST` to create a new thought
+ `PUT` to update a thought by its _id
+ `DELETE` to remove a thought by its _id

`/api/thoughts/:thoughtId/reactions`

+ `POST` to create a reaction stored in a single thought's reactions array field
+ `DELETE` to pull and remove a reaction by the reaction's reactionId value

## Features

+ Create, read, update, and delete users and thoughts in the MongoDB database.
+ Add and remove friends to a user's friend list.
+ Create and remove reactions to thoughts.
+ Utilize Express.js for routing and handling HTTP requests.
+ Use MongoDB and Mongoose for data storage and modeling.

## Technologies Used

The Social Media Backend API is built using the following technologies:

Node.js
Express.js
MongoDB
Mongoose

## Contributing

Contributions to the Social Media Backend API are currently not open to the public.

## Questions

If you have any questions about this program or would like to report a bug, please contact the author through GitHub:
[GitHub](https://github.com/tg1489/)

Alternatively, you may reach out and email me down below if you have any additional questions about the program:
[Email](mailto:tonyguarino1489@gmail.com)

## License

This application is licensed under the MIT License. See the LICENSE file for more information.