import { Form, Input } from "antd"
import { formatTime } from "../utils/formatTime";

type ConfirmationFormProps = {
    onNameChange: (value: string) => void;
    date: string;
}

export const ConfirmationForm: React.FC<ConfirmationFormProps> = ({
    date, 
    onNameChange
}) => {
    return <>
        <Form.Item label="Your name">
            <Input onChange={(event) => onNameChange(event.target.value)} />
        </Form.Item>
        <Form.Item label="Date">
            {date}
        </Form.Item>
        <Form.Item label="Time">
            {formatTime(date)}
        </Form.Item>
        <Form.Item label="Duration">
            60 minutes
        </Form.Item>
    </>;
}