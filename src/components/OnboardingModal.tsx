import { useState } from 'react';
import { X, CheckCircle, ShieldCheck, ArrowRight, ArrowLeft, Stethoscope, Briefcase, MapPin, DollarSign, CreditCard } from 'lucide-react';

interface OnboardingModalProps {
  onClose: () => void;
}

export function OnboardingModal({ onClose }: OnboardingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: '',
    profession: 'medicos',
    specialty: '',
    licenseNumber: '',
    zone: 'ciudad',
    address: '',
    whatsapp: '',
    consultationFee: '18000',
    depositFee: '6000'
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#F8FAFC]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#0081C9] bg-blue-50 px-2 py-0.5 rounded-full">
              Paso {step} de 3
            </span>
            <h3 className="text-lg font-bold text-[#1F2937] mt-1">Alta de Profesional en Mendoza</h3>
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
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-grow">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#1F2937]">¡Solicitud Recibida!</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Tu perfil como <b>{formData.name}</b> está siendo validado con el colegio correspondiente. Te enviamos los datos de acceso a tu WhatsApp <b>{formData.whatsapp}</b>.
              </p>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-xs text-left max-w-md mx-auto">
                <p className="font-bold text-[#0081C9] mb-1">🎁 Primer mes 100% bonificado</p>
                <p className="text-gray-600">Comenzá a recibir pacientes y cobrar señas sin costo fijo inicial.</p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-[#1F2937] text-white font-bold py-3.5 rounded-2xl text-xs hover:bg-black transition-colors"
              >
                Ir a la Página Principal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* STEP 1: Datos Personales y Profesión */}
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-500 font-medium">Completá tus datos oficiales para validar tu matrícula profesional en Mendoza.</p>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nombre y Apellido (o Nombre del Estudio) *</label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Dr. Carlos Benítez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0081C9] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Profesión *</label>
                      <select
                        value={formData.profession}
                        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none cursor-pointer"
                      >
                        <option value="medicos">Médico / Salud</option>
                        <option value="abogados">Abogado</option>
                        <option value="contadores">Contador Público</option>
                        <option value="escribanos">Escribano</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Matrícula Provincial *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ej. Mat. 7842"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0081C9] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Especialidad Principal *</label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Pediatría / Derecho Tributario / Balances"
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0081C9] outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (formData.name && formData.specialty) setStep(2);
                    }}
                    className="w-full bg-[#0081C9] text-white font-bold py-3.5 rounded-2xl text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Continuar a Ubicación y Horarios</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 2: Ubicación & Contacto */}
              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-500 font-medium">Indicá dónde atendés a tus pacientes o clientes en el Gran Mendoza.</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Departamento / Zona *</label>
                      <select
                        value={formData.zone}
                        onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none cursor-pointer"
                      >
                        <option value="ciudad">Mendoza (Ciudad)</option>
                        <option value="godoy-cruz">Godoy Cruz</option>
                        <option value="guaymallen">Guaymallén</option>
                        <option value="las-heras">Las Heras</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp de Contacto *</label>
                      <input
                        required
                        type="tel"
                        placeholder="261-5551234"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Dirección del Consultorio / Estudio *</label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Av. San Martín 1250, Piso 2, Dpto 4"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-3.5 rounded-2xl border border-gray-200 text-gray-700 font-bold text-xs"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (formData.address && formData.whatsapp) setStep(3);
                      }}
                      className="flex-1 bg-[#0081C9] text-white font-bold py-3.5 rounded-2xl text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Continuar a Aranceles y Seña</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Configuración de Seña & Mercado Pago */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-[#72AEE6]/15 p-4 rounded-2xl border border-[#72AEE6]/30 text-xs">
                    <p className="font-bold text-[#0081C9] mb-1">Cobro de Seña Automático</p>
                    <p className="text-gray-600 leading-relaxed">
                      El paciente abona la seña con Mercado Pago al momento de agendar. Los fondos van directamente a tu cuenta de Mercado Pago.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Valor Consulta ($ ARS)</label>
                      <input
                        type="number"
                        value={formData.consultationFee}
                        onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-[#1F2937] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Seña Requerida ($ ARS)</label>
                      <input
                        type="number"
                        value={formData.depositFee}
                        onChange={(e) => setFormData({ ...formData, depositFee: e.target.value })}
                        className="w-full px-4 py-3 bg-blue-50 border border-[#0081C9] rounded-xl text-sm font-black text-[#0081C9] outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-600 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#0081C9]" />
                    <span>Conectarás tu cuenta de Mercado Pago en el siguiente paso de validación.</span>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-3.5 rounded-2xl border border-gray-200 text-gray-700 font-bold text-xs"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#1E293B] text-white font-bold py-3.5 rounded-2xl text-xs hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Finalizar y Activar Registro</span>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
