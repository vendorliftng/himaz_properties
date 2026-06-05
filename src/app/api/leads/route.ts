import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, interest, budget, message, source } = body

    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    const leadData = {
      id: `lead_${Date.now()}`,
      name,
      phone,
      email: email || null,
      interest: interest || 'general',
      budget: budget || null,
      message: message || null,
      source: source || 'website',
      status: 'new',
      created_at: new Date().toISOString(),
    }

    // Save to Supabase if configured
    if (isSupabaseConfigured()) {
      const { error } = await supabase!.from('leads').insert([leadData])
      if (error) {
        console.error('[SUPABASE ERROR]', error)
        return NextResponse.json(
          { error: 'Failed to save lead' },
          { status: 500 }
        )
      }
    } else {
      // Fallback: log to console for MVP without Supabase
      console.log('[LEAD CAPTURED - NO SUPABASE]', leadData)
    }

    // TODO: Integrate with n8n webhook
    // await fetch(process.env.N8N_WEBHOOK_URL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(leadData),
    // })

    return NextResponse.json(
      { success: true, message: 'Lead captured successfully', data: leadData },
      { status: 201 }
    )
  } catch (error) {
    console.error('[LEAD ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Leads API endpoint. Use POST to submit leads.' },
    { status: 200 }
  )
}
