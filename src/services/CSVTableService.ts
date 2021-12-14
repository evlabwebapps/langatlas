import http from "../http-common";
import {
  ICSVTable,
  IDownloadOption,
  ICreateArchiveRequest,
  ICreateArchiveResponse,
  IColumn, IRow
} from "../types/CSV";
import {csv} from "d3";

const parseRow = (columnOptions: IColumn[]) => (row: IRow) => {
  columnOptions.forEach((col: IColumn) => {
    if (col.type === "number" || col.plot_histogram) {
      row[col.field] = +row[col.field];
    }
  });
  return row;
};

const get = (table_name: string) => {
  const getTable = (table_name: string) =>
    http.get<ICSVTable>("/csv_tables/" + table_name + "/")
      .then(response => response.data);

  const getCSVData = (table: ICSVTable) =>
    csv(table.file, parseRow(table.columns))
      .then(rows => ({
        ...table,
        csvData: rows
      }));

  return getTable(table_name).then(getCSVData);
};

const getDownloadOptions = (table_name: string) => {
  return http.get<Array<IDownloadOption>>("/downloads/?table=" + table_name);
}

const createArchive = (data: ICreateArchiveRequest) => {
  return http.post<ICreateArchiveResponse>("/downloads/", data);
}

const getArchive = (archive_id: string) => {
  return http.get<Array<ICreateArchiveResponse>>("/downloads/" + archive_id + "/");
}

const CSVTableService = {
  get,
  getDownloadOptions,
  createArchive,
  getArchive,
};

export default CSVTableService;