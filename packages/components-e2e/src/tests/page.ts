import ButtonPage from './button/button.page'
import SearchInputPage from './searchInput/searchInput.page'

interface PageType {
    path: string;
    Component: () => JSX.Element
}

const allPages: PageType[] = [
    ...ButtonPage,
    ...SearchInputPage,
]

export default allPages