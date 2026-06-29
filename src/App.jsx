import { useMemo, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterPopup from "./components/FilterPopup";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import UserForm from "./components/UserForm";
import ConfirmDelete from "./components/ConfirmDelete";
import { useUsers } from "./hooks/useUsers";

import "./styles/app.css";
import "./styles/table.css";
import "./styles/modal.css";

export default function App() {
  const { users, loading, error, addUser, editUser, removeUser } = useUsers();

  // Search + filters
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  // Sorting
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modals
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); // add | edit
  const [selectedUser, setSelectedUser] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);

  function clearAll() {
    setSearch("");
    setFilters({ firstName: "", lastName: "", email: "", department: "" });
    setPage(1);
  }

  function handleSort(field) {
    setPage(1);
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }

  const processed = useMemo(() => {
    const q = search.trim().toLowerCase();

    // Search
    let list = users.filter((u) => {
      if (!q) return true;
      return (
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    });

    // Filter popup fields
    const fFirst = filters.firstName.trim().toLowerCase();
    const fLast = filters.lastName.trim().toLowerCase();
    const fEmail = filters.email.trim().toLowerCase();
    const fDept = filters.department;

    list = list.filter((u) => {
      if (fFirst && !u.firstName.toLowerCase().includes(fFirst)) return false;
      if (fLast && !u.lastName.toLowerCase().includes(fLast)) return false;
      if (fEmail && !u.email.toLowerCase().includes(fEmail)) return false;
      if (fDept && u.department !== fDept) return false;
      return true;
    });

    // Sorting (lexicographical; numbers supported)
    const sorted = [...list].sort((a, b) => {
      const A = a[sortField];
      const B = b[sortField];

      if (typeof A === "number" && typeof B === "number") {
        return sortOrder === "asc" ? A - B : B - A;
      }
      const aStr = (A ?? "").toString().toLowerCase();
      const bStr = (B ?? "").toString().toLowerCase();
      return sortOrder === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    return sorted;
  }, [users, search, filters, sortField, sortOrder]);

  const total = processed.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount);
  const startIndex = (safePage - 1) * pageSize;
  const visible = processed.slice(startIndex, startIndex + pageSize);

  // Modal actions
  function openAdd() {
    setFormMode("add");
    setSelectedUser(null);
    setFormOpen(true);
  }

  function openEdit(user) {
    setFormMode("edit");
    setSelectedUser(user);
    setFormOpen(true);
  }

  function openDelete(user) {
    setDeleteUser(user);
    setDeleteOpen(true);
  }

  async function submitForm(values) {
    if (formMode === "add") {
      const res = await addUser(values);
      return res.ok;
    } else {
      const res = await editUser(selectedUser.id, values);
      return res.ok;
    }
  }

  async function confirmDelete() {
    if (!deleteUser) return;
    await removeUser(deleteUser.id);
    setDeleteOpen(false);
    setDeleteUser(null);
  }

  return (
    <div className="container">
      <Header onAdd={openAdd} />

      <SearchBar
        value={search}
        onChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        onOpenFilters={() => setFiltersOpen(true)}
        onClear={clearAll}
      />

      <FilterPopup
        open={filtersOpen}
        value={filters}
        onChange={setFilters}
        onReset={() => setFilters({ firstName: "", lastName: "", email: "", department: "" })}
        onClose={() => setFiltersOpen(false)}
        onApply={() => {
          setFiltersOpen(false);
          setPage(1);
        }}
      />

      {error && <div className="alert">{error}</div>}

      {loading ? (
        <div className="card">Loading users…</div>
      ) : (
        <>
          <UserTable
            users={visible}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            onEdit={openEdit}
            onDelete={openDelete}
          />

          <Pagination
            total={total}
            page={safePage}
            pageSize={pageSize}
            onPageChange={(p) => setPage(p)}
            onPageSizeChange={(s) => {
              setPageSize(s);
              setPage(1);
            }}
          />
        </>
      )}

      <UserForm
        open={formOpen}
        mode={formMode}
        initialUser={selectedUser}
        onClose={() => setFormOpen(false)}
        onSubmit={submitForm}
      />

      <ConfirmDelete
        open={deleteOpen}
        user={deleteUser}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}