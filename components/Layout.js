import Head from 'next/head';
import Header from './Header';

const Layout = ({ title, keywords, description, children }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content={keywords} />
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="container mx-auto my-7">{children}</main>
        </div>
    );
};

Layout.defaultProps = {
    title: 'Welcome to DevSpace',
    keywords: 'dev, development, coding, programming',
    description: 'Dev News',
};

export default Layout;
