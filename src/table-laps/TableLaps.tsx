import React, {FC} from 'react';
import {ILap} from "../types";
import {Paper, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

interface IProps {
    rows: ILap[];
}

export const Table: FC<IProps> = ({ rows }: IProps) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Pilot</TableCell>
                        <TableCell align="right">Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.pilot_id}
                            </TableCell>
                            <TableCell align="right">{row.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};