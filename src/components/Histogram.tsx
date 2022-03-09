import React, {useState, useEffect, ChangeEvent, useCallback} from 'react';
import {Container, Form, Row} from "react-bootstrap";
import {IColumn, IRow} from '../types/CSV';
import {AgChartsReact} from 'ag-charts-react';
import Statistics from "../services/Statistics";


export type HistogramProps = {
  data: IRow[];
  columns: IColumn[];
};

export default function Histogram(props: HistogramProps) {
  const [data, setData] = useState<IRow[]>(props.data);
  const [rawData, setRawData] = useState<number[]>([]);
  const [columns, setColumns] = useState<IColumn[]>(props.columns);
  const [selectedColumn, setSelectedColumn] = useState<IColumn | null>(null);

  const onSelectedColumnChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const column = columns?.find(col => col.field === e.target.value);
    if (column) setSelectedColumn(column);
  }, [columns]);

  useEffect(() => {
    setData(props.data);
    setColumns(props.columns);
    if (props.columns.length > 0 && !selectedColumn) {
      setSelectedColumn(props.columns[0]);
    }
    setRawData(props.data.map(row => row[selectedColumn?.field || props.columns[0].field]));
  }, [selectedColumn, props.data, props.columns]);

  return (
    <Container>
      <Row style={{marginBottom: 50, height: 500, padding: "50 0 0 50", position: "relative"}}>
        <AgChartsReact options={{
          data: data.map(_ => _),
          series: [
            {
              type: 'histogram',
              xKey: selectedColumn?.field || "",
              xName: selectedColumn?.title || "",
              binCount: 8,
              fill: '#dc3545'
            },
          ],
          legend: {enabled: false},
          axes: [
            {
              type: 'number',
              position: 'bottom',
              title: {enabled: true, text: selectedColumn?.title || ""},
              ...(selectedColumn?.min_value !== null && {min: selectedColumn?.min_value}),
              ...(selectedColumn?.max_value !== null && {max: selectedColumn?.max_value})
            },
            {
              type: 'number',
              position: 'left',
              title: {enabled: true, text: 'Number of participants'},
            },
          ],
          formatter: {}
        }}/>
        <div className="statsBox">
          <table>
            <tr>
              <td width={"100"}>Min</td>
              <td>{Statistics.quartile(rawData, 0)?.toFixed(2)}</td>
            </tr>
            <tr>
              <td width={"100"}>25%</td>
              <td>{Statistics.quartile(rawData, 0.25)?.toFixed(2)}</td>
            </tr>
            <tr>
              <td width={"100"}>Median</td>
              <td>{Statistics.quartile(rawData, 0.5)?.toFixed(2)}</td>
            </tr>
            <tr>
              <td width={"100"}>75%</td>
              <td>{Statistics.quartile(rawData, 0.75)?.toFixed(2)}</td>
            </tr>
            <tr>
              <td width={"100"}>Max</td>
              <td>{Statistics.quartile(rawData, 1)?.toFixed(2)}</td>
            </tr>
          </table>
        </div>
      </Row>
      <Row>
        <Form>
          <Form.Group>
            <Form.Label>Measure</Form.Label>
            <Form.Select onChange={onSelectedColumnChange}>
              {
                columns?.map((column) =>
                  <option value={column.field} key={column.field}>{column.title}</option>
                ) || ""
              }
            </Form.Select>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};
