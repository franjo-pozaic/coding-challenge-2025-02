import type { DatePickerProps } from 'antd';
import {  DatePicker, Form, Card, Flex, Button } from 'antd';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const disabledDate: DatePickerProps['disabledDate'] = (current) => {
    return current && current.isSame('2025-02-20');
};


export const AppointmentBooking: React.FC = () => {
    return <div>
        <Card style={{maxWidth: "350px"}} title="Book an appointment">
            <Form  layout='horizontal'>
                <Form.Item label="Date">
                    <DatePicker disabledDate={disabledDate}  onChange={onChange} />
                </Form.Item>
                <Form.Item label="Pick a slot">
                </Form.Item>
                <Flex  justify="flex-start" align="flex-start" gap="small" wrap={'wrap'}>
                    <Button type="primary">13:00</Button>
                    <Button type="primary">14:00</Button>
                    <Button type="primary">15:00</Button>
                    <Button type="primary">16:00</Button>
                    <Button type="primary">17:00</Button>
                </Flex>
            </Form>
        </Card>
    </div>
}