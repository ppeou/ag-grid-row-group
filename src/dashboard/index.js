import React, {useRef, useCallback, useState} from 'react';
import {AgGridReact} from '@ag-grid-community/react';

import {AllModules} from '@ag-grid-enterprise/all-modules';
import {createRandomUpdate} from './data_creator';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-dark.css';
import '../css/grid.css';
import columns, {getSimpleCellRenderer, defaultColDef, autoGroupColumnDef, rowClassRules} from './columns';
import {data, changes} from './data';
import {groupSort} from './sorter';


let {data: randomData, getRandom} = createRandomUpdate();

const UpdateToolbar = ({gridRef}) => {
  const [state, setState] = useState();
  const {data: {name, items}, actionNumber, totalActions} = state || {data: {}};

  React.useEffect(() => {
    setState({data: changes.shift(), actionNumber: 1, totalActions: 8});
  }, []);

  const doUpdate = () => {
    console.log('update:', name, items);
    gridRef.current.api.applyTransactionAsync(items);
    setState({data: changes.shift() || {}, actionNumber: actionNumber + 1, totalActions: 8});
  };


  return name ? (<div>
    Action {actionNumber} of {totalActions} <button onClick={doUpdate}>Click to update: "{name}"</button>
  </div>) : (actionNumber > totalActions ? <button onClick={() => {window.location.reload()}}>Click to Restart</button> : null);

};


const Toolbar = ({gridRef}) => {
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


  return (<div className='toolbar'>
    <button onClick={expandAll}>Expand All</button> | <button onClick={collapseAll}>Collapse All</button> | <button onClick={expandZone}>Expand To Deal</button> | <UpdateToolbar gridRef={gridRef}/>
  </div>);

};

const Dashboard = () => {

  const gridRef = useRef();
  window.data = data;


  const onGridReady = useCallback((grid) => {
    gridRef.current = grid;
  }, []);

  const cellDoubleClicked = (arg) => {
    const {node} = arg;
    const {node: {level, childrenAfterGroup}} = arg;
    if (level === 1 && childrenAfterGroup.length === 1) {
      arg.event.stopPropagation();
      arg.event.preventDefault();
      return false;
    } else {
      //if we want to use custom renderer, we can expand on double click
      node.setExpanded(!node.expanded);
    }
  };

  const getRowNodeId = ({rid}) => rid;

  const components = {simpleCellRenderer: getSimpleCellRenderer()};

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
    if (groupSort[field]) {
      return groupSort[field](a, b);
    }

    return defaultSort(a, b);
  };


  return (<div>
    <Toolbar gridRef={gridRef}/>
    <div className={'ag-theme-dark'} style={{width: '100vw', height: 'calc(100vh - 40px)'}}>
      <AgGridReact
        modules={AllModules}
        columnDefs={columns}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
        multiSortKey='ctrl'
        autoGroupColumnDef={autoGroupColumnDef}

        groupDefaultExpanded={1}
        groupMultiAutoColumn={true}
        groupRemoveSingleChildren={0}
        defaultGroupSortComparator={defaultGroupSortComparator}
        asyncTransactionWaitMillis={100}

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