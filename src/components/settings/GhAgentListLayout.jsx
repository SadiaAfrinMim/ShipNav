import React from 'react';
import HeaderSettingsAddTitle from '../SharedAllListFrom/HeaderTitle/HeaderSettingsAddTitle';
import GhAgentList from '../SharedAllListFrom/SharedList/GhAgentList';

const GhAgentListLayout = () => {
    return (
      <div className='p-4 '>
        
        
        
              <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
                <HeaderSettingsAddTitle></HeaderSettingsAddTitle>
        
                <GhAgentList></GhAgentList>
        
        
              </div>
            </div>
    );
};

export default GhAgentListLayout;