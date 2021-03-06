/** @format */

import React, { Component } from "react";
import invoicepic from "../Images/invoicepic.jpg";
import { DatePicker, Radio, Upload, message,Alert,notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { shadows } from '@material-ui/system';
import axios from 'axios';
import KajanNav from "./KajanNav";
import "./Css/kajan.css";
import { Link } from 'react-router-dom';








const cryptoRandomString = require('crypto-random-string')

class InvoiceAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: 1,
        invoiceid: cryptoRandomString({length:7}),
        ordername: "",
        paytype:'',
        amount: "",
        status: false,
        date: "",
        amountVal:false,
        formErrors: {
          ordername: "",
          status: "",
          paymenttype: "",
          amount: "",
      },
    };
  }

  
  handleChange = (e) => {
    const { name, value } = e.target;


    
  


   
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "ordername":
        formErrors.ordername =
          value==""? notification.error:"";
        break;
      case "amount":
        formErrors.amount =
          value.length=="" ? "Required Data" : "";
        break;
        case "paymenttype":
          formErrors.paymenttype =
            value.length==""? "Required Data" : "";
      
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    this.setState({status: !this.state.status});

    console.log(
      this.state.invoiceid,
      this.state.ordername,
      this.state.paymenttype,
      this.state.status,
      this.state.amount
    );
    console.log(this.state.status);
    
  };

  handledata = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  validateAmount = () => {
    let amount = this.state.amount;
    if (isNaN(amount)) {
    notification.error({
      message:"Error",
      description:"Amount should be in number",
      
    }
        
      );
    
    } else {
      this.setState({amountVal: true });
    }
  };
  validateName = (e) => {
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    let ordername = this.state.ordername;



    if (formErrors.ordername = value =="") {
    notification.error({
      message:"Error",
      description:"Order Name is Required",
      
    }
        
      );
      
    
    }
      else {
      this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }
  };
  onCreateInvoice = () => {
    console.log();
  };

  sendData = (e) =>{
    e.preventDefault();
    var stat = '';
    if(this.state.status == true){
      stat = "Unsuccess"
    }
    else{
      stat="success"
    }

    
    const data = {
      invoice_id : "INV" + this.state.invoiceid,
      order_name : this.state.ordername,
      amount : this.state.amount,
      inv_status : stat,
      payment_type : this.state.paytype,
      date : this.state.date
    }
   
    console.log("shipping data" , data)

    fetch("http://127.0.0.1:8000/invoice-create/",{
      method:'POST',
      headers:{
        'Content-type' : 'application/json',
      },
      body:JSON.stringify(data)
    }).then(res => console.log(res.status)).catch(err => console.log(err))
    message.success(
      "Invoice created Successfully"
      
    
        
      );
  }





  

  render(){

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };
  const { value } = this.state;
  
  const { formErrors } = this.state;

  
    return (
      <div>
        <div>
          < KajanNav/>
        </div>
        <div className='row'>
          <div className=' col-sm-6 col-md-6 col-lg-6'>
            <div class='container py-3'>
              <div class='row'>
                <div class='mx-auto col-sm-12'>
                  <div class='card shadow p-3 mb-5 bg-white rounded' style={{height:"600px", top:"60px", left:"20px"}}>
                    
                    <div class='card-body'>
                        <div className="row">
                            <div style={{color:"blue"}} className="col offset-md-4">
                        <h4>Create Invoice</h4>
                        </div>
                        </div>
                      <form onSubmit={this.sendData}>
                        <div class='form-group'>
                          <label className="label">
                            Order name
                          </label>
                          
                          <input
                className='form-control'
                className={formErrors.ordername.length > 0 ? "error" : null}
                placeholder='Order Name'
                type='text'
                name='ordername'
                
                onChange={this.validateName}
              />

              {formErrors.ordername.length > 0 && (
                <span className='errorMessage'>{formErrors.ordername}</span>
              )}
              </div>
                          
                          
                        
                        <div class='form-group'>
                          <label>
                            Amount
                          </label>
                          

                          
                          <input
                className='form-control'
                className={formErrors.amount.length > 0 ? "error" : null}
                placeholder='Amount'
                type='text'
                name='amount'
                onBlur={this.validateAmount}
                onChange={this.handledata}
                
              />

              {formErrors.amount.length > 0 && (
                <span className='errorMessage'>{formErrors.amount}</span>
              )}
                          
                        </div>
                        <div class='form-group'>
                          <label>
                            Payment date
                          </label>
                          <div class='col-lg-9 col-md-9 col-sm-9'>
                          <input type="date" id="birthday" name="date" onChange={this.handleChange}/>
                          </div>
                        </div>
                        <div class='form-group' >
                          <label>
                            Payment type
                          </label>

                          
                          <select
                          name="paytype"
                  className='form-control'
                  onChange={this.handleChange}
                  defaultValue='Select Time Period'
                  >
                  <option defaultValue></option>
                  <option value='Pay here'>Pay here</option>
                  <option value='Cash'>Cash</option>
                </select>
                        
                        </div>
                        <div class='form-group'>
                          <label>
                            Status
                          </label>
                          
                          <div className="col">
                            
                          
                          <input
               
                
                type='radio'
                name='status'
                noValidate
                onChange={this.sendData}
              />
              <label>Success</label>
              </div>
              <div class='col'>
                          
                          
                          <input
               
                
                type='radio'
                name='status'
                noValidate
                onChange={this.handleChange}
              />
              <label>UnSuccess</label>
              </div>
                
                          </div>
                        
                        <div class='form-group row' >
                          <div className='col-lg-12 offset-sm-4 mt-4' >
                          
                          </div>
                          

                          
                        </div>

                       <Link to="/invoice"><input className="btn btn-md btn-block  button-submit" value="Submit" type="submit"></input></Link>

                        
                        
                        
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className='col-sm-9 mt-6 col-md-6 col-lg-6'>
            <img style={{width:"90%",top:"40px",right:"-30px",position:"relative"}}src={invoicepic}></img>
          </div>
        </div>
      </div>
    );
  }
}

export default InvoiceAdd;
