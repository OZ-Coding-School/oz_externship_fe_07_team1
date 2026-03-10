interface TestWrapperProps {
  label: string
  children: React.ReactNode
}

function TestWrapper({ label, children }: TestWrapperProps) {
  return (
    <div className="border-primary-400 flex flex-col items-center gap-4 rounded-xl border-4 border-solid bg-white p-8">
      <h3 className="text-2xl font-medium">{label}</h3>
      <div className="flex gap-4">{children}</div>
    </div>
  )
}

export default TestWrapper
