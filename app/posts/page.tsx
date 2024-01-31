
import Link from 'next/link';
import React from 'react'
import CreatePost from './[id]/CreatePost';

async function getPost() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/posts/records', { cache: 'no-store' }); //캐싱 X
    //경로상 가장 가까이에 있는 error.tsx 파일 활성
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();
    return data?.items as any[]
}

const PostsPage = async () => {
    const posts = await getPost();
    return (
        <div>
            <h1>
                Post
            </h1>
            {posts?.map((post) => {
                return <PostItem key={post.id} post={post}/>
            })}
            <CreatePost/>
        </div>
    )
}

export default PostsPage

const PostItem = ({ post }: any) => {
    const { id, title, created } = post || {}; // post존재하면 구조 분해 할당해주고, 없으면 빈 객체 넣어주기
    return (
        <Link href={`/posts/${id}`}>
            <div>
                <h3>
                    {title}
                </h3>
                <p>{created}</p>
            </div>
        </Link>
    )
}