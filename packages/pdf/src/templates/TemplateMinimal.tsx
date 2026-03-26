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

export function TemplateMinimal({ proposal, user }: Props) {
  const accent = user.accentColor ?? '#1A472A'
  const isFreePlan = user.plan === 'free'
  const companyName = user.companyName ?? user.name

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Inter',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 64,
      paddingVertical: 56,
      fontSize: 10,
      color: '#2A2A28',
    },

    // Watermark
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

    // Header
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 40,
    },
    headerLeft: {
      flexDirection: 'column',
    },
    headerLogo: {
      height: 22,
      maxWidth: 100,
      objectFit: 'contain',
    },
    headerCompany: {
      fontSize: 11,
      fontWeight: 600,
      color: '#2A2A28',
    },
    headerDate: {
      fontSize: 8,
      color: '#A0A09C',
      marginTop: 2,
    },

    hairline: {
      height: 0.5,
      backgroundColor: '#D8D4CC',
      marginVertical: 32,
    },

    // Client — large, airy
    clientName: {
      fontSize: 34,
      fontWeight: 600,
      color: '#2A2A28',
      lineHeight: 1.1,
      marginBottom: 6,
    },
    clientEmail: {
      fontSize: 10,
      color: '#A0A09C',
    },

    // Scope
    scopeLabel: {
      fontSize: 9,
      color: '#A0A09C',
      marginBottom: 12,
    },
    scopeText: {
      fontSize: 10,
      color: '#4A4A48',
      lineHeight: 2,
    },

    // Value — large, accent, standalone
    valueAmount: {
      fontSize: 36,
      fontWeight: 600,
      color: accent,
      lineHeight: 1.05,
      marginBottom: 24,
    },

    // Metadata — subtle, side by side
    metaRow: {
      flexDirection: 'row',
      gap: 48,
    },
    metaBlock: {},
    metaLabel: {
      fontSize: 8,
      color: '#A0A09C',
      marginBottom: 3,
    },
    metaValue: {
      fontSize: 10,
      color: '#2A2A28',
    },

    // Footer
    footer: {
      position: 'absolute',
      bottom: 40,
      left: 64,
      right: 64,
      alignItems: 'center',
    },
    footerDot: {
      fontSize: 14,
      color: accent,
      marginBottom: 6,
    },
    footerText: {
      fontSize: 7,
      color: '#C0BCB4',
      letterSpacing: 1,
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {user.logoUrl ? (
              <Image src={user.logoUrl} style={styles.headerLogo} />
            ) : (
              <Text style={styles.headerCompany}>{companyName}</Text>
            )}
          </View>
          <Text style={styles.headerDate}>
            {new Date().toLocaleDateString('pt-BR')}
          </Text>
        </View>

        <View style={styles.hairline} />

        {/* Client */}
        <Text style={styles.clientName}>{proposal.clientName}</Text>
        {proposal.clientEmail ? (
          <Text style={styles.clientEmail}>{proposal.clientEmail}</Text>
        ) : null}

        <View style={styles.hairline} />

        {/* Scope */}
        <Text style={styles.scopeLabel}>Escopo</Text>
        <Text style={styles.scopeText}>{proposal.scope}</Text>

        <View style={styles.hairline} />

        {/* Value */}
        <Text style={styles.valueAmount}>
          {formatCurrency(proposal.valueInCents)}
        </Text>

        {/* Metadata */}
        <View style={styles.metaRow}>
          {proposal.deadline ? (
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Prazo</Text>
              <Text style={styles.metaValue}>{formatDate(proposal.deadline)}</Text>
            </View>
          ) : null}
          {proposal.paymentTerms ? (
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Pagamento</Text>
              <Text style={styles.metaValue}>{proposal.paymentTerms}</Text>
            </View>
          ) : null}
        </View>

        {/* Watermark */}
        {isFreePlan && (
          <View style={styles.watermarkOverlay}>
            <View style={styles.watermarkStamp}>
              <Text style={styles.watermarkText}>PropFreela Grátis</Text>
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerDot}>·</Text>
          <Text style={styles.footerText}>propfreela.com.br</Text>
        </View>
      </Page>
    </Document>
  )
}
