import { ArticleListDetail } from "lib/api/interface"

interface Props {
  articleList?: ArticleListDetail
  onClick?: (tag: string) => void
  children?: React.ReactNode
}

const Card: React.FC<Props> = ({ articleList, onClick, children }) => {
  return (
    <div className='flex-col bg-white p-5 w-full border-solid rounded-t-2xl rounded-b-2xl mt-10 shadow-xl'>
      <div>
        {children}
      </div>
    </div>
  )
}

export default Card