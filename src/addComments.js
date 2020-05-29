import React, { Component } from 'react'


export default class addComments extends Component {

    constructor(props){
        super(props);
        this.state={name:"",comment:"",upvotes:"",downvotes:""}
    }

    nameHandler=(e)=>{
        this.setState({name:e.target.value})
    }

    commentHandler=(e)=>{
        this.setState({comment:e.target.value})
    }
    onSubmitHandler=()=>{
        const data={
            name:this.state.name,
            comment:this.state.comment,
            upvotes:this.state.upvotes,
            downvotes:this.state.downvotes
        };
        console.log(JSON.stringify(data));
        fetch('http://localhost:5000/add',{
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(console.log('Data Stored'))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                <label>Enter Name</label>
                <input onChange={this.nameHandler} value={this.state.name}/><br/>
                
                <label>Comment</label>
                <input onChange={this.commentHandler} value={this.state.comment}/><br/>
                <button type="submit">Post</button>
                </form>
            </div>
        )
    }
}
