const data = [
  {
    "rid": 1,
    "trancheStatus": "Subject",
    "dealId": 1002,
    "dealName": "Exxon Mobile 2021",
    "trancheName": "10 Years",
    "connection": "a,b,c",
    "ioi": 117,
    sort: 1
  },
  {
    "rid": 2,
    "trancheStatus": "Draft",
    "dealId": 2000,
    "dealName": "Pfizer Inc",
    "trancheName": "A",
    "connection": "",
    "ioi": 287,
    sort: 2
  },
  {
    "rid": 3,
    "trancheStatus": "Subject",
    "dealId": 3501,
    "dealName": "Comcast",
    "trancheName": "T1",
    "connection": "a",
    "ioi": 230,
    sort: 3
  },
  {
    "rid": 4,
    "trancheStatus": "Announced",
    "dealId": 2000,
    "dealName": "Pfizer Inc",
    "trancheName": "D",
    "connection": "b",
    "ioi": 294,
    sort: 4
  },
  {
    "rid": 5,
    "trancheStatus": "Announced",
    "dealId": 3501,
    "dealName": "Comcast",
    "trancheName": "T3",
    "connection": "a,b",
    "ioi": 130,
    sort: 5
  },
  {
    "rid": 6,
    "trancheStatus": "Draft",
    "dealId": 2000,
    "dealName": "Pfizer Inc",
    "trancheName": "B",
    "connection": "c",
    "ioi": 225,
    sort: 6
  },
  {
    "rid": 7,
    "trancheStatus": "Announced",
    "dealId": 2000,
    "dealName": "Pfizer Inc",
    "trancheName": "C",
    "connection": "c",
    "ioi": 201,
    sort: 7
  },
  {
    "rid": 8,
    "trancheStatus": "Subject",
    "dealId": 1002,
    "dealName": "Exxon Mobile 2021",
    "trancheName": "20 Years",
    "connection": "a",
    "ioi": 230,
    sort: 8
  },
  {
    "rid": 9,
    "trancheStatus": "Draft",
    "dealId": 3501,
    "dealName": "Comcast",
    "trancheName": "T2",
    "connection": "",
    "ioi": 234,
    sort: 9
  },
  {
    "rid": 10,
    "trancheStatus": "Announced",
    "dealId": 1002,
    "dealName": "Exxon Mobile 2021",
    "trancheName": "30 Years",
    "connection": "a,c",
    "ioi": 165,
    sort: 10
  }
];


const a1 = {
  name: 'rename Deal Exxon Mobile 2021',
  items: {
    update: [
      {
        "rid": 1,
        "trancheStatus": "Subject",
        "dealId": 1002,
        "dealName": "Exxon Mobile 2021 New",
        "trancheName": "10 Years",
        "connection": "c",
        "ioi": 117,
        sort: 1
      },
      {
        "rid": 8,
        "trancheStatus": "Subject",
        "dealId": 1002,
        "dealName": "Exxon Mobile 2021 New",
        "trancheName": "20 Years",
        "connection": "b",
        "ioi": 230,
        sort: 8
      },
    ]
  }
};

const a2 = {
  name: 'rename Exxon Tranche "20 Years" to "20 YRS"',
  items: {
    update: [{
      "rid": 8,
      "trancheStatus": "Subject",
      "dealId": 1002,
      "dealName": "Exxon Mobile 2021 New",
      "trancheName": "20 YRS",
      "connection": "a",
      "ioi": 230,
      sort: 1
    }]
  }
};

const a3 = {
  name: 'rename Exxon Tranche "10 Years" to "10 YRS"',
  items: {
    update: [{
      "rid": 1,
      "trancheStatus": "Subject",
      "dealId": 1002,
      "dealName": "Exxon Mobile 2021 New",
      "trancheName": "10 YRS",
      "connection": "",
      "ioi": 117
    }]
  }
};

const a4 = {
  name: 'update IOI for Exxon 10 YR tranche',
  items: {
    update: [{
      "rid": 1,
      "trancheStatus": "Subject",
      "dealId": 1002,
      "dealName": "Exxon Mobile 2021 New",
      "trancheName": "10 YRS",
      "connection": "a",
      "ioi": 20
    }]
  }
};

const a5 = {
  name: 'update IOI for Exxon 20 YR tranche',
  items: {
    update: [{
      "rid": 8,
      "trancheStatus": "Subject",
      "dealId": 1002,
      "dealName": "Exxon Mobile 2021 New",
      "trancheName": "20 YR",
      "connection": "",
      "ioi": 3
    }]
  }
};

const a6 = {
  name: 'move Exxon Tranche 10 Years to Draft Status',
  items: {
    update: [{
      "rid": 1,
      "trancheStatus": "Draft",
      "dealId": 1002,
      "dealName": "Exxon Mobile 2021 New",
      "trancheName": "10 YRS",
      "connection": "a",
      "ioi": 20
    }]
  }
};

const a7 = {
  name: 'move Exxon Tranche 10 Years to Announced Status',
  items: {
    update: [{
      "rid": 1,
      "trancheStatus": "Announced",
      "dealId": 1002,
      "dealName": "Exxon Mobile 2021 New",
      "trancheName": "10 YRS",
      "connection": "a",
      "ioi": 20
    }]
  }
};

const a8 = {
  name: 'remove Tranche B from Pfizer Inc Deal',
  items: {remove: [{"rid": 6}]}
};

const changes = [a1, a2, a3, a4, a5, a6, a7, a8];


/*const changes = [
  {update: [
      {"rid":1,"trancheStatus":"Subject","dealId":1002,"dealName":"Exxon Mobile 2021 New","trancheName":"10YR","connection":"c","ioi":117, sort:1},
      {"rid":8,"trancheStatus":"Subject","dealId":1002,"dealName":"Exxon Mobile 2021 New","trancheName":"20YR","connection":"b","ioi":230, sort:8},
    ]},

  {update: [{"rid":1,"trancheStatus":"Announced","dealId":1002,"dealName":"Exxon Mobile 2021","trancheName":"10RY","connection":"a","ioi":2, sort:1}]},

  {update: [{"rid":8,"trancheStatus":"Subject","dealId":1002,"dealName":"Exxon Mobile 2021","trancheName":"10 YRS","connection":"","ioi":3, sort:8}]},

  {update: [{"rid":1,"trancheStatus":"Subject","dealId":1002,"dealName":"Exxon Mobile 2021","trancheName":"20 YRS","connection":"a","ioi":20, sort:1}]},

  {update: [{"rid":8,"trancheStatus":"Subject","dealId":1002,"dealName":"Exxon Mobile 2021","trancheName":"10 YR","connection":"","ioi":3}]},

  {update: [{"rid":1,"trancheStatus":"Subject","dealId":1002,"dealName":"Exxon Mobile 2021","trancheName":"10 YRS","connection":"a","ioi":117}]},

  {update: [{"rid":1,"trancheStatus":"Announced","dealId":1002,"dealName":"Exxon Mobile 2021","trancheName":"10 YR","connection":"b","ioi":117}]},

  {remove: [{"rid":6}]},
];*/

export {data, changes};