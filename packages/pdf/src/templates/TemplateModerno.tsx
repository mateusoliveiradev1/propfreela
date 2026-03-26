import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import type { Proposal, User } from '@propfreela/db'
import { INTER_REGULAR, INTER_SEMIBOLD } from '../fonts'

// Fonts are embedded as base64 data URIs — no file system or network access needed.
Font.register({
  family: 'Inter',
  fonts: [
    { src: INTER_REGULAR, fontWeight: 400 },
    { src: INTER_SEMIBOLD, fontWeight: 600 },
  ],
})

type Props = {
  proposal: Proposal
  user: Pick<User, 'companyName' | 'logoUrl' | 'accentColor' | 'name' | 'plan'>
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('pt-BR')
}

export function TemplateModerno({ proposal, user }: Props) {
  const accent = user.accentColor ?? '#1A472A'
  const isFreePlan = user.plan === 'free'
  const companyName = user.companyName ?? user.name

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Inter',
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      fontSize: 10,
      color: '#0D0D0B',
    },

    // Watermark — stamp centered on page, rendered on top of everything
    watermarkOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    watermarkStamp: {
      borderWidth: 2,
      borderColor: '#D4D4D4',
      paddingHorizontal: 28,
      paddingVertical: 14,
      transform: 'rotate(-12deg)',
    },
    watermarkText: {
      fontSize: 20,
      fontWeight: 600,
      color: '#D4D4D4',
      letterSpacing: 5,
      textTransform: 'uppercase',
    },

    // Sidebar
    sidebar: {
      width: 192,
      backgroundColor: '#111110',
      padding: 32,
      flexDirection: 'column',
    },
    sidebarLogo: {
      height: 30,
      maxWidth: 128,
      objectFit: 'contain',
      marginBottom: 12,
    },
    sidebarCompanyName: {
      fontSize: 13,
      fontWeight: 600,
      color: '#FFFFFF',
      lineHeight: 1.3,
      marginBottom: 8,
    },
    accentLine: {
      height: 2,
      backgroundColor: accent,
      width: 28,
      marginTop: 4,
      marginBottom: 32,
    },
    sidebarEyebrow: {
      fontSize: 6,
      fontWeight: 600,
      color: '#4A4845',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    sidebarValue: {
      fontSize: 9,
      color: '#C8C4BC',
      marginBottom: 24,
      lineHeight: 1.5,
    },
    sidebarSpacer: {
      flex: 1,
    },
    sidebarBrand: {
      fontSize: 7,
      color: '#3A3835',
      letterSpacing: 0.5,
    },

    // Main area
    main: {
      flex: 1,
      padding: 40,
      paddingBottom: 72,
    },
    mainBadge: {
      fontSize: 7,
      fontWeight: 600,
      color: accent,
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: 10,
    },
    clientName: {
      fontSize: 26,
      fontWeight: 600,
      color: '#0D0D0B',
      lineHeight: 1.15,
      marginBottom: 4,
    },
    clientEmail: {
      fontSize: 9,
      color: '#6B6860',
      marginBottom: 24,
    },
    divider: {
      height: 1,
      backgroundColor: '#E4E0D8',
      marginVertical: 20,
    },
    sectionLabel: {
      fontSize: 7,
      fontWeight: 600,
      color: '#9B9790',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 10,
    },
    scopeText: {
      fontSize: 10,
      color: '#3D3D3A',
      lineHeight: 1.8,
    },

    // Value highlight box
    valueBox: {
      backgroundColor: '#F5F4F1',
      borderLeftWidth: 3,
      borderLeftColor: accent,
      padding: 20,
    },
    valueBoxLabel: {
      fontSize: 7,
      fontWeight: 600,
      color: '#9B9790',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    valueBoxAmount: {
      fontSize: 32,
      fontWeight: 600,
      color: accent,
      lineHeight: 1.05,
    },
    valueBoxPayment: {
      fontSize: 9,
      color: '#6B6860',
      marginTop: 8,
      lineHeight: 1.5,
    },

    // Footer
    footer: {
      position: 'absolute',
      bottom: 24,
      right: 40,
      fontSize: 7,
      color: '#B0AB9F',
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {user.logoUrl ? (
            <Image src={user.logoUrl} style={styles.sidebarLogo} />
          ) : (
            <Text style={styles.sidebarCompanyName}>{companyName}</Text>
          )}
          <View style={styles.accentLine} />

          <Text style={styles.sidebarEyebrow}>Data</Text>
          <Text style={styles.sidebarValue}>
            {new Date().toLocaleDateString('pt-BR')}
          </Text>

          {proposal.deadline ? (
            <>
              <Text style={styles.sidebarEyebrow}>Prazo</Text>
              <Text style={styles.sidebarValue}>{formatDate(proposal.deadline)}</Text>
            </>
          ) : null}

          {proposal.paymentTerms ? (
            <>
              <Text style={styles.sidebarEyebrow}>Pagamento</Text>
              <Text style={styles.sidebarValue}>{proposal.paymentTerms}</Text>
            </>
          ) : null}

          <View style={styles.sidebarSpacer} />
          <Text style={styles.sidebarBrand}>propfreela.com.br</Text>
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          <Text style={styles.mainBadge}>Proposta Comercial</Text>
          <Text style={styles.clientName}>{proposal.clientName}</Text>
          {proposal.clientEmail ? (
            <Text style={styles.clientEmail}>{proposal.clientEmail}</Text>
          ) : null}

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Sobre o projeto</Text>
          <Text style={styles.scopeText}>{proposal.scope}</Text>

          <View style={styles.divider} />

          <View style={styles.valueBox}>
            <Text style={styles.valueBoxLabel}>Investimento</Text>
            <Text style={styles.valueBoxAmount}>
              {formatCurrency(proposal.valueInCents)}
            </Text>
            {proposal.paymentTerms ? (
              <Text style={styles.valueBoxPayment}>{proposal.paymentTerms}</Text>
            ) : null}
          </View>
        </View>

        {/* Watermark — rendered last so it appears on top of content */}
        {isFreePlan && (
          <View style={styles.watermarkOverlay}>
            <View style={styles.watermarkStamp}>
              <Text style={styles.watermarkText}>PropFreela Grátis</Text>
            </View>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>{proposal.title} · propfreela.com.br</Text>
      </Page>
    </Document>
  )
}
