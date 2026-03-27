import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F7F6F3',
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
        }}
      >
        {/* Top: accent bar + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              background: '#1A472A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 700,
            }}
          >
            P
          </div>
          <span style={{ color: '#9CA3AF', fontSize: '14px', letterSpacing: '6px' }}>
            PROPFREELA
          </span>
        </div>

        {/* Middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              color: '#0D0D0B',
              fontSize: '60px',
              fontWeight: 300,
              lineHeight: 1.1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Propostas comerciais</span>
            <span>profissionais em PDF.</span>
          </div>
          <div style={{ color: '#6B6B6B', fontSize: '24px' }}>
            Para freelancers brasileiros. Grátis para começar.
          </div>
        </div>

        {/* Bottom: domain */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '4px', height: '24px', background: '#1A472A' }} />
          <span style={{ color: '#9CA3AF', fontSize: '16px' }}>propfreela.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
