import type { DatePickerProps } from 'antd';
import {  DatePicker, Form, Card, Modal, Spin, Alert } from 'antd';
import { Suspense, useState } from 'react';
import { ConfirmationForm } from './ConfirmationForm';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { SlotSelection } from './SlotSelection';
import { getAvailableSlots } from '../api/slotsApi';
import { SlotDto } from '../types';
import { useBooking } from './useBooking';


export const AppointmentBooking: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<SlotDto>();
    const [name, setName] = useState('');
    const [slotsPromise, setSlotsPromise] = useState<Promise<SlotDto[]>>();
    const { bookAppointment, bookingFailed, loading  } = useBooking();
    const [bookedSlots, setBookedSlots] = useState<SlotDto[]>([]);

    const handleDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date.toISOString(), dateString);
        setSlotsPromise(getAvailableSlots(date.toISOString()));
    };

    function handlePickSlot(slot: SlotDto): void {
        setSelectedSlot(slot);
        setOpenModal(true);
    }

    async function handleConfirmBooking() {
        if (!selectedSlot) {
            return;
        }

        const success = await bookAppointment(selectedSlot.id, name);
        
        if (success) {
            setOpenModal(false);
            setSelectedSlot(undefined);
            setName('');
            setBookedSlots(s => [...s, selectedSlot]);
        }
    }

    function handleCancelModal() {
        setOpenModal(false);
    }

    function handleNameChange(value: string) {
        setName(value);
    }

    return <div>
        <Card style={{ minWidth: "350px", maxWidth: "350px"}} title="Book an appointment">
            <Form  layout='horizontal'>
                <Form.Item label="Date">
                    <DatePicker onChange={handleDateChange} />
                </Form.Item>
                <Form.Item label="Pick a slot">
                </Form.Item>
                <ErrorBoundary description="Something went wrong" message="Error">
                    <Suspense fallback={<Spin />}>
                        { slotsPromise && <SlotSelection bookedSlots={bookedSlots} slotsPromise={slotsPromise} onSlotPicked={handlePickSlot} /> }
                    </Suspense>
                </ErrorBoundary>
            </Form>
            <Modal
                centered
                title="Book this slot?"
                open={openModal}
                onOk={handleConfirmBooking}
                confirmLoading={loading}
                onCancel={handleCancelModal}
                width={300}
                okText="Book"
            >
                { 
                    selectedSlot && 
                    <ConfirmationForm 
                        date={selectedSlot.start_date}
                        onNameChange={handleNameChange} 
                    />
                }
                {
                    bookingFailed && <Alert message="Something went wrong" type="error" />
                }
            </Modal>
        </Card>
    </div>
}