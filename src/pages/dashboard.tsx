import { Box, Typography, Paper } from '@mui/material';
import * as React from 'react';

export default function Dashboard() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#1f1f1f"
    >
      <Paper
        elevation={6}
        sx={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <Typography
          variant="h3"
          fontWeight="600"
          color="primary.main"
          sx={{ mb: 2 }}
        >
          Coming Soon!
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          We're working on something exciting. Stay tuned and get ready!
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.primary"
          sx={{
            fontSize: '0.9rem',
            color: 'gray',
            fontStyle: 'italic',
          }}
        >
          This feature will be available soon. Thank you for your patience.
        </Typography>
      </Paper>
    </Box>
  );
}
