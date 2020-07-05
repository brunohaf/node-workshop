const express = require('express');
const project_service = require('./services/project-service');
const BaseResponse = require('./models/base-response');

const httpStatus = require('http-status-codes');

const server = express();
server.use(express.json());

server.use((req,res,next) => {
console.log("\n\nINCOMMING REQUEST!!\n\n");
next();
});

//class 7
//  localhost:3000/test
//  Query params = ?teste=1
//  Route params = /users/1
//  Request body = {"name": "teste, "endereco":"teste"};

server.get('/project/:index', (req, res) => {
  //res.query.nome
  //const id = res.params.id || const { id } = res.params
  const {index} = req.params;
  const promise = project_service.getId(index);
  const result = new BaseResponse().populate(promise);
  return res.json(result);
});

server.post('/project/:index/tasks', (req, res) => {
  const body = req.body;
  const {index} = req.params;
  const promise = project_service.addTask(index,body.task)
  const result = new BaseResponse().populate(promise);
  return res.json(result);
});

server.get('/projects/', (req, res) => {
  const promise = project_service.getAll(res);
  const result = new BaseResponse().populate(promise);
  return res.json(result);
});

server.post('/project', (req, res) => {

  let body = req.body;
  const promise = project_service.save(body);
  const result = new BaseResponse().populate(promise);
  return res.json(result);
});

server.listen(3000);