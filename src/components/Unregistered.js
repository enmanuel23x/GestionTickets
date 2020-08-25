// Importing needed components
import React from 'react';
import {Empty, Table, Space, Button,  Input} from 'antd';
import Highlighter from 'react-highlight-words';
import config from '../config/config'
import https from 'https';
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
class Unregistered extends React.Component {

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
        axiosInstance.get('/tickets/get_not_reg')
            .then(async function (response) {
                for (let i = 0; i < response.data.cards.length; i++) {
                    data.push({
                        key: response.data.cards[i].nre_id,
                        title: response.data.cards[i].nre_title,
                        colab: response.data.cards[i].name,
                        requester: response.data.cards[i].nre_applicant,
                        hh: response.data.cards[i].nre_clockify_time
                    })
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




    // Search Engine
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
                title: 'Título',
                dataIndex: 'title',
                key: 'title',
                ...this.getColumnSearchProps('title','Título')
            },
            {
                title: 'Colaborador',
                dataIndex: 'colab',
                key: 'colab',
                ...this.getColumnSearchProps('colab',"Colaborador")
            },
            {
                title: 'Solicitante',
                dataIndex: 'requester',
                key: 'requester',
                ...this.getColumnSearchProps('requester',"Solicitante")
            },
            {
                title: 'H. H',
                dataIndex: 'hh',
                key: 'hh',
                align: 'right',
                width: "10%"
            }
        ];

        return (
            <div>
                <h1>Reporte de No Registrados</h1>
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
export default Unregistered
