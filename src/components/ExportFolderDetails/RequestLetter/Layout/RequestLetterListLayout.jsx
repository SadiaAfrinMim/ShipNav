

import HeaderTittleFrom from '../../SharedAllListFrom/HeaderTitle/HeaderTittleFrom';

import RequestLetterList from '../RequestLetterList';


const RequestLetterListLayout = () => {
  return (
    <div className='p-4 '>
      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
         <RequestLetterList></RequestLetterList>
      </div>
    </div>
  );
};

export default RequestLetterListLayout;