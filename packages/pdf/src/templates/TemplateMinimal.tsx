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
      paddingHorizontal: 72,
      paddingVertical: 60,
      fontSize: 10,
      color: '#2A2A28',
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

    /* ── Header ── */
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    headerLogo: {
      height: 20,
      maxWidth: 90,
      objectFit: 'contain',
    },
    headerCompany: {
      fontSize: 10,
      fontWeight: 600,
      color: '#1A1A18',
    },
    headerLabel: {
      fontSize: 8,
      color: '#B0AB9F',
      letterSpacing: 2,
      textTransform: 'uppercase',
    },

    /* ── Hairline ── */
    hairline: {
      height: 0.5,
      backgroundColor: '#DDD8D0',
      marginVertical: 40,
    },
    hairlineTight: {
      height: 0.5,
      backgroundColor: '#DDD8D0',
      marginVertical: 36,
    },

    /* ── Client ── */
    clientName: {
      fontSize: 38,
      fontWeight: 600,
      color: '#1A1A18',
      lineHeight: 1.05,
    },
    clientEmail: {
      fontSize: 10,
      color: '#A0A09C',
      marginTop: 4,
    },

    /* ── Scope ── */
    scopeLabel: {
      fontSize: 8,
      color: '#C0BCB4',
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginBottom: 14,
    },
    scopeText: {
      fontSize: 10,
      color: '#4A4A48',
      lineHeight: 2.0,
    },

    /* ── Price ── */
    priceAmount: {
      fontSize: 40,
      fontWeight: 600,
      color: accent,
      marginBottom: 32,
    },

    /* ── Metadata ── */
    metaRow: {
      flexDirection: 'row',
      gap: 56,
    },
    metaBlock: {},
    metaLabel: {
      fontSize: 7,
      color: '#C0BCB4',
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginBottom: 3,
    },
    metaValue: {
      fontSize: 10,
      color: '#2A2A28',
    },

    /* ── Footer ── */
    footer: {
      position: 'absolute',
      bottom: 44,
      left: 72,
      right: 72,
      alignItems: 'center',
    },
    footerDot: {
      fontSize: 16,
      color: accent,
      marginBottom: 4,
    },
    footerBrand: {
      fontSize: 7,
      color: '#D0CCC4',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            {user.logoUrl ? (
              <Image src={user.logoUrl} style={styles.headerLogo} />
            ) : (
              <Text style={styles.headerCompany}>{companyName}</Text>
            )}
          </View>
          <Text style={styles.headerLabel}>Proposta Comercial</Text>
        </View>

        {/* ── Hairline ── */}
        <View style={styles.hairline} />

        {/* ── Client ── */}
        <Text style={styles.clientName}>{proposal.clientName}</Text>
        {proposal.clientEmail ? (
          <Text style={styles.clientEmail}>{proposal.clientEmail}</Text>
        ) : null}

        {/* ── Hairline ── */}
        <View style={styles.hairlineTight} />

        {/* ── Scope ── */}
        <Text style={styles.scopeLabel}>Escopo</Text>
        <Text style={styles.scopeText}>{proposal.scope}</Text>

        {/* ── Hairline ── */}
        <View style={styles.hairlineTight} />

        {/* ── Price ── */}
        <Text style={styles.priceAmount}>
          {formatCurrency(proposal.valueInCents)}
        </Text>

        {/* ── Metadata ── */}
        <View style={styles.metaRow}>
          {proposal.deadline ? (
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Prazo</Text>
              <Text style={styles.metaValue}>
                {formatDate(proposal.deadline)}
              </Text>
            </View>
          ) : null}
          {proposal.paymentTerms ? (
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Pagamento</Text>
              <Text style={styles.metaValue}>{proposal.paymentTerms}</Text>
            </View>
          ) : null}
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>Data</Text>
            <Text style={styles.metaValue}>
              {new Date().toLocaleDateString('pt-BR')}
            </Text>
          </View>
        </View>

        {/* ── Watermark ── */}
        {isFreePlan && (
          <View style={styles.watermarkOverlay}>
            <View style={styles.watermarkStamp}>
              <Text style={styles.watermarkText}>PropFreela Grátis</Text>
            </View>
          </View>
        )}

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <Text style={styles.footerDot}>·</Text>
          <Text style={styles.footerBrand}>propfreela.com.br</Text>
        </View>
      </Page>
    </Document>
  )
}
