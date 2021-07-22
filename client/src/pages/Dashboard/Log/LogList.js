import { Button } from "react-bootstrap";
import moment from "moment";

const LogList = ({ logs, param }) => {
  return logs.map(({ content, file: { fileId } }) => {
    if (parseInt(param, 10) === parseInt(fileId)) {
      return content.map(
        ({ logId, content: logContent, dateCreated }, index) => (
          <tr key={index}>
            <td>
              <span className="table-body-item">{logId}</span>
            </td>
            <td>
              <span className="table-body-item">{logContent}</span>
            </td>
            <td>
              <span className="table-body-item">
                {moment(parseInt(dateCreated, 10)).format(
                  "dddd, MMMM Do YYYY, h:mm:ss a"
                )}
              </span>
            </td>
          </tr>
        )
      );
    }
  });
};

export default LogList;
