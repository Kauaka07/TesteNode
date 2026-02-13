import {randomUUID} from 'node:crypto';
import { sql } from './db.js';

export class DatabasePostgres {
    #videos = new Map();

    async list(search ) {
        let videos

        if (search) {
            videos = await sql`
                SELECT * FROM videos
                WHERE title ILIKE ${'%' + search + '%'} OR description ILIKE ${'%' + search + '%'}
            `;
        } else {
            videos = await sql`
                SELECT * FROM videos
            `;
        }   

        return videos 
        // array.from tranforma 
        // estruturas que não são arrays em arrays
        // query = busca, ou seja, é o que o usuário quer buscar, ou seja, o que ele quer encontrar
        // se ele quiser buscar por node, ele vai retornar todos os videos que tem node no titulo, se nao tiver nada, ele vai retornar todos os videos
    }

    async create(video) {
        const videoId = randomUUID();
        const { title, description, duration} = video;
        
        await sql`
            INSERT INTO videos (id, title, description, duration)
            VALUES (${videoId}, ${video.title}, ${video.description}, ${video.duration})
        `;
        //set = criar um novo valor, ou atualizar um valor existente dentro do Map
        // no set primeiro se coloca o id, depois o video (primeiro a chave, depois o valor)    
    }
        //set = criar um novo valor, ou atualizar um valor existente dentro do Map
        // no set primeiro se coloca o id, depois o video (primeiro a chave, depois o valor)    
    

    async update(id, video) {
        const { title, description, duration} = video;

        await sql`
            UPDATE videos
            SET title = ${title}, description = ${description}, duration = ${duration}
            WHERE id = ${id}
        `;
    }

    async delete(id) {
        await sql`
            DELETE FROM videos
            WHERE id = ${id}
        `;
    }

}  