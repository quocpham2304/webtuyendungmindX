import { Checkbox, Form } from "antd";
import "../Question/style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiConstants } from "../Const/api";
import FormItem from "antd/es/form/FormItem";
import { useLocation, useParams } from "react-router";
import { Button, Modal } from 'antd';
import { useSearchParams } from "react-router-dom";
// import { Color } from "@rc-component/color-picker";

function TestQuestion() {
  const [time, setTime] = useState(360);
  const [modalDone, setModalDone] = useState(false)
  const [modalStart, setModalStart] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [start, setStart] = useState(false)
  const [test, setTest] = useState({});
  const [pickAns, setPickAns] = useState(0);
  const { pathname } = useLocation(); //  object de trucstering

  const [form] = Form.useForm();
  const answers = Form.useWatch("answers", form);

  const fetchTest = (id) => {
    console.log(id);
    axios.get(apiConstants.CHI_TIET_BAI_TEST(id)).then((res) => {
      setTest(res.data.data[0]);
      form.setFieldValue("danhSachCauHoi", res.data.data[0].cau_hoi);
    });
  };

  const handleSubmit = () => {
    // let id = pathname.split('/')
    // let myItems;
    // if (answers) {
    //   Object.values(answers)?.forEach((item) => {
    //     if (item?.length > 0) {
    //       myItems = item;
    //     }
    //   });
    //   console.log("itemmy", myItems)
    //   axios
    //     .put(apiConstants.NOP_BAI_TEST, { id: id[2], data: answers })
    //     .then((response) => {
    //       // setInputs({ updatedAt: response.data.updatedAt });
    //     })
    //   // .finally(updateFunction());
    // };
  }

  const handleStart = () => {
    setStart(true);
    console.log(start)
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setStart(true);
  };

  useEffect(() => {
    let cnt = 0;
    if (answers) {
      Object.values(answers)?.forEach((item) => {
        if (item?.length > 0) {
          cnt++;
          console.log("item", item);
          console.log("answer", answers);
        }
      });
      setPickAns(cnt);

    }
  }, [answers]);

  // console.log("answer", answer);


  useEffect(() => {
    let id = pathname.split('/')
    fetchTest(id[2])
    showModal();
    setModalStart(true)
    // console.log("id", id);
  }, [modalStart]);

  useEffect(() => {
    if (time === 0) {
      setModalDone(true)
      return;
    };
    const interval = start === true && setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    console.log(modalDone)
    return () => clearInterval(interval);
  }, [time, start, modalDone]);

  return (
    <Form form={form}>
      <Modal title="Hết giờ làm bài !" closable={false} open={modalDone} footer={null} >

      </Modal>

      <Modal title="Bắt đầu làm bài kiểm tra !" open={isModalOpen} closable={false} onOk={handleOk}>
        Chọn OK để bắt đầu làm bài, bài làm sẽ tự động nộp khi hết thời gian làm test và chỉ được làm test 1 lần duy nhất.

      </Modal>
      {/* <Button onClick={handleStart}>bắt đầu làm bài kiểm tra</Button> */}
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>{test.ten_bai_test}</h1>
          </div>
        </div>
        <div className="notification">

          {/* <p>Time Left :
            <span className="info">{Math.round({ time } / 3600)} giờ </span>
            <span className="info">{Math.round({ time } / 60)} phút </span>
            <span className="info">{time} giây </span>
          </p> */}
          <p>Time left : <span className="info">{time}</span></p>
          <p>The remaining questions : <span className="info">{test?.cau_hoi?.length - pickAns}/{test?.cau_hoi?.length}</span> </p>
        </div>

        <Form.Item name="answers" trigger="">
          {(test.cau_hoi ?? []).map((cauHoi, index) => {
            return (
              <fieldset id={1} className="form">
                <div className="form-test">
                  <div>
                    <p className="number">{index + 1}</p>
                  </div>
                  <p className="question">{cauHoi.noi_dung}</p>
                </div>
                <Form.Item name={["answers", cauHoi._id]}>
                  <Checkbox.Group className="check">
                    {cauHoi.dap_an.map((dapAn, index) => {
                      return (
                        <Checkbox
                          //disabled={time === 0}
                          value={index}
                          className="choice"
                        >
                          {dapAn}
                        </Checkbox>
                      );
                    })}
                  </Checkbox.Group>
                </Form.Item>
                {/* <Button></Button> */}
              </fieldset>
            );
          })}
        </Form.Item>
      </div>
      <button className="buttonSubmit" onClick={handleSubmit}> Submit </button>
      <p><br /></p>

    </Form>
  );
}
export default TestQuestion;
