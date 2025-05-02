// src/pages/NoticeResident.js
import React from 'react';
import NavVillager from '../componets/NavVillager';

import NoticeResidentDashboard from '../componets/notice/NoticeDashboard';
import NoticeResidentView from '../componets/notice/NoticeResidentDashboard';



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
