import { prisma } from '@/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'

async function createTodo(data: FormData) {
  'use server'

  const title = data.get('title')?.valueOf()
  if (typeof title !== 'string' || title.length === 0) {
    return console.log('Invalid Title')
  }
  await prisma.todo.create({ data: { title, complete: false } })
  redirect('/')
}

function page() {
  return (
    <>
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">New</h1>
      </header>
      <form action={createTodo} className="flex flex-col gap-2">
        <input
          type="text"
          title="title"
          name="title"
          className="rounded border border-slate-300 px-2 py-1 
          text-slate-300 outline-none focus-within:bg-slate-700"
        />
        <div className="flex justify-end gap-1">
          <Link
            href=".."
            className="rounded border border-slate-300 px-2 py-1 
          text-slate-300 outline-none focus-within:bg-slate-700 hover:bg-slate-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded border border-slate-300 px-2 py-1 
          text-slate-300 outline-none focus-within:bg-slate-700 hover:bg-slate-700"
          >
            Create
          </button>
        </div>
      </form>
    </>
  )
}
export default page
