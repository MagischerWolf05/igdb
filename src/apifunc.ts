import {DefaultApi, Publisher} from "./generated/openapi";
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
}
export function Deletepublisher(id: Publisher): Promise<void>{
    return conn.deletePublisher(id);
}

