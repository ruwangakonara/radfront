import React from 'react';
import Layout from './Layout';
import Query from './Query';
import { useParams } from 'react-router-dom';

export default function QueryPage() {
    const { queryID } = useParams();

    return (
        <Layout>
            <Query queryID={queryID} />
        </Layout>
    );
}
