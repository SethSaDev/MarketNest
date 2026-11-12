import React from 'react'
import MainLayout from '../components/layout/MainLayout'
import TimeSlotPicker from '../components/bookings/TimeSlotPicker'
import BookingForm from '../components/bookings/BookingForm'
import StripeCheckout from '../components/payments/StripeCheckout'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from '../api/axiosInstance'

export const BookingCheckout: React.FC = () => {
    const [params] = useSearchParams()
    const listingId = params.get('listingId') || ''
    const navigate = useNavigate()

    const [step, setStep] = React.useState(1)
    const [selectedSlot, setSelectedSlot] = React.useState<any | null>(null)
    const [bookingId, setBookingId] = React.useState<string | null>(null)

    const handleCreate = async (payload: any) => {
        // call backend to create booking draft
        const res = await axios.post('/api/v1/bookings', { listingId, slotId: payload.slotId, attendees: payload.attendees, notes: payload.notes })
        const id = res.data?.id || res.data?.bookingId || res.data
        setBookingId(id)
        setStep(3)
    }

    const handlePaymentSuccess = (id: string) => {
        navigate(`/booking-confirmation/${id}`)
    }

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="rounded bg-white p-4">
                    <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>1</div>
                        <div className={`px-3 py-1 rounded ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>2</div>
                        <div className={`px-3 py-1 rounded ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>3</div>
                    </div>
                </div>

                {step === 1 && (
                    <div className="rounded bg-white p-6">
                        <h3 className="font-semibold mb-4">Choose a time</h3>
                        <TimeSlotPicker listingId={listingId} selectedSlot={selectedSlot} onSlotSelect={(s) => { setSelectedSlot(s); setStep(2) }} />
                    </div>
                )}

                {step === 2 && (
                    <div className="rounded bg-white p-6">
                        <h3 className="font-semibold mb-4">Booking details</h3>
                        <BookingForm listing={{ id: listingId }} slot={selectedSlot} onSubmit={handleCreate} />
                    </div>
                )}

                {step === 3 && bookingId && (
                    <div className="rounded bg-white p-6">
                        <h3 className="font-semibold mb-4">Payment</h3>
                        <StripeCheckout bookingId={bookingId} onSuccess={handlePaymentSuccess} />
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default BookingCheckout
