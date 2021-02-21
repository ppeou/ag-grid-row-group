import {range, random, cloneDeep} from 'lodash';

const g1 = {
  0: 'Red',
  1: 'Green',
  2: 'Purple'
};

const g2 = {
  0: ['NY', 'New York'],
  1: ['PA', 'Pennsylvania'],
  2: ['TX', 'Texas'],
};

const g3 = {
  0: ['NYC', 'Albany',  'Utica'],
  1: ['Phila', 'Harrisburg',  'Pittsburgh'],
  2: ['Houston', 'Austin', 'Dallas'],
};

const g4 = {
  0: 10000,
  1: 19100,
  2: 77000,
};

let ciid = 0;
let iid = 0;

const createData = () => {
  const data = [];

  range(0,10).forEach(() => {
    const g1Id = random(0,2);
    const g2Id = random(0,2);
    const g3Id = random(0,2);

    const trancheStatus = g1[g1Id];
    const [dealId, deal] = g2[g2Id];
    const trancheName = g3[g2Id][g3Id] + `-${++ciid}`;
    const zip = (++g4[g2Id]);

    data.push({
      rid: (++iid),trancheStatus, dealId, deal, trancheName, zip: `${zip}`,
      people: random(100,300)
    });
  });
  return data;
};


const createRandomUpdate = () => {
  let data = createData();

  const getRandom = () => {
    const cloneData =  cloneDeep(data);
    const delta = [];
    range(0,3).forEach(() => {
      const idx = random(0, cloneData.length - 1);
      const item = {...cloneData[idx]};
      item.zip = `${item.trancheStatus}-${item.dealId}-${item.trancheName}`;
      delta.push(item);
    });
    data = cloneData;
    return {data, delta};
  }
  return {data, getRandom};
};

;


export default createData;
export {createRandomUpdate}