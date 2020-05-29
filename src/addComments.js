import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';



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
            <div className="container">
            <form onSubmit={this.onSubmitHandler}>
               
                    <div className="row form-group">
                        <label style={{padding:"10px"}}>Name</label><br/>
                        <input type="form-control" placeholder="Enter Name" onChange={this.nameHandler} value={this.state.name}/>
                    </div>
                    <div className="row form-group">
                        <label style={{padding:"2px"}}>Comment</label><br/>
                        <textarea placeholder="Comment" type="form-control" onChange={this.commentHandler} value={this.state.comment}/>
                    </div>
                    <div style={{paddingLeft:"20%"}}>
                        <button className="btn btn-outline-primary btn-lg" type="submit">Submit</button>
                    </div>
    
            </form>
            </div>
        )
    }
}
