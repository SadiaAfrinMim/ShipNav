

import HeaderTittleFrom from '../../SharedAllListFrom/HeaderTitle/HeaderTittleFrom';
import AddRequestLetter from '../AddRequestLetter';

const AddRequestLetterLayout = () => {
  return (
    <div className='p-4 '>
      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
         <AddRequestLetter></AddRequestLetter>
      </div>
    </div>
  );
};

export default AddRequestLetterLayout;