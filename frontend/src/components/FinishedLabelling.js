import { Button, Box, Typography, Container } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function FinishedLabelling({
    handleUpload,
    setNotFoundError,
    index,
}) {
    return (
        <Container sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              404 Error: Resource Not Found
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
            Upload a dataset to start labelling posts.
            </Typography>
            <form onSubmit={(e) => { e.preventDefault(); setNotFoundError(false); }} encType="multipart/form-data">
              <input
              accept=".csv,.json"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file" name="file"
              onChange={handleUpload}
            />
            <label htmlFor="raised-button-file">
              <Button component="span" variant="contained" startIcon={<CloudUploadIcon />} sx={{ ml: 2 }}>
                Upload Dataset
              </Button>
              <br /><br />
              {
                index > 1 &&
                <b>You might have also labelled all the posts. Please download the labelled dataset.</b>
              }
            </label>
          </form>
          </Box>
        </Container>
    )
}

export { FinishedLabelling };