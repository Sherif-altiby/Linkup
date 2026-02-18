const LeftSideBar = () => {
  return (
    <section className="p-3 w-1/4 h-screen sticky top-0 " >
         <h2 className="text-xl font-bold mb-4"> Sponsored </h2>

          {/* Sponsored Card 1 */}
            <div className="bg-white  rounded-lg shadow p-3 hover:shadow-lg transition">
                <img
                src="https://images.pexels.com/photos/7726306/pexels-photo-7726306.jpeg"
                alt="Sponsored Product"
                className="w-full h-30 object-cover rounded-md mb-2"
                />
                <h3 className="text-sm font-semibold">Awesome Product</h3>
                <p className="text-xs text-gray-500">www.awesomeproduct.com</p>
                
            </div>

          {/* Sponsored Card 2 */}
            <div className="bg-white mt-3 rounded-lg shadow p-3 hover:shadow-lg transition">
                <img
                src="https://images.pexels.com/photos/7726306/pexels-photo-7726306.jpeg"
                alt="Sponsored Product"
                className="w-full h-30 object-cover rounded-md mb-2"
                />
                <h3 className="text-sm font-semibold">Awesome Product</h3>
                <p className="text-xs text-gray-500">www.awesomeproduct.com</p>
                
            </div>

          {/* Sponsored Card 3 */}
            <div className="bg-white mt-3 rounded-lg shadow p-3 hover:shadow-lg transition">
                <img
                src="https://images.pexels.com/photos/7726306/pexels-photo-7726306.jpeg"
                alt="Sponsored Product"
                className="w-full h-30 object-cover rounded-md mb-2"
                />
                <h3 className="text-sm font-semibold">Awesome Product</h3>
                <p className="text-xs text-gray-500">www.awesomeproduct.com</p>
                
            </div>


    </section>
  )
}

export default LeftSideBar