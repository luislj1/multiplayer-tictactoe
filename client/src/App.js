import { useEffect, useState } from "react"
import io from "socket.io-client"

const socket = io("http://127.0.0.1:3005")

function App() {
  let [loggedInUser, setLoggedInUser] = useState(null)
  let [logInUser, setLogInUser] = useState("")

  let [tiles, setTiles] = useState([])
  let [room, setRoom] = useState(null)

  let [turn, setTurn] = useState(null)
  let [playerID, setPlayerID] = useState(null)

  let [rooms, setRooms] = useState([])

  let [state, setState] = useState("Waiting for a player...")
  let [turnState, setTurnState] = useState("")

  useEffect(() =>{
    socket.on('lobby change', (rooms) =>{
      setRooms(rooms)
    })

    socket.on('get rooms', (rooms) =>{
      setRooms(rooms)
    })

  }, [])

  useEffect(() =>{
    socket.on('user played', (played) =>{
      
      let _tiles = [...tiles]

      setTiles((prev) => _tiles = prev)

      _tiles[played.index].played = true

      const tile1 = document.getElementById('tile-1')
      const tile2 = document.getElementById('tile-2')
      const tile3 = document.getElementById('tile-3')
      const tile4 = document.getElementById('tile-4')
      const tile5 = document.getElementById('tile-5')
      const tile6 = document.getElementById('tile-6')
      const tile7 = document.getElementById('tile-7')
      const tile8 = document.getElementById('tile-8')
      const tile9 = document.getElementById('tile-9')

      played.playerID === 1 ? document.getElementById(played.tile.tile).textContent = 'X' : document.getElementById(played.tile.tile).textContent = "O"

      if(tile1.textContent === "X" && tile2.textContent === "X" && tile3.textContent === "X"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile4.textContent === "X" && tile5.textContent === "X" && tile6.textContent === "X"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile7.textContent === "X" && tile8.textContent === "X" && tile9.textContent === "X"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile1.textContent === "X" && tile4.textContent === "X" && tile7.textContent === "X"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile2.textContent === "X" && tile5.textContent === "X" && tile8.textContent === "X"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile3.textContent === "X" && tile6.textContent === "X" && tile9.textContent === "X"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile1.textContent === "X" && tile5.textContent === "X" && tile9.textContent === "X"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile3.textContent === "X" && tile5.textContent === "X" && tile7.textContent === "X"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile1.textContent === "X" && tile2.textContent === "X" && tile3.textContent === "X"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile1.textContent === "O" && tile2.textContent === "O" && tile3.textContent === "O"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile4.textContent === "O" && tile5.textContent === "O" && tile6.textContent === "O"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile7.textContent === "O" && tile8.textContent === "O" && tile9.textContent === "O"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile1.textContent === "O" && tile4.textContent === "O" && tile7.textContent === "O"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile2.textContent === "O" && tile5.textContent === "O" && tile8.textContent === "O"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile3.textContent === "O" && tile6.textContent === "O" && tile9.textContent === "O"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile1.textContent === "O" && tile5.textContent === "O" && tile9.textContent === "O"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile3.textContent === "O" && tile5.textContent === "O" && tile7.textContent === "O"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }
      else if(tile1.textContent === "O" && tile2.textContent === "O" && tile3.textContent === "O"){
        socket.emit('game ended', {room: played.room, playerID: played.playerID, name: played.loggedInUser})
        return
      }

      setTurn((_prev) =>{
        if(_prev === 1){
          setState(prev => setState(`Player 2 plays!`)) 
          setTurn(2)
        }else{
          setState(prev => setState(`Player 1 plays!`)) 
          setTurn(1)
        }           
      })
      
    })

  }, [socket])

  useEffect(() =>{
    socket.on('game ended', (ended) =>{
      
      setState(`${ended} wins!`)
      
      setTimeout(() =>{
        setRoom(null)
        setState('Waiting for a player...')
        setTurn(null)
        setTiles([])
      }, 3000)

    })

    socket.on('game started', () =>{
      setState('Player 1 plays!')
      setTiles([])
      setTiles([{tile: "tile-1", played: false}, {tile: "tile-2", played: false}, {tile: "tile-3", played: false},
      {tile: "tile-4", played: false}, {tile: "tile-5", played: false}, {tile: "tile-6", played: false},
      {tile: "tile-7", played: false}, {tile: "tile-8", played: false}, {tile: "tile-9", played: false}])
      setTurn(1)
    })

    socket.on('join room', (rooms) =>{
      setTiles([{tile: "tile-1", played: false}, {tile: "tile-2", played: false}, {tile: "tile-3", played: false},
      {tile: "tile-4", played: false}, {tile: "tile-5", played: false}, {tile: "tile-6", played: false},
      {tile: "tile-7", played: false}, {tile: "tile-8", played: false}, {tile: "tile-9", played: false}])
      setPlayerID(rooms.id)
    })

  }, [socket])

  useEffect(() =>{
    socket.on('left room', () =>{
      setState('Waiting for a player...')
      setPlayerID(1)
      setTurn(null)
    })
  }, [socket])

  function onLogIn(e){
    e.preventDefault()
    setLoggedInUser(logInUser)
    setLogInUser("")
  }

  function joinRoom(room){
    socket.emit('join room', room)
    setRoom(room)
  }

  function leaveRoom(){
    socket.emit('leave room', room)
    setState("Waiting for a player...")
    setTiles([""])
    setRoom(null)
    setTurn(null)
    setPlayerID(null)
  }

  function makeMove(tile, index){
    socket.emit('user played', {tile, playerID, room, loggedInUser, index})
  }

  if(!loggedInUser){
  return <div className="w-screen h-screen flex flex-col items-center gap-4">
    <span className="text-3xl font-semibold">Tic-Tac-Toe</span>
      <form onSubmit={onLogIn} className="flex flex-col gap-4">
          <input placeholder="Choose a name" 
          onChange={(e) => setLogInUser(e.target.value)} className="border-2 border-black rounded focus:outline-none p-2"></input>
          <button type="submit" className="bg-black text-white font-semibold p-2 rounded">Log in</button>
      </form>
    </div>
  }

  return (
    <div className="w-screen h-screen">
      {room 
        ? 
      (<div className="flex flex-col justify-center items-center gap-4">
        <span className="text-3xl font-semibold">Tic-Tac-Toe</span>
        <span>{state}</span>
        <span>{turnState}</span>
        <div className="grid grid-cols-3 grid-rows-3 w-1/5 h-80 divide-x divide-y divide-solid shadow-md shadow-black rounded-lg bg-gray-800">
          {tiles.map((tile, index) =>{
            return <button id={tile.tile} key={tile.tile} className="relative font-bold text-lg text-white tile" disabled={tile.played === true || turn !== playerID} onClick={() => makeMove(tile, index)}></button>
          })}
        </div>
        <button onClick={leaveRoom} className="bg-black font-semibold text-white p-2 rounded">Leave room</button>
      </div>) 
        : 
      (<div className="flex flex-col justify-center items-center gap-4">
        <span className="text-3xl font-semibold">Tic-Tac-Toe</span>
        <span className="text-lg">Playing as: <span className="font-semibold underline">{loggedInUser}</span></span>
      <div className="grid grid-cols-3 grid-rows-3 justify-items-center w-96 h-96 gap-2">
        {rooms.map((room) =>{
          return <div className="flex flex-col justify-center px-2 py-1 rounded-lg shadow-lg divide-y" key={room.room}>
            <span className="flex justify-center items-center font-bold">{room.room}</span>

            {room.players === 0 && <span className="flex justify-center items-center text-gray-600 font-semibold text-sm">{room.players}/2 players</span>}
            {room.players === 1 && <span className="flex justify-center items-center text-yellow-600 font-semibold text-sm">{room.players}/2 players</span>}
            {room.players === 2 && <span className="flex justify-center items-center text-green-600 font-semibold text-sm">{room.players}/2 players</span>}

            <button className="bg-black font-semibold text-white rounded py-2" disabled={room.players >= 2} onClick={() => joinRoom(room.room)}>Play</button>

          </div>
        })}

      </div>
      </div>)}
    </div>
  );
}

export default App;
