import React, {useState, useEffect, useCallback, useMemo} from 'react';

import {Col, Row} from "react-bootstrap";

import {
  CreateArchiveStatus,
  ICreateArchiveResponse,
  ICSVTable,
  IDownloadOption,
} from '../types/CSV';
import CSVTableService from "../services/CSVTableService";
import CSVTable from '../components/CSVTable';
import DownloadAlert, {DownloadAlertProps} from "../components/DownloadAlert";
import TableActions from "../components/TableActions";
import {ArrowClockwise, Download} from "react-bootstrap-icons";
import Histogram from "../components/Histogram";
import SummaryDemographics from "../components/SummaryDemographics";
import BoxPlot from "../components/BoxPlot";
import ExploreNeuralMarkersText from "../texts/ExploreNeuralMarkersText";


export default function ExploreNeuralMarkers() {
  const table_name = "table_3";
  const [csvTable, setCSVTable] = useState<ICSVTable | null>(null);
  const [downloadOptions, setDownloadOptions] = useState<IDownloadOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedRowsForHistogram, setSelectedRowsForHistogram] = useState<number[]>([]);
  const [downloadAlertProps, setDownloadAlertProps] = useState<DownloadAlertProps>({status: "hidden"});

  useEffect(() => {
    CSVTableService.get(table_name)
      .then((table: ICSVTable) => setCSVTable(table));
    CSVTableService.getDownloadOptions(table_name)
      .then((response: any) => setDownloadOptions(response.data));
  }, []);

  const waitArchive = (data: ICreateArchiveResponse) => {
    setTimeout(function run() {
      CSVTableService.getArchive(data.id)
        .then((response: any) => {
          if (response.data.status === CreateArchiveStatus.Pending ||
            response.data.status === CreateArchiveStatus.Created) {
            setTimeout(run, 2000);
          } else if (response.data.status === CreateArchiveStatus.Failed) {
            setLoading(false);
            setDownloadAlertProps({status: "error"});
          } else if (response.data.status === CreateArchiveStatus.Success) {
            setLoading(false);
            setDownloadAlertProps({
              link: process.env.REACT_APP_BACKEND_URL + response.data.archive_file,
              status: "success"
            });
          }
        })
        .catch((reason: any) => {
          setLoading(false);
          setDownloadAlertProps({status: "error"});
        })
    }, 2000);
  };

  const onDownloadClick = useCallback((option: IDownloadOption) => {
    return (_: React.MouseEvent<HTMLElement>) => {
      if (selectedRows.length === 0) {
        return;
      }
      setDownloadAlertProps({status: "pending"});
      setLoading(true);

      CSVTableService.createArchive({
        download_batch: option.id,
        rows: selectedRows
      }).then((response: any) => waitArchive(response.data));
    }
  }, [selectedRows]);

  const replotHistogramHandler = useCallback((_: React.MouseEvent<HTMLElement>) => {
    setSelectedRowsForHistogram(selectedRows);
  }, [selectedRows]);

  useEffect(() => {
    setSelectedRowsForHistogram(selectedRows);
  }, [selectedRows]);


  const histogramRows = useMemo(() =>
      selectedRowsForHistogram.length > 0
        ? csvTable?.csvData?.filter(row => selectedRowsForHistogram.includes(row['UID']))
        : csvTable?.csvData,
    [selectedRowsForHistogram, csvTable?.csvData]);

  const histogramColumns = useMemo(() =>
      csvTable?.columns?.filter(c => c.plot_histogram),
    [csvTable?.columns]);

  const tableActionGroups = useMemo(() => (
    [
      {
        name: "Downloads",
        actions: downloadOptions.map((dOption: IDownloadOption) => ({
          label: dOption.title,
          onClick: onDownloadClick(dOption),
          icon: Download,
        })),
        disabled: loading
      },
      {
        name: "Plot",
        actions: [
          {
            label: "Replot",
            onClick: replotHistogramHandler,
            icon: ArrowClockwise
          }
        ],
        disabled: false
      }
    ]
  ), [downloadOptions, loading, onDownloadClick, replotHistogramHandler]);

  return (
    <div className="w-75 mx-auto">
      <div className="d-flex flex-column align-content-center justify-content-center">
        <ExploreNeuralMarkersText/>
        <SummaryDemographics selectedRows={histogramRows}/>
        <BoxPlot data={histogramRows}/>
        <Histogram data={histogramRows || []} columns={histogramColumns || []}/>
        <div className="d-flex align-items-center my-2 w-100">
          {
            (selectedRows.length > 0) &&
            <div style={{marginRight: '0.5rem'}}>
              {selectedRows.length} participant{selectedRows.length > 1 ? "s" : ""} selected
            </div>
          }
          {
            (selectedRows.length === 0) &&
            <div style={{marginRight: '0.5rem'}}>
              {selectedRows.length} participants showed
            </div>
          }
          <div className="flex-grow-1">
            <DownloadAlert {...downloadAlertProps} />
          </div>
          {
            (selectedRows.length > 0) &&
            <div>
                <TableActions actionGroups={tableActionGroups}/>
            </div>
          }
        </div>
        <Row>
          <Col md={{span: 12}}>
            {
              (csvTable?.csvData?.length || 0) > 0 &&
              <CSVTable
                  rows={csvTable?.csvData ? csvTable?.csvData : []}
                  columns={csvTable?.columns ? csvTable?.columns : []}
                  onSelectionChange={setSelectedRows}
              />
            }
          </Col>
        </Row>
      </div>
    </div>
  );
};
