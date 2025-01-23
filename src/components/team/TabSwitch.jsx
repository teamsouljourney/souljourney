
import Card from "../home/Card"
const TabSwitch = () => {
  return (
    <>
  <div className="w-full h-full mt-20 max-w-xl mx-auto">
  
  <div className="bg-navy-light opacity-3 p-2 rounded-t-lg">
    <div className="flex justify-center space-x-4">
      <button className="px-4 py-2 text-white font-semibold border-b-4 border-navy hover:bg-navy focus:outline-none tab-button" onClick="showTab('tab1')">Health Pyschology</button>
      <button className="px-4 py-2 text-white font-semibold border-b-4 border-navy hover:bg-navy focus:outline-none tab-button" onClick="showTab('tab2')">Educational Psychology</button>
      <button className="px-4 py-2 text-white font-semibold border-b-4 border-navy  hover:bg-navy focus:outline-none tab-button" onClick="showTab('tab3')">Neuropyschology</button>
      <button className="px-4 py-2 text-white font-semibold border-b-4 border-navy  hover:bg-navy focus:outline-none tab-button" onClick="showTab('tab3')">Marriage and Family Therapy</button>
    </div>
  </div>

  <div id="tab1" className="p-4 tab-content bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-semibold mb-2 text-blue-700">Tab 1 Content</h2>
   {/* Card Component */}
    <Card/>
  </div>
  <div id="tab2" className="p-4 tab-content bg-white shadow-md rounded-lg hidden">
    <h2 className="text-2xl font-semibold mb-2 text-blue-700">Tab 2 Content</h2>
    <p>Phasellus eget euismod libero, nec ullamcorper justo. Phasellus eget euismod libero, nec ullamcorper justo.
      Phasellus eget euismod libero, nec ullamcorper justo. Etiam eget augue in ante gravida facilisis.</p>
  </div>
  <div id="tab3" className="p-4 tab-content bg-white shadow-md rounded-lg hidden">
    <h2 className="text-2xl font-semibold mb-2 text-blue-700">Tab 3 Content</h2>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Sed ut
      perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Sed ut perspiciatis
      unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
  </div>

</div>
    </>
  )
}

export default TabSwitch