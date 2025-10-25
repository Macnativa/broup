import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Wrench, Droplet, Sofa, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const SERVICES = [
  { id: "eletrica", label: "Elétrica", icon: Wrench },
  { id: "hidraulica", label: "Hidráulica", icon: Droplet },
  { id: "moveis", label: "Montagem de Móveis", icon: Sofa },
  { id: "outros", label: "Outros Serviços", icon: Wrench },
];

export default function Home() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    serviceType: "",
    serviceDescription: "",
    address: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const createAppointmentMutation = trpc.appointments.create.useMutation({
    onSuccess: () => {
      toast.success("Agendamento realizado com sucesso! Entraremos em contato em breve.");
      setFormData({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        serviceType: "",
        serviceDescription: "",
        address: "",
        appointmentDate: "",
        appointmentTime: "",
      });
    },
    onError: (error) => {
      toast.error(`Erro ao agendar: ${error.message}`);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, serviceType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.clientEmail || !formData.clientPhone || 
        !formData.serviceType || !formData.address || !formData.appointmentDate || !formData.appointmentTime) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    createAppointmentMutation.mutate({
      ...formData,
      appointmentDate: new Date(formData.appointmentDate),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Broup Manutenção" className="h-12 w-12" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">Broup Manutenção</h1>
              <p className="text-xs text-slate-600">Confiança vem com a excelência</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#servicos" className="text-slate-700 hover:text-slate-900 font-medium">Serviços</a>
            <a href="#agendamento" className="text-slate-700 hover:text-slate-900 font-medium">Agendar</a>
            <a href="#contato" className="text-slate-700 hover:text-slate-900 font-medium">Contato</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Soluções Completas em Manutenção</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Elétrica • Hidráulica • Montagem de Móveis • E muito mais</p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-slate-100 font-bold"
            onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Agendar Serviço
          </Button>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">Nossos Serviços</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                      <CardTitle className="text-lg">{service.label}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Serviço profissional de {service.label.toLowerCase()} com qualidade garantida.</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formulário de Agendamento */}
      <section id="agendamento" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">Agende seu Serviço</h3>
          <p className="text-center text-slate-600 mb-12">Preencha o formulário abaixo e entraremos em contato para confirmar seu agendamento.</p>
          
          <Card>
            <CardHeader>
              <CardTitle>Formulário de Agendamento</CardTitle>
              <CardDescription>Todos os campos marcados com * são obrigatórios</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="clientName">Nome Completo *</Label>
                  <Input
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="Seu nome"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Email *</Label>
                  <Input
                    id="clientEmail"
                    name="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                {/* Telefone */}
                <div className="space-y-2">
                  <Label htmlFor="clientPhone">Telefone *</Label>
                  <Input
                    id="clientPhone"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                {/* Tipo de Serviço */}
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Tipo de Serviço *</Label>
                  <Select value={formData.serviceType} onValueChange={handleSelectChange}>
                    <SelectTrigger id="serviceType">
                      <SelectValue placeholder="Selecione um serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Descrição do Serviço */}
                <div className="space-y-2">
                  <Label htmlFor="serviceDescription">Descrição do Serviço</Label>
                  <Textarea
                    id="serviceDescription"
                    name="serviceDescription"
                    value={formData.serviceDescription}
                    onChange={handleInputChange}
                    placeholder="Descreva o serviço que você precisa..."
                    rows={4}
                  />
                </div>

                {/* Endereço */}
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Rua, número, complemento, cidade"
                    rows={3}
                    required
                  />
                </div>

                {/* Data */}
                <div className="space-y-2">
                  <Label htmlFor="appointmentDate">Data do Agendamento *</Label>
                  <Input
                    id="appointmentDate"
                    name="appointmentDate"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Hora */}
                <div className="space-y-2">
                  <Label htmlFor="appointmentTime">Hora Preferida *</Label>
                  <Input
                    id="appointmentTime"
                    name="appointmentTime"
                    type="time"
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Botão de Envio */}
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={createAppointmentMutation.isPending}
                >
                  {createAppointmentMutation.isPending ? "Agendando..." : "Agendar Serviço"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">Entre em Contato</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Telefone */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-blue-400" />
                  <CardTitle className="text-white">Telefone</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">(19) 98959 9329</p>
                <p className="text-slate-400 text-sm mt-2">Seg-Sex: 8h às 18h</p>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-blue-400" />
                  <CardTitle className="text-white">Email</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">contato@broup.com.br</p>
                <p className="text-slate-400 text-sm mt-2">Resposta em até 24h</p>
              </CardContent>
            </Card>

            {/* Localização */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-blue-400" />
                  <CardTitle className="text-white">Localização</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">Campinas, SP</p>
                <p className="text-slate-400 text-sm mt-2">Atendimento em toda a região</p>
              </CardContent>
            </Card>
          </div>

          {/* Redes Sociais */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-6">Siga-nos nas Redes Sociais</h4>
            <div className="flex justify-center gap-6">
              <a 
                href="https://facebook.com/broup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://instagram.com/broup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-pink-600 rounded-full hover:bg-pink-700 transition"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com/company/broup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-blue-700 rounded-full hover:bg-blue-800 transition"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Broup Manutenção e Reparos. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">Confiança vem com a excelência</p>
        </div>
      </footer>
    </div>
  );
}

