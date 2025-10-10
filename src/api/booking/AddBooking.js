import apiClient from "../ApiClient";
import { formatDate } from "../../utils/formatDate";

const normalizeDate = (val) => {
  if (!val) return null;
  if (val.$d) return formatDate(val.$d); // Dayjs/Moment object
  if (val.target?.value) return formatDate(val.target.value); // raw input event
  return formatDate(val); // string or Date
};

export const addBooking = async (payload) => {
  console.log("🔎 Raw payload from form:", payload);

  const formattedPayload = {
    date: normalizeDate(payload.date),
    reference: payload.reference,
    transport_mode: payload.transportMode?.toUpperCase(),
    combined_transport: payload.combinedTransport?.toUpperCase(),
    freight_term: payload.freightTerm?.toUpperCase(),
    service_type: payload.serviceType?.toUpperCase(),
    sales_type: payload.salesType?.toUpperCase(),
    sales_person: payload.salesPerson?.[0],
    consignee: payload.consignee,
    consignee_bank: payload.consigneeBank,
    consignee_bank_branch: payload.consigneeBankBranch,
    shipper: payload.shipper,
    shipper_bank: payload.shipperBank,
    shipper_branch: payload.shipperBranch,
    agreement_type: payload.agreementType?.toUpperCase(),
    agreement_type_no: payload.agreementTypeNo,
    agreement_type_date: normalizeDate(payload.agreementTypeDate),
    ho_date: payload.hoDate,
    comm_invoice_no: payload.commInvoiceNo,
    comm_invoice_date: normalizeDate(payload.commInvoiceDate),
    exp_no: payload.expNo,
    exp_ref_date: normalizeDate(payload.expRefDate),
    origin_country: payload.originCountry,
    destination_country: payload.destinationCountry,
    receive_place: payload.receivePlace,
    pol: payload.pol,
    pod: payload.pod,
    final_destination: payload.finalDestination,
    commodity: payload.commodity,
    agent: payload.agent,
    cnf_agent: payload.cnfAgent,
    buying_house: payload.buyingHouse?.[0],
    first_notify: payload.firstNotify?.[0],
    second_notify: payload.secondNotify?.[0],
    buying_house_address: payload.buyingHouseAddress,
    first_notify_address: payload.firstNotifyAddress,
    second_notify_address: payload.secondNotifyAddress,
    goods_nature: payload.goodsNature,
    marks_no: payload.marksNo,
    goods_description: payload.goodsDescription,
    remark: payload.remark,
    status: payload.status?.toUpperCase(),
    items: payload.items?.map(({ _rowKey, dimUnit, length, width, height, weight_unit, package: pkg, ...rest }) => ({
      ...rest,
      so_no: rest.so,
      po_no: rest.pob,
      package: pkg ? pkg.toUpperCase() : undefined,
      weight_unit: weight_unit ? weight_unit.toUpperCase() : "KG",
      dimension: rest.dimension || {
        length: length || 0,
        width: width || 0,
        height: height || 0,
        unit: dimUnit ? dimUnit.toUpperCase() : "IN"
      }
    }))
  };

  console.log("✅ Formatted payload:", formattedPayload);

  const response = await apiClient.post("/booking/add-booking", formattedPayload);
  return response.data;
};
