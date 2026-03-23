"use client"

import { useEffect, useState } from "react"
import { useTimesheets } from "@/hooks/useTimesheets"
import StatusBadge from "@/components/timesheets/StatusBadge"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react"
import { formatDate, getDateRangeBounds } from "@/lib/utils"
import type { Week } from "@/lib/types"
import ErrorFallback from "@/components/errors/ErrorFallback"
import EmptyState from "@/components/errors/EmptyState"

const PAGE_SIZE_OPTIONS = [5, 10, 20]

export default function DashboardPage() {
  const { weeks, loading, error, fetchWeeks } = useTimesheets()
  const router = useRouter()

  const [dateRange, setDateRange] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [pageSize, setPageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  useEffect(() => {
    fetchWeeks()
  }, [fetchWeeks])

  const filtered = weeks
    .filter((w: Week) => {
      if (statusFilter && w.status !== statusFilter) return false

      if (dateRange) {
        const bounds = getDateRangeBounds(dateRange)
        if (bounds) {
          const weekStart = new Date(w.startDate)
          const weekEnd = new Date(w.endDate)
          if (weekEnd < bounds.from || weekStart > bounds.to) return false
        }
      }

      return true
    })
    .sort((a: Week, b: Week) =>
      sortDir === "asc" ? a.weekNumber - b.weekNumber : b.weekNumber - a.weekNumber
    )

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  function getAction(status: string) {
    if (status === "Completed") return "View"
    if (status === "Incomplete") return "Update"
    return "Create"
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h1 className="mb-5 text-2xl font-semibold text-gray-900">Your Timesheets</h1>

      <div className="mb-5 flex gap-3">
        <select
          value={dateRange}
          onChange={(e) => { setDateRange(e.target.value); setCurrentPage(1) }}
          className="rounded-md border border-input px-3 py-1.5 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">Date Range</option>
          <option value="this_week">This Week</option>
          <option value="last_week">Last Week</option>
          <option value="this_month">This Month</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }}
          className="rounded-md border border-input px-3 py-1.5 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">Status</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
          <option value="Missing">Missing</option>
        </select>
      </div>

      {error && (
        <p className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-500">{error}</p>
      )}

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-xs font-medium uppercase tracking-wide text-gray-400">
            <th className="py-3 text-left">
              <button
                onClick={() => {
                  setSortDir((d) => (d === "asc" ? "desc" : "asc"))
                  setCurrentPage(1)
                }}
                className="flex items-center gap-1 hover:text-gray-600"
              >
                Week #
                {sortDir === "asc" ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
              </button>
            </th>
            <th className="py-3 text-left">Date</th>
            <th className="py-3 text-left">Status</th>
            <th className="py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            [...Array(5)].map((_, i) => (
              <tr key={i} className="border-b border-border">
                <td className="py-3"><div className="h-4 w-8 animate-pulse rounded bg-gray-100" /></td>
                <td className="py-3"><div className="h-4 w-48 animate-pulse rounded bg-gray-100" /></td>
                <td className="py-3"><div className="h-6 w-24 animate-pulse rounded bg-gray-100" /></td>
                <td className="py-3 text-right"><div className="ml-auto h-4 w-12 animate-pulse rounded bg-gray-100" /></td>
              </tr>
            ))
          )}

          {error && <ErrorFallback message={error} onRetry={fetchWeeks} />}

          {!loading && !error && paginated.length === 0 && (
            <EmptyState message="No timesheets found." />
          )}

          {!loading && paginated.map((week: Week) => (
            <tr key={week.id} className="border-b border-border hover:bg-gray-50">
              <td className="py-3 text-gray-700">{week.weekNumber}</td>
              <td className="py-3 text-gray-700">
                {formatDate(week.startDate)} - {formatDate(week.endDate)}
              </td>
              <td className="py-3">
                <StatusBadge status={week.status} />
              </td>
              <td className="py-3 text-right">
                <button
                  onClick={() => router.push(`/dashboard/${week.id}`)}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {getAction(week.status)}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-5 flex items-center justify-between">
        <select
          value={pageSize}
          onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1) }}
          className="rounded-md border border-input px-3 py-1.5 text-sm text-gray-600 outline-none"
        >
          {PAGE_SIZE_OPTIONS.map((s) => (
            <option key={s} value={s}>{s} per page</option>
          ))}
        </select>

        <div className="flex items-center gap-1 text-sm">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="flex items-center gap-1 rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronLeft size={14} /> Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`rounded px-3 py-1 ${currentPage === i + 1
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="flex items-center gap-1 rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}