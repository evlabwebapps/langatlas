import React, {useState, useEffect, ChangeEvent, useCallback} from 'react';
import {Container, Form, Row} from "react-bootstrap";
import {IColumn, IRow} from '../types/CSV';
import {AgChartsReact} from 'ag-charts-react';


export type HistogramProps = {
  data: IRow[];
  columns: IColumn[];
};

export default function Histogram(props: HistogramProps) {
  const [data, setData] = useState<IRow[]>(props.data);
  const [columns, setColumns] = useState<IColumn[]>(props.columns);
  const [selectedColumn, setSelectedColumn] = useState<IColumn | null>(null);

  const onSelectedColumnChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const column = columns?.find(col => col.field === e.target.value);
    if (column) setSelectedColumn(column);
  }, [columns]);

  useEffect(() => {
    setData(props.data);
    setColumns(props.columns);
    if (props.columns.length > 0) {
      setSelectedColumn(props.columns[0]);
    }
  }, [props.data, props.columns]);

  return (
    <Container>
      <Row style={{marginBottom: 50, height: 500, padding: "50 0 0 50"}}>
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