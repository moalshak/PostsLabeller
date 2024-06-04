import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

function PostCard({ post, relevant }) {
    const colors = {
        1: '#4CAF50', // Green
        0: '#F44336', // Red
        undefined: '#9E9E9E' // Grey
    }
    const cardStyle = {
        borderColor: relevant ? colors[relevant] : '#9E9E9E',
        borderWidth: '2px',
        borderStyle: 'solid'
    };

    return (
        <Card style={cardStyle}>
            <CardHeader 
                title={post.Title}
            />
            <CardContent>
                <div dangerouslySetInnerHTML={{ __html: post.Body }} />
                <Divider style={{ margin: '10px 0' }} />
                <Typography variant="subtitle1" display="block" gutterBottom>
                    Id : {post.Id}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    Created on: {post.CreationDate}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    Last active: {post.LastActivityDate}
                </Typography>
            </CardContent>
        </Card>
    );
}

export { PostCard };
