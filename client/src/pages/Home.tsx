import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Wrench, Hammer, Droplet, Zap, Wind, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Home() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceId: "",
    appointmentDate: "",
    description: "",
  });

  const servicesQuery = trpc.services.list.useQuery();
  const contactMutation = trpc.contacts.submit.useMutation();
  const appointmentMutation = trpc.appointments.create.useMutation();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactMutation.mutateAsync(contactForm);
      setContactForm({ name: "", email: "", phone: "", message: "" });
      alert("Mensagem enviada com sucesso!");
    } catch (error) {
      alert("Erro ao enviar mensagem. Tente novamente.");
    }
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const appointmentDate = new Date(appointmentForm.appointmentDate);
      await appointmentMutation.mutateAsync({
        ...appointmentForm,
        appointmentDate,
      });
      setAppointmentForm({
        name: "",
        email: "",
        phone: "",
        serviceId: "",
        appointmentDate: "",
        description: "",
      });
      alert("Agendamento realizado com sucesso!");
    } catch (error) {
      alert("Erro ao agendar. Tente novamente.");
    }
  };

  const services = [
    { id: "1", name: "Pequenos Reparos", description: "Reparos gerais em residências e comércios", icon: Wrench },
    { id: "2", name: "Montagem de Móveis", description: "Montagem profissional de móveis diversos", icon: Hammer },
    { id: "3", name: "Manutenção Hidráulica", description: "Serviços de encanamento e manutenção hidráulica", icon: Droplet },
    { id: "4", name: "Manutenção Elétrica", description: "Instalações e reparos elétricos seguros", icon: Zap },
    { id: "5", name: "Manutenção de Ar Condicionado", description: "Limpeza, manutenção e reparo de AC", icon: Wind },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Broup Alta" className="h-12 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Broup Alta</h1>
              <p className="text-sm text-gray-600">Serviços de Reparo e Manutenção</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#servicos" className="text-gray-700 hover:text-blue-600 transition">Serviços</a>
            <a href="#contato" className="text-gray-700 hover:text-blue-600 transition">Contato</a>
            <a href="#agendamento" className="text-gray-700 hover:text-blue-600 transition">Agendar</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Soluções em Reparo e Manutenção</h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">Profissionais qualificados para resolver seus problemas</p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            <a href="#agendamento">Agendar Serviço Agora</a>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="hover:shadow-lg transition">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="bg-blue-100 p-4 rounded-lg">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <CardTitle className="text-center text-lg">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Entre em Contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Telefone</h3>
                  <p className="text-gray-600">(11) 9999-9999</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">contato@broupalta.com.br</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Localização</h3>
                  <p className="text-gray-600">São Paulo, SP</p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Redes Sociais</h3>
                <div className="flex gap-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition">
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-pink-600 p-3 rounded-lg hover:bg-pink-700 transition">
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-700 p-3 rounded-lg hover:bg-blue-800 transition">
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Envie uma Mensagem</CardTitle>
                <CardDescription>Responderemos em breve</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <Input
                      type="text"
                      placeholder="Seu nome"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone (opcional)</label>
                    <Input
                      type="tel"
                      placeholder="(11) 9999-9999"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                    <Textarea
                      placeholder="Sua mensagem aqui..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="agendamento" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Agendar Serviço</h2>
          <Card>
            <CardHeader>
              <CardTitle>Preencha os dados para agendar</CardTitle>
              <CardDescription>Entraremos em contato para confirmar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={appointmentForm.name}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={appointmentForm.email}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <Input
                    type="tel"
                    placeholder="(11) 9999-9999"
                    value={appointmentForm.phone}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Serviço</label>
                  <select
                    value={appointmentForm.serviceId}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, serviceId: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione um serviço</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora</label>
                  <Input
                    type="datetime-local"
                    value={appointmentForm.appointmentDate}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, appointmentDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição do Problema (opcional)</label>
                  <Textarea
                    placeholder="Descreva o problema ou serviço desejado..."
                    value={appointmentForm.description}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, description: e.target.value })}
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Agendar Serviço
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Sobre Nós</h3>
              <p className="text-gray-400">Broup Alta oferece serviços profissionais de reparo e manutenção com qualidade garantida.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#servicos" className="hover:text-white transition">Pequenos Reparos</a></li>
                <li><a href="#servicos" className="hover:text-white transition">Montagem de Móveis</a></li>
                <li><a href="#servicos" className="hover:text-white transition">Manutenção Hidráulica</a></li>
                <li><a href="#servicos" className="hover:text-white transition">Manutenção Elétrica</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <p className="text-gray-400 mb-2">Telefone: (11) 9999-9999</p>
              <p className="text-gray-400">Email: contato@broupalta.com.br</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Broup Alta. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

