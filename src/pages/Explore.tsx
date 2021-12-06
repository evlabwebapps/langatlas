import React, {useState, useEffect, useCallback, useMemo} from 'react';

import {csv} from 'd3';
import Container from 'react-bootstrap/esm/Container';
import {Col, Row, Stack} from "react-bootstrap";

import parcel from "../parcel.png";
import {
  CreateArchiveStatus,
  IColumn,
  ICreateArchiveResponse,
  ICSVData,
  ICSVTable,
  IDownloadOption,
  IRow
} from '../types/CSV';
import CSVTableService from "../services/CSVTableService";
import CSVTable from '../components/CSVTable';
import DownloadAlert, {DownloadAlertProps} from "../components/DownloadAlert";
import TableActions from "../components/TableActions";
import {ArrowClockwise, Download} from "react-bootstrap-icons";
import Histogram from "../components/Histogram";


const parseRow = (columnOptions: IColumn[]) => (row: IRow) => {
  columnOptions.forEach((col: IColumn) => {
    if (col.type === "number" || col.plot_histogram) {
      row[col.field] = +row[col.field];
    }
  });
  return row;
}


export default function Explore() {
  const table_name = "test_2";
  const [csvData, setCsvData] = useState<ICSVData<IRow>>({});
  const [downloadOptions, setDownloadOptions] = useState<IDownloadOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedRowsForHistogram, setSelectedRowsForHistogram] = useState<number[]>([]);
  const [downloadAlertProps, setDownloadAlertProps] = useState<DownloadAlertProps>({status: "hidden"});

  const loadCSV = (table: ICSVTable) => {
    csv(table.file, parseRow(table.columns))
      .then(table_data => {
        setCsvData({
          tableData: table_data,
          columns: table.columns
        })
      })
      .catch(console.log);
  }

  useEffect(() => {
    CSVTableService.get(table_name)
      .then((response: any) => loadCSV(response.data));
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

  const histogramRows = useMemo(() =>
      selectedRowsForHistogram.length > 0
        ? csvData.tableData?.filter(row => selectedRowsForHistogram.includes(row['UID']))
        : csvData.tableData,
    [selectedRowsForHistogram, csvData.tableData]);

  const histogramColumns = useMemo(() =>
      csvData.columns?.filter(c => c.plot_histogram),
    [csvData.columns]);

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
    <Container>
      <Row>
        <Col md={2} xs={0}/>
        <Col md={8} xs={12}>
          <p>
            On this page, you can examine the distributions of various neural measures of
            language activity for all or a subset of 806 individuals.
          </p>
          <p>
            NB: For all these measures, we used a set of language network ‘parcels’, which we had
            created several years ago based on n=220 participants by applying a whole-brain
            Group-Constrained Subject-specific (GSS) analysis to the probabilistic overlap map,
            as
            described in Fedorenko et al. (2010; in this original paper, this procedure was
            performed
            on a smaller set of n=25 participants). The parcels are shown below.
          </p>
          <img src={parcel} alt={"parcel"} width={"100%"}/>
          <p>
            We include three sets of measures:
          </p>
          <p>
            Number of Significant LH / RH Voxels (Language&gt;Control contrast; p&lt;0.001
            uncorrected whole-brain)<br/>
            (this is the number of supra-threshold voxels for the language localizer contrast (see
            Localizer Info for details) within the union of the language 'parcels')
          </p>
          <p>
            Mean LH/RH Effect Size (Language&gt;Control contrast, % BOLD Signal Change) <br/>
            (this is the effect size for the language localizer contrast, averaged across the six
            LH/RH language fROIs; the fROIs were defined in each individual as the top 10% of most
            language-responsive voxels within each parcel, and the magnitudes of response were
            estimated using an across-runs cross-validation procedure, to ensure independence)
          </p>
          <p>
            Mean LH/RH Spatial Correlation (Language&gt;Control contrast; stability of the
            activation landscape between odd and even runs) <br/>
            (this is a Fisher-transformed correlation between the values for the
            Language&gt;Control contrast in the odd vs. even runs across the six LH/RH
            language parcels)
          </p>
          <p>
            By default, selecting one of these measures, will display a histogram that includes all
            806 participants. However, using the header row of the Table below, you can filter
            participants by one or more variables, like age, gender, etc., and the histogram will
            be updated.
          </p>
          <p>
            The table includes some demographic variables, some details of the scanning session,
            and lateralization (as determined based on the language localizer), as described below.
          </p>
          <p>
            UID: Unique ID (number of the participant in our lab database, ranges from 1 to
            837) <br/>
            Age: age in years at the time of the scan <br/>
            Gender: Male/Female <br/>
            Handedness: Right(-handed)/Left(-handed)/Ambidextrous/NA (we are missing handedness
            information on a small fraction of the participants) <br/>
            Native English Speaker: Yes/No <br/>
            Date of Scan: a date when the scanning session took place (these participants were
            scanned at the Athinoula A. Martinos Imaging Center at the MIT McGovern Institute
            between September 2007 and June 2021) <br/>
            Localizer version: A-J (see Localizer Info page for details) <br/>
            Lateralization: LH (left-hemisphere lateralization) / RH (right-hemisphere
            lateralization) (this is determined by subtracting the number of supra-threshold voxels
            in the RH from the number of supra-threshold voxels in the LH, and dividing the result
            by the sum of the LH and RH supra-threshold voxels; this is done within the boundaries
            of the language parcels)
          </p>
          <p>
            Summary demographics of this population: <br/>
            Age: average XX.XX (st. dev. XX.XX), range XX-XX <br/>
            Gender: XX.XX% male, XX.XX% female <br/>
            Handedness: XX.XX% right-handed, XX.XX% left-handed, XX.XX% ambidextrous (XX.XX% no
            handedness info) <br/>
            Native English speaker status: XX.XX% native speakers, XX.XX% native speakers of other
            languages and proficient speakers of English
          </p>
        </Col>
        <Col md={2} xs={0} />
      </Row>
      <Row style={{marginBottom: '1rem'}}>
        <Histogram
          data={histogramRows || []}
          columns={histogramColumns || []}
        />
      </Row>
      <div className="d-flex align-items-center" style={{marginBottom: '1rem', width: '100%'}}>
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
            (csvData.tableData?.length || 0) > 0 &&
            <CSVTable
                rows={csvData.tableData ? csvData.tableData : []}
                columns={csvData.columns ? csvData.columns : []}
                onSelectionChange={setSelectedRows}
            />
          }
        </Col>
      </Row>
    </Container>
  )
    ;
};
