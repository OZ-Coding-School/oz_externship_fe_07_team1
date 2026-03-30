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

import IconLink from '../../../assets/images/icon-link.svg?react'
import IconImage from '../../../assets/images/icon-image.svg?react'
import IconLineHeight from '../../../assets/images/icon-line-height.svg?react'
import IconOutdent from '../../../assets/images/icon-outdent.svg?react'
import IconIndent from '../../../assets/images/icon-indent.svg?react'
import IconClearFormat from '../../../assets/images/icon-clear-format.svg?react'

interface EditorToolbarProps {
  onBold: () => void
  onItalic: () => void
  onUnderline: () => void
  onStrike: () => void
  onLink: () => void
  onImage: () => void
  onUnorderedList: () => void
  onUndo: () => void
  onRedo: () => void
  onCode: () => void
  onClear: () => void
}

export default function EditorToolbar({
  onBold,
  onItalic,
  onUnderline,
  onStrike,
  onLink,
  onImage,
  onUnorderedList,
  onUndo,
  onRedo,
  onCode,
  onClear,
}: EditorToolbarProps) {
  const divider = <div className="mr-7 h-7 border-r border-gray-200" />

  return (
    <div className="bg-surface-default rounded-t-5 flex h-25 w-full flex-col items-center justify-center gap-5 overflow-hidden px-8 py-4">
      <div className="flex w-full items-center justify-center gap-3">
        <div className="flex items-center gap-3">
          <Undo2
            className="h-6 w-6 cursor-pointer text-gray-600"
            onClick={onUndo}
          />
          <Redo2
            className="h-6 w-6 cursor-pointer text-gray-600"
            onClick={onRedo}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gray-150 flex h-6 w-22 cursor-pointer items-center justify-between gap-1 rounded-sm px-3 whitespace-nowrap">
            <span className="text-xs font-medium text-gray-600">기본서체</span>
            <ChevronDown className="h-3 w-3" />
          </div>

          <div className="bg-gray-150 flex h-6 w-13 cursor-pointer items-center justify-between gap-1 rounded-sm px-3 whitespace-nowrap">
            <span className="text-xs font-medium text-gray-600">16</span>
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>

        {divider}

        <div className="flex items-center gap-3">
          <Bold
            className="h-5 w-5 cursor-pointer text-gray-600"
            onClick={onBold}
          />
          <Italic
            className="h-5 w-5 cursor-pointer text-gray-600"
            onClick={onItalic}
          />
          <Underline
            className="h-5 w-5 cursor-pointer text-gray-600"
            onClick={onUnderline}
          />
          <Strikethrough
            className="h-5 w-5 cursor-pointer text-gray-600"
            onClick={onStrike}
          />

          <div className="flex cursor-pointer items-center gap-1">
            <div className="bg-primary-default h-4 w-4 border-2 border-gray-200" />
            <ChevronDown className="h-3 w-3" />
          </div>

          <Baseline
            className="h-5 w-5 cursor-pointer text-gray-600"
            onClick={onCode}
          />
        </div>

        {divider}

        <div className="flex items-center gap-3">
          <IconLink
            className="h-5 w-5 cursor-pointer text-gray-600"
            onClick={onLink}
          />
          <IconImage
            className="h-5 w-5 cursor-pointer text-gray-600"
            onClick={onImage}
          />
        </div>
      </div>

      <div className="flex w-full items-center justify-center gap-4">
        <div
          className="bg-gray-150 flex h-6 w-13 cursor-pointer items-center justify-between gap-1 rounded-sm px-3 whitespace-nowrap"
          onClick={onUnorderedList}
        >
          <List className="h-5 w-5 text-gray-600" />
          <ChevronDown className="h-3 w-3" />
        </div>

        <div className="flex items-center gap-3">
          <AlignLeft className="h-5 w-5 cursor-pointer text-gray-600" />
          <AlignCenter className="h-5 w-5 cursor-pointer text-gray-600" />
          <AlignRight className="h-5 w-5 cursor-pointer text-gray-600" />
          <AlignJustify className="h-5 w-5 cursor-pointer text-gray-600" />
        </div>

        <div className="flex items-center gap-3">
          <IconLineHeight className="h-5 w-5 cursor-pointer text-gray-600" />
          <IconOutdent className="h-5 w-5 cursor-pointer text-gray-600" />
          <IconIndent className="h-5 w-5 cursor-pointer text-gray-600" />
          <IconClearFormat
            className="h-5 w-5 cursor-pointer text-gray-600"
            onClick={onClear}
          />
        </div>
      </div>
    </div>
  )
}
