import React from 'react';
import HeaderSettingsAddTitle from '../SharedAllListFrom/HeaderTitle/HeaderSettingsAddTitle';
import ContainerList from '../SharedAllListFrom/SharedList/ContainerList';

const ContainerListLayout = () => {
    return (
        <div className='p-4 '>
        
        
        
              <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
                <HeaderSettingsAddTitle></HeaderSettingsAddTitle>
        
                <ContainerList></ContainerList>
        
        
              </div>
            </div>
    );
};

export default ContainerListLayout;