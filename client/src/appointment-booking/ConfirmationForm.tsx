import { Form, Input, Modal } from "antd"
import { formatTime, formatDate } from "../utils";
import { useState } from "react";

type ConfirmationFormProps = {
    date: string;
    openModal: boolean;
    onConfirmBooking: (name: string) => void;
    confirmLoading: boolean;
    onCancel: () => void;
}

export const ConfirmationForm: React.FC<ConfirmationFormProps> = ({
    date, 
    openModal,
    onConfirmBooking,
    confirmLoading,
    onCancel
}) => {
    const [form] = Form.useForm();
    const [name, setName] = useState('');

    function handleOk() {
        form.submit();
        onConfirmBooking(name);
    }

    return <>
        <Modal
                centered
                title="Book this slot?"
                open={openModal}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                onCancel={onCancel}
                width={300}
                okText="Book"
            >
            <Form form={form} requiredMark="optional">
                <Form.Item rules={[{ required: true }]} name="Name" label="Your name">
                    <Input onChange={(event) => setName(event.target.value)} />
                </Form.Item>
            </Form>
            <p>Date: {formatDate(date)}</p>
            <p>Time: {formatTime(date)}</p>
            <p>Duration: 60 minutes</p>
        </Modal>
    </>;
}