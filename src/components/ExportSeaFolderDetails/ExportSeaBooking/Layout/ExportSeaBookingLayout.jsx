



import HeaderTittleFrom from '../../../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderTittleFrom';
import BookingList from '../../../ExportFolderDetails/SharedAllListFrom/SharedList/BookingList';





const ExportSeaBookingLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <BookingList></BookingList>


      </div>
    </div>
  );
};

export default ExportSeaBookingLayout;