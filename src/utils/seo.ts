import { NextSeo } from 'next-seo';

const setSeo = ({ title, description, url, image }) => {
    return (
        <NextSeo
            title={title}
            description={description}
            canonical={url}
            openGraph={{
                url,
                title,
                description,
                images: [
                    {
                        url: image,
                        alt: title,
                    },
                ],
                site_name: 'Cannabis Services',
            }}
            twitter={{
                handle: '@yourtwitterhandle',
                site: '@yoursite',
                cardType: 'summary_large_image',
            }}
        />
    );
};

export default setSeo;