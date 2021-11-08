import React, {useState, useEffect, ChangeEvent} from 'react';
import {Bar, CartesianGrid, YAxis, Tooltip, XAxis, BarChart, ResponsiveContainer} from "recharts";
import {Container, Form, Row} from "react-bootstrap";
import {CSVData} from '../types/CSV';


type CSVGraphProps<T> = {
  csvData: CSVData<T>;
}

export default function CSVGraph<ParsedRow extends object>(props: CSVGraphProps<ParsedRow>) {
  const [csvData, setCsvData] = useState<CSVData<ParsedRow>>(props.csvData);
  const changeDataKey = (e: ChangeEvent<HTMLSelectElement>) => {
    setCsvData({...csvData, currentGraphColumn: e.target.value});
  }

  useEffect(() => setCsvData(props.csvData), [props.csvData]);

  return (
    <Container>
      <Row style={{marginBottom: 50, height: 500, padding: "50 0 0 50"}}>
        <ResponsiveContainer>
          <BarChart data={csvData?.tableData || []}>
            <XAxis dataKey="subjID"/>
            <YAxis/>
            <Tooltip/>
            <CartesianGrid stroke="#f5f5f5"/>
            <Bar dataKey={csvData?.currentGraphColumn || ""} fill="#387908"/>
          </BarChart>
        </ResponsiveContainer>
      </Row>
      <Row>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Measure</Form.Label>
            <Form.Select onChange={changeDataKey}>
              {
                csvData?.graphColumns?.map((column, index) => (
                  <option value={column}>{column}</option>
                )) || ""
              }
            </Form.Select>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};
