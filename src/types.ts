export type ProfessionType = 'medicos' | 'abogados' | 'contadores' | 'escribanos' | 'todos';

export type ZoneType = 'ciudad' | 'godoy-cruz' | 'guaymallen' | 'las-heras' | 'todas';

export interface ServiceItem {
  name: string;
  price: number;
  deposit: number;
}

export interface Professional {
  id: string;
  name: string;
  slug: string;
  profession: 'medicos' | 'abogados' | 'contadores' | 'escribanos';
  professionLabel: string;
  specialty: string;
  zone: 'ciudad' | 'godoy-cruz' | 'guaymallen' | 'las-heras';
  zoneLabel: string;
  address: string;
  rating: number;
  reviewsCount: number;
  consultationFee: number;
  depositFee: number;
  daysAvailable: string;
  hoursAvailable: string;
  services: ServiceItem[];
  bio: string;
  phone: string;
  whatsapp: string;
  badge?: string;
  avatarBg: string;
  avatarText: string;
  avatarImage?: string;
  isFeatured?: boolean;
}

export interface Booking {
  id: string;
  professionalId: string;
  professionalName: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientDni: string;
  date: string;
  time: string;
  serviceName: string;
  totalFee: number;
  depositFee: number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}
