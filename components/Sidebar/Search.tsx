import { CommandMenuCustom } from "@/components/Sidebar/CommandMenuCustom"
import { cn } from "@/utils/cn"
import { useState } from "react"
import { FiCommand, FiSearch } from "react-icons/fi"

interface SearchProps {
  title: string
  source: any[]
  shortcut?: string // Default should be `/`
  groupName: string
  className?: string
  placeholder?: string
}

export const Search = ({
  title,
  source,
  shortcut = "/",
  groupName,
  className,
  placeholder,
}: SearchProps) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("Search")

  return (
    <>
      <div
        className={cn(
          "bg-stone-200 relative rounded-lg flex items-center px-2 py-1.5 text-sm hover:bg-stone-100 hover:border-stone-300 border-2",
          className
        )}>
        <FiSearch
          className='mr-2 h-5 w-5 cursor-pointer'
          onClick={() => setOpen(true)}
        />
        <input
          onFocus={(e) => {
            e.target.blur()
            setOpen(true)
          }}
          type='text'
          placeholder='Search'
          defaultValue={value}
          className='w-full bg-transparent placeholder:text-stone-400 focus:outline-none '
        />

        <span
          className='p-1 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded absolute right-1.5 top-1/2 -translate-y-1/2 hover:scale-105 hover:cursor-pointer active:scale-90'
          onClick={() => setOpen(true)}>
          <FiCommand /> + {shortcut}
        </span>
      </div>

      {/* Pass props dynamically */}
      <CommandMenuCustom
        open={open}
        setOpen={setOpen}
        title={title}
        source={source}
        shortcut={shortcut}
        groupName={groupName}
        placeholder={placeholder}
        setSearch={setValue}
      />
    </>
  )
}
