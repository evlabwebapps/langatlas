import {DSVParsedArray} from "d3";

export interface CSVData<T> {
  tableData?: DSVParsedArray<T>;
  graphColumns?: string[];
  currentGraphColumn?: string;
}
