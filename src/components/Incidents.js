// Importing needed components
import React from 'react';
import {Empty, Table, Space, Button,  Input} from 'antd';
import Highlighter from 'react-highlight-words';
import config from '../config/config'
import https from 'https';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';



// Constants



// Axios Defaults
const axios = require('axios').default;
axios.defaults.baseURL = config.backURL;
const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});


let noData = {
    emptyText: (<Empty description = {
        <span>
          Sin Datos
        </span>
      }
      />),
};

// Exported Component
class Incidents extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
            source: []
        };

      };


      componentDidMount(){
      this.charge = this.charge.bind(this);
      this.charge();
      }

      charge() {
      const data = [], obj = this;
      let req_dateObj, close_dateObj, sol_date = null, closing_date = null;
        axiosInstance.get('/tickets/get_tickets')
        .then(async function (response) {
          // console.log(response.data.tickets)
          for (let i = 0; i < response.data.tickets.length; i++) {
            //  Request date
              sol_date = response.data.tickets[i].tic_sol_date;
              if (sol_date !== null) {
                  req_dateObj = new Date(response.data.tickets[i].tic_sol_date.split("T")[0]);
                  sol_date = moment(req_dateObj).add(1, 'day').format("DD-MM-YYYY");
              } else {
                  sol_date = "Sin Fecha"
              }
            // Closing date
              closing_date = response.data.tickets[i].tic_closing_date;
              if (closing_date !== null) {
                  close_dateObj = new Date(response.data.tickets[i].tic_closing_date.split("T")[0]);
                  closing_date = moment(close_dateObj).add(1, 'day').format("DD-MM-YYYY");
              } else {
                  closing_date = "Sin Fecha"
              }

            data.push({
                client: response.data.tickets[i].tic_branch,
                id: response.data.tickets[i].tic_id,
                title: response.data.tickets[i].tic_title,
                colab: response.data.tickets[i].tic_assigned_to,
                req_date: sol_date,
                close_date: closing_date,
                hours: response.data.tickets[i].tic_clockify_time
            });
        }
        obj.setState({
          source: data
        })
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





      getColumnSearchProps = (dataIndex, name) => ({
         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
           <div style={{ padding: 8 }}>
             <Input
               ref={node => {
                 this.searchInput = node;
               }}
               placeholder={`Buscar ${name}`}
               value={selectedKeys[0]}
               onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
               onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
               style={{ width: 188, marginBottom: 8, display: 'block' }}
             />
             <Space>
               <Button
                 type="primary"
                 onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                 icon={<SearchOutlined />}
                 size="small"
                 style={{ width: 90 }}
               >
                 Buscar
               </Button>
               <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                 Limpiar
               </Button>
             </Space>
           </div>
         ),
         filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
         onFilter: (value, record) =>
           record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
         onFilterDropdownVisibleChange: visible => {
           if (visible) {
             setTimeout(() => this.searchInput.select());
           }
         },
         render: text =>
           this.state.searchedColumn === dataIndex ? (
             <Highlighter
               highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
               searchWords={[this.state.searchText]}
               autoEscape
               textToHighlight={text.toString()}
             />
           ) : (
             text
           ),
       });

       handleSearch = (selectedKeys, confirm, dataIndex) => {
         confirm();
         this.setState({
           searchText: selectedKeys[0],
           searchedColumn: dataIndex,
         });
       };

       handleReset = clearFilters => {
         clearFilters();
         this.setState({ searchText: '' });
       };



  render(){

    const columns = [
      {
        title: 'Cliente',
        dataIndex: 'client',
        key: 'client',
        ...this.getColumnSearchProps('client','Cliente'),
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Título',
        dataIndex: 'title',
        key: 'title',
        ...this.getColumnSearchProps('title',"Título"),
      },
      {
          title: 'Colaborador',
          dataIndex: 'colab',
          key: 'colab',
          ...this.getColumnSearchProps('colab',"Colaborador"),
      },
      {
          title: 'F. Solicitud',
          dataIndex: 'req_date',
          key: 'req_date',
      },
      {
          title: 'F. Cierre',
          dataIndex: 'close_date',
          key: 'close_date',
      },
      {
          title: 'H. Invertidas',
          dataIndex: 'hours',
          key: 'hours',
      },
    ];

    return (
      <div>
        <h1>Reporte de incidencias</h1>
        <Table
           locale={noData}
           columns={columns}
           dataSource={this.state.source}
           pagination={false}
        />
      </div>
      )
  }

}
export default Incidents
