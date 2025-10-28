import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER || "macnativa@gmail.com",
    pass: process.env.GMAIL_PASSWORD || "",
  },
});

export async function sendAppointmentEmail(
  clientEmail: string,
  clientName: string,
  serviceType: string,
  appointmentDate: Date,
  appointmentTime: string
) {
  const formattedDate = appointmentDate.toLocaleDateString("pt-BR");
  
  // Email para o cliente
  const clientEmailContent = `
    <h2>Confirmação de Agendamento</h2>
    <p>Olá ${clientName},</p>
    <p>Seu agendamento foi recebido com sucesso!</p>
    <h3>Detalhes do Agendamento:</h3>
    <ul>
      <li><strong>Serviço:</strong> ${serviceType}</li>
      <li><strong>Data:</strong> ${formattedDate}</li>
      <li><strong>Hora:</strong> ${appointmentTime}</li>
    </ul>
    <p>Entraremos em contato em breve para confirmar.</p>
    <p>Atenciosamente,<br/>Broup Manutenção e Reparos</p>
  `;

  // Email para o proprietário
  const ownerEmailContent = `
    <h2>Novo Agendamento Recebido</h2>
    <h3>Dados do Cliente:</h3>
    <ul>
      <li><strong>Nome:</strong> ${clientName}</li>
      <li><strong>Email:</strong> ${clientEmail}</li>
    </ul>
    <h3>Detalhes do Agendamento:</h3>
    <ul>
      <li><strong>Serviço:</strong> ${serviceType}</li>
      <li><strong>Data:</strong> ${formattedDate}</li>
      <li><strong>Hora:</strong> ${appointmentTime}</li>
    </ul>
  `;

  try {
    // Enviar email para o cliente
    await transporter.sendMail({
      from: process.env.GMAIL_USER || "macnativa@gmail.com",
      to: clientEmail,
      subject: "Confirmação de Agendamento - Broup Manutenção",
      html: clientEmailContent,
    });

    // Enviar email para o proprietário
    await transporter.sendMail({
      from: process.env.GMAIL_USER || "macnativa@gmail.com",
      to: process.env.OWNER_EMAIL || "macnativa@gmail.com",
      subject: `Novo Agendamento - ${serviceType}`,
      html: ownerEmailContent,
    });

    console.log("Emails enviados com sucesso");
    return true;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return false;
  }
}

