import React, { Component } from 'react';
import "./Css/kajan.css";







class PaymentCard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          invoice:[],
          ordername:"",
         }
    }

    fetchDetails = () =>{
      console.log('fetching...')
  
      fetch('http://127.0.0.1:8000/invoices/INV01af924/')
      .then(response => response.json())
      .then(data => 
        this.setState({
          invoice:data
        }) 
        )
        
    }

     componentDidMount(){
      this.fetchDetails();
    }

    
    
    render() { 

        return ( 
            <div className="payment-wrapper">

<div className="Total"><h4>Total Bill</h4></div>

                <table style={{widt:"100%"}}>
            <tr>
              <th></th>
              <th>Price</th> 
            </tr>
            <tr>
        <td>Pepsi</td>
              <td>5000</td>
            </tr>
           

            <tr>
              <td><h5>Total</h5></td>
              <td>5000</td>
            </tr>
            <button></button>
          </table>
          
                
                
            </div>
         );
    }
}
 
export default PaymentCard;