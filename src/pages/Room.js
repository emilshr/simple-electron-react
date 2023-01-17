import { useState } from "react"

export const Room = () => {

    const [room, setRoom] = useState('')
    return <>
    Enter room name
    <input onChange={event => {
        event.preventDefault()
    }} />
    <button disabled={room.length === 0} onClick={() => {}}>Join room</button>
    </>

}