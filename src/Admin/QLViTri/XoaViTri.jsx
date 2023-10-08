import { Button, Select, Modal, Form, Input, InputNumber } from "antd";
import React, { useState, useEffect, Fragment } from "react";
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
const onFinish = (values) => {
  console.log(values);
};

function XoaViTri(props) {
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

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const showModal = () => {
    setVisible(true);
    setModalText(`bạn có chắc muốn xóa vị trí ${props.MaViTri} ?`);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async (MaViTri) => {
    setModalText("đang thực hiện việc xóa vị trí...");
    setConfirmLoading(true);
    const res = await axios.delete(props.MaViTri, apiConstants.XOA_VI_TRI);
  };

  return (
    <>
      {/* <Button type="default" onClick={showModal} danger size="small">
        Xóa
      </Button> */}
      <Modal
        title={`Xóa vị trí`}
        visible={visible}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose
        okText="Lưu"
        cancelText="Hủy"
      >
        {modalText}
      </Modal>
    </>
  );
}

export default XoaViTri;
