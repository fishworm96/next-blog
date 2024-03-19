import { isString } from "@/util/is";
import { isFragment } from "@/util/reactNode";
import { Children, ReactElement, ReactNode, cloneElement } from "react";

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
export const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

const splitCNCharsBySpace = (child: React.ReactElement | string | number, needInsertSpace: boolean) => {
  if (child === null || child === undefined) return;

  const SPACE = needInsertSpace ? ' ' : ''

  if (typeof child !== 'string' && typeof child !== 'number' && isString(child.type)) {
    return cloneElement(child, {
      children: child.props.children.split('').join(SPACE)
    })
  }

  if (isString(child)) {
    return isTwoCNChar(child) ? <span>{child.split('').join(SPACE)}</span> : <span>{child}</span>
  }

  if (isFragment(child)) return <span>{child}</span>

  return child
}

export const spaceChildren = (children: React.ReactNode, needInsertSpace: boolean) => {
  let isPrevChildPure: boolean = false
  const childList: ReactNode[] = []

  Children.forEach(children, (child) => {
    const type = typeof child
    const isCurrentChildPure = type === 'string' || type === 'number'
    if (isPrevChildPure && isCurrentChildPure) {
      const lastIndex = childList.length - 1
      const lastChild = childList[lastIndex]
      childList[lastIndex] = `${lastChild}${child}`
    } else {
      childList.push(child)
    }

    isPrevChildPure = isCurrentChildPure
  })

  return Children.map(childList, (child) =>
    splitCNCharsBySpace(child as ReactElement | string | number, needInsertSpace))
}