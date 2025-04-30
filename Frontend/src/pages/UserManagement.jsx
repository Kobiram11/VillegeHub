// src/pages/UserManagement.js
import React from 'react';
import NavDivi from '../components/NavDivi';
import AddUser from '../components/AddUser.js';
import UserList from '../components/UserList.js';
import EditUser from '../components/EditUser.js';
import FindUser from '../components/FindUser.js';
import DeleteUser from '../components/DeleteUser.js';


const UserManagement = () => {
    return (
        <div className="user-management">
            <NavDivi/>
            <AddUser/>
            <UserList/>
            <EditUser/>
            <FindUser/>
            <DeleteUser/>
        </div>
    );
};

export default UserManagement;
