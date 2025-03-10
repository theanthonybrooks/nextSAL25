import { DialogTitle } from "@/components/ui/dialog";
import { DashIcon } from "@radix-ui/react-icons";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface CommandMenuProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  source: any[];
  shortcut?: string; // Default should be `/`
  groupName: string;
  placeholder?: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const scrollbarColors =
  "scrollbar-thumb-gray-300 scrollbar scrollbar-width-2 overflow-y-auto p-3";
const scrollbarColorsDark =
  "scrollbar-thumb-neutral-500 scrollbar scrollbar-width-2 overflow-y-auto p-3";
const scrollbarSize = "max-h-60dvh";
const scrollbarStyle =
  "scrollbar-thumb-gray-300 scrollbar scrollbar-width-2 overflow-y-auto p-3";

{
  /* scrollbar-thumb-gray-300 max-h-[60vh] overflow-y-auto p-3 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2 */
}

export const CommandMenuCustom = ({
  open,
  setOpen,
  title,
  source,
  shortcut = "/",
  groupName,
  placeholder = `Hello. Is it me you're looking for? Use ctrl + ${shortcut} to search faster.`,
  setSearch,
}: CommandMenuProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const shortcutRef = useRef(shortcut);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();
  // Update the ref if shortcut changes
  useEffect(() => {
    shortcutRef.current = shortcut;
  }, [shortcut]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
    }
  }, [open]);

  // Keyboard shortcut handler (depends only on setOpen)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === shortcutRef.current && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  // Extract fields from source dynamically
  const extractedItems = source.map((item) => ({
    title: item.label || item.name,
    icon: item.icon || null,
    path: item.path || item.href || "#",
    group: item.sectionCat || item.group || "Other",
    desc: item.desc || "",
  }));

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const searchTerm = value.toLowerCase();

  const handleValueChange = (newValue: string) => {
    setSearch(newValue);
    setValue(newValue);
  };

  // Group items by group name
  const groups = extractedItems.reduce<Record<string, typeof extractedItems>>(
    (acc, item) => {
      const grp = item.group;
      if (!acc[grp]) acc[grp] = [];
      acc[grp].push(item);
      return acc;
    },
    {},
  );

  // Build groupedItems based on the search term:
  // If the group name includes the search term, include all items;
  // Otherwise, only include items whose title includes the search term.
  const groupedItems = Object.entries(groups).reduce<
    Record<string, typeof extractedItems>
  >((acc, [grpName, items]) => {
    if (grpName.toLowerCase().includes(searchTerm)) {
      acc[grpName] = items;
    } else {
      const filtered = items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm),
      );
      if (filtered.length > 0) acc[grpName] = filtered;
    }
    return acc;
  }, {});

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      shouldFilter={false}
      label={title}
      className="fixed inset-0 flex items-center justify-center text-black"
      onClick={() => setOpen(false)}
    >
      <AnimatePresence>
        {open && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }} // adjust to your liking
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // subtler overlay color
            />

            {/* Dialog box */}
            <motion.div
              variants={dialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative flex max-h-[80vh] w-full max-w-xl flex-col rounded-lg border border-stone-300 bg-white p-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 z-20 rounded p-1 hover:scale-125 active:scale-110"
              >
                <X className="h-5 w-5 text-stone-600" />
              </button>
              <DialogTitle className="sr-only">{title}</DialogTitle>
              <div className="flex items-center gap-1 border-b border-stone-300">
                <IoSearch className="z-20 p-1 text-3xl text-stone-400" />
                <Command.Input
                  ref={inputRef}
                  value={value}
                  onValueChange={handleValueChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setOpen(false);
                    }
                    if (e.key === "Escape") {
                      setValue("");
                      setSearch("");
                      setOpen(false);
                    }
                  }}
                  placeholder={`${placeholder}   (Hint: Ctrl + /)`}
                  className="relative z-10 w-full p-3 text-lg selection:italic selection:text-stone-400 placeholder:text-stone-400 focus:outline-none"
                />
              </div>
              <div className="max-h-60dvh search scrollbar overflow-y-auto p-3">
                <Command.List>
                  {Object.keys(groupedItems).length === 0 ? (
                    <Command.Empty>
                      No results found for{" "}
                      <span className="text-violet-500">"{value}"</span>
                    </Command.Empty>
                  ) : (
                    Object.entries(groupedItems).map(
                      ([groupKey, groupItems]) => (
                        <Command.Group
                          key={groupKey}
                          heading={groupKey.toUpperCase()}
                          className="mb-5 text-sm text-stone-400"
                        >
                          {groupItems.map((item) => (
                            <Command.Item
                              key={item.path}
                              className="flex cursor-pointer items-center gap-2 rounded p-2 pl-5 text-sm text-stone-950 transition-colors hover:bg-stone-100"
                              onMouseEnter={() => setHoveredItem(item.path)}
                              onMouseLeave={() => setHoveredItem(null)}
                              onSelect={() => router.push(item.path)}
                            >
                              {item.icon && <item.icon className="h-4 w-4" />}
                              <Link href={item.path} prefetch={true}>
                                <span>{item.title}</span>
                              </Link>
                              {item.desc && (
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{
                                    opacity: hoveredItem === item.path ? 1 : 0,
                                  }}
                                  transition={{ duration: 0.1 }}
                                  className="inline-flex items-center gap-2 text-stone-600"
                                >
                                  <DashIcon />
                                  <span>{item.desc}</span>
                                </motion.span>
                              )}
                            </Command.Item>
                          ))}
                        </Command.Group>
                      ),
                    )
                  )}
                </Command.List>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Command.Dialog>
  );
};
