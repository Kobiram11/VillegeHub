// src/Pages/NoticegramaNiladhari.js
import React from 'react';

import NoticeDashboard from '../components/notice/NoticeDashboard';
import AddNotice from '../components/notice/AddNotice';
import NoticeList from '../components/notice/NoticeList';
import EditNotice from '../components/notice/EditNotice';
import DeleteNotice from '../components/notice/DeleteNotice';
import FindNotice from '../components/notice/FindNotice';
import NavBar from '../components/Navbar';


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
