import {Alert} from "react-bootstrap";

export type DownloadAlertProps = {
  success?: boolean;
  show: boolean;
  link?: string;
};

export default function DownloadAlert(props: DownloadAlertProps) {
  if (!props.show) {
    return <div style={{display: 'none'}}/>;
  }
  if (props.success) {
    return (
      <Alert variant='success'>
        Your archive is ready to download <Alert.Link href={props.link}>here</Alert.Link>.
      </Alert>
    );
  }
  return (
    <Alert variant='danger'>
      Failed to create an archive. Please try again later.
    </Alert>
  );
}