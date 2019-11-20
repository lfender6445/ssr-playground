import React, { useEffect, useState } from 'react'

const Partial = () => {
  const [ hasEffected, setHasEffected ] = useState(false)

  useEffect(() => {
    if (!hasEffected) setHasEffected(true)
  })

  if (hasEffected) {
    return <p>Coming from SSR, component has mounted and can accept props</p>
  } else {
    return <p>Coming from SSR, just static HTML</p>
  }
}

export default Partial
