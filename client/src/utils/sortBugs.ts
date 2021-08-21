
const sortBugs = (bugs: any[], sortBy: any) => {
  switch (sortBy) {
    case 'newest':
      return bugs
        .slice()
        .sort((a, b) => +new Date(b.created_timestamp) - +new Date(a.created_timestamp));

    case 'oldest':
      return bugs
        .slice()
        .sort((a, b) => +new Date(a.created_timestamp) - +new Date(b.created_timestamp));

    case 'a-z':
      return bugs
        .slice()
        .sort((a, b) =>
          a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
        );

    case 'z-a':
      return bugs
        .slice()
        .sort((a, b) =>
          b.name.localeCompare(a.name, 'en', { sensitivity: 'base' })
        );

    case 'h-l':
      return bugs.slice().sort((a, b) => {
        if (a.priority.toLowerCase() === 'high') {
          return -1;
        }

        if (b.priority.toLowerCase() === 'low') {
          return 0;
        }

        return -1;
      });

    case 'l-h':
      return bugs.slice().sort((a, b) => {
        if (a.priority.toLowerCase() === 'low') {
          return -1;
        }

        if (b.priority.toLowerCase() === 'high') {
          return 0;
        }

        return 1;
      });
    case 'updated':
      return bugs.slice().sort((a, b) => {
        if (!a.updatedTimestamp) {
          return 1;
        }

        if (!b.updatedTimestamp) {
          return -1;
        }

        return +new Date(b.updatedTimestamp) - +new Date(a.updatedTimestamp);
      });

    case 'most-notes':
      return bugs.slice().sort((a, b) => b.notes - a.notes);

    case 'least-notes':
      return bugs.slice().sort((a, b) => a.notes - b.notes);
  }
};

export default sortBugs;
