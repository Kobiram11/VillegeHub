import React from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundImage from '../assets/grama.jpg'; 
import NavBar from '../components/Navbar'; 

// Styled components
const Root = styled('div')(({ theme }) => ({
    backgroundColor: '#fefae0', 
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    paddingTop: '70px', 
    paddingLeft: '80px', 
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'center',
    position: 'relative',
}));

const Overlay = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    zIndex: 1,
    backdropFilter: 'blur(3px)', 
});

const Title = styled(Typography)(({ theme }) => ({
    color: '#ffedcc', 
    fontWeight: 700, 
    fontSize: '2.8rem', 
    textShadow: '2px 4px 8px rgba(0, 0, 0, 0.9)', 
    marginBottom: theme.spacing(2), 
    marginTop: theme.spacing(8), // Increased margin to push the title down
    zIndex: 2,
    lineHeight: 1.2, 
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    color: '#f4f1de', 
    fontWeight: 500, 
    fontSize: '1.6rem', 
    marginBottom: theme.spacing(3), 
    textShadow: '2px 4px 8px rgba(0, 0, 0, 0.9)', 
    zIndex: 2,
    lineHeight: 1.4, 
}));

const Card = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3), 
    margin: theme.spacing(3),
    backgroundColor: 'rgba(255, 255, 255, 0.6)', 
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', 
    borderRadius: '20px', 
    zIndex: 2,
    width: '90%', 
    maxWidth: '600px',
    textAlign: 'center', 
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#ff7f50', 
    color: 'white',
    fontWeight: 'bold',
    padding: '10px 20px', 
    fontSize: '1rem', 
    marginTop: theme.spacing(3), 
    borderRadius: '30px', 
    transition: 'all 0.3s ease', 
    '&:hover': {
        backgroundColor: '#e76f51', 
        transform: 'translateY(-3px)', 
        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)', 
    },
}));

const GramaNiladhariDashboard = () => {
    return (
      <>
      <NavBar />
        <Root>
            <Overlay />
            <Grid container spacing={4} style={{ zIndex: 2, justifyContent: 'center' }}>
                <Grid item xs={12}>
                    <Title variant="h2">Welcome to Grama Niladari Dashboard</Title>
                </Grid>
                <Grid item xs={12}>
                    <Subtitle variant="h3">Your Gateway to Community Management</Subtitle>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Card>
                        <Typography variant="h5" gutterBottom>
                            Connect with your community effortlessly.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Our responsibility is to manage and protect resident details through a streamlined process.
                        </Typography>
                        <StyledButton variant="contained">Learn More</StyledButton>
                    </Card>
                </Grid>
            </Grid>
        </Root>
        </>
    );
};

export default GramaNiladhariDashboard;
