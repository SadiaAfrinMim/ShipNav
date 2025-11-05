import React from 'react';
import HeaderTittlePrintFrom from '../SharedAllListFrom/HeaderTitle/HeaderTittlePrintFrom';
import JournalListFilter from '../SharedAllListFrom/Reports/JournalListFilter';

const JournalListFilterLayout = () => {
    return (
          <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittlePrintFrom></HeaderTittlePrintFrom>
       <JournalListFilter></JournalListFilter>


      </div>
    </div>
    );
};

export default JournalListFilterLayout;