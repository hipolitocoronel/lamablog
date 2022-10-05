const formatPost = (post) => {
    return {
        id: post.id,
        title: post.title,
        description: post.desc,
        image: post.img,
        date: post.date,
        category: {
            id: post.idCategory,
            description: post.descripcion,
        },
        user: {
            name: post.name,
            username: post.username,
        },
    };
};

module.exports = { formatPost };
