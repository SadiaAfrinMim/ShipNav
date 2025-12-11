
import HeaderAddFromTitle from '../../SharedAllListFrom/HeaderTitle/HeaderAddFromTitle';


import StuffingPackageList from '../StuffingPackageList';




const StuffingPackageLayout = () => {
  return (
    <div className='p-4 '>

      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderAddFromTitle></HeaderAddFromTitle>
        
      <StuffingPackageList></StuffingPackageList>

      </div>
    </div>
  );
};

export default StuffingPackageLayout;