const filterBugs = (filterBy: any, bug: any) => {
  switch (filterBy) {
    case 'all':
      return true;
    case 'closed':
      return bug.isResolved === true;
    case 'open':
      return bug.isResolved === false;
  }
};

export default filterBugs;
