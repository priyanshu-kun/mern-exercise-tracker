import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
const initialState = {
  username: '',
  description: '',
  duration: '',
  date: new Date(),
  users: [],
};

function CreateExercise() {
  const [exercise, setExercise] = useState(initialState);

  useEffect(() => {
    (async () => {
      try {
        const res_user = await axios.get('http://localhost:5000/users/');
        if (res_user.data.length > 0) {
          setExercise({
            users: res_user.data.map((user) => user.username),
            username: res_user.data[0].username,
          });
        }
      } catch (e) {
        console.log('Let be honest again you messed up!', e);
      }
    })();
  }, []);

  const handleAllChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    console.log(date);
    setExercise({ ...exercise, date: date });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const newExercise = {
        username: exercise.username,
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date,
      };
      const res_exercise = await axios.post(
        'http://localhost:5000/exercises/addExercise',
        newExercise
      );
      console.log(res_exercise.data);
      window.location = '/';
    } catch (e) {
      console.log('Ok, server messed up!', e);
    }
  };

  return (
    <div>
      <h1>Create New Exercise Log</h1>
      <form onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label htmlFor="select">Username: </label>
          <select
            // ref="userInput"
            id="select"
            required
            className="form-control"
            value={exercise.username}
            name="username"
            onChange={handleAllChange}
          >
            {exercise.users &&
              exercise.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            required
            id="description"
            className="form-control"
            value={exercise.description}
            name="description"
            onChange={handleAllChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (in minutes): </label>
          <input
            type="text"
            // required
            id="duration"
            className="form-control"
            value={exercise.duration}
            name="duration"
            onChange={handleAllChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date-picker">Date: </label>
          <div>
            <DatePicker
              id="date-picker"
              selected={exercise.date}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateExercise;
