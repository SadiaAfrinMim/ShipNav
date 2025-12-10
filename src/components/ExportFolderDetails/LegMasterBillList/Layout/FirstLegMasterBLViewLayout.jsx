
import HeaderAddFromTitle from '../../SharedAllListFrom/HeaderTitle/HeaderAddFromTitle';
import AddFirstLegMasterBill from '../../SharedAllListFrom/SharedFrom/AddFirstLegMasterBill';
import FirstLegMasterBLView from '../FirstLegMasterBLView';






const FirstLegMasterBLViewLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderAddFromTitle></HeaderAddFromTitle>
        <FirstLegMasterBLView></FirstLegMasterBLView>


      </div>
    </div>
  );
};

export default FirstLegMasterBLViewLayout;