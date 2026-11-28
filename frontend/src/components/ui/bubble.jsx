import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

function BubbleGroup({
  className,
  ...props
}) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props} />
  );
}

const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
  {
    variants: {
      // themed for devtinder: the app is dark-only and --muted / --*-foreground
      // are light or translucent tokens, so the stock shadcn colors don't fit
      variant: {
        // own messages: the app's secondary -> primary gradient
        default:
          "*:data-[slot=bubble-content]:bg-linear-135 *:data-[slot=bubble-content]:from-secondary *:data-[slot=bubble-content]:to-primary *:data-[slot=bubble-content]:text-foreground *:data-[slot=bubble-content]:shadow-[0_0_14px_oklch(0.627_0.265_303.9/0.35)]",
        secondary:
          "*:data-[slot=bubble-content]:bg-secondary/80 *:data-[slot=bubble-content]:text-foreground",
        // other person's messages: glassy card surface
        muted:
          "*:data-[slot=bubble-content]:border-white/10 *:data-[slot=bubble-content]:bg-white/5 *:data-[slot=bubble-content]:text-foreground",
        tinted:
          "*:data-[slot=bubble-content]:bg-[oklch(from_var(--primary)_0.3_calc(c*0.4)_h)] *:data-[slot=bubble-content]:text-foreground",
        outline:
          "*:data-[slot=bubble-content]:border-white/10 *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:text-foreground",
        ghost:
          "border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0",
        destructive:
          "*:data-[slot=bubble-content]:border-destructive/40 *:data-[slot=bubble-content]:bg-destructive/15 *:data-[slot=bubble-content]:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props} />
  );
}

function BubbleContent({
  className,
  render,
  ...props
}) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps({
      className: cn(
        "w-fit max-w-full min-w-0 overflow-hidden rounded-2xl border border-transparent px-3.5 py-2 text-[0.95rem] leading-relaxed whitespace-pre-wrap select-text group-data-[align=end]/message:rounded-br-sm group-data-[align=start]/message:rounded-bl-sm wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/50",
        className
      ),
    }, props),
    render,
    state: {
      slot: "bubble-content",
    },
  });
}

const bubbleReactionsVariants = cva(
  "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-neutral-800 px-1.5 py-0.5 text-sm ring-3 ring-card has-[button]:p-0",
  {
    variants: {
      side: {
        top: "top-0 -translate-y-3/4",
        bottom: "bottom-0 translate-y-3/4",
      },
      align: {
        start: "left-3",
        end: "right-3",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  }
)

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props} />
  );
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions }
