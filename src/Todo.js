import React from "react";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  DatePicker,
  Layout,
  Button,
  Modal,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      todoData: [],
    };
    this.handleButton = this.handleButton.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.disabledDate = this.disabledDate.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleButton() {
    this.setState({ isModal: true });
  }

  onFinish(e) {
    const data = {
      name: e.taskname,
      description: e.description,
      date: e.date.toDate().toUTCString().substring(0, 16),
    };
    this.setState({ isModal: false });
    this.setState((prevState) => ({
      todoData: [...prevState.todoData, data],
    }));
    console.log(this.state.todoData);
  }

  disabledDate(current) {
    return current < moment().startOf("day");
  }

  handleClose(name) {
    this.setState({
      todoData: this.state.todoData.filter(function (item) {
        return item.name !== name;
      }),
    });
  }

  render() {
    return (
      <Layout>
        <Header style={{ backgroundColor: "#f0f2f5", textAlign: "center" }}>
          <h1>To Do Application</h1>
        </Header>
        <Content
          style={{
            backgroundColor: "#c0ddf0",
            margin: "24px 16px",
            padding: 24,
            minHeight: 600,
          }}
        >
          <div
            style={{
              paddingTop: "20px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              style={{ fontSize: "16px", backgroundColor: "white" }}
              onClick={this.handleButton}
            >
              Add a task
            </Button>
          </div>
          <Modal
            title={
              <center>
                <b>Enter the details of new task</b>
              </center>
            }
            centered
            visible={this.state.isModal}
            onOk={() => this.setState({ isModal: false })}
            onCancel={() => this.setState({ isModal: false })}
            cancelButtonProps={{ style: { display: "none" } }}
            width={650}
          >
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              onFinish={this.onFinish}
            >
              <Form.Item
                label="Task Name"
                name="taskname"
                rules={[
                  { required: true, message: "Please input your task name!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="description"
                label="Task description"
                rules={[
                  {
                    required: true,
                    message: "Please input your task description!",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item
                name="date"
                label="Task date"
                rules={[
                  {
                    required: true,
                    message: "Please input your task's date of completion!",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: 400 }}
                  disabledDate={this.disabledDate}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 12, span: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <div style={{ paddingTop: "50px" }}>
            <Row gutter={(24, 24)}>
              {this.state.todoData.map((item) => (
                <Col span={8} xs={24} md={8}>
                  <Card
                    style={{ marginTop: 16 }}
                    title={item.name}
                    extra={
                      <p
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => this.handleClose(item.name)}
                      >
                        Close &nbsp;
                        <CloseOutlined />
                      </p>
                    }
                  >
                    <p>Description : {item.description} </p>
                    <p>Date : {item.date}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Todo;
