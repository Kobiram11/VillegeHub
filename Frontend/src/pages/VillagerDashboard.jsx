import React, { useEffect, useState } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import img1 from '../assets/resident.jpg';
import img2 from '../assets/back2.jpg';
import AddUser from '../componets/login/AddUser';
import NavVillager from '../componets/NavVillager';

// === Layout Structure ===
const Root = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  minHeight: '100vh',
});

const ContentWrapper = styled('div')({
  flexGrow: 1,
  marginLeft: '80px', // Leave space for sidebar
  position: 'relative',
  overflow: 'hidden',
});

// === Background Slideshow ===
const SlideshowContainer = styled('div')({
  width: '100%',
  height: '100vh',
  position: 'relative',
});

const Slide = styled('div')(({ active }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'opacity 1s ease-in-out',
  opacity: active ? 1 : 0,
  zIndex: 1,
}));

const Overlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 2,
});

// === Text Styling ===
const TextBackground = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  padding: '20px',
  borderRadius: '8px',
  zIndex: 3,
  textAlign: 'center',
});

const Title = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 'bolder',
  fontSize: '2.5rem',
  textShadow: '3px 3px 12px rgba(0, 0, 0, 0.9)',
  marginBottom: theme.spacing(1),
  letterSpacing: '0.1em',
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.3rem',
  marginBottom: theme.spacing(1),
  textShadow: '3px 3px 12px rgba(0, 0, 0, 0.9)',
  letterSpacing: '0.05em',
  lineHeight: 1.5,
}));

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

// === Component ===
const VillagerDashboard = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const slides = [img1, img2];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleRegisterNowClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <NavVillager />
      <Root>
        <ContentWrapper>
          <SlideshowContainer>
            {slides.map((slide, index) => (
              <Slide
                key={index}
                style={{ backgroundImage: `url(${slide})` }}
                active={index === slideIndex}
              />
            ))}
            <Overlay />
            <TextBackground>
              <Title variant="h2">Welcome to VillageHub</Title>
              <Subtitle variant="h3">Easily communicate with your Grama Niladari.</Subtitle>
              <Typography
                variant="body1"
                style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: '#FFDAB9',
                }}
              >
                Stay connected. Stay informed.
              </Typography>
              <StyledButton variant="contained" onClick={handleRegisterNowClick}>
                Register Now
              </StyledButton>
            </TextBackground>
          </SlideshowContainer>

          {/* Register Modal */}
          <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
            <DialogTitle>Register Now</DialogTitle>
            <DialogContent>
              <AddUser onClose={handleCloseModal} />
            </DialogContent>
          </Dialog>
        </ContentWrapper>
      </Root>
    </>
  );
};

export default VillagerDashboard;
