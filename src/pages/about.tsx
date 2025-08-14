import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAboutUspageData } from "@/services/user";

interface AboutData {
    title: string;
    content: string;
    meta_description?: string;
}

const About: React.FC = () => {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response: { data: AboutData } = await getAboutUspageData();
                setAboutData(response.data);
            } catch (err: any) {
                toast.error(err.message || "Failed to load About Us data");
            } finally {
                setLoading(false);
            }
        };

        fetchAbout();
    }, []);

    if (loading)
        return (
            <div className="spinnerWrapper">
                <div className="spinner" />
            </div>
        );

    if (!aboutData)
        return <p className="errorMsg">No About Us data available at the moment.</p>;

    return (
        <main className="aboutContainer" aria-label="About Us content">
            <header className="stickyHeader">
                <h1>{aboutData.title}</h1>
            </header>
            <section className="contentWrapper">
                <aside className="titlePanel" aria-hidden="true">
                    <h2>Who We Are</h2>
                    <p className="metaDesc">{aboutData.meta_description}</p>
                </aside>
                <article className="aboutContent" dangerouslySetInnerHTML={{ __html: aboutData.content }} />
            </section>

            <style jsx>{`
        :root {
          --primary-color: #007b55;
          --secondary-color: #3a3a3a;
          --bg-color: #f9f9f9;
          --shadow-color: rgba(0, 0, 0, 0.1);
          --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Container & Layout */
        .aboutContainer {
          max-width: 960px;
          margin: 60px auto;
          padding: 0 20px;
          font-family: var(--font-family);
          background: var(--bg-color);
          border-radius: 12px;
          box-shadow: 0 10px 25px var(--shadow-color);
          animation: fadeIn 0.8s ease forwards;
        }

        /* Sticky header with title */
        .stickyHeader {
          position: sticky;
          top: 0;
          background: white;
          padding: 12px 20px;
          border-bottom: 2px solid var(--primary-color);
          z-index: 10;
          box-shadow: 0 2px 8px var(--shadow-color);
        }
        .stickyHeader h1 {
          margin: 0;
          color: var(--primary-color);
          font-size: 2.4rem;
          font-weight: 700;
          text-align: center;
        }

        /* Content area with two columns on desktop */
        .contentWrapper {
          display: flex;
          gap: 30px;
          padding: 30px 0;
        }
        .titlePanel {
          flex: 1;
          border-right: 2px solid var(--primary-color);
          padding-right: 20px;
          color: var(--primary-color);
        }
        .titlePanel h2 {
          font-size: 1.8rem;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .metaDesc {
          font-size: 1rem;
          font-style: italic;
          color: #444;
          line-height: 1.4;
        }
        .aboutContent {
          flex: 2;
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--secondary-color);
          white-space: pre-wrap;
        }

        /* Loading spinner */
        .spinnerWrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
        }
        .spinner {
          border: 5px solid #eee;
          border-top: 5px solid var(--primary-color);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          animation: spin 1s linear infinite;
        }

        /* Error message */
        .errorMsg {
          text-align: center;
          color: #cc0000;
          font-weight: 600;
          margin-top: 60px;
          font-size: 1.2rem;
        }

        /* Animations */
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .contentWrapper {
            flex-direction: column;
          }
          .titlePanel {
            border-right: none;
            border-bottom: 2px solid var(--primary-color);
            padding-bottom: 16px;
            padding-right: 0;
            margin-bottom: 20px;
          }
          .stickyHeader h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
        </main>
    );
};

export default About;
