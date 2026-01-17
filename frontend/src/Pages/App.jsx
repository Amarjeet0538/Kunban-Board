import Header from "../components/Header"
import Main from "../components/Main"

function App() {

  return (
    <div className="min-h-screen w-full  relative text-gray-900 flex flex-col font-ubu">
    <div
      className="absolute inset-0 -z-10 pointer-events-none"
      style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
    <Header/>
      <Main/>
  </div>
  )
}

export default App
