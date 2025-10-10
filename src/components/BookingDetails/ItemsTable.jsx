// =============================================
// File: src/components/BookingDetails/ItemsTable.jsx
// =============================================
import React from "react";
import { Table, Button, Form, Input, Select, InputNumber, message } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { computeCBM } from "../../utils/cbm";
import { computeGWT } from "../../utils/gwt";

const { Option } = Select;
const noop = () => {};

export default function ItemsTable({
  items = [],
  setItems = noop,
  inputRefs = { current: {} },
  openDropdowns = {},
  handleKeyDown = noop,
  getNextItemField = noop,
  getPrevItemField = noop,
  handleDropdownToggle = noop,
}) {
  const form = Form.useFormInstance?.();
  const safeItems = Array.isArray(items) ? items : [];

  const nextKey = () => {
    if (safeItems.length === 0) return 1;
    const maxKey = Math.max(...safeItems.map((i) => Number(i.key) || 0));
    return (isFinite(maxKey) ? maxKey : 0) + 1;
  };

  const addItem = () => {
    const newItem = {
      key: nextKey(),
      type: "",
      pob: "", // PO#
      style: "",
      color: "",
      so: "",
      carton: 0,
      package: "",
      pcs: 0,
      length: 0,
      width: 0,
      height: 0,
      dimUnit: "cm",
      cbm: 0,
      gwt: 0,
    };
    try {
      setItems([...safeItems, newItem]);
      if (form) {
        const itemsInForm = form.getFieldValue(["items"]) || {};
        form.setFieldsValue({ items: { ...itemsInForm, [newItem.key]: newItem } });
      }
    } catch (e) {
      console.error(e);
      message.error("Cannot add item here.");
    }
  };

  const removeItem = (key) => {
    if (safeItems.length <= 1) {
      message.warning("At least one item is required");
      return;
    }
    try {
      setItems(safeItems.filter((i) => i.key !== key));
      if (form) {
        const itemsInForm = { ...(form.getFieldValue(["items"]) || {}) };
        delete itemsInForm[key];
        form.setFieldsValue({ items: itemsInForm });
      }
    } catch (e) {
      console.error(e);
      message.error("Cannot remove item here.");
    }
  };

  // ---------- CBM auto-calc ----------
  const updateCBMForRow = (rowKey) => {
    if (!form) return;

    const row = form.getFieldValue(["items", rowKey]) || {};
    const { length, width, height, carton, dimUnit } = row;

    const cbm = computeCBM({
      length,
      width,
      height,
      carton,
      unit: dimUnit || "cm",
      decimals: 4,
    });

    form.setFieldsValue({
      items: { [rowKey]: { ...row, cbm } }, // ✅ merge row, don’t overwrite
    });
  };

  // ---------- GWT auto-calc ----------
  const updateGWTForRow = (rowKey) => {
    if (!form) return;

    const row = form.getFieldValue(["items", rowKey]) || {};
    const gwt = computeGWT({
      carton: row.carton,
      pcs: row.pcs,
      weightPerCarton: row.weightPerCarton,
      weightPerPiece: row.weightPerPiece,
    });

    if (!row.gwt || Math.abs(row.gwt - gwt) < 1e-6) {
      form.setFieldsValue({
        items: { [rowKey]: { ...row, gwt } },
      });
    }
  };

  // ---------- Handle row changes ----------
  const handleRowFieldChange = (rowKey, field, value) => {
    if (!form) return;
    const row = form.getFieldValue(["items", rowKey]) || {};

    form.setFieldsValue({
      items: { [rowKey]: { ...row, [field]: value } },
    });

    // trigger CBM when dimension-related fields change
    const cbmFields = ["length", "width", "height", "carton", "dimUnit"];
    if (cbmFields.includes(field)) {
      Promise.resolve().then(() => updateCBMForRow(rowKey));
    }

    // trigger GWT when weight-related fields change
    const gwtFields = ["carton", "pcs", "weightPerCarton", "weightPerPiece"];
    if (gwtFields.includes(field)) {
      Promise.resolve().then(() => updateGWTForRow(rowKey));
    }
  };

  // ---------- Table columns ----------
  const columns = [
    { title: "Type *", dataIndex: "type", key: "type", width: 120,
      render: (_, record) => (
        <Form.Item
          name={["items", record.key, "type"]}
          rules={[{ required: true, message: "" }]}
          style={{ margin: 0 }}
          hasFeedback
        >
          <Input
            placeholder="Type"
            ref={(ref) => inputRefs?.current && (inputRefs.current[`item_type_${record.key}`] = ref)}
          />
        </Form.Item>
      ),
    },
    {
      title: "PO# *",
      dataIndex: "pob",
      key: "pob",
      width: 120,
      render: (_, record) => (
        <Form.Item
          name={["items", record.key, "pob"]}
          rules={[{ required: true, message: "" }]}
          style={{ margin: 0 }}
          hasFeedback
        >
          <Input placeholder="PO#" />
        </Form.Item>
      ),
    },
    { title: "Style *", dataIndex: "style", key: "style", width: 120,
      render: (_, record) => (
        <Form.Item
          name={["items", record.key, "style"]}
          rules={[{ required: true, message: "" }]}
          style={{ margin: 0 }}
          hasFeedback
        >
          <Input placeholder="Style" />
        </Form.Item>
      ),
    },
    { title: "Color", dataIndex: "color", key: "color", width: 100,
      render: (_, record) => (
        <Form.Item name={["items", record.key, "color"]} style={{ margin: 0 }} hasFeedback>
          <Input placeholder="Color" />
        </Form.Item>
      ),
    },
    { title: "S/O", dataIndex: "so", key: "so", width: 100,
      render: (_, record) => (
        <Form.Item name={["items", record.key, "so"]} style={{ margin: 0 }} hasFeedback>
          <Input placeholder="S/O" />
        </Form.Item>
      ),
    },
    {
      title: "Carton *",
      dataIndex: "carton",
      key: "carton",
      width: 100,
      render: (_, record) => (
        <Form.Item
          name={["items", record.key, "carton"]}
          rules={[{ required: true, message: "" }]}
          style={{ margin: 0 }}
          hasFeedback
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            onChange={(v) => handleRowFieldChange(record.key, "carton", v)}
          />
        </Form.Item>
      ),
    },
    {
      title: "Package",
      dataIndex: "package",
      key: "package",
      width: 120,
      render: (_, record) => (
        <Form.Item name={["items", record.key, "package"]} style={{ margin: 0 }} hasFeedback>
          <Select placeholder="Select">
            <Option value="box">Box</Option>
            <Option value="crate">Crate</Option>
            <Option value="pallet">Pallet</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Pcs",
      dataIndex: "pcs",
      key: "pcs",
      width: 80,
      render: (_, record) => (
        <Form.Item name={["items", record.key, "pcs"]} style={{ margin: 0 }} hasFeedback>
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            onChange={(v) => handleRowFieldChange(record.key, "pcs", v)} // ✅ added
          />
        </Form.Item>
      ),
    },

    // ---------- Dimension group ----------
    {
      title: (
        <div
          style={{
            borderBottom: "2px solid #1890ff",
            paddingBottom: 4,
            fontWeight: 600,
          }}
        >
          Dimension
        </div>
      ),
      key: "dimension-group",
      align: "center",
      children: [
        {
          title: "Length",
          dataIndex: "length",
          key: "length",
          width: 110,
          render: (_, record) => (
            <Form.Item name={["items", record.key, "length"]} style={{ margin: 0 }} hasFeedback>
              <InputNumber
                min={0}
                placeholder="L"
                style={{ width: "100%" }}
                onChange={(v) => handleRowFieldChange(record.key, "length", v)}
              />
            </Form.Item>
          ),
        },
        {
          title: "Width",
          dataIndex: "width",
          key: "width",
          width: 110,
          render: (_, record) => (
            <Form.Item name={["items", record.key, "width"]} style={{ margin: 0 }} hasFeedback>
              <InputNumber
                min={0}
                placeholder="W"
                style={{ width: "100%" }}
                onChange={(v) => handleRowFieldChange(record.key, "width", v)}
              />
            </Form.Item>
          ),
        },
        {
          title: "Height",
          dataIndex: "height",
          key: "height",
          width: 110,
          render: (_, record) => (
            <Form.Item name={["items", record.key, "height"]} style={{ margin: 0 }} hasFeedback>
              <InputNumber
                min={0}
                placeholder="H"
                style={{ width: "100%" }}
                onChange={(v) => handleRowFieldChange(record.key, "height", v)}
              />
            </Form.Item>
          ),
        },
        {
          title: "Unit",
          dataIndex: "dimUnit",
          key: "dimUnit",
          width: 100,
          render: (_, record) => (
            <Form.Item name={["items", record.key, "dimUnit"]} style={{ margin: 0 }}>
              <Select
                placeholder="Unit"
                defaultValue="cm"
                onChange={(v) => handleRowFieldChange(record.key, "dimUnit", v)}
              >
                <Option value="mm">mm</Option>
                <Option value="cm">cm</Option>
                <Option value="m">m</Option>
                <Option value="in">in</Option>
                <Option value="ft">ft</Option>
              </Select>
            </Form.Item>
          ),
        },
      ],
    },

    // ---------- CBM ----------
    {
      title: "CBM *",
      dataIndex: "cbm",
      key: "cbm",
      width: 110,
      render: (_, record) => (
        <Form.Item
          name={["items", record.key, "cbm"]}
          rules={[{ required: true, message: "" }]}
          style={{ margin: 0 }}
          hasFeedback
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            onChange={(v) => handleRowFieldChange(record.key, "cbm", v)} // editable override
          />
        </Form.Item>
      ),
    },

    // ---------- GWT ----------
    {
      title: "GWT *",
      dataIndex: "gwt",
      key: "gwt",
      width: 110,
      render: (_, record) => (
        <Form.Item
          name={["items", record.key, "gwt"]}
          rules={[{ required: true, message: "" }]}
          style={{ margin: 0 }}
          hasFeedback
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            onChange={(v) => handleRowFieldChange(record.key, "gwt", v)} // editable override
          />
        </Form.Item>
      ),
    },

    // ---------- Action ----------
    {
      title: "Action",
      key: "action",
      width: 60,
      render: (_, record) => (
        <Button
          type="text"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => removeItem(record.key)}
        />
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={safeItems}
        pagination={false}
        scroll={{ x: 1700 }}
        size="small"
        rowClassName={() => "editable-row"}
        rowKey="key"
      />
      <div style={{ marginTop: 8, fontSize: 12, color: "#999" }}>
        <em>Tip:</em> CBM auto-calculates from <strong>Length × Width × Height × Carton</strong> using the selected unit.
        &nbsp; GWT auto-calculates from <strong>Carton/Pcs × weight</strong> (but you can override it).
      </div>
      <Button
        type="dashed"
        onClick={addItem}
        icon={<PlusOutlined />}
        style={{
          marginTop: 12,
          width: "100%",
          height: 44,
          borderRadius: 10,
          border: "2px dashed #1890ff",
          background: "rgba(24, 144, 255, 0.1)",
          color: "#1890ff",
          fontWeight: 600,
        }}
        ref={(ref) => inputRefs?.current && (inputRefs.current["addItemBtn"] = ref)}
      >
        Add item
      </Button>
    </>
  );
}
