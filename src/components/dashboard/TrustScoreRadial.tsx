import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

interface TrustScoreRadialProps {
  score: number;
}

const data = [{ value: 100, fill: '#f0f0f0' }];

export default function TrustScoreRadial({ score }: TrustScoreRadialProps) {
  const mainData = [
    { 
      value: score, 
      fill: score > 75 ? '#4caf50' : score > 50 ? '#ff9800' : '#f44336' 
    }
  ];

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="80%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            data={mainData}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            cornerRadius={10}
              
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: '2rem', fontWeight: 'bold' }}
          >
            {score}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
      <Typography variant="body2" align="center" sx={{ mt: 1 }}>
        Overall Trust Score
      </Typography>
    </Box>
  );
}