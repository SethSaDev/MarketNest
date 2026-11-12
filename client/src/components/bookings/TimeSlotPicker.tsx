import React from 'react'

interface Slot { id: string; start: string; end: string }

interface Props {
    listingId: string
    selectedSlot?: Slot | null
    onSlotSelect?: (slot: Slot) => void
}

export const TimeSlotPicker: React.FC<Props> = ({ listingId, selectedSlot, onSlotSelect }) => {
    // Placeholder UI: real implementation should fetch available slots from API
    const today = new Date()
    const slots: Slot[] = Array.from({ length: 5 }).map((_, i) => {
        const s = new Date(today.getTime() + i * 3600 * 1000 * 24)
        const start = new Date(s.setHours(9, 0, 0)).toISOString()
        const end = new Date(s.setHours(10, 0, 0)).toISOString()
        return { id: String(i), start, end }
    })

    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                {slots.map((slot) => (
                    <button
                        key={slot.id}
                        onClick={() => onSlotSelect?.(slot)}
                        className={`rounded border p-3 text-left ${selectedSlot?.id === slot.id ? 'bg-indigo-50 border-indigo-300' : 'bg-white'}`}>
                        <div className="font-medium">{new Date(slot.start).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(slot.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default TimeSlotPicker
