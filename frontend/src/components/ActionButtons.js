import { Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import { getBackendUrl } from '../utils';

function ActionButtons({
}) {
    const deleteDataset = async () => {
        try {
          const response = fetch(`${getBackendUrl()}/delete/`, { method: 'DELETE' })
          console.log('Dataset deleted successfully');
          alert("Dataset deleted successfully.");
          window.location.reload();
    
        } catch (error) {
          console.error('Delete error:', error);
          alert("An error occurred while deleting the dataset.");
        }
      };
    
      const downloadPost = async () => {
        const response = await fetch(`${getBackendUrl()}/download`);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = "downloaded_posts.json";
        document.body.appendChild(link);
        link.click();
        link.remove();
      };
    
    return (
        <div className="download-button-container">
        <Button variant="contained" startIcon={<CloudDownloadIcon />} onClick={downloadPost}>
          Download Labelled Dataset
        </Button>
        <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={deleteDataset}>
          Delete Dataset
        </Button>
      </div>
    );
}

export { ActionButtons };