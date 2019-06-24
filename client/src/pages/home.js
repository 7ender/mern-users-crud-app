import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import UserForm from '../components/UserForm';

function Home() {
  const [users, setUsers] = useState([]);

  const [editingUser, setEditingUser] = useState({
    givenName: '',
    familyName: '',
    email: '',
    id: null
  });

  useEffect(() => {
    axios
      .get('/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  function editUser(user) {
    setEditingUser(user);
  }

  function deleteUser(id) {
    if (window.confirm('Are you sure? You cannot revert this action')) {
      axios.delete(`/users/${id}`).then(() => {
        const usersUpdated = users.filter((user) => user.id !== id);
        setUsers(usersUpdated);
      });
    }
  }

  function addUser(user) {
    if (users.find((u) => u.id === user.id)) {
      const index = users.findIndex((u) => u.id === user.id);
      const usersUpdated = [...users];
      usersUpdated.splice(index, 1, user);
      setUsers(usersUpdated);
    } else {
      const usersUpdated = [user, ...users];
      setUsers(usersUpdated);
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col s12 m6">
          <UserForm addUser={addUser} editingUser={editingUser} />
        </div>
      </div>
      <div className="row">
        {users.map((user) => (
          <div className="col s12 m6" key={user.id}>
            <div className="card">
              <div className="card-content">
                <div className="card-title">
                  {user.givenName} {user.familyName}
                </div>
                <p className="timestamp">
                  {dayjs(user.created).format('MMM DD YYYY HH:mm')}
                </p>
                <p>{user.email}</p>
              </div>
              <div className="card-action">
                <a href="#" onClick={editUser.bind(null, user)}>
                  Edit
                </a>
                <a
                  href="#"
                  onClick={deleteUser.bind(null, user.id)}
                  className="delete-btn"
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
