import { renderToBuffer } from '@react-pdf/renderer'
import { createElement } from 'react'
import type { ReactElement } from 'react'
import type { DocumentProps } from '@react-pdf/renderer'
import type { Proposal, User } from '@propfreela/db'
import { TemplateClean } from './templates/TemplateClean'
import { TemplateModerno } from './templates/TemplateModerno'
import { TemplateBold } from './templates/TemplateBold'
import { TemplateMinimal } from './templates/TemplateMinimal'
import { TemplateExecutivo } from './templates/TemplateExecutivo'

export type PdfOptions = {
  proposal: Proposal
  user: Pick<User, 'companyName' | 'logoUrl' | 'accentColor' | 'name' | 'plan'>
}

const TEMPLATES = {
  clean: TemplateClean,
  moderno: TemplateModerno,
  bold: TemplateBold,
  minimal: TemplateMinimal,
  executivo: TemplateExecutivo,
} as const

export async function generatePdf(options: PdfOptions): Promise<Buffer> {
  const { proposal, user } = options
  const Template = TEMPLATES[proposal.templateId]

  // Cast required: createElement returns FunctionComponentElement, but renderToBuffer
  // expects ReactElement<DocumentProps>. The template component returns a <Document>.
  const element = createElement(Template, { proposal, user }) as ReactElement<DocumentProps>
  const buffer = await renderToBuffer(element)

  // Watermark is built into the template via the plan prop.
  // This function is kept for clarity and future post-processing hooks.
  return buffer
}
