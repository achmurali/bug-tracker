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
          fontWeight: '600',
          color: theme.palette.secondary.main,
          backgroundColor: theme.palette.primary.light,
        },
      }
}))

const CustomTable: React.FC<any> = ({headers,data,...props}) => {
    const classes = useStyles();
    return (
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
    )
}

export default CustomTable;