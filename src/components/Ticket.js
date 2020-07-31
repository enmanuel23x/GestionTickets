// Importing needed components
import React from 'react';
import {Button, List, Divider, Typography, Empty, Input, Modal} from 'antd';
import config from '../config/config'
import https from 'https';


// Constants
const {Search} = Input;


// Axios Defaults
const axios = require('axios').default;
axios.defaults.baseURL = config.backURL;
const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

// Locale var (Empty list)
let noTicket = {
    emptyText: (<Empty description = {
        <span>
          Buscar un Ticket ID
        </span>
      }
      />),
};


// Exported Component
class Ticket extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
          list: [],
          ticket_id: '',
          buttonState: false,
          visible: false
        };
        this.getTicketInfo = this.getTicketInfo.bind(this);
        this.processTicket = this.processTicket.bind(this);
      };
    // Functions
    // Get ticket info and insert into QA database (only if applies)
    getTicketInfo(id){
    let obj = this;
    let data = []
    let entireList = []
    obj.setState({list: entireList[0]})
    console.log(id)
    axiosInstance.get('/tickets/get_ticket/'+id)
    .then(async function (response) {
      console.log(response.data)
      if (response.data !== "ERROR") {
        for (let [key, value] of Object.entries(response.data.glpi[0])) {

          if (key === "Id Ticket"){
            obj.setState({ticket_id: value})
          }

          if (key !== "Descripción"){
            data.push([key, value])
          }
        }
        entireList.push(data)
        entireList[0].splice(0, 1)
        // set data into list
        obj.setState({list: entireList[0]})
        // enable button
        obj.setState({buttonState: true})
      } else {
          obj.setState({ticket_id: "Ticket no encontrado"})
          // disabel button
          obj.setState({buttonState: false})
      }
    })
    .catch(function (error) {
        // handle error
        console.log("Error: ", error);
    })
    .then(function () {
        // always executed
        // console.log("Data successfully fetched")
    });
  }

    // test
    processTicket(){
      let obj = this;

      console.log(obj.state.list)
      console.log(obj.state.ticket_id)
    }



    showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

render(){
  return (
    <div>
    <Search
      placeholder="Ingrese Ticket ID"
      onSearch={id => this.getTicketInfo(id)}
      size = "large"
      allowClear
    />
    <Divider orientation = "center"> Detalles de Ticket </Divider>
     <List
      size="small"
      locale = {noTicket}
      header = {<div> <strong>TICKET:</strong> {this.state.ticket_id} </div>}
      bordered
      dataSource = {this.state.list}
      renderItem = {
        item => (
          <List.Item >
            <Typography.Text strong> {item[0]}: </Typography.Text> {item[1]}
          </List.Item>
        )
      }
      />
      {this.state.buttonState === false ?
          <Button size="large" type="primary" style={{marginTop: 20}} disabled>Procesar</Button>
        :
          <Button size="large" type="primary" style={{ backgroundColor: "#08979c", borderColor: "#08979c" , marginTop: 20}} onClick={this.showModal}> Procesar</Button>
      }

      <Modal
         title="Procesamiento de tickets"
         visible={this.state.visible}
         onOk={this.handleOk}
         onCancel={this.handleCancel}
       >
         <p>Eres Admin...</p>
         <p>Eres Admin...</p>
         <p>Eres Admin...</p>
       </Modal>
      </div>
    )
}

}
export default Ticket
