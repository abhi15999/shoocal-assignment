const express=require('express');
const app=express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port=5000;
const mongoose=require('mongoose');
const commentsDb=require('../models/schema');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Database Connection
mongoose.connect('mongodb://localhost:27017/shoocal', {useNewUrlParser: true,useUnifiedTopology: true });
mongoose.connection.on('error',console.error.bind(console,'MongoDB connection error'));


//Routes
app.get('/',(req,res)=>{
    commentsDb.find({})
    .then((data)=>{res.send(data)})
});

app.post('/add',(req,res)=>{
    const name=req.body.name;
    const comment=req.body.comment;
    const upvotes=req.body.upvotes || 0;
    const downvotes=req.body.downvotes || 0;

    commentsDb.create({
        name:name,
        comment:comment,
        upvotes:upvotes,
        downvotes:downvotes
    },
        (err,result)=>{
            if(err){
                res.send(err);
            } else{
                res.send(result)
            }
        }
    );
});

app.post('/up',(req,res)=>{
    const id = req.body.id

    commentsDb.findOne({ _id: id }, (err, result) => {
        if(err) {
            console.log(err)
        }
        result.upvotes += 1;
        result.save((saveErr) => {
            if(saveErr) {
                console.log(saveErr)
            }
            res.send({ upvotes: result.upvotes });
        })

    })
})

app.post('/down',(req,res)=>{
    const id = req.body.id

    commentsDb.findOne({ _id: id }, (err, result) => {
        if(err) {
            console.log(err)
        }
        result.downvotes += 1;
        result.save((saveErr) => {
            if(saveErr) {
                console.log(saveErr)
            }
            res.send({ downvotes: result.downvotes });
        })

    })
})

app.listen(port,()=>console.log(`Server started on ${port}`))