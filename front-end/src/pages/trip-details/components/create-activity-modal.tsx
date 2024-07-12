import { X, Tag, Calendar } from 'lucide-react'
import { Button } from '../../../components/button'
import { FormEvent } from 'react'
import { api } from '../../../lib/axios'
import { useParams } from 'react-router-dom'

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams()

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')
    const occursAt = data.get('occurs_at')

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at: occursAt,
    })

    // TODO: when an activity is created, make the page reload more efficiently
    window.document.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] bg-zinc-900 rounded-xl py-5 px-6 shadow-shape space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Cadastrar atividade</h2>
            <button onClick={closeCreateActivityModal} className="group">
              <X className="size-5 text-zinc-400 group-hover:text-zinc-300" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="px-4 h-14 flex items-center gap-2 flex-1 p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="px-4 h-14 flex items-center gap-2 flex-1 p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg">
            <Calendar className="text-zinc-400 size-5" />
            <input
              type="datetime-local"
              name="occurs_at"
              placeholder="Data e horário da atividade"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button size="full">Salvar atividade</Button>
        </form>
      </div>
    </div>
  )
}
