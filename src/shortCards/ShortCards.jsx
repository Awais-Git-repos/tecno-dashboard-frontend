// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, Typography, Box } from '@mui/material';
// import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';



// const COLORS = ['#22c55e', '#1a1a1a']; // Green and Dark background color

// const DonutChartCard = ({inspectedQty}) => {
//   const [data, setData] = useState();
//   // Sample data for the donut chart
// useEffect(()=>{
//   const data = [
//     { name: 'Inspected Qty', value: inspectedQty?.modelSpecificQty },
//     { name: 'Remaining', value: inspectedQty?.overallQty }, // This value can be adjusted to show a donut effect
//   ];
//   console.log("The data is: ",inspectedQty);
//   setData([...data]);
// },[inspectedQty])
//   return (
//     <Card 
//       sx={{
//         backgroundColor: '#1a1a1a',
//         color: '#fff',
//         borderRadius: 2,
//         maxWidth: 270,
//         border: '1px solid rgba(255, 255, 255, 0.1)',
//         boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
//         display: 'flex',
//         flexDirection: 'column',
//         padding: 1,
//       }}
//     >
//       {data &&
//       <CardContent sx={{ textAlign: 'center' }}>
//       <Typography variant="subtitle1" sx={{ color: 'white' }}>
//         Total Inspected Qty
//       </Typography>
//      {data && 
//       <Typography variant="h3" component="div">
//       {data[0].value}
//       {/* 50k */}
//     </Typography>
//     }
//       <Box sx={{ height: 150, width: '100%', marginTop: 2 }}>
//         <ResponsiveContainer>
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               innerRadius={40}
//               outerRadius={70}
//               fill="#8884d8"
//               paddingAngle={5}
//               dataKey="value"
//             >
//               {data && data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index]} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </Box>
      
//     </CardContent>
//       }
//     </Card>
//   );
// };

// export default DonutChartCard;

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, ResponsiveContainer, Cell, Label } from 'recharts';

const COLORS = ['#22c55e', '#1a1a1a']; // Gradient for the inspected quantity and a dark color for the remaining

const DonutChartCard = ({ inspectedQty }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (inspectedQty) {
      const modelSpecificQty = inspectedQty.modelSpecificQty || 0;
      const overallQty = inspectedQty.overallQty || 0;

      // Calculate the remaining quantity
      const remainingQty = overallQty - modelSpecificQty;

      // Set the data for the donut chart
      const data = [
        { name: 'Inspected Qty', value: modelSpecificQty },
        { name: 'Remaining', value: remainingQty < 0 ? 0 : remainingQty },
      ];

      console.log("The data is: ", inspectedQty);
      setData(data);
    }
  }, [inspectedQty]);

  // Calculate the percentage of inspected quantity
  const totalQty = (data[0]?.value + data[1]?.value) || 0;
  const inspectedPercentage = totalQty ? ((data[0]?.value / totalQty) * 100).toFixed(2) : 0;

  return (
    <Card 
      sx={{
        backgroundColor: '#1a1a1a',
        color: '#fff',
        borderRadius: 2,
        maxWidth: 270,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        padding: 1,
      }}
    >
      {data.length > 0 &&
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="subtitle1" sx={{ color: 'white' }}>
          Total Inspected Qty
        </Typography>
        <Typography variant="h3" component="div">
          {data[0].value} {/* Display modelSpecificQty */}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: '#888' }}>
          Overall Qty: {data[0].value + data[1].value}
        </Typography>
        <Box sx={{ height: 150, width: '100%', marginTop: 2 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
                <Label
                  value={`${inspectedPercentage}%`}
                  position="center"
                  style={{ fontSize: '24px', fill: '#22c55e', fontWeight: 'bold' }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
      }
    </Card>
  );
};

export default DonutChartCard;

