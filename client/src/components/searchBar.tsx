import React from 'react';
import { TextField, InputAdornment, IconButton, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
    searchBarWrapper: {
        width: '70%'
    }
}));

const SearchBar: React.FC<{
    filterValue: string;
    setFilterValue: (filterValue: string) => void;
    label: string;
    size?: 'small' | 'medium';
}> = ({ filterValue, setFilterValue, label, size }) => {
    const classes = useStyles();
    return (
        <div className={classes.searchBarWrapper}>
            <TextField
                value={filterValue}
                fullWidth
                size={size || 'medium'}
                type="text"
                label={`Search ${label}`}
                variant="outlined"
                onChange={(e) => setFilterValue(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon
                                color="primary"
                                fontSize={size === 'small' ? 'default' : 'large'}
                            />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="start">
                            {filterValue !== '' ? (
                                <IconButton onClick={() => setFilterValue('')} size="small">
                                    <ClearIcon
                                        color="primary"
                                        fontSize={size === 'small' ? 'default' : 'large'}
                                    />
                                </IconButton>
                            ) : (
                                <div></div>
                            )}
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default SearchBar;