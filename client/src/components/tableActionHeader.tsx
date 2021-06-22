import React from 'react'
import { Button } from '@material-ui/core';

import SortBar from './sortBar';
import SearchBar from './searchBar';
import FormDialog from '../components/formDialog';

const TableActionHeader:React.FC<any> = (props) => {

    return (
        <>
        <SearchBar label={props.label} setFilterValue={props.handleSearchBar} filterValue={props.searchValue}/>    
        <SortBar menuItems={props.menuItems} handleSortChange={props.handleSortChange} label={props.label} size="medium" sortBy={props.sortBy} />
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
        </>
    )
};

export default TableActionHeader;