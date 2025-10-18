





import BookingImportGlassForm from '../../../BookingFromInputField';
import HeaderAddFromTitle from '../../../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderAddFromTitle';

const ExportSeaAddBooking = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderAddFromTitle></HeaderAddFromTitle>
        <BookingImportGlassForm></BookingImportGlassForm>


      </div>
    </div>
  );
};

export default ExportSeaAddBooking;