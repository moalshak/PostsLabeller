import {Box, Typography, Container } from '@mui/material';

function NotFoundContainer() {
    return (
        <Container sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              404 Error: Resource Not Found
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              The requested post cannot be found. Please try another index.
              Maybe you have labelled all the posts. Please download the labelled dataset.
            </Typography>
            </Box>
        </Container>
    )
}

export { NotFoundContainer };