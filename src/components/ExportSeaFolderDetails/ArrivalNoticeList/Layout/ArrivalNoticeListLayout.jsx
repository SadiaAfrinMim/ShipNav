

import HeaderTittleFrom from '../../../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderTittleFrom';
import ArrivalNoticeList from '../ArrivalNoticeList';







const ArrivalNoticeListLayout= () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <ArrivalNoticeList></ArrivalNoticeList>


      </div>
    </div>
  );
};

export default ArrivalNoticeListLayout;