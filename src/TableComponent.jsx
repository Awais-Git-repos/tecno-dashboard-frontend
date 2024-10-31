import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable({ topLines,flag }) {
  const [data, setData] = React.useState(getUniqueTopLines(topLines));


    function getUniqueTopLines(data) {
        const uniqueLines = {};

       if(flag == "defect"){
      
        data.forEach((item) => {
          const { model, scanned, unscanned, reset } = item;
      
          if (!uniqueLines[model]) {
            uniqueLines[model] = { model, scanned: 0, unscanned: 0, reset: 0 };
          }
      
          uniqueLines[model].scanned += scanned;
          uniqueLines[model].unscanned += unscanned;
          uniqueLines[model].reset += reset;
        });
       }
       else{
      
        data.forEach((item) => {
          const { line, scanned, unscanned, reset } = item;
      
          if (!uniqueLines[line]) {
            uniqueLines[line] = { line, scanned: 0, unscanned: 0, reset: 0 };
          }
      
          uniqueLines[line].scanned += scanned;
          uniqueLines[line].unscanned += unscanned;
          uniqueLines[line].reset += reset;
        });
       }
      
        // Convert the object back into an array format
        return Object.values(uniqueLines);
      }
      
  
  useEffect(() => {
    setData(getUniqueTopLines(topLines));
  }, [topLines]);

  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Table sx={{ minWidth: 50, backgroundColor: 'transparent' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: 'transparent', color: 'white' }}>Name</TableCell>
              <TableCell align="right" sx={{ backgroundColor: 'transparent', color: 'white' }}>Scanned</TableCell>
              <TableCell align="right" sx={{ backgroundColor: 'transparent', color: 'white' }}>Un-Scanned</TableCell>
              <TableCell align="right" sx={{ backgroundColor: 'transparent', color: 'white' }}>Reset</TableCell>
              <TableCell align="right" sx={{ backgroundColor: 'transparent', color: 'white' }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.model}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ backgroundColor: 'transparent', color: 'white' }}>
                  {flag == "defect" ? row.model : row.line}
                </TableCell>
                <TableCell align="right" sx={{ backgroundColor: 'transparent', color: 'white' }}>
                  {row?.scanned || 0}
                </TableCell>
                <TableCell align="right" sx={{ backgroundColor: 'transparent', color: 'white' }}>
                  {row?.unscanned || 0}
                </TableCell>
                <TableCell align="right" sx={{ backgroundColor: 'transparent', color: 'white' }}>
                  {row?.reset || 0}
                </TableCell>
                <TableCell align="right" sx={{ backgroundColor: 'transparent', color: 'white' }}>
                  {row?.unscanned+row?.scanned+row?.reset}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
