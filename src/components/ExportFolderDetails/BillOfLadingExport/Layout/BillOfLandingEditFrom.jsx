import React from 'react';


import BillOfLadingForm from '../BillOfLadingForm';

import HeaderEditFromTitle from '../../SharedAllListFrom/HeaderTitle/HeaderEditFromTitle';

const BillOfLandingEditFrom = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
       <HeaderEditFromTitle></HeaderEditFromTitle>
        <BillOfLadingForm
  mode="edit"
  initialValues={selectedRow} // table theke নেওয়া ডাটা
  onSubmit={(data) => {
    // API: update
    console.log("UPDATE payload", data);
  }}
  onCancel={() => setEditModalOpen(false)}
/>

      </div>
    </div>
  );
};

export default BillOfLandingEditFrom;