// ShippingPlanForm.jsx
import React, { useState, useEffect } from "react";
import {
  Form,
  Select,
  DatePicker,
  Input,
  Button,
  InputNumber,
  Modal,
} from "antd";
import {
  PlusOutlined,
  ExclamationCircleOutlined,
  CopyOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;

/**
 * props:
 *  - mode: "add" | "edit" | "view"
 *  - initialValues: object (optional, for edit/view)
 *  - onSubmit: function(values) (for add/edit)
 *  - onCopy?: function(newRef, data) (optional, for view -> copy)
 *  - onDelete?: function(data) (optional, for view -> delete)
 */
const AddShippingPlan = ({
  mode = "add",
  initialValues,
  onSubmit,
  onCopy,
  onDelete,
}) => {
  const [form] = Form.useForm();
  const isEdit = mode === "edit";
  const isView = mode === "view";

  const [containers, setContainers] = useState(
    initialValues?.containers?.length
      ? initialValues.containers.map((_, idx) => ({ id: idx + 1 }))
      : [{ id: 1 }]
  );

  // copy & delete modal state
  const [copyOpen, setCopyOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [copyRef, setCopyRef] = useState("");

  const addRow = () => {
    if (isView) return;
    setContainers((prev) => [...prev, { id: Date.now() }]);
  };

  const removeRow = (id) => {
    if (isView) return;
    setContainers((prev) => prev.filter((r) => r.id !== id));
  };

  // 🔁 pre-fill form when editing / viewing
  useEffect(() => {
    if (!initialValues) return;

    setContainers(
      initialValues.containers?.length
        ? initialValues.containers.map((_, idx) => ({ id: idx + 1 }))
        : [{ id: 1 }]
    );

    form.setFieldsValue({
      ...initialValues,
      date: initialValues.date ? dayjs(initialValues.date) : null,
      fdrEtdDate: initialValues.fdrEtdDate
        ? dayjs(initialValues.fdrEtdDate)
        : null,
      mtrEtdDate: initialValues.mtrEtdDate
        ? dayjs(initialValues.mtrEtdDate)
        : null,
      fdrEtaDate: initialValues.fdrEtaDate
        ? dayjs(initialValues.fdrEtaDate)
        : null,
      mtrEtaDate: initialValues.mtrEtaDate
        ? dayjs(initialValues.mtrEtaDate)
        : null,
      containers: initialValues.containers || [],
    });
  }, [initialValues, form]);

  const handleFinish = (values) => {
    if (isView) return; // view mode e submit nai
    if (onSubmit) onSubmit(values);
    console.log(isEdit ? "EDIT submit:" : "ADD submit:", values);
  };

  const formatDate = (d) => (d ? dayjs(d).format("DD MMM YYYY") : "--");

  // small helpers for modal summary
  const v = initialValues || {};
  const ref = v.reference || "--";
  const line = v.shippingLine || "--";
  const dateStr = formatDate(v.date);

  const handlePrint = () => {
    // simple full-page print
    window.print();
  };

  // ---------------- VIEW MODE: nice read-only design + modals ----------------
  if (isView) {
    const safeContainers = v.containers || [];

    return (
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          {/* Header area */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 border-b pb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Shipping Plan Details
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Reference:{" "}
                <span className="font-medium text-gray-700">
                  {v.reference || "--"}
                </span>
              </p>
            </div>

            {/* action buttons: print + copy + delete */}
            <div className="flex flex-wrap items-center gap-2">
              {/* PRINT */}
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                <PrinterOutlined className="text-[11px]" />
                Print
              </button>

              {/* COPY */}
              <button
                type="button"
                onClick={() => {
                  setCopyRef(""); // reset
                  setCopyOpen(true);
                }}
                className="inline-flex items-center gap-1 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700 hover:bg-cyan-100 transition"
              >
                <CopyOutlined className="text-[11px]" />
                Copy Plan
              </button>

              {/* DELETE */}
              <button
                type="button"
                onClick={() => setDeleteOpen(true)}
                className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 transition"
              >
                <ExclamationCircleOutlined className="text-[11px]" />
                Delete
              </button>
            </div>
          </div>

          {/* Chips row */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
              Booking: {v.bookingNo || "--"}
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              Shipping Line: {v.shippingLine || "--"}
            </span>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Date: {formatDate(v.date)}
            </span>
          </div>

          {/* Main 2-column detail cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* FDR / Mother vessel card */}
            <div className="rounded-xl border border-sky-100 bg-sky-50/40 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">
                  FDR / Mother Vessel
                </h3>
                <span className="text-[11px] uppercase tracking-wide text-sky-500 font-semibold">
                  FDR SECTION
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div>
                  <div className="text-[11px] text-gray-500 uppercase">
                    Shipping Line
                  </div>
                  <div className="mt-0.5 font-medium text-gray-800">
                    {v.shippingLine || "--"}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-gray-500 uppercase">
                    FDR / VSL
                  </div>
                  <div className="mt-0.5 font-medium text-gray-800">
                    {v.fdrVsl || "--"}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-gray-500 uppercase">
                    FDR ETD
                  </div>
                  <div className="mt-0.5 font-medium text-gray-800">
                    {formatDate(v.fdrEtdDate)}
                    {v.fdrEtdStatus ? (
                      <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                        {v.fdrEtdStatus}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-gray-500 uppercase">
                    FDR ETA
                  </div>
                  <div className="mt-0.5 font-medium text-gray-800">
                    {formatDate(v.fdrEtaDate)}
                    {v.fdrEtaStatus ? (
                      <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                        {v.fdrEtaStatus}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="text-[11px] text-gray-500 uppercase">
                    FDR Voyage
                  </div>
                  <div className="mt-0.5 font-medium text-gray-800">
                    {v.fdrVoyage || "--"}
                  </div>
                </div>
              </div>
            </div>

            {/* MTR / Feeder vessel card */}
            <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">
                  MTR / Feeder Vessel
                </h3>
                <span className="text-[11px] uppercase tracking-wide text-amber-600 font-semibold">
                  MTR SECTION
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div>
                  <div className="text-[11px] text-gray-500 uppercase">
                    MTR / VSL
                  </div>
                  <div className="mt-0.5 font-medium text-gray-800">
                    {v.mtrVsl || v.mtrRight || "--"}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-gray-500 uppercase">
                    MTR ETD
                  </div>
                  <div className="mt-0.5 font-medium text-gray-800">
                    {formatDate(v.mtrEtdDate)}
                    {v.mtrEtdStatus ? (
                      <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                        {v.mtrEtdStatus}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-gray-500 uppercase">
                    MTR ETA
                  </div>
                  <div className="mt-0.5 font-medium text-gray-800">
                    {formatDate(v.mtrEtaDate)}
                    {v.mtrEtaStatus ? (
                      <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                        {v.mtrEtaStatus}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="text-[11px] text-gray-500 uppercase">
                    Document Date
                  </div>
                  <div className="mt-0.5 font-medium text-gray-800">
                    {formatDate(v.date)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Container summary */}
          <div className="rounded-xl border border-gray-100 bg-gray-50/60">
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <h3 className="text-sm font-semibold text-gray-800">
                Container Summary
              </h3>
              <span className="text-[11px] text-gray-500">
                Total Types: {safeContainers.length || 0}
              </span>
            </div>
            <div className="text-xs">
              <div className="grid grid-cols-12 px-4 py-2 bg-gray-100 text-[11px] font-semibold text-gray-600">
                <div className="col-span-6">Container Type</div>
                <div className="col-span-3 text-center">Label</div>
                <div className="col-span-3 text-center">Quantity</div>
              </div>

              {safeContainers.length === 0 ? (
                <div className="px-4 py-3 text-center text-gray-400 text-xs">
                  No containers added.
                </div>
              ) : (
                safeContainers.map((c, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 px-4 py-2 border-t text-xs items-center"
                  >
                    <div className="col-span-6 font-medium text-gray-800">
                      {c.type || "--"}
                    </div>
                    <div className="col-span-3 text-center text-gray-500">
                      Container
                    </div>
                    <div className="col-span-3 text-center font-semibold text-gray-800">
                      {c.qty ?? "--"}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Remark */}
          <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4">
            <div className="text-[11px] text-indigo-500 uppercase font-semibold">
              Remark
            </div>
            <div className="mt-1 text-xs text-gray-800 whitespace-pre-line">
              {v.remark && v.remark.trim() !== "" ? (
                v.remark
              ) : (
                <span className="text-gray-400 italic">
                  No remark added.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 🔴 DELETE MODAL */}
        <Modal
          open={deleteOpen}
          onCancel={() => setDeleteOpen(false)}
          footer={null}
          width={520}
          centered
          destroyOnClose
          closable={false}
        >
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <ExclamationCircleOutlined className="text-lg text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900">
                Delete this shipping plan?
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                This action cannot be undone. The selected shipping plan and its
                container information will be permanently removed.
              </p>

              <div className="mt-3 rounded-lg border border-red-100 bg-red-50/60 px-3 py-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[11px] text-gray-500">Reference</div>
                    <div className="font-semibold text-gray-900">{ref}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500">
                      Shipping Line
                    </div>
                    <div className="text-gray-800">{line}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-gray-500">Date</div>
                    <div className="text-gray-800">{dateStr}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <Button
              onClick={() => setDeleteOpen(false)}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                if (onDelete) {
                  onDelete(initialValues);
                } else {
                  console.log("delete:", initialValues);
                }
                setDeleteOpen(false);
              }}
            >
              Yes, delete it
            </Button>
          </div>
        </Modal>

        {/* 🟢 COPY MODAL */}
        <Modal
          open={copyOpen}
          onCancel={() => setCopyOpen(false)}
          footer={null}
          width={520}
          centered
          destroyOnClose
          closable={false}
        >
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50">
              <CopyOutlined className="text-lg text-cyan-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900">
                Copy this shipping plan
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                A new shipping plan will be created with the same details and
                containers. You can modify it later.
              </p>

              <div className="mt-3 rounded-lg border border-cyan-100 bg-cyan-50/60 px-3 py-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[11px] text-gray-500">
                      Original Ref.
                    </div>
                    <div className="font-semibold text-gray-900">{ref}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500">
                      Shipping Line
                    </div>
                    <div className="text-gray-800">{line}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-gray-500">Date</div>
                    <div className="text-gray-800">{dateStr}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">
                  New Reference ID
                </label>
                <Input
                  placeholder="e.g. EAFI#2500006"
                  value={copyRef}
                  onChange={(e) => setCopyRef(e.target.value)}
                  size="middle"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  This will be the reference for the copied shipping plan.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <Button
              onClick={() => setCopyOpen(false)}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className="bg-cyan-500 hover:bg-cyan-600 border-none"
              disabled={!copyRef}
              onClick={() => {
                if (onCopy) {
                  onCopy(copyRef, initialValues);
                } else {
                  console.log("copy from:", initialValues, "newRef:", copyRef);
                }
                setCopyOpen(false);
              }}
            >
              Create copy
            </Button>
          </div>
        </Modal>
      </div>
    );
  }

  // ---------------- ADD / EDIT FORM MODE ----------------
  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          {isEdit ? "Edit Shipping Plan" : "Add Shipping Plan"}
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="space-y-6"
        >
          {/* TWO COLUMN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT SIDE */}
            <div className="space-y-3">
              {/* Booking No */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  Booking No.
                </label>
                <div className="col-span-9">
                  <Form.Item name="bookingNo" className="mb-0">
                    <Select
                      placeholder="None selected"
                      className="w-full"
                      allowClear
                    >
                      <Option value="B001">B001</Option>
                      <Option value="B002">B002</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              {/* Shipping Line */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  Shipping Line
                </label>
                <div className="col-span-9">
                  <Form.Item name="shippingLine" className="mb-0">
                    <Select placeholder="(-- Select/None --)" allowClear>
                      <Option value="maersk">Maersk</Option>
                      <Option value="msc">MSC</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              {/* FDR/VSL */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  FDR/VSL
                </label>
                <div className="col-span-9">
                  <Form.Item name="fdrVsl" className="mb-0">
                    <Select placeholder="(-- Select/None --)" allowClear>
                      <Option value="vsl1">Vessel 1</Option>
                      <Option value="vsl2">Vessel 2</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              {/* FDR/VSL ETD */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  FDR/VSL ETD
                </label>
                <div className="col-span-4">
                  <Form.Item name="fdrEtdDate" className="mb-0">
                    <DatePicker className="w-full" format="DD MMMM, YYYY" />
                  </Form.Item>
                </div>
                <div className="col-span-5">
                  <Form.Item name="fdrEtdStatus" className="mb-0">
                    <Select placeholder="(-- Select/None --)" allowClear>
                      <Option value="none">None</Option>
                      <Option value="confirmed">Confirmed</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              {/* MTR/VSL */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  MTR/VSL
                </label>
                <div className="col-span-9">
                  <Form.Item name="mtrVsl" className="mb-0">
                    <Select placeholder="(-- Select/None --)" allowClear>
                      <Option value="mv1">MTR 1</Option>
                      <Option value="mv2">MTR 2</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              {/* MTR/VSL ETD */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  MTR/VSL ETD
                </label>
                <div className="col-span-4">
                  <Form.Item name="mtrEtdDate" className="mb-0">
                    <DatePicker className="w-full" format="DD MMMM, YYYY" />
                  </Form.Item>
                </div>
                <div className="col-span-5">
                  <Form.Item name="mtrEtdStatus" className="mb-0">
                    <Select placeholder="(-- Select/None --)" allowClear>
                      <Option value="none">None</Option>
                      <Option value="confirmed">Confirmed</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              {/* Container table */}
              <div className="mt-4 border rounded-md overflow-hidden">
                <div className="bg-sky-100 text-sm font-semibold text-gray-800 grid grid-cols-12 px-4 py-2">
                  <div className="col-span-6">Container Type</div>
                  <div className="col-span-3 text-center">Label</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-1 text-center">Action</div>
                </div>

                {containers.map((row, index) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-12 items-center px-4 py-2 border-t text-sm"
                  >
                    <div className="col-span-6">
                      <Form.Item
                        name={["containers", index, "type"]}
                        className="mb-0"
                      >
                        <Select placeholder="Select container">
                          <Option value="20DC">20DC</Option>
                          <Option value="40HC">40HC</Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-span-3 text-center">Container</div>
                    <div className="col-span-2">
                      <Form.Item
                        name={["containers", index, "qty"]}
                        className="mb-0"
                      >
                        <InputNumber min={1} className="w-full" />
                      </Form.Item>
                    </div>
                    <div className="col-span-1 text-center">
                      {containers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRow(row.id)}
                          className="text-red-500 hover:underline text-xs"
                        >
                          X
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Button
                  type="primary"
                  onClick={addRow}
                  icon={<PlusOutlined />}
                  className="bg-green-600 hover:bg-green-700 border-none"
                >
                  Add Row
                </Button>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-3">
              {/* Date */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  Date *
                </label>
                <div className="col-span-9">
                  <Form.Item
                    name="date"
                    rules={[{ required: true, message: "Date is required" }]}
                    className="mb-0"
                  >
                    <DatePicker className="w-full" format="DD MMMM, YYYY" />
                  </Form.Item>
                </div>
              </div>

              {/* FDR/VSL Voyage */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  FDR/VSL Voyage
                </label>
                <div className="col-span-9">
                  <Form.Item name="fdrVoyage" className="mb-0">
                    <Input placeholder="" />
                  </Form.Item>
                </div>
              </div>

              {/* FDR/VSL ETA (AETA) */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  FDR/VSL ETA
                </label>
                <div className="col-span-4">
                  <Form.Item name="fdrEtaDate" className="mb-0">
                    <DatePicker className="w-full" format="DD MMMM, YYYY" />
                  </Form.Item>
                </div>
                <div className="col-span-5">
                  <Form.Item name="fdrEtaStatus" className="mb-0">
                    <Select placeholder="(-- Select/None --)" allowClear>
                      <Option value="none">None</Option>
                      <Option value="approx">Approx</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              {/* MTR/VSL */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  MTR/VSL
                </label>
                <div className="col-span-9">
                  <Form.Item name="mtrRight" className="mb-0">
                    <Input />
                  </Form.Item>
                </div>
              </div>

              {/* MTR/VSL ETA (AETA) */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  MTR/VSL ETA
                </label>
                <div className="col-span-4">
                  <Form.Item name="mtrEtaDate" className="mb-0">
                    <DatePicker className="w-full" format="DD MMMM, YYYY" />
                  </Form.Item>
                </div>
                <div className="col-span-5">
                  <Form.Item name="mtrEtaStatus" className="mb-0">
                    <Select placeholder="(-- Select/None --)" allowClear>
                      <Option value="none">None</Option>
                      <Option value="approx">Approx</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              {/* Remark */}
              <div className="grid grid-cols-12 items-start gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  Remark
                </label>
                <div className="col-span-9">
                  <Form.Item name="remark" className="mb-0">
                    <TextArea rows={3} />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <span>* Required Fields</span>
            <Button type="primary" htmlType="submit" className="px-8">
              {isEdit ? "Update" : "Submit"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddShippingPlan;
