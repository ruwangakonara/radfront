import React from 'react';
import Layout from '../layout/Layout';
import Query from '../core/Query';
import { useParams } from 'react-router-dom';

export default function QueryPage() {
    const { queryID } = useParams();

    return (
        <Layout>
            <Query queryID={queryID} />
        </Layout>
    );
}
