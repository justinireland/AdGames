import server from './http'
import io from 'socket.io'

export const ServerSocket = io(server)
export const MemoryMatchSocket = ServerSocket.of('/memory-match')