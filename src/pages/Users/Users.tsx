import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/users/useUsers';
import { Link } from 'react-router-dom';
import { useDeleteUser } from '../../hooks/users/useDeleteUser';

const Users = () => {
  const navigate = useNavigate();

  const { users, error: errorAtGet } = useUsers();

  const { deleteUser } = useDeleteUser();

  // 📌 Error modal
  if (errorAtGet) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Ocurrió un error</h2>
          <p>{errorAtGet.message}</p>
          <button onClick={() => window.location.reload()} className="btn btn--submit">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <header className="product-list__header">
        <h1 className="product-list__title">USUARIOS</h1>
        <button className="btn btn--submit" onClick={() => navigate('nuevo')}>
          <MdAdd className="product-list__add-icon" />
          Agregar nuevo
        </button>
      </header>

      <div className="table-container">
        <table className="table">
          <thead className="table__head">
            <tr>
              <th className="table__header">Nombre</th>
              <th className="table__header">Rol</th>
              <th className="table__header">Fecha de registro</th>
              <th className="table__header">Acciones</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {users.map(user => (
              <tr key={user.userId} className="table__row">
                <td className="table__cell table__cell--name">{`${user.name} ${user.lastname}`}</td>
                <td className="table__cell">{user.role}</td>
                <td className="table__cell">
                  {new Date(user.createdAt).toLocaleDateString('es-MX')}
                </td>
                <td className="table__cell">
                  <div className="table__actions">
                    <Link
                      to={`${user.userId}/editar`}
                      className="table__action-btn table__action-btn--edit"
                    >
                      <MdEdit />
                    </Link>
                    <button
                      className="table__action-btn table__action-btn--delete"
                      onClick={() => deleteUser(user.userId)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 👇 Aquí se montará el modal cuando la ruta sea /productos/nuevo o /productos/:id/editar */}
      <Outlet />
    </div>
  );
};

export default Users;
