import React from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import BookingStatusBadge from '../../components/bookings/BookingStatusBadge'
import { useBookings } from '../../hooks/useBookings'

export const BuyerDashboard: React.FC = () => {
  const items = [{ label: 'Dashboard', path: '/buyer' }]
  const { data: bookings, isLoading } = useBookings({ role: 'buyer', pageSize: 5 })

  return (
    <DashboardLayout items={items}>
      <div className="space-y-4">
        <div className="rounded bg-white p-4">
          <h2 className="mb-3 font-semibold">Upcoming bookings</h2>
          {isLoading && <p className="text-sm text-gray-500">Loading…</p>}
          {!isLoading && !bookings?.length && (
            <p className="text-sm text-gray-500">
              No bookings yet. <Link to="/search" className="text-indigo-600 hover:underline">Browse listings</Link>
            </p>
          )}
          <ul className="divide-y">
            {bookings?.map((b: any) => (
              <li key={b.id} className="flex items-center justify-between py-2">
                <span>{b.listingTitle ?? b.bookingNumber ?? b.id}</span>
                <BookingStatusBadge status={b.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default BuyerDashboard
