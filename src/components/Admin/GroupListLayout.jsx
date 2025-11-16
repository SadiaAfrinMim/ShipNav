import React from 'react';
import AdminHeaderWithModal from '../SharedAllListFrom/HeaderTitle/AdminHeaderWithModal';
import GroupList from '../SharedAllListFrom/SharedList/GroupList';

const GroupListLayout = () => {
    return (
         <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <AdminHeaderWithModal></AdminHeaderWithModal>

        <GroupList></GroupList>


      </div>
    </div>
    );
};

export default GroupListLayout;