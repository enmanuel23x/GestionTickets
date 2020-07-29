import React, {useEffect, useState} from 'react';
import {Button, List, Col, DatePicker, Divider, InputNumber, Row, Select, Space, Table, Typography, Tabs, Empty} from 'antd';
import {FileTextOutlined, FileSearchOutlined} from '@ant-design/icons';
const { TabPane } = Tabs;

const Report = () => {
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

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const list = [
    ["Nombre", "Nombre de prueba"], ["Cliente", "Cliente de prueba"]
  ];
  let locale = {
       emptyText: (<Empty description={
       <span>
         Seleccione un ticket
       </span>
     }/>),
     };
  return (
    <Tabs defaultActiveKey="1">
  <TabPane
    tab={
      <span>
        <FileTextOutlined/>
        Reporte General
      </span>
    }
    key="1"
  >
    <Table columns={columns} dataSource={data} pagination={false} size="small"/>
  </TabPane>
  <TabPane
    tab={
      <span>
        <FileSearchOutlined/>
        Reporte específico
      </span>
    }
    key="2"
  >
  <Select
           showSearch
           style={{ width: 200 }}
           placeholder="Seleccione una solicitud"
           optionFilterProp="children"

       >

       </Select>

       <>
    <Divider orientation="left">Reporte específico</Divider>
    <List
      header={<div>Ticket 0000</div>}
      bordered
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Typography.Text mark> {item[0]} </Typography.Text> {item[1]}
        </List.Item>
      )}
    />
  </>

  </TabPane>
</Tabs>
  )
}


export default Report
