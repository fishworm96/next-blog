import constantsData from "@/data/constants"

const Footer = () => {
  return (
    <footer className='flex justify-center items-center bottom-0 h-20 border-solid border-2 border-light-black'>
      <div>
        {constantsData.FOOTER}
      </div>
    </footer>
  )
}

export default Footer