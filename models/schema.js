const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Schema
const commentSchema= new Schema({
    name: String,
    comment: String,
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    }
});


//Model
const Comments=mongoose.model('Comments',commentSchema, '');
module.exports=Comments;

