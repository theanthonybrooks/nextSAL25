import React from "react"

type Props = {}

function SignInOutLayout({ children }: React.PropsWithChildren<Props>) {
  return <div className='bg-salYellow'>{children}</div>
}

export default SignInOutLayout
