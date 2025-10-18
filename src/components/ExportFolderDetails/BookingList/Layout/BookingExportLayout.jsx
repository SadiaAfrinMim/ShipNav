
import HeaderTittleFrom from '../../SharedAllListFrom/HeaderTitle/HeaderTittleFrom';
import BookingList from '../../SharedAllListFrom/SharedList/BookingList';






const BookingExportLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <BookingList></BookingList>


      </div>
    </div>
  );
};

export default BookingExportLayout;