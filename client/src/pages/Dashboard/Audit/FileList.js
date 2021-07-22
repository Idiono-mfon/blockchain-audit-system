import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import moment from 'moment';
const FileList = ({ files }) => {
  const filesMetadata = [];

  files.forEach(({ file }) => {
    filesMetadata.push(file);
  });

  return filesMetadata.map(({ fileId, fileName, size, ipAddress, date, totalLogs }, index) => (
    <tr key={fileId}>
      <td>
        <span className="table-body-item">{fileId}</span>
      </td>
      <td>
        <span className="table-body-item">{fileName}</span>
      </td>
      <td>
        <span className="table-body-item">{size}</span>
      </td>
      <td>
        <span className="table-body-item">{totalLogs}</span>
      </td>
      <td>
        <span className="table-body-item">
          {moment(parseInt(date, 10)).format('dddd, MMMM Do YYYY, h:mm:ss a')}
        </span>
      </td>
      <td>
        <span className="table-body-item">{ipAddress}</span>
      </td>
      <td>
        <Link to={`/files/${fileId}`}>
          <Button variant="outline-primary">View</Button>
        </Link>
      </td>
    </tr>
  ));
};

export default FileList;
