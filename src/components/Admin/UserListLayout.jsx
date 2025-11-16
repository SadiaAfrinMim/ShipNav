import React from 'react';
import AdminHeaderWithModal from '../SharedAllListFrom/HeaderTitle/AdminHeaderWithModal';
import UserList from '../SharedAllListFrom/SharedList/UserList';

const UserListLayout = () => {
    return (
        <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <AdminHeaderWithModal></AdminHeaderWithModal>

        <UserList></UserList>


      </div>
    </div>
    );
};

export default UserListLayout;