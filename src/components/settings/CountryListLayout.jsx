import React from 'react';
import HeaderSettingsAddTitle from '../SharedAllListFrom/HeaderTitle/HeaderSettingsAddTitle';

import CountryList from '../SharedAllListFrom/SharedList/CountryList';

const CountryListLayout = () => {
    return (
        <div className='p-4 '>
        
        
        
              <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
                <HeaderSettingsAddTitle></HeaderSettingsAddTitle>
        
                < CountryList></CountryList>
        
        
              </div>
            </div>
    );
};

export default CountryListLayout;