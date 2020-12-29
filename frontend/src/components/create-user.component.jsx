import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
  const [user, setUser] = useState('');

  const handleChangeUser = (e) => {
    setUser(e.target.value);
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const newUser = {
        username: user,
      };
      const res_user = await axios.post(
        'http://localhost:5000/users/addUser',
        newUser
      );
      console.log(res_user);
      setUser('');
    } catch (e) {
      console.log('Hmmm, you messed up!', e);
    }
  };
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            className="form-control"
            required
            id="username"
            value={user}
            onChange={handleChangeUser}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
