import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Col, Container, Row, Button } from 'react-bootstrap';
import AllRecordBtn from '../../../components/Util/AllRecordBtn';

const TransactionDetails = () => {
  const [receipt, setReceipt] = useState({
    _id: '',
    txHash: '',
    type: '',
    txStatus: '',
    message: '',
    blockHash: '',
    gasUsed: 0,
  });

  const { loading, error, transactions: trxts } = useSelector((state) => state.trxs);
  const params = useParams();

  useEffect(() => {
    if (trxts) {
      const { id } = params;
      trxts.map((trxt) => {
        if (trxt._id === id) {
          const {
            _id,
            txHash,
            type,
            txStatus,
            message,
            blockHash,
            gasUsed,
            data: { fileSn, logSn },
          } = trxt;
          setReceipt({ _id, txHash, type, txStatus, message, blockHash, gasUsed });
        }
      });
    }
  }, [trxts, params]);

  return (
    <>
      <Col>
        <div className="home-container">
          <Container className="px-5">
            <Row>
              <Col sm={12} className="text-white fs-1" style={{ fontSize: '18px' }}>
                <h5 className="text-center text-white mb-5 mt-5">Receipt Details</h5>
                <div className="mb-4">
                  <span className="text-weight-400 px-3">Receipt Id : </span>
                  <span className="px-5">{receipt._id}</span>
                </div>
                <div className="mb-4">
                  <span className="text-weight-400 px-3">Transaction Hash : </span>
                  <span className="px-5">{receipt.txHash}</span>
                </div>
                <div className="mb-4">
                  <span className="text-weight-400 px-3">Block Hash : </span>
                  <span className="px-5">{receipt.blockHash}</span>
                </div>
                <div className="mb-4">
                  <span className="text-weight-400 px-3">Record Type : </span>
                  <span className="px-5">{receipt.type}</span>
                </div>

                {/* <div className="mb-4">
                  <span className="text-weight-400 px-3">File Nos : </span>
                  <span className="px-5">1</span>
                </div>
                <div className="mb-4">
                  <span className="text-weight-400 px-3">Log Nos : </span>
                  <span className="px-5">4</span>
                </div> */}
                <div className="mb-4">
                  <span className="text-weight-400 px-3">Status : </span>
                  <span className="px-5">{receipt.txStatus}</span>
                </div>

                <div className="mb-4">
                  <span className="text-weight-400 px-3">Message : </span>
                  <span className="px-5">{receipt.message}</span>
                </div>
                <div className="mb-4">
                  <span className="text-weight-400 px-3">Gas Used : </span>
                  <span className="px-5">{receipt.gasUsed}</span>
                </div>
                <div className="mb-4 px-3">
                  <AllRecordBtn name="All Receipts" link="/receipts" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Col>
      ;
    </>
  );
};

export default TransactionDetails;
