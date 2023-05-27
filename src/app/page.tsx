import TodoItem from '@/components/TodoItem'
import { prisma } from '@/db'
import Link from 'next/link'

function getTodo() {
  return prisma.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  'use server'

  await prisma.todo.update({ where: { id }, data: { complete } })
}

export default async function Home() {
  const todo = await getTodo()

  return (
    <>
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">Todo</h1>
        <Link
          className="rounded border border-slate-300 px-2 py-1 
          text-slate-300 outline-none focus-within:bg-slate-700 
          hover:bg-slate-700"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todo.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  )
}
