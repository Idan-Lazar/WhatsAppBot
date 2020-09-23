import React from "react";
import { Modal, Form, Input, Button, Space, DatePicker, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { Option } = Select;

/* import "./styles.css";
 */
function AddModal(props) {
  const {setVisModal, futureMessages, setFutureMessages } = props;

  const onFinish = (values) => {
    let phoneNumber = `${values.prefix}${values.phone}`;
    let futureMessagesCopy = futureMessages;
    futureMessagesCopy[phoneNumber] = {};
    if (values.messages.length > 0) {
      values.messages.map((message) => {
        const { time, value } = message;
        return futureMessagesCopy[phoneNumber][time] = value;
      });
    }
    setFutureMessages(futureMessagesCopy);
    setVisModal(false)
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="972">+972</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Modal
      title="Add future messages"
      visible={true}
      footer={null}
      onCancel={() => setVisModal(false)}
    >
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>
        <Form.List name="messages">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="start"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "time"]}
                      fieldKey={[field.fieldKey, "time"]}
                      rules={[{ required: true, message: "Missing time" }]}
                    >
                      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "value"]}
                      fieldKey={[field.fieldKey, "value"]}
                      rules={[{ required: true, message: "Missing message" }]}
                    >
                      <Input placeholder="Message" />
                    </Form.Item>

                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <PlusOutlined /> Add Message
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default AddModal;
