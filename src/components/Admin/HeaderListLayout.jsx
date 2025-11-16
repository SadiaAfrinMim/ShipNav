import React from 'react';
import AdminHeaderWithModal from '../SharedAllListFrom/HeaderTitle/AdminHeaderWithModal';
import HeaderList from '../SharedAllListFrom/SharedList/HeaderList';

const HeaderListLayout = () => {
    return (
        <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <AdminHeaderWithModal></AdminHeaderWithModal>

        <HeaderList></HeaderList>


      </div>
    </div>
    );
};

export default HeaderListLayout;