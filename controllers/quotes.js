

var mongoose = require('mongoose');
var Task = mongoose.model('Task');

module.exports = {
  show: function(req, res) {
    Task.find({}, function(err,tasks){
        if(err){
            res.json(errors.serverFault);
        } else {
            res.json(tasks);
        }
    })
    
  create: function(req, res) {
    var quote = new Quote({name: req.body.name, quote: req.body.quote});
    quote.save(function(err) {
      if(err){
        console.log("something went wrong");
      } else {
        res.redirect('/main');
      }
    })
  }
}
