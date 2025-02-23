import { Alert, Button, Flex } from "antd";
import { use } from "react";
import { formatTime } from "../utils/formatTime";
import { SlotDto } from "../types";

type SlotSelectionProps = {
    slotsPromise: Promise<SlotDto[]>;
    onSlotPicked: (slot: SlotDto) => void;
    bookedSlots: SlotDto[];
}

export const SlotSelection: React.FC<SlotSelectionProps> = ({ slotsPromise, onSlotPicked, bookedSlots }) => {
    const slots = use(slotsPromise);
    const bookedIds = bookedSlots.map(x => x.id);
    const isBooked = (slot: SlotDto) => {
        return bookedIds.includes(slot.id);
    }
    return <>
    {
        slots && slots.length > 0 ?
        <Flex justify="flex-start" align="flex-start" gap="small" wrap={'wrap'}>
            {slots && slots.map(s => 
            <Button disabled={isBooked(s)} type="primary" onClick={() => onSlotPicked(s)} key={s.id}>
                {formatTime(s.start_date)}
            </Button>)}
        </Flex> :
        <Flex justify="center">
            <Alert 
                message="No appointments available on this date." 
                type="info"
            />
        </Flex>
    }
    </>;
}
