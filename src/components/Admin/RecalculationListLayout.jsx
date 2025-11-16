import React from 'react';
import RecalculationList from '../SharedAllListFrom/SharedList/RecalculationList';
import AdminHeaderWithModal from '../SharedAllListFrom/HeaderTitle/AdminHeaderWithModal';

const RecalculationListLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <AdminHeaderWithModal></AdminHeaderWithModal>

        <RecalculationList></RecalculationList>


      </div>
    </div>
  );
};

export default RecalculationListLayout;