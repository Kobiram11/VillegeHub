import React, { useEffect, useState } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundImage from '../assets/resident.jpg';
import img1 from '../assets/resident.jpg';
import img2 from '../assets/back2.jpg';
import AddUser from '../componets/login/AddUser';
import NavVillager from '../componets/NavVillager';

// Styled components
const Root = styled('div')(({ theme }) => ({
    backgroundColor: '#fefae0',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
}));

const Overlay = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Increased opacity for better contrast
});

const Title = styled(Typography)(({ theme }) => ({
    color: 'white',
    fontWeight: 'bolder',
    fontSize: '2.5rem',
    textShadow: '3px 3px 12px rgba(0, 0, 0, 0.9)', // Increased shadow for better contrast
    marginBottom: theme.spacing(1),
    letterSpacing: '0.1em',
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.3rem',
    marginBottom: theme.spacing(1),
    textShadow: '3px 3px 12px rgba(0, 0, 0, 0.9)', // Increased shadow for better contrast
    letterSpacing: '0.05em',
    lineHeight: 1.5,
}));

const TextBackground = styled('div')({
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for better contrast
    padding: '20px', // Added padding for spacing
    borderRadius: '8px', // Rounded corners
    display: 'inline-block', // Adjust the size of the background to the text
    position: 'absolute', // Position it absolutely
    top: '40%', // Adjusted position to move it down
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the background
    zIndex: 2,
    textAlign: 'center', // Center the text within the background
});

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#ff7f50',
    color: 'white',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5, 3),
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: '#e76f51',
    },
    transition: 'background-color 0.3s ease',
}));

const SlideshowContainer = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
});

const Slide = styled('div')(({ active }) => ({
    display: active ? 'block' : 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1s ease-in-out',
    opacity: active ? 1 : 0,
}));

const VillagerDashboard = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false); // State for modal visibility
    const slides = [img1, img2];

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const handleRegisterNowClick = () => {
        setOpenModal(true); // Show the modal
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Close the modal
    };

    return (
      <>
      <NavVillager />
        <Root>
            <Overlay />
            <SlideshowContainer>
                {slides.map((slide, index) => (
                    <Slide
                        key={index}
                        style={{ backgroundImage: `url(${slide})` }}
                        active={index === slideIndex}
                    />
                ))}
                <TextBackground>
                    <Title variant="h2">Welcome to VillageHub</Title>
                    <Subtitle variant="h3">
                        Easily communicate with your Grama Niladari.
                    </Subtitle>
                    <Typography 
                        variant="body1" 
                        style={{ 
                            fontSize: '1rem', 
                            fontWeight: 'bold', 
                            marginBottom: '10px', 
                            color: '#FFDAB9' // Peach color
                        }}>
                        Easily communicate with grama niladarii
                    </Typography>
                    <StyledButton variant="contained" onClick={handleRegisterNowClick}>
                        Register Now
                    </StyledButton>
                </TextBackground>
            </SlideshowContainer>

            {/* Modal for AddUser */}
            <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
                <DialogTitle>Register Now</DialogTitle>
                <DialogContent>
                    <AddUser onClose={handleCloseModal} /> {/* Pass the close function if needed */}
                </DialogContent>
            </Dialog>
        </Root>
      </>
    );
};

export default VillagerDashboard;
