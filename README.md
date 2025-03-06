# Movies Vault

## Table of Content

- [About this Application](#about-this-application)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [General](#general)
- [How does the application work](#how-does-the-application-work)
- [Running this application locally and testing](#running-this-application-locally-and-testing)
  - [Using Docker Compose](#using-docker-compose)
    - [Prerequisites](#prerequisites)
    - [Start the Application locally](#using-docker-compose-start-the-application-locally)
    - [Shutting down the Application](#using-docker-compose-shutting-down-the-application)
  - [Using npm](#using-npm)
    - [Prerequisites](#prerequisites-1)
    - [Run the Application's Unit tests](#using-npm-run-the-applications-unit-tests)
    - [Start the Application locally](#using-npm-start-the-application-locally)
    - [Shutdown the Application](#using-npm-shutdown-the-application)
  - [TroubleShooting](#troubleshooting)
  - [Some Decisions/Assumptions Made](#some-decisionsassumptions-made)

## About this Application

This application enables users to create blog posts, edit existing blog posts, delete such blog posts, and search through a list of existing blog posts.

### Frontend

- This project enables users to view a list of all created blog posts (rendered on a table)
- User can choose to edit such blog posts from the table, by clicking on the action button on the last column, and selecting the `edit` option on the displayed tooltip
- User can choose to delete a blog posts by cliking on the action button on the last column, and selecting the `delete` option on the displayed tooltip
  - User would always get a feedback (a toast message at the top of the page) displaying whether such delete request succeeds or fails
  - User can use the checkbox on the first column of the first row to select all blog posts
- User can search use the search bar to search for a specific blog post
  - Please note that the search is debounced, and handled by the backend (json-server)
- User can create a new blog posts by clicking on the `Create new Post` button on the Home Page (right next to the search bar)

### Backend

- The Application's backend uses a simulated mockAPI
- The backend uses [`json-server`](https://www.npmjs.com/package/json-server) to provide a fake REST API for the `posts` endpoint
  - Hence, all displayed blog posts are not real
  - Queries made to the backend to filter particular blog posts may not work as expected, but you can find the requests on the `network tab` if you'd like to see
  - The data used by `json-server` can be found in [db.json](./src/utils/mockServer/db.json) which I generated using [setupDb.ts file](./src/utils/mockServer/setupDb.ts)

### General

- This application is accessible on all types of devices (mobile and desktop)
- It is built with

  - [Vue v3.5.13](https://www.npmjs.com/package/vue)
  - [Typescript](https://www.typescriptlang.org/)
  - [Docker](https://docs.docker.com/compose/install/)
  - [Axios](https://www.npmjs.com/package/axios) for Handling Network requests
  - Styled with CSS
  - Scaffolded with [CreateVite](https://www.npmjs.com/package/create-vite)
  - Bundled with [Vite](https://www.npmjs.com/package/vite)
  - Routing is managed with [Vue Router](https://www.npmjs.com/package/vue-router)
  - [Quil](https://www.npmjs.com/package/quill) for the Text Editor

- The application is tested (Unit tests) using:
  - [Vitest](https://www.npmjs.com/package/vitest) and,
  - [Vue test-utils](https://www.npmjs.com/package/@vue/test-utils)

## How Does the application work

As mentioned earlier, this application user to perform basic CRUD activities on blog Posts (e.g. viewing a list of existing blog Posts, creating new blog posts, deleting and editing existing posts)

<br />
<br />

> [!NOTE] Please ensure that port `5173` and port `3000` are free and available for use on your machine as these are the ports used in this application
>
> - Port 5173: Frontend
> - Port 3000: Backend

## Running this application locally and testing

1. Open your workspace terminal
2. Clone this repository
3. Cd into the cloned repository
4. There are two ways you can start or test this application locally:

### Using Docker Compose:

#### Prerequisites:

1.  [Docker](https://docs.docker.com/get-docker/)
2.  [Docker Compose](https://docs.docker.com/compose/install/)

#### Using Docker Compose: Start the Application locally

1. To start the application with docker-compose, simply run (on MacOS):

```
docker-compose up
```

1. To start the application with docker-compose, simply run (on Ubuntu):

```
sudo docker compose up
```

Visit [`localhost:5173`](localhost:5173) on your favourite browser to view the application

#### Using Docker Compose: Shutting down the Application

1. Press `Cmd + C` on a MacOS or `Ctrl+ C` on Ubuntu to stop the application
2. Run (on MacOS):

```
docker-compose down
```

2. Run (on Ubuntu):

```
sudo docker compose down
```

### Using npm:

#### Prerequisites:

1. [Node](https://nodejs.org/en/) at least v21.7.3
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### Using npm: Run the Application's Unit tests

1. Install the dependencies with:

```
npm install
```

2. Run the tests with:

```
npm test
```

#### Using npm: Start the Application locally

1. Install the dependencies with:

```
npm install
```

2. Start the application with:

```
npm start
```

Visit [`localhost:5173`](localhost:5173) on your favourite browser to view the application

#### Using npm: Shutdown the Application

1. Press `Cmd + C` on MacOs or `Ctrl + C` on Ubuntu to stop the application

## TroubleShooting:

1. Be sure to confirm that you do not have another project running on [`port 3000`](localhost:3000) and [`port 5173`](localhost:5173) before running this application
2. Seeing an Error like this error when trying to install depdencies on Ubuntu?

```
Error: EACCES: Permission denied, mkdir '/<file_path>
```

Solution:

- Run `rm -rf node_modules` in the repository and then `npm install` again
  Why did that happen?: Well, it's possible that you had ran `docker-compose` earlier

### Some Decisions/Assumptions Made:

1. In a real-life system, this would use a State management library to avoid making multiple calls to the API that are less likely to change
2. The search might be handled better by a backend API, such search request would have to be debounced from the frontend, to avoid more unncessary calls.
3. The backend (API_URL) was intentionally exposed on this application to make the access easier in one command without having to set up any config which might introduce an inconvience for users
   - In a Production application, this would be stored and accessed using secret management tools like a `.env` file
