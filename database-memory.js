import {randomUUID} from 'node:crypto';

export class DatabaseMemory {
    #videos = new Map();

    list(search) {
        return Array.from(this.#videos.entries())
            .map((videoArray) => {
                const id = videoArray[0];
                const data = videoArray[1];
               
                return {
                    id,
                    ...data,
                };
            })
            .filter(video => {
                if (search) {
                    
                    return video.title.includes(search);
                }
                return true;
            });
        // array.from tranforma estruturas que não são arrays em arrays
        // query = busca, ou seja, é o que o usuário quer buscar, ou seja, o que ele quer encontrar
        // se ele quiser buscar por node, ele vai retornar todos os videos que tem node no titulo, se nao tiver nada, ele vai retornar todos os videos
    }

    create(video) {
        const videoId = randomUUID();
        
        this.#videos.set(videoId, video);
        //set = criar um novo valor, ou atualizar um valor existente dentro do Map
        // no set primeiro se coloca o id, depois o video (primeiro a chave, depois o valor)    
    }

    update(id, video) {
        this.#videos.set(id, video);
    }

    delete(id) {
        this.#videos.delete(id);
    }

}