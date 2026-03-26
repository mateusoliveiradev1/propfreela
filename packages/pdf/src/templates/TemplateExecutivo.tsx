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

export function TemplateExecutivo({ proposal, user }: Props) {
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

    /* ── Accent bars ── */
    accentBarTop: {
      height: 3,
      backgroundColor: accent,
    },
    accentBarBottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 3,
      backgroundColor: accent,
    },

    /* ── Body ── */
    body: {
      paddingHorizontal: 56,
      paddingTop: 36,
      paddingBottom: 56,
    },

    /* ── Centered header ── */
    header: {
      alignItems: 'center',
    },
    headerLogo: {
      height: 32,
      maxWidth: 160,
      objectFit: 'contain',
      marginBottom: 10,
    },
    headerCompanyName: {
      fontSize: 18,
      fontWeight: 600,
      color: '#0D0D0B',
      marginBottom: 10,
    },
    headerLabel: {
      fontSize: 9,
      fontWeight: 600,
      color: accent,
      letterSpacing: 4,
      textTransform: 'uppercase',
    },
    headerDivider: {
      height: 1,
      backgroundColor: '#E4E0D8',
      marginVertical: 20,
      width: '100%',
    },

    /* ── Numbered section row ── */
    section: {
      flexDirection: 'row',
      marginBottom: 28,
    },
    sectionNumber: {
      width: 48,
      fontSize: 28,
      fontWeight: 600,
      color: accent,
      opacity: 0.25,
    },
    sectionBody: {
      flex: 1,
    },
    sectionLabel: {
      fontSize: 7,
      fontWeight: 600,
      color: '#9B9790',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 8,
    },

    /* ── 01 Client ── */
    clientName: {
      fontSize: 18,
      fontWeight: 600,
      color: '#0D0D0B',
      marginBottom: 3,
    },
    clientEmail: {
      fontSize: 10,
      color: '#6B6860',
    },

    /* ── 02 Scope ── */
    scopeText: {
      fontSize: 10,
      color: '#3D3D3A',
      lineHeight: 1.8,
    },

    /* ── 03 Investment ── */
    price: {
      fontSize: 30,
      fontWeight: 600,
      color: accent,
    },

    /* ── 04 Conditions table ── */
    conditionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 7,
      borderBottomWidth: 0.5,
      borderBottomColor: '#E4E0D8',
    },
    conditionLabel: {
      fontSize: 9,
      color: '#9B9790',
      width: 130,
    },
    conditionValue: {
      fontSize: 10,
      color: '#0D0D0B',
      flex: 1,
    },

    /* ── Footer ── */
    footer: {
      position: 'absolute',
      bottom: 14,
      left: 56,
      right: 56,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: '#E4E0D8',
      paddingTop: 10,
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
        {/* ── Top accent bar ── */}
        <View style={styles.accentBarTop} />

        {/* ── Body ── */}
        <View style={styles.body}>
          {/* ── Centered header ── */}
          <View style={styles.header}>
            {user.logoUrl ? (
              <Image src={user.logoUrl} style={styles.headerLogo} />
            ) : (
              <Text style={styles.headerCompanyName}>{companyName}</Text>
            )}
            <Text style={styles.headerLabel}>PROPOSTA COMERCIAL</Text>
          </View>

          <View style={styles.headerDivider} />

          {/* ── 01 — Cliente ── */}
          <View style={styles.section}>
            <Text style={styles.sectionNumber}>01</Text>
            <View style={styles.sectionBody}>
              <Text style={styles.sectionLabel}>CLIENTE</Text>
              <Text style={styles.clientName}>{proposal.clientName}</Text>
              {proposal.clientEmail ? (
                <Text style={styles.clientEmail}>{proposal.clientEmail}</Text>
              ) : null}
            </View>
          </View>

          {/* ── 02 — Escopo do projeto ── */}
          <View style={styles.section}>
            <Text style={styles.sectionNumber}>02</Text>
            <View style={styles.sectionBody}>
              <Text style={styles.sectionLabel}>ESCOPO DO PROJETO</Text>
              <Text style={styles.scopeText}>{proposal.scope}</Text>
            </View>
          </View>

          {/* ── 03 — Investimento ── */}
          <View style={styles.section}>
            <Text style={styles.sectionNumber}>03</Text>
            <View style={styles.sectionBody}>
              <Text style={styles.sectionLabel}>INVESTIMENTO</Text>
              <Text style={styles.price}>
                {formatCurrency(proposal.valueInCents)}
              </Text>
            </View>
          </View>

          {/* ── 04 — Prazos e condições ── */}
          <View style={styles.section}>
            <Text style={styles.sectionNumber}>04</Text>
            <View style={styles.sectionBody}>
              <Text style={styles.sectionLabel}>PRAZOS E CONDIÇÕES</Text>

              <View style={styles.conditionRow}>
                <Text style={styles.conditionLabel}>Data da proposta</Text>
                <Text style={styles.conditionValue}>
                  {new Date().toLocaleDateString('pt-BR')}
                </Text>
              </View>

              {proposal.deadline ? (
                <View style={styles.conditionRow}>
                  <Text style={styles.conditionLabel}>Prazo de entrega</Text>
                  <Text style={styles.conditionValue}>
                    {formatDate(proposal.deadline)}
                  </Text>
                </View>
              ) : null}

              {proposal.paymentTerms ? (
                <View style={styles.conditionRow}>
                  <Text style={styles.conditionLabel}>Forma de pagamento</Text>
                  <Text style={styles.conditionValue}>
                    {proposal.paymentTerms}
                  </Text>
                </View>
              ) : null}
            </View>
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
          <Text style={styles.footerLeft}>{proposal.title}</Text>
          <Text style={styles.footerRight}>propfreela.com.br</Text>
        </View>

        {/* ── Bottom accent bar ── */}
        <View style={styles.accentBarBottom} />
      </Page>
    </Document>
  )
}
