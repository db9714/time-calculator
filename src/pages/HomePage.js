import React from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import moment from "moment";

import styles from "./css/HomePage.module.css";
import ActivityLoader from "./../components/ActivityLoader";

class HomePage extends React.Component {
  state = {
    showLoader: false,
    hr24ClockFrom: "",
    min24ClockFrom: "",
    hr24ClockTo: "",
    min24ClockTo: "",
    output24hrClock: "",
    error24hrClock: "",
  };
  componentDidMount() {}

  toggleLoader = (showLoader) => this.setState({ showLoader });

  calculate24hrClock = () => {
    let { hr24ClockFrom, hr24ClockTo, min24ClockFrom, min24ClockTo, output24hrClock } = this.state;
    hr24ClockTo = parseInt(hr24ClockTo);
    if (hr24ClockTo < 25 && hr24ClockFrom < 25 && min24ClockTo < 61 && min24ClockFrom < 61) {
      var now = hr24ClockTo + ":" + min24ClockTo + ":00";
      var then = hr24ClockFrom + ":" + min24ClockFrom + ":00";

      var ms = moment(now, "HH:mm:ss").diff(moment(then, "HH:mm:ss"));
      var d = moment.duration(ms);

      this.setState({ output24hrClock: d.hours() + " hours " + d.minutes() + " minutes" });
    } else this.setState({ error24hrClock: "Enter Valid Numbers " });
  };

  reset24hrClock = () => this.setState({ hr24ClockFrom: "", hr24ClockTo: "", min24ClockFrom: "", min24ClockTo: "", output24hrClock: "" });

  render() {
    const { showLoader, hr24ClockFrom, min24ClockFrom, hr24ClockTo, min24ClockTo, output24hrClock, error24hrClock } = this.state;

    return (
      <>
        {showLoader && <ActivityLoader show={showLoader} />}

        <Container className={styles.container} fluid>
          <div style={{ textAlign: "center", marginTop: 60 }}>
            <h4>Time Duration Calculator 24 hour clock - How many hours and minutes between two times</h4>
          </div>

          <Col>
            <div style={{ textAlign: "center", display: "flex", justifyContent: "center", marginTop: 30 }}>
              <div style={{ marginRight: "10%", marginLeft: "10%", fontWeight: "bold" }}>From:</div>
              <div style={{ textAlign: "left" }}>
                <span style={{ marginRight: 60 }}> Hours :</span>
                <div style={{ paddingTop: 15 }}>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    max="24"
                    min="0"
                    onChange={(e) => {
                      if (e.target.value.length < 3) this.setState({ hr24ClockFrom: e.target.value.trimStart() });
                    }}
                    value={hr24ClockFrom}
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
              <div style={{ textAlign: "left" }}>
                <span style={{ marginRight: 60 }}> Minutes :</span>
                <div style={{ paddingTop: 15 }}>
                  <Form.Control
                    type="number"
                    max="24"
                    min="0"
                    onChange={(e) => {
                      if (e.target.value.length < 3) this.setState({ min24ClockFrom: e.target.value.trimStart() });
                    }}
                    value={min24ClockFrom}
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center", display: "flex", justifyContent: "center", marginTop: 30 }}>
              <div style={{ marginRight: "12%", marginLeft: "10%", fontWeight: "bold" }}>To:</div>
              <div style={{ textAlign: "left" }}>
                <span style={{ marginRight: 60 }}> Hours :</span>
                <div style={{ paddingTop: 15 }}>
                  <Form.Control
                    type="number"
                    value={hr24ClockTo}
                    onChange={(e) => {
                      if (e.target.value.length < 3) this.setState({ hr24ClockTo: e.target.value.trimStart() });
                    }}
                    style={{ width: "60%" }}
                    max="24"
                    min="0"
                  />
                </div>
              </div>
              <div style={{ textAlign: "left" }}>
                <span style={{ marginRight: 60 }}> Minutes :</span>
                <div style={{ paddingTop: 15 }}>
                  <Form.Control
                    value={min24ClockTo}
                    type="number"
                    onChange={(e) => {
                      if (e.target.value.length < 3) this.setState({ min24ClockTo: e.target.value.trimStart() });
                    }}
                    style={{ width: "60%" }}
                    max="24"
                    min="0"
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "30px 0px" }}>
              <Button onClick={this.calculate24hrClock}>Calculate</Button>
            </div>
            {error24hrClock && (
              <div style={{ display: "flex", justifyContent: "center", margin: "30px 0px", color: "indianred", alignItems: "center" }}>
                <span style={{ marginRight: 15 }}>
                  <i class="fa fa-exclamation-triangle" style={{ fontSize: "larger" }} aria-hidden="true"></i>
                </span>
                {error24hrClock}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", margin: "30px 0px", marginLeft: 70 }}>
              <Form.Control value={output24hrClock} style={{ width: "30%" }} readOnly disabled />
              <Button style={{ marginLeft: 60 }} onClick={this.reset24hrClock}>
                Reset
              </Button>
            </div>
          </Col>
        </Container>
      </>
    );
  }
}

export default withRouter(HomePage);
