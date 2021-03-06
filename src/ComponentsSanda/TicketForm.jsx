import React, { Component } from "react";
import "./cssSanda/Ticket.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ticketsor from "./img/tickets-or.png";
import TktNavBar from "./TktNavBar";
import EventFooter from "../ComponentsAkila/EventFooter";
import axios from "axios";
import TicketEdit from "./TicketEdit";

const cryptoRandomString = require("crypto-random-string");

class TicketForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tid: cryptoRandomString({ length: 7 }),
      event: "",
      admin: "USR39PEjsh",
      tname: "",
      type: "",
      price: "",
      radstatus: "",
      quant: "",
      events: [],
      admins: [],
      exdate: "",
      batchid:cryptoRandomString({ length: 7 }),
      finance:"",
    };
  }

  componentDidMount() {
    this.fetchEvents();
    this.fetchAdmins();
  }

  fetchEvents = () => {
    axios.get("http://127.0.0.1:8000/events/").then((res) => {
      const events = res.data;
      this.setState({ events });
    });

    // fetch("http://127.0.0.1:8000/events/").then(response => response.json()).then(data => console.log(data))
  };

  fetchAdmins = () => {
    axios.get("http://127.0.0.1:8000/admin-list/").then((res) => {
      const admins = res.data;
      this.setState({ admins });
    });
  };

  inputData = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // this.setState({ radstatus: e.target.value });

    // validation
    if (e.target.name === "quant") {
      if (!Number(e.target.value)) {
        alert("quantity must be a number");
      }
    }

    
   
     //this.setState({ finance });

    console.log(
      this.state.tid,
      this.state.tname,
      this.state.type,
      this.state.price,
      this.state.quant,
      this.state.event,
      this.state.admin
    );
    console.log(this.state.radstatus);
    console.log(this.state.event);
    console.log(this.state.admin);
  };

/*   drop = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.event);
  }; */

  inputAdmin = (val) => {
    console.log(val.target.value)
    this.setState({admin:val.target.value})
  }


  onCreateTicket = () => {
    console.log();
  };

  submitData = (e) => {
    e.preventDefault();

    var tktData = {
      ticket_id: "TKT" + this.state.tid,
      event_id: this.state.event,
      admin_id: this.state.admin,
      tkt_name: this.state.tname,
      tkt_type: this.state.type,
      status: this.state.radstatus,
      price: this.state.price,
      expiration_date: this.state.exdate,
      image: "kfjfjksdbkjsd",
      no_of_tickets: this.state.quant,
    };

    var batchData={
      batch_id:"BID" + this.state.batchid,
      ticket_id:tktData.ticket_id,
      qty:this.state.quant
    }

   /*  const batchTicketData={
      batch_ticket_id:"BTD" +cryptoRandomString({ length: 7 }),
      batch_id: batchData.batch_id,
      cus_id : "",
      availability_status:"available"
    } */

    console.log(tktData);

    var url = "http://127.0.0.1:8000/ticket-create/";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(tktData),
    }).then(response=>console.log(response)).then(()=>{
      /* const batchData={
        batch_id:"BID" + this.state.batchid,
        ticket_id:tktData.ticket_id,
        qty:this.state.quant
      } */
      fetch("http://127.0.0.1:8000/batch-create/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(batchData),
      }).then(response => console.log(response))
      
    }).catch(err=>console.log(err))

    setTimeout(function () {
            for(var i=0; i<batchData.qty; i++){
        //console.log('count', i)

       const batchTicketData={
          batch_ticket_id:"BTD" +cryptoRandomString({ length: 7 }),
          batch_id: batchData.batch_id,
          cus_id : "",
          availability_status:"available"
        } 

        console.log(batchTicketData)

         fetch("http://127.0.0.1:8000/batchTicket-create/",{
        method:"POST",
        headers: {
          "Content-type":"application/json",
        },
        body: JSON.stringify(batchTicketData),
      }).then(response=>console.log(response.status)).catch(err=>console.log(err))

      }  
    },3000)




      //data dismiss in form
      this.handleInputs()

      //batch

    /*   const batchData={
        batch_id:"BID" + this.state.batchid,
        ticket_id:tktData.ticket_id,
        qty:this.state.quant
      } */

      console.log("batch before fetch")
      
     /*  fetch("http://127.0.0.1:8000/batch-create/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(batchData),
      }).then(response=>console.log(response.status)).catch(err=>console.log(err))
 */
      console.log(batchData)


      //batch ticket

      /* var batchTicketList=[]

      for(var i=0; i<parseInt(this.state.quant); i++){
        console.log('count', i)

        const batchTicketData={
          batch_ticket_id:"BTD" +cryptoRandomString({ length: 7 }),
          batch_id: batchData.batch_id,
          cus_id : "",
          availability_status:"available"
        }

        console.log(batchTicketData)

        batchTicketList.push(batchTicketData)

      }

      fetch("http://127.0.0.1:8000/batchTicket-create/",{
        method:"POST",
        headers: {
          "Content-type":"application/json",
        },
        body: JSON.stringify(batchTicketList),
      }).then(response=>console.log(response.status)).catch(err=>console.log(err)) */
     

  };


  handleInputs = () => { 
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );

    this.setState({
      event: [{}],
      tname: [{}],
      admin: [{}],
      type: [{}],
      price: [{}],
      quant: [{}],
      exdate: [{}],
    })
  }


  //price validation - demo
  handleChange = (e) => {
    const finance = (e.target.validity.valid) ? e.target.value : this.state.finance;
    this.setState({ finance });
  
  }



  pageRefresh() {
    window.location.reload(false);
  } 


 
  render() {
    return (
      <div>
        <div
          style={{
            background: "linear-gradient(to bottom, #ccffff 0%, #ffffff 100%",
          }}
        >
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <TktNavBar
                link1="Home"
                link2="Ticket Details"
                link3="Reservation Details"
              />
            </div>
          </div>

          {/*Create Ticket Topic in Create Ticket Page */}
      
          <div className="row" style={{marginLeft: "15px",}}>
            <h2 style={{ fontFamily: "sanseriff", fontWeight: "bold", textAlign:"center"}}>
              Create Ticket
            </h2>
          </div>




          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div className="container">

                <form className="formstyle" onSubmit={this.submitData}>

                  <div className="row">
                    <div className="col-3">
                      <label for="fname">Ticket Name:</label>
                    </div>
                    <div className="col-5">
                      <input className="form-control" onChange={this.inputData} type="text" id="tname" name="tname" placeholder="Ticket Name" required/>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-3">
                      <label for="type">Ticket Type:</label>
                    </div>
                    <div className="col-5">
                      <input className="form-control" onChange={this.inputData} type="text" id="type" name="type" placeholder="Type" required/>
                    </div>
                  </div>

                  {/*price value , onInput-bind, pattern */}
                  <div className="row">
                    <div className="col-3">
                      <label for="type">Ticket Price:</label>
                    </div>
                    <div className="col-5">
                      <input className="form-control" pattern="[0-9]*" onChange={this.inputData} type="text" id="price" name="price" placeholder="Rs.1000/=" onInput={this.handleChange.bind(this)} value={this.state.finance} required />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-3">
                      <label for="type">Ticket Status:</label>
                    </div>
                    <div className="col-5">

                      <label className="radioText">
                        Available:
                        <input onChange={this.inputData} type="radio"  name="radstatus" value="Available"/>
                      </label>

                      <label className="radioText">
                        Not Available:
                        <input onChange={this.inputData} type="radio" name="radstatus"  value="Not Available"/>
                      </label>

                    </div>
                  </div>

                  <div className="row">
                    <div className="col-3">
                      <label for="type">Ticket Quantity:</label>
                    </div>
                    <div className="col-5">
                      <input className="form-control" onChange={this.inputData} type="text" id="quant" name="quant" placeholder="100" required/>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3">
                      <label for="event">Image:</label>
                    </div>
                    <div class="col-5"> {/*check here the image value */}
                      <input onChange={this.inputData} type="file" id="quant" name="quant" placeholder="100"/>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3">
                      <label for="event">Expiration Date:</label>
                    </div>
                    <div class="col-5">
                      <input className="form-control" onChange={this.inputData} type="date" id="exdate" name="exdate" required/>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3">
                      <label for="event">Event</label>
                    </div>
                    <div class="col-5">
                      <select onChange={this.inputData} id="event" name="event">
                         <option value="default">select value</option>
                        {this.state.events.map((ev) => {
                          const evId = ev.event_id;

                          return (
                            <option value={ev.event_id}>{ev.event_id}</option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3">
                      <label for="event">Admin</label>
                    </div>
                    <div class="col-5">
                      <select onChange={this.inputAdmin} id="admin" name="admin">
                        <option value="default">select value</option>
                        {this.state.admins.map((ad) => {
                          return(<option value={ad.id}>{ad.username}</option>)
                        })}
                      </select>
                    </div>
                  </div>

                  <button onDoubleClick={this.pageRefresh} type="submit" className="btn btn-primary">
                    <p style={{color: "white",fontFamily: "times new roman",fontSize: "20px"}}>
                      Create Ticket
                    </p>
                  </button>

                </form>

              </div>
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
              <img src={ticketsor} alt="Third slide" style={{ width: "450px"}} />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <h2 style={{ fontFamily: "sanseriff", fontWeight: "bold" }}>
                Ticket Details
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ marginTop: "40px" }}>
              <TicketEdit/>
            </div>
          </div>

          <EventFooter />

        </div>
      </div>
    );
  }
}

export default TicketForm;
