import { Server } from 'ws';
import { Module } from "@nestjs/common";
import 'dotenv/config';

const port =process.env.SOCKET_PORT || 8585;
const wss = new Server({ port:port, });
wss.on('connection',  (ws, req) => {

  const url = new URL(req?.url, `http://${req?.headers?.host}` || `https://${req?.headers?.host}`);
  const userId = url.searchParams.get('userId');
  const role = url.searchParams.get('role');
  ws.userId = userId;
  ws.role=role
  // const allClients = ws?.connectedClients;

  // const alreadyExist  = allClients?.filter((val)=>val?.userId == userId)

  // if(alreadyExist?.length > 0   ) {
  //   return;
  // }
  // ws?.connectedClients?.push({ ws, userId, role });
  // console.log(ws.connectedClients);
});



export const sendNotification =  async (userId, message) => {
  wss.clients.forEach((client) => {
    if (client.userId === userId || client.role ==='admin') {
      client.send(message);
    }

  });
  // for (const client of connectedClients) {
  //   if (client.userId === userId  || client.role == 'admin') {
  //     console.log('called');
  //     try {
  //       client.ws.send(message);
  //     } catch(error) {
  //       console.error(error);
  //     }
  //   }
  //
  // }


};
@Module({
  providers: [],
  exports: [],
})
export class EventsGateway {


}
