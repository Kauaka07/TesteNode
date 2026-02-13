import {fastify} from 'fastify';
import {DatabaseMemory} from './database-memory.js';

const server = fastify();

const database = new DatabaseMemory();

// Rota para a página de postagem
// http://localhost:333/videos



server.post('/videos', (request, reply) => { 
    
    const {title, description, duration} = request.body;
    
    database.create({
        title: title,
        description: description,
        duration: duration,
    });

    return reply.status(201).send('Video criado com sucesso');
    // post = criar dados
});

server.get('/videos', () => {
    const videos = database.list();

    return videos;
    // get = buscar dados
});

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id;
    const {title, description, duration} = request.body;

    database.update(videoId, {
        title,
        description,
        duration,
    });
    return reply.status(204).send();
    // put = atualizar dados
});

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id;

    database.delete(videoId);
    return reply.status(204).send();
    // delete = deletar dados
});

server.listen( {
    port: 3333,
});
