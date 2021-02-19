import React, {useRef, useCallback} from 'react';
import {AgGridReact} from '@ag-grid-community/react';

import {AllModules} from '@ag-grid-enterprise/all-modules';
import {createRandomUpdate} from './data_creator';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-dark.css';
import '../css/grid.css';
import columns, {getSimpleCellRenderer} from './columns';

const trancheStatusSortOrder = {
  AAA: 1,
  BBB: 2,
  CCC: 3
};


let {data, getRandom} = createRandomUpdate();
data = [
  {"rid":1,"trancheStatus":"CCC","dealId":"TX","dealName":"Texas","trancheName":"Austin","zip":"77001","people":117, sort: 1},
  {"rid":2,"trancheStatus":"AAA","dealId":"NY","dealName":"New York","trancheName":"Utica-2","zip":"10001","people":287, sort: 2},
  {"rid":3,"trancheStatus":"CCC","dealId":"PA","dealName":"Pennsylvania","trancheName":"Pittsburgh-3","zip":"19101","people":230, sort: 3},
  {"rid":4,"trancheStatus":"BBB","dealId":"NY","dealName":"New York","trancheName":"NYC-4","zip":"10002","people":294, sort: 4},
  {"rid":5,"trancheStatus":"BBB","dealId":"PA","dealName":"Pennsylvania","trancheName":"Harrisburg-5","zip":"19102","people":130, sort: 5},
  {"rid":6,"trancheStatus":"AAA","dealId":"NY","dealName":"New York","trancheName":"Utica-6","zip":"10003","people":225, sort: 6},
  {"rid":7,"trancheStatus":"BBB","dealId":"NY","dealName":"New York","trancheName":"Utica-7","zip":"10004","people":201, sort: 7},
  {"rid":8,"trancheStatus":"CCC","dealId":"TX","dealName":"Texas","trancheName":"Austin","zip":"77002","people":230, sort: 8},
  {"rid":9,"trancheStatus":"AAA","dealId":"PA","dealName":"Pennsylvania","trancheName":"Pittsburgh-9","zip":"19103","people":234, sort: 9},
  {"rid":10,"trancheStatus":"BBB","dealId":"TX","dealName":"Texas","trancheName":"Houston-10","zip":"77003","people":165, sort: 10}
];


const changes = [
  {update: [
      {"rid":1,"trancheStatus":"CCC","dealId":"TX","dealName":"Texas New","trancheName":"Austin-1","zip":"77001-1","people":117, sort:1},
      {"rid":8,"trancheStatus":"CCC","dealId":"TX","dealName":"Texas New","trancheName":"Austin-8","zip":"77002-8","people":230, sort:8},
    ]},

  {update: [{"rid":1,"trancheStatus":"CCC","dealId":"TX","dealName":"Texas","trancheName":"Austin-1","zip":"77001","people":2, sort:1}]},

  {update: [{"rid":8,"trancheStatus":"CCC","dealId":"TX","dealName":"Texas","trancheName":"Austin-8","zip":"77002","people":3, sort:8}]},
  {update: [{"rid":1,"trancheStatus":"CCC","dealId":"TX","dealName":"Texas","trancheName":"Austin-10","zip":"77001","people":20, sort:1}]},

  {update: [{"rid":8,"trancheStatus":"CCC","dealId":"TX","dealName":"Texas","trancheName":"Austin-80","zip":"77002","people":3}]},

  {update: [{"rid":1,"trancheStatus":"CCC","dealId":"TX","dealName":"Texas","trancheName":"Austin-1","zip":"77001-A","people":117}]},
  {update: [{"rid":1,"trancheStatus":"Yello","dealId":"TX","dealName":"Texas","trancheName":"Austin-1","zip":"was CCC","people":117}]},
  {remove: [{"rid":6}]},
];

const compareNumber = (a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};

const trancheStatusGroupSort = (a, b) => {
  console.log('trancheStatus: ', a, b);
  const a1 = trancheStatusSortOrder[a.key];
  const b1 = trancheStatusSortOrder[b.key];
  return compareNumber(a1 < b1);
};

const dealIdGroupSort = (a, b) => {
  const a1 = a.allLeafChildren[0].data.sort;
  const b1 = b.allLeafChildren[0].data.sort;
  return compareNumber(a1 < b1);
};

const groupSort = {
  dealId: dealIdGroupSort,
  trancheStatus: trancheStatusGroupSort,
};

const Dashboard = () => {

  const gridRef = useRef();
  window.data = data;

  const defaultColDef = {
    filter: true,
    sortable: true,
    resizable: true,
    width: 170
  };
  let iid = 0;
  const autoGroupColumnDef = {
    filter: true,

    filterValueGetter: (args) => {
      const {colDef: {showRowGroup}, node: {level}, data} = args;
      const fieldMap = {trancheStatus: 'trancheStatus', dealId: 'dealName'};
      return data[fieldMap[showRowGroup]];
    },
    //field: 'trancheStatus',
    cellRendererParams: {
      //suppressCount: true,
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
    const delta = changes.shift();
    gridRef.current.api.applyTransactionAsync(delta);  //delat: {update: [], remove: [], add: [{}]}
    /*const {delta} = getRandom();

    const addItems = [{rid:101, trancheStatus:'Yello',dealId:'CA',deal:'California',trancheName:'LA+10',zip:'90001',people:10}];

    gridRef.current.api.applyTransaction({ update: delta });
    gridRef.current.api.applyTransaction({ add: addItems });
    console.log(delta);*/
  };
  const getRowNodeId = ({rid}) => rid;

  const components = { simpleCellRenderer: getSimpleCellRenderer() };

  const defaultSort = (a, b) => {
    if (a.key < b.key) {
      return -1;
    } else if (a.key > b.key) {
      return 1;
    } else {
      return 0;
    }
  };

  const defaultGroupSortComparator = (a, b) => {
    const {field} = a;
    if(groupSort[field]) {
      return groupSort[field](a,b);
    }

   return defaultSort(a,b);
  };




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
        groupRemoveSingleChildren={0}
        defaultGroupSortComparator={defaultGroupSortComparator}
        asyncTransactionWaitMillis={2000}

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