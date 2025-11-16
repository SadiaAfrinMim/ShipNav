import React from 'react';
import SystemPrefixList from '../SharedAllListFrom/SharedList/SystemPrefixList';
import AdminHeaderWithModal from '../SharedAllListFrom/HeaderTitle/AdminHeaderWithModal';

const SystemPrefixListLayout = () => {
    return (
        <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <AdminHeaderWithModal></AdminHeaderWithModal>

        <SystemPrefixList></SystemPrefixList>


      </div>
    </div>
    );
};

export default SystemPrefixListLayout;