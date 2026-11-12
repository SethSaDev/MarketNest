import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerThunk } from '../store/authSlice'
import type { AppDispatch } from '../store'
import type { RegisterRequest } from '../types/auth.types'
import { Button, Input } from '../components/ui'

export default function Register() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [form, setForm] = useState<RegisterRequest>({ firstName: '', lastName: '', email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const update = (field: keyof RegisterRequest) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    try {
      await dispatch(registerThunk(form)).unwrap()
      navigate('/')
    } catch {
      setError('Could not create the account. The email may already be registered.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Create your account</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="First name" required value={form.firstName} onChange={update('firstName')} />
          <Input label="Last name" required value={form.lastName} onChange={update('lastName')} />
        </div>
        <Input label="Email" type="email" autoComplete="email" required value={form.email} onChange={update('email')} />
        <Input label="Password" type="password" autoComplete="new-password" required value={form.password} onChange={update('password')} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" loading={loading} className="w-full">Create account</Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Sign in</Link>
      </p>
    </div>
  )
}
