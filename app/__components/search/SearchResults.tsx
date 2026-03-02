const SearchResults = ({show}: {show: boolean}) => {
  return (
    <div className={`bg-white h-screen flex items-center justify-center  duration-200 ${show ? 'z-50' : '-z-1'}`} >
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl" >
              test
        </div>
    </div>
  )
}

export default SearchResults