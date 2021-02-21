const trancheStatusSortOrder = {
  Draft: 1,
  Subject: 2,
  Announced: 3
};



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
  const a1 = trancheStatusSortOrder[a.key] || 99;
  const b1 = trancheStatusSortOrder[b.key] || 99;
  return compareNumber(a1, b1);
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

export {groupSort};