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

    /* ── Large accent header block ────────────────────────────────── */
    headerBlock: {
      backgroundColor: accent,
      height: 68,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 56,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    companyLogo: {
      height: 32,
      maxWidth: 160,
      objectFit: 'contain',
    },
    companyNameHeader: {
      fontSize: 18,
      fontWeight: 600,
      color: '#FFFFFF',
      letterSpacing: 0.5,
    },
    headerTitle: {
      fontSize: 9,
      fontWeight: 600,
      color: '#FFFFFF',
      opacity: 0.55,
      letterSpacing: 3,
      textTransform: 'uppercase',
    },

    /* ── Body ─────────────────────────────────────────────────────── */
    body: {
      paddingHorizontal: 56,
      paddingTop: 24,
      paddingBottom: 56,
    },

    /* ── Client section ───────────────────────────────────────────── */
    eyebrow: {
      fontSize: 7,
      fontWeight: 600,
      color: accent,
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: 6,
    },
    clientName: {
      fontSize: 24,
      fontWeight: 600,
      color: '#0D0D0B',
      lineHeight: 1.15,
      marginBottom: 4,
    },
    clientEmail: {
      fontSize: 10,
      color: '#8A857D',
      letterSpacing: 0.3,
      marginBottom: 0,
    },

    /* ── Divider ──────────────────────────────────────────────────── */
    divider: {
      height: 1,
      backgroundColor: '#E8E5DF',
      marginTop: 14,
      marginBottom: 14,
    },

    /* ── Scope section — "quote" style with accent left bar ──────── */
    scopeLabel: {
      fontSize: 7,
      fontWeight: 600,
      color: '#9B9790',
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    scopeQuote: {
      borderLeftWidth: 3,
      borderLeftColor: accent,
      paddingLeft: 20,
      paddingVertical: 4,
    },
    scopeText: {
      fontSize: 10,
      color: '#3D3D3A',
      lineHeight: 1.6,
    },

    /* ── Investment section — two columns ─────────────────────────── */
    investmentRow: {
      flexDirection: 'row',
    },
    investmentLeft: {
      flex: 1,
      paddingRight: 32,
    },
    investmentRight: {
      flex: 1,
      paddingLeft: 32,
      borderLeftWidth: 1,
      borderLeftColor: '#E8E5DF',
      justifyContent: 'center',
    },
    investmentLabel: {
      fontSize: 7,
      fontWeight: 600,
      color: '#9B9790',
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: 5,
    },
    investmentPrice: {
      fontSize: 28,
      fontWeight: 600,
      color: accent,
      lineHeight: 1.05,
      marginBottom: 4,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    detailLabel: {
      fontSize: 7,
      fontWeight: 600,
      color: '#9B9790',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      width: 100,
    },
    detailValue: {
      fontSize: 11,
      fontWeight: 600,
      color: '#0D0D0B',
    },

    /* ── Payment terms ────────────────────────────────────────────── */
    paymentSection: {
      marginTop: 14,
    },
    paymentLabel: {
      fontSize: 7,
      fontWeight: 600,
      color: '#9B9790',
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: 6,
    },
    paymentQuote: {
      borderLeftWidth: 3,
      borderLeftColor: '#E8E5DF',
      paddingLeft: 20,
      paddingVertical: 4,
    },
    paymentText: {
      fontSize: 10,
      color: '#3D3D3A',
      lineHeight: 1.5,
    },

    /* ── Footer ───────────────────────────────────────────────────── */
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 56,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: '#E8E5DF',
    },
    footerLeft: {
      fontSize: 7,
      color: '#B0AB9F',
      letterSpacing: 0.3,
    },
    footerRight: {
      fontSize: 7,
      fontWeight: 600,
      color: accent,
      letterSpacing: 0.5,
    },

    /* ── Watermark ────────────────────────────────────────────────── */
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
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ── Large accent header block ──────────────────────────── */}
        <View style={styles.headerBlock}>
          <View style={styles.headerLeft}>
            {user.logoUrl ? (
              <Image src={user.logoUrl} style={styles.companyLogo} />
            ) : (
              <Text style={styles.companyNameHeader}>{companyName}</Text>
            )}
          </View>
          <Text style={styles.headerTitle}>PROPOSTA COMERCIAL</Text>
        </View>

        {/* ── Body ───────────────────────────────────────────────── */}
        <View style={styles.body}>
          {/* Client */}
          <Text style={styles.eyebrow}>PROPOSTA PARA</Text>
          <Text style={styles.clientName}>{proposal.clientName}</Text>
          {proposal.clientEmail ? (
            <Text style={styles.clientEmail}>{proposal.clientEmail}</Text>
          ) : null}

          <View style={styles.divider} />

          {/* Scope */}
          <Text style={styles.scopeLabel}>ESCOPO DO PROJETO</Text>
          <View style={styles.scopeQuote}>
            <Text style={styles.scopeText}>{proposal.scope}</Text>
          </View>

          <View style={styles.divider} />

          {/* Investment — two columns */}
          <View style={styles.investmentRow}>
            {/* Left: price */}
            <View style={styles.investmentLeft}>
              <Text style={styles.investmentLabel}>INVESTIMENTO</Text>
              <Text style={styles.investmentPrice}>
                {formatCurrency(proposal.valueInCents)}
              </Text>
            </View>

            {/* Right: details stacked */}
            <View style={styles.investmentRight}>
              {proposal.deadline ? (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>PRAZO</Text>
                  <Text style={styles.detailValue}>
                    {formatDate(proposal.deadline)}
                  </Text>
                </View>
              ) : null}

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>DATA</Text>
                <Text style={styles.detailValue}>
                  {new Date().toLocaleDateString('pt-BR')}
                </Text>
              </View>

              {proposal.paymentTerms ? (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>PAGAMENTO</Text>
                  <Text style={styles.detailValue}>Ver abaixo</Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* Payment terms */}
          {proposal.paymentTerms ? (
            <View style={styles.paymentSection}>
              <Text style={styles.paymentLabel}>
                CONDIÇÕES DE PAGAMENTO
              </Text>
              <View style={styles.paymentQuote}>
                <Text style={styles.paymentText}>
                  {proposal.paymentTerms}
                </Text>
              </View>
            </View>
          ) : null}
        </View>

        {/* ── Watermark (on top of body for free plan) ───────────── */}
        {isFreePlan && (
          <View style={styles.watermarkOverlay}>
            <View style={styles.watermarkStamp}>
              <Text style={styles.watermarkText}>PropFreela Grátis</Text>
            </View>
          </View>
        )}

        {/* ── Footer ─────────────────────────────────────────────── */}
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
