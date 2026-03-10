import Dropdown from '../components/Dropdown'
import TestWrapper from '../components/test/TestWrapper'

function Test() {
  return (
    <div className="bg-primary-100 flex h-dvh flex-col items-center gap-10 overflow-y-auto p-10">
      <h1 className="text-4xl font-bold text-gray-700">Dropdown UI Test</h1>

      <TestWrapper label="Dropdown State Check (Left: Normal / Right: Custom Input)">
        <div className="flex items-start gap-24 pb-80">
          {/* 왼쪽 드롭다운 */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-600">
              Left: Default Select
            </span>
            <Dropdown />
          </div>

          {/* 오른쪽 */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-600">
              Right: With Textbox
            </span>
            <Dropdown />
          </div>
        </div>
      </TestWrapper>
    </div>
  )
}

export default Test
