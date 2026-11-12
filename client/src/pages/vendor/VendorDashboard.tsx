import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'

export const VendorDashboard: React.FC = () => {
    const items = [{ label: 'Dashboard', path: '/vendor' }, { label: 'Listings', path: '/vendor/listings' }]
    return (
        <DashboardLayout items={items}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded bg-white p-4">Earnings: $0.00</div>
                <div className="rounded bg-white p-4">Bookings: 0</div>
                <div className="rounded bg-white p-4">Rating: N/A</div>
            </div>

            <div className="mt-6 rounded bg-white p-4">No recent bookings.</div>
        </DashboardLayout>
    )
}

export default VendorDashboard
