import React, {useState, useEffect} from 'react';
import MaterialTable, { MTableActions } from "@material-table/core";
import {
  CreateArchiveStatus,
  IColumn,
  ICreateArchiveResponse,
  ICSVData,
  IDownloadOption
} from "../types/CSV";
import CSVTableService from "../services/CSVTableService";
import DownloadAlert, {DownloadAlertProps} from "./DownloadAlert";


type CSVTableProps<T> = {
  title: string;
  csvData: ICSVData<T>;
  onSelectionChange: (data: T[], rowData?: T) => void;
  downloadOptions: IDownloadOption[];
}

export default function CSVTable<ParsedRow extends object>(props: CSVTableProps<ParsedRow>) {
  const [csvData, setCsvData] = useState<ICSVData<ParsedRow>>(props.csvData);
  const [downloadAlertProps, setDownloadAlertProps] = useState<DownloadAlertProps>({status: "hidden"})

  const waitArchive = (data: ICreateArchiveResponse) => {
    setTimeout(function run() {
      CSVTableService.getArchive(data.id)
        .then((response: any) => {
          if (response.data.status === CreateArchiveStatus.Pending ||
            response.data.status === CreateArchiveStatus.Created) {
            setTimeout(run, 2000);
          } else if (response.data.status === CreateArchiveStatus.Failed) {
            setDownloadAlertProps({status: "error"});
          } else if (response.data.status === CreateArchiveStatus.Success) {
            setDownloadAlertProps({
              link: process.env.REACT_APP_BACKEND_URL + response.data.archive_file,
              status: "success"
            });
          }
        })
        .catch((reason: any) => {
          setDownloadAlertProps({status: "error"});
        })
    }, 2000);
  };
  const getAction = (downloadOption: IDownloadOption) => {
    return {
      tooltip: downloadOption.title,
      icon: 'download',
      onClick: (event: any, data: ParsedRow | ParsedRow[]) => {
        if (!(data instanceof Array)) {
          return;
        }
        setDownloadAlertProps({status: "pending"});
        // @ts-ignore
        const rows = data.map(r => r.UID);
        CSVTableService.createArchive(
          {
            download_batch: downloadOption.id,
            rows: rows
          }
        ).then((response: any) => waitArchive(response.data));
      }
    }
  }
  const getActions = () => {
    return props.downloadOptions.map(getAction);
  };

  useEffect(() => {
    setCsvData(props.csvData);
  }, [props.csvData]);

  return (
    <div>
      <DownloadAlert {...downloadAlertProps}/>
      <MaterialTable
        columns={
          csvData?.columns?.map((col: IColumn) => (col.visible ? {
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
        onSelectionChange={props.onSelectionChange}
        actions={getActions()}
        components={{
          Actions: props => {
            return (
              <div style={{display: "flex", alignItems: "center"}}>
                <div style={{display: props.actions.length > 0 ? "block" : "none"}}>
                  Download:&nbsp;&nbsp;
                </div>
                <MTableActions {...props}/>
              </div>
            )
          }
        }}
      />
    </div>
  );
};
