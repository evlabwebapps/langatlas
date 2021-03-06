import {DSVParsedArray} from "d3";
import internal from "stream";

export interface IColumn {
  field: string;
  title: string;
  visible: boolean;
  filtering: boolean;
  type?: "string"
    | "boolean"
    | "number"
    | "date"
    | "select";
  lookup: object;
  plot_histogram: boolean;
  min_value?: number;
  max_value?: number;
  default_operator?: string;
  width?: number;
  nan_value?: string;
}

export interface IRow {
  [key: string]: any;
}

export interface ICSVTable {
  name: string;
  file: string;
  columns: Array<IColumn>;
  csvData?: IRow[];
}

export interface IDownloadOption {
  id: string;
  title: string;
}

export interface ICreateArchiveRequest {
  download_batch: string;
  rows: Array<number>;
}

export enum CreateArchiveStatus {
  Created,
  Pending,
  Success,
  Failed,
}

export interface ICreateArchiveResponse {
  id: string;
  download_batch: IDownloadOption;
  rows: string;
  status: CreateArchiveStatus;
  archive_file?: string;
}

export interface ICSVData<T> {
  tableData?: DSVParsedArray<T>;
  columns?: Array<IColumn>;
}

export interface IDownloadOption {
  id: string;
  title: string;
}

export interface IDownloadCounter {
  name: string;
  counter: number;
}

export interface ISiteText {
  key: string;
  value: string;
}
