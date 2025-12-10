
import HeaderAddFromTitle from '../../SharedAllListFrom/HeaderTitle/HeaderAddFromTitle';


import BillOfLadingView from '../BillOfLadingView';







const BillOfLadingViewLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderAddFromTitle></HeaderAddFromTitle>
      |<BillOfLadingView></BillOfLadingView>

      </div>
    </div>
  );
};

export default BillOfLadingViewLayout;