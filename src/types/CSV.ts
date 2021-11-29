import {DSVParsedArray} from "d3";

export interface IColumn {
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
  lookup: object;
  plot_histogram: boolean;
  min_value?: number;
  max_value?: number;
}

export interface ICSVTable {
  name: string;
  file: string;
  columns: Array<IColumn>;
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