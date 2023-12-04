
import "./App.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container, Dropdown } from "react-bootstrap";
import styled from "styled-components";

import { useState } from "react";

import { default as _map } from "lodash/map";

const Block = styled(Col)`
  border-style: solid;
  border-width: medium;
  border-color: #87ceeb;
  font-size: 20px;
  font-weight: bolder;
  margin: 40px 20px;
`;

const App = () => {
  const loader = require.context("../../muse_data/", true);
  const data = loader
    .keys()
    .filter((file) => file.endsWith(".json"))
    .map((json) => {
      console.log(json);
      return loader(json);
    });
  const [selectedIdx, setSelectedIdx] = useState(0);
  const {
    date,
    good_sleep_time,
    shallow_sleep_time,
    good_sleep_percent,
    quality,
    graph,
  } = data[selectedIdx];
  return (
    <Container>
      <h1
        className="d-flex justify-content-center"
        style={{ fontWeight: "bolder" }}
      >
        EEG Sleeping Monitoring Interface
      </h1>
      <Dropdown data-bs-theme="dark" className="d-flex justify-content-center">
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          {date}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {_map(data, (json, idx) => (
            <Dropdown.Item
              key={idx}
              onClick={() => {
                setSelectedIdx(idx);
              }}
              active={idx === selectedIdx}
            >
              {json.date}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Row className="d-flex justify-content-evenly">
        <Col>
          <Row>
            <Block>
              <Container>Good Sleep Time: {good_sleep_time}hr</Container>
            </Block>
          </Row>
          <Row>
            <Block>
              <Container>Shallow Sleep Time: {shallow_sleep_time}hr</Container>
            </Block>
          </Row>
        </Col>
        <Col>
          <Row>
            <Block>
              Dream Time and Brain Activity
              <img src={loader(`./${graph}`)} alt="Trees" height="300"></img>
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
              {good_sleep_percent}%
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
              {quality}
            </Container>
          </Block>
          <Col xs></Col>
        </Row>
      </Row>
    </Container>
  );
};

export default App;
