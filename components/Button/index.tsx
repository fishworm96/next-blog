'use client'

import { ReactNode, useEffect, useRef, useState } from "react"
import classNames from 'classnames'
import { isTwoCNChar, spaceChildren } from "./ButtonHelpers"


interface ButtonProps {
  children: ReactNode,
  className?: string,
  autoInsertSpace?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    autoInsertSpace = true,
    ...rest
  } = props

  // const [hasTwoCNChar, setHasTwoCNChar] = useState<boolean>(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // useEffect(() => {
  //   if (!buttonRef.current || autoInsertSpace === false) return
  //   const buttonText = buttonRef.current.textContent
    
  //   if (isTwoCNChar(buttonText!)) {
  //     if (!hasTwoCNChar) {
  //       setHasTwoCNChar(true)
  //     }
  //   } else if (hasTwoCNChar) {
  //     setHasTwoCNChar(false)
  //   }
  // }, [buttonRef])

  const classes = classNames(
    {
      // 'tracking-[.34em]': hasTwoCNChar && autoInsertSpace,
    },
    className
  )

  const button = spaceChildren(children, autoInsertSpace)
  // console.log(hasTwoCNChar, autoInsertSpace)
  return (
    <button {...rest} className={classes} ref={buttonRef}>
      {button}
    </button>
  )
}

export default Button