export default function BloodInfo() {
  const bloodGroups = [
    { group: "A+", count: 120 },
    { group: "A-", count: 60 },
    { group: "B+", count: 90 },
    { group: "B-", count: 60 },
    { group: "O+", count: 150 },
    { group: "O-", count: 60 },
    { group: "AB+", count: 60 },
    { group: "AB-", count: 60 },
  ];


  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Blood Info</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {bloodGroups.map((b) => (
          <div key={b.group} className="bg-gray-100 p-4 rounded text-center">
            <p className="font-semibold">{b.group}</p>
            <p className="text-gray-600">{b.count} donors</p>
          </div>
        ))}
      </div>
    </div>
  );
}
