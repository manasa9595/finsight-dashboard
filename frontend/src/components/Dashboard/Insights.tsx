import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import ApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { fetchClient } from "../../common/api/fetchClient";

export default function Insights() {
  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    // Simulated data for the radar chart
    // fetching from an API would be done here
    // For example:
    fetchClient("api/insights/chart")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.labels);
        setData(data.values);
      });
  }, []);

  const radarOptions: ApexOptions = {
    chart: {
      type: "radar",
    },
    xaxis: {
      categories,
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.2,
    },
  };

  const radarSeries = [
    {
      name: "Engagement Score",
      data,
    },
  ];

  return (
    <Box p={2}>
      <Typography variant="body1" gutterBottom>
        This section provides insights into user engagement across various
        features of the application.
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        The radar chart below visualizes the engagement scores for different
        features, helping you identify areas of strength and opportunities for
        improvement.
      </Typography>
      <Box mt={2} mb={2}></Box>
      <Paper elevation={3} sx={{ p: 2 }}>
        <ApexChart
          type="radar"
          options={radarOptions}
          series={radarSeries}
          height={350}
        />
      </Paper>
    </Box>
  );
}
