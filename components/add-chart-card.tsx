import { Plus } from "lucide-react"
import { Card } from "@/components/ui/card"

interface AddChartCardProps {
  onClick: () => void
}

export function AddChartCard({ onClick }: AddChartCardProps) {
  return (
    <Card
      className="flex h-full cursor-pointer flex-col items-center justify-center gap-4 border border-dashed border-secondary p-6 transition-colors hover:border-brand hover:bg-accent"
      onClick={onClick}
    >
      <Plus className="h-8 w-8 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Add Chart</span>
    </Card>
  )
}

