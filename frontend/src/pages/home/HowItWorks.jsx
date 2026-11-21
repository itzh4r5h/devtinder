import { UserPlus,Flame, GitMerge } from "lucide-react"


export const HowItWorks = () => {
  const steps = [
    {
      Icon: UserPlus,
      title: 'create profile',
      description: "Show off your tech stack, projects and what you're building. Let your code speak."
    },
    {
      Icon: Flame,
      title: 'swipe devs',
      description: "Browse developers near you or across the globe. Swipe right on shared passions."
    },
    {
      Icon: GitMerge,
      title: 'connecte & collaborate',
      description: "Match, chat, and start shipping code together. Build the next big thing."
    },

  ]

  return (
    <section>
      <h3 className="text-secondary text-xl capitalize text-center tracking-wide">how it works</h3>
      <h1 className="text-foreground text-4xl font-semibold capitalize text-center tracking-wide leading-11">three steps to your match</h1>

      <div className="flex flex-wrap justify-center items-center gap-8 mt-10">

        {steps.map(({Icon,title,description},index)=>{
          return <article key={title.replaceAll(" ","-")} className="card border border-white/10 w-full md:w-80 h-55 lg:w-100 lg:h-50 p-5 rounded-xl">
            <div className="flex items-center gap-2 flex-2">
              <span className="button-bg rounded-md size-11 flex items-center justify-center">
                <Icon className="size-6" strokeWidth={2.5}/>
              </span>
              <h3 className="font-semibold text-2xl capitalize text-center flex-1 tracking-wider">{title}</h3>
            </div>
            <span className="text-secondary font-semibold tracking-wide inline-block mt-2">0{index+1}</span>
            <p className="text-muted-foreground tracking-wide text-lg mt-2 leading-6">{description}</p>
        </article>
        })}

      </div>
    </section>
  )
}
