'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const router = useRouter()
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.replace('/login'); return }

      const userId = session.user.id

      // Load saved data from Supabase
      const { data: row } = await supabase
        .from('app_state')
        .select('data')
        .eq('user_id', userId)
        .single()

      // Set globals for the vanilla JS app
      window.__SB   = supabase
      window.__UID  = userId
      window.__INIT = row?.data || null

      // Load vanilla JS app
      const existing = document.getElementById('asset-hub-app-script')
      if (!existing) {
        const script = document.createElement('script')
        script.id  = 'asset-hub-app-script'
        script.src = '/agent-app.js'
        script.onload = () => setStatus('ready')
        script.onerror = () => setStatus('error')
        document.head.appendChild(script)
      } else {
        // Script already loaded, just re-render
        setStatus('ready')
        setTimeout(() => { if (window.render) window.render() }, 0)
      }
    })
  }, [router])

  return (
    <>
      <div id="app"></div>
      {status === 'loading' && (
        <div style={{
          position:'fixed', inset:0, zIndex:9999,
          display:'flex', alignItems:'center', justifyContent:'center',
          background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
          fontFamily:"'Noto Sans Thai',-apple-system,sans-serif", color:'#fff'
        }}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'36px',marginBottom:'12px'}}>⚡</div>
            <div style={{fontSize:'14px'}}>กำลังโหลด Asset Hub...</div>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div style={{
          position:'fixed', inset:0, zIndex:9999,
          padding:'40px', textAlign:'center', color:'#ef4444', background:'#fff'
        }}>
          โหลดแอปไม่สำเร็จ กรุณา refresh หน้า
        </div>
      )}
    </>
  )
}
