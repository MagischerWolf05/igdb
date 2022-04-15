import React, {useEffect, useState} from "react";
import {DefaultApi, PublisherToJSON} from "./generated/openapi";
import Spinner from "./Spinner";
import {AddPublisher, Deletepublisher, Updatepublisher} from "./apifunc";

import CRUDTable, {CreateForm, DeleteForm, Field, Fields, UpdateForm} from "react-crud-table";

export default function Publishertable() {

    const DescriptionRenderer = ({ field }) => <textarea {...field} />;
    let [publisher,setpublisher] = useState([]);
    const test = new DefaultApi;


    useEffect(() => {

        test.getPublishers().then(publisher =>
            setpublisher(publisher)
        );
    }, [setpublisher])
    if (publisher.length === 0){
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


    let count = publisher.length;
    const service = {
        fetchItems: (payload) => {
            let result = Array.from(publisher);
            result = result.sort(getSorter(payload.sort));
            return Promise.resolve(result);
        },
        create: (task) => {
            count += 1;
            publisher.push({
                ...task,
                id: count,
            });
        const item = publisher[publisher.length-1];
            AddPublisher(item.name,item.marketCap,item.id)
        },
        update: (data) => {
            let b = publisher;
            console.log(b[data.id -1]);
            b[data.id -1] = data;
            setpublisher(b)
            Updatepublisher(data.name,data.marketCap,data.id);

        },
        delete: (data) => {

            Deletepublisher(data);

        },
    };

    const styles = {
        container: { margin: 'auto', width: 'fit-content' },
    };

    const Example = () => (
        <>
            <div style={styles.container}>
                <CRUDTable
                    caption="publisher"
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
                            name="marketCap"
                            label="marketCap"
                            placeholder="marketCap"

                        />

                    </Fields>
                    <CreateForm
                        title="Task Creation"
                        message="Create a new task!"
                        trigger="Create Task"
                        onSubmit={task => service.create(task)}
                        submitText="Create"
                        validate={(values) => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = 'Please, provide task\'s name';
                            }

                            if (!values.marketCap) {
                                errors.marketCap = 'Please, provide task\'s marketCap';
                            }

                            return errors;
                        }}
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
