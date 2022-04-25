# Example RabbitMq project using NextJs/API and json-server

The following project is an example/boilerplate using NextJs and its api, and rabbitmq, simulating the backend server with json-server

This is a `NextJs` SPA website to run a local server and add some products / publish a queue on rabbitmq and consume it

# Execute example

## Using node

To execute the example you need to have node installed on your system

- [Node.js](https://nodejs.org/en/)

With the project source code on your pc, you can execute it by going to the root folder of the project and doing the following steps:

### 1. Install dependencies

To install the dependencies you need to execute the following command

```bash
npm i
```

### 2. Execute project

```bash
npm run dev
```

### 3. Create a rabbitmq account or use docker

```
https://www.cloudamqp.com/plans.html
https://hub.docker.com/_/rabbitmq
```

The application will be executed in [http://localhost:3000](http://localhost:3000) (and it will fail in case of having the port 3000 busy) and json server in [http://localhost:5000](http://localhost:5000) (and it will fail in case of having the port 5000 busy) and the consumer in a separate node process
