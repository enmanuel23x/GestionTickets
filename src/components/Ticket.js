import React, {useEffect, useState} from 'react';
import {
  Button,
  List,
  Divider,
  Typography,
  Empty,
  Input
} from 'antd';



const {Search} = Input;

const Ticket = () => {
    const [list, setList] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {
      setList([
         ["Nombre", "Nombre de prueba"], ["Cliente", "Cliente de prueba"]
      ]);
    }, []);


    let noTicket = {
        emptyText: ( < Empty description = {
            <span>
              Buscar un Ticket ID
            </span>
          }
          />),
        };


        return (
          <div>


          <Search
            placeholder="Ingrese Ticket ID"
            onSearch={value => console.log(value)}
            size = "large"
          />
          <Divider orientation = "left" > Detalles de Ticket </Divider>
           <List
           locale = {noTicket}
           header = {<div> Ticket 0000 < /div>}
            bordered
            dataSource = {list}
            renderItem = {
              item => (
                <List.Item >
                  <Typography.Text strong> {item[0]}: </Typography.Text> {item[1]}
                </List.Item>
              )
            }
            />
            <Button type = "primary" style={{backgroundColor: "#08979c", borderColor: "#08979c", marginTop: 20}} disabled>
              Procesar
            </Button>
            </div>
          )
        }
        export default Ticket
