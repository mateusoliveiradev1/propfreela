import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import type { Proposal, User } from '@propfreela/db'

// Register fonts
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

export function TemplateClean({ proposal, user }: Props) {
  const accent = user.accentColor ?? '#1A472A'
  const isFreePlan = user.plan === 'free'
  const companyName = user.companyName ?? user.name

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Inter',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 56,
      paddingVertical: 56,
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
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 40,
      paddingBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: '#D8D4CC',
    },
    companyName: {
      fontSize: 18,
      fontWeight: 600,
      color: '#0D0D0B',
    },
    badge: {
      backgroundColor: accent,
      color: '#FFFFFF',
      fontSize: 8,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 2,
      fontWeight: 600,
      letterSpacing: 0.5,
    },
    section: {
      marginBottom: 28,
    },
    sectionLabel: {
      fontSize: 8,
      color: '#6B6860',
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 600,
      color: '#0D0D0B',
      lineHeight: 1.3,
    },
    row: {
      flexDirection: 'row',
      gap: 32,
      marginBottom: 20,
    },
    col: {
      flex: 1,
    },
    label: {
      fontSize: 8,
      color: '#6B6860',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    value: {
      fontSize: 11,
      color: '#0D0D0B',
    },
    valueLarge: {
      fontSize: 24,
      fontWeight: 600,
      color: accent,
    },
    scopeText: {
      fontSize: 10,
      color: '#3D3D3A',
      lineHeight: 1.7,
    },
    divider: {
      height: 1,
      backgroundColor: '#D8D4CC',
      marginVertical: 24,
    },
    footer: {
      position: 'absolute',
      bottom: 40,
      left: 56,
      right: 56,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    footerText: {
      fontSize: 8,
      color: '#A8A49C',
    },
    footerBrand: {
      fontSize: 8,
      color: '#A8A49C',
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {isFreePlan && <Text style={styles.watermark}>PropFreela Grátis</Text>}

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>{companyName}</Text>
          <Text style={styles.badge}>PROPOSTA COMERCIAL</Text>
        </View>

        {/* Title */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Proposta para</Text>
          <Text style={styles.sectionTitle}>{proposal.clientName}</Text>
          {proposal.clientEmail ? (
            <Text style={{ ...styles.value, marginTop: 4, color: '#6B6860' }}>
              {proposal.clientEmail}
            </Text>
          ) : null}
        </View>

        <View style={styles.divider} />

        {/* Scope */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Escopo do projeto</Text>
          <Text style={styles.scopeText}>{proposal.scope}</Text>
        </View>

        <View style={styles.divider} />

        {/* Value + Deadline */}
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Investimento</Text>
            <Text style={styles.valueLarge}>{formatCurrency(proposal.valueInCents)}</Text>
          </View>
          {proposal.deadline ? (
            <View style={styles.col}>
              <Text style={styles.label}>Prazo de entrega</Text>
              <Text style={styles.value}>{formatDate(proposal.deadline)}</Text>
            </View>
          ) : null}
        </View>

        {/* Payment Terms */}
        {proposal.paymentTerms ? (
          <View style={styles.section}>
            <Text style={styles.label}>Condições de pagamento</Text>
            <Text style={styles.value}>{proposal.paymentTerms}</Text>
          </View>
        ) : null}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {proposal.title} · Gerado em {new Date().toLocaleDateString('pt-BR')}
          </Text>
          <Text style={styles.footerBrand}>propfreela.com.br</Text>
        </View>
      </Page>
    </Document>
  )
}
