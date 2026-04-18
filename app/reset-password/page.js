'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password !== confirm) { setError('รหัสผ่านไม่ตรงกัน'); return }
    if (password.length < 6) { setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'); return }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError('เกิดข้อผิดพลาด: ' + error.message)
    } else {
      setDone(true)
      setTimeout(() => router.push('/dashboard'), 2000)
    }
    setLoading(false)
  }

  const wrap = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Noto Sans Thai', -apple-system, sans-serif", padding: '16px'
  }
  const card = {
    background: '#fff', borderRadius: '24px', padding: '40px 36px',
    width: '100%', maxWidth: '400px', boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
    textAlign: 'center'
  }

  if (done) return (
    <div style={wrap}><div style={card}>
      <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
      <h2 style={{ color: '#111827', marginBottom: '8px' }}>รีเซ็ตสำเร็จ!</h2>
      <p style={{ color: '#6b7280', fontSize: '13px' }}>กำลังพาไปหน้าหลัก...</p>
    </div></div>
  )

  if (!ready) return (
    <div style={wrap}><div style={card}>
      <div style={{ fontSize: '36px', marginBottom: '12px' }}>⚡</div>
      <p style={{ color: '#6b7280', fontSize: '13px' }}>กำลังตรวจสอบ link...</p>
      <p style={{ color: '#9ca3af', fontSize: '11px', marginTop: '8px' }}>
        หาก link หมดอายุ กรุณา{' '}
        <a href="/login" style={{ color: '#6366f1' }}>ขอ link ใหม่</a>
      </p>
    </div></div>
  )

  return (
    <div style={wrap}>
      <div style={{ ...card, textAlign: 'left' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '56px', height: '56px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '16px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 12px',
            fontSize: '22px', fontWeight: '700', color: '#fff'
          }}>A</div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>ตั้งรหัสผ่านใหม่</h1>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>กรอกรหัสผ่านใหม่ของคุณ</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '5px' }}>
              รหัสผ่านใหม่
            </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="อย่างน้อย 6 ตัวอักษร" required style={inputStyle} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '5px' }}>
              ยืนยันรหัสผ่าน
            </label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
              placeholder="••••••••" required style={inputStyle} />
          </div>

          {error && (
            <div style={{
              background: '#fef2f2', color: '#ef4444', borderRadius: '10px',
              padding: '10px 14px', fontSize: '13px', marginBottom: '14px',
              border: '1px solid #fee2e2'
            }}>⚠️ {error}</div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '12px',
            background: loading ? '#a5b4fc' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', border: 'none', borderRadius: '12px',
            fontSize: '14px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit'
          }}>
            {loading ? '⏳ กำลังบันทึก...' : 'บันทึกรหัสผ่านใหม่'}
          </button>
        </form>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '10px 14px',
  border: '1px solid #e5e7eb', borderRadius: '10px',
  fontSize: '13px', outline: 'none',
  fontFamily: "'Noto Sans Thai', -apple-system, sans-serif",
  boxSizing: 'border-box', color: '#111827'
}
