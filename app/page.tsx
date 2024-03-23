'use client'

import Card from "components/Card";
import Pagination from "components/Pagination";

export default function Home() {

  const onClick = () => { }

  const onChange = (page: number, size: number) => {
    console.log(page, size)
  }

  return (
    <>
      <div className='flex justify-center flex-1'>
        <div className='flex flex-col items-center w-11/12 lg:w-5/12 lg:mr-10'>
          {
            [1, 2, 3].map(item => (
              <Card key={item}>
                <div className='flex justify-between'>
                  <button className="border-none shadow-none border-transparent text-3xl font-semibold text-gray-600 text-overflow-ellipsis text-left">
                    {`title`}
                  </button>
                </div>
                <div className="text-gray-700 my-2 text-overflow-ellipsis">
                  {`description`}
                </div>
                <div className="flex">
                  <time className='ml-auto text-gray-600'>{`2022-01-01`}</time>
                </div>
              </Card>
            ))
          }
        </div>
      </div>
      <Pagination defaultCurrent={1} total={10} onChange={onChange} />
    </>
  );
}
