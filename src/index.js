import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {LicenseManager} from "@ag-grid-enterprise/core";
LicenseManager.setLicenseKey("SHI_International_Corp_-_USA_on_behalf_of_JP_MORGAN_MultiApp_13Devs5_September_2020__MTU5OTI2MDQwMDAwMA==d3db635be6a3c637a95735f8d4084cfc");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);