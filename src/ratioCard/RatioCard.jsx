import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const DarkCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#1e1e1e', // Dark background
  color: '#ffffff', // White text
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)', // Subtle shadow for elegance
}));

const RatioTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: '#90caf9', // Light blue for ratios
  marginBottom: '8px',
}));

const DarkDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: '#757575', // Gray divider
  marginTop: '16px',
  marginBottom: '16px',
}));

const RatioCard = ({ model, scanned, unscanned, reset }) => {
  return (
    <DarkCard>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Model: {model}
        </Typography>

        <DarkDivider />

        <Box display="flex" flexDirection="column">
          <RatioTypography variant="body1">Scanned: {scanned}%</RatioTypography>
          <RatioTypography variant="body1">Unscanned: {unscanned}%</RatioTypography>
          <RatioTypography variant="body1">Reset: {reset}%</RatioTypography>
        </Box>
      </CardContent>
    </DarkCard>
  );
};

export default RatioCard;
