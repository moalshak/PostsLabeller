import './App.css';
import { useState, useEffect } from 'react';
import { NotFoundContainer } from './components/NotFoundContainer';
import { FinishedLabelling } from './components/FinishedLabelling';
import { ActionButtons } from './components/ActionButtons';
import { MainComponents } from './components/MainComponents';
import { Analytics } from './components/Analytics';
import { CircularProgress } from '@mui/material';
import { getBackendUrl } from './utils';

function App() {
  const [index, setIndex] = useState(0);
  const [notFoundError, setNotFoundError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fileExists, setFileExists] = useState(false);

  console.log('Backend URL:', getBackendUrl());

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(`http://${(getBackendUrl())}/upload`, {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        setIndex(1);
        setNotFoundError(false);
        window.location.reload();
      } else {
        console.error('Upload failed:', response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const seeIfFileExists = async () => {
    try {
      const response = await fetch(`${getBackendUrl()}/file-exists`);
      if (response.ok) {
        setIndex(1);
        setFileExists(true);
        setLoading(false);
      } else {
        setFileExists(false);
        setLoading(false);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setFileExists(false);
    }
  }

  useEffect(() => {
    seeIfFileExists();
  }, []);

  const [isRelevant, setIsRelevant] = useState(undefined);

  return (
    <div className="App">
      {
        loading ? <CircularProgress />
        :
        notFoundError ?  <NotFoundContainer />
        :
        fileExists && index > 0 ?
        <>
          <ActionButtons />
          <MainComponents
            index={index}
            setIndex={setIndex}
            setNotFoundError={setNotFoundError}
            isRelevant={isRelevant}
            setIsRelevant={setIsRelevant}
            setLoading={setLoading}
          />
          <Analytics 
            index={index}
            isRelevant={isRelevant}
          />
        </>
          :
          <FinishedLabelling
            handleUpload={handleUpload}
            setNotFoundError={setNotFoundError}
            index={index}
          />
      }
    </div>
  );
}

export default App;
