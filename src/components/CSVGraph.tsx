import React, {useState, useEffect, ChangeEvent} from 'react';
import {Container, Form, Row} from "react-bootstrap";
import {Column, CSVData} from '../types/CSV';
import { AgChartsReact } from 'ag-charts-react';


type CSVGraphProps<T> = {
  csvData: CSVData<T>;
  plotData: T[];
}

export default function CSVGraph<ParsedRow extends {tableData?: { checked: boolean }}>(props: CSVGraphProps<ParsedRow>) {
  const [csvData, setCsvData] = useState<CSVData<ParsedRow>>(props.csvData);
  const [plotColumn, setPlotColumn] = useState<Column | null>(null);

  const changeDataKey = (e: ChangeEvent<HTMLSelectElement>) => {
    const column = csvData?.columns?.find(col => col.field === e.target.value);
    if (column) { setPlotColumn(column); }
  };

  const getData = () => {
    return props.plotData.length > 0 ? props.plotData : props.csvData.tableData;
  };

  useEffect(() => {
    setCsvData(props.csvData);
    setPlotColumn(props.csvData?.columns?.find(col => col.plot_histogram) || null);
  }, [props.csvData]);

  return (
    <Container>
      <Row style={{marginBottom: 50, height: 500, padding: "50 0 0 50"}}>
        <AgChartsReact options={{
          data: getData(),
          series: [
            {
              type: 'histogram',
              xKey: plotColumn?.field || "",
              xName: plotColumn?.title || "",
              binCount: 20,
            },
          ],
          legend: {enabled: false},
          axes: [
            {
              type: 'number',
              position: 'bottom',
              title: {text: plotColumn?.field || ""},
              ...(plotColumn?.min_value !== null && {min: plotColumn?.min_value}),
              ...(plotColumn?.max_value !== null && {max: plotColumn?.max_value})
            },
            {
              type: 'number',
              position: 'left',
              title: {text: 'Number of participants'},
            },
          ],
        }}/>
      </Row>
      <Row>
        <Form>
          <Form.Group>
            <Form.Label>Measure</Form.Label>
            <Form.Select onChange={changeDataKey}>
              {
                csvData?.columns?.map((column, index) =>
                  column.plot_histogram ? (<option value={column.field} key={column.field}>{column.title}</option>) : ""
                ) || ""
              }
            </Form.Select>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};
