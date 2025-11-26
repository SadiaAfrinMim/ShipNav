import React from 'react';
import HeaderSettingsAddTitle from '../SharedAllListFrom/HeaderTitle/HeaderSettingsAddTitle';
import MAWBList from '../SharedAllListFrom/SharedList/MAWBList';


const MAWBListLayout = () => {
    return (
      <div className='p-4 '>
        
        
        
              <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
                <HeaderSettingsAddTitle></HeaderSettingsAddTitle>
        
                <MAWBList></MAWBList>
        
        
              </div>
            </div>
    );
};

export default MAWBListLayout;