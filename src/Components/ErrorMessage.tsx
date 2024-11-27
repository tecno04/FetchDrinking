import { ReactNode } from "react"

type ErrorProps = {
    children: ReactNode
}

export const ErrorMessage = ({children}: ErrorProps) => {
  return (
    <div className="bg-orange-600 text-center text-2xl font-bold">{children}</div>
  )
}
