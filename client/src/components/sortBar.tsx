import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    makeStyles
} from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';

const useStyles = makeStyles((theme) => ({
    sortBarWrapper: {
        width: '25%',
        [theme.breakpoints.down('xs')]: {
          width: '42%',
        },
      }
}))

const SortBar: React.FC<{
    sortBy: string;
    handleSortChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
    menuItems: { value: string; label: string }[];
    label: string;
    size?: 'small' | 'medium';
}> = ({ sortBy, handleSortChange, menuItems, label, size }) => {
    const classes = useStyles();

    return (
        <div className={classes.sortBarWrapper}>
            <FormControl variant="outlined" fullWidth size={size || 'medium'}>
                <InputLabel id="sort-label">Sort {label} By</InputLabel>
                <Select
                    labelId="sort-label"
                    value={sortBy}
                    onChange={handleSortChange}
                    label={`Sort ${label} By`}
                    startAdornment={
                        <InputAdornment position="start">
                            <SortIcon
                                color="primary"
                                fontSize={size === 'small' ? 'default' : 'large'}
                            />
                        </InputAdornment>
                    }
                >
                    {menuItems.map((m) => (
                        <MenuItem key={m.value} value={m.value}>
                            {m.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SortBar;