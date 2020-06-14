import { ApolloServer } from "apollo-server";
//const { ApolloServer } = require('apollo-server-express');
import { schema } from "./src/schema";

import dotenv from 'dotenv';
import mongoose from 'mongoose';

import middleware from './src/middleware/auth.js'

dotenv.config();
// se connecter à la BDD mongoose
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

//Pass the schema to ApolloServer
const server = new ApolloServer({ schema })

//Launch the server
server.listen().then(({ url }) => {
  console.log(`==> 🚀  Server ready at ${url} `);
});

/*
const app = require('express')();
app.use(middleware);
server.applyMiddleware({ app });

app.listen({ port: 4000 });*/