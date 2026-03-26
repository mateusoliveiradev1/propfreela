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

    // Full-width accent header
    headerBand: {
      backgroundColor: accent,
      paddingHorizontal: 52,
      paddingVertical: 28,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLogo: {
      height: 26,
      maxWidth: 120,
      objectFit: 'contain',
    },
    headerCompany: {
      fontSize: 14,
      fontWeight: 600,
      color: '#FFFFFF',
    },
    headerBadge: {
      fontSize: 8,
      fontWeight: 600,
      color: '#FFFFFF',
      letterSpacing: 2,
      textTransform: 'uppercase',
      opacity: 0.85,
    },

    // Body
    body: {
      paddingHorizontal: 52,
      paddingTop: 32,
      paddingBottom: 72,
    },

    // Client
    clientName: {
      fontSize: 30,
      fontWeight: 600,
      color: '#0D0D0B',
      lineHeight: 1.15,
      marginBottom: 4,
    },
    clientEmail: {
      fontSize: 10,
      color: '#6B6860',
      marginBottom: 28,
    },

    divider: {
      height: 2,
      backgroundColor: '#E4E0D8',
      marginVertical: 22,
    },

    sectionLabel: {
      fontSize: 8,
      fontWeight: 600,
      color: accent,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 10,
    },
    scopeText: {
      fontSize: 10,
      color: '#3D3D3A',
      lineHeight: 1.8,
    },

    // Value card
    valueCard: {
      backgroundColor: accent,
      borderRadius: 4,
      padding: 24,
      marginTop: 8,
    },
    valueCardLabel: {
      fontSize: 7,
      fontWeight: 600,
      color: '#FFFFFF',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      opacity: 0.7,
      marginBottom: 6,
    },
    valueCardAmount: {
      fontSize: 34,
      fontWeight: 600,
      color: '#FFFFFF',
      lineHeight: 1.05,
      marginBottom: 12,
    },
    valueCardRow: {
      flexDirection: 'row',
      gap: 32,
    },
    valueCardMeta: {
      flex: 1,
    },
    valueCardMetaLabel: {
      fontSize: 6,
      fontWeight: 600,
      color: '#FFFFFF',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      opacity: 0.6,
      marginBottom: 3,
    },
    valueCardMetaValue: {
      fontSize: 10,
      color: '#FFFFFF',
      opacity: 0.9,
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
        {/* Accent header band */}
        <View style={styles.headerBand}>
          {user.logoUrl ? (
            <Image src={user.logoUrl} style={styles.headerLogo} />
          ) : (
            <Text style={styles.headerCompany}>{companyName}</Text>
          )}
          <Text style={styles.headerBadge}>Proposta Comercial</Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <Text style={styles.clientName}>{proposal.clientName}</Text>
          {proposal.clientEmail ? (
            <Text style={styles.clientEmail}>{proposal.clientEmail}</Text>
          ) : null}

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Escopo do projeto</Text>
          <Text style={styles.scopeText}>{proposal.scope}</Text>

          <View style={styles.divider} />

          {/* Value card */}
          <View style={styles.valueCard}>
            <Text style={styles.valueCardLabel}>Investimento</Text>
            <Text style={styles.valueCardAmount}>
              {formatCurrency(proposal.valueInCents)}
            </Text>
            <View style={styles.valueCardRow}>
              {proposal.deadline ? (
                <View style={styles.valueCardMeta}>
                  <Text style={styles.valueCardMetaLabel}>Prazo</Text>
                  <Text style={styles.valueCardMetaValue}>
                    {formatDate(proposal.deadline)}
                  </Text>
                </View>
              ) : null}
              {proposal.paymentTerms ? (
                <View style={styles.valueCardMeta}>
                  <Text style={styles.valueCardMetaLabel}>Pagamento</Text>
                  <Text style={styles.valueCardMetaValue}>
                    {proposal.paymentTerms}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
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
          <Text style={styles.footerLeft}>
            {proposal.title} · Gerado em {new Date().toLocaleDateString('pt-BR')}
          </Text>
          <Text style={styles.footerRight}>propfreela.com.br</Text>
        </View>
      </Page>
    </Document>
  )
}
