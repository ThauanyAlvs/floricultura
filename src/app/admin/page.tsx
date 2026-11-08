export default function AdminPage() {
  return (
    <div className="container-shell py-16">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Admin</p>
        <h1 className="text-4xl text-brown">Painel administrativo</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[26px] border border-[#EDE2D0] bg-white p-6 shadow-soft">
          <p className="text-sm text-[#43383A]">Pedidos</p>
          <p className="mt-3 text-3xl font-semibold text-brown">128</p>
        </div>
        <div className="rounded-[26px] border border-[#EDE2D0] bg-white p-6 shadow-soft">
          <p className="text-sm text-[#43383A]">Faturamento</p>
          <p className="mt-3 text-3xl font-semibold text-brown">R$ 12.4k</p>
        </div>
        <div className="rounded-[26px] border border-[#EDE2D0] bg-white p-6 shadow-soft">
          <p className="text-sm text-[#43383A]">Produtos</p>
          <p className="mt-3 text-3xl font-semibold text-brown">42</p>
        </div>
        <div className="rounded-[26px] border border-[#EDE2D0] bg-white p-6 shadow-soft">
          <p className="text-sm text-[#43383A]">Estoque baixo</p>
          <p className="mt-3 text-3xl font-semibold text-brown">8</p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-[28px] border border-[#EDE2D0] bg-white p-6 shadow-soft">
          <h2 className="text-2xl text-brown">Gestão de produtos</h2>
          <div className="mt-5 space-y-4">
            <input className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Nome do produto" defaultValue="Buquê Aurora" />
            <input className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Preço" defaultValue="R$ 189,00" />
            <input className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Estoque" defaultValue="22" />
            <button className="rounded-full bg-wine px-5 py-3 text-sm font-semibold text-white">Salvar produto</button>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#EDE2D0] bg-white p-6 shadow-soft">
          <h2 className="text-2xl text-brown">Pedidos recentes</h2>
          <div className="mt-5 space-y-4">
            {['PEACH-1482', 'PEACH-1221', 'PEACH-0950'].map((order) => (
              <div key={order} className="flex items-center justify-between rounded-[20px] bg-[#FAF8F3] p-4 text-sm text-[#43383A]">
                <span>{order}</span>
                <span className="rounded-full bg-peach/30 px-2.5 py-1 text-xs font-semibold text-brown">Em preparo</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
