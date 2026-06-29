import UserRow from "./UserRow";

function SortIcon({ active, order }) {
  if (!active) return <span className="sort">⇅</span>;
  return <span className="sort">{order === "asc" ? "↑" : "↓"}</span>;
}

export default function UserTable({
  users,
  sortField,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
}) {
  const headers = [
    { key: "id", label: "ID" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "department", label: "Department" },
  ];

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h.key} onClick={() => onSort(h.key)} role="button">
                <span className="th">
                  {h.label}
                  <SortIcon active={sortField === h.key} order={sortOrder} />
                </span>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty">
                No users match your criteria.
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}