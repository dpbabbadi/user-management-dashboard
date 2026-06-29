export default function Header({ onAdd }) {
  return (
    <header className="header">
      <div>
        <h1 className="title">User Management Dashboard</h1>
        <p className="subtitle">CRUD + Search + Filter + Sort + Pagination</p>
      </div>
      <button className="btn primary" onClick={onAdd}>
        + Add User
      </button>
    </header>
  );
}