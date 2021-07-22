import { useEffect } from 'react';
import { Col, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { bCgetAllFiles } from '../../../actions/file';
import { CircularProgress, AlertBox } from '../../../components/Util/Utils';
import FileList from './FileList';
import ScrollBottom from '../../../components/Util/ScrollBottom';
import ScrollUp from '../../../components/Util/ScrollUp';

const AuditPage = () => {
  //const dataState = useSelector((state) => state.dataState);
  const dispatch = useDispatch();

  const { loading, error, bc: files } = useSelector((state) => state.files);

  useEffect(() => {
    dispatch(bCgetAllFiles());
  }, [dispatch]);

  return loading ? (
    <CircularProgress />
  ) : error ? (
    <AlertBox message={error} variant="danger" />
  ) : (
    <Col>
      <div className="home-container">
        <div className="audit-container">
          <div className="audit-select">
            <input type="text" size="lg" className="audit-input ft-2" placeholder="Search" />
            <div className="audit-search">
              <img
                width={15}
                height={15}
                className="header-left-left-search"
                src="./assets/svg/search.svg"
                alt=""
              />
            </div>
          </div>
          <ScrollBottom />
          <ScrollUp />
        </div>
        <Table striped borderless hover>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <span className="table-header-item">File name</span>
              </th>
              <th>
                <span className="table-header-item">File Size</span>
              </th>
              <th>
                <span className="table-header-item">Total Logs</span>
              </th>
              <th>
                <span className="table-header-item">Date</span>
              </th>
              <th>
                <span className="table-header-item">IP Address</span>
              </th>

              <th>
                <span className="table-header-item">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>{files.length > 0 && <FileList files={files} />}</tbody>
        </Table>
      </div>
    </Col>
  );
};

export default AuditPage;
