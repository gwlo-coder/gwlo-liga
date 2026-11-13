'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Search, Whistle, Menu, X, Shield, User } from 'lucide-react'

type Team = {
  id: number
  name: string
  short_name: string
  logo_url?: string
}

type Player = {
  id: number
  first_name: string
  last_name: string
  team_id: number
  teams?: {
    name: string
  } | null
}

export default function Navbar() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const [searchQuery, setSearchQuery] = useState('')
  const [teamResults, setTeamResults] = useState<Team[]>([])
  const [playerResults, setPlayerResults] = useState<Player[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isActive = (path: string) => pathname === path

  // Logika wyszukiwania drużyn oraz zawodników w Supabase
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.trim()

        // 1. Wyszukiwanie drużyn
        const { data: teamsData } = await supabase
          .from('teams')
          .select('id, name, short_name, logo_url')
          .or(`name.ilike.%${query}%,short_name.ilike.%${query}%`)
          .limit(4)

        // 2. Wyszukiwanie zawodników wraz z nazwą zespołu
        const { data: playersData } = await supabase
          .from('players')
          .select(`
            id,
            first_name,
            last_name,
            team_id,
            teams:teams(name)
          `)
          .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
          .limit(5)

        if (teamsData || playersData) {
          setTeamResults((teamsData as Team[]) || [])
          setPlayerResults((playersData as unknown as Player[]) || [])
          setIsSearchOpen(true)
        }
      } else {
        setTeamResults([])
        setPlayerResults([])
        setIsSearchOpen(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  // Zamykanie listy podpowiedzi po kliknięciu poza wyszukiwarkę
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!isMounted) return null

  const hasResults = teamResults.length > 0 || playerResults.length > 0

  return (
    <header className="w-full bg-white text-slate-800 border-b border-slate-200/80 sticky top-0 z-50 shadow-sm">
      
      {/* GŁÓWNY NAGŁÓWEK */}
      <div className="max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-14">
        <div className="flex items-center justify-between h-20 py-3 gap-4">
          
          {/* Logo GWLO */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <img 
              src="/teams/logo.png" 
              alt="GWLO Logo" 
              className="w-10 h-10 object-contain rounded-xl group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">
                GWLO
              </span>
              <span className="text-[11px] tracking-wide text-slate-500 font-medium mt-1">
                Gorzowska Liga Osiedlowa
              </span>
            </div>
          </Link>

          {/* Wyszukiwarka + Regulamin + Przycisk menu mobilnego */}
          <div className="flex items-center gap-4 lg:gap-6">
            
            {/* Wyszukiwarka (Desktop) */}
            <div className="relative hidden lg:block w-80" ref={searchRef}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { if (searchQuery.trim().length > 0) setIsSearchOpen(true) }}
                  placeholder="Szukaj gracza, drużyny..."
                  className="w-full bg-slate-100/80 border border-slate-200 rounded-lg pl-4 pr-10 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-normal"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-2.5 pointer-events-none" />
              </div>

              {/* Okienko podpowiedzi z wynikami wyszukiwania */}
              {isSearchOpen && hasResults && (
                <div className="absolute left-0 right-0 top-[calc(100%+12px)] bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-[99999] max-h-80 overflow-y-auto">
                  
                  {teamResults.length > 0 && (
                    <div>
                      <div className="p-2 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase px-3">
                        Drużyny
                      </div>
                      <div className="p-1">
                        {teamResults.map((team) => (
                          <button
                            key={`team-${team.id}`}
                            onClick={() => {
                              router.push(`/zespoly/${team.id}`)
                              setIsSearchOpen(false)
                              setSearchQuery('')
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-left"
                          >
                            {team.logo_url ? (
                              <img src={team.logo_url} alt="" className="w-5 h-5 object-contain shrink-0" />
                            ) : (
                              <div className="w-5 h-5 rounded bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                                <Shield className="w-3 h-3" />
                              </div>
                            )}
                            <div className="truncate">
                              <span className="text-xs font-bold text-slate-900 block truncate">{team.name}</span>
                              <span className="text-[10px] text-slate-400 block">Skrót: {team.short_name || 'GWLO'}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {playerResults.length > 0 && (
                    <div className={teamResults.length > 0 ? 'border-t border-slate-100' : ''}>
                      <div className="p-2 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase px-3">
                        Zawodnicy
                      </div>
                      <div className="p-1">
                        {playerResults.map((player) => (
                          <button
                            key={`player-${player.id}`}
                            onClick={() => {
                              router.push(`/zawodnik/${player.id}`)
                              setIsSearchOpen(false)
                              setSearchQuery('')
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-left"
                          >
                            <div className="w-5 h-5 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                              <User className="w-3 h-3" />
                            </div>
                            <div className="truncate">
                              <span className="text-xs font-bold text-slate-900 block truncate">
                                {player.first_name} {player.last_name}
                              </span>
                              <span className="text-[10px] text-slate-400 block truncate">
                                Drużyna: {player.teams?.name || 'Nieznana'}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            <Link href="/regulamin" className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors shrink-0">
              <Whistle className="w-3.5 h-3.5 text-sky-600" />
              <span>Regulamin rozgrywek</span>
            </Link>

            {/* Przycisk Menu Mobilnego - widoczny tylko na mobile */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors bg-slate-100 rounded-lg shrink-0"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* DOLNY PASEK NAWIGACJI – TYLKO DESKTOP (ukryty na telefonach) */}
      <div className="hidden lg:block bg-slate-50/80 border-t border-slate-200/60">
        <div className="max-w-[1750px] mx-auto flex items-center justify-between h-12 px-8 lg:px-14">
          <nav className="flex items-center space-x-1 text-xs font-semibold uppercase h-full tracking-wider">
            <Link 
              href="/" 
              className={`px-5 h-full flex items-center transition-colors ${
                isActive('/') 
                  ? 'text-sky-600 border-b-2 border-sky-600 font-bold bg-white' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Strona główna
            </Link>
            <Link 
              href="/terminarz" 
              className={`px-5 h-full flex items-center transition-colors ${
                isActive('/terminarz') 
                  ? 'text-sky-600 border-b-2 border-sky-600 font-bold bg-white' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Terminarz
            </Link>
            <Link 
              href="/tabela" 
              className={`px-5 h-full flex items-center transition-colors ${
                isActive('/tabela') 
                  ? 'text-sky-600 border-b-2 border-sky-600 font-bold bg-white' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tabela
            </Link>
            <Link 
              href="/zespoly" 
              className={`px-5 h-full flex items-center transition-colors ${
                isActive('/zespoly') 
                  ? 'text-sky-600 border-b-2 border-sky-600 font-bold bg-white' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Zespoły
            </Link>
            <Link 
              href="/statystyki" 
              className={`px-5 h-full flex items-center transition-colors ${
                isActive('/statystyki') 
                  ? 'text-sky-600 border-b-2 border-sky-600 font-bold bg-white' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Statystyki
            </Link>
            <Link 
              href="/kontakt" 
              className={`px-5 h-full flex items-center transition-colors ${
                isActive('/kontakt') 
                  ? 'text-sky-600 border-b-2 border-sky-600 font-bold bg-white' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kontakt
            </Link>
          </nav>
        </div>
      </div>

      {/* MENU MOBILNE – TYLKO MOBILE (wyskakujące po kliknięciu w hamburgera) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 sm:px-6 py-5 space-y-4 shadow-2xl">
          
          {/* Mobilna wyszukiwarka */}
          <div className="relative w-full">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj gracza, drużyny..."
                className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
            </div>

            {/* Wyniki wyszukiwania w telefonie */}
            {isSearchOpen && hasResults && (
              <div className="mt-2 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-md max-h-60 overflow-y-auto">
                {teamResults.length > 0 && (
                  <div>
                    <div className="p-1.5 bg-slate-100 text-[9px] font-bold text-slate-400 uppercase px-3">Drużyny</div>
                    {teamResults.map((team) => (
                      <button
                        key={`m-team-${team.id}`}
                        onClick={() => {
                          router.push(`/zespoly/${team.id}`)
                          setIsSearchOpen(false)
                          setMobileMenuOpen(false)
                          setSearchQuery('')
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-200/60 text-left text-xs font-bold text-slate-800"
                      >
                        <Shield className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span className="truncate">{team.name}</span>
                      </button>
                    ))}
                  </div>
                )}
                {playerResults.length > 0 && (
                  <div>
                    <div className="p-1.5 bg-slate-100 text-[9px] font-bold text-slate-400 uppercase px-3">Zawodnicy</div>
                    {playerResults.map((player) => (
                      <button
                        key={`m-player-${player.id}`}
                        onClick={() => {
                          router.push(`/zawodnik/${player.id}`)
                          setIsSearchOpen(false)
                          setMobileMenuOpen(false)
                          setSearchQuery('')
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-200/60 text-left text-xs font-bold text-slate-800"
                      >
                        <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{player.first_name} {player.last_name} ({player.teams?.name})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Linki nawigacyjne w menu mobilnym */}
          <nav className="flex flex-col space-y-1 text-xs font-semibold uppercase tracking-wider">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`p-2.5 rounded-lg transition-colors ${isActive('/') ? 'text-sky-600 bg-sky-50 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              Strona główna
            </Link>
            <Link href="/terminarz" onClick={() => setMobileMenuOpen(false)} className={`p-2.5 rounded-lg transition-colors ${isActive('/terminarz') ? 'text-sky-600 bg-sky-50 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              Terminarz
            </Link>
            <Link href="/tabela" onClick={() => setMobileMenuOpen(false)} className={`p-2.5 rounded-lg transition-colors ${isActive('/tabela') ? 'text-sky-600 bg-sky-50 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              Tabela
            </Link>
            <Link href="/zespoly" onClick={() => setMobileMenuOpen(false)} className={`p-2.5 rounded-lg transition-colors ${isActive('/zespoly') ? 'text-sky-600 bg-sky-50 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              Zespoły
            </Link>
            <Link href="/statystyki" onClick={() => setMobileMenuOpen(false)} className={`p-2.5 rounded-lg transition-colors ${isActive('/statystyki') ? 'text-sky-600 bg-sky-50 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              Statystyki
            </Link>
            <Link href="/kontakt" onClick={() => setMobileMenuOpen(false)} className={`p-2.5 rounded-lg transition-colors ${isActive('/kontakt') ? 'text-sky-600 bg-sky-50 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              Kontakt
            </Link>
            <Link href="/regulamin" onClick={() => setMobileMenuOpen(false)} className="p-2.5 text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-2 border-t border-slate-100 mt-2 pt-3">
              <Whistle className="w-4 h-4 text-sky-600" /> Regulamin rozgrywek
            </Link>
          </nav>
        </div>
      )}

    </header>
  )
}