import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[#f1e4df] bg-white/80">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-2xl font-semibold tracking-[0.12em] text-wine">PEACH FLOWERS</h3>
          <p className="text-sm leading-7 text-[#6b4f4e]">
            Flores que transformam momentos em memórias.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-semibold text-brown">Loja</h4>
          <ul className="space-y-3 text-sm text-[#6b4f4e]">
            <li><Link href="/catalogo">Catálogo</Link></li>
            <li><Link href="/categorias">Categorias</Link></li>
            <li><Link href="/favoritos">Favoritos</Link></li>
            <li><Link href="/carrinho">Carrinho</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-semibold text-brown">Empresa</h4>
          <ul className="space-y-3 text-sm text-[#6b4f4e]">
            <li><Link href="/sobre">Sobre nós</Link></li>
            <li><Link href="/contato">Contato</Link></li>
            <li><Link href="/minha-conta">Minha conta</Link></li>
            <li><Link href="/admin">Admin</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-semibold text-brown">Atendimento</h4>
          <ul className="space-y-3 text-sm text-[#6b4f4e]">
            <li>(11) 4002-8922</li>
            <li>ola@peachflowers.com</li>
            <li>Segunda a sábado</li>
            <li>9h às 18h</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#f1e4df] py-4 text-center text-sm text-[#7a645e]">
        © 2026 PEACH FLOWERS. Todos os direitos reservados.
      </div>
    </footer>
  );
}
