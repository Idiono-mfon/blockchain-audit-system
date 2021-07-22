import { useEffect } from 'react';
import { Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircularProgress, AlertBox } from '../../../components/Util/Utils';
import ScrollUp from '../../../components/Util/ScrollUp';
import AllRecordBtn from '../../../components/Util/AllRecordBtn';
import LogList from './LogList';

import { bCgetAllFiles } from '../../../actions/file';
import ScrollBottom from '../../../components/Util/ScrollBottom';

//
const Log = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { loading, error, bc: files } = useSelector((state) => state.files);

  useEffect(() => {
    if (files.length === 0) {
      dispatch(bCgetAllFiles());
    }
  }, [dispatch, files]);

  return loading ? (
    <CircularProgress />
  ) : error ? (
    <AlertBox message={error} variant="danger" />
  ) : (
    <Col>
      <div className="home-container">
        <div className="audit-container d-flex justify-content-between">
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
                <span className="table-header-item">Content</span>
              </th>
              <th>
                <span className="table-header-item">Date Added</span>
              </th>
            </tr>
          </thead>
          <tbody>{files.length > 0 && <LogList logs={files} param={params.id} />}</tbody>
        </Table>
        <div className="mb-4 px-3">
          <AllRecordBtn name="All Audit Files" link="/audit" />
        </div>
      </div>
    </Col>
  );
};

export default Log;
