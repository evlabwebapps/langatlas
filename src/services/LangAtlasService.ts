/* Service that provides API for CSV tables and downloads */

import http from "../http-common";
import {
  ICSVTable,
  IDownloadOption,
  ICreateArchiveRequest,
  ICreateArchiveResponse,
  IColumn, IRow, IDownloadCounter, ISiteText
} from "../types/CSV";
import {csv} from "d3";

const parseRow = (columnOptions: IColumn[]) => (row: IRow) => {
  columnOptions.forEach((col: IColumn) => {
    // Cast to number or NaN
    if (col.type === "number" || col.plot_histogram) {
      row[col.field] = +row[col.field];
      if (col.nan_value && row[col.field] === +col.nan_value) {
        row[col.field] = NaN;
      }
    }
  });
  return row;
};

const getCSVTable = (table_name: string) => {
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

const countDownloaded = (downloadName: string) => {
  return http.post<IDownloadCounter>("/download_counters/", {name: downloadName});
}

const getDownloadCounters = () => {
  return http.get<Array<IDownloadCounter>>("/download_counters/");
}

const getTexts = () => {
  return http.get<Array<ISiteText>>("/texts/");
}

const LangAtlasService = {
  getCSVTable,
  getDownloadOptions,
  createArchive,
  getArchive,
  countDownloaded,
  getDownloadCounters,
  getTexts
};

export default LangAtlasService;