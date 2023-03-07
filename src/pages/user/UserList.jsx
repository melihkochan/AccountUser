import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import "./user.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uid, setUid] = useState(1);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleAddUser = () => {
    const newUser = {
      uid: uid,
      name: name,
      surname: surname,
    };
    setUsers([...users, newUser]);
    setName("");
    setSurname("");
    setUid(uid + 1);
    setIsModalOpen(false);
  };

  const handleRemoveUser = (index) => {
    const newUsers = users.filter((user, uid) => uid !== index);
    setUsers(newUsers);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <Button onClick={() => showModal(true)}>Ekle</Button>
      <div>
        <Modal
          title="Ekleme Sayfası"
          open={isModalOpen}
          onOk={handleAddUser}
          onCancel={handleCancel}
        >
          <div>
            <label>Ad:</label>
            <Input type="text" value={name} onChange={handleNameChange} />
          </div>
          <div>
            <label>Soy Ad:</label>
            <Input type="text" value={surname} onChange={handleSurnameChange} />
          </div>
        </Modal>
      </div>

      <table id="customers" style={{ marginTop: "30px" }}>
        <thead>
          <tr>
            <th>id</th>
            <th>Ad</th>
            <th>Soy Ad</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody >
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.uid}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>
                <Button onClick={() => handleRemoveUser(index)}>Kaldır</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
