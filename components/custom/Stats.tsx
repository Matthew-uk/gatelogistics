export default function Stats(){
  const stats = [
    {val:'2+', label:'Offices Worldwide'},
    {val:'272+', label:'Employees Worldwide'},
    {val:'0+', label:'Countries Covered'},
    {val:'0+', label:'Years Of Experience'}
  ]
  return (
    <section className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-4 gap-6 text-center">
        {stats.map((s,i)=>(
          <div key={i} className="p-6">
            <div className="text-3xl font-bold">{s.val}</div>
            <div className="mt-2 text-sm text-gray-300">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
