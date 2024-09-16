import React, { useEffect, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";
import axios from "axios";

const Line_Chart = () => {
  const [data, setData] = useState([]);

  // Function to group and aggregate data by unique models
  const processData = (rawData) => {
    // Group data by 'Models' and aggregate the values
    const groupedData = rawData.reduce((acc, current) => {
      const { Models, Qty, Lines, DefectsDescription } = current;

      // Convert Qty to a number
      const numericQty = Number(Qty); // Or use parseInt(Qty, 10) if it's always an integer

      // Check if the model already exists in the accumulated data
      const existingModel = acc.find((item) => item.Models === Models);

      if (existingModel) {
        // Aggregate the values (e.g., summing the 'Qty')
        existingModel.Qty += numericQty;
        // You can also aggregate other properties like Lines, DefectsDescription if needed
      } else {
        // Add the model to the accumulated data if it's unique
        acc.push({
          Models,
          Qty: numericQty,
          Lines: Number(Lines) || 0, // Ensure Lines is also a number, defaulting to 0 if missing
          DefectsDescription: DefectsDescription || "", // Default empty string if undefined
        });
      }

      return acc;
    }, []);

    return groupedData;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");

      if (Array.isArray(response.data) && response.data.length > 0) {
        // Process data to ensure unique models
        const processedData = processData(response.data);
        setData(processedData);
      } else {
        console.error("Data is not in the expected format or is empty.");
        setData([]);
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      console.table(data);
    }
  }, [data]);

  return data.length > 0 ? (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Models" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Qty" stroke="#8884d8" />
        {/* If needed, you can add more Lines for other data keys */}
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <h1>No Data</h1>
  );
};

export default Line_Chart;
