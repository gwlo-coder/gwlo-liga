'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Mail, Trash2, Clock, Inbox, User, AtSign } from 'lucide-react'

type ContactMessage = {
  id: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setMessages(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const deleteMessage = async (id: number) => {
    if (!confirm('Na pewno chcesz usunąć tę wiadomość?')) return

    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)

    if (!error) {
      setMessages(messages.filter((m) => m.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Nagłówek sekcji */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Wiadomości od użytkowników</h2>
            <p className="text-xs text-slate-400 font-medium">Skrzynka kontaktowa z formularza na stronie</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-sky-50 border border-sky-100 text-sky-700 rounded-2xl text-xs font-bold self-start sm:self-auto">
          <span>Łącznie wiadomości:</span>
          <span className="font-mono bg-white px-2 py-0.5 rounded-lg border border-sky-200">{messages.length}</span>
        </div>
      </div>

      {/* Lista wiadomości */}
      {loading ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center text-xs text-slate-400 font-medium">
          Wczytywanie wiadomości...
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-100">
            <Mail className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-800">Skrzynka jest pusta</p>
            <p className="text-xs text-slate-400 font-medium">Brak nowych wiadomości z formularza kontaktowego.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm space-y-5 hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
                      <Mail className="w-4 h-4" />
                    </span>
                    <h3 className="text-sm font-black text-slate-900">{msg.subject}</h3>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium pt-1">
                    <span className="inline-flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-100 text-slate-700">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <strong className="font-bold text-slate-900">{msg.name}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-100 text-slate-700">
                      <AtSign className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${msg.email}`} className="hover:text-sky-600 transition-colors font-medium">
                        {msg.email}
                      </a>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(msg.created_at).toLocaleString('pl-PL', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  
                  <button 
                    onClick={() => deleteMessage(msg.id)}
                    className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-100 cursor-pointer"
                    title="Usuń wiadomość"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Treść wiadomości */}
              <div className="p-4 lg:p-5 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs sm:text-sm text-slate-700 font-medium whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}