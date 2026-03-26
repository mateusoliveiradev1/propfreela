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

export function TemplateBold({ proposal, user }: Props) {
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

    /* ── Watermark ───────────────────────────────── */
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

    /* ── Massive accent header ───────────────────── */
    header: {
      backgroundColor: accent,
      height: 100,
      paddingHorizontal: 52,
      paddingVertical: 24,
      justifyContent: 'space-between',
    },
    headerTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLogo: {
      height: 28,
      maxWidth: 130,
      objectFit: 'contain',
    },
    headerCompany: {
      fontSize: 14,
      fontWeight: 600,
      color: '#FFFFFF',
    },
    headerDate: {
      fontSize: 9,
      color: '#FFFFFF',
      opacity: 0.6,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 600,
      color: '#FFFFFF',
      letterSpacing: 4,
      textTransform: 'uppercase',
    },

    /* ── Accent accent bar (decorative strip below header) ── */
    accentStrip: {
      height: 4,
      backgroundColor: accent,
      opacity: 0.35,
    },

    /* ── Body ────────────────────────────────────── */
    body: {
      paddingHorizontal: 52,
      paddingTop: 24,
      paddingBottom: 56,
    },

    /* ── Client info ─────────────────────────────── */
    clientName: {
      fontSize: 28,
      fontWeight: 600,
      color: '#0D0D0B',
      lineHeight: 1.1,
      marginBottom: 6,
    },
    clientEmail: {
      fontSize: 10,
      color: '#8A857D',
      marginBottom: 8,
    },

    /* ── Thick accent divider ────────────────────── */
    thickDivider: {
      height: 3,
      backgroundColor: accent,
      marginVertical: 14,
    },

    /* ── Scope section ───────────────────────────── */
    sectionLabel: {
      fontSize: 8,
      fontWeight: 600,
      color: accent,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    scopeText: {
      fontSize: 10,
      color: '#3D3D3A',
      lineHeight: 1.6,
    },

    /* ── Full-width accent investment card ────────── */
    investmentCard: {
      backgroundColor: accent,
      padding: 22,
      marginTop: 8,
    },
    investmentLabel: {
      fontSize: 7,
      fontWeight: 600,
      color: '#FFFFFF',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      opacity: 0.6,
      marginBottom: 8,
    },
    investmentAmount: {
      fontSize: 32,
      fontWeight: 600,
      color: '#FFFFFF',
      lineHeight: 1.05,
      marginBottom: 12,
    },
    investmentDetailsRow: {
      flexDirection: 'row',
      gap: 36,
      borderTopWidth: 1,
      borderTopColor: '#FFFFFF',
      paddingTop: 14,
    },
    investmentDetail: {
      flex: 1,
    },
    investmentDetailLabel: {
      fontSize: 6,
      fontWeight: 600,
      color: '#FFFFFF',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      opacity: 0.55,
      marginBottom: 4,
    },
    investmentDetailValue: {
      fontSize: 11,
      fontWeight: 600,
      color: '#FFFFFF',
      opacity: 0.95,
    },

    /* ── Footer ──────────────────────────────────── */
    footer: {
      position: 'absolute',
      bottom: 22,
      left: 52,
      right: 52,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 10,
      borderTopWidth: 2,
      borderTopColor: '#E8E5DF',
    },
    footerLeft: {
      fontSize: 7,
      color: '#B0AB9F',
    },
    footerRight: {
      fontSize: 7,
      fontWeight: 600,
      color: '#B0AB9F',
      letterSpacing: 0.5,
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ── MASSIVE ACCENT HEADER ── */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            {user.logoUrl ? (
              <Image src={user.logoUrl} style={styles.headerLogo} />
            ) : (
              <Text style={styles.headerCompany}>{companyName}</Text>
            )}
            <Text style={styles.headerDate}>
              {formatDate(proposal.createdAt instanceof Date ? proposal.createdAt.toISOString() : (proposal.createdAt ?? new Date().toISOString()))}
            </Text>
          </View>
          <Text style={styles.headerTitle}>PROPOSTA COMERCIAL</Text>
        </View>

        {/* Subtle strip for visual depth */}
        <View style={styles.accentStrip} />

        {/* ── BODY ── */}
        <View style={styles.body}>
          {/* Client info — big and bold */}
          <Text style={styles.clientName}>{proposal.clientName}</Text>
          {proposal.clientEmail ? (
            <Text style={styles.clientEmail}>{proposal.clientEmail}</Text>
          ) : null}

          {/* Thick accent divider */}
          <View style={styles.thickDivider} />

          {/* Scope section */}
          <Text style={styles.sectionLabel}>ESCOPO DO PROJETO</Text>
          <Text style={styles.scopeText}>{proposal.scope}</Text>

          {/* Thick accent divider */}
          <View style={styles.thickDivider} />

          {/* ── FULL-WIDTH INVESTMENT CARD ── */}
          <View style={styles.investmentCard}>
            <Text style={styles.investmentLabel}>INVESTIMENTO</Text>
            <Text style={styles.investmentAmount}>
              {formatCurrency(proposal.valueInCents)}
            </Text>

            <View style={styles.investmentDetailsRow}>
              {proposal.deadline ? (
                <View style={styles.investmentDetail}>
                  <Text style={styles.investmentDetailLabel}>PRAZO</Text>
                  <Text style={styles.investmentDetailValue}>
                    {formatDate(proposal.deadline)}
                  </Text>
                </View>
              ) : null}
              {proposal.paymentTerms ? (
                <View style={styles.investmentDetail}>
                  <Text style={styles.investmentDetailLabel}>PAGAMENTO</Text>
                  <Text style={styles.investmentDetailValue}>
                    {proposal.paymentTerms}
                  </Text>
                </View>
              ) : null}
              <View style={styles.investmentDetail}>
                <Text style={styles.investmentDetailLabel}>VALIDADE</Text>
                <Text style={styles.investmentDetailValue}>30 dias</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── WATERMARK ── */}
        {isFreePlan && (
          <View style={styles.watermarkOverlay}>
            <View style={styles.watermarkStamp}>
              <Text style={styles.watermarkText}>PropFreela Grátis</Text>
            </View>
          </View>
        )}

        {/* ── FOOTER ── */}
        <View style={styles.footer}>
          <Text style={styles.footerLeft}>{proposal.title}</Text>
          <Text style={styles.footerRight}>propfreela.com.br</Text>
        </View>
      </Page>
    </Document>
  )
}
