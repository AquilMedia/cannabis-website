import { getBlogspageData } from "@/services/user";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http")
    ? imagePath
    : `${API_BASE_URL}${imagePath}`;
};

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  featured_image: string;
  category?: string | { id: number; name: string };
  published_at?: string;
  created_at?: string;
  slug?: string;
  author?: { name?: string };
  [key: string]: any;
}

export default function BlogsPage() {
  const [data, setData] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response: { data: Blog[] } = await getBlogspageData();
        setData(response.data);
        setSelectedBlog(response.data[0]);
      } catch (err: any) {
        toast.error(err.message || "Failed to load blogs");
      }
    };

    fetchBlogs();
  }, []);

  if (!data.length) return <p className="loading">Loading blogs...</p>;

  const getCategoryName = (category: any) =>
    typeof category === "string" ? category : category?.name || "Uncategorized";

  const otherBlogs = data.filter((blog) => blog.id !== selectedBlog?.id);
  const visibleBlogs = otherBlogs.slice(0, visibleCount);

  return (
    <div>
      {/* Banner */}
      <div
        className="inner_sec_banner position-relative"
       
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="innerBanner_cont text-center position-relative">
                <div className="bannerHeading f-size-60 text-white f-w-B line_H_1">
                  Blogs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="blogsContainer">

        {selectedBlog && (
          <div className="bigBlog">
            <div className="blogImageWrapper">
              <img
                src={getImageUrl(selectedBlog.featured_image)}
                alt={selectedBlog.title}
                className="bigBlogImage"
              />
              <span className="categoryTag">
                {getCategoryName(selectedBlog.category)}
              </span>
            </div>
            <div className="bigBlogContent">
              <div className="blogHeader">
                <span className="authorId">
                  {selectedBlog.author?.name || "Unknown Author"}
                </span>
                <span className="blogDate">
                  {new Date(selectedBlog.created_at || "").toLocaleDateString(
                    "en-GB"
                  )}
                </span>
              </div>
              <h2 className="blogTitle">{selectedBlog.title}</h2>
              <h3 className="blogExcerpt">{selectedBlog.excerpt}</h3>
              <p className="blogText">{selectedBlog.content}</p>
            </div>
          </div>
        )}

        <div className="otherBlogs">
          <h3 className="recentBlogsTitle">Recent Blogs</h3>

          {visibleBlogs.map((blog) => (
            <div
              key={blog.id}
              className="blogCard"
              onClick={() => setSelectedBlog(blog)}
            >
              <div className="blogImageWrapper">
                <img
                  src={getImageUrl(blog.featured_image)}
                  alt={blog.title}
                  className="blogCardImage"
                />
              </div>
              <div className="blogCardContent">
                <div className="blogCardTitle">{blog.title}</div>
                <div className="blogCardExcerpt">{blog.excerpt}</div>
              </div>
            </div>
          ))}

          {visibleCount < otherBlogs.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="showMoreBtn"
            >
              Show More
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .blogsContainer {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          padding: 20px;
        }
        .loading {
          text-align: center;
          font-size: 18px;
          padding: 40px;
        }
        .blogImageWrapper {
          position: relative;
        }
        .categoryTag {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #007b55;
          color: white;
          padding: 4px 10px;
          font-size: 12px;
          border-radius: 4px;
          font-weight: bold;
        }
        .bigBlog {
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .bigBlogImage {
          width: 100%;
          height: 350px;
          object-fit: cover;
        }
        .bigBlogContent {
          padding: 16px;
        }
        .blogHeader {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }
        .authorId {
          font-weight: bold;
          color: #26522f;
        }
        .blogDate {
          color: #999;
        }
        .blogTitle {
          font-size: 24px;
          margin: 0 0 10px;
        }
        .blogExcerpt {
          font-size: 16px;
          color: #007b55;
          margin: 0 0 12px;
        }
        .blogText {
          font-size: 15px;
          line-height: 1.6;
          color: #333;
        }
        .otherBlogs {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .recentBlogsTitle {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #333;
          border-bottom: 2px solid #eee;
          padding-bottom: 6px;
        }
        .blogCard {
          display: flex;
          gap: 10px;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .blogCard:hover {
          transform: translateY(-2px);
        }
        .blogCardImage {
          width: 100px;
          height: 100px;
          object-fit: cover;
        }
        .blogCardContent {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .blogCardTitle {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .blogCardExcerpt {
          font-size: 14px;
          color: #555;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .showMoreBtn {
          margin-top: 10px;
          padding: 8px 12px;
          background: #007b55;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }
        .showMoreBtn:hover {
          background: #005f40;
        }
        @media (max-width: 1024px) {
          .blogsContainer {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .bigBlogImage {
            height: 250px;
          }
          .blogTitle {
            font-size: 20px;
          }
          .blogCardImage {
            width: 80px;
            height: 80px;
          }
        }
      `}</style>
    </div>
  );
}
