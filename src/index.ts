import { Server } from "socket.io";
import app from "./app";
import config from "./config";
import http from 'http';


app.listen(config.PORT, () => {
	console.log('Server is running on port', config.PORT);
});

const server = http.createServer(app);
export const io = new Server(server,{
    cors: {
        origin: "*",
		
    },

});

io.listen(3001);
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

   /*  // Manejar un evento personalizado
    socket.on('yalagenere', (data) => {
        console.log('Mensaje recibido:', data);
        // Emitir un mensaje a todos los clientes
        io.emit('mensaje', data);
    }); */

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});
