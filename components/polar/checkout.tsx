import { PolarEmbedCheckout } from "@polar-sh/checkout/embed"
import { useEffect } from "react"

type PurchaseLinkProps = { url: string }

const PurchaseLink = ({ url }: PurchaseLinkProps) => {
  useEffect(() => {
    PolarEmbedCheckout.init()
  }, [])

  return (
    <a href={url} data-polar-checkout data-polar-checkout-theme='light'>
      Purchase
    </a>
  )
}

export default PurchaseLink
