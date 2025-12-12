// HeaderList.jsx
import React, { useMemo, useState } from "react";
import AddHeaderTemplateModal from "../Modal/AddHeaderTemplateModal"; // ✅ path adjust করো

const mockData = [
  {
    id: 1,
    name: "Default Blank",
    header: "",
    footer: "",
    orientation: 1,
    margin: "0.5/0.5/0.5/0.5",
    spacing: "0/0",
    pageSize: 1,
    pageWH: "8.27/11.69",
    isDefault: false,
  },
  {
    id: 2,
    name: "N2N SUPPLY\nCHAIN\nSOLUTIONS\nLIMITED",
    header: "N2N SUPPLY CHAIN SOLUTIONS LTD.",
    footer: "",
    orientation: 1,
    margin: "0.5/0.5/0.5/0.5",
    spacing: "0/0",
    pageSize: 1,
    pageWH: "8.27/11.69",
    isDefault: true,
  },
];

const HeaderList = () => {
  const [data, setData] = useState(mockData);        // 🔹 এখন state
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const [openModal, setOpenModal] = useState(false); // 🔹 modal state
  const [editingRow, setEditingRow] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(q)
    );
  }, [search, data]);

  const handleEdit = (row) => {
    setEditingRow(row);
    setOpenModal(true);
  };

  const handleDelete = (row) => {
    if (window.confirm(`Delete "${row.name}"?`)) {
      setData((prev) => prev.filter((item) => item.id !== row.id));
    }
  };

  const handleModalCancel = () => {
    setOpenModal(false);
    setEditingRow(null);
    setConfirmLoading(false);
  };

  const handleModalSubmit = async (values) => {
    try {
      setConfirmLoading(true);

      if (editingRow) {
        // orientation, pageWH ইত্যাদি map করছি
        const updated = {
          ...editingRow,
          name: values.name,
          header: values.header,
          footer: values.footer,
          orientation: values.orientation === "landscape" ? 2 : 1,
          margin: values.margin,
          spacing: values.hfSpacing,
          pageSize: values.pageSize === "A4" ? 1 : values.pageSize,
          pageWH: `${values.widthIn || ""}/${values.heightIn || ""}`,
          isDefault: values.isDefault,
        };

        setData((prev) =>
          prev.map((item) => (item.id === editingRow.id ? updated : item))
        );
      }
      // চাইলে এখানে new add logic ও দিতে পারো

      setOpenModal(false);
      setEditingRow(null);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="mx-auto  rounded-lg bg-white shadow-sm overflow-hidden">
        {/* Filter + Show row */}
        <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-700">Filter:</span>
            <div className="relative">
              <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Type to filter..."
                className="w-52 rounded border border-slate-300 py-1.5 pl-7 pr-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-700">Show:</span>
            <select
              className="h-8 w-20 rounded border border-slate-300 bg-white px-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="border-b border-slate-200 px-3 py-2.5 w-20">
                  S/L No.
                </th>
                <th className="border-b border-slate-200 px-3 py-2.5 w-44">
                  Name
                </th>
                <th className="border-b border-slate-200 px-3 py-2.5">Header</th>
                <th className="border-b border-slate-200 px-3 py-2.5">Footer</th>
                <th className="border-b border-slate-200 px-3 py-2.5">
                  Orientation
                </th>
                <th className="border-b border-slate-200 px-3 py-2.5">
                  Left/Right/Top/Bottom Margin
                </th>
                <th className="border-b border-slate-200 px-3 py-2.5">
                  Header/Footer Spacing
                </th>
                <th className="border-b border-slate-200 px-3 py-2.5">
                  Page Size
                </th>
                <th className="border-b border-slate-200 px-3 py-2.5">
                  Page Width/Height
                </th>
                <th className="border-b border-slate-200 px-3 py-2.5">
                  Is Default?
                </th>
                <th className="border-b border-slate-200 px-3 py-2.5 w-24 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="px-3 py-6 text-center text-sm text-slate-400"
                  >
                    No data available in table
                  </td>
                </tr>
              ) : (
                filtered.map((row, idx) => (
                  <tr
                    key={row.id}
                    className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-3 py-2 align-top">{idx + 1}</td>
                    <td className="px-3 py-2 align-top whitespace-pre-line">
                      {row.name}
                    </td>
                    <td className="px-3 py-2 align-top">
                      {row.header ? (
                        <div className="rounded border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold leading-snug text-slate-700">
                          {row.header}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2 align-top text-xs text-slate-500">
                      {row.footer || "—"}
                    </td>
                    <td className="px-3 py-2 align-top">{row.orientation}</td>
                    <td className="px-3 py-2 align-top">{row.margin}</td>
                    <td className="px-3 py-2 align-top">{row.spacing}</td>
                    <td className="px-3 py-2 align-top">{row.pageSize}</td>
                    <td className="px-3 py-2 align-top">{row.pageWH}</td>
                    <td className="px-3 py-2 align-top">
                      <span
                        className={
                          row.isDefault
                            ? "rounded bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600"
                            : "rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
                        }
                      >
                        {row.isDefault ? "true" : "false"}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-3 py-2 align-top">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleEdit(row)}
                          className="inline-flex h-7 w-7 items-center justify-center rounded bg-sky-100 text-sky-600 text-xs hover:bg-sky-200"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(row)}
                          className="inline-flex h-7 w-7 items-center justify-center rounded bg-rose-100 text-rose-600 text-xs hover:bg-rose-200"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom info bar */}
        <div className="flex items-center justify-between border-t border-cyan-500 bg-white px-4 py-2 text-xs text-slate-600">
          <span>
            Showing 1 to {filtered.length} of {filtered.length} entries
          </span>
          <div className="flex items-center gap-1 text-base">
            <button className="flex h-6 w-6 items-center justify-center rounded border border-slate-300 text-slate-500 hover:bg-slate-100">
              ←
            </button>
            <button className="flex h-6 w-6 items-center justify-center rounded border border-slate-300 text-slate-500 hover:bg-slate-100">
              →
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Edit Modal */}
      <AddHeaderTemplateModal
        open={openModal}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
        confirmLoading={confirmLoading}
        initialValues={editingRow}
        mode="edit"
      />
    </div>
  );
};

export default HeaderList;
