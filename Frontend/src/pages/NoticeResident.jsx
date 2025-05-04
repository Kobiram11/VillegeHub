// src/pages/NoticeResident.js
import React from 'react';
import NavVillager from '../componets/NavVillager';

import NoticeResidentDashboard from '../componets/notice/NoticeDashboard';
import NoticeResidentViewVill from '../componets/notice/NoticeResidentView';



const NoticeResident = () => {
    return (
        <div className="notice-management">
            <NavVillager/>
            <div style={{ marginTop: '80px' }}>
            <NoticeResidentDashboard/>
            <NoticeResidentViewVill/>
            </div>
        </div>
    );
};

export default NoticeResident;
