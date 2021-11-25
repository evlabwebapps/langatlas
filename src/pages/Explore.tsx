import React, {useState, useEffect} from 'react';
import {csv} from 'd3';
import {IColumn, ICSVData, ICSVTable} from '../types/CSV';
import CSVGraph from "../components/CSVGraph";
import Container from 'react-bootstrap/esm/Container';
import CSVTable from '../components/CSVTable';
import {Col, Row} from "react-bootstrap";
import CSVTableService from "../services/CSVTableService";


// @ts-ignore
const parseRow = columnOptions => row => {
  columnOptions.forEach((col: IColumn) => {
    if (col.type === "numeric" || col.plot_histogram) {
      row[col.field] = +row[col.field];
    }
  });
  return row;
}


export default function Explore<ParsedRow extends object>() {
  const table_name = "test_2";
  const [csvData, setCsvData] = useState<ICSVData<ParsedRow>>({});
  const [plotData, setPlotData] = useState<ParsedRow[]>([]);

  const loadCSV = (table: ICSVTable) => {
    csv(table.file, parseRow(table.columns))
      .then(table_data => {
        setCsvData({
          tableData: table_data,
          columns: table.columns
        })
      })
      .catch(console.log);
  }

  useEffect(() => {
    CSVTableService.get(table_name)
      .then((response: any) => loadCSV(response.data))
  }, []);

  return (
    <Container>
      <Row style={{marginBottom: 40}}>
        <CSVGraph csvData={csvData} plotData={plotData} />
      </Row>
      <Row>
        <Col md={{span: 12}}>
          <CSVTable csvData={csvData} title="Table title" onSelectionChange={setPlotData} />
        </Col>
      </Row>
    </Container>
  );
};
