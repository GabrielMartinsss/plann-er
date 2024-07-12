import { CheckCircle2, CircleDashed, UserCog } from 'lucide-react'
import { Button } from '../../../components/button'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../../lib/axios'

interface Participants {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function Guests() {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participants[]>([])

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="w-80 space-y-6">
      <div className="space-y-6">
        <h2 className="font-semibold text-xl">Convidados</h2>

        <div className="space-y-5">
          {participants.map((participant, index) => {
            return (
              <div
                key={participant.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <span className="block text-zinc-100 font-medium">
                    {participant.name ?? `Convidado ${index}`}
                  </span>
                  <span className="block text-zinc-400 text-sm truncate">
                    {participant.email}
                  </span>
                </div>
                {participant.is_confirmed ? (
                  <CheckCircle2 className="size-5 text-lime-300 shrink-0" />
                ) : (
                  <CircleDashed className="size-5 text-zinc-400 shrink-0" />
                )}
              </div>
            )
          })}
        </div>

        {/* TODO: modal to manage guests */}
        <Button variant="secondary" size="full">
          <UserCog className="size-5" />
          Gerenciar convidados
        </Button>
      </div>
    </div>
  )
}
