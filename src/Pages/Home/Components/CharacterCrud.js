import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CharacterCrud({ data, hanldeDelete, handleCreate }) {
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let history = useHistory();

  const handleEdit = (id) => {
    history.push({ pathname: "/Form", search: `?id=${id}` });
  };
  const classes = useStyles();

  const rows = data && Object.values(data);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="right">Genero</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Donde se encuentra?</StyledTableCell>
            <StyledTableCell align="right">Especie</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row, id) => (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.gender}</StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.location.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.species}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    onClick={() => handleEdit(row.id)}
                    variant="contained"
                  >
                    <EditIcon />
                  </Button>

                  <Button
                    onClick={() => hanldeDelete(row.id)}
                    variant="contained"
                  >
                    <DeleteIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
