import React, {useEffect, useState} from "react";
import {Category, DefaultApi, Platform, PublisherToJSON} from "./generated/openapi";
import Spinner from "./Spinner";
import Navheader from "./navbarheader";

import CRUDTable, {CreateForm, DeleteForm, Field, Fields, UpdateForm} from "react-crud-table";
import {Addgame} from "./apifunc";

export default function Gametable() {

    const DescriptionRenderer = ({ field }) => <textarea {...field} />;
let [games,setGames] = useState([]);
let [publisher,setpublisher] = useState([]);
const test = new DefaultApi;
useEffect(() => {

    test.getGames().then(gamedata =>
        setGames(gamedata)
    );
}, [setGames])

useEffect(() => {

    test.getPublishers().then(publisher =>
        setpublisher(publisher)
    );
}, [setpublisher])
if (games.length === 0){
    console.log("NOT LOADED")
    return (
        <div className="selection">
            <Spinner animation="border" role="status" >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}



const SORTERS = {
    NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
    NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
    STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
    STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
    const mapper = x => x[data.field];
    let sorter = SORTERS.STRING_ASCENDING(mapper);

    if (data.field === 'id') {
        sorter = data.direction === 'ascending' ?
            SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
    } else {
        sorter = data.direction === 'ascending' ?
            SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
    }

    return sorter;
};


let count = games.length;
const service = {
    fetchItems: (payload) => {
        let result = Array.from(games);
        result = result.sort(getSorter(payload.sort));
        return Promise.resolve(result);
    },
    create: (task) => {
        count += 1;
        games.push({
            ...task,
            id: count,
        });
        const item = publisher.filter(x => x.id.toString()  == task.publisherID)

        task.publisher= item;

        Addgame(task.name,task.image,task.date,parseInt(task.publisherID),parseInt(task.rating),parseInt(task.downloads), parseInt(task.price), task.crossplay === "True",[task.platform],Category.Action,parseInt(task.size),parseInt(task.id))
        // Simple POST request with a JSON body using fetch

    },
    update: (data) => {
        let b = games;
        console.log(b[data.id -1]);
        b[data.id -1] = data;
        setGames(b)
        test.updateGame(data)
        return Promise.resolve(data)
    },
    delete: (data) => {
        const task = games.find(t => t.id === data.id);
        games = games.filter(t => t.id !== task.id);
        return Promise.resolve(test.deleteGame(task)
        );
    },
};

const styles = {
    container: { margin: 'auto', width: 'fit-content' },
};

const Example = () => (
    <>
        <div style={styles.container}>
            <CRUDTable
                caption="games"
                fetchItems={payload => service.fetchItems(payload)}
            >

                <Fields>
                    <Field
                        name="id"
                        label="Id"
                        hideInCreateForm
                        readOnly
                    />
                    <Field
                        name="name"
                        label="name"
                        placeholder="name"
                    />


                    <Field
                        name="category"
                        label="category"
                        placeholder="category"

                    />         <Field
                    name="crossplay"
                    label="crossplay"
                    placeholder="crossplay"

                />   <Field
                    name="downloads"
                    label="downloads"
                    placeholder="downloads"

                />
                    <Field
                        name="image"
                        label="image"
                        placeholder="image"

                    />





                    <Field
                        name="platformIDs"
                        label="platformIDs"
                        placeholder="platformIDs"

                    />           <Field
                    name="price"
                    label="price"
                    placeholder="price"

                />  <Field
                    name="publisherID"
                    label="publisherID"
                    placeholder="publisherID"

                /> <Field
                    name="rating"
                    label="rating"
                    placeholder="rating"

                /> <Field
                    name="releaseDate"
                    label="releaseDate"
                    placeholder="releaseDate"

                /><Field
                    name="size"
                    label="size"
                    placeholder="size"

                />

                </Fields>
                <CreateForm
                    title="Task Creation"
                    message="Create a new task!"
                    trigger="Create Task"
                    onSubmit={task => service.create(task)}
                    submitText="Create"
                />

                <UpdateForm
                    title="Task Update Process"
                    message="Update task"
                    trigger="Update"
                    onSubmit={task => service.update(task)}
                    submitText="Update"
                />

                <DeleteForm
                    title="Task Delete Process"
                    message="Are you sure you want to delete the task?"
                    trigger="Delete"
                    onSubmit={task => service.delete(task)}
                    submitText="Delete"


                />
            </CRUDTable>
        </div>
    </>);
return (
    <Example/>
);
}
