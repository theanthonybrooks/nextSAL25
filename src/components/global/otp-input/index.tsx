import {
  InputOTP,
  // InputOTPGroup,
  // InputOTPSeparator,
  InputOTPSlot,
} from "@/src/components/ui/input-otp"
import React from "react"

type Props = {
  otp: string
  setOtp: React.Dispatch<React.SetStateAction<string>>
}

function OTPInput({ otp, setOtp }: Props) {
  return (
    <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
      <div className='flex gap-3'>
        <div>
          <InputOTPSlot index={0} />
        </div>
        <div>
          <InputOTPSlot index={1} />
        </div>
        <div>
          <InputOTPSlot index={2} />
        </div>
        <div>
          <InputOTPSlot index={3} />
        </div>
        <div>
          <InputOTPSlot index={4} />
        </div>
        <div>
          <InputOTPSlot index={5} />
        </div>
      </div>
    </InputOTP>
    // <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
    //   <InputOTPGroup>
    //     <InputOTPSlot index={0} />
    //     <InputOTPSlot index={1} />
    //     <InputOTPSlot index={2} />
    //   </InputOTPGroup>
    //   <InputOTPSeparator />
    //   <InputOTPGroup>
    //     <InputOTPSlot index={3} />
    //     <InputOTPSlot index={4} />
    //     <InputOTPSlot index={5} />
    //   </InputOTPGroup>
    // </InputOTP>
  )
}

export default OTPInput
