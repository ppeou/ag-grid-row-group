import React from "react";


const getChildrenCount = (node, hideOnSingleChild) => {
  return '';
  const count = node.childrenAfterFilter.length;
  if (hideOnSingleChild && count <= 1) {
    return '';
  }
  return `[${count}]`;
};

const valueGetterForStateGroup = (arg) => {
  const {data: {dealId: dealId, dealName}} = arg;
  return `${dealId}-${dealName}`;
};

const valueFormatterForZoneGroup = ({value, node}) => {
  return `${value} ${getChildrenCount(node)}`;
};

const valueFormatterForStateGroup = (arg) => {
  const {value, node} = arg;
  const name = value.split('-').pop();
  const suffix = getChildrenCount(node, true);
  return `${name}${suffix ? ' ' + suffix : ''}`;
};

const valueFormatterForSingleChild = (arg) => {

  const {colDef, node, value} = arg;
  const {childrenAfterGroup, level} = node;
  if (level > 1) {
    return value;
  }

  const {field} = colDef;
  if (childrenAfterGroup && childrenAfterGroup.length === 1 && childrenAfterGroup[0].data) {
    return childrenAfterGroup[0].data[field];
  }
  return undefined;
};

const myRender = ({value, node}) => {
  const suffix = getChildrenCount(node);
  const text = [value, suffix].join(' ');
  return <div className="myDiv">{text}</div>
};

//const zoneKeyCreator = ({value: {trancheStatus}}) => trancheStatus;
const zoneStateKeyCreator = ({value: {trancheStatus, dealId}}) => `${trancheStatus}-${dealId}`;

const columns = [
  {
    //field: 'g1Id',
    field: 'trancheStatus',
    headerName: 'Status',
    rowGroupIndex: 0,
    //rowGroup: true,
    hide: true,
    valueFormatter: valueFormatterForZoneGroup
    //cellRendererFramework: myRender,
  },
  {
    //field: 'g2Id',
    width: 200,
    field: 'dealId',
    headerName: 'Deal Name',
    rowGroupIndex: 1,
    //rowGroup: true,
    hide: true,
    valueFormatter: valueFormatterForStateGroup,
    valueGetter: valueGetterForStateGroup,
    //enableCellChangeFlash: true,
    //keyCreator: zoneStateKeyCreator,
    //cellRendererFramework: myRender,
  },
  {
    headerName: 'Tranche', field: 'trancheName',
    cellRenderer: 'agAnimateShowChangeCellRenderer',
    filter: 'agTextColumnFilter'
    //valueFormatter: valueFormatterForSingleChild
  },
  {
    headerName: 'Connection', field: 'connection',
    filter: 'agTextColumnFilter'
    //valueFormatter: valueFormatterForSingleChild
  },

  {
    headerName: 'IOI (mm)', field: 'ioi',
    cellRenderer: 'agAnimateShowChangeCellRenderer',
    filter: 'agNumberColumnFilter',
    //valueFormatter: valueFormatterForSingleChild
  },
  {
    headerName: 'Order ID', field: 'rid',
    //valueFormatter: valueFormatterForSingleChild
  },
];

function getSimpleCellRenderer() {
  function SimpleCellRenderer() {
  }

  SimpleCellRenderer.prototype.init = function (params) {
    const tempDiv = document.createElement('div');
    if (params.node.group) {
      tempDiv.innerHTML =
        '<span style="border-bottom: 1px solid grey; border-left: 1px solid grey; padding: 2px;">' +
        params.value +
        '</span>';
    } else {
      tempDiv.innerHTML =
        '<span><img src="https://flags.fmcdn.net/data/flags/mini/ie.png" style="width: 20px; padding-right: 4px;"/>' +
        params.value +
        '</span>';
    }
    this.eGui = tempDiv.firstChild;
  };
  SimpleCellRenderer.prototype.getGui = function () {
    return this.eGui;
  };
  return SimpleCellRenderer;
};

const defaultColDef = {
  flex: 1,
  filter: true,
  sortable: true,
  resizable: true,
  width: 170,
  floatingFilter: true,
};

const autoGroupColumnDef = {
  //filter: true,
  filter: 'agTextColumnFilter',
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

export {columns as default, getSimpleCellRenderer, defaultColDef, autoGroupColumnDef, rowClassRules};