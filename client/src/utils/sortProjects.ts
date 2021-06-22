import { ProjectState, ProjectSortValues } from '../models/projects';

const sortProjects = (projects: ProjectState[], sortBy: ProjectSortValues) => {
  switch (sortBy) {
    case 'newest':
      return projects
        .slice()
        .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp));

    case 'oldest':
      return projects
        .slice()
        .sort((a, b) => +new Date(a.timestamp) - +new Date(b.timestamp));

    case 'a-z':
      return projects
        .slice()
        .sort((a, b) =>
          a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
        );

    case 'z-a':
      return projects
        .slice()
        .sort((a, b) =>
          b.name.localeCompare(a.name, 'en', { sensitivity: 'base' })
        );

    case 'most-bugs':
      return projects.slice().sort((a, b) => +b.bugs - +a.bugs);

    case 'least-bugs':
      return projects.slice().sort((a, b) => +a.bugs - +b.bugs);

    case 'most-members':
      return projects
        .slice()
        .sort((a, b) => +b.members - +a.members);

    case 'least-members':
      return projects
        .slice()
        .sort((a, b) => +a.members - +b.members);
  }
};

export default sortProjects;
