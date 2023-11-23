 

import Head from "next/head";

interface SEOProps {
    title: string;
    description: string;
    keywords: string;
}

const SEO = ({ title, description, keywords }: SEOProps) => {
    return (
        <Head>
            <title>{title} | VPL</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />

            { /* Facebook tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            { /* Twitter tags */}   
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Head>
    )
}

export default SEO;