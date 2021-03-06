import React, {useRef, useCallback} from 'react';
import {AgGridReact} from '@ag-grid-community/react';

import {AllModules} from '@ag-grid-enterprise/all-modules';
import {createRandomUpdate} from './data_creator';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-dark.css';
import '../css/grid.css';
import columns, {getSimpleCellRenderer} from './columns';

const trancheStatusSortOrder = {
  Green: 2,
  Red: 1,
  Purple: 3
};


let {data, getRandom} = createRandomUpdate();
data = [{"rid":1,"trancheStatus":"Purple","dealId":"TX","deal":"Texas","trancheName":"Austin-1","zip":"77001","people":117},{"rid":2,"trancheStatus":"Red","dealId":"NY","deal":"New York","trancheName":"Utica-2","zip":"10001","people":287},{"rid":3,"trancheStatus":"Purple","dealId":"PA","deal":"Pennsylvania","trancheName":"Pittsburgh-3","zip":"19101","people":230},{"rid":4,"trancheStatus":"Green","dealId":"NY","deal":"New York","trancheName":"NYC-4","zip":"10002","people":294},{"rid":5,"trancheStatus":"Green","dealId":"PA","deal":"Pennsylvania","trancheName":"Harrisburg-5","zip":"19102","people":130},{"rid":6,"trancheStatus":"Red","dealId":"NY","deal":"New York","trancheName":"Utica-6","zip":"10003","people":225},{"rid":7,"trancheStatus":"Green","dealId":"NY","deal":"New York","trancheName":"Utica-7","zip":"10004","people":201},
  {"rid":8,"trancheStatus":"Purple","dealId":"TX","deal":"Texas","trancheName":"Austin-8","zip":"77002","people":230},
  {"rid":9,"trancheStatus":"Red","dealId":"PA","deal":"Pennsylvania","trancheName":"Pittsburgh-9","zip":"19103","people":234},{"rid":10,"trancheStatus":"Green","dealId":"TX","deal":"Texas","trancheName":"Houston-10","zip":"77003","people":165}];


const changes = [
  {update: [{"rid":1,"trancheStatus":"Purple","dealId":"TX","deal":"Texas","trancheName":"Austin-1","zip":"77001","people":2}]},
  {update: [{"rid":8,"trancheStatus":"Purple","dealId":"TX","deal":"Texas","trancheName":"Austin-8","zip":"77002","people":3}]},

  {update: [{"rid":1,"trancheStatus":"Purple","dealId":"TX","deal":"Texas","trancheName":"Austin-10","zip":"77001","people":2}]},
  {update: [{"rid":8,"trancheStatus":"Purple","dealId":"TX","deal":"Texas","trancheName":"Austin-80","zip":"77002","people":3}]},

  {update: [
    {"rid":1,"trancheStatus":"Purple","dealId":"TX2","deal":"New Texas","trancheName":"Austin-1","zip":"77001-2","people":117},
    {"rid":8,"trancheStatus":"Purple","dealId":"TX2","deal":"New Texas","trancheName":"Austin-8","zip":"77002-2","people":230}
  ]},

  {update: [{"rid":1,"trancheStatus":"Purple","dealId":"TX","deal":"Texas","trancheName":"Austin-1","zip":"77001-A","people":117}]},
  {update: [{"rid":1,"trancheStatus":"Yello","dealId":"TX","deal":"Texas","trancheName":"Austin-1","zip":"was Purple","people":117}]},
  {remove: [{"rid":6}]},
];

const trancheStatusGroupSort = (a, b) => {
  console.log('trancheStatus: ', a, b);
  const a1 = trancheStatusSortOrder[a.key];
  const b1 = trancheStatusSortOrder[b.key];
  if (a1 < b1) {
    return -1;
  } else if (a1 > b1) {
    return 1;
  } else {
    return 0;
  }
};

const dealIdGroupSort = (a, b) => {
  return 0;
};

const groupSort = {
  dealId: dealIdGroupSort,
  trancheStatus: trancheStatusGroupSort,
};

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
    const delta = changes.shift();
    gridRef.current.api.applyTransactionAsync(delta);
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
        groupRemoveSingleChildren={false}
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