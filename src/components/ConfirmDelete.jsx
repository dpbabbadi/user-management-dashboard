export default function ConfirmDelete({ open, user, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onCancel}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Confirm Delete</h3>
          <button className="btn ghost" onClick={onCancel}>✕</button>
        </div>

        <div className="modal-body">
          <p>
            Are you sure you want to delete{" "}
            <b>{user?.firstName} {user?.lastName}</b>?
          </p>
          <p className="muted">This action cannot be undone (in your local UI).</p>
        </div>

        <div className="modal-footer">
          <button className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}