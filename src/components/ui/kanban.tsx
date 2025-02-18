"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Column } from "@/src/constants/kanban"
import { motion } from "framer-motion"

interface KanbanBoardProps {
  kanbanData: Column
}

const KanbanBoard = ({ kanbanData }: KanbanBoardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className='p-4'>
      <h2 className='text-3xl font-bold mb-6 text-center'>
        {kanbanData.mainTitle}
      </h2>
      {kanbanData.description && (
        <p className='text-sm text-gray-600 dark:text-gray-400 mt-1 text-center mb-10'>
          {kanbanData.description}
        </p>
      )}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {kanbanData.categories.map((column, colIndex) => (
          <motion.div
            key={column.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: colIndex * 0.2 }}
            className='flex flex-col'>
            <Card className='bg-gray-50 dark:bg-gray-800 h-full'>
              <CardHeader className='pb-2'>
                <CardTitle className='text-xl font-semibold'>
                  {column.title}
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {column.tasks.map((task) => {
                  let taskBgClass = "bg-white dark:bg-gray-900"
                  if (column.title === "Working On") {
                    taskBgClass = "bg-yellow-100 dark:bg-yellow-900"
                  } else if (column.title === "Implemented") {
                    taskBgClass = "bg-green-100 dark:bg-green-900"
                  }
                  return (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`${taskBgClass} p-4 rounded-md shadow`}>
                      <h3 className='font-medium text-lg'>{task.title}</h3>
                      {task.description && (
                        <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                          {task.description}
                        </p>
                      )}
                    </motion.div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default KanbanBoard
