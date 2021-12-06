import {Alert, Spinner} from "react-bootstrap";

export type DownloadAlertProps = {
  status: "hidden" | "pending" | "success" | "error";
  link?: string;
};

export default function DownloadAlert(props: DownloadAlertProps) {
  switch (props.status) {
    case "pending":
      return (
        <Alert variant="warning" style={{marginBottom: 0}}>
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
          </Spinner>&nbsp;
          Please wait while data is being packaged.
        </Alert>
      );
    case "success":
      return (
        <Alert variant="success" style={{marginBottom: 0}}>
          Your archive is ready to download <Alert.Link href={props.link}>here</Alert.Link>.
        </Alert>
      );
    case "error":
      return (
        <Alert variant="danger" style={{marginBottom: 0}}>
          Failed to create an archive. Please try again later.
        </Alert>
      );
    default: return <div style={{display: "none"}}/>;
  }
}