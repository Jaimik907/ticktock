"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTimesheets } from "@/hooks/useTimesheets"
import { formatDate } from "@/lib/utils"
import { MoreHorizontal, Plus } from "lucide-react"
import AddEntryModal from "@/components/timesheets/AddEntryModal"
import type { TimesheetEntry, Week } from "@/lib/types"
import http from "@/lib/http"

export default function WeekDetailPage({ params }: { params: Promise<{ weekId: string }> }) {
    const { weekId } = use(params)
    const router = useRouter()
    const { weeks, entries, loading, fetchWeeks, fetchEntries, createEntry, updateEntry, deleteEntry, updateWeek } = useTimesheets()

    const [selectedEntry, setSelectedEntry] = useState<TimesheetEntry | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)

    const week = weeks.find((w) => w.id === weekId) as Week | undefined

    useEffect(() => {
        fetchWeeks()
        fetchEntries(weekId)
    }, [weekId])

    const totalHours = entries.reduce((sum, e) => sum + e.hours, 0)
    const targetHours = 40
    const progressPercent = Math.min((totalHours / targetHours) * 100, 100)

    const getDatesInRange = (start: string, end: string): string[] => {
        const dates: string[] = []
        const current = new Date(start)
        const endDate = new Date(end)
        while (current <= endDate) {
            dates.push(current.toISOString().split("T")[0])
            current.setDate(current.getDate() + 1)
        }
        return dates
    }

    const dates = week ? getDatesInRange(week.startDate, week.endDate) : []

    const entriesByDate = dates.reduce((acc, date) => {
        acc[date] = entries.filter((e) => e.date === date)
        return acc
    }, {} as Record<string, TimesheetEntry[]>)

    function openAddModal(date: string) {
        setSelectedDate(date)
        setSelectedEntry(null)
        setModalOpen(true)
    }

    function openEditModal(entry: TimesheetEntry) {
        setSelectedEntry(entry)
        setSelectedDate(entry.date)
        setModalOpen(true)
        setOpenMenuId(null)
    }

    async function recalculateStatus(updatedEntries: TimesheetEntry[]) {
        const total = updatedEntries.reduce((sum, e) => sum + e.hours, 0)
        const newStatus = total === 0 ? "Missing" : total < 40 ? "Incomplete" : "Completed"
        await updateWeek(weekId, { status: newStatus })
    }
    async function handleModalSubmit(payload: Partial<TimesheetEntry>) {
        if (selectedEntry) {
            await updateEntry(weekId, selectedEntry.id, { ...payload, hours: Number(payload.hours) })
        } else {
            await createEntry(weekId, { ...payload, date: selectedDate, hours: Number(payload.hours) })
        }
        await fetchEntries(weekId)
        const updatedEntries = await http.get<TimesheetEntry[]>(`/timesheets/${weekId}/entries`)
        const total = updatedEntries.reduce((sum, e) => sum + Number(e.hours), 0)
        const newStatus = total === 0 ? "Missing" : total < 40 ? "Incomplete" : "Completed"
        await updateWeek(weekId, { status: newStatus })
        setModalOpen(false)
    }

    async function handleDelete(entryId: string) {
        await deleteEntry(weekId, entryId)
        await fetchEntries(weekId)
        setOpenMenuId(null)
    }

    if (loading) {
        return (
            <div className="rounded-xl bg-white p-6 shadow-sm space-y-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-10 animate-pulse rounded bg-gray-100" />
                ))}
            </div>
        )
    }

    if (!week) {
        return (
            <div className="rounded-xl bg-white p-6 shadow-sm text-center text-gray-400">
                Week not found.{" "}
                <button onClick={() => router.push("/dashboard")} className="text-primary underline">
                    Go back
                </button>
            </div>
        )
    }

    return (
        <>
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-1 flex items-start justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">This week's timesheet</h1>
                        <p className="mt-1 text-sm text-gray-400">
                            {formatDate(week.startDate)} - {formatDate(week.endDate)}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">
                            {totalHours}/{targetHours} hrs
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-100">
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{ width: `${progressPercent}%`, backgroundColor: "#FF8A4C" }}
                                />
                            </div>
                            <span className="text-xs text-gray-400">{Math.round(progressPercent)}%</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-6">
                    {dates.map((date) => (
                        <div key={date}>
                            <p className="mb-2 text-sm font-medium text-gray-700">
                                {new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                            </p>

                            <div className="space-y-1">
                                {entriesByDate[date].map((entry) => (
                                    <div
                                        key={entry.id}
                                        className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5 hover:bg-gray-50"
                                    >
                                        <span className="text-sm text-gray-700">{entry.description}</span>

                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-gray-400">{entry.hours} hrs</span>
                                            <span
                                                className="rounded px-2 py-0.5 text-xs font-medium"
                                                style={{ backgroundColor: "#E1EFFE", color: "#1E429F" }}
                                            >
                                                {entry.project}
                                            </span>

                                            <div className="relative">
                                                <button
                                                    onClick={() => setOpenMenuId(openMenuId === entry.id ? null : entry.id)}
                                                    className="rounded p-1 text-gray-400 hover:bg-gray-100"
                                                >
                                                    <MoreHorizontal size={16} />
                                                </button>

                                                {openMenuId === entry.id && (
                                                    <div className="absolute right-0 top-7 z-10 w-28 rounded-md border border-border bg-white shadow-md">
                                                        <button
                                                            onClick={() => openEditModal(entry)}
                                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(entry.id)}
                                                            className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-50"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={() => openAddModal(date)}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-primary py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                                >
                                    <Plus size={14} />
                                    Add new task
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AddEntryModal
                open={modalOpen}
                entry={selectedEntry}
                onClose={() => setModalOpen(false)}
                onSubmit={handleModalSubmit}
            />
        </>
    )
}