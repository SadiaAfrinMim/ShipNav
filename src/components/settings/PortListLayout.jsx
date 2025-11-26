import React from 'react';
import HeaderSettingsAddTitle from '../SharedAllListFrom/HeaderTitle/HeaderSettingsAddTitle';
import MAWBList from '../SharedAllListFrom/SharedList/MAWBList';
import PortList from '../SharedAllListFrom/SharedList/PortList';


const PortListLayout = () => {
    return (
      <div className='p-4 '>
        
        
        
              <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
                <HeaderSettingsAddTitle></HeaderSettingsAddTitle>
        
                <PortList></PortList>
        
        
              </div>
            </div>
    );
};

export default PortListLayout;