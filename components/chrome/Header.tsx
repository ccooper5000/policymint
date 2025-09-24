export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white">PM</div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">PolicyMint</h1>
          <p className="text-sm text-gray-600">Generate ToS & Privacy drafts for vibe-coded apps</p>
        </div>
      </div>
      <div className="hidden sm:block text-xs text-gray-500">Not legal advice</div>
    </header>
  );
}
