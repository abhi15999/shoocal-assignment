import React, { Component } from 'react'
import {Row,Col,Container} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



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
                                <Container>
                                <Row>
                                <article className="commentbox" key={d._id}>
                                    <Row>
                                     <Col>   
                                    <Row>
                                    <h3 className="commentname">{d.name}</h3>
                                    </Row>
                                    <Row>
                                    <p className="commentbody">{d.comment}</p>
                                    </Row>
                                    </Col>
                                        <Col>
                                        <button className="upvotebutton" onClick={()=>this.upvoteHandler(d._id,1)}>Upvote</button>{d.upvotes}  
                                        <button className="downvotebutton" onClick={()=>this.downvoteHandler(d._id,-1)}>Downvote</button>{d.downvotes}
                                        </Col>
                                    </Row>
                                    
                                </article>
                                </Row>
                                <br/>
                                </Container>
                                
                                )}


                        </div>

                    )
            }
    }
}
