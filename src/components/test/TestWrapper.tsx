interface TestWrapperProps {
  label: string
  children: React.ReactNode
}

function TestWrapper({ label, children }: TestWrapperProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border-4 border-solid border-pink-300 bg-white p-8">
      <h3 className="text-2xl font-medium">{label}</h3>
      <div>{children}</div>
    </div>
  )
}

export default TestWrapper
