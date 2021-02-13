import React, {useRef} from 'react';
import {AgGridReact} from '@ag-grid-community/react';

import {AllModules} from '@ag-grid-enterprise/all-modules';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-dark.css';
import '../css/grid.css';


const getChildrenCount = (node, hideOnSingleChild) => {
  const count = node.childrenAfterGroup.length;
  if(hideOnSingleChild && count <= 1) {return '';}
  return `[${node.childrenAfterGroup.length}]`;
};

const valueGetterForStateGroup = ({data: {stateId: stateId, state}}) => {
  return `${stateId}-${state}`;
};

const valueFormatterForZoneGroup = ({value, node}) => {
  return `${value} ${getChildrenCount(node)}`;
};

const valueFormatterForStateGroup = ({value, node}) => {
  const name = value.split('-').pop();
  const suffix = getChildrenCount(node, true);
  return `${name}${suffix ? ' ' + suffix : ''}`;
};


const valueFormatterForCityGroup = ({value, node}) => {
  const suffix = getChildrenCount(node, true);
  return `${value}${suffix ? ' ' + suffix : ''}`;
};

const valueFormatterForSingleChild = (arg) => {
  const {colDef, node, value} = arg;
  const {childrenAfterGroup, level} = node;
  if(level > 1) {
    return value;
  }

  const {field} = colDef;
  if(childrenAfterGroup.length === 1) {
    return childrenAfterGroup[0].data[field];
  }
  return undefined;
};

const myInnerRenderer = (arg) => {
  console.log('myInnerRenderer', arg);
  return <div>Hi</div>;
};

const columns = [
  {
    field: 'zoneId', headerName: 'Status', rowGroupIndex: 0, hide: true,
    valueFormatter: valueFormatterForZoneGroup,
  },
  {
    field: 'stateId', headerName: 'Deal', rowGroupIndex: 1, hide: true,
    valueFormatter: valueFormatterForStateGroup,
    valueGetter: valueGetterForStateGroup
  },

  /*{field: 'zoneId', rowGroup: true, hide: true },
  {headerName: 'Status', showRowGroup: 'zoneId', cellRenderer: 'agGroupCellRenderer'},

  {field: 'stateId', rowGroup: true, hide: true },
  {headerName: 'Deal', showRowGroup: 'stateId', cellRenderer: 'agGroupCellRenderer'
    ,
    cellRendererParams: {
      suppressCount: true, // turn off the row count
      suppressDoubleClickExpand: true, // turn off double click for expand
      //checkbox: true, // enable checkbox selection
      innerRenderer: myInnerRenderer, // provide an inner renderer
      //footerValueGetter: myFooterValueGetter // provide a footer value getter
    }
  },*/


  /*{
    field: 'city', rowGroupIndex: 2, hide: true,
    valueFormatter: valueFormatterForCityGroup,
  },*/

  {id: 3, header: 'Tranche', field: 'city',
    valueFormatter: valueFormatterForSingleChild
  },
  {id: 4, header: 'Zip', field: 'zip',
    valueFormatter: valueFormatterForSingleChild
  },
];


const data = [
  {zoneId: 'Red', stateId: 'TX', state: 'Texas', city: 'Austin', zip: '1', people: 1},
  {zoneId: 'Red', stateId: 'TX', state: 'Texas', city: 'Austin', zip: '2', people: 2},
  {zoneId: 'Purple', stateId: 'TX', state: 'Texas', city: 'Houston', zip: '77001', people: 3},
  {zoneId: 'Blue', stateId: 'TX', state: 'Texas', city: 'Houston', zip: '77002', people: 4},
  {zoneId: 'Red', stateId: 'PA', state: 'Pennsylvania', city: 'Phila', zip: '19120', people: 5},
  {zoneId: 'Blue', stateId: 'PA', state: 'Pennsylvania', city: 'Phila', zip: '19121', people: 6},
  {zoneId: 'Red', stateId: 'NY', state: 'New York', city: 'NYC', zip: '19122', people: 7},
  {zoneId: 'Blue', stateId: 'NY', state: 'New York', city: 'NYC', zip: '19123', people: 8},
  {zoneId: 'Purple', stateId: 'NY', state: 'New York', city: 'NYC', zip: '19124', people: 9},

];

const Dashboard = () => {

  const gridRef = useRef();

  const defaultColDef = {};
  const autoGroupColumnDef = {
    //headerName: 'Zone',
    cellRendererParams: {suppressCount: true}

  };

  const expandAll = () => {
    gridRef.current.api.expandAll();
  };

  const collapseAll = () => {
    gridRef.current.api.collapseAll();
  };

  const expandZone = () => {
    gridRef.current.api.forEachNode(function(node) {
      if (node.group && node.level == 0) {
        node.setExpanded(true);
      }
    });
  };

  const onGridReady = (grid) => {
    gridRef.current = grid;
    window.agrid = grid;
  };

  return (<div>
    <div className="toolbar">
      <button onClick={expandAll}>Expand All</button> |
      <button onClick={collapseAll}>Collapse All</button> |
      <button onClick={expandZone}>Expand Zone</button>
    </div>
    <div className={'ag-theme-dark'} style={{width: '100vw', height: '100vh'}}>
      <AgGridReact
        autoGroupColumnDef={autoGroupColumnDef}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
        modules={AllModules}
        columnDefs={columns}
        multiSortKey="ctrl"
        groupDefaultExpanded={1}
        groupMultiAutoColumn={true}
        agroupRemoveSingleChildren={true}
        agroupRemoveLowestSingleChildren={true}
        agroupSuppressAutoColumn ={true}
      rowData={data}
      />
    </div>
  </div>);
};

export default Dashboard;