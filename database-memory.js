import {randomUUID} from 'node:crypto';

export class DatabaseMemory {
    #videos = new Map();

    list() {
        return Array.from(this.#videos.entries()).map((videoArray) => {
            const id = videoArray[0];
            const data = videoArray[1];
            return {
                id,
                ...data,
            };
        });

        // array.from tranforma estruturas que não são arrays em arrays
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