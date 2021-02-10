// Importing needed components
import React from 'react';
import {Button, Divider, Empty, Input, Modal, Space, Table} from 'antd';
import config from '../config/config'
import https from 'https';
import Swal from 'sweetalert2'
import Highlighter from "react-highlight-words";
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';



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
          Sin Usuarios Registrados
        </span>
    }
    />),
};


// Exported Component
class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: [],
            list: [],

            buttonState: false,

            visible: false,
            confirmLoading: false,

            //
            modalbutton: true,


            colabName: '',
            colabEmail: '',
            colabCi: '',
            colabUser: '',
            trelloUserID: '',

        };

        this.handleOk = this.handleOk.bind(this);

    };
    componentDidMount(){
        this.charge = this.charge.bind(this);
        this.charge();
    }

    charge() {
        const data = [], obj = this;
        axiosInstance.get('/trello/get_users')
            .then(async function (response) {
                console.log(response.data)
                for (let i = 0; i < response.data.length; i++) {
                    data.push({
                        key: i,
                        name: response.data[i].usr_name,
                        email: response.data[i].usr_email,
                        user: response.data[i].usr_trello
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
                // console.log(obj.state.source)
            });
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk(){
        this.setState({
            confirmLoading: true,
        });
        let obj = this;
        axios.get('https://api.trello.com/1/members/'+obj.state.colabUser)
            .then(async function (response) {
                // console.log(response.data)
                if (response.data !== "model not found"){
                    obj.setState({
                        visible: false,
                        confirmLoading: false,
                        trelloUserID: response.data.id
                    });
                    axiosInstance.post('/trello/create_user', {
                        "name": obj.state.colabName,
                        "email": obj.state.colabEmail,
                        "ci": obj.state.colabCi,
                        "usr_trello": obj.state.colabUser,
                        "id_trello": obj.state.trelloUserID
                    }).then(async function (response) {
                        console.log(response.data)
                        if (response.data.code === "ER_DUP_ENTRY") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: "Ya existe un usuario Trello",
                            })
                            obj.setState({
                                visible: false,
                                confirmLoading: false,
                            });
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Usuario registrado correctamente',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })
                        .catch(function (error) {
                            // handle error
                            console.log("Error: ", error);
                        })
                        .then(function () {
                            // always executed
                            // console.log(obj.state.source)
                            obj.charge()
                        });
                }
            })
            .catch(function (error) {
                // handle error
                // console.log("Error: ", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,

                })
                obj.setState({
                    visible: false,
                    confirmLoading: false,
                });
            })
    };
    handleCancel = () => {
        // console.log('Clicked cancel button');
        this.setState({
            visible: false,
            confirmLoading: false,
            colabName: '',
            colabEmail: '',
            colabCi: '',
            colabUser: '',
            trelloUserID: ''
        });
    };

    onChangeName = e => {
        this.setState({
            colabName: e.target.value
        })

    };
    onChangeEmail = e => {
        this.setState({
            colabEmail: e.target.value
        })
    };
    onChangeCi = e => {
        this.setState({
            colabCi: e.target.value
        })
    };
    onChangeTrelloUser = e => {
        this.setState({
            colabUser: e.target.value
        })
    };


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
                title: 'Colaborador',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name','Colaborador'),
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                ...this.getColumnSearchProps('email','Email'),
            },
            {
                title: 'Usuario Trello',
                dataIndex: 'user',
                key: 'user',
                ...this.getColumnSearchProps('user','Usuario Trello'),
            },
        ];
        return (
            <div>


                <Button size="large" type="primary" style={{
                    backgroundColor: "#08979c",
                    borderColor: "#08979c",
                    marginTop: 20,
                    marginLeft: 10
                }} onClick={this.showModal}>
                    Agregar colaborador <UserAddOutlined />
                </Button>
                <Divider />
                <Table
                    locale={noData}
                    columns={columns}
                    dataSource={this.state.source}
                    pagination={false}
                />
                <Modal
                    title="Regístro de Usuarios"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    okButtonProps={{ disabled: this.state.colabName === "" || this.state.colabEmail === "" || this.state.colabCi === "" || this.state.colabUser === ""}}
                    onCancel={this.handleCancel}
                    okText="Procesar"
                    cancelText="Cancelar"
                >
                    <Input placeholder="Nombre" allowClear onChange={this.onChangeName} style={{marginBottom: 20}}/>
                    <Input type="email" placeholder="Email" allowClear onChange={this.onChangeEmail} style={{marginBottom: 20}}/>
                    <Input type="number" placeholder="Cédula" allowClear onChange={this.onChangeCi} style={{marginBottom: 20}}/>
                    <Input placeholder="Usuario Trello" allowClear onChange={this.onChangeTrelloUser} style={{marginBottom: 20}}/>
                </Modal>
            </div>
        )
    }

}
export default Users
