const express = require ('express');
const router = express.Router();
const House = require('../models/house'); // Adjust the path if necessary



// Route to add a new house
router.post('/add', async (req, res) => {
    const {
        villageID,
        houseNumber,
        address,
        landsize,
        landmarks,
        remarks,
        noOfFamilies,
        landlineTelephone,
        ownerName,
        ownerContact,
        ownerEmail,
        lastVisited // Optional field
    } = req.body;

    // Validate required fields
    if (!villageID || !houseNumber || !address || !landsize || !landmarks || !remarks ||
        !noOfFamilies || !ownerName || !ownerContact || !ownerEmail) {
        return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    try {
        // Optional: Check if a house with the same house number already exists (if needed)
        const existingHouse = await House.findOne({ houseNumber });
        if (existingHouse) {
            return res.status(400).json({ error: 'House with this number already exists.' });
        }

        // Create a new house instance
        const newHouse = new House({
            villageID,
            houseNumber,
            address,
            landsize,
            landmarks,
            remarks,
            noOfFamilies,
            landlineTelephone,
            ownerName,
            ownerContact,
            ownerEmail,
            lastVisited: lastVisited || null // Set to null if not provided
        });

        // Save the house to the database
        const savedHouse = await newHouse.save();
        res.status(201).json(savedHouse);
    } catch (err) {
        console.error('Error adding house:', err);
        res.status(500).json({ error: 'An error occurred while adding the house.' });
    }
});



// Route to add a new family to an existing house
router.post('/addFamily', async (req, res) => {
    const {
        houseNumber,       // The house number to find the specific house document
        familyRef,         // Unique reference for the family
        noOfMembers,       // Number of members in the family
        headOfHouseholdName,
        headOfHouseholdNIC,
        headOfHouseholdContact,
        headOfHouseholdEmail,
        headOfHouseholdRemarks,
        members            // Array of member objects (optional to add members immediately)
    } = req.body;

    // Validate required fields
    if (!houseNumber || !familyRef || !noOfMembers || !headOfHouseholdName || !headOfHouseholdContact || !headOfHouseholdEmail) {
        return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    

    // Validate email format using regex (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(headOfHouseholdEmail)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
        // Find the house by house number
        const house = await House.findOne({ houseNumber });

        if (!house) {
            return res.status(404).json({ error: 'House not found.' });
        }

        // Check if the familyRef already exists in the house's families array
        const existingFamily = house.families.find(family => family.familyRef === familyRef);
        if (existingFamily) {
            return res.status(400).json({ error: 'Family with this reference already exists in the house.' });
        }

        // Check if the number of families exceeds the allowed limit
        const currentFamilyCount = house.families.length;
        if (currentFamilyCount >= house.noOfFamilies) {
            return res.status(400).json({ error: 'Cannot add more families. The house already has the maximum number of families.' });
        }

        // Create a new family object
        const newFamily = {
            familyRef,
            noOfMembers,
            headOfHouseholdName,
            headOfHouseholdNIC,
            headOfHouseholdContact,
            headOfHouseholdEmail,
            headOfHouseholdRemarks,
            members: members || [] // Optional to start with empty members
        };

        // Add the new family to the house's families array
        house.families.push(newFamily);

        // Save the updated house document
        const updatedHouse = await house.save();

        res.status(201).json(updatedHouse);
    } catch (err) {
        console.error('Error adding family:', err);
        res.status(500).json({ error: 'An error occurred while adding the family.' });
    }
});



// Route for adding a member
router.post('/addMember', async (req, res) => {
    const { houseNumber, familyRef, memberId, fullName, dateOfBirth, educationalLevel, gender, NIC, contactNumber, votingEligibility, email, remarks, netIncome, job, schoolName } = req.body;

    try {
        // Find the house by houseNumber
        const house = await House.findOne({ houseNumber });

        if (!house) {
            return res.status(404).json({ error: 'House not found' });
        }

        // Find the family within the house
        const family = house.families.find(fam => fam.familyRef === familyRef);

        if (!family) {
            return res.status(404).json({ error: 'Family not found' });
        }

        // Check if the number of members exceeds the allowed number of members for that family
        const currentmemberCount = family.members.length;
   
        if (currentmemberCount >= family.noOfMembers) {
            return res.status(400).json({ error: `Cannot add more members. The family already has the specified number of members (${family.noOfMembers}).` });
        }

        // Create a new member object
        const newMember = {
            memberId,
            fullName,
            dateOfBirth,
            educationalLevel,
            gender,
            NIC,
            contactNumber,
            votingEligibility,
            email,
            remarks,
            netIncome,
            job,
            schoolName
        };

        // Add the new member to the family's members array
        family.members.push(newMember);

        // Save the updated house document
        await house.save();

        res.status(201).json({ message: 'Member added successfully', house });

    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET request to retrieve all houses
router.get('/houses', async (req, res) => {
    try {
      const houses = await House.find(); // Fetches all house documents
      res.status(200).json(houses); // Send the data as a JSON response
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle errors
    }
  });

  // Route to get house details by house number
router.get('/byNumber', async (req, res) => {
    const houseNumber = req.query.houseNumber;

    // Check if houseNumber was provided
    if (!houseNumber) {
        return res.status(400).json({ error: 'House number is required' });
    }

    try {
        // Find the house by houseNumber
        const house = await House.findOne({ houseNumber: houseNumber });

        if (!house) {
            return res.status(404).json({ error: 'House not found' });
        }

        res.json(house); // Return house details
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


// Get member by memberId
router.get('/member/:memberId', async (req, res) => {
    try {
      const memberId = req.params.memberId;
  
      // Search for the member across all houses and families
      const house = await House.findOne({
        'families.members.memberId': memberId
      });
  
      if (!house) {
        return res.status(404).json({ error: 'Member not found' });
      }
  
      // Find the family and member within the house
      const family = house.families.find(family =>
        family.members.some(member => member.memberId === memberId)
      );
      
      const member = family.members.find(member => member.memberId === memberId);
  
      res.json({ house, family, member });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

// Get a family by familyRef
router.get('/family/:familyRef', async (req, res) => {
    const { familyRef } = req.params;

    try {
        // Find the house that contains the family with the given familyRef
        const house = await House.findOne({
            "families.familyRef": familyRef
        }, {
            "families.$": 1 // Project only the matching family
        });

        if (!house || !house.families || house.families.length === 0) {
            return res.status(404).json({ error: 'Family not found' });
        }

        // Extract the family from the house
        const family = house.families[0];

        res.status(200).json(family); // Send the family details as the response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});



router.put('/update/:houseNumber', async (req, res) => {
    const houseNumber = req.params.houseNumber;
    const updateData = req.body; // This will contain the updated fields

    try {
        const updatedHouse = await House.findOneAndUpdate(
            { houseNumber: houseNumber }, // Change this to match your schema field
            updateData,
            { new: true } // Return the updated document
        );

        if (!updatedHouse) {
            return res.status(404).json({ error: 'House not found' });
        }

        res.status(200).json(updatedHouse); // Send updated house as response
    } catch (error) {
        res.status(500).json({ error: 'Failed to update house' });
    }
});


// Update member details by memberId
router.put('/members/:memberId', async (req, res) => {
    const { memberId } = req.params; // Get memberId from URL
    const memberUpdates = req.body;  // Get the updates from request body

    try {
        // Find the house that contains the member
        const house = await House.findOne({ 'families.members.memberId': memberId });
        if (!house) {
            return res.status(404).json({ error: 'Member not found in any house' });
        }

        // Locate the family that has the member
        const family = house.families.find(family => family.members.some(member => member.memberId === memberId));
        if (!family) {
            return res.status(404).json({ error: 'Family not found' });
        }

        // Locate the specific member by memberId within the family
        const member = family.members.find(member => member.memberId === memberId);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        // Update the member fields with the new values from the request body
        Object.keys(memberUpdates).forEach(key => {
            member[key] = memberUpdates[key];
        });

        // Save the updated house document (including the updated member)
        await house.save();

        res.status(200).json({ message: 'Member updated successfully', updatedMember: member });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update member', details: error.message });
    }
});

// Delete a house by houseNumber
/*router.delete('/delete/:houseNumber', async (req, res) => {
    try {
        const houseNumber = req.params.houseNumber;

        // Find and delete the house by houseNumber
        const house = await House.findOneAndDelete({ houseNumber: houseNumber });

        if (!house) {
            return res.status(404).json({ message: 'House not found' });
        }

        // If house found and deleted, respond with success
        res.status(200).json({ message: 'House and all associated families and members deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
*/


// Route to get total counts of houses, families, and members
router.get('/stats', async (req, res) => {
    try {
        const totalHouses = await House.countDocuments(); // Count the number of houses

        // Aggregate to calculate total families and total members
        const aggregateResult = await House.aggregate([
            {
                $group: {
                    _id: null,
                    totalFamilies: { $sum: { $size: "$families" } }, // Sum the size of the families array for each house
                    totalMembers: { $sum: { $sum: "$families.noOfMembers" } } // Sum noOfMembers field in each family
                }
            }
        ]);

        const totalFamilies = aggregateResult[0]?.totalFamilies || 0;
        const totalMembers = aggregateResult[0]?.totalMembers || 0;

        res.json({
            totalHouses,
            totalFamilies,
            totalMembers
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// DELETE route for deleting a house by houseNumber
router.delete('/delete/:houseNumber', async (req, res) => {
    const { houseNumber } = req.params;

    try {
        const deletedHouse = await House.findOneAndDelete({ houseNumber: houseNumber });

        if (!deletedHouse) {
            return res.status(404).json({ error: 'House not found' });
        }

        res.json({ message: 'House deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the house' });
    }
});





module.exports = router;