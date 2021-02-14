import React from "react";


const getChildrenCount = (node, hideOnSingleChild) => {
  const count = node.childrenAfterGroup.length;
  if (hideOnSingleChild && count <= 1) {
    return '';
  }
  return `[${node.childrenAfterGroup.length}]`;
};

const valueGetterForStateGroup = (arg) => {
  const {data: {dealId: dealId, deal}} = arg;
  console.log('vg', arg);
  return `${dealId}-${deal}`;
};

const valueFormatterForZoneGroup = ({value, node}) => {
  return `${value} ${getChildrenCount(node)}`;
};

const valueFormatterForStateGroup = (arg) => {
  console.log(arg);
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
    console.log(arg);
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
const zoneStateKeyCreator = ({value:{trancheStatus, dealId}}) => `${trancheStatus}-${dealId}`;

const columns = [
  {
    id: 1,
    //field: 'g1Id',
    field: 'trancheStatus',
    headerName: 'Status', rowGroupIndex: 0, hide: true,
    valueFormatter: valueFormatterForZoneGroup
    //cellRendererFramework: myRender,
  },
  {
    id: 2,
    //field: 'g2Id',
    field: 'dealId',
    headerName: 'Deal', rowGroupIndex: 1, hide: true,
    valueFormatter: valueFormatterForStateGroup,
    valueGetter: valueGetterForStateGroup,
    //keyCreator: zoneStateKeyCreator,
    //cellRendererFramework: myRender,
  },
  {
    id: 3, headerName: 'Tranche', field: 'trancheName',
    //valueFormatter: valueFormatterForSingleChild
  },
  {
    id: 4, headerName: 'Zip', field: 'zip',
    //valueFormatter: valueFormatterForSingleChild
  },
  {
    id: 5, headerName: 'RID', field: 'rid',
    //valueFormatter: valueFormatterForSingleChild
  },
];

function getSimpleCellRenderer() {
  function SimpleCellRenderer() {}
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

export {getSimpleCellRenderer};

export default columns;