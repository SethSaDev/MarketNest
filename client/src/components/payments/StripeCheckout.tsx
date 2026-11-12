import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '../ui/Button'
import axios from '../../api/axiosInstance'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

interface Props { bookingId: string; onSuccess?: (id: string) => void }

const CheckoutFormInner: React.FC<Props> = ({ bookingId, onSuccess }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = React.useState(false)

    const handlePay = async () => {
        if (!stripe || !elements) return
        setLoading(true)
        try {
            const { data } = await axios.post('/api/v1/payments/create-intent', { bookingId })
            const clientSecret = data.clientSecret || data.client_secret || data.client?.client_secret || data
            const res = await stripe.confirmCardPayment(clientSecret, { payment_method: { card: elements.getElement(CardElement) as any } })
            if (res.error) throw res.error
            onSuccess?.(bookingId)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="rounded border p-4">
                <CardElement />
            </div>
            <div>
                <Button onClick={handlePay} loading={loading}>Pay</Button>
            </div>
        </div>
    )
}

export const StripeCheckout: React.FC<Props> = (props) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutFormInner {...props} />
        </Elements>
    )
}

export default StripeCheckout
