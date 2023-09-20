import React, {FC} from 'react';
import {Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from "@mui/material";

import {ILap} from "../types";
import {millisecondsToTimeString} from "../utils";

interface IProps {
    rows: ILap[];
}

export const TableLaps: FC<IProps> = ({ rows }: IProps) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Lap</TableCell>
                        <TableCell align="left">Pilot</TableCell>
                        <TableCell align="right">Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.filter((row) => row.num > 0).map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">
                                {`Lap ${row.num}`}
                            </TableCell>
                            <TableCell align="left">
                                {row.pilot.login}
                            </TableCell>
                            <TableCell align="right">{millisecondsToTimeString(row.time)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};