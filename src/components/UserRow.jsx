export default function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr>
      <td className="mono">{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.department}</td>
      <td className="actions">
        <button className="btn small" onClick={() => onEdit(user)}>Edit</button>
        <button className="btn small danger" onClick={() => onDelete(user)}>Delete</button>
      </td>
    </tr>
  );
}