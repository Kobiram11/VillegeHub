const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // Import UUID for user ID generation
const User = require('../models/User'); // Import User model
const router = express.Router();

// CREATE: Register a new user (POST /users/register)
router.post('/register', async (req, res) => {
    const { fullName, userType, nic, email, phoneNumber, password, confirmPassword } = req.body;

    // Validate required fields
    if (!fullName || !userType || !nic || !email || !phoneNumber || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if email or NIC already exists
        const existingUser = await User.findOne({ $or: [{ email }, { nic }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or NIC already exists' });
        }

        // Generate unique userId and hash password
        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({
            userId,
            fullName,
            userType,
            nic,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// READ: Get all users (GET /users)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// READ: Get a specific user by NIC (GET /users/nic/:nic)
router.get('/nic/:nic', async (req, res) => {
    const { nic } = req.params;
    try {
        const user = await User.findOne({ nic });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// UPDATE: Update a specific user by NIC (PUT /users/nic/:nic)
router.put('/nic/:nic', async (req, res) => {
    const { nic } = req.params;
    const { fullName, userType, email, phoneNumber, password } = req.body;

    try {
        // Find the user by NIC
        const user = await User.findOne({ nic });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's information
        user.fullName = fullName || user.fullName;
        user.userType = userType || user.userType;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;

        // If a new password is provided, hash it
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE: Delete a specific user by NIC (DELETE /users/nic/:nic)
router.delete('/nic/:nic', async (req, res) => {
    const { nic } = req.params;

    try {
        const user = await User.findOneAndDelete({ nic });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET: Generate reports by user type (GET /users/report)
router.get('/report', async (req, res) => {
    const { userType } = req.query; // Get userType from query parameters

    try {
        // Validate userType is provided
        if (!userType) {
            return res.status(400).json({ message: 'User type is required' });
        }

        // Fetch users by userType
        const users = await User.find({ userType: userType });
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found for this user type' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Login Route (POST /users/login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign(
        { userId: user.userId, email: user.email, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          userId: user.userId,
          fullName: user.fullName,
          email: user.email,
          userType: user.userType,
        },
      });
  
    } catch (error) {
      console.error('Error during login:', error); // Log detailed error
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
  
module.exports = router;