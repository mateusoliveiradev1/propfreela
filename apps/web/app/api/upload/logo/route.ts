import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const cloudinaryUrl = process.env['CLOUDINARY_URL']
  if (!cloudinaryUrl) {
    return NextResponse.json({ error: 'Upload not configured' }, { status: 500 })
  }

  // Parse CLOUDINARY_URL: cloudinary://api_key:api_secret@cloud_name
  const match = cloudinaryUrl.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/)
  if (!match) {
    return NextResponse.json({ error: 'Invalid Cloudinary config' }, { status: 500 })
  }
  const [, apiKey, apiSecret, cloudName] = match

  const formData = await req.formData()
  const file = formData.get('file')

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Validate file type
  const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml']
  if (!validTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Tipo de arquivo inválido. Use PNG, JPG ou SVG.' }, { status: 400 })
  }

  // Max 2MB
  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: 'Arquivo muito grande. Máximo 2MB.' }, { status: 400 })
  }

  const timestamp = Math.round(Date.now() / 1000)
  const folder = 'propfreela/logos'
  const publicId = `${session.user.id}-logo`

  // Generate signature for authenticated upload
  const crypto = await import('crypto')
  const signatureString = `folder=${folder}&overwrite=true&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
  const signature = crypto.createHash('sha1').update(signatureString).digest('hex')

  const uploadFormData = new FormData()
  uploadFormData.append('file', file)
  uploadFormData.append('api_key', apiKey ?? '')
  uploadFormData.append('timestamp', String(timestamp))
  uploadFormData.append('signature', signature)
  uploadFormData.append('folder', folder)
  uploadFormData.append('public_id', publicId)
  uploadFormData.append('overwrite', 'true')

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: uploadFormData,
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Falha no upload' }, { status: 502 })
  }

  const data = (await res.json()) as { secure_url: string }
  return NextResponse.json({ url: data.secure_url })
}
