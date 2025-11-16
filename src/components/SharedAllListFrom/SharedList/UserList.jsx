// File: UserList.jsx
import React, { useMemo, useState } from "react";

const mockUsers = [
  {
    id: 1,
    fullName: "TENSE GROUP",
    phone: "01771503504",
    username: "master@tensegroup.com",
    email: "master@tensegroup.com",
    dataType: "All Data",
    prepared: "Yes",
    checked: "Yes",
    approved: "Yes",
    group: "Master",
  },
  {
    id: 2,
    fullName: "Abir Hossain",
    phone: "01771503504",
    username: "abir@n2nscs.com",
    email: "abir@n2nscs.com",
    dataType: "All Data",
    prepared: "No",
    checked: "No",
    approved: "No",
    group: "Master",
  },
  {
    id: 3,
    fullName: "N2N Supply Chain Solutions Ltd.",
    phone: "+880 1989-151353",
    username: "admin@n2nscs.com",
    email: "admin@n2nscs.com",
    dataType: "All Data",
    prepared: "Yes",
    checked: "Yes",
    approved: "Yes",
    group: "Master",
  },
];

const UserList = () => {
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(null);

  const filtered = useMemo(() => {
    if (!search) return mockUsers;
    const q = search.toLowerCase();
    return mockUsers.filter((u) =>
      Object.values(u).join(" ").toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-50 ">
      <div className="mx-auto max-w-7xl rounded-lg bg-white shadow-sm overflow-hidden">

       

        {/* Filter Row */}
        <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-3 md:flex-row md:items-center md:justify-between">

          {/* Search */}
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

          {/* Show */}
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
          <table className="min-w-[1100px] w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="border-b px-3 py-2.5 w-16">S/L No.</th>
                <th className="border-b px-3 py-2.5">Full Name</th>
                <th className="border-b px-3 py-2.5">Phone</th>
                <th className="border-b px-3 py-2.5">Username</th>
                <th className="border-b px-3 py-2.5">Email</th>
                <th className="border-b px-3 py-2.5">All Data/Self Data</th>
                <th className="border-b px-3 py-2.5">Prepared By</th>
                <th className="border-b px-3 py-2.5">Checked By</th>
                <th className="border-b px-3 py-2.5">Approved By</th>
                <th className="border-b px-3 py-2.5">Group</th>
                <th className="border-b px-3 py-2.5 text-center w-16">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u, idx) => (
                <tr
                  key={u.id}
                  className="border-b last:border-b-0 hover:bg-slate-50"
                >
                  <td className="px-3 py-2">{idx + 1}</td>
                  <td className="px-3 py-2 whitespace-pre-line">{u.fullName}</td>
                  <td className="px-3 py-2">{u.phone}</td>
                  <td className="px-3 py-2">{u.username}</td>
                  <td className="px-3 py-2">{u.email}</td>
                  <td className="px-3 py-2">{u.dataType}</td>
                  <td className="px-3 py-2">{u.prepared}</td>
                  <td className="px-3 py-2">{u.checked}</td>
                  <td className="px-3 py-2">{u.approved}</td>
                  <td className="px-3 py-2">{u.group}</td>

                  {/* Action */}
                  <td className="px-3 py-2 text-center relative">
                    <button
                      className="rounded bg-slate-100 px-2 py-1 text-xl hover:bg-slate-200"
                      onClick={() =>
                        setShowMenu(showMenu === u.id ? null : u.id)
                      }
                    >
                      ☰
                    </button>

                    {showMenu === u.id && (
                      <div className="absolute right-0 top-7 w-32 rounded border bg-white shadow-md z-20">
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100">
                          ✏️ Edit
                        </button>
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100">
                          👁️ Details
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

        {/* Footer Row */}
        <div className="flex items-center justify-between border-t border-cyan-500 bg-white px-4 py-2 text-xs text-slate-600">
          <span>Showing {filtered.length} of {filtered.length} entries</span>

          <div className="flex items-center gap-1 text-base">
            <button className="h-6 w-6 rounded border border-slate-300 hover:bg-slate-100">
              ←
            </button>
            <button className="h-6 w-6 rounded border bg-cyan-600 text-white">
              1
            </button>
            <button className="h-6 w-6 rounded border border-slate-300 hover:bg-slate-100">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
