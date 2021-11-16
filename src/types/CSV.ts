import {DSVParsedArray} from "d3";

export interface Column {
  field: string;
  title: string;
  visible: boolean;
  filtering: boolean;
  type?: "string"
    | "boolean"
    | "numeric"
    | "date"
    | "datetime"
    | "time"
    | "currency";
  lookup: object,
  plot_histogram: boolean,
  min_value?: number,
  max_value?: number
}

export interface CSVData<T> {
  tableData?: DSVParsedArray<T>;
  columns?: Array<Column>;
}
