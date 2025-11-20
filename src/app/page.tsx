import { AppShell } from '@/components/entreprenyour/app-shell';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background font-body">
      <main className="flex-1">
        <AppShell />
      </main>
    </div>
  );
}
