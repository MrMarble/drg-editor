import { FaGithub } from 'react-icons/fa'
import { BiRightArrow } from 'react-icons/bi'
import { LabelIcon } from '../Icons'

type Props = {}

const MENU_ITEMS = [
  {
    title: "Analyzer",
  }
]

const Navbar = (props: Props) => {
  return (
    <>
      <div className="justify-center flex drg-gradient border-t-4 border-drg-primary-500">
        <ul className="menu-horizontal p-0">
          <li>
            <button className="drg-button border-b-4 border-drg-primary-500" disabled>
              <a className="flex gap-1 ">
                <LabelIcon width="18px" fill="#ff9c00" />
                <p>Analyzer</p>
              </a>
            </button>
          </li>
          <li>
            <button className="drg-button drg-button-disabled" disabled><a>Sav to Json</a></button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar