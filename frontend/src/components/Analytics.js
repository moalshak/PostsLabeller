import React, { useState, useEffect } from 'react';
import { LinearProgress, Typography, Box, Divider } from '@mui/material';
import { getBackendUrl } from '../utils';

function Analytics({
    index,
    isRelevant,
}) {
    const [data, setData] = useState({
        totalPosts: 0,
        totalQuestions: 0,
        totalAnswers: 0,
        labeledPosts: 0,
        labeledQuestions: 0,
        percentageLabeledPosts: 0,
        labeledAnswers: 0,
        percentageLabeledQuestions: 0,
        percentageLabeledAnswers: 0,
        relevantPosts: 0,
        irrelevantPosts: 0,
        percentageRelevantPosts: 0,
    });

    useEffect(() => {
        fetch(`${getBackendUrl()}/analytics`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [index, isRelevant]);

    function ProgressBar({ value, label }) {
        return (
            <Box display="flex" alignItems="center" mb={2}>
                <Box width="84%" mr={1}>
                    <LinearProgress variant="determinate" value={value} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(value)}%`}</Typography>
                </Box>
                <Typography ml={2}>{label}</Typography>
            </Box>
        );
    }

    return (
        <div className='dashboard'>
            <Typography variant="h6">Analytics Dashboard</Typography>
            <ProgressBar value={data.percentageRelevantPosts} label="Relevant Posts" />
            <ProgressBar value={data.percentageLabeledPosts} label="Labeled Posts" />
            <ProgressBar value={data.percentageLabeledQuestions} label="Labeled Questions" />
            <ProgressBar value={data.percentageLabeledAnswers} label="Labeled Answers" />
            <Typography variant="body2" color="textSecondary">
                Total Posts: {data.totalPosts} | Total Questions: {data.totalQuestions} | Total Answers: {data.totalAnswers}
            </Typography>
        </div>
    );
}

export { Analytics };
