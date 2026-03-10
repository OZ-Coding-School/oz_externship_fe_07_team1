import { Button } from '../components/Button'
import { SidebarTabButton } from '../components/SidebarTabButton'
import { SortingButton } from '../components/SortingButton'
import TestWrapper from '../components/test/TestWrapper'

function Test() {
  return (
    <div className="bg-primary-100 flex h-dvh flex-col items-center gap-10 overflow-y-auto p-10">
      <h1 className="text-4xl font-bold text-gray-700">
        Test 페이지 ^~^ (UI 확인용)
      </h1>
      <TestWrapper label="Button (default, disabled)">
        <Button>Button Text</Button>
        <Button disabled>Button Text</Button>
      </TestWrapper>
      <TestWrapper label="Sidebar Tab Button">
        <SidebarTabButton label="Button Text" />
        <SidebarTabButton status="active" label="Button Text" />
        <SidebarTabButton status="disabled" label="Button Text" />
      </TestWrapper>
      <TestWrapper label="Sorting Button">
        <SortingButton label="최신순" />
        <SortingButton status="enabled" label="최신순" />
      </TestWrapper>
    </div>
  )
}

export default Test
