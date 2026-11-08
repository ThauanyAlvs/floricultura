export default function ContactPage() {
  return (
    <div className="container-shell py-16">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Contato</p>
        <h1 className="text-4xl text-brown">Fale com a PEACH FLOWERS</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-[#EDE2D0] bg-white p-6 shadow-soft">
          <h2 className="text-2xl text-brown">Atendimento</h2>
          <ul className="mt-5 space-y-4 text-[#43383A]">
            <li>📍 Rua das Rosas, 1200 — São Paulo, SP</li>
            <li>📞 (11) 4002-8922</li>
            <li>✉️ ola@peachflowers.com</li>
          </ul>
        </div>

        <div className="rounded-[28px] border border-[#EDE2D0] bg-white p-6 shadow-soft">
          <form className="grid gap-4 md:grid-cols-2">
            <input className="rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Nome" />
            <input className="rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="E-mail" />
            <input className="md:col-span-2 rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Assunto" />
            <textarea className="md:col-span-2 rounded-[24px] border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" rows={5} placeholder="Mensagem" />
            <button type="submit" className="md:col-span-2 rounded-full bg-wine px-5 py-3 text-sm font-semibold text-white">Enviar mensagem</button>
          </form>
        </div>
      </div>
    </div>
  );
}
