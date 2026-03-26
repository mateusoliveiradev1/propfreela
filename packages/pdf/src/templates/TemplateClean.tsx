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

export function TemplateClean({ proposal, user }: Props) {
  const accent = user.accentColor ?? '#1A472A'
  const isFreePlan = user.plan === 'free'
  const companyName = user.companyName ?? user.name

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Inter',
      backgroundColor: '#FFFFFF',
      fontSize: 10,
      color: '#0D0D0B',
    },

    // Thin accent bar at the very top
    accentBar: {
      height: 4,
      backgroundColor: accent,
    },

    // Watermark — stamp centered on page (no rotation clipping issues)
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

    // Main body
    body: {
      paddingHorizontal: 52,
      paddingTop: 36,
      paddingBottom: 72,
    },

    // Header: logo/name on left, badge on right
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 36,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#E4E0D8',
    },
    companyLogo: {
      height: 28,
      maxWidth: 140,
      objectFit: 'contain',
    },
    companyName: {
      fontSize: 16,
      fontWeight: 600,
      color: '#0D0D0B',
    },
    headerBadge: {
      backgroundColor: accent,
      color: '#FFFFFF',
      fontSize: 7,
      fontWeight: 600,
      letterSpacing: 1.5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 2,
    },

    // Client section
    eyebrow: {
      fontSize: 7,
      fontWeight: 600,
      color: '#9B9790',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    clientName: {
      fontSize: 28,
      fontWeight: 600,
      color: '#0D0D0B',
      lineHeight: 1.15,
      marginBottom: 4,
    },
    clientEmail: {
      fontSize: 10,
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

    // Metrics row
    metricsRow: {
      flexDirection: 'row',
      marginTop: 4,
    },
    metricBlock: {
      flex: 1,
      paddingRight: 24,
    },
    metricBlockBordered: {
      flex: 1,
      paddingLeft: 24,
      borderLeftWidth: 1,
      borderLeftColor: '#E4E0D8',
    },
    metricLabel: {
      fontSize: 7,
      fontWeight: 600,
      color: '#9B9790',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 6,
    },
    metricValueAccent: {
      fontSize: 30,
      fontWeight: 600,
      color: accent,
      lineHeight: 1.05,
    },
    metricValue: {
      fontSize: 15,
      fontWeight: 600,
      color: '#0D0D0B',
    },

    paymentSection: {
      marginTop: 20,
    },
    paymentText: {
      fontSize: 10,
      color: '#3D3D3A',
      lineHeight: 1.6,
    },

    // Footer
    footer: {
      position: 'absolute',
      bottom: 24,
      left: 52,
      right: 52,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: '#E4E0D8',
    },
    footerLeft: {
      fontSize: 7,
      color: '#B0AB9F',
    },
    footerRight: {
      fontSize: 7,
      fontWeight: 600,
      color: '#B0AB9F',
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Accent bar */}
        <View style={styles.accentBar} />

        {/* Body */}
        <View style={styles.body}>
          {/* Header */}
          <View style={styles.header}>
            {user.logoUrl ? (
              <Image src={user.logoUrl} style={styles.companyLogo} />
            ) : (
              <Text style={styles.companyName}>{companyName}</Text>
            )}
            <Text style={styles.headerBadge}>PROPOSTA COMERCIAL</Text>
          </View>

          {/* Client */}
          <Text style={styles.eyebrow}>Proposta para</Text>
          <Text style={styles.clientName}>{proposal.clientName}</Text>
          {proposal.clientEmail ? (
            <Text style={styles.clientEmail}>{proposal.clientEmail}</Text>
          ) : null}

          <View style={styles.divider} />

          {/* Scope */}
          <Text style={styles.sectionLabel}>Escopo do projeto</Text>
          <Text style={styles.scopeText}>{proposal.scope}</Text>

          <View style={styles.divider} />

          {/* Metrics */}
          <View style={styles.metricsRow}>
            <View style={styles.metricBlock}>
              <Text style={styles.metricLabel}>Investimento</Text>
              <Text style={styles.metricValueAccent}>
                {formatCurrency(proposal.valueInCents)}
              </Text>
            </View>
            {proposal.deadline ? (
              <View style={styles.metricBlockBordered}>
                <Text style={styles.metricLabel}>Prazo de entrega</Text>
                <Text style={styles.metricValue}>{formatDate(proposal.deadline)}</Text>
              </View>
            ) : null}
          </View>

          {/* Payment terms */}
          {proposal.paymentTerms ? (
            <View style={styles.paymentSection}>
              <Text style={styles.sectionLabel}>Condições de pagamento</Text>
              <Text style={styles.paymentText}>{proposal.paymentTerms}</Text>
            </View>
          ) : null}
        </View>

        {/* Watermark — rendered after body so it appears on top */}
        {isFreePlan && (
          <View style={styles.watermarkOverlay}>
            <View style={styles.watermarkStamp}>
              <Text style={styles.watermarkText}>PropFreela Grátis</Text>
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerLeft}>
            {proposal.title} · Gerado em {new Date().toLocaleDateString('pt-BR')}
          </Text>
          <Text style={styles.footerRight}>propfreela.com.br</Text>
        </View>
      </Page>
    </Document>
  )
}
