import { Form, Select, Input } from 'antd';
const { Option } = Select;

export default function TransportDetails({ inputRefs, handleKeyDown, getNextField, getPrevField, handleDropdownToggle }) {
  return (
    <>
      <Form.Item name="combinedTransport" label="Combined Transport" hasFeedback>
        <Select
          placeholder="-- Select/None --"
          ref={ref => inputRefs.current['combinedTransport'] = ref}
          onOpenChange={open => handleDropdownToggle('combinedTransport', open)}
          onKeyDown={e => handleKeyDown(e, 'combinedTransport', getNextField('combinedTransport'), getPrevField('combinedTransport'), true)}
        >
          <Option value="road">Road Transport</Option>
          <Option value="rail">Rail Transport</Option>
          <Option value="sea">Sea Transport</Option>
          <Option value="air">Air Transport</Option>
        </Select>
      </Form.Item>

      <Form.Item name="consignee" label="Consignee" hasFeedback>
        <Input
          placeholder="Consignee Name"
          ref={ref => inputRefs.current['consignee'] = ref}
          onKeyDown={e => handleKeyDown(e, 'consignee', getNextField('consignee'), getPrevField('consignee'))}
        />
      </Form.Item>

      <Form.Item name="buyingHouse" label="Buying House" hasFeedback>
        <Input
          placeholder="Buying House"
          ref={ref => inputRefs.current['buyingHouse'] = ref}
          onKeyDown={e => handleKeyDown(e, 'buyingHouse', getNextField('buyingHouse'), getPrevField('buyingHouse'))}
        />
      </Form.Item>

      <Form.Item name="goodsNature" label="Goods Nature" hasFeedback>
        <Input
          placeholder="Goods Nature"
          ref={ref => inputRefs.current['goodsNature'] = ref}
          onKeyDown={e => handleKeyDown(e, 'goodsNature', getNextField('goodsNature'), getPrevField('goodsNature'))}
        />
      </Form.Item>

      <Form.Item name="marksNo" label="Marks No." hasFeedback>
        <Input
          placeholder="Marks No."
          ref={ref => inputRefs.current['marksNo'] = ref}
          onKeyDown={e => handleKeyDown(e, 'marksNo', getNextField('marksNo'), getPrevField('marksNo'))}
        />
      </Form.Item>
    </>
  );
}
