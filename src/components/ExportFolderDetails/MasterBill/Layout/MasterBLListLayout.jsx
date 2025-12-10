

import HeaderTittleFrom from '../../SharedAllListFrom/HeaderTitle/HeaderTittleFrom';

import MasterBLList from '../MasterBLList';






const MasterBLListLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <MasterBLList></MasterBLList>


      </div>
    </div>
  );
};

export default MasterBLListLayout;