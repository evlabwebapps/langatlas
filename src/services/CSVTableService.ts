import http from "../http-common";
import {ICSVTable, IDownloadOption, ICreateArchiveRequest, ICreateArchiveResponse} from "../types/CSV";

const get = (table_name: string) => {
  return http.get<ICSVTable>("/csv_tables/" + table_name + "/");
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