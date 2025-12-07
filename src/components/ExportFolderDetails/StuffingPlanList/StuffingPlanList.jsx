// StuffingPlanList.jsx
import React, { useMemo, useState } from "react";
import {
  Layout,
  Table,
  DatePicker,
  Input,
  Space,
  Button,
  Select,
  Dropdown,
  Menu,
  Pagination,
  Typography,
  Drawer,
  Modal,
} from "antd";
import {
  ExclamationCircleOutlined,
  CopyOutlined,
  MoreOutlined, // 👈 ADD THIS
} from "@ant-design/icons";
import dayjs from "dayjs";
import AddShippingPlan from "./AddShippingPlan";

const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Text, Link } = Typography;

const mockData = [
  {
    key: "1",
    sl: 1,
    reference: "EAFI#2500005",
    date: "10/08/2025",
    shippingLine: "ECU Worldwide",
    status: "Opened",
  },
  {
    key: "2",
    sl: 2,
    reference: "EAFI#2500003",
    date: "08/08/2025",
    shippingLine: "MSC",
    status: "Opened",
  },
  {
    key: "3",
    sl: 3,
    reference: "EAFI#2500004",
    date: "08/08/2025",
    shippingLine: "MSC",
    status: "Opened",
  },
  {
    key: "4",
    sl: 4,
    reference: "EAFI#2500002",
    date: "07/08/2025",
    shippingLine: "ONE Line",
    status: "Opened",
  },
  {
    key: "5",
    sl: 5,
    reference: "EAFI#2500001",
    date: "06/08/2025",
    shippingLine: "MSC",
    status: "Opened",
  },
];

// demo dataFromServer – real case e record.id diye fetch korba
const dataFromServer = {
  bookingNo: "B001",
  shippingLine: "maersk",
  date: "2025-12-05",
  fdrEtaDate: "2025-12-10",
  fdrEtaStatus: "approx",
  containers: [{ type: "20DC", qty: 2 }],
};

const Toolbar = ({
  range,
  setRange,
  onReset,
  filter,
  setFilter,
  pageSize,
  setPageSize,
}) => {
  return (
    <div style={{ padding: 12, borderBottom: "1px solid #f0f0f0" }}>
      <Space wrap>
        <div>
          <Text strong style={{ marginRight: 8 }}>
            Start Date *
          </Text>
          <RangePicker
            value={range}
            onChange={setRange}
            allowClear={false}
            style={{ width: 320 }}
          />
        </div>
        <Input
          placeholder="Type to filter..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: 220 }}
        />
      </Space>
      <div style={{ float: "right" }}>
        <Space>
          <Text>Show:</Text>
          <Select
            value={pageSize}
            onChange={setPageSize}
            style={{ width: 80 }}
            options={[10, 25, 50, 100].map((v) => ({
              value: v,
              label: String(v),
            }))}
          />
        </Space>
      </div>
    </div>
  );
};

export default function StuffingPlanList() {
  const [range, setRange] = useState([
    dayjs("2025-07-10"),
    dayjs("2025-10-10"),
  ]);
  const [filter, setFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("view"); // "view" | "edit"
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Copy & Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [recordForAction, setRecordForAction] = useState(null);
  const [copyRef, setCopyRef] = useState("");

  const data = useMemo(() => {
    if (!filter) return mockData;
    const f = filter.toLowerCase();
    return mockData.filter((r) =>
      Object.values(r).some((v) => String(v).toLowerCase().includes(f))
    );
  }, [filter]);

  const handleActionClick = (key, record) => {
    // common merged record (for view/edit/drawer)
    const merged = {
      ...dataFromServer,
      reference: record.reference,
      shippingLine: record.shippingLine,
      date: record.date,
      // baki mapping lagle ekhane
    };

    if (key === "view" || key === "edit") {
      setSelectedRecord(merged);
      setDrawerMode(key === "view" ? "view" : "edit");
      setDrawerOpen(true);
    }

    if (key === "delete") {
      setRecordForAction(merged);
      setDeleteModalOpen(true);
    }

    if (key === "copy") {
      setRecordForAction(merged);
      setCopyRef(`${record.reference}-COPY`);
      setCopyModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    console.log("👉 delete from list:", recordForAction);
    // TODO: real delete API call here
    setDeleteModalOpen(false);
  };

  const handleConfirmCopy = () => {
    console.log("👉 copy this record:", recordForAction, "newRef:", copyRef);
    // TODO: real copy API call here
    setCopyModalOpen(false);
  };

  const columns = [
    {
      title: "S/L No.",
      dataIndex: "sl",
      width: 90,
      sorter: (a, b) => a.sl - b.sl,
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (val) => <Link>{val}</Link>,
      sorter: (a, b) => a.reference.localeCompare(b.reference),
    },
    {
      title: "Date *",
      dataIndex: "date",
      sorter: (a, b) =>
        dayjs(a.date, "DD/MM/YYYY").unix() -
        dayjs(b.date, "DD/MM/YYYY").unix(),
    },
    {
      title: "Shipping Line",
      dataIndex: "shippingLine",
      sorter: (a, b) => a.shippingLine.localeCompare(b.shippingLine),
    },
    {
      title: "Action",
      key: "actions",
      align: "center",
      width: 120,
      render: (_, record) => {
        const menu = (
          <Menu
            onClick={({ key }) => handleActionClick(key, record)}
            items={[
              { key: "view", label: "View" },
              { key: "edit", label: "Edit" },
              { key: "copy", label: "Copy" },
              { type: "divider" },
              {
                key: "delete",
                label: <span style={{ color: "#ef4444" }}>Delete</span>,
              },
            ]}
          />
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <Button
              size="small"
              className="!px-3 !py-1 !rounded-full !border-sky-100 !bg-sky-50 hover:!bg-sky-100 hover:!border-sky-200 !text-sky-700 text-xs shadow-sm flex items-center gap-1"
            >
              <MoreOutlined style={{ fontSize: 12 }} />
              <span>Actions</span>
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const ref = recordForAction?.reference || "--";
  const line = recordForAction?.shippingLine || "--";
  const dateStr = recordForAction?.date || "--";

  return (
    <Layout style={{ background: "transparent", padding: 16 }}>
      <Content>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* 🔹 top filter toolbar */}
          <Toolbar
            range={range}
            setRange={setRange}
            onReset={() => {
              setRange([dayjs("2025-07-10"), dayjs("2025-10-10")]);
              setFilter("");
              setCurrent(1);
            }}
            filter={filter}
            setFilter={setFilter}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />

          {/* 🔹 table */}
          <Table
            style={{
              border: "1px solid #e5e7eb",
              borderTop: 0,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
            columns={columns}
            dataSource={data}
            pagination={false}
            size="middle"
            rowKey="key"
          />

          {/* 🔹 pagination summary */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 12px",
              border: "1px solid #e5e7eb",
              borderTop: 0,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              marginBottom: 24,
            }}
          >
            <Text type="secondary">
              Showing {Math.min((current - 1) * pageSize + 1, data.length)} to{" "}
              {Math.min(current * pageSize, data.length)} of {data.length} entries
            </Text>
            <Pagination
              current={current}
              pageSize={pageSize}
              total={data.length}
              onChange={(p) => setCurrent(p)}
              showSizeChanger={false}
            />
          </div>

          {/* 🔹 VIEW / EDIT drawer (উপর থেকে আসবে) */}
          <Drawer
            title={
              drawerMode === "view"
                ? "View Stuffing Plan"
                : "Edit Stuffing Plan"
            }
            open={drawerOpen}
            placement="top" // 👈 upor theke
            height="90vh"
            onClose={() => setDrawerOpen(false)}
            destroyOnClose
          >
            {selectedRecord && (
              <AddShippingPlan
                mode={drawerMode}
                initialValues={selectedRecord}
                onSubmit={(values) => {
                  console.log("update payload:", values);
                  // edit mode e ekhane axios.put / Inertia.put call korba
                  setDrawerOpen(false);
                }}
              />
            )}
          </Drawer>

          {/* 🔴 DELETE MODAL (same size) */}
          <Modal
            open={deleteModalOpen}
            onCancel={() => setDeleteModalOpen(false)}
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
                  Delete this stuffing plan?
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  This action cannot be undone. The selected stuffing plan and
                  its container information will be permanently removed.
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
                onClick={() => setDeleteModalOpen(false)}
                className="border-gray-200"
              >
                Cancel
              </Button>
              <Button type="primary" danger onClick={handleConfirmDelete}>
                Yes, delete it
              </Button>
            </div>
          </Modal>

          {/* 🟢 COPY MODAL (same size) */}
          <Modal
            open={copyModalOpen}
            onCancel={() => setCopyModalOpen(false)}
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
                  Copy this stuffing plan
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  A new stuffing plan will be created with the same details and
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
                    This will be the reference for the copied stuffing plan.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button
                onClick={() => setCopyModalOpen(false)}
                className="border-gray-200"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                className="bg-cyan-500 hover:bg-cyan-600 border-none"
                disabled={!copyRef}
                onClick={handleConfirmCopy}
              >
                Create copy
              </Button>
            </div>
          </Modal>
        </div>
      </Content>
    </Layout>
  );
}
