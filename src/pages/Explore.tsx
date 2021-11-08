import React, {useState, useEffect} from 'react';
import {csv} from 'd3';
import {CSVData} from '../types/CSV';
import CSVGraph from "../components/CSVGraph";
import Container from 'react-bootstrap/esm/Container';
import CSVTable from '../components/CSVTable';
import {Col, Row} from "react-bootstrap";


// @ts-ignore
const parseRow = columns => row => {
  columns.forEach((col: string) => row[col] = +row[col]);
  return row;
}


export default function Explore<ParsedRow extends object>() {
  const table_name = "test";
  const [csvData, setCsvData] = useState<CSVData<ParsedRow>>({});

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/api/csv_tables/" + table_name + "/", {
      "method": "GET",
      "headers": {
        "accept": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        csv(response.file, parseRow(response.columns))
          .then(table_data => setCsvData({
            tableData: table_data,
            graphColumns: response.columns,
            currentGraphColumn: response.columns[0]
          }))
          .catch(console.log)
      })
  }, []);

  return (
    <Container>
      <Row style={{marginBottom: 40}}>
        <CSVGraph csvData={csvData}/>
      </Row>
      <Row>
        <Col md={{span: 12}}>
          <CSVTable csvData={csvData} title="Table title"/>
        </Col>
      </Row>
    </Container>
  );
};
