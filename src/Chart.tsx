import { Box } from "@mui/system";
import React, { useContext, useMemo } from "react";
import {
  Bar,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { AppContext } from "./App";
import "./App.css";

export const Chart = () => {
  const { attribute, rows } = useContext(AppContext);

  const chartData = useMemo(() => {
    const benfords = [0, 30.1, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8, 5.1, 4.6];
    const entries = rows
      .map((row) => row.firstNumber)
      .reduce((map, number) => {
        if (!map.has(number)) {
          map.set(number, 0);
        }
        map.set(number, (map.get(number) as number) + 1);
        return map;
      }, new Map<string, number>());

    let chartData = [];
    for (let i of "123456789") {
      if (entries.has(i)) {
        chartData.push({
          number: i,
          percentage: (100 * (entries.get(i) as number)) / rows.length,
          benfords: benfords[Number(i)],
          expected: 11,
        });
      }
    }
    return chartData;
  }, [rows]);

  return (
    <div>
      {rows.length >= 5 && (
        <Box mt={2}>
          <Box mt={4}>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={chartData as any}>
                <XAxis dataKey="number" />
                <YAxis unit="%" />
                <Legend />
                <Bar name={attribute} dataKey="percentage" fill="#1976d2" />
                <Line
                  name="Benford's Law"
                  dataKey="benfords"
                  fill="#800080"
                  stroke="#800080"
                />
                <Line
                  name="Uniform"
                  dataKey="expected"
                  fill="#ff0000"
                  stroke="#ff0000"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      )}
    </div>
  );
};
