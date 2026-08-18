/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, MapPin, Star, Calendar, User, Scale, Stethoscope, Calculator, Briefcase, CreditCard, ShieldCheck, CheckCircle2, ChevronRight, Clock, HelpCircle, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { MOCK_PROFESSIONALS } from './data/mockProfessionals';
import { Professional, ProfessionType, ZoneType } from './types';
import { BookingModal } from './components/BookingModal';
import { ProfessionalDashboardModal } from './components/ProfessionalDashboardModal';
import { OnboardingModal } from './components/OnboardingModal';

export default function App() {
  const [selectedProfession, setSelectedProfession] = useState<ProfessionType>('todos');
  const [selectedZone, setSelectedZone] = useState<ZoneType>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [bookingProfessional, setBookingProfessional] = useState<Professional | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Filter logic
  const filteredProfessionals = useMemo(() => {
    return MOCK_PROFESSIONALS.filter((prof) => {
      const matchProfession = selectedProfession === 'todos' || prof.profession === selectedProfession;
      const matchZone = selectedZone === 'todas' || prof.zone === selectedZone;
      const matchQuery = 
        !searchQuery || 
        prof.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        prof.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.services.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchProfession && matchZone && matchQuery;
    });
  }, [selectedProfession, selectedZone, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#1F2937]">
      
      {/* Top Banner Notice */}
      <div className="bg-[#1E293B] text-white text-[11px] py-2 px-4 text-center font-medium">
        <span>📍 Portal Exclusivo para el Gran Mendoza (Ciudad, Godoy Cruz, Guaymallén y Las Heras)</span>
        <span className="mx-2 opacity-40">|</span>
        <span className="text-[#72AEE6] font-bold">🔒 Señas protegidas por Mercado Pago</span>
      </div>

      {/* Main Header / Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-30 px-4 md:px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setSelectedProfession('todos'); setSelectedZone('todas'); setSearchQuery(''); }}>
            <div className="w-10 h-10 bg-[#0081C9] rounded-xl flex items-center justify-center shadow-md shadow-[#0081C9]/20">
              <MapPin className="text-white w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-[#1F2937]">Turnos<span className="text-[#0081C9]">Mendoza</span></span>
                <span className="bg-blue-50 text-[#0081C9] text-[9px] font-black uppercase px-1.5 py-0.5 rounded">PMV</span>
              </div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Red de Profesionales Locales</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="text-xs font-bold text-gray-700 hover:text-[#0081C9] px-3 py-2 rounded-xl transition-colors hidden sm:block"
            >
              ¿Sos Profesional? Sumate
            </button>
            <button
              onClick={() => setIsDashboardOpen(true)}
              className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#0f172a] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-[#72AEE6]" />
              <span>Panel Profesional</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Bento Grid Container */}
      <main className="max-w-6xl mx-auto w-full px-4 md:px-6 py-6 flex-grow space-y-6">
        
        {/* Bento Row 1: Search Hero + Value Props + MP Badge */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          
          {/* Card 1 (Cols 2): Héroe + Buscador Dinámico */}
          <div className="col-span-1 md:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0081C9] px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-3">
                <Sparkles className="w-3 h-3" />
                <span>Turnos verificados en Mendoza</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1F2937] leading-tight">
                Encontrá al profesional que necesitás hoy.
              </h1>
              <p className="text-xs text-gray-500 font-medium mt-2 leading-relaxed">
                Médicos, abogados, contadores y escribanos en Ciudad, Godoy Cruz, Guaymallén y Las Heras. Reservá tu turno online y asegurá tu cita con seña oficial.
              </p>
            </div>

            {/* Interactive Search Component */}
            <div className="mt-6 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Profession Dropdown */}
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <select
                    value={selectedProfession}
                    onChange={(e) => setSelectedProfession(e.target.value as ProfessionType)}
                    className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-2xl text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-[#0081C9] cursor-pointer"
                  >
                    <option value="todos">Todas las Profesiones</option>
                    <option value="medicos">Médicos y Salud</option>
                    <option value="abogados">Abogados</option>
                    <option value="contadores">Contadores Públicos</option>
                    <option value="escribanos">Escribanos Notariales</option>
                  </select>
                </div>

                {/* Zone Dropdown */}
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value as ZoneType)}
                    className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-2xl text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-[#0081C9] cursor-pointer"
                  >
                    <option value="todas">Gran Mendoza (Todas)</option>
                    <option value="ciudad">Ciudad de Mendoza</option>
                    <option value="godoy-cruz">Godoy Cruz</option>
                    <option value="guaymallen">Guaymallén</option>
                    <option value="las-heras">Las Heras</option>
                  </select>
                </div>
              </div>

              {/* Free Text Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar por especialidad, servicio o nombre (ej: cardiología, despidos, balances)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-2xl text-xs font-medium text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#0081C9]"
                />
              </div>

              {/* Reset filter tag if active */}
              {(selectedProfession !== 'todos' || selectedZone !== 'todas' || searchQuery) && (
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-gray-500">
                    Filtros activos: <b>{filteredProfessionals.length}</b> profesionales encontrados
                  </span>
                  <button
                    onClick={() => { setSelectedProfession('todos'); setSelectedZone('todas'); setSearchQuery(''); }}
                    className="text-[#0081C9] font-bold hover:underline"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Card 2 (Cols 1): Tarjeta Oscura para Portal Profesional */}
          <div className="col-span-1 bg-[#1E293B] rounded-3xl p-6 text-white flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-white/10 rounded-2xl">
                <Briefcase className="w-5 h-5 text-[#72AEE6]" />
              </div>
              <span className="text-[9px] font-black uppercase bg-[#0081C9] text-white px-2 py-1 rounded-md tracking-wider">
                PORTAL PROFESIONAL
              </span>
            </div>

            <div className="my-4">
              <h3 className="text-lg font-black text-white leading-tight">
                ¿Atendés pacientes o clientes en Mendoza?
              </h3>
              <p className="text-xs text-gray-300 font-medium mt-2 leading-relaxed">
                Automatizá tu agenda, recibí reservas confirmadas y eliminá las ausencias imprevistas cobrando seña con Mercado Pago.
              </p>
            </div>

            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="w-full bg-white hover:bg-gray-100 text-[#1E293B] py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Dar de alta mi Consultorio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3 (Cols 1): Tarjeta Punteada de Mercado Pago */}
          <div className="col-span-1 bg-[#72AEE6]/15 rounded-3xl p-6 border-2 border-dashed border-[#72AEE6]/40 flex flex-col items-center justify-between text-center">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#0081C9]">
              <CreditCard className="w-6 h-6" />
            </div>

            <div className="my-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0081C9]">
                SEÑAS Y PAGOS SEGUROS
              </span>
              <h4 className="text-sm font-extrabold text-[#1F2937] mt-1">
                Garantía Mercado Pago
              </h4>
              <p className="text-[11px] text-gray-500 font-medium mt-1 leading-normal">
                Aboná la seña oficial con débito, crédito o dinero en cuenta. El saldo restante lo cancelás el día del turno.
              </p>
            </div>

            <div className="w-full bg-white/80 py-2 px-3 rounded-xl border border-blue-100 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sin costos sorpresa</span>
            </div>
          </div>
        </div>

        {/* Quick Filter Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedProfession('todos')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedProfession === 'todos'
                ? 'bg-[#0081C9] text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            🌟 Todos los Profesionales
          </button>
          <button
            onClick={() => setSelectedProfession('medicos')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedProfession === 'medicos'
                ? 'bg-[#0081C9] text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Médicos & Salud</span>
          </button>
          <button
            onClick={() => setSelectedProfession('abogados')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedProfession === 'abogados'
                ? 'bg-[#0081C9] text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Abogados</span>
          </button>
          <button
            onClick={() => setSelectedProfession('contadores')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedProfession === 'contadores'
                ? 'bg-[#0081C9] text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Contadores</span>
          </button>
          <button
            onClick={() => setSelectedProfession('escribanos')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedProfession === 'escribanos'
                ? 'bg-[#0081C9] text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Escribanos</span>
          </button>
        </div>

        {/* Section: List of Professionals in Bento Grid Layout */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#1F2937]">
                Profesionales Disponibles en Mendoza
              </h2>
              <p className="text-xs text-gray-500">
                Seleccioná tu turno y aboná la seña para asegurar tu lugar
              </p>
            </div>
            <span className="text-xs font-bold text-[#0081C9] bg-blue-50 px-3 py-1 rounded-xl">
              {filteredProfessionals.length} disponibles
            </span>
          </div>

          {filteredProfessionals.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-3xl p-10 border border-gray-100 text-center space-y-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-[#1F2937]">No encontramos profesionales con ese criterio</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Probá cambiando la zona o buscando por términos más generales como "salud", "legal" o "impuestos".
              </p>
              <button
                onClick={() => { setSelectedProfession('todos'); setSelectedZone('todas'); setSearchQuery(''); }}
                className="bg-[#0081C9] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors inline-block mt-2"
              >
                Ver todos los profesionales
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {filteredProfessionals.map((prof) => {
                const isTwoCols = prof.isFeatured;

                return (
                  <div
                    key={prof.id}
                    className={`bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between hover:border-gray-200 transition-all hover:shadow-md ${
                      isTwoCols ? 'col-span-1 md:col-span-2' : 'col-span-1 md:col-span-1'
                    }`}
                  >
                    {/* Header Card */}
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm text-[#0081C9] flex-shrink-0 ${prof.avatarBg}`}>
                            {prof.avatarText}
                          </div>
                          <div>
                            {prof.badge && (
                              <span className="bg-green-100 text-green-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1">
                                {prof.badge}
                              </span>
                            )}
                            <h3 className="text-base font-extrabold text-[#1F2937] leading-tight">
                              {prof.name}
                            </h3>
                            <p className="text-xs font-bold text-[#0081C9] mt-0.5">
                              {prof.specialty}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-xl">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-xs font-black text-gray-800">{prof.rating}</span>
                        </div>
                      </div>

                      {/* Location & Times Info */}
                      <div className="space-y-1.5 text-xs text-gray-600 mb-4 bg-[#F8FAFC] p-3 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#0081C9] flex-shrink-0" />
                          <span className="font-bold text-[#1F2937] truncate">{prof.zoneLabel}</span>
                          <span className="text-[10px] text-gray-400">({prof.address})</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <span>{prof.daysAvailable} ({prof.hoursAvailable})</span>
                        </div>
                      </div>

                      {/* Services / Fees preview */}
                      <div className="mb-4">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="text-gray-500 font-medium">Consulta particular:</span>
                          <span className="font-extrabold text-[#1F2937]">${prof.consultationFee.toLocaleString('es-AR')}</span>
                        </div>
                        <div className="flex justify-between items-baseline text-xs mt-1">
                          <span className="text-gray-500 font-medium">Seña Mercado Pago:</span>
                          <span className="font-black text-[#0081C9] bg-blue-50 px-2 py-0.5 rounded-md">
                            ${prof.depositFee.toLocaleString('es-AR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Action Button */}
                    <button
                      onClick={() => setBookingProfessional(prof)}
                      className="w-full bg-[#0081C9] hover:bg-blue-700 text-white py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm mt-2"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Ver Disponibilidad & Reservar</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Section: Cómo Funciona (Bento 3 columns) */}
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#0081C9] bg-blue-50 px-2.5 py-1 rounded-full">
              SIMPLE & RÁPIDO
            </span>
            <h2 className="text-xl font-black text-[#1F2937] mt-2">¿Cómo reservar tu turno en Mendoza?</h2>
            <p className="text-xs text-gray-500">En 3 simples pasos tenés tu cita asegurada sin intermediarios ni llamadas telefónicas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-[#1E293B] text-white flex items-center justify-center font-black text-xs mb-3">
                1
              </div>
              <h4 className="font-bold text-sm text-[#1F2937]">Elegí el Profesional y Horario</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Buscá por especialidad y departamento (Ciudad, Godoy Cruz, Guaymallén o Las Heras) y seleccioná el horario disponible.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-[#0081C9] text-white flex items-center justify-center font-black text-xs mb-3">
                2
              </div>
              <h4 className="font-bold text-sm text-[#1F2937]">Aboná la Seña con Mercado Pago</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Pagá de forma segura con tu tarjeta o dinero en cuenta. La seña queda descontada del total de la consulta.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs mb-3">
                3
              </div>
              <h4 className="font-bold text-sm text-[#1F2937]">Recibí la Confirmación por WhatsApp</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Te enviamos el comprobante y los recordatorios automáticos 24 hs antes con la dirección exacta del consultorio.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-10 px-4 md:px-6 text-xs text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#0081C9] rounded-lg flex items-center justify-center text-white font-bold text-xs">
              TM
            </div>
            <span className="font-bold text-[#1F2937]">TurnosMendoza © 2026</span>
            <span className="text-gray-300">•</span>
            <span>Ciudad, Las Heras, Godoy Cruz, Guaymallén</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
            <button onClick={() => setIsOnboardingOpen(true)} className="hover:text-[#0081C9]">Sumar mi Consultorio</button>
            <button onClick={() => setIsDashboardOpen(true)} className="hover:text-[#0081C9]">Acceso Profesionales</button>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400 font-normal">Mendoza, Argentina</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {bookingProfessional && (
        <BookingModal
          professional={bookingProfessional}
          onClose={() => setBookingProfessional(null)}
        />
      )}

      {isDashboardOpen && (
        <ProfessionalDashboardModal
          onClose={() => setIsDashboardOpen(false)}
        />
      )}

      {isOnboardingOpen && (
        <OnboardingModal
          onClose={() => setIsOnboardingOpen(false)}
        />
      )}

    </div>
  );
}

