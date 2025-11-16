
import HeaderTittlePrintFrom from '../SharedAllListFrom/HeaderTitle/HeaderTittlePrintFrom';
import PartyLedgerPage from '../SharedAllListFrom/PartyLedger/PartyLedgerPage';

const PartyLedgerPageLayout = () => {
    return (
         <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittlePrintFrom></HeaderTittlePrintFrom>
       <PartyLedgerPage></PartyLedgerPage>


      </div>
    </div>
    );
};

export default PartyLedgerPageLayout;