import { Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
// import Home from './Home';
import Audit from './Audit/Audit';
import Settings from './Settings';
import Log from './Log/Log';
import Transaction from './Transaction/Transaction';
import TransactionDetails from './Transaction/TransactionDetails';

const DashBoard = () => {
  return (
    <Container fluid className="no-margin">
      <Row>
        <Col sm={2}>
          <SideBar />
        </Col>
        <Col sm={10}>
          <Header />
          <Route path="/audit" exact component={Audit} />
          {/* <Route path="/home" component={Home} /> */}
          <Route path="/receipts" exact component={Transaction} />
          <Route path="/receipts/:id" exact component={TransactionDetails} />
          <Route path="/files/:id" exact component={Log} />
          <Route path="/settings" component={Settings} />
        </Col>
      </Row>
    </Container>
  );
};

export default DashBoard;
