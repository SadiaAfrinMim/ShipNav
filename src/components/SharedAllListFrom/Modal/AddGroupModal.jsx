// src/pages/user-group/AddGroupModal.jsx
import React, { useEffect } from "react";
import { Modal, Form, Input, Checkbox, Button } from "antd";
import { MenuOutlined, CloseOutlined, BankOutlined } from "@ant-design/icons";

const { TextArea } = Input;

// 👉 Example data – চাইলে API থেকে আনবে
const ROLE_FUNCTIONS = ["Add", "Delete", "Edit", "List", "View"];

const CONTROLLERS = [
  "ImportSea_DeliveryOrder",
  "ImportAir_ExpenseBill",
  "ExportSea_ShipmentAdvice",
  "ExportAir_CreditNote",
  "ImportSea_CnFExpenseBill",
  "ExportSea_FreightInvoice",
  "ImportSea_FreightInvoice",
  "Contra",
  "AccountGroup",
  "Adjustment",
  "Trade",
  "KeyAccount",
  "SystemPrefix",
  "GHAgent",
  "SaleReceive",
  "ExportAir_CargoManifest",
  // ...আরো controller লাগলে এখানে বাড়াও
];

const AddGroupModal = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading = false,
  initialValues = null,
  mode = "create", // "create" | "edit"
}) => {
  const [form] = Form.useForm();

  const modalTitle = mode === "edit" ? "Edit Group" : "Add Group";
  const submitLabel = mode === "edit" ? "Update" : "Submit";

  // edit mode হলে values সেট
  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  const handleClose = () => {
    form.resetFields();
    onCancel && onCancel();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // values.roles = { controllerKey: { Add: true, Edit: true, ... } }
      onSubmit && onSubmit(values);
      if (mode === "create") {
        form.resetFields();
      }
    });
  };

  // 🔹 প্রতিটা controller এর checkbox = "Select All" for that row
  const handleControllerToggle = (controllerKey, checked) => {
    const allValues = form.getFieldsValue();
    const prevRoles = allValues.roles || {};
    const prevControllerSelected = allValues.controllerSelected || {};

    // ঐ controller এর existing roles (না থাকলে নতুন অবজেক্ট)
    const updatedControllerRoles = { ...(prevRoles[controllerKey] || {}) };

    ROLE_FUNCTIONS.forEach((fn) => {
      updatedControllerRoles[fn] = checked; // সব ফাংশন same state
    });

    form.setFieldsValue({
      controllerSelected: {
        ...prevControllerSelected,
        [controllerKey]: checked,
      },
      roles: {
        ...prevRoles,
        [controllerKey]: updatedControllerRoles,
      },
    });
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      closable={false}
      width={900}
      className="max-w-[1000px]"
      styles={{
        header: { padding: 0, borderBottom: "none" },
        body: { padding: 0 },
      }}
    >
     
     <div className="flex item-center gap-4 justify-start items-center">
         <div
                 style={{
                   width: 36,
                   height: 36,
                   borderRadius: "50%",
                   background: "#e6f7ff",
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
                   color: "#1890ff",
                   fontSize: 18,
                 }}
               >
                 <BankOutlined /> 
               </div> <h4 className="text-2xl">Add group</h4>
     </div>
      {/* 🔹 Modal Body */}
      <div className="px-6 py-4 max-h-[70vh] overflow-y-auto bg-white">
        <Form
          form={form}
          layout="horizontal"
          labelAlign="left"
          labelCol={{ flex: "110px" }}
          wrapperCol={{ flex: "auto" }}
          colon={false}
        >
          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter group name" }]}
          >
            <Input size="small" />
          </Form.Item>

          {/* Description */}
          <Form.Item label="Description" name="description">
            <TextArea rows={2} size="small" />
          </Form.Item>

          {/* Group Roles */}
          <Form.Item label="Group Roles" className="mb-0">
            <div className="border border-gray-200 rounded-sm text-xs">
              {/* Header Row */}
              <div className="grid grid-cols-[1.5fr,1fr] border-b border-gray-200 bg-gray-50 px-4 py-2 font-semibold">
                <span>Controller</span>
                <span>Function</span>
              </div>

              {/* Controller Rows */}
              {CONTROLLERS.map((ctrl) => (
                <div
                  key={ctrl}
                  className="grid grid-cols-[1.5fr,1fr] px-4 py-3 border-b last:border-b-0 border-gray-200"
                >
                  {/* Controller checkbox (master for the row) */}
                  <div className="flex items-start gap-2">
                    <Form.Item
                      name={["controllerSelected", ctrl]}
                      valuePropName="checked"
                      noStyle
                    >
                      <Checkbox
                        onChange={(e) =>
                          handleControllerToggle(ctrl, e.target.checked)
                        }
                      />
                    </Form.Item>
                    <span className="mt-[2px]">{ctrl}</span>
                  </div>

                  {/* Functions checkboxes (vertical, screenshot style) */}
                  <div className="flex flex-col gap-1">
                    {ROLE_FUNCTIONS.map((fn) => (
                      <Form.Item
                        key={fn}
                        name={["roles", ctrl, fn]}
                        valuePropName="checked"
                        noStyle
                      >
                        <Checkbox>{fn}</Checkbox>
                      </Form.Item>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Form.Item>
        </Form>
      </div>

      {/* 🔹 Footer Buttons – আগের modal ডিজাইনের মতো */}
      <div className="px-6 py-3 flex justify-end gap-2 bg-gray-50 border-t border-gray-200">
        <Button onClick={handleClose} size="small">
          Cancel
        </Button>
        <Button
          type="primary"
          size="small"
          loading={confirmLoading}
          onClick={handleOk}
        >
          {submitLabel}
        </Button>
      </div>
    </Modal>
  );
};

export default AddGroupModal;
