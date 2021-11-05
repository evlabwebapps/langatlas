import React, {useState, useEffect} from 'react';
import {csv} from 'd3';
import {Bar, CartesianGrid, YAxis, Tooltip, XAxis, BarChart} from "recharts";
import {Container, Form} from "react-bootstrap";


// @ts-ignore
const parseRow = columns => row => {
  columns.forEach((col: string) => row[col] = +row[col]);
  return row;
}

type CSVGraphProps = {
  table_name: string
}

export default function CSVGraph(props: CSVGraphProps) {
  const [data, setData] = useState<any>([]);
  const [columns, setColumns] = useState<Array<string>>([]);
  const [dataKey, setDataKey] = useState<string>("");

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/api/csv_tables/" + props.table_name +"/", {
      "method": "GET",
      "headers": {
        "accept": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
          setColumns(response.columns);
          setDataKey(response.columns[0]);
          csv(response.file, parseRow(response.columns)).then(setData).catch(e => console.log(e));
        }
      )
  }, [props.table_name])

  return (
    <Container>
      <BarChart
        width={800}
        height={400}
        data={data}
      >
        <XAxis dataKey="subjID"/>
        <YAxis/>
        <Tooltip/>
        <CartesianGrid stroke="#f5f5f5"/>
        <Bar dataKey={dataKey} fill="#387908"/>
      </BarChart>

      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Measure</Form.Label>
          <Form.Select onChange={(e) => setDataKey(e.target.value)}>
            {
              columns.map((column, index) => (
                <option value={column}>{column}</option>
              ))
            }
          </Form.Select>
        </Form.Group>
      </Form>
    </Container>
  );
};
