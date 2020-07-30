import React, {useEffect, useState} from 'react';
import {Button, List, Col, DatePicker, Divider, InputNumber, Row, Select, Space, Table, Typography, Tabs, Empty} from 'antd';
import {FileTextOutlined, FileSearchOutlined} from '@ant-design/icons';
const { TabPane } = Tabs;

const Report = () => {
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Ver Más</a>
        </Space>
      ),
    },
  ];


  // setList([
  //   ["Nombre", "Nombre de prueba"], ["Cliente", "Cliente de prueba"]
  // ]);
  let noTicket = {
       emptyText: (<Empty description={
       <span>
         Seleccione un ticket
       </span>
     }/>),
     };

     let noData = {
          emptyText: (<Empty description={
          <span>
            Sin Datos
          </span>
        }/>),
        };
  return (
    <Tabs>
  <TabPane
    tab={
      <span>
        <FileSearchOutlined/>
        Reporte específico
      </span>
    }
    key="1"
  >
  <Select
           showSearch
           style={{ width: 200 }}
           placeholder="Seleccione un ticket"
           optionFilterProp="children"

       >

       </Select>

       <>
    <Divider orientation="left">Reporte específico</Divider>
    <List
      locale={noTicket}
      header={<div>Ticket 0000</div>}
      bordered
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Typography.Text strong> {item[0]}: </Typography.Text> {item[1]}
        </List.Item>
      )}
    />
  </>

  </TabPane>
</Tabs>
  )
}


export default Report
