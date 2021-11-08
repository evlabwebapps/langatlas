import React, {useState, useEffect} from 'react';
import MaterialTable from "material-table";
import {CSVData} from "../types/CSV";


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
        columns={csvData?.tableData?.columns?.map(column => ({
          title: column.toString(),
          field: column.toString()
        })) || []}
        data={csvData?.tableData?.map((row: ParsedRow) => row) || []}
        title={props.title}
      />
    </div>
  );
};
