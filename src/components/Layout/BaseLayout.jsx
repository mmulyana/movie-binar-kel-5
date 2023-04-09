import Navbar from '../Navbar'

export default function BaseLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}
