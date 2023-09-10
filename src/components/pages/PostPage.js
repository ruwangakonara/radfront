import React from 'react';
import Layout from '../layout/Layout';
import Post from '../core/Post';
import { useParams } from 'react-router-dom';

export default function PostPage() {
    const { postID } = useParams();

    return (
        <Layout>
            <Post postId={postID} />
        </Layout>
    );
}
