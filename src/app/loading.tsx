export default function Loading() {
  return (
    <div className="container-shell flex min-h-[50vh] items-center justify-center py-20">
      <div className="flex items-center gap-3 text-brown">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-peach border-t-transparent" />
        <span className="text-lg font-medium">Carregando...</span>
      </div>
    </div>
  );
}
