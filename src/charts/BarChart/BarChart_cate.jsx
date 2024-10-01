import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CircularColor from '../../components/partial/Loader/Loader';
import axios from 'axios';
import { Button, Grid2 } from '@mui/material';
import FilterByModels from '../../components/AutoComplete/FilterByModels.jsx';
import FilterByDefects from '../../components/AutoComplete/FilterByDefects.jsx';
import FilterByLines from '../../components/AutoComplete/FilterByLines.jsx';

// Custom Tooltip Component
const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
    const modelData = sortedPayload[0]?.payload; // Get model data from payload

    return (
      <div
        style={{
          backgroundColor: 'rgba(10, 13, 32, 0.6)',
          backdropFilter: 'blur(10px)',
          padding: '1rem',
          borderRadius: '10px',
        }}
      >
        <h3 style={{ color: 'white', marginLeft: '1rem', marginTop: '1rem' }}>
          {label}
        </h3>
        <ul style={{ listStyle: 'none' }}>
          {sortedPayload.map(
            (dt) =>
              dt.value !== 0 && (
                <li
                  key={dt.name}
                  style={{
                    color: dt.fill,
                    display: 'flex',
                    justifyContent: 'space-between',
                    minWidth: '200px',
                  }}
                >
                  <div>{dt.name}</div>
                  <div>{dt.value}</div>
                </li>
              )
          )}
        </ul>

        {/* Display Top Lines */}
        {/* <h4 style={{ color: '#ffffff', marginTop: '1rem' }}>Top Lines:</h4>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {modelData?.topLines?.map((line, index) => (
            <li
              key={index}
              style={{
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                minWidth: '200px',
              }}
            >
              <div>{line.line}</div>
              <div>{line.count}</div>
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
  return null;
};

// Main Component
function HorizontalBarChartByModels({
  setModel,
  setRun,
  models,
  setModelName,
  modelName,
  damageName,
  setdamageName,
  defect,
  lineName,
  groupByLines,
  lines,
  setLineName
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://172.17.43.24:3000/groupByScanned');
        setData(mapData(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Map API response to chart data
  const mapData = (data) => {
    return Object.keys(data.byCheck).map((category) => ({
      Name: category,
      scanned: data.byCheck[category].scanned,
      unscanned: data.byCheck[category].unscanned,
      reset: data.byCheck[category].reset,
    }));
  };

  return loading ? (
    <CircularColor />
  ) : (
    data.length ? (
      <ResponsiveContainer width="120%" height={500} style={{marginLeft:'2rem'}}>
        {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '0.3rem' }}>
          <FilterByModels models={models} modelName={modelName} setModelName={setModelName} />
          <FilterByDefects defect={defect} damageName={damageName} setdamageName={setdamageName} />
          <FilterByLines lines={lines} lineName={lineName} setLineName={setLineName} />
          <div>
            <Button onClick={() => { setRun(true); }} variant='contained' sx={{ marginTop: '1rem' }}>RUN Query</Button>
          </div>
        </div> */}
        <BarChart
          width={1200}
          height={400}
          data={data} // Use mapped data
          layout="vertical"
          margin={{ top: 5, right: 50, left: 40, bottom: 5 }}
          
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="Name" stroke="#ffffff" />
          <Tooltip content={<CustomToolTip />} />
          <Legend wrapperStyle={{ color: '#ffffff' }} />
          <Bar
            dataKey="scanned"
            stackId="a"
            fill="#64bc8c"
            barSize={20}
            name="Scanned"
          />
          <Bar
            dataKey="unscanned"
            stackId="a"
            fill="#e4b434"
            barSize={20}
            name="Unscanned"
          />
          <Bar dataKey="reset" stackId="a" fill="#a47cdc" barSize={20} name="Reset" />
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <h3>No data to show</h3>
    )
  );
}

export default HorizontalBarChartByModels;
