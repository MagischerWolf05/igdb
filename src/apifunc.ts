import {Category, DefaultApi, Game, Platform, Publisher} from "./generated/openapi";
const conn = new DefaultApi();
export function AddPublisher(name: string, marketcap: string,id: number): Promise<Publisher> {

    return conn.addPublisher({
        publisher: {
            name: name,
            marketCap: marketcap,
            id: id,
        }
    });
}
export function Updatepublisher(name: string, marketcap: string,id: number): Promise<Publisher> {

    return conn.updatePublisher({
        publisher: {
            name: name,
            marketCap: marketcap,
            id: id,
        }
    });
}export function Addgame(name: string, image: string,date: string, pubid: number, rating: number, downloads: number,price: number,crossplay: boolean ,platform: Array<Platform>,category: Category,size: number,id: number): Promise<Game> {

    return conn.addGame({
        game: {
            name : name,
            image: image,
            releaseDate: date,
            publisherID: pubid,
            rating: rating,
            downloads: downloads,
            price: price,
            crossplay: crossplay,
            platforms: platform,
            category: category,
            size:size
        }
    });
}
export function Updategames(name: string, image: string,date: string, pubid: number, rating: number, downloads: number,price: number,crossplay: boolean ,platform: Array<Platform>,category: Category,size: number,id: number): Promise<Game> {

    return conn.updateGame({
        game: {
            name : name,
            image: image,
            releaseDate: date,
            publisherID: pubid,
            rating: rating,
            downloads: downloads,
            price: price,
            crossplay: crossplay,
            platforms: platform,
            category: category,
            size:size
        }
    });
}
export function Deletegames(id: Publisher): Promise<void>{
    return conn.deleteGame(id);
}export function Deletepublisher(id: Publisher): Promise<void>{
    return conn.deletePublisher(id);
}

