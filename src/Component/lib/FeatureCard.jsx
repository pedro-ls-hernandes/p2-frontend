export default function FeatureCard({ icon, title, className = "" }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 shadow-soft flex items-center gap-3 ${className}`}>
      <div className="text-primary">{icon}</div>
      <p className="text-sm text-primary">{title}</p>
    </div>
  )
}
