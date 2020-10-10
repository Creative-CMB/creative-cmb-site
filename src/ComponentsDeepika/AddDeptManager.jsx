import React, { Component } from 'react';
import { Card } from 'antd';
import EmployeeSideNavBar from './EmployeeSideNavBar';
import axios from 'axios';

export default class AddDeptManager extends Component {

        constructor(props) {
            super(props);
            this.state = { 
                deptId:[],
                empIdd:'',
                emp_id:'',
                dept_id:'',
                from_date:'',
                to_date:''                
             }
        }

    
        componentDidMount(){
            this.fetchdm();
        }

        fetchdm = () =>{
            axios.get("http://127.0.0.1:8000/deptManager-list/").then(res=>
            {
                const deptId=res.data;
                this.setState({deptId});
            })
        }

        fetchid = () =>{
            axios.get("http://127.0.0.1:8000/deptManager-list/").then(res=>
            {
                const deptId=res.data;
                this.setState({deptId});
            })
        }

       
        formData = (e) => {
            this.setState({ [e.target.name]: e.target.value });
            this.setState({ radstatus: !this.state.radstatus });

            console.log(
                this.state.dept_id,
                this.state.from_date, 
                
            );
            console.log(this.state.radstatus);
            console.log(this.state.event);
        };

        drop = (e) =>{
            this.setState({[e.target.name]:e.target.value})
            console.log(this.state.event)
        }

        onCreateEmp = () => {
            console.log();
        };

        formSubmit  = (e) =>{
            e.preventDefault();
        

        const dmData ={
            emp_id : this.state.emp_id,
            dept_id : this.state.dept_id,
            from_date : this.state.from_date,
            to_date : this.state.to_date,

        };

        console.log(dmData)

        var url = "http://127.0.0.1:8000/deptManager-Create/";

        fetch(url,{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(dmData)

        }).then((response)=>{
            alert(response)
        }).catch(function(err){
            alert(err)
        })
    }
       
       
    render() {
        return (
            <div>

            <div className="row">
        
            <div className="col-lg-1.5 side" 
                style={{
                    backgroundColor:"LightBlue",
                    height:"700px"}}
                    >
                {/*Navigation bar */}
                <br></br>
                <EmployeeSideNavBar />
            </div>

            <div className="col main">
            {/*Middle page components */}
            <br></br>
                <h1   
                    style={{
                        color: "DodgerBlue",
                        fontSize: '30px',
                        fontWeight:"bold"}}
                        ><center>ADD MANAGERS FOR DEPARTMENTS</center>
                </h1>
                <br></br><br></br><br></br><br></br>
                <form onSubmit= {this.formSubmit}
                    style={{
                        fontSize: '15px',
                        fontWeight:"bold"}}
                        >
                <Card style={{ width: 600 }}>
                
                    Employee ID : <input style={{border: "3px solid #ccc",float: "right",width: "68%",height:30}} type="text" onChange= {this.formData} name="emp_id"></input><br></br><br></br>
                    Department ID : <select onChange={this.formData} id="dept" name="dept_id" style={{border: "3px solid #ccc",height:30,float: "right",width: "68%"}}>
                                        {this.state.deptId.map((e) =>{
                                            const dmId = e.id;
                                            const dmName = e.username;

                                            return(
                                            <option value={e.id}>{e.username}</option>
                                            );
                                        })}
                            </select><br></br><br></br>
                    From : <input style={{border: "3px solid #ccc",float: "right",width: "68%",height:30}} type="date"onChange= {this.formData} name="from_date"></input><br></br><br></br>
                    To : <input style={{border: "3px solid #ccc",float: "right",width: "68%",height:30}} type="date"  onChange= {this.formData} name="to_date"></input><br></br><br></br>   
                
                </Card>
                </form>
                <div>
                <br></br><br></br><br></br>

                <input style={{width:"100%", cursor: "pointer",backgroundColor:"DodgerBlue",border:"none",padding:"12px 28px",margin:"2px 1px",borderRadius:"2px",fontWeight:"bold"}} type="submit" value="Add Manager"></input>
                </div>
                </div>
            </div>
            </div>
        )
    }
}