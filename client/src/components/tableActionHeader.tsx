import React from 'react'

import SortBar from './sortBar';
import SearchBar from './searchBar';
import FormDialog from '../components/formDialog';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputs: {
    display: 'flex',
    minWidth: '100%',
    justifyContent: 'space-between',
    marginBottom: '1.5em',
  }
}))

const TableActionHeader: React.FC<any> = (props) => {
  const classes = useStyles();

  return (
    <div style={{width:'100%',marginBottom:'1.5em'}}>
      <div className={classes.inputs}>
        <SearchBar label={props.label} setFilterValue={props.handleSearchBar} filterValue={props.searchValue} />
        <SortBar menuItems={props.menuItems} handleSortChange={props.handleSortChange} label={props.label} size="medium" sortBy={props.sortBy} />
      </div>
      <FormDialog
        triggerBtn={{
          type: 'normal',
          text: 'Add Project',
          icon: props.icon,
          size: 'large',
        }}
        title="Add a new project"
      >
        {props.dialog}
      </FormDialog>
    </div>
  )
};

export default TableActionHeader;