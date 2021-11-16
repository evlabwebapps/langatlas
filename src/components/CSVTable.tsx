import React, {useState, useEffect} from 'react';
import MaterialTable from "@material-table/core";
import {Column as CSVColumn, CSVData} from "../types/CSV";


type CSVTableProps<T> = {
  title: string;
  csvData: CSVData<T>;
}

export default function CSVTable<ParsedRow extends object>(props: CSVTableProps<ParsedRow>) {
  const [csvData, setCsvData] = useState<CSVData<ParsedRow>>(props.csvData);

  useEffect(() => {
    setCsvData(props.csvData);
  }, [props.csvData])

  return (
    <div style={{maxWidth: "100%"}}>
      <MaterialTable
        columns={
          csvData?.columns?.map((col: CSVColumn) => (col.visible ? {
              field: col.field,
              title: col.title,
              filtering: col.filtering,
              ...(col?.type && ({type: col.type})) || {},
              ...(col?.lookup && ({lookup: col.lookup})) || {}
            } : {})
          ) || []
        }
        data={csvData?.tableData?.map((row: ParsedRow) => row) || []}
        title={props.title}
        options={{
          filtering: true,
          search: false,
          draggable: false,
          pageSize: 50,
          pageSizeOptions: [20, 50, 100, 500],
          selection: true
        }}
      />
    </div>
  );
};
