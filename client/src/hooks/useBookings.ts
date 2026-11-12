import { useQuery } from '@tanstack/react-query'
import axios from '../api/axiosInstance'

export type BookingRole = 'buyer' | 'vendor'

export interface UseBookingsOptions {
    role?: BookingRole
    vendorId?: string
    status?: string
    page?: number
    pageSize?: number
}

export function useBookings({ role = 'buyer', vendorId, status, page = 1, pageSize = 10 }: UseBookingsOptions = {}) {
    const isAuthenticated = !!localStorage.getItem('accessToken')
    return useQuery(['bookings', role, vendorId, status, page, pageSize], async () => {
        const url = role === 'buyer' ? '/api/v1/bookings/my' : '/api/v1/bookings/vendor'
        const res = await axios.get(url, { params: { vendorId, status, page, pageSize } })
        return (res.data?.items ?? res.data ?? []) as any[]
    }, { enabled: isAuthenticated && (role === 'buyer' || !!vendorId) })
}

export default useBookings
