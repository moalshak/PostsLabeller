import { useState, useEffect } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Pagination from '@mui/material/Pagination';
import { PostCard } from './PostCard';
import { Button, CircularProgress, TextField } from '@mui/material';
import { getBackendUrl } from '../utils';

function MainComponents({
    index,
    setIndex,
    setNotFoundError,
    isRelevant,
    setIsRelevant,
    setLoading,
}) {
    const [post, setPost] = useState();
    const [maxIndex, setMaxIndex] = useState(0);
    const [inputIndex, setInputIndex] = useState('');
    const handleInputChange = (event) => {
        setInputIndex(event.target.value);
      };
    
      const handleSetIndex = () => {
        if (!isNaN(inputIndex) && inputIndex.trim() !== '') {
          setIndex(parseInt(inputIndex));
          setInputIndex('');  // Clear input after setting
        }
      };

    const goToNextNoLabel = async () => {
      try {
        const response = await fetch(`${getBackendUrl()}/next-unlabeled?startIndex=${index}`);
        const newIndex = await response.json();
        setIndex(newIndex);
      } catch (err) {
        console.log(err);
      }
    }

    const labelPost = async (label) => {
        await fetch(`${getBackendUrl()}/row/${index}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Label: label.toString() })
        });
        setIsRelevant(label.toString()); // Reflect label in the UI immediately
    };

    const fetchPost = async (index) => {
        try {
          const response = await fetch(`${getBackendUrl()}/row/${index}`);
          if (response.ok) {
            const data = await response.json();
            const label = data.Label === "undefined" ? undefined : data.Label;
            setIsRelevant(label);
            setPost(data);
            setNotFoundError(false);
            setLoading(false);
          } else if (response.status === 404) {
            setNotFoundError(true);
          }
        } catch (error) {
          console.error('Fetch error:', error);
          setNotFoundError(true);
        }
    };

    const handleNext = () => {
        setIndex(index + 1);
    };

    const handlePrevious = () => {
    setIndex(index - 1);
    };
    
    const fetchMaxIndex = async () => {
    const response = await fetch(`${getBackendUrl()}/rows-count`);
    const data = await response.json();
    setMaxIndex(data);
    }
    
    useEffect(() => {
    if(index > 0) {
        fetchPost(index);
        fetchMaxIndex();
    }
    }, [index]);

    return (
        <>

        <div className="App-header">
        {
            post
            ?
             <div className="card-container">
                <PostCard post={post} relevant={isRelevant} /></div>
            :
                <CircularProgress />
        }
        <div className="navigation-buttons">
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handlePrevious} disabled={index <= 1}>Previous</Button>
          {
            isRelevant === undefined && (
            <Button variant="outlined" endIcon={<CancelIcon/>} onClick={() => labelPost(0)}>Label as Irrelevant</Button>
          )}
          {
            isRelevant !== undefined && (
            <Button variant="outlined" endIcon={isRelevant === "1" ? <CancelIcon/> : <CheckCircleIcon/> } onClick={() => labelPost(isRelevant === "1" ? 0 : 1)}>
              Label as {isRelevant === "1" ? "Not Relevant" : "Relevant"}
            </Button>
          )}
          <Button variant="outlined" endIcon={<ArrowForwardIcon />} disabled={index == maxIndex}  onClick={handleNext}>Next</Button>
        </div>
        </div>
        <Pagination count={maxIndex} variant="outlined" onChange={(event, value) => setIndex(value)} page={index}/>
        <div className="index-input">
            <TextField 
              label="Set Index" 
              type="number"
              value={inputIndex}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              style={{ marginRight: 8 }}
              inputProps={{
                min: 1,       // Minimum value set to 1
                max: maxIndex // Maximum value set to the value of maxIndex
              }}
            />
            <Button variant="contained" onClick={handleSetIndex}>Set Index</Button>

            <Button variant='contained' onClick={goToNextNoLabel}>Go To Next Unlabeled</Button>

          </div>
        </>
    )
}

export { MainComponents };