const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var url_encoded = bodyParser.urlencoded({extended:false});
//var data = [{item:'coding'},{item:'rest'},{item:'coding'}];
//connect to database 
mongoose.connect('mongodb://db_user_1234:db_user_1234@ds133601.mlab.com:33601/my_todo_db');
var todo_schema = new mongoose.Schema({
    item:String
});
var Todo = mongoose.model('Todo',todo_schema);
module.exports = function(app){
    //get data from mongodb and pass it to the view
    app.get('/todo', function(req,res){
         // we want all the data -> empty object
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{ret_data : data})
        });
});
    //get data from view and add it to mongodb
    app.post('/todo',url_encoded, function(req,res){
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            console.log(req.url);
            res.render('todo',{data:data});
});
    });

    app.delete('/todo/:item', function(req,res){
    //delete the requested item from mongodb
    Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
        if (err) throw err;
        res.json(data);
    });
});
};