'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState('login') // 'login' | 'signup' | 'forgot'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (mode === 'forgot') {
      const redirectTo = window.location.origin + '/reset-password'
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
      if (error) {
        setError('ส่งอีเมลไม่สำเร็จ: ' + error.message)
      } else {
        setSuccess('ส่งอีเมลสำเร็จ! กรุณาเช็คอีเมลเพื่อรีเซ็ตรหัสผ่าน')
      }
    } else if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
      } else {
        router.push('/dashboard')
      }
    } else {
      if (!name.trim()) { setError('กรุณากรอกชื่อ'); setLoading(false); return }
      if (password.length < 6) { setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'); setLoading(false); return }
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError('สมัครไม่สำเร็จ: ' + error.message)
      } else {
        if (data.user) {
          await supabase.from('profiles').update({ display_name: name }).eq('id', data.user.id)
        }
        setSuccess('สมัครสมาชิกสำเร็จ! กรุณาเช็คอีเมลเพื่อยืนยัน')
      }
    }
    setLoading(false)
  }

  const subtitle = mode === 'login' ? 'เข้าสู่ระบบเพื่อดูพอร์ตของคุณ'
    : mode === 'signup' ? 'สร้างบัญชีใหม่'
    : 'รีเซ็ตรหัสผ่านผ่านอีเมล'

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Noto Sans Thai', -apple-system, sans-serif",
      padding: '16px'
    }}>
      <div style={{
        background: '#fff', borderRadius: '24px',
        padding: '40px 36px', width: '100%', maxWidth: '400px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.2)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '56px', height: '56px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '16px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 12px',
            fontSize: '22px', fontWeight: '700', color: '#fff'
          }}>A</div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: 0 }}>Asset Hub</h1>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>{subtitle}</p>
        </div>

        {/* Toggle (hidden in forgot mode) */}
        {mode !== 'forgot' && (
          <div style={{
            display: 'flex', background: '#f3f4f6', borderRadius: '12px',
            padding: '4px', marginBottom: '24px'
          }}>
            {[['login', 'เข้าสู่ระบบ'], ['signup', 'สมัครสมาชิก']].map(([k, l]) => (
              <button key={k} onClick={() => { setMode(k); setError(''); setSuccess('') }} style={{
                flex: 1, padding: '8px', borderRadius: '9px', border: 'none',
                background: mode === k ? '#fff' : 'transparent',
                color: mode === k ? '#6366f1' : '#6b7280',
                fontWeight: mode === k ? '600' : '400',
                fontSize: '13px', cursor: 'pointer',
                boxShadow: mode === k ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                transition: 'all .2s', fontFamily: 'inherit'
              }}>{l}</button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '5px' }}>
                ชื่อ-นามสกุล
              </label>
              <input
                value={name} onChange={e => setName(e.target.value)}
                placeholder="กรอกชื่อของคุณ"
                style={inputStyle}
              />
            </div>
          )}

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '5px' }}>
              อีเมล
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="email@example.com" required
              style={inputStyle}
            />
          </div>

          {mode !== 'forgot' && (
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '5px' }}>
                รหัสผ่าน
              </label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? 'อย่างน้อย 6 ตัวอักษร' : '••••••••'} required
                style={inputStyle}
              />
            </div>
          )}

          {/* Forgot password link */}
          {mode === 'login' && (
            <div style={{ textAlign: 'right', marginBottom: '16px' }}>
              <button type="button" onClick={() => { setMode('forgot'); setError(''); setSuccess('') }}
                style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>
                ลืมรหัสผ่าน?
              </button>
            </div>
          )}

          {mode === 'forgot' && <div style={{ marginBottom: '20px' }} />}

          {error && (
            <div style={{
              background: '#fef2f2', color: '#ef4444', borderRadius: '10px',
              padding: '10px 14px', fontSize: '13px', marginBottom: '14px',
              border: '1px solid #fee2e2'
            }}>⚠️ {error}</div>
          )}

          {success && (
            <div style={{
              background: '#ecfdf5', color: '#10b981', borderRadius: '10px',
              padding: '10px 14px', fontSize: '13px', marginBottom: '14px',
              border: '1px solid #d1fae5'
            }}>✅ {success}</div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '12px',
            background: loading ? '#a5b4fc' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', border: 'none', borderRadius: '12px',
            fontSize: '14px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all .2s', fontFamily: 'inherit'
          }}>
            {loading ? '⏳ กำลังดำเนินการ...'
              : mode === 'login' ? 'เข้าสู่ระบบ'
              : mode === 'signup' ? 'สร้างบัญชี'
              : 'ส่งอีเมลรีเซ็ตรหัสผ่าน'}
          </button>

          {mode === 'forgot' && (
            <button type="button" onClick={() => { setMode('login'); setError(''); setSuccess('') }}
              style={{ width: '100%', marginTop: '10px', padding: '10px', background: 'none', border: 'none', color: '#6b7280', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
              ← กลับหน้าเข้าสู่ระบบ
            </button>
          )}
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
  boxSizing: 'border-box', color: '#111827',
  transition: 'border .15s'
}
