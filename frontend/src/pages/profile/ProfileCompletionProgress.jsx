import { Progress } from "@/components/ui/progress"

export const ProfileCompletionProgress = ({ completionRate }) => {
  return (
    <div className="w-full">
      <h3 className="font-semibold text-lg tracking-wide text-center">Profile Completion</h3>
      <div className="flex gap-4 items-center w-full">
        <Progress value={completionRate} className='flex-1 w-full' />
        <h3 className="font-semibold text-lg tabular-nums tracking-wide">{completionRate}%</h3>
      </div>
    </div>
  )
}

