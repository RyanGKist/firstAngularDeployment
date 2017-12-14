var mongoose = require('mongoose');
var Task = mongoose.model('Task'); 
var Tasks= require('../controllers/quotes.js');

module.exports = function(app){
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
    Tasks.show.json(r);
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
app.all('*', function(req, res){
    res.sendFile(path.resolve('./public/dist/index.html'));
})
})
}