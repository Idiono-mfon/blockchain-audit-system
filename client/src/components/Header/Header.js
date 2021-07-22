import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { formatPath } from '../../helpers';
import { getBalance } from '../../actions/balance';
import { useDispatch, useSelector } from 'react-redux';

export default function DashboardHeader() {
  const [pageName, setPageName] = useState('');

  const [notification, setNotification] = useState(0);

  const location = useLocation();

  const dispatch = useDispatch();

  const { balance } = useSelector((state) => state.balance);

  useEffect(() => {
    const path = formatPath(location.pathname);
    setPageName(path);
    dispatch(getBalance());
  }, [location, dispatch]);

  return (
    <Container fluid>
      <Row noGutters>
        <Col sm={6}>
          <div className="header-right">
            <div className="header-title">{pageName}</div>
          </div>
        </Col>
        <Col sm={6}>
          <div className="header-left">
            <div className="header-left-left ">
              <img
                width={15}
                height={15}
                className="header-left-left-search"
                src="/assets/svg/search.svg"
                alt=""
              />
              <input type="text" size="lg" className="login-input ft-2" placeholder="" />
            </div>
            <div className="header-left-right mx-2">
              <img width={15} height={15} src="/assets/svg/notifications.svg" alt="" />
              <span className="notification-counter">{notification}</span>
            </div>
            <div>
              <img width={50} height={50} className="mr-3" src="/assets/svg/user.svg" alt="" />
            </div>
            <div
              className="text-white text-center px-2 py-1"
              style={{
                background: '#1E1E17',
                borderRadius: '0.3rem',
                position: 'relative',
                width: '120px',
              }}
            >
              <i style={{ fontSize: '1.2rem' }} className="fa fa-suitcase" aria-hidden="true">
                <br />
                <span style={{ fontSize: '1rem', color: '#fff', fontWeight: '400' }}>
                  {balance ? `${balance} ETH` : '0 ETH'}
                </span>
              </i>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
