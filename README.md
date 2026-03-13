# Coolify Guestbook Example

This is a simple guestbook application designed to demonstrate a complete deployment setup for [Coolify](https://coolify.io).

It includes:
*   A **Node.js/Express** backend
*   A **React** frontend
*   A **PostgreSQL** database
*   **Docker** containerization (`Dockerfile` and `docker-compose.yml`)
*   A basic **GitHub Actions** CI workflow

## How to Run Locally

1.  Make sure you have [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed.
2.  Clone the repository.
3.  Run the following command from the project root:

    ```bash
    docker-compose up --build
    ```
4.  The application will be available at [http://localhost:3000](http://localhost:3000).

## How to Deploy with Coolify

1.  Push this repository to your GitHub account.
2.  In your Coolify instance, create a new "Application" resource and connect it to your GitHub repository.
3.  Coolify should automatically detect the `Dockerfile`.
4.  Create a new "PostgreSQL" resource in Coolify to be your database.
5.  In your Application's settings in Coolify, link the PostgreSQL database. This will automatically provide the `DATABASE_URL` environment variable to your application.
6.  Trigger a deployment. Coolify will build the Docker image and deploy it.
