import { Button, Select, Modal, Form, Input, InputNumber } from "antd";
import React, { useState, useEffect, Fragment } from "react";
import { apiConstants } from "../../Const/api";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: "${label} không được để trống!",
};
const stateVitri = {
  ma_vi_tri: "",
  ten_vi_tri: "",
  mo_ta: "",
};
const stateModal = {
  ModalText: "Content of the modal",
  visible: false,
  confirmLoading: false,
};

function SuaViTri(props) {
  const [loading, setLoading] = useState(props.loading);
  const [inputs, setInputs] = useState(stateVitri);
  const [Modals, setModals] = useState(stateModal);

  const { ma_vi_tri, ten_vi_tri, mo_ta } = inputs;
  const { ModalText, visible, confirmLoading } = Modals;

  const [form] = Form.useForm();

  useEffect(() => {
    setInputs({
      ...inputs,
      ma_vi_tri: props.MaViTri,
      ten_vi_tri: props.TenViTri,
      mo_ta: props.MoTa,
    });
    // console.log(inputs);
  }, [visible]);
  const showModal = () => {
    setModals({
      visible: true,
    });
  };

  const handleCancel = () => {
    setModals({
      visible: false,
    });
    // form.resetFields();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    //console.log(inputs);
  };

  const handleSubmit = () => {
    console.log(inputs);

    axios
      .put(apiConstants.CAP_NHAT_VI_TRI, { id: props.Id, data: inputs })
      .then((response) => {
        setInputs({ updatedAt: response.data.updatedAt });
      })
      .finally(props.updateFunction());

    // setLoading(true);
    // setModals({
    //   // ModalText: 'The modal will be closed after two seconds',
    //   confirmLoading: true,
    // });
    setModals({
      visible: false,
      confirmLoading: false,
    });
    // window.location.reload();
  };

  return (
    <>
      <Button type="default" onClick={showModal} size="small">
        Sửa
      </Button>
      <Modal
        title="Thêm người dùng"
        visible={visible}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onExit={props.reload}
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item label="Mã vị trí" rules={[{ required: true }]}>
            <Input name="ma_vi_tri" value={ma_vi_tri} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Tên vị trí" rules={[{ required: true }]}>
            <Input
              name="ten_vi_tri"
              value={ten_vi_tri}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Mô tả">
            <Input name="mo_ta" value={mo_ta} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default SuaViTri;
