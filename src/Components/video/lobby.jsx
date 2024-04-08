import React from 'react';
import './lobby.css'; // Import your CSS file

const Lobby = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const inviteCode = e.target.invite_link.value;
    window.location = `index.html?room=${inviteCode}`;
  };

  return (
    <main id="lobby-container">
      <div id="form-container">
        <div id="form__container__header">
          <p> Create or join my room</p>
        </div>
        <div id="form__content__wrapper">
          <form onSubmit={handleSubmit} id="join-form">
            <input type="text" name="invite_link" id="invite_link" required />
            <input type="submit" value="enter room"/>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Lobby;
