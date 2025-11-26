import React from 'react';
import HeaderSettingsAddTitle from '../SharedAllListFrom/HeaderTitle/HeaderSettingsAddTitle';

import AddCurrencyList from '../SharedAllListFrom/SharedList/AddCurrencyList';

const AddCurrencyListLayout = () => {
    return (
        <div className='p-4 '>
        
        
        
              <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
                <HeaderSettingsAddTitle></HeaderSettingsAddTitle>
        
                <AddCurrencyList></AddCurrencyList>
        
        
              </div>
            </div>
    );
};

export default AddCurrencyListLayout;