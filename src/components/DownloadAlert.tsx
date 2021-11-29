import {Alert} from "react-bootstrap";
import {LinearProgress} from "@material-ui/core";

export type DownloadAlertProps = {
  status: "hidden" | "pending" | "success" | "error";
  link?: string;
};

export default function DownloadAlert(props: DownloadAlertProps) {
  switch (props.status) {
    case "pending":
      return (
        <Alert variant="warning">
          Please wait while data is being packaged.
          <LinearProgress />
        </Alert>
      );
    case "success":
      return (
        <Alert variant="success">
          Your archive is ready to download <Alert.Link href={props.link}>here</Alert.Link>.
        </Alert>
      );
    case "error":
      return (
        <Alert variant="danger">
          Failed to create an archive. Please try again later.
        </Alert>
      );
    default: return <div style={{display: "none"}}/>;
  }
}