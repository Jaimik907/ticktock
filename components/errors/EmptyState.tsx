interface EmptyStateProps {
  message?: string
  colSpan?: number
}

export default function EmptyState({
  message = "No data found.",
  colSpan = 4,
}: EmptyStateProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-12 text-center text-sm text-gray-400">
        {message}
      </td>
    </tr>
  )
}