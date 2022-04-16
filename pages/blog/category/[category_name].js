import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { getPosts } from '@/lib/posts';

const CategoryBlogPage = ({ posts }) => {
    return (
        <Layout>
            <h1 className="text-5xl border-b-4 p-5 font-bold">
                {posts[0].frontmatter.category} Posts
            </h1>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'));

    const categories = files.map(filename => {
        const markdownWithMeta = fs.readFileSync(
            path.join('posts', filename),
            'utf-8'
        );

        const { data: frontmatter } = matter(markdownWithMeta);

        return frontmatter.category.toLowerCase();
    });

    const paths = categories.map(cat => ({
        params: {
            category_name: cat,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { category_name } }) {
    const posts = getPosts();

    //Filter posts by category
    const categoryPosts = posts.filter(
        post => post.frontmatter.category.toLowerCase() === category_name
    );

    return {
        props: {
            posts: categoryPosts,
        },
    };
}

export default CategoryBlogPage;