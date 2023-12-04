
import "./App.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container, Dropdown } from "react-bootstrap";
import styled from "styled-components";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Line } from "react-chartjs-2";
import { useState } from "react";
import Chart from "chart.js/auto";
import Typography from '@mui/material/Typography';

import data from "../../muse_data/sleepData.json";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Footer } from 'flowbite-react';

import { default as _map } from "lodash/map";


const Block = styled(Col)`
  border-style: solid;
  border-width: medium;
  border-color: #87ceeb;
  font-size: 20px;
  font-weight: bolder;
  margin: 40px 20px;
`;

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

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
  const [active, setActive] = useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    
    <Container>
      <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/expenses"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Brain Gang
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Brain Gang
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Brain Gang" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
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
     <Row className="d-flex justify-content-evenly mt-5">
        <Col>
          <Row>
            <Card >
              <Typography gutterBottom variant="h5" component="div" mb={3}>Good Sleep Time: {data.good_sleep_time}hr</Typography>
            </Card>
          </Row>
          <Row>

          <Card lg="8" style={{ marginTop: "100px"}}>
              <Typography gutterBottom variant="h5" component="div">
                Shallow Sleep Time: {data.shallow_sleep_time}hr
              </Typography>
            </Card>
          </Row>
        </Col>
        <Col>
          <Row>
            <Card>
              <h5>Dream Time and Brain Activity</h5>
              <img src={loader(`./${graph}`)} alt="Trees" height="300"></img>
            </Card>
          </Row>
        </Col>
      </Row>

      <Row className="mt-5">
        <h3
          className="d-flex justify-content-center"
          style={{ fontWeight: "bolder" }}
        >
          Sleeping Quality
        </h3>
        <Row>
          <Col xs></Col>
          <Card lg="8" style={{ minHeight: "80px", fontSize: "23px" }}>
            <Container>Good Sleep Time Percentage:</Container>
            <Container
              className="d-flex justify-content-center"
              style={{ fontWeight: "bolder" }}
            >
              {good_sleep_percent}%
            </Container>
          </Card>
          <Col xs></Col>
        </Row>
        <Row>
          <Col xs></Col>
          <Card lg="8" style={{ marginTop: "30px", minHeight: "80px", fontSize: "23px" }}>
            <Container>Quality:</Container>
            <Container
              className="d-flex justify-content-center"
              style={{ fontWeight: "bolder" }}
            >
              {quality}
            </Container>
          </Card>
          <Col xs></Col>
        </Row>
      </Row>
      <div class="footer" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright: 
        <a className='text-reset fw-bold' href='https://chimerical-tiramisu-4e51ef.netlify.app/'> Brain Gang
        </a>
      </div>
    </Container>
  );
};

export default App;
