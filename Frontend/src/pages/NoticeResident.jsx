// src/pages/NoticeResident.js
import React from 'react';
import NavVillager from '../components/NavVillager';

import NoticeResidentDashboard from '../components/notice/NoticeResidentDashboard';
import NoticeResidentView from '../components/notice/NoticeResidentView';



const NoticeResident = () => {
    return (
        <div className="notice-management">
            <NavVillager/>
            <NoticeResidentDashboard/>
            <NoticeResidentView/>
        </div>
    );
};

export default NoticeResident;
