'use client'

import classnames from "classnames"
import LeftOutlined from "components/Icon/LeftOutlined";
import RightOutlined from "components/Icon/RightOutlined";
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
              <LeftOutlined />
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
              <RightOutlined />
            </button>
          </nav>
        </div>
      </div>
    </div >
  )
}

export default memo(Pagination)