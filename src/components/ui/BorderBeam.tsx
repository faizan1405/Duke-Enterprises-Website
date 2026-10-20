import React from "react"
import { motion, type MotionStyle, type Transition } from "motion/react"
import { cn } from "@/lib/utils"

interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  transition?: Transition
  className?: string
  style?: React.CSSProperties
  reverse?: boolean
  initialOffset?: number
  borderWidth?: number
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  delay = 0,
  duration = 6,
  colorFrom = "#ff5a1f",
  colorTo = "#00f0ff",
  transition,
  style,
  reverse = false,
  borderWidth = 1.5,
}) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
      style={{
        padding: `${borderWidth}px`,
        ...style,
      }}
    >
      <motion.div
        className={cn(
          "absolute -inset-full opacity-60",
          className
        )}
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 60deg, ${colorTo} 120deg, transparent 180deg)`,
        } as MotionStyle}
        animate={{
          rotate: reverse ? [-360, 0] : [0, 360],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
      <div className="absolute inset-[1.5px] rounded-[inherit] bg-inherit -z-10" />
    </div>
  )
}
