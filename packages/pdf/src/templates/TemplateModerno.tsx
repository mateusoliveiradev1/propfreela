import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import type { Proposal, User } from '@propfreela/db'

Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeA.woff',
      fontWeight: 600,
    },
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
    watermark: {
      position: 'absolute',
      top: '40%',
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 52,
      color: '#E8E8E8',
      fontWeight: 600,
      transform: 'rotate(-30deg)',
      opacity: 0.4,
      zIndex: 10,
    },
    sidebar: {
      width: 180,
      backgroundColor: '#0D0D0B',
      padding: 32,
      flexDirection: 'column',
    },
    sidebarCompany: {
      fontSize: 14,
      fontWeight: 600,
      color: '#FFFFFF',
      marginBottom: 40,
    },
    sidebarLabel: {
      fontSize: 7,
      color: '#6B6860',
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    sidebarValue: {
      fontSize: 9,
      color: '#EFEDE8',
      marginBottom: 20,
      lineHeight: 1.5,
    },
    accentLine: {
      height: 2,
      backgroundColor: accent,
      width: 32,
      marginBottom: 32,
    },
    main: {
      flex: 1,
      padding: 40,
    },
    badge: {
      fontSize: 7,
      color: accent,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 12,
      fontWeight: 600,
    },
    proposalTitle: {
      fontSize: 24,
      fontWeight: 600,
      color: '#0D0D0B',
      marginBottom: 4,
      lineHeight: 1.2,
    },
    clientEmail: {
      fontSize: 9,
      color: '#6B6860',
      marginBottom: 32,
    },
    divider: {
      height: 1,
      backgroundColor: '#D8D4CC',
      marginVertical: 24,
    },
    sectionLabel: {
      fontSize: 7,
      color: '#6B6860',
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    scopeText: {
      fontSize: 10,
      color: '#3D3D3A',
      lineHeight: 1.7,
    },
    valueContainer: {
      backgroundColor: '#F7F6F3',
      borderRadius: 4,
      padding: 20,
      marginTop: 8,
    },
    valueLabel: {
      fontSize: 8,
      color: '#6B6860',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    valueLarge: {
      fontSize: 28,
      fontWeight: 600,
      color: accent,
    },
    paymentTerms: {
      fontSize: 9,
      color: '#6B6860',
      marginTop: 8,
    },
    footer: {
      position: 'absolute',
      bottom: 24,
      right: 40,
      fontSize: 7,
      color: '#A8A49C',
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {isFreePlan && <Text style={styles.watermark}>PropFreela Grátis</Text>}

        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarCompany}>{companyName}</Text>
          <View style={styles.accentLine} />

          <Text style={styles.sidebarLabel}>Data</Text>
          <Text style={styles.sidebarValue}>{new Date().toLocaleDateString('pt-BR')}</Text>

          {proposal.deadline ? (
            <>
              <Text style={styles.sidebarLabel}>Prazo</Text>
              <Text style={styles.sidebarValue}>{formatDate(proposal.deadline)}</Text>
            </>
          ) : null}

          {proposal.paymentTerms ? (
            <>
              <Text style={styles.sidebarLabel}>Pagamento</Text>
              <Text style={styles.sidebarValue}>{proposal.paymentTerms}</Text>
            </>
          ) : null}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          <Text style={styles.badge}>Proposta Comercial</Text>
          <Text style={styles.proposalTitle}>{proposal.clientName}</Text>
          {proposal.clientEmail ? (
            <Text style={styles.clientEmail}>{proposal.clientEmail}</Text>
          ) : null}

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Sobre o projeto</Text>
          <Text style={styles.scopeText}>{proposal.scope}</Text>

          <View style={styles.divider} />

          <View style={styles.valueContainer}>
            <Text style={styles.valueLabel}>Investimento</Text>
            <Text style={styles.valueLarge}>{formatCurrency(proposal.valueInCents)}</Text>
            {proposal.paymentTerms ? (
              <Text style={styles.paymentTerms}>{proposal.paymentTerms}</Text>
            ) : null}
          </View>
        </View>

        <Text style={styles.footer}>
          {proposal.title} · propfreela.com.br
        </Text>
      </Page>
    </Document>
  )
}
