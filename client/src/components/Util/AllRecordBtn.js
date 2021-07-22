import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const AllRecordBtn = ({ link, name }) => {
  return (
    <>
      <Link to={`${link}`}>
        <Button
          style={{
            background: '#2CC4C4',
            color: '#000',
            border: 'none',
            fontWeight: '600',
          }}
        >
          {name}
        </Button>
      </Link>
    </>
  );
};

export default AllRecordBtn;
