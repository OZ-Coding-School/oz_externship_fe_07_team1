import Dropdown from '../components/Dropdown'
import TestWrapper from '../components/test/TestWrapper'

function Test() {
  return (
    <div className="bg-primary-100 flex h-dvh flex-col items-center gap-10 overflow-y-auto p-10">
      <h1 className="text-4xl font-bold text-gray-700">Dropdown UI Test</h1>

      <TestWrapper label="Dropdown State Check">
        <div className="flex min-h-[600px] w-full items-start gap-24 p-5">
          {/* 기본 */}
          <div className="w-72">
            <span className="mb-3 block text-sm font-medium text-gray-600">
              Default Select
            </span>
            <Dropdown />
          </div>

          {/* 직접입력 */}
          <div className="w-72">
            <span className="mb-3 block text-sm font-medium text-gray-600">
              With Textbox
            </span>
            <Dropdown />
          </div>
        </div>
      </TestWrapper>
    </div>
  )
}

export default Test
