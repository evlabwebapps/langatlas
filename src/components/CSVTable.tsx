import React, {useState, useEffect} from 'react';
import MaterialTable, { MTableActions } from "@material-table/core";
import {CreateArchiveStatus, IColumn, ICreateArchiveResponse, ICSVData} from "../types/CSV";
import CSVTableService from "../services/CSVTableService";
import DownloadAlert, {DownloadAlertProps} from "./DownloadAlert";


type CSVTableProps<T> = {
  title: string;
  csvData: ICSVData<T>;
  onSelectionChange: (data: T[], rowData?: T) => void;
}

export default function CSVTable<ParsedRow extends object>(props: CSVTableProps<ParsedRow>) {
  const [csvData, setCsvData] = useState<ICSVData<ParsedRow>>(props.csvData);
  const [downloadAlertProps, setDownloadAlertProps] = useState<DownloadAlertProps>({show: false})

  const waitArchive = (data: ICreateArchiveResponse) => {
    setTimeout(function run() {
      CSVTableService.getArchive(data.id)
        .then((response: any) => {
          if (response.data.status === CreateArchiveStatus.Pending ||
            response.data.status === CreateArchiveStatus.Created) {
            setTimeout(run, 2000);
          } else if (response.data.status === CreateArchiveStatus.Failed) {
            setDownloadAlertProps({
              show: true,
              success: false
            });
          } else if (response.data.status === CreateArchiveStatus.Success) {
            setDownloadAlertProps({
              link: process.env.REACT_APP_BACKEND_URL + response.data.archive_file,
              show: true,
              success: true
            });
          }
        })
        .catch((reason: any) => {
          setDownloadAlertProps({
            show: true,
            success: false
          });
        })
    }, 2000);
  };

  const getActions = () => {
    return [
      {
        tooltip: 'SPM',
        icon: 'download',
        onClick: (event: any, data: ParsedRow | ParsedRow[]) => {
          if (!(data instanceof Array)) {
            return;
          }
          setDownloadAlertProps({show: false});
          // @ts-ignore
          const rows = data.map(r => r.UID);
          CSVTableService.createArchive(
            {
              download_batch: "89f26a6f-d36c-40ae-bebc-4f9b6a0510fa",
              rows: rows
            }
          ).then((response: any) => waitArchive(response.data));
        }
      },
      {
        tooltip: 'FS',
        icon: 'download',
        onClick: (event: any, data: ParsedRow | ParsedRow[]) => {
          if (!(data instanceof Array)) {
            return;
          }
          setDownloadAlertProps({show: false});
          // @ts-ignore
          const rows = data.map(r => r.UID);
          CSVTableService.createArchive(
            {
              download_batch: "9b4d9dff-55ea-4ac4-befe-20f482dc9131",
              rows: rows
            }
          ).then((response: any) => waitArchive(response.data));
        }
      }
    ]
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
