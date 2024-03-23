'use client'

import classnames from "classnames"
import { memo, useEffect, useRef, useState } from "react";

interface Pagination {
  defaultCurrent?: number,
  total?: number,
  onChange: (page: number, size: number) => void,
  className?: string,
}

const Pagination: React.FC<Pagination> = ({ defaultCurrent = 1, total = 10, onChange, className, ...rest }) => {
  const [current, setCurrent] = useState<number>(defaultCurrent)
  const [visiblePages, setVisiblePages] = useState<number[]>(() => {
    const startPage = Math.max(current > total - 3 ? total - 3 : current - 2, 1)
    const endPage = Math.min(current < 3 ? current + 3 : current + 2, total)
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => index + startPage)
  })
  const prevPageRef = useRef(current - 1)

  useEffect(() => {
    if (current !== prevPageRef.current) {
      updateVisiblePages(current);
      prevPageRef.current = current;
    }
  }, [current, total])

  const classes = classnames(
    className
  )

  const handlePageChange = (page: number) => {
    if (page === current) return
    setCurrent(page)
    onChange(page, total)
    window.scroll(0, 0)
  }

  const updateVisiblePages = (current: number) => {
    const startPage = Math.max(current > total - 3 ? total - 3 : current - 2, 1)
    const endPage = Math.min(current < 3 ? current + 3 : current + 2, total)
    setVisiblePages(Array.from({ length: endPage - startPage + 1 }, (_, index) => index + startPage))
  }

  return (
    <div className="flex">
      <div className={`${classes} mx-auto my-4 mt-9`}>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button onClick={() => handlePageChange(current - 1)} disabled={current === 1} className={`pagination-prev ${current === 1 && `cursor-no-drop`}`}>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </button>
            {current > 3 &&
              (<>
                <a onClick={() => handlePageChange(1)} key={`Pagination` + 1} rel="nofollow" className={`pagination-item ${1 === current && `pagination-item-active`}`}>{1}</a>
                <button onClick={() => handlePageChange(current - 3)} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</button>
              </>
              )
            }
            {
              visiblePages.map((index) => (
                <a onClick={() => handlePageChange(index)} key={`Pagination-${index}`} rel="nofollow" className={`pagination-item ${index === current && `pagination-item-active`}`}>{index}</a>
              ))
            }
            {
              total - 3 > current &&
              (<>
                <button onClick={() => handlePageChange(current + 2)} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</button>
                <a onClick={() => handlePageChange(total)} key={`Pagination` + total} rel="nofollow" className={`pagination-item ${total === current && `pagination-item-active`}`}>{total}</a>
              </>)
            }
            <button onClick={() => handlePageChange(current + 1)} disabled={current === total} className={`pagination-next ${current === total && `cursor-no-drop`}`}>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div >
  )
}

export default memo(Pagination)