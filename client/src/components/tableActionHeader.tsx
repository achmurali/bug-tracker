import React from 'react'

import SortBar from './sortBar';
import SearchBar from './searchBar';
import FormDialog from '../components/formDialog';
import { makeStyles,FormControl,FormControlLabel,FormLabel,RadioGroup,Radio } from '@material-ui/core';

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
          text: `Add ${props.label}`,
          icon: props.icon,
          size: 'large',
        }}
        title="Add a new Bug"
      >
        {props.dialog}
      </FormDialog>
      {props.label === "Bugs" && (
      <div style={{float:"right"}}>
      <FormControl component="fieldset" style={{}}>
          <FormLabel component="legend" style={{ fontSize: '0.8em' }}>
            Filter Bugs By
          </FormLabel>
          <RadioGroup row value={props.filterBy} onChange={props.handleFilterChange}>
            <FormControlLabel
              value="all"
              control={<Radio color="primary" />}
              label="All"
            />
            <FormControlLabel
              value="closed"
              control={<Radio color="primary" />}
              label="Closed"
            />
            <FormControlLabel
              value="open"
              control={<Radio color="primary" />}
              label="Open"
            />
          </RadioGroup>
        </FormControl>
        </div>
      )}  
    </div>
  )
};

export default TableActionHeader;