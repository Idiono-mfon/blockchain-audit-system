import { useEffect } from 'react';
import { Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../../actions/transaction';
import { AlertBox, CircularProgress } from '../../../components/Util/Utils';
import TransactionList from './TransactionList';
import ScrollUp from '../../../components/Util/ScrollUp';
import ScrollBottom from '../../../components/Util/ScrollBottom';
//
const Transaction = () => {
  const dispatch = useDispatch();

  const { loading, error, transactions: trxts } = useSelector((state) => state.trxs);

  useEffect(() => {
    dispatch(getTransactions());
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
        <div className="table-responsive">
          <Table striped borderless hover>
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <span className="table-header-item">Transaction Hash</span>
                </th>
                <th>
                  <span className="table-header-item">Record type</span>
                </th>
                {/* <th>
                  <span className="table-header-item">File Nos</span>
                </th>
                <th>
                  <span className="table-header-item">Log Nos</span>
                </th> */}
                <th>
                  <span className="table-header-item">Status</span>
                </th>
                {/* <th>
                  <span className="table-header-item">Message</span>
                </th> */}
                <th>
                  <span className="table-header-item">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>{trxts.length > 0 && <TransactionList trxts={trxts} />}</tbody>
          </Table>
        </div>
      </div>
    </Col>
  );
};

export default Transaction;
