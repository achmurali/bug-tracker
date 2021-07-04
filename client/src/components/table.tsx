import React from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
        '& thead th': {
          fontWeight: '500',
          color: 'white',
          backgroundColor: theme.palette.primary.main
        },
    },
    projectsListTable: {
        alignSelf: 'flex-start',
        width: "100%",
        [theme.breakpoints.down('xs')]: {
            marginTop: 0,
        },
    }
}));

const CustomTable: React.FC<any> = ({headers,data,...props}) => {
    const classes = useStyles();
    return (
        <div className={classes.projectsListTable}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    {headers.map((t:any) => (
                        <TableCell key={t} align="center">
                            {t}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((p:any) => {
                   let Component = props.body;
                   return (
                    <Component {...p} />
                   ) 
                } )}
            </TableBody>
        </Table>
        </div>
    )
}

export default CustomTable;