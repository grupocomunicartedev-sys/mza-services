import { useState } from 'react';
import { Professional, ServiceItem } from '../types';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Phone, Mail, User, CreditCard } from 'lucide-react';

interface BookingModalProps {
  professional: Professional;
  onClose: () => void;
}

const AVAILABLE_TIMES = ['09:00', '10:30', '11:45', '15:00', '16:30', '18:00'];
const AVAILABLE_DATES = [
  { day: 'Mañana', date: 'Jueves 20 Ago' },
  { day: 'Viernes', date: '21 Ago' },
  { day: 'Lunes', date: '24 Ago' },
  { day: 'Martes', date: '25 Ago' }
];

export function BookingModal({ professional, onClose }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem>(professional.services[0]);
  const [selectedDate, setSelectedDate] = useState(AVAILABLE_DATES[0].date);
  const [selectedTime, setSelectedTime] = useState(AVAILABLE_TIMES[0]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dni: '',
    notes: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleNextToForm = () => {
    setStep(2);
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setStep(3);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0081C9] text-white flex items-center justify-center font-bold text-sm">
              {professional.avatarText}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Reserva de Turno</p>
              <h3 className="text-lg font-bold text-[#1F2937] leading-tight">{professional.name}</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1">
          <div 
            className="bg-[#0081C9] h-1 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-grow">
          {/* STEP 1: Servicio, Fecha y Horario */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  1. Seleccioná el Servicio / Motivo
                </label>
                <div className="space-y-2">
                  {professional.services.map((svc) => (
                    <div
                      key={svc.name}
                      onClick={() => setSelectedService(svc)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedService.name === svc.name 
                          ? 'border-[#0081C9] bg-blue-50/50 shadow-sm' 
                          : 'border-gray-100 hover:border-gray-200 bg-white'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-bold text-[#1F2937]">{svc.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Seña requerida: ${svc.deposit.toLocaleString('es-AR')}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-[#0081C9]">${svc.price.toLocaleString('es-AR')}</span>
                        <p className="text-[10px] text-gray-400">Total consulta</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  2. Fecha disponible
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AVAILABLE_DATES.map((item) => (
                    <button
                      key={item.date}
                      type="button"
                      onClick={() => setSelectedDate(item.date)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        selectedDate === item.date
                          ? 'border-[#0081C9] bg-[#0081C9] text-white shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                      }`}
                    >
                      <span className="block text-[10px] uppercase font-bold opacity-80">{item.day}</span>
                      <span className="block text-xs font-black mt-0.5">{item.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  3. Horarios disponibles en {professional.zoneLabel}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {AVAILABLE_TIMES.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                        selectedTime === time
                          ? 'border-[#0081C9] bg-blue-50 text-[#0081C9]'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {time} hs
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleNextToForm}
                  className="w-full bg-[#0081C9] text-white font-bold py-3.5 rounded-2xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
                >
                  <span>Continuar con mis datos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Datos de Contacto */}
          {step === 2 && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#1F2937]">{selectedService.name}</span>
                  <p className="text-gray-500">{selectedDate} a las {selectedTime} hs</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  className="text-[#0081C9] font-bold hover:underline"
                >
                  Cambiar
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Nombre y Apellido completo *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    required
                    type="text"
                    placeholder="Ej. Valentina Morales"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0081C9] focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">WhatsApp / Teléfono *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      required
                      type="tel"
                      placeholder="261-155123456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0081C9] focus:bg-white outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Te llegará el recordatorio por WhatsApp</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Email de contacto *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      required
                      type="email"
                      placeholder="nombre@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0081C9] focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">DNI (para facturación y ficha)</label>
                <input
                  type="text"
                  placeholder="Sin puntos, ej: 38450123"
                  value={formData.dni}
                  onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0081C9] focus:bg-white outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3.5 rounded-2xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0081C9] text-white font-bold py-3.5 rounded-2xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
                >
                  <span>Ir a pagar seña</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Pago de Seña con Mercado Pago */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-[#72AEE6]/15 rounded-3xl p-5 border border-[#72AEE6]/30">
                <div className="flex items-center gap-2 text-[#0081C9] font-bold text-xs mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Reserva protegida por Seña Segura</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Para confirmar tu turno con <b>{professional.name}</b> en <b>{professional.address}</b>, aboná la seña oficial. El saldo restante (${(selectedService.price - selectedService.deposit).toLocaleString('es-AR')}) lo cancelás el día de la consulta.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Servicio:</span>
                  <span className="font-bold text-[#1F2937]">{selectedService.name}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Fecha y Hora:</span>
                  <span className="font-bold text-[#1F2937]">{selectedDate} - {selectedTime} hs</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Paciente:</span>
                  <span className="font-bold text-[#1F2937]">{formData.name || 'Paciente'}</span>
                </div>
                <div className="border-t border-gray-200 my-2 pt-2 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-[#1F2937]">Monto de la Seña a Pagar:</span>
                  <span className="text-2xl font-black text-[#0081C9]">${selectedService.deposit.toLocaleString('es-AR')}</span>
                </div>
              </div>

              {/* Botón Mercado Pago */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleConfirmPayment}
                  className="w-full bg-[#009EE3] hover:bg-[#0087c2] text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-md text-sm disabled:opacity-50"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>
                    {isProcessing ? 'Procesando pago en Mercado Pago...' : `Pagar $${selectedService.deposit.toLocaleString('es-AR')} con Mercado Pago`}
                  </span>
                </button>
                <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 font-medium">
                  <span>🔒 Débito / Crédito / Dinero en cuenta</span>
                  <span>•</span>
                  <span>Sin costo adicional</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmación Exitosa */}
          {step === 4 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm animate-in zoom-in-50 duration-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  Turno Confirmado con Éxito
                </span>
                <h3 className="text-2xl font-black text-[#1F2937] mt-3">¡Te esperamos, {formData.name || 'Paciente'}!</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  Hemos enviado el comprobante de pago de seña a <b>{formData.email || 'tu correo'}</b> y te escribiremos por WhatsApp 24 hs antes.
                </p>
              </div>

              <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#1F2937]">
                  <Calendar className="w-4 h-4 text-[#0081C9]" />
                  <span>{selectedDate} a las {selectedTime} hs</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Llegar 10 minutos antes con DNI</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>Lugar: {professional.address} ({professional.zoneLabel})</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${professional.whatsapp}?text=Hola%20${encodeURIComponent(professional.name)},%20acabo%20de%20reservar%20mi%20turno%20para%20el%20${encodeURIComponent(selectedDate)}%20a%20las%20${encodeURIComponent(selectedTime)}%20hs.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Abrir WhatsApp del Consultorio</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-[#1F2937] text-white font-bold rounded-xl text-xs hover:bg-black transition-colors"
                >
                  Finalizar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
