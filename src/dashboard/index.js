import React, {useRef, useCallback} from 'react';
import {AgGridReact} from '@ag-grid-community/react';

import {AllModules} from '@ag-grid-enterprise/all-modules';
import {createRandomUpdate} from './data_creator';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-dark.css';
import '../css/grid.css';
import columns, {getSimpleCellRenderer} from './columns';




let {data, getRandom} = createRandomUpdate();
/*data = [{
  "rid": 1,
  "trancheStatus": "Purple",
  "dealId": "PA",
  "deal": "Pennsylvania",
  "trancheName": "Pittsburgh-1",
  "zip": "19101",
  "g1Id": "Purple",
  "g2Id": "Purple-PA",
  "g3Id": "Purple-PA-Pittsburgh-1",
  "people": 208
}, {
  "rid": 2,
  "trancheStatus": "Green",
  "dealId": "TX",
  "deal": "Texas",
  "trancheName": "Houston-2",
  "zip": "77001",
  "g1Id": "Green",
  "g2Id": "Green-TX",
  "g3Id": "Green-TX-Houston-2",
  "people": 247
}, {
  "rid": 3,
  "trancheStatus": "Red",
  "dealId": "NY",
  "deal": "New York",
  "trancheName": "NYC-3",
  "zip": "10001",
  "g1Id": "Red",
  "g2Id": "Red-NY",
  "g3Id": "Red-NY-NYC-3",
  "people": 143
}, {
  "rid": 4,
  "trancheStatus": "Green",
  "dealId": "TX",
  "deal": "Texas",
  "trancheName": "Houston-4",
  "zip": "77002",
  "g1Id": "Green",
  "g2Id": "Green-TX",
  "g3Id": "Green-TX-Houston-4",
  "people": 173
}, {
  "rid": 5,
  "trancheStatus": "Purple",
  "dealId": "NY",
  "deal": "New York",
  "trancheName": "Utica-5",
  "zip": "10002",
  //"g1Id": "Purple",
  //g2Id: null,
  //g3Id: null,
  "g2Id": "Purple-NY",
  //"g3Id": "Purple-NY-Utica-5",
  "people": 218
}, {
  "rid": 6,
  "trancheStatus": "Purple",
  "dealId": "PA",
  "deal": "Pennsylvania",
  "trancheName": "Phila-6",
  "zip": "19102",
  "g1Id": "Purple",
  "g2Id": "Purple-PA",
  "g3Id": "Purple-PA-Phila-6",
  "people": 258
}, {
  "rid": 7,
  "trancheStatus": "Red",
  "dealId": "NY",
  "deal": "New York",
  "trancheName": "NYC-7",
  "zip": "10003",
  "g1Id": "Red",
  "g2Id": "Red-NY",
  "g3Id": "Red-NY-NYC-7",
  "people": 279
}, {
  "rid": 8,
  "trancheStatus": "Purple",
  "dealId": "TX",
  "deal": "Texas",
  "trancheName": "Austin-8",
  "zip": "77003",
  "g1Id": "Purple",
  //"g2Id": "Purple-TX",
  //"g3Id": "Purple-TX-Austin-8",
  "people": 222
}, {
  "rid": 9,
  "trancheStatus": "Red",
  "dealId": "PA",
  "deal": "Pennsylvania",
  "trancheName": "Phila-9",
  "zip": "19103",
  "g1Id": "Red",
  "g2Id": "Red-PA",
  "g3Id": "Red-PA-Phila-9",
  "people": 195
}, {
  "rid": 10,
  "trancheStatus": "Red",
  "dealId": "NY",
  "deal": "New York",
  "trancheName": "Albany-10",
  "zip": "10004",
  "g1Id": "Red",
  "g2Id": "Red-NY",
  "g3Id": "Red-NY-Albany-10",
  "people": 263
}];*/
/*data = [
  {rid: 1, trancheStatus: 'Red', dealId: 'TX', deal: 'Texas', trancheName: 'Austin', zip: '1', people: 1},
  {rid: 2, trancheStatus: 'Red', dealId: 'TX', deal: 'Texas', trancheName: 'Austin', zip: '2', people: 2},
  {rid: 3, trancheStatus: 'Purple', dealId: 'TX', deal: 'Texas', trancheName: 'Houston', zip: '77001', people: 3},
  {rid: 4, trancheStatus: 'Blue', dealId: 'TX', deal: 'Texas', trancheName: 'Houston', zip: '77002', people: 4},
  {rid: 5, trancheStatus: 'Red', dealId: 'PA', deal: 'Pennsylvania', trancheName: 'Phila', zip: '19120', people: 5},
  {rid: 6, trancheStatus: 'Blue', dealId: 'PA', deal: 'Pennsylvania', trancheName: 'Phila', zip: '19121', people: 6},
  {rid: 7, trancheStatus: 'Red', dealId: 'NY', deal: 'New York', trancheName: 'NYC', zip: '19122', people: 7},
  {rid: 8, trancheStatus: 'Blue', dealId: 'NY', deal: 'New York', trancheName: 'NYC', zip: '19123', people: 8},
  {rid: 9, trancheStatus: 'Purple', dealId: 'NY', deal: 'New York', trancheName: 'NYC', zip: '19124', people: 9},

];*/

const Dashboard = () => {

  const gridRef = useRef();
  window.data = data;

  const defaultColDef = {};
  const autoGroupColumnDef = {
    cellRendererParams: {
      suppressCount: true,
      suppressDoubleClickExpand: true,
      suppressEnterExpand: true
    }

  };

  const expandAll = () => {
    gridRef.current.api.expandAll();
  };

  const collapseAll = () => {
    gridRef.current.api.collapseAll();
  };

  const expandZone = () => {
    gridRef.current.api.forEachNode(function (node) {
      if (node.group && node.level == 0) {
        node.setExpanded(true);
      }
    });
  };

  const rowClassRules = {
    singleTranche: (param) => {
      const {node: {level, childrenAfterGroup}} = param;
      if (level === 1) {
        if (childrenAfterGroup && childrenAfterGroup.length <= 1) {
          return true;
        }
      }
      return false;
    }
  };

  const onGridReady = useCallback((grid) => {
    gridRef.current = grid;
    window.agrid = grid;
  }, []);

  const cellDoubleClicked = (arg) => {
    console.log(arg);
    const {node}= arg;
    const {node: {level, childrenAfterGroup}} = arg;
    if(level === 1 && childrenAfterGroup.length === 1) {
      arg.event.stopPropagation();
      arg.event.preventDefault();
      return false;
    } else {
      //if we want to use custom renderer, we can expand on double click
      node.setExpanded(!node.expanded);
    }
  };

  const doUpdate = () => {
    const {delta} = getRandom();

    gridRef.current.api.applyTransaction/*Async*/({ update: delta });
    console.log(delta);
  };
  const getRowNodeId = ({rid}) => rid;

  const components = { simpleCellRenderer: getSimpleCellRenderer() };


  return (<div>
    <div className="toolbar">
      <button onClick={expandAll}>Expand All</button> |
      <button onClick={collapseAll}>Collapse All</button> |
      <button onClick={expandZone}>Expand Zone</button>
      <button onClick={doUpdate}>Update</button>
    </div>
    <div className={'ag-theme-dark'} style={{width: '100vw', height: '100vh'}}>
      <AgGridReact
        modules={AllModules}
        columnDefs={columns}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
        multiSortKey="ctrl"
        autoGroupColumnDef={autoGroupColumnDef}

        groupDefaultExpanded={1}
        groupMultiAutoColumn={true}
        groupRemoveSingleChildren={true}

        components={components}
        arowClassRules={rowClassRules}
        onCellDoubleClicked={cellDoubleClicked}
        rowData={data}
        getRowNodeId={getRowNodeId}
      />
    </div>
  </div>);
};

export default Dashboard;