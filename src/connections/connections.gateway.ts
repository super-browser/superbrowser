import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BrowsersService } from 'src/browsers/browsers.service';
import { Server } from 'ws';
import * as WebSocket from 'ws';

@WebSocketGateway({
  path: '/connections',
  cors: true,
})
export class ConnectionsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly browsersService: BrowsersService) {}

  // private clients: Map<WebSocket, WebSocket> = new Map();
  private clients: Map<string, WebSocket> = new Map();

  async handleConnection(client: WebSocket, request: any) {
    console.log('Client connected to CDP proxy');

    // Extract browserId from query parameters
    const url = new URL(request.url, `http://${request.headers.host}`);
    const browserId = url.searchParams.get('browserId');

    console.log('Received browserId:', browserId);

    // Here you should validate the browserId
    if (!browserId || !(await this.browsersService.browserExists(browserId))) {
      console.log('Invalid browserId:', browserId);
      client.close(1008, 'Invalid browserId');
      return;
    }

    try {
      // Get browser instance cdp url by browser id
      const {
        browser: { wsEndpoint },
      } = await this.browsersService.getBrowserById(browserId);

      console.log('Connecting to CDP endpoint:', wsEndpoint);

      // Connect to the CDP endpoint
      const cdp = new WebSocket(wsEndpoint);

      cdp.on('open', () => {
        console.log('Connected to CDP WebSocket');
        this.clients.set(browserId, cdp);

        // Forward messages from client to CDP
        client.on('message', (message) => {
          console.log('Forwarding message to CDP:', message);
          cdp.send(message);
        });

        // Forward messages from CDP to client
        cdp.on('message', (message) => {
          console.log('Forwarding message to client:', message);
          client.send(message);
        });
      });

      cdp.on('error', (error) => {
        console.error('CDP WebSocket error:', error);
        client.close(1011, 'CDP WebSocket error');
      });

      cdp.on('close', () => {
        console.log('CDP WebSocket closed');
        client.close(1011, 'CDP WebSocket closed');
      });

      // Handle client disconnection
      client.on('close', () => {
        console.log('Client disconnected');
        cdp.close();
        this.clients.delete(browserId);
      });

      this.clients.set(browserId, cdp);
    } catch (error) {
      console.error('Error creating browser:', error);
      client.close(1011, 'Error creating browser');
    }
  }

  handleDisconnect(client: WebSocket) {
    console.log('Client disconnected from CDP proxy');
    const url = new URL(client.url, 'http://dummy');
    const browserId = url.searchParams.get('browserId');
    const cdp = this.clients.get(browserId);
    if (cdp) {
      cdp.close();
      this.clients.delete(browserId);
    }
  }
}
