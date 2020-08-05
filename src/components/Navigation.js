import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import 'antd/dist/antd.css';
import './assets/css/navigation.css';
import Ticket from './Ticket';
import Incidents from './Incidents';
//import keycloak from '../config/keycloak';


// Components

// Icons
import {
  // LogoutOutlined,
  FileTextOutlined,
  FileSearchOutlined
} from '@ant-design/icons';
// import config from "../../config/config";
// import https from 'https';
// const axios = require('axios').default;
// axios.defaults.baseURL = config.backURL;
// const axiosInstance = axios.create({
//     httpsAgent: new https.Agent({
//         rejectUnauthorized: false
//     })
// });
const { Title } = Typography;
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

class SiderMenu extends React.Component {
  state = {
      collapsed: false,
      selected: 1
  };
   //logout() {
    //   keycloak.logout();
  //}
  render() {
      return (
          <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <a href="/">                    <img src={require('./assets/img/logo.png')} style={{paddingTop: "20px", paddingLeft:"20px", paddingBottom:"20px"}} alt="logo" />
          </a>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
          <Menu.Item key="1" icon={<FileSearchOutlined />} onClick={() => this.setState({selected: 1})} className="customclass">
          Incidencias
          </Menu.Item>
          <SubMenu key="sub1" icon={<FileTextOutlined/>} title="Reportes">
              <Menu.Item key="2" onClick={() => this.setState({selected: 2})} className="customclass">
                Lista de Incidencias
              </Menu.Item>
            </SubMenu>
      </Menu>
      </Sider>
      <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
      {/* eslint-disable-next-line react/jsx-no-undef */}
  <Title level={4} style={{paddingTop: "20px", paddingLeft:"20px", paddingBottom:"20px"}}>Gestión de incidencias</Title>
      </Header>
      <Content
      className="site-layout-background"
      style={{
          margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              flex: 'none',

      }}
  >
   {this.state.selected === 1 ? <Ticket/> : null}
   {this.state.selected === 2 ? <Incidents/> : null}
  </Content>
   <Footer style={{ textAlign: 'center' }}>Intelix Synergy © 2020</Footer>
      </Layout>
      </Layout>
  );
  }
}

export default SiderMenu
