import React from 'react'
import MainLayout from '../components/layout/MainLayout'
import { useParams, Link } from 'react-router-dom'
import axios from '../api/axiosInstance'
import { useQuery } from '@tanstack/react-query'

export const BookingConfirmation: React.FC = () => {
    const { id } = useParams()
    const { data } = useQuery(['booking', id], async () => {
        if (!id) return null
        const res = await axios.get(`/api/v1/bookings/${id}`)
        return res.data
    }, { enabled: !!id })

    const booking = data?.data || data

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto rounded bg-white p-8 text-center">
                <div className="text-green-600 text-4xl">✓</div>
                <h2 className="text-2xl font-semibold mt-4">Booking confirmed</h2>
                <p className="mt-2 text-gray-600">Your booking {booking?.bookingNumber || id} was successful.</p>
                <div className="mt-6 space-x-3">
                    <Link to="/my/bookings" className="inline-block rounded bg-indigo-600 px-4 py-2 text-white">View bookings</Link>
                    <Link to="/" className="inline-block rounded border px-4 py-2">Back to home</Link>
                </div>
            </div>
        </MainLayout>
    )
}

export default BookingConfirmation
