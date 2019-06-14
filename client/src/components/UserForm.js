import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserForm({ addUser, editingUser }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    givenName: '',
    familyName: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUser(editingUser);
  }, [editingUser]);

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // function validateForm() {
  //   const tempErrors = {};
  //   if (post.title.trim() === '') {
  //     tempErrors.title = 'Title must not be empty';
  //   }
  //   if (post.body.trim() === '') {
  //     tempErrors.body = 'Body must not be empty';
  //   }

  //   if (Object.keys(tempErrors).length > 0) {
  //     setErrors(tempErrors);
  //     return false;
  //   }
  //   return true;
  // }

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Reset errors
    setErrors({});

    if (user.id) {
      // Editing
      axios
        .put(`/users/${user._id}`, user)
        .then((res) => {
          addUser(res.data);
          setUser({ givenName: '', familyName: '', email: '' });
          setLoading(false);
        })
        .catch((err) => console.error(err));
    } else {
      // Posting
      axios
        .post('/users', user)
        .then((res) => {
          addUser(res.data);
          setUser({ givenName: '', familyName: '', email: '' });
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      {!loading ? (
        <form className="push-in" onSubmit={onSubmit}>
          <div className="input-field">
            <label htmlFor="givenName">Given Name</label>
            <input
              type="text"
              name="givenName"
              value={user.givenName}
              onChange={onChange}
              className={errors.givenName && 'invalid'}
            />
            <span className="helper-text">{errors.givenName}</span>
          </div>
          <div className="input-field">
            <label htmlFor="familyName">Family Name</label>
            <input
              type="text"
              name="familyName"
              value={user.familyName}
              onChange={onChange}
              className={errors.familyName && 'invalid'}
            />
            <span className="helper-text">{errors.familyName}</span>
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={onChange}
              className={errors.email && 'invalid'}
            />
            <span className="helper-text">{errors.email}</span>
          </div>
          <button type="submit" className="waves-effect waves-light btn">
            {user.id ? 'Update' : 'Add'}
          </button>
        </form>
      ) : (
        <div className="progress">
          <div className="indeterminate" />
        </div>
      )}
    </>
  );
}

export default UserForm;
