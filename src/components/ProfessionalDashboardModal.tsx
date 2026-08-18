import { useState } from 'react';
import { X, Calendar, DollarSign, Clock, Users, ShieldCheck, CheckCircle, AlertCircle, Settings, FileText, ChevronRight } from 'lucide-react';

interface ProfessionalDashboardModalProps {
  onClose: () => void;
}

export function ProfessionalDashboardModal({ onClose }: ProfessionalDashboardModalProps) {
  const [activeTab, setActiveTab] = useState<'turnos' | 'servicios' | 'plan'>('turnos');

  const mockBookings = [
    {
      id: 'BK-102',
      patient: 'Mariana Gómez',
      dni: '36.890.112',
      phone: '261-5559812',
      date: 'Hoy, 16:30 hs',
      service: 'Consulta Cardiológica General',
      deposit: 6000,
      total: 18000,
      status: 'CONFIRMED'
    },
    {
      id: 'BK-103',
      patient: 'Esteban Lucero',
      dni: '31.234.901',
      phone: '261-5553322',
      date: 'Mañana, 17:00 hs',
      service: 'Electrocardiograma (ECG)',
      deposit: 7000,
      total: 22000,
      status: 'CONFIRMED'
    },
    {
      id: 'BK-104',
      patient: 'Valeria Rivas',
      dni: '40.112.567',
      phone: '261-5558877',
      date: 'Viernes 21 Ago, 18:00 hs',
      service: 'Apto Físico Deportivo',
      deposit: 8000,
      total: 25000,
      status: 'PENDING'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#F8FAFC] rounded-3xl w-full max-w-4xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="p-6 bg-white border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1E293B] text-white rounded-2xl flex items-center justify-center font-black text-base shadow-sm">
              MQ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-[#1F2937]">Panel del Profesional</h2>
                <span className="text-[10px] font-black uppercase bg-[#0081C9] text-white px-2 py-0.5 rounded-full">
                  PLAN DESTACADO
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">Dr. Martín Quiroga • Consultorio Ciudad de Mendoza</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-white px-6 gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('turnos')}
            className={`py-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'turnos' ? 'border-[#0081C9] text-[#0081C9]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Turnos y Agenda (3 hoy)</span>
          </button>
          <button
            onClick={() => setActiveTab('servicios')}
            className={`py-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'servicios' ? 'border-[#0081C9] text-[#0081C9]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Aranceles & Señas</span>
          </button>
          <button
            onClick={() => setActiveTab('plan')}
            className={`py-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'plan' ? 'border-[#0081C9] text-[#0081C9]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Suscripción & Mercado Pago</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400">Turnos este Mes</span>
              <p className="text-2xl font-black text-[#1F2937] mt-1">28</p>
              <span className="text-[10px] text-green-600 font-bold">+18% vs mes anterior</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400">Señas Cobradas (MP)</span>
              <p className="text-2xl font-black text-[#0081C9] mt-1">$168.000</p>
              <span className="text-[10px] text-gray-400">100% acreditado</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400">Tasa de Asistencia</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">96%</p>
              <span className="text-[10px] text-emerald-600 font-bold">Sin ausencias sorpresa</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400">Visitas a la Ficha</span>
              <p className="text-2xl font-black text-[#1F2937] mt-1">540</p>
              <span className="text-[10px] text-gray-400">Ciudad de Mendoza</span>
            </div>
          </div>

          {activeTab === 'turnos' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-[#1F2937]">Próximas Reservas Confirmadas</h3>
                  <p className="text-xs text-gray-500">Pacientes con seña acreditada en tu cuenta de Mercado Pago</p>
                </div>
                <button className="bg-[#0081C9] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700">
                  + Bloquear Horario
                </button>
              </div>

              <div className="space-y-3">
                {mockBookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl border border-gray-100 bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1F2937]">{b.patient}</span>
                        <span className="text-[10px] text-gray-400">DNI: {b.dni}</span>
                        {b.status === 'CONFIRMED' ? (
                          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-md font-bold">
                            SEÑA PAGADA (${b.deposit.toLocaleString('es-AR')})
                          </span>
                        ) : (
                          <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md font-bold">
                            PENDIENTE PAGO
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 font-medium">{b.service}</p>
                      <p className="text-xs text-[#0081C9] font-bold">{b.date}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/549${b.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 flex items-center gap-1.5"
                      >
                        WhatsApp
                      </a>
                      <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-300">
                        Detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'servicios' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-[#1F2937]">Configuración de Precios y Señas</h3>
              <p className="text-xs text-gray-500">Definí el valor total de tu consulta y cuánto debe abonar el paciente con Mercado Pago para reservar.</p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#1F2937]">Consulta General</p>
                    <p className="text-xs text-gray-500">Duración: 30 minutos</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-bold text-gray-700">Total: $18.000</span>
                    <span className="font-black text-[#0081C9] bg-blue-50 px-2.5 py-1 rounded-lg">Seña MP: $6.000</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#1F2937]">Electrocardiograma (ECG)</p>
                    <p className="text-xs text-gray-500">Duración: 45 minutos</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-bold text-gray-700">Total: $22.000</span>
                    <span className="font-black text-[#0081C9] bg-blue-50 px-2.5 py-1 rounded-lg">Seña MP: $7.000</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'plan' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#1E293B] to-[#0F172A] text-white rounded-2xl">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-[#72AEE6]">Tu Suscripción</span>
                  <h3 className="text-xl font-bold mt-1">Plan Profesional Destacado</h3>
                  <p className="text-xs text-gray-300 mt-1">Renovación automática el 01 de Septiembre ($29.900 ARS/mes)</p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-green-500 text-white font-black px-3 py-1 rounded-full">AL DÍA</span>
                </div>
              </div>

              <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  <div>
                    <p className="text-xs font-bold text-emerald-900">Mercado Pago Connect Vinculado</p>
                    <p className="text-[11px] text-emerald-700">Las señas de tus pacientes van directo a tu cuenta de MP sin intermediarios.</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-emerald-800 underline">Gestionar</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
