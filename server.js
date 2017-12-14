//Express
var express = require('express');
//DB
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/integrationDB');
var TaskSchema = new mongoose.Schema({
    name: {type: String, required:true, minlength:2},
    req_goal: {type: String, required: true, minlength:4}
},{timestamps:true});
mongoose.model('Task',TaskSchema);
var Task = mongoose.model('Task');
//Path
var path = require('path');
//App
var app = express();
//Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Static Directory
app.use(express.static(path.join(__dirname, '/angular-app/dist')));

// var routes_setter = require('./server/config/routes.js');
// routes_setter(app);

//Obj
const errors = {
    serverFault: {'error': {'message': 'Server Faulted','status': 500} },
    unprocessableEntity:{'error':{'message':'Unprocessable Entity','status':422}}
};
//Routes
app.get('/', function(req,res){
    res.render('index');
})
        //Get All Tasks
app.get('/tasks', function(req, res){
    Task.find({}, function(err,tasks){
        if(err){
            res.json(errors.serverFault);
        } else {
            res.json(tasks);
        }
    })
})
        //Post To Task
app.post('/tasks', function(req, res){
    console.log(req.body);
    var newTask = new Task()
    newTask.name = req.body.name
    newTask.req_goal = req.body.req_goal
    newTask.save(function(err,result){
        if (err){
            res.json(errors.unprocessableEntity);
        }else{
            console.log('Success');
            res.json(result);
        }
    })
})
        //Delete Task
app.delete('/delete/:id', function(req, res){
    Task.remove({_id:req.params.id}, function(err,result){
        if(err){
            console.log(err);
            res.json(errors.serverFault);
        }else {
            res.json(result);
        }
    })
})
        //Edit Task
app.put('/edit/:id', function(req, res){
    console.log(req.params.id + ' ' + req.body.req_goal + ' in DB')
    Task.update({_id:req.params.id}, {req_goal :req.body.req_goal}, function(err){
        if(err){
            res.json(errors.unprocessableEntity);
        }
    })
})

app.get('/findone/:id', function(req,res){
    console.log('successfully hit server for find one, with id: ' + req.params.id)
    Task.findOne({_id:req.params.id}, function(err,result){
        if (err){
            res.json(errors.serverFault)
        }else{
            console.log(result);
            res.json(result);
        }
    })
})
app.all('*', function(req, res){
    res.sendFile(path.resolve('./public/dist/index.html'))
})





//Listening 
app.listen(8000,function(){
    console.log('Integration Test App loaded on port 8000!');
})