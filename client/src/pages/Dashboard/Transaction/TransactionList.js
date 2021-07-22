import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const TransactionList = ({ trxts }) => {
  return trxts.map(({ _id, txHash, type, txStatus, message, data: { fileSn, logSn } }, index) => (
    <tr key={index}>
      <td>
        <span className="table-body-item">{index + 1}</span>
      </td>
      <td>
        <span className="table-body-item">{txHash}</span>
      </td>
      <td>
        <span variant="secondary" className="table-body-item text-white">
          {type}
        </span>
      </td>

      <td>
        <span variant={txStatus === 'success' ? `success` : `danger`}>{txStatus}</span>
      </td>
      {/* <td>
        <span>{message}</span>
      </td> */}
      {/* <td>
        <span></span>
      </td> */}
      <td>
        <Link to={`/receipts/${_id}`}>
          <Button variant="outline-primary">See More</Button>
        </Link>
      </td>
    </tr>
  ));
};

export default TransactionList;
