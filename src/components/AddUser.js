import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AddUser.css";

const AddUser = () => {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    await axios
      .get("http://localhost:4000/posts")
      .then((res) => setData(res.data));
  };
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    money: "",
  });

  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    surname: "",
    money: "",
  });

  const handleFormSubmit = async (e) => {
    let response = await axios.post("http://localhost:4000/posts", formData);
    if (response) {
      alert("Kullanıcı basarili sekilde eklendi.");
    } else {
      alert("Kullanıcı eklenemedi.");
    }
    setFormData({
      name: "",
      surname: "",
      money: "",
    });
    getPost();
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:4000/posts/" + id)
      .then((res) => alert("Silme işlemi başarılı."));
    getPost();
  };

  const handleUpdate = async () => {
    await axios
      .put(`http://localhost:4000/posts/${updateData.id}`, updateData)
      .then((res) => {
        alert("Güncelleme Başarili!");
        getPost();
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div style={{ marginTop: "120px" }}>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Kullanıcı Ekle
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Kullanıcı Ekle
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">İsim Giriniz</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={formData.post}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Soy Ad Giriniz</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={formData.user}
                      onChange={(e) =>
                        setFormData({ ...formData, surname: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Kapat
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleFormSubmit()}
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Listelenen Kullanıcılar */}
      <div style={{ marginTop: "120px" }}>
        <h1>Listelenen Kullanıcılar</h1>
        <table
          className="table table-striped table-hover"
          style={{ marginTop: "30px" }}
        >
          <thead>
            <tr>
              <th>İd</th>
              <th scope="col">Ad</th>
              <th scope="col">Soy Ad</th>
              <th>#</th>
            </tr>
          </thead>

          {/* Actions */}
          <tbody>
            {data &&
              data.map((post) => (
                <tr>
                  <td>{post.id}</td>
                  <td>{post.name}</td>
                  <td>{post.surname}</td>
                  <td style={{ justifyContent: "space-between" }}>
                    <button
                      className="btn btn-info"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal1"
                      onClick={() =>
                        setUpdateData({
                          name: post.name,
                          surname: post.surname,
                          id: post.id,
                        })
                      }
                    >
                      Güncelle
                    </button>
                    <button
                      style={{ marginLeft: "20px" }}
                      className="btn btn-danger"
                      onClick={() => handleDelete(post.id)}
                    >
                      Sil
                    </button>

                    <button
                      style={{ marginLeft: "20px" }}
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      onClick={() =>
                        setUpdateData({
                          name: post.name,
                          surname: post.surname,
                          money: post.money,
                          id: post.id,
                        })
                      }
                    >
                      Detay
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* //Kullanıcı Güncelleme */}
      <div
        class="modal fade"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Kullanıcı Güncelle
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="İsim gir"
                  value={updateData.name}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, name: e.target.value })
                  }
                />

                <input
                  style={{ marginTop: "20px" }}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Soy isim gir"
                  value={updateData.surname}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, surname: e.target.value })
                  }
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Kapat
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleUpdate()}
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* //Detay Güncelleme */}
      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Kullanıcı Bilgileri
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="mb-3">
                <label className="form-label">Ad Giriniz</label>
                <input
                  style={{ marginBottom: "10px" }}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="İsim gir"
                  value={updateData.name}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, name: e.target.value })
                  }
                />
                <label className="form-label">Soy Ad Giriniz</label>
                <input
                  style={{ marginBottom: "10px" }}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Soy Ad girin"
                  value={updateData.surname}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, surname: e.target.value })
                  }
                />
                <label className="form-label">Para Bilgileri</label>
                <input
                  style={{ marginBottom: "10px" }}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Para girin"
                  value={updateData.money}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, money: e.target.value })
                  }
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Kapat
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleUpdate()}
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
