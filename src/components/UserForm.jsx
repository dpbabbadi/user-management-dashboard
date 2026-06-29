import { useEffect, useMemo, useState } from "react";
import { DEPARTMENTS } from "../utils/constants";
import { validateUser } from "../utils/validators";

const empty = { firstName: "", lastName: "", email: "", department: "IT" };

export default function UserForm({ open, mode, initialUser, onClose, onSubmit }) {
  const isEdit = mode === "edit";

  const initialValues = useMemo(() => {
    if (isEdit && initialUser) return { ...initialUser };
    return { ...empty };
  }, [isEdit, initialUser]);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues, open]);

  if (!open) return null;

  function handleChange(key, v) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const vErrors = validateUser(values);
    setErrors(vErrors);
    if (Object.keys(vErrors).length) return;

    const ok = await onSubmit(values);
    if (ok) onClose();
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEdit ? "Edit User" : "Add User"}</h3>
          <button className="btn ghost" onClick={onClose}>✕</button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="grid-2">
            <label className="field">
              <span>First Name</span>
              <input
                className={`input ${errors.firstName ? "invalid" : ""}`}
                value={values.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              {errors.firstName && <small className="error">{errors.firstName}</small>}
            </label>

            <label className="field">
              <span>Last Name</span>
              <input
                className={`input ${errors.lastName ? "invalid" : ""}`}
                value={values.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
              {errors.lastName && <small className="error">{errors.lastName}</small>}
            </label>

            <label className="field">
              <span>Email</span>
              <input
                className={`input ${errors.email ? "invalid" : ""}`}
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && <small className="error">{errors.email}</small>}
            </label>

            <label className="field">
              <span>Department</span>
              <select
                className={`input ${errors.department ? "invalid" : ""}`}
                value={values.department}
                onChange={(e) => handleChange("department", e.target.value)}
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {errors.department && <small className="error">{errors.department}</small>}
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              {isEdit ? "Save Changes" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}