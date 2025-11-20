import React from 'react';
import HeaderAdminAddTitle from '../../SharedAllListFrom/HeaderTitle/HeaderSettingsAddTitle';
import HeaderSettingsAddTitle from '../../SharedAllListFrom/HeaderTitle/HeaderSettingsAddTitle';
import ShipperList from '../../SharedAllListFrom/SharedList/ShipperList';

const ShipperParty = () => {
    return (
         <div className='p-4 '>
        
        
        
              <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
                <HeaderSettingsAddTitle></HeaderSettingsAddTitle>
        
                <ShipperList></ShipperList>
        
        
              </div>
            </div>
    );
};

export default ShipperParty;