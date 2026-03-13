import {
  Undo2,
  Redo2,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Baseline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from 'lucide-react'

import IconLink from '../../assets/images/icon-link.svg?react'
import IconImage from '../../assets/images/icon-image.svg?react'
import IconLineHeight from '../../assets/images/icon-line-height.svg?react'
import IconOutdent from '../../assets/images/icon-outdent.svg?react'
import IconIndent from '../../assets/images/icon-indent.svg?react'
import IconClearFormat from '../../assets/images/icon-clear-format.svg?react'

export default function EditorToolbar() {
  const selectBox =
    'flex items-center justify-between h-6 bg-gray-150 px-2 rounded-sm cursor-pointer gap-1 whitespace-nowrap'
  const divider = <div className="border-gray-250 mx-3 h-7 border-r" />

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-white py-2">
      {/* 윗줄 */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <Undo2 className="h-5 w-5 cursor-pointer text-gray-600" />
          <Redo2 className="h-5 w-5 cursor-pointer text-gray-600" />
        </div>

        <div className="flex items-center gap-2">
          <div className={`${selectBox} w-22`}>
            <span className="text-xs font-medium text-gray-600">기본서체</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className={`${selectBox} w-13`}>
            <span className="text-xs font-medium text-gray-600">16</span>
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>

        {divider}

        <div className="flex items-center gap-3">
          <Bold className="h-4 w-4 cursor-pointer text-gray-600" />
          <Italic className="h-4 w-4 cursor-pointer text-gray-600" />
          <Underline className="h-4 w-4 cursor-pointer text-gray-600" />
          <Strikethrough className="h-4 w-4 cursor-pointer text-gray-600" />
          <div className="flex cursor-pointer items-center gap-1">
            <div className="border-gray-250 h-4 w-4 border bg-blue-600" />
            <ChevronDown className="h-3 w-3" />
          </div>
          <Baseline className="h-4 w-4 cursor-pointer text-gray-600" />
        </div>

        {divider}

        {/* 링크 및 이미지 */}
        <div className="flex items-center gap-3">
          <IconLink className="h-4 w-4 cursor-pointer text-gray-600" />
          <IconImage className="h-4 w-4 cursor-pointer text-gray-600" />
        </div>
      </div>

      {/* 아랫줄 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`${selectBox} w-13`}>
            <List className="h-4 w-4 text-gray-600" />
            <ChevronDown className="h-2 w-2" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AlignLeft className="h-4 w-4 cursor-pointer text-gray-600" />
          <AlignCenter className="h-4 w-4 cursor-pointer text-gray-600" />
          <AlignRight className="h-4 w-4 cursor-pointer text-gray-600" />
          <AlignJustify className="h-4 w-4 cursor-pointer text-gray-600" />
        </div>

        <div className="flex items-center gap-3">
          {/* 아랫줄 커스텀 */}
          <IconLineHeight className="h-4 w-4 cursor-pointer text-gray-600" />
          <IconOutdent className="h-4 w-4 cursor-pointer text-gray-600" />
          <IconIndent className="h-4 w-4 cursor-pointer text-gray-600" />
          <IconClearFormat className="h-4 w-4 cursor-pointer text-gray-600" />
        </div>
      </div>
    </div>
  )
}
