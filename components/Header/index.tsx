import headerNavLinks from "@/data/headerNavLinks"
import Link from "next/link"
import HeaderDrawer from "./HeaderDrawer"
import SearchInput from "./SearchInput"
import Button from "../Button"

const Header = () => {
  return (
    <header className="flex h-16 lg:justify-around justify-between p-0 m-0 items-center sticky top-0 z-40 border-b-2 shadow-md overflow-hidden bg-gradient-to-r font-middle from-green-400 via-blue-300 to-blue-500">
    <div>
      <Link href='/'>
        <div className='font-title text-primary inline-flex text-lg transition-all duration-200 sm:text-3xl mx-2'>
          <span className="uppercase text-base-content">c</span>
          <span className="lowercase text-primary">ode</span>
        </div>
      </Link>
    </div>
    <div className='hidden lg:block'>
      {
        headerNavLinks.map(item => (
          <Link href={item.href} key={item.href}>
            <Button className='hover:text-blue-500 text-2xl mx-3 h-10 border-none' key={item.href}>
              {item.title}
            </Button>
          </Link>
        ))
      }
    </div>
    <div className='flex'>
      <SearchInput />
      <HeaderDrawer menu={headerNavLinks} />
    </div>
  </header>
  )
}

export default Header