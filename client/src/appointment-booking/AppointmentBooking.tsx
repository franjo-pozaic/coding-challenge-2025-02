import type { DatePickerProps } from 'antd';
import {  DatePicker, Form, Card, Spin, Alert, Flex } from 'antd';
import { useState } from 'react';
import { ConfirmationForm } from './ConfirmationForm';
import { SlotSelection } from './SlotSelection';
import { bookSlot, getAvailableSlots } from '../api/slotsApi';
import { SlotDto } from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LoadingOutlined } from '@ant-design/icons';

export const AppointmentBooking: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<SlotDto>();
    const [date, setDate] = useState<string>();
    const [bookedSlots, setBookedSlots] = useState<SlotDto[]>([]);

    const { data: slots, isFetching, isError } = useQuery({
        queryKey: ['slots', date ],
        queryFn: () => date ? getAvailableSlots(date) : Promise.resolve([]),
        enabled: !!date,
        retry: false,
        placeholderData: (previousData) => previousData
    })

    const bookingMutation = useMutation({
        mutationFn: ({ slotId, name }: {slotId: number, name: string }) => bookSlot(slotId, name),
        onSuccess: (bookedSlot) => {
            setBookedSlots(s => [...s, bookedSlot]);
        },
        onSettled: () => {
            setOpenModal(false);
            setSelectedSlot(undefined);
        }
    })

    const handleDateChange: DatePickerProps['onChange'] = (date) => {
        setDate(date.toISOString());
    };

    function handlePickSlot(slot: SlotDto) {
        setSelectedSlot(slot);
        setOpenModal(true);
    }

    function handleConfirmBooking(name: string) {
        if (!selectedSlot || !name) {
            return;
        }
        bookingMutation.mutate({ slotId: selectedSlot.id, name });
    }

    return <>
        <Card style={{ minWidth: "350px", maxWidth: "350px"}} title="Book an appointment">
            <Form  layout='horizontal'>
                <Form.Item label="Date">
                    <Flex justify='flex-start' align='center' gap="20px">
                        <DatePicker onChange={handleDateChange} />
                        { isFetching && <Spin indicator={<LoadingOutlined spin />} /> }
                    </Flex>
                </Form.Item>
                <Form.Item label="Pick a slot">
                </Form.Item>
                { slots && <SlotSelection bookedSlots={bookedSlots} slots={slots} onSlotPicked={handlePickSlot} /> }
                { (isError || bookingMutation.isError) && <Alert message="Something went wrong" type="error" /> }
            </Form>
                { 
                    selectedSlot && 
                    <ConfirmationForm 
                        date={selectedSlot.start_date}
                        confirmLoading={bookingMutation.isPending}
                        onCancel={() => setOpenModal(false)}
                        openModal={openModal}
                        onConfirmBooking={handleConfirmBooking}
                    />
                }
        </Card>
    </>
}