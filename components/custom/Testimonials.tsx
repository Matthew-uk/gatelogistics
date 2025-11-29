export default function Testimonials(){
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h3 className="text-2xl font-bold text-center">What Our Clients Say About US</h3>
      <div className="grid grid-cols-3 gap-6 mt-8">
        {[1,2,3].map(i=> (
          <div key={i} className="bg-white p-6 rounded shadow-sm text-center">
            <img src="/avatar.png" className="w-16 h-16 rounded-full mx-auto" alt="client avatar"/>
            <p className="mt-4 text-sm text-gray-600">"Their performance on our project was extremely successful. As a result of this collaboration, the project was met with exceptional quality & delivery."</p>
            <div className="mt-4 text-xs text-gray-400">Alex Douglas</div>
          </div>
        ))}
      </div>
    </section>
  )
}
