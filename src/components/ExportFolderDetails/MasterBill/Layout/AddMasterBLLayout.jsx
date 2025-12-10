

import HeaderTittleFrom from '../../SharedAllListFrom/HeaderTitle/HeaderTittleFrom';
import AddMasterBL from '../AddMasterBL';


const AddMasterBLLayout = () => {
  return (
    <div className='p-4 '>
      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
         <AddMasterBL></AddMasterBL>
      </div>
    </div>
  );
};

export default AddMasterBLLayout;