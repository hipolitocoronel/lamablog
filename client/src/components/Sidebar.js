import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar({ post }) {
    const mostPosts = useSelector((state) => {
        const { posts } = state;
        return posts.filter(
            (p) => p.category.description === post.cat && p.id !== post.id
        );
    });

    return (
        <div className="sidebar">
            <h3>Recomendados para ti</h3>
            <div className="posts">
                {mostPosts
                    ? mostPosts.map((post) => (
                          <div key={post.id} className="post">
                              <img
                                  src={`http://localhost:3001/uploads/${post.image}`}
                                  alt="foto del blog"
                              />
                              <div className="content">
                                  <span className="title">{post.title}</span>
                                  <Link
                                      className="button link"
                                      to={`/post/${post.id}`}
                                  >
                                      Leer más
                                  </Link>
                              </div>
                          </div>
                      ))
                    : ""}
            </div>
        </div>
    );
}

export default Sidebar;
