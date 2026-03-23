import Header from "@/components/layout/Header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Timesheets" />
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      <footer className="py-6 text-center text-xs text-gray-400">
        © 2024 tentwenty. All rights reserved.
      </footer>
    </div>
  )
}