import { useEffect, useMemo, useState } from "react";
import * as api from "../api/userService";
import { normalizeUser } from "../utils/helpers";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
      const res = await api.getUsers();
      const mapped = (res.data || []).map(normalizeUser);
      setUsers(mapped);
    } catch (e) {
      setError("Failed to load users. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // CRUD methods (API call + local state update)
  async function addUser(user) {
    setError("");
    try {
      const payload = {
        name: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email,
      };

      const res = await api.createUser(payload);

      // JSONPlaceholder returns an object with id (often 11). Ensure unique local id.
      const maxId = users.reduce((m, u) => Math.max(m, u.id), 0);
      const newId = Math.max(res?.data?.id || 0, maxId + 1);

      const created = { ...user, id: newId };
      setUsers((prev) => [created, ...prev]);
      return { ok: true };
    } catch (e) {
      setError("Could not add user. Please try again.");
      return { ok: false };
    }
  }

 async function editUser(id, user) {
  setError("");

  // 1) Always update UI immediately (local state)
  setUsers((prev) => prev.map((u) => (u.id === id ? { ...user, id } : u)));

  // 2) Try API call (best-effort)
  try {
    const payload = {
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
    };

    await api.updateUser(id, payload);
    return { ok: true };
  } catch (e) {
    // API failed, but UI is already updated
    setError("");
    return { ok: true }; // keep modal closing
  }
}

  async function removeUser(id) {
    setError("");
    try {
      await api.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      return { ok: true };
    } catch (e) {
      setError("Could not delete user. Please try again.");
      return { ok: false };
    }
  }

  const apiObj = useMemo(
    () => ({
      users,
      setUsers,
      loading,
      error,
      refetch: fetchUsers,
      addUser,
      editUser,
      removeUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [users, loading, error]
  );

  return apiObj;
}