import TestWrapper from '../components/test/TestWrapper'

function Test() {
  return (
    <div className="flex h-dvh flex-col items-center gap-10 overflow-y-auto bg-pink-100 p-10">
      <h1 className="text-4xl font-bold text-gray-700">
        Test 페이지 ^~^ (UI 확인용)
      </h1>
      <TestWrapper label="테스트">
        <button className="rounded-md bg-pink-100 px-4 py-2 text-gray-700 hover:bg-pink-200">
          test
        </button>
      </TestWrapper>
    </div>
  )
}

export default Test
