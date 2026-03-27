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
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          position: 'relative',
        }}
      >
        <div
          style={{
            color: '#9CA3AF',
            fontSize: 13,
            letterSpacing: 8,
            marginBottom: 36,
            textTransform: 'uppercase',
            fontFamily: 'system-ui',
          }}
        >
          PROPFREELA
        </div>
        <div
          style={{
            color: '#0D0D0B',
            fontSize: 56,
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: 28,
            fontFamily: 'system-ui',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Propostas comerciais</span>
          <span>profissionais em PDF.</span>
        </div>
        <div
          style={{
            color: '#6B6B6B',
            fontSize: 22,
            fontFamily: 'system-ui',
          }}
        >
          Para freelancers brasileiros. Grátis para começar.
        </div>

        {/* Bottom right: logo mark + domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            right: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: '#1A472A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 18,
              fontWeight: 700,
              fontFamily: 'system-ui',
            }}
          >
            P
          </div>
          <span
            style={{
              color: '#0D0D0B',
              fontSize: 16,
              fontFamily: 'system-ui',
            }}
          >
            propfreela.com
          </span>
        </div>

        {/* Left accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: '#1A472A',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
