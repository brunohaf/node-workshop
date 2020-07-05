const Project = require('../models/project');
const ErrorPayload = require('../models/error-payload');
const ProjectResponse = require('../models/projects-response');

const anchor = new Project(0,"anchor",[{"title":"taskAnchor"}]);         

let allProjects = [];
allProjects.push(anchor);
let testeProjects = new ProjectResponse(allProjects);

const getId = (id) =>{
  try{
    return testeProjects.list[id];
  }  catch(e){
    return res.send( "Fetching has failed from the origin:\t" + error.errors[0].origin +
    "\nError Message:\t" + error.errors[0].message )
  };
}

const getAll = (res) => {
  try{
    return allProjects
  }
  catch(e){
    return res.send( "Fetching has failed from the origin:\t" + error.errors[0].origin +
    "\nError Message:\t" + error.errors[0].message )
  };
}

function save(bodyProject){
  try{
    let myProject = new Project(bodyProject.id,bodyProject.title, bodyProject.tasks);
    if(allProjects.find(p => p.title == myProject.title)){
      throw exception;
    }
    else{
      bodyProject.id = allProjects.length;
      allProjects.push(myProject);
      return allProjects.indexOf(myProject) == bodyProject.id; 
    }
  }
  catch(e){
    return new ErrorPayload(500, "This project is a duplicate!")
  };
}

function kill(id){
  try{
  const projectReference = allProjects.find( p => p.id == id);
  const beginning = allProjects.slice(0,id-1);
  const end = allProjects.slice(id+1,allProjects.length)
  allProjects = beginning.concat(end);
  return allProjects[id] == projectReference;
  }
  catch(e){
    return res.send( "Fetching has failed from the origin:\t" + error.errors[0].origin +
    "\nError Message:\t" + error.errors[0].message )
  };
}

function changeTitle(id, title){
  try{
    allProjects[id].title = title;
    return allProjects[id].title == title;
  }
    catch(e){
    return res.send( "Fetching has failed from the origin:\t" + error.errors[0].origin +
    "\nError Message:\t" + error.errors[0].message )
  };
}

function addTask(id,task){
  try{
    if(allProjects.length < id){
      throw exception;
    }
    let response = allProjects[id].tasks.push(task) == allProjects[id].tasks.length;
    return response;
  }
  catch(e){
    return new ErrorPayload(400,"Invalid Project Id");
  };
}

module.exports = { getId,
  save,
  getAll,
  kill,
  changeTitle,
  addTask
};