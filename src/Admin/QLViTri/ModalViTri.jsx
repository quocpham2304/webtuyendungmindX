import { Button, Select, Modal, Form, Input, InputNumber } from "antd";
import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { apiConstants } from "../../Const/api";
import axios from "axios";

const { Option, OptGroup } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: "${label} không được để trống!",
};

function ModalViTri({ onSuccess }) {
  const stateVitri = {
    ma_vi_tri: "",
    ten_vi_tri: "",
    mo_ta: "",
  };
  const stateModal = {
    ModalText: "",
    visible: false,
    confirmLoading: false,
  };
  const location = useLocation();
  const [inputs, setInputs] = useState(stateVitri);
  const [Modals, setModals] = useState(stateModal);
  const { ma_vi_tri, mo_ta, ten_vi_tri } = inputs;
  const { ModalText, visible, confirmLoading } = Modals;
  const [form] = Form.useForm();

  const showModal = () => {
    setModals({
      visible: true,
    });
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    form.resetFields();
    setModals({
      visible: false,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    // console.log(inputs);
  };
  // const handleChangeOption = (value) => {
  //   // console.log(value);
  //   setInputs((inputs) => ({ ...inputs, maLoaiNguoiDung: value }));
  // };
  const handleSubmit = (value) => {
    axios.post(apiConstants.TAO_VI_TRI, value).then(() => {
      onSuccess && onSuccess();
      setModals({
        visible: false,
        confirmLoading: false,
      });
    });

    console.log("Thêm vị trí : ", value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} size="small">
        Thêm vị trí
      </Button>
      <Modal
        title="Thêm vị trí"
        visible={visible}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="ma_vi_tri"
            value={ma_vi_tri}
            initialValue=""
            label="Mã vị trí"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ten_vi_tri"
            value={ten_vi_tri}
            initialValue=""
            label="Tên vị trí"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mo_ta"
            value={mo_ta}
            initialValue=""
            label="Mô tả"
            //rules={[{ type: "email" }, { required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalViTri;
