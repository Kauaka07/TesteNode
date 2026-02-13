import {fastify} from 'fastify';
//import {DatabaseMemory} from './database-memory.js';
import {DatabasePostgres} from './database-postgres.js';

const server = fastify();

//const database = new DatabaseMemory();
const database = new DatabasePostgres();
// Rota para a página de postagem
// http://localhost:333/videos



server.post('/videos', async (request, reply) => { 
    
    const {title, description, duration} = request.body;
    
    await database.create({
        title: title,
        description: description,
        duration: duration,
    });

    return reply.status(201).send('Video criado com sucesso');
    // post = criar dados
});

server.get('/videos', async (request) => {
    const search = request.query.search;
    
    const videos = await database.list(search);


    return videos;
    // get = buscar dados
});

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;
    const {title, description, duration} = request.body;

    await database.update(videoId, {
        title,
        description,
        duration,
    });
    return reply.status(204).send();
    // put = atualizar dados
});

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;

    await database.delete(videoId);
    return reply.status(204).send();
    // delete = deletar dados
});

server.listen( {
    port: process.env.PORT || 3333,
});
