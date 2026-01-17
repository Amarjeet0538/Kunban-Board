
const VisualIndicator = () => {
  return (
    <div className="relative pt-0.5 bg-blue-600 border border-blue-300 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200" >
      <div className="absolute p-1.5 rounded-full border-2 border-blue-600 bg-white left-0 -top-2"></div>
    </div>
  )
}

export default VisualIndicator