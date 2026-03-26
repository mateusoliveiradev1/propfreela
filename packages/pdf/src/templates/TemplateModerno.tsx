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
      fontSize: 10,
      color: '#0D0D0B',
    },

    /* ── Watermark ── */
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

    /* ── Dark sidebar ── */
    sidebar: {
      width: 220,
      backgroundColor: '#0F0F0E',
      paddingHorizontal: 24,
      paddingVertical: 32,
      flexDirection: 'column',
    },
    sidebarLogo: {
      height: 32,
      maxWidth: 140,
      objectFit: 'contain',
      marginBottom: 4,
    },
    sidebarCompanyName: {
      fontSize: 14,
      fontWeight: 600,
      color: '#FFFFFF',
      lineHeight: 1.3,
      marginBottom: 6,
    },
    accentLine: {
      width: 32,
      height: 2,
      backgroundColor: accent,
      marginBottom: 20,
    },
    metaLabel: {
      fontSize: 6,
      fontWeight: 600,
      color: '#4A4845',
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    metaValue: {
      fontSize: 10,
      color: '#B8B4AC',
      marginBottom: 16,
      lineHeight: 1.5,
    },
    sidebarSpacer: {
      flex: 1,
    },
    sidebarBrand: {
      fontSize: 7,
      color: '#2A2825',
      letterSpacing: 0.5,
    },

    /* ── Main content area ── */
    main: {
      flex: 1,
      padding: 36,
      paddingBottom: 56,
      backgroundColor: '#FFFFFF',
      flexDirection: 'column',
    },
    eyebrow: {
      fontSize: 8,
      fontWeight: 600,
      color: accent,
      letterSpacing: 3,
      textTransform: 'uppercase',
      marginBottom: 6,
    },
    clientName: {
      fontSize: 24,
      fontWeight: 600,
      color: '#0D0D0B',
      lineHeight: 1.15,
      marginBottom: 3,
    },
    clientEmail: {
      fontSize: 10,
      color: '#6B6860',
      marginBottom: 16,
    },
    divider: {
      height: 1,
      backgroundColor: '#E8E5DE',
      marginVertical: 14,
    },
    sectionLabel: {
      fontSize: 7,
      fontWeight: 600,
      color: '#9B9790',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    scopeText: {
      fontSize: 10,
      color: '#3D3D3A',
      lineHeight: 1.6,
    },

    /* ── Value highlight box ── */
    valueBox: {
      backgroundColor: '#F7F6F3',
      borderLeftWidth: 4,
      borderLeftColor: accent,
      padding: 18,
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
      fontSize: 28,
      fontWeight: 600,
      color: accent,
      lineHeight: 1.05,
    },
    valueBoxPayment: {
      fontSize: 9,
      color: '#6B6860',
      marginTop: 5,
      lineHeight: 1.5,
    },

    /* ── Footer ── */
    footer: {
      position: 'absolute',
      bottom: 28,
      right: 44,
      fontSize: 7,
      color: '#B0AB9F',
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ── Sidebar ── */}
        <View style={styles.sidebar}>
          {user.logoUrl ? (
            <Image src={user.logoUrl} style={styles.sidebarLogo} />
          ) : (
            <Text style={styles.sidebarCompanyName}>{companyName}</Text>
          )}

          <View style={styles.accentLine} />

          <Text style={styles.metaLabel}>DATA DA PROPOSTA</Text>
          <Text style={styles.metaValue}>
            {new Date().toLocaleDateString('pt-BR')}
          </Text>

          {proposal.deadline ? (
            <>
              <Text style={styles.metaLabel}>PRAZO DE ENTREGA</Text>
              <Text style={styles.metaValue}>
                {formatDate(proposal.deadline)}
              </Text>
            </>
          ) : null}

          {proposal.paymentTerms ? (
            <>
              <Text style={styles.metaLabel}>PAGAMENTO</Text>
              <Text style={styles.metaValue}>{proposal.paymentTerms}</Text>
            </>
          ) : null}

          <View style={styles.sidebarSpacer} />

          <Text style={styles.sidebarBrand}>propfreela.com.br</Text>
        </View>

        {/* ── Main content ── */}
        <View style={styles.main}>
          <Text style={styles.eyebrow}>PROPOSTA COMERCIAL</Text>
          <Text style={styles.clientName}>{proposal.clientName}</Text>
          {proposal.clientEmail ? (
            <Text style={styles.clientEmail}>{proposal.clientEmail}</Text>
          ) : null}

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>ESCOPO DO PROJETO</Text>
          <Text style={styles.scopeText}>{proposal.scope}</Text>

          <View style={styles.divider} />

          <View style={styles.valueBox}>
            <Text style={styles.valueBoxLabel}>INVESTIMENTO</Text>
            <Text style={styles.valueBoxAmount}>
              {formatCurrency(proposal.valueInCents)}
            </Text>
            {proposal.paymentTerms ? (
              <Text style={styles.valueBoxPayment}>
                {proposal.paymentTerms}
              </Text>
            ) : null}
          </View>
        </View>

        {/* ── Watermark (free plan only) ── */}
        {isFreePlan && (
          <View style={styles.watermarkOverlay}>
            <View style={styles.watermarkStamp}>
              <Text style={styles.watermarkText}>PropFreela Grátis</Text>
            </View>
          </View>
        )}

        {/* ── Footer ── */}
        <Text style={styles.footer}>
          {proposal.title} · propfreela.com.br
        </Text>
      </Page>
    </Document>
  )
}
