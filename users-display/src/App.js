import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Container, ListGroup } from "reactstrap";
import User from "./components/User";


class App extends Component {
  state = {
    users: []
  }
  async componentDidMount() {
    try {
      const users = await axios.get("http://localhost:5000/api/users");
      this.setState({users: users.data})
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    if (this.state.users) {
      return (
        <section className="App bg-light min-vh-100">
          <Container>
            <Row>
              <Col
                xs={{ size: 12 }}
                md={{ size: 8, offset: 2 }}
                lg={{ size: 6, offset: 3 }}
              >
               <ListGroup>
               {this.state.users.map(user => <User user={user} key={user.id}/>)}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </section>
      );
    }
    return <div></div>
  }
}

export default App;
