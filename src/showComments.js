import React, { Component } from 'react'


export default class showComments extends Component {

    constructor(props){
        super(props);
        this.state={loading:false,data:[],upvotes:"",downvotes:"", reload: true}
    }

    upvoteHandler=(id,num)=>{

        const data = {id, num}

        fetch('http://localhost:5000/up',{
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(data => {
            console.log(data);
            this.componentDidMount();
        })
    }

    downvoteHandler=(id,num)=>{

        const data = {id, num}

        fetch('http://localhost:5000/down',{
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(data => {
            console.log(data);
            this.componentDidMount();
        })
    }

    componentDidMount(){
        fetch('http://localhost:5000/')
        .then(res=>res.json())
        .then(comments=>{
            this.setState({loading:true,data:comments});
            return;
        })
    }

    render() {
        let {loading,data}=this.state

        if(!loading){
            return(
                <div>
                    <h1 style={{textAlign:"center"}}>Loading</h1>
                </div>
            )
        }
            else{
                    return(

                        <div>

                            {data.map(d=>
                                
                                <article key={d._id}>
                                    <h1>{d.name}</h1>
                                    <p>{d.comment}</p>
                                    <div>
                                        <button onClick={()=>this.upvoteHandler(d._id,1)}>Upvote</button>{d.upvotes}
                                    </div>
                                    <div>
                                        <button onClick={()=>this.downvoteHandler(d._id,-1)}>Downvote</button>{d.downvotes}
                                    </div>
                                </article>
                                
                                )}


                        </div>

                    )
            }
    }
}
