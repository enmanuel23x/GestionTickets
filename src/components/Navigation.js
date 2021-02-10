import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import 'antd/dist/antd.css';
import './assets/css/navigation.css';
// Components
import Ticket from './Ticket';
//  Reports
import Incidents from './Incidents';
import Unregistered from './Unregistered';
import Users from './Users';

// Icons
import {
    // LogoutOutlined,
    FileTextOutlined,
    FileSearchOutlined,
    UserOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

class SiderMenu extends React.Component {
    state = {
        selected: 1
    };
    //logout() {
    //   keycloak.logout();
    //}
    render() {
        return (
            <Layout>
                <Sider
                    breakpoint="lg" collapsedWidth="0"
                    onBreakpoint={broken => {
                        // console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        // console.log(collapsed, type);
                    }}
                >
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
                            <Menu.Item key="3" onClick={() => this.setState({selected: 3})} className="customclass">
                                No Registrados
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="4" icon={<UserOutlined />} onClick={() => this.setState({selected: 4})} className="customclass">
                            Usuarios
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <Title level={4} style={{paddingTop: "20px", paddingLeft:"20px", paddingBottom:"20px"}}>Gestión de incidencias - Mayoreo </Title>
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
                        {this.state.selected === 3 ? <Unregistered/> : null}
                        {this.state.selected === 4 ? <Users/> : null}
                    </Content>
                    <Footer style={{ textAlign: 'center', paddingTop: 0 }}>Intelix Synergy © 2020</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default SiderMenu
