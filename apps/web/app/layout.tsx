import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { TRPCProvider } from '@/lib/trpc/provider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://propfreela.com'),
  title: {
    default: 'PropFreela — Propostas comerciais para freelancers',
    template: '%s | PropFreela',
  },
  description:
    'Gere propostas comerciais profissionais em PDF em minutos. Sem Word. Sem complicação.',
  keywords: ['proposta comercial', 'freelancer', 'modelo proposta', 'gerador proposta'],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'PropFreela',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full">
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  )
}
