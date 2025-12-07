// File: AddStuffingPackage.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  InputNumber,
  Button,
  Table,
  Typography,
  Space,
  message,
  Modal,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  CheckOutlined,
  RollbackOutlined,
  EditOutlined,
  EyeOutlined,
  CopyOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Text } = Typography;

const planOptions = [
  { value: "", label: "(-- Select/None --)" },
  { value: "EAFI#25000005", label: "EAFI#25000005" },
  { value: "EAFI#25000004", label: "EAFI#25000004" },
  { value: "EAFI#25000002", label: "EAFI#25000002" },
  { value: "EAFI#25000001", label: "EAFI#25000001" },
];

const modeOptions = [
  { value: "", label: "(-- Select/None --)" },
  { value: "LCL-LCL", label: "LCL-LCL" },
  { value: "CFS-CY", label: "CFS-CY" },
  { value: "CY-CY", label: "CY-CY" },
];

const bookingOptions = [
  { value: "", label: "Select/None" },
  { value: "ES#2500005", label: "ES#2500005" },
  { value: "ES#2500004", label: "ES#2500004" },
  { value: "ES#2500001", label: "ES#2500001" },
];

const cntrTypes = [
  { value: "", label: "Select/None" },
  { value: "20GP", label: "20' GP" },
  { value: "40GP", label: "40' GP" },
  { value: "40HQ", label: "40' HQ" },
];

/**
 * props:
 *  - mode: "add" | "edit" | "view"
 *  - initialValues?: { planNo, mode, date, remark, items?: [] }
 *  - onSubmit?: (payload) => void
 *  - onDelete?: (payload) => void
 *  - onCopy?: (newRef, payload) => void
 *  - autoOpenDelete?: boolean
 *  - autoOpenCopy?: boolean
 */
export default function AddStuffingPackage({
  mode = "add",
  initialValues,
  onSubmit,
  onDelete,
  onCopy,
  autoOpenDelete = false,
  autoOpenCopy = false,
}) {
  const [form] = Form.useForm();

  const isEdit = mode === "edit";
  const isView = mode === "view";

  const [rows, setRows] = useState([
    {
      key: Date.now(),
      bookingNo: "",
      cntrType: "",
      cntrNo: "",
      sealNo: "",
      po: "",
      style: "",
      color: "",
      so: "",
      totalCarton: 0,
      package: 0,
      receiveCarton: 0,
      cbm: 0,
      gwt: 0,
    },
  ]);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);
  const [copyRef, setCopyRef] = useState("");

  useEffect(() => {
    if (!initialValues) return;

    form.setFieldsValue({
      planNo: initialValues.planNo,
      mode: initialValues.mode,
      remark: initialValues.remark || "",
      date: initialValues.date
        ? dayjs(initialValues.date, ["YYYY-MM-DD", "DD/MM/YYYY"])
        : null,
    });

    if (Array.isArray(initialValues.items) && initialValues.items.length) {
      setRows(
        initialValues.items.map((item, idx) => ({
          key: item.key || idx + 1,
          bookingNo: item.bookingNo || "",
          cntrType: item.cntrType || "",
          cntrNo: item.cntrNo || "",
          sealNo: item.sealNo || "",
          po: item.po || "",
          style: item.style || "",
          color: item.color || "",
          so: item.so || "",
          totalCarton: item.totalCarton || 0,
          package: item.package || 0,
          receiveCarton: item.receiveCarton || 0,
          cbm: item.cbm || 0,
          gwt: item.gwt || 0,
        }))
      );
    }
  }, [initialValues, form]);

  useEffect(() => {
    if (autoOpenDelete) setDeleteOpen(true);
  }, [autoOpenDelete]);

  useEffect(() => {
    if (autoOpenCopy) {
      setCopyRef(
        initialValues?.planNo ? `${initialValues.planNo}-COPY` : ""
      );
      setCopyOpen(true);
    }
  }, [autoOpenCopy, initialValues]);

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      {
        key: Date.now(),
        bookingNo: "",
        cntrType: "",
        cntrNo: "",
        sealNo: "",
        po: "",
        style: "",
        color: "",
        so: "",
        totalCarton: 0,
        package: 0,
        receiveCarton: 0,
        cbm: 0,
        gwt: 0,
      },
    ]);

  const removeRow = (key) =>
    setRows((prev) => prev.filter((r) => r.key !== key));

  const updateCell = (key, field, value) =>
    setRows((prev) =>
      prev.map((r) => (r.key === key ? { ...r, [field]: value } : r))
    );

  const totals = useMemo(() => {
    const sum = (f) => rows.reduce((acc, r) => acc + (Number(r[f]) || 0), 0);
    return {
      totalCarton: sum("totalCarton"),
      package: sum("package"),
      receiveCarton: sum("receiveCarton"),
      balanceCarton: sum("totalCarton") - sum("receiveCarton"),
      cbm: sum("cbm"),
      gwt: sum("gwt"),
    };
  }, [rows]);

  const columns = [
    {
      title: "Booking No.",
      dataIndex: "bookingNo",
      width: 150,
      render: (v, record) => (
        <Select
          options={bookingOptions}
          value={v}
          onChange={(val) => updateCell(record.key, "bookingNo", val)}
          style={{ width: "100%" }}
          disabled={isView}
        />
      ),
    },
    {
      title: "CNTR Type",
      dataIndex: "cntrType",
      width: 140,
      render: (v, record) => (
        <Select
          options={cntrTypes}
          value={v}
          onChange={(val) => updateCell(record.key, "cntrType", val)}
          style={{ width: "100%" }}
          disabled={isView}
        />
      ),
    },
    {
      title: "CNTR No.",
      dataIndex: "cntrNo",
      width: 140,
      render: (v, record) => (
        <Input
          placeholder="Container No."
          value={v}
          onChange={(e) => updateCell(record.key, "cntrNo", e.target.value)}
          disabled={isView}
        />
      ),
    },
    {
      title: "Seal No.",
      dataIndex: "sealNo",
      width: 120,
      render: (v, record) => (
        <Input
          placeholder="Seal No."
          value={v}
          onChange={(e) => updateCell(record.key, "sealNo", e.target.value)}
          disabled={isView}
        />
      ),
    },
    {
      title: "PO#",
      dataIndex: "po",
      width: 120,
      render: (v, record) => (
        <Input
          value={v}
          onChange={(e) => updateCell(record.key, "po", e.target.value)}
          disabled={isView}
        />
      ),
    },
    {
      title: "Style",
      dataIndex: "style",
      width: 120,
      render: (v, record) => (
        <Input
          value={v}
          onChange={(e) => updateCell(record.key, "style", e.target.value)}
          disabled={isView}
        />
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      width: 120,
      render: (v, record) => (
        <Input
          value={v}
          onChange={(e) => updateCell(record.key, "color", e.target.value)}
          disabled={isView}
        />
      ),
    },
    {
      title: "S/O",
      dataIndex: "so",
      width: 100,
      render: (v, record) => (
        <Input
          value={v}
          onChange={(e) => updateCell(record.key, "so", e.target.value)}
          disabled={isView}
        />
      ),
    },
    {
      title: "Total Carton",
      dataIndex: "totalCarton",
      width: 130,
      align: "right",
      render: (v, record) => (
        <InputNumber
          min={0}
          value={v}
          onChange={(val) =>
            updateCell(record.key, "totalCarton", val || 0)
          }
          style={{ width: "100%" }}
          disabled={isView}
        />
      ),
    },
    {
      title: "Package",
      dataIndex: "package",
      width: 110,
      align: "right",
      render: (v, record) => (
        <InputNumber
          min={0}
          value={v}
          onChange={(val) => updateCell(record.key, "package", val || 0)}
          style={{ width: "100%" }}
          disabled={isView}
        />
      ),
    },
    {
      title: "Receive Carton",
      dataIndex: "receiveCarton",
      width: 140,
      align: "right",
      render: (v, record) => (
        <InputNumber
          min={0}
          value={v}
          onChange={(val) =>
            updateCell(record.key, "receiveCarton", val || 0)
          }
          style={{ width: "100%" }}
          disabled={isView}
        />
      ),
    },
    {
      title: "Balance Carton",
      dataIndex: "balanceCarton",
      width: 140,
      align: "right",
      render: (_, record) => {
        const bal =
          (Number(record.totalCarton) || 0) -
          (Number(record.receiveCarton) || 0);
        return <div>{bal}</div>;
      },
    },
    {
      title: "CBM",
      dataIndex: "cbm",
      width: 110,
      align: "right",
      render: (v, record) => (
        <InputNumber
          min={0}
          value={v}
          onChange={(val) => updateCell(record.key, "cbm", val || 0)}
          style={{ width: "100%" }}
          disabled={isView}
        />
      ),
    },
    {
      title: "GWT",
      dataIndex: "gwt",
      width: 110,
      align: "right",
      render: (v, record) => (
        <InputNumber
          min={0}
          value={v}
          onChange={(val) => updateCell(record.key, "gwt", val || 0)}
          style={{ width: "100%" }}
          disabled={isView}
        />
      ),
    },
    ...(!isView
      ? [
          {
            title: "Action",
            key: "action",
            width: 110,
            align: "center",
            fixed: "right",
            render: (_, record) => (
              <Button
                danger
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => removeRow(record.key)}
              >
                Remove
              </Button>
            ),
          },
        ]
      : []),
  ];

  const buildPayload = (values) => ({
    ...values,
    date: values.date ? values.date.format("YYYY-MM-DD") : null,
    items: rows.map((r) => ({
      ...r,
      balanceCarton:
        (Number(r.totalCarton) || 0) - (Number(r.receiveCarton) || 0),
    })),
    totals,
  });

  const handleFinish = (values) => {
    if (isView) return;
    const payload = buildPayload(values);
    if (onSubmit) onSubmit(payload);
    else {
      console.log(isEdit ? "EDIT SUBMIT >>>" : "ADD SUBMIT >>>", payload);
      message.success("Stuffing Package saved.");
    }
  };

  const headerTitle = isView
    ? "View Stuffing Package"
    : isEdit
    ? "Edit Stuffing Package"
    : "Add Stuffing Package";

  const formatDate = (d) => (d ? dayjs(d).format("DD MMM YYYY") : "--");

  const formVals = form.getFieldsValue();
  const viewPlanNo = formVals.planNo || initialValues?.planNo || "--";
  const viewMode = formVals.mode || initialValues?.mode || "--";
  const viewDate =
    formVals.date ||
    (initialValues?.date
      ? dayjs(initialValues.date, ["YYYY-MM-DD", "DD/MM/YYYY"])
      : null);
  const viewRemark = formVals.remark || initialValues?.remark || "";

  // -------- VIEW MODE (eye-catchy) ----------
  if (isView) {
    return (
      <div className="p-2">
        <div className="bg-white rounded-xl border border-cyan-200 shadow-sm overflow-hidden">
          {/* header bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-cyan-500 text-white">
            <div className="flex items-center gap-2">
              <EyeOutlined />
              <span className="font-semibold text-sm">
                {headerTitle}
              </span>
              <span className="ml-2 rounded-full bg-white/15 px-2 py-0.5 text-[11px]">
                {viewPlanNo}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="small"
                icon={<CopyOutlined />}
                className="!bg-white !text-cyan-700 !border-none hover:!bg-cyan-50"
                onClick={() => {
                  setCopyRef(`${viewPlanNo || ""}-COPY`);
                  setCopyOpen(true);
                }}
              >
                Copy
              </Button>
              <Button
                size="small"
                icon={<EditOutlined />}
                className="!bg-white !text-cyan-700 !border-none hover:!bg-cyan-50"
                onClick={() =>
                  message.info(
                    "Edit korte drawer theke mode='edit' pathao (parent theke)."
                  )
                }
              >
                Edit
              </Button>
              <Button
                size="small"
                icon={<DeleteOutlined />}
                danger
                type="primary"
                onClick={() => setDeleteOpen(true)}
              >
                Delete
              </Button>
            </div>
          </div>

          {/* chips */}
          <div className="px-4 py-3 flex flex-wrap gap-2 border-b border-cyan-100 bg-cyan-50/40">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-medium text-cyan-700 border border-cyan-200">
              Plan No: {viewPlanNo}
            </span>
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-medium text-emerald-700 border border-emerald-200">
              Mode: {viewMode}
            </span>
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-medium text-gray-700 border border-gray-200">
              Date: {formatDate(viewDate)}
            </span>
          </div>

          {/* body */}
          <div className="p-4 space-y-4">
            {/* remark */}
            <div className="rounded-lg border border-indigo-100 bg-indigo-50/40 p-3">
              <div className="text-[11px] font-semibold uppercase text-indigo-500">
                Remark
              </div>
              <div className="mt-1 text-xs text-gray-800 whitespace-pre-line">
                {viewRemark && viewRemark.trim() !== ""
                  ? viewRemark
                  : "No remark added."}
              </div>
            </div>

            {/* table readonly */}
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-3 py-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">
                  Container & Package Details
                </span>
                <span className="text-[11px] text-gray-500">
                  Total Rows: {rows.length}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-2 py-1 text-left">Booking</th>
                      <th className="px-2 py-1 text-left">CNTR Type</th>
                      <th className="px-2 py-1 text-left">CNTR No.</th>
                      <th className="px-2 py-1 text-left">Seal</th>
                      <th className="px-2 py-1 text-left">PO#</th>
                      <th className="px-2 py-1 text-left">Style</th>
                      <th className="px-2 py-1 text-left">Color</th>
                      <th className="px-2 py-1 text-left">S/O</th>
                      <th className="px-2 py-1 text-right">Total</th>
                      <th className="px-2 py-1 text-right">Package</th>
                      <th className="px-2 py-1 text-right">Receive</th>
                      <th className="px-2 py-1 text-right">Balance</th>
                      <th className="px-2 py-1 text-right">CBM</th>
                      <th className="px-2 py-1 text-right">GWT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={14}
                          className="px-3 py-3 text-center text-gray-400"
                        >
                          No container rows.
                        </td>
                      </tr>
                    ) : (
                      rows.map((r) => {
                        const bal =
                          (Number(r.totalCarton) || 0) -
                          (Number(r.receiveCarton) || 0);
                        return (
                          <tr key={r.key} className="border-t">
                            <td className="px-2 py-1">{r.bookingNo || "--"}</td>
                            <td className="px-2 py-1">{r.cntrType || "--"}</td>
                            <td className="px-2 py-1">{r.cntrNo || "--"}</td>
                            <td className="px-2 py-1">{r.sealNo || "--"}</td>
                            <td className="px-2 py-1">{r.po || "--"}</td>
                            <td className="px-2 py-1">{r.style || "--"}</td>
                            <td className="px-2 py-1">{r.color || "--"}</td>
                            <td className="px-2 py-1">{r.so || "--"}</td>
                            <td className="px-2 py-1 text-right">
                              {r.totalCarton || 0}
                            </td>
                            <td className="px-2 py-1 text-right">
                              {r.package || 0}
                            </td>
                            <td className="px-2 py-1 text-right">
                              {r.receiveCarton || 0}
                            </td>
                            <td className="px-2 py-1 text-right">{bal}</td>
                            <td className="px-2 py-1 text-right">
                              {r.cbm || 0}
                            </td>
                            <td className="px-2 py-1 text-right">
                              {r.gwt || 0}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* totals */}
              <div className="flex flex-wrap items-center justify-end gap-4 px-3 py-2 bg-gray-50 border-t">
                <Stat label="Receive Carton" value={totals.receiveCarton} />
                <Stat label="Balance Carton" value={totals.balanceCarton} />
                <Stat label="CBM" value={totals.cbm} />
                <Stat label="GWT" value={totals.gwt} />
              </div>
            </div>
          </div>
        </div>

        {/* delete modal */}
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
                Delete this stuffing package?
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                This action cannot be undone. The selected stuffing package and
                all its items will be permanently removed.
              </p>

              <div className="mt-3 rounded-lg border border-red-100 bg-red-50/60 px-3 py-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[11px] text-gray-500">
                      Stuffing Plan No.
                    </div>
                    <div className="font-semibold text-gray-900">
                      {viewPlanNo}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500">Mode</div>
                    <div className="text-gray-800">{viewMode}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-gray-500">Date</div>
                    <div className="text-gray-800">
                      {formatDate(viewDate)}
                    </div>
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
                const payload = buildPayload({
                  planNo: viewPlanNo,
                  mode: viewMode,
                  date: viewDate || dayjs(),
                  remark: viewRemark,
                });
                if (onDelete) onDelete(payload);
                else console.log("DELETE >>>", payload);
                setDeleteOpen(false);
              }}
            >
              Yes, delete it
            </Button>
          </div>
        </Modal>

        {/* copy modal */}
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
                Copy this stuffing package
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                A new stuffing package will be created with the same details.
                You can modify it later.
              </p>

              <div className="mt-3 rounded-lg border border-cyan-100 bg-cyan-50/60 px-3 py-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[11px] text-gray-500">
                      Original Plan No.
                    </div>
                    <div className="font-semibold text-gray-900">
                      {viewPlanNo}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-gray-500">Mode</div>
                    <div className="text-gray-800">{viewMode}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">
                  New Plan No.
                </label>
                <Input
                  placeholder="e.g. EAFI#25000010"
                  value={copyRef}
                  onChange={(e) => setCopyRef(e.target.value)}
                  size="middle"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  This will be the reference for the copied stuffing package.
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
                const payload = buildPayload({
                  planNo: copyRef,
                  mode: viewMode,
                  date: viewDate || dayjs(),
                  remark: viewRemark,
                });
                if (onCopy) onCopy(copyRef, payload);
                else console.log("COPY >>>", copyRef, payload);
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

  // -------- ADD / EDIT FORM MODE ----------
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 6,
      }}
    >
      <div
        style={{
          background: "#06b6d4",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 12px",
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {isEdit ? <EditOutlined /> : <PlusOutlined />}
          <strong>{headerTitle}</strong>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          date: dayjs(),
          planNo: "",
          mode: "",
          remark: "",
          ...(initialValues
            ? {
                planNo: initialValues.planNo || "",
                mode: initialValues.mode || "",
                remark: initialValues.remark || "",
                date: initialValues.date
                  ? dayjs(initialValues.date, ["YYYY-MM-DD", "DD/MM/YYYY"])
                  : dayjs(),
              }
            : {}),
        }}
        style={{ padding: 12 }}
      >
        <Row gutter={[12, 8]}>
          <Col xs={24} lg={12}>
            <Form.Item label="Stuffing Plan No." name="planNo">
              <Select options={planOptions} />
            </Form.Item>
            <Form.Item label="Mode" name="mode">
              <Select options={modeOptions} />
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Date is required" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Remark" name="remark">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>

        {/* header row mimic */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "150px 140px 140px 120px 120px 120px 120px 100px 130px 110px 140px 140px 110px 110px 110px",
            gap: 8,
            background: "#e6f7ff",
            padding: "8px 8px",
            border: "1px solid #e5e7eb",
            borderBottom: "none",
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            fontWeight: 600,
          }}
        >
          <div>Booking No.</div>
          <div>CNTR Type</div>
          <div>CNTR No.</div>
          <div>Seal No.</div>
          <div>PO#</div>
          <div>Style</div>
          <div>Color</div>
          <div>S/O</div>
          <div>Total Carton</div>
          <div>Package</div>
          <div>Receive Carton</div>
          <div>Balance Carton</div>
          <div>CBM</div>
          <div>GWT</div>
          <div style={{ textAlign: "center" }}>Action</div>
        </div>

        <Table
          columns={columns}
          dataSource={rows}
          pagination={false}
          size="small"
          rowKey="key"
          style={{
            border: "1px solid #e5e7eb",
            borderTop: "none",
            marginBottom: 8,
          }}
          scroll={{ x: 1400 }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            padding: 8,
            border: "1px solid #e5e7eb",
            borderTop: "none",
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
            marginBottom: 12,
          }}
        >
          <Button type="primary" icon={<PlusOutlined />} onClick={addRow}>
            Add Row
          </Button>

          <div style={{ display: "flex", gap: 24 }}>
            <Stat label="Receive Carton" value={totals.receiveCarton} />
            <Stat label="Balance Carton" value={totals.balanceCarton} />
            <Stat label="CBM" value={totals.cbm} />
            <Stat label="GWT" value={totals.gwt} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #e5e7eb",
            paddingTop: 8,
          }}
        >
          <Text type="secondary">* Required Fields</Text>
          <Space>
            <Button icon={<RollbackOutlined />}>Cancel</Button>
            <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>
              {isEdit ? "Update" : "Submit"}
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
}

const Stat = ({ label, value }) => (
  <div style={{ minWidth: 110 }}>
    <div style={{ fontSize: 12, color: "#64748b" }}>{label}</div>
    <div style={{ fontWeight: 600 }}>
      {Number(value || 0).toLocaleString()}
    </div>
  </div>
);
