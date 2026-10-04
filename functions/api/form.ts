// Handles the contact form and newsletter sign-ups on Cloudflare Pages (replaces Netlify Forms).
// Stores every submission in D1 and, when RESEND_API_KEY is set, emails it to NOTIFY_TO.
interface Env {
  FORMS: D1Database
  NOTIFY_TO: string
  RESEND_API_KEY?: string
}

const FORMS = ['contact', 'newsletter']
const FIELDS: Record<string, string> = {
  'first-name': 'First name',
  'last-name': 'Last name',
  email: 'Email',
  phone: 'Phone',
  position: 'Position',
  department: 'Department or organisation',
  topic: 'Topic',
  subject: 'Subject',
  message: 'Message',
}

export const onRequestPost: PagesFunction<Env> = async ({request, env}) => {
  const body = await request.formData()
  const form = String(body.get('form-name') || '')
  const back = (path: string) => Response.redirect(new URL(path, request.url).toString(), 303)

  if (!FORMS.includes(form)) return new Response('Unknown form', {status: 400})
  // Honeypot: real visitors never fill this hidden field
  if (String(body.get('company') || '').trim()) return back(`/thanks/?form=${form}`)
  if (body.get('consent') !== 'yes') return new Response('Consent is required', {status: 400})

  const data: Record<string, string> = {}
  for (const key of Object.keys(FIELDS)) {
    const v = String(body.get(key) || '').trim().slice(0, 5000)
    if (v) data[key] = v
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) return new Response('A valid email address is required', {status: 400})
  if (form === 'contact' && !data.message) return new Response('A message is required', {status: 400})

  await env.FORMS.prepare('INSERT INTO submissions (form, email, data) VALUES (?, ?, ?)')
    .bind(form, data.email, JSON.stringify(data))
    .run()

  if (env.RESEND_API_KEY) {
    const lines = Object.entries(data).map(([k, v]) => `${FIELDS[k]}: ${v}`)
    const subject = form === 'contact' ? `Website contact form: ${data.subject || data.topic || data.email}` : `Newsletter sign-up: ${data.email}`
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({
        from: 'DEXLab website <onboarding@resend.dev>',
        to: [env.NOTIFY_TO],
        reply_to: data.email,
        subject,
        text: lines.join('\n\n'),
      }),
    }).catch(() => undefined) // the submission is stored either way
  }

  return back(`/thanks/?form=${form}`)
}
