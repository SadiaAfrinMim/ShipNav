// File: SystemPrefixList.jsx
import React, { useState, useMemo } from "react";

const mockData = [
  { id: 1, module: "Receive Voucher", prefix: "RV#", type: "Auto", start: 1, inc: 1 },
  { id: 2, module: "Purchase Return", prefix: "DN#", type: "Auto", start: 1, inc: 1 },
  { id: 3, module: "Export Sea Credit Note", prefix: "ESCN#", type: "Auto", start: 1, inc: 1 },
  { id: 4, module: "Payment Journal", prefix: "PJ#", type: "Auto", start: 1, inc: 1 },
  { id: 5, module: "Contra Voucher", prefix: "CV#", type: "Auto", start: 1, inc: 1 },
  { id: 6, module: "Journal Voucher", prefix: "JV#", type: "Auto", start: 1, inc: 1 },
  { id: 7, module: "Supplier Payment", prefix: "PPV#", type: "Auto", start: 1, inc: 1 },
  { id: 8, module: "Customer Receipt", prefix: "SRV#", type: "Auto", start: 1, inc: 1 },
  { id: 9, module: "Receive Journal", prefix: "RJ#", type: "Auto", start: 1, inc: 1 },
  { id: 10, module: "Sales Return", prefix: "CN#", type: "Auto", start: 1, inc: 1 }
];

const SystemPrefixList = () => {
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(null);

  const filtered = useMemo(() => {
    if (!search) return mockData;
    const q = search.toLowerCase();
    return mockData.filter((r) =>
      Object.values(r).join(" ").toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-7xl rounded-lg bg-white shadow-sm overflow-hidden">

       

        {/* Filter Row */}
        <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-3 md:flex-row md:items-center md:justify-between">

          {/* Filter box */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-700">Filter:</span>
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Type to filter..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-56 rounded border border-slate-300 py-1.5 pl-7 pr-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Show dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-700">Show:</span>
            <select className="h-8 w-20 rounded border border-slate-300 bg-white px-2 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="border-b px-3 py-2.5">S/L No.</th>
                <th className="border-b px-3 py-2.5">Module</th>
                <th className="border-b px-3 py-2.5">Prefix</th>
                <th className="border-b px-3 py-2.5">Type</th>
                <th className="border-b px-3 py-2.5">Start</th>
                <th className="border-b px-3 py-2.5">Increment</th>
                <th className="border-b px-3 py-2.5 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((row, idx) => (
                <tr
                  key={row.id}
                  className="border-b last:border-b-0 hover:bg-slate-50"
                >
                  <td className="px-3 py-2">{idx + 1}</td>
                  <td className="px-3 py-2">{row.module}</td>
                  <td className="px-3 py-2">{row.prefix}</td>
                  <td className="px-3 py-2">{row.type}</td>
                  <td className="px-3 py-2">{row.start}</td>
                  <td className="px-3 py-2">{row.inc}</td>

                  {/* Action Menu */}
                  <td className="px-3 py-2 text-center relative">
                    <button
                      className="rounded bg-slate-100 px-2 py-1 text-xl hover:bg-slate-200"
                      onClick={() =>
                        setShowMenu(showMenu === row.id ? null : row.id)
                      }
                    >
                      ☰
                    </button>

                    {/* Dropdown Menu */}
                    {showMenu === row.id && (
                      <div className="absolute right-0 top-7 w-32 rounded border bg-white shadow-md z-20">
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100">
                          ✏️ Edit
                        </button>
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100">
                          📄 Details
                        </button>
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-slate-100">
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between border-t border-cyan-500 bg-white px-4 py-2 text-xs text-slate-600">
          <span>Showing 1 to 10 of 55 entries</span>

          <div className="flex items-center gap-1 text-base">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                className={`h-6 w-6 rounded border text-sm ${
                  n === 1
                    ? "bg-cyan-600 text-white"
                    : "border-slate-300 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemPrefixList;
