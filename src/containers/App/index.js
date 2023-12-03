import { Link } from "react-router-dom";

import logo from "images/logo.svg";
import "./App.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import dreamSpike from "../../muse_data/dreamSpike.png";
import styled from "styled-components";

import { Line } from "react-chartjs-2";
import { useState } from "react";
import Chart from "chart.js/auto";

import data from "../../muse_data/sleepData.json";

const Block = styled(Col)`
  border-style: solid;
  border-width: medium;
  border-color: #87ceeb;
  font-size: 20px;
  font-weight: bolder;
  margin: 40px 20px;
`;

function App() {
  return (
    <Container>
      <h1
        className="d-flex justify-content-center"
        style={{ fontWeight: "bolder" }}
      >
        EEG Sleeping Monitoring Interface
      </h1>
      <Row className="d-flex justify-content-evenly">
        <Col>
          <Row>
            <Block>
              <Container>Good Sleep Time: {data.good_sleep_time}hr</Container>
            </Block>
          </Row>
          <Row>
            <Block>
              <Container>
                Shallow Sleep Time: {data.shallow_sleep_time}hr
              </Container>
            </Block>
          </Row>
        </Col>
        <Col>
          <Row>
            <Block>
              Dream Time and Brain Activity
              {/* <Line
                data={{
                  labels: data.timestamps,
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "rgba(194, 116, 161, 0.5)",
                      borderColor: "rgb(194, 116, 161)",
                      data: data.values,
                    },
                  ],
                }}
                options={{ responsive: true }}
              /> */}
              <img src={dreamSpike} alt="Trees" height="300"></img>
            </Block>
          </Row>
        </Col>
      </Row>

      <Row>
        <h3
          className="d-flex justify-content-center"
          style={{ fontWeight: "bolder" }}
        >
          Sleeping Quality
        </h3>
        <Row>
          <Col xs></Col>
          <Block lg="8" style={{ minHeight: "80px", fontSize: "23px" }}>
            <Container>Good Sleep Time Percentage:</Container>
            <Container
              className="d-flex justify-content-center"
              style={{ fontWeight: "bolder" }}
            >
              {data.good_sleep_percent}%
            </Container>
          </Block>
          <Col xs></Col>
        </Row>
        <Row>
          <Col xs></Col>
          <Block lg="8" style={{ minHeight: "80px", fontSize: "23px" }}>
            <Container>Quality:</Container>
            <Container
              className="d-flex justify-content-center"
              style={{ fontWeight: "bolder" }}
            >
              {data.quality}
            </Container>
          </Block>
          <Col xs></Col>
        </Row>
      </Row>
    </Container>
  );
}

export default App;
