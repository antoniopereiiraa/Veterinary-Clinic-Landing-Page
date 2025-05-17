import React, { useState } from 'react';
import {
  PawPrint,
  Syringe,
  Stethoscope,
  Clock,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Mail,
  MapIcon as WhatsappIcon,
  Menu,
  X,
  CheckCircle2,
} from 'lucide-react';
import { isWithinBusinessHours } from './utils/dateTime';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface AppointmentForm {
  name: string;
  petName: string;
  date: string;
  time: string;
  notes: string;
}

function App() {
  const [form, setForm] = useState<AppointmentForm>({
    name: '',
    petName: '',
    date: '',
    time: '',
    notes: '',
  });

  const [error, setError] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services: Service[] = [
    {
      icon: <Stethoscope className="w-8 h-8 text-blue-600" />,
      title: 'Consultas de Rotina',
      description: 'Acompanhamento completo da saúde do seu pet com profissionais especializados.'
    },
    {
      icon: <Syringe className="w-8 h-8 text-blue-600" />,
      title: 'Vacinação',
      description: 'Programa completo de vacinação para cães e gatos.'
    },
    {
      icon: <PawPrint className="w-8 h-8 text-blue-600" />,
      title: 'Cirurgias',
      description: 'Procedimentos cirúrgicos com equipamentos modernos e equipe especializada.'
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-blue-600" />,
      title: 'Exames Laboratoriais',
      description: 'Diagnósticos precisos com resultados rápidos.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = isWithinBusinessHours(form.date, form.time);
    if (!validation.isValid) {
      setError(validation.message || 'Horário inválido');
      return;
    }

    const message = `Olá! Gostaria de agendar uma consulta:\n
Nome: ${form.name}
Pet: ${form.petName}
Data: ${form.date}
Horário: ${form.time}
Observações: ${form.notes}`;

    const whatsappUrl = `https://wa.me/5586995607681?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-blue-900 z-50 md:hidden">
          <div className="flex justify-end p-4">
            <button onClick={() => setIsMenuOpen(false)} className="text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-8 mt-16">
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-white text-xl">Serviços</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-white text-xl">Sobre</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-white text-xl">Contato</a>
            <button
              onClick={() => {
                document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="bg-white text-blue-900 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition"
            >
              Agendar Consulta
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80"
            alt="Veterinary clinic"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/70" />
        </div>
        
        <nav className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <PawPrint className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">PetCare</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-white hover:text-blue-200">Serviços</a>
            <a href="#about" className="text-white hover:text-blue-200">Sobre</a>
            <a href="#contact" className="text-white hover:text-blue-200">Contato</a>
            <button
              onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-900 px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition"
            >
              Agendar Consulta
            </button>
          </div>
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="md:hidden text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>

        <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Cuidado especializado para seu melhor amigo
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8">
              Oferecemos atendimento veterinário de excelência com amor e dedicação para seu pet
            </p>
            <button
              onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition"
            >
              Agende uma Consulta
            </button>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Sobre Nossa Clínica</h2>
              <p className="text-gray-600 mb-6">
                Com mais de 15 anos de experiência, nossa clínica veterinária é referência em cuidados com animais.
                Contamos com uma equipe altamente qualificada e instalações modernas para oferecer o melhor
                atendimento para seu pet.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Equipe especializada e dedicada</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Equipamentos de última geração</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Atendimento humanizado</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 lg:mt-0">
              <img
                src="https://imgs.search.brave.com/hZMnRdI5Wpv9rnKASseX7yxx-t1o0UBegCSlLutsIws/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZXRj/YXJlLmNvbS5ici93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8w/NC90b3NzZS1kZS1j/YWNob3Jyby1vdS1j/YWNob3Jyby1lbmdh/c2dhZG8uanBn?auto=format&fit=crop&q=80"
                alt="Veterinary team"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="appointment" className="py-16 sm:py-20 bg-blue-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Agende uma Consulta</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Pet</label>
                <input
                  type="text"
                  name="petName"
                  value={form.petName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleInputChange}
                  min={today}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Horário</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleInputChange}
                  step="900" // 15-minute intervals
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <div className="mt-6 text-sm text-gray-600">
              <p className="font-medium mb-2">Horário de Funcionamento:</p>
              <ul className="space-y-1">
                <li>Segunda a Sexta: 08h às 19h</li>
                <li>Sábado: 08h às 14h</li>
                <li>Domingo: Fechado</li>
              </ul>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center space-x-2"
            >
              <WhatsappIcon className="w-5 h-5" />
              <span>Agendar via WhatsApp</span>
            </button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Horário de Funcionamento</h3>
              <p className="text-gray-600">
                Segunda a Sexta: 8h às 19h<br />
                Sábado: 8h às 14h<br />
                Domingo: Fechado
              </p>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Contato</h3>
              <p className="text-gray-600">
                (86) 99560-7681<br />
                contato@petcare.com.br
              </p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Localização</h3>
              <p className="text-gray-600">
                Rua das Flores, 123<br />
                São Paulo - SP
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <PawPrint className="w-8 h-8" />
                <span className="text-2xl font-bold">PetCare</span>
              </div>
              <p className="text-blue-200">
                Cuidando do seu pet com amor e dedicação
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-blue-200 hover:text-white">Serviços</a></li>
                <li><a href="#about" className="text-blue-200 hover:text-white">Sobre</a></li>
                <li><a href="#appointment" className="text-blue-200 hover:text-white">Agendamento</a></li>
                <li><a href="#contact" className="text-blue-200 hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>(86) 99560-7681</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contato@petcare.com.br</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Rua das Flores, 123</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-200 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  <WhatsappIcon className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 PetCare. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
