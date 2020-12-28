import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const initialState = {
  username: '',
  description: '',
  duration: '',
  date: '',
  users: [],
};

function CreateExercise() {
  const [exercise, setExercise] = useState(initialState);

  useEffect(() => {
    setExercise({
      users: ['test user'],
      username: 'test user',
    });
  }, []);

  const handleAllChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setExercise({ date });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newExercise = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    };
    console.log(newExercise);
    window.location = '/';
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
            {exercise.users.map((user) => {
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
      </form>
    </div>
  );
}

export default CreateExercise;
