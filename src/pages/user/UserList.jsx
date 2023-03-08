import React, { useState } from "react";
import "./user.css";
import { Table, Button, Popconfirm, message, Input, Form, Space, Modal } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const UserList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState([]);
  const [form] = Form.useForm();

  const handleSave = (values) => {
    const newText = {
      id: uuidv4(),
      ad: values.ad,
      soyad: values.soyad,
    };

    setText([...text, newText]);
    setModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (id) => {
    setText(text.filter((txt) => txt.id !== id));
    message.success('Metin silindi.');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ad',
      dataIndex: 'ad',
      key: 'ad',
    },
    {
      title: 'Soyad',
      dataIndex: 'soyad',
      key: 'soyad',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (remove) => (
        <Space size="middle">
          <Popconfirm
            title="Bu metni silmek istediğinizden emin misiniz?"
            onConfirm={() => handleDelete(remove.id) }
          >
            <Button >Sil</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 16  }}>
      <Button type="primary" onClick={() => setModalVisible(true) } style={{ marginBottom: 16 }}>
        Kullanıcı Ekle
      </Button>

      <Modal
        title="Kullanıcı Ekleme Sayfası"
        open={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} onFinish={handleSave}>
          <Form.Item label="Ad" name="ad" >
            <Input />
          </Form.Item>
          <Form.Item label="Soyad" name="soyad" >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Table dataSource={text} columns={columns} style={{ marginTop: 16 }}/>
    </div>
  );
}

export default UserList;
