import React from "react";



const columns = [
  {
    id: 1, hide: 'true', field: 'trancheStatus',
    comparator: (a,b) => {
      console.log(a,b);
     return 0;
    }
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
  {
    id: 6, headerName: 'People', field: 'people',
    cellRenderer: 'agAnimateShowChangeCellRenderer',
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