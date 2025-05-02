// src/Pages/NoticegramaNiladhari.js
import React from 'react';

import NoticeDashboard from '../componets/notice/NoticeDashboard';
import AddNotice from '../componets/notice/AddNotice';
import NoticeList from '../componets/notice/NoticeList';
import EditNotice from '../componets/notice/EditNotice';
import DeleteNotice from '../componets/notice/DeleteNotice';
import FindNotice from '../componets/notice/FindNotice';
import NavBar from '../componets/Navbar';


const NoticeGramaNiladhari = () => {
    return (
        <div className="notice-management">
            <NavBar/>
            <NoticeDashboard/>
            <AddNotice/>
            <NoticeList/>
            <EditNotice/>
            <DeleteNotice/>
            <FindNotice/>



        </div>
    );
};

export default NoticeGramaNiladhari;
