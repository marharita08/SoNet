const asyncHandler = require("../middleware/asyncHandler");
const axios = require("axios");
const universitiesStorage = require("../db/universities/storage");
const passwordHasher = require("../utils/passwordHasher");
const config = require("../configs/config");
const userStorage = require("../db/users/storage");
const settingsStorage = require("../db/settings/storage");
const articleStorage = require("../db/articles/storage");
const commentStorage = require("../db/comments/storage");
const friendsStorage = require("../db/friends/storage");
const articlesStorage = require("../db/articles/storage");
const likesStorage = require("../db/likes/storage");
const router = require("express").Router();

router.get(
    "/users/dummyjson",
    asyncHandler(async (req, res) => {
        const total = 100;
        const limit = 30;
        const start = 0;
        for (let j = start; j < total; j += limit) {
            const response = await axios.get("https://dummyjson.com/users?skip=" + j);
            const {data} = response;
            const {users} = data;
            for (let i = 0; i < users.length; i++) {
                const {firstName, lastName, email, phone, password, image, university} = users[i];
                let universityId = await universitiesStorage.getByName(university);
                if (!universityId[0]) {
                    universityId = await universitiesStorage.create({name: university});
                }
                const user = {
                    name: `${firstName} ${lastName}`,
                    email,
                    phone: phone.replace(/\s/g, ""),
                    password: passwordHasher(password, config.salt),
                    avatar: image,
                    university_id: universityId[0].university_id,
                    role: "user"
                };
                const userId = await userStorage.create(user);
                await settingsStorage.create({user_id: userId[0].user_id});
            }
        }
        res.send({message: total - start + " users was added"});
    })
);

router.get(
    "/users/slingacademy",
    asyncHandler(async (req, res) => {
        const total = 1000;
        const limit = 10;
        const start = 400;
        for (let j = start; j < total; j += limit) {
            const response = await axios.get("https://api.slingacademy.com/v1/sample-data/users?offset=" + j);
            const {data} = response;
            const {users} = data;
            for (let i = 0; i < users.length; i++) {
                const {first_name, last_name, email, profile_picture} = users[i];
                const user = {
                    name: `${first_name} ${last_name}`,
                    email,
                    password: passwordHasher(email, config.salt),
                    avatar: profile_picture,
                    role: "user"
                };
                const userId = await userStorage.create(user);
                await settingsStorage.create({user_id: userId[0].user_id});
                if (Math.random() > 0.5) {
                    const university_id = (await universitiesStorage.getRandomUniversityId()).university_id;
                    await userStorage.update(userId[0].user_id, {
                        university_id
                    });
                }
            }
        }
        res.send({message: total - start + " users was added"});
    })
);

function generateRandomDate(from) {
    const to = new Date();
    return new Date(
        from.getTime() +
        Math.random() * (to.getTime() - from.getTime()),
    );
}

function getVisibilityId() {
    return Math.ceil(Math.random() * 3);
}

router.get(
    "/articles/dummyjson",
    asyncHandler(async (req, res) => {
        const total = 150;
        const limit = 30;
        for (let j = 0; j < total; j += limit) {
            const response = await axios.get("https://dummyjson.com/posts?skip=" + j);
            const {data} = response;
            const {posts} = data;
            for (let i = 0; i < posts.length; i++) {
                const {body, userId} = posts[i];
                await articleStorage.create({
                    user_id: userId,
                    text: body,
                    visibility_id: getVisibilityId(),
                    created_at: generateRandomDate(new Date(2022, 1, 1))
                });
            }
        }
        res.send({message: total + "articles was added"});
    })
);

router.get(
    "/articles/slingacademy",
    asyncHandler(async (req, res) => {
        const total = 1000;
        const limit = 10;
        for (let j = 0; j < total; j += limit) {
            const response = await axios.get("https://api.slingacademy.com/v1/sample-data/blog-posts?offset=" + j);
            const {data} = response;
            const {blogs} = data;
            for (let i = 0; i < blogs.length; i++) {
                const {content_text, photo_url} = blogs[i];
                await articleStorage.create({
                    user_id: (await userStorage.getRandomUserId()).user_id,
                    text: content_text,
                    visibility_id: getVisibilityId(),
                    created_at: generateRandomDate(new Date(2022, 1, 1)),
                    image: photo_url
                });
            }
        }
        res.send({message: total + " articles was added"});
    })
);

router.get(
    "/comments",
    asyncHandler(async (req, res) => {
        const total = 340;
        const limit = 30;
        for (let j = 0; j < total; j += limit) {
            const response = await axios.get("https://dummyjson.com/comments?skip=" + j);
            const {data} = response;
            const {comments} = data;
            for (let i = 0; i < comments.length; i++) {
                const {body} = comments[i];
                const article_id = (await articlesStorage.getRandomArticleId()).article_id;
                const post = await articleStorage.getById(article_id);
                const user_id = (await userStorage.getRandomUserId()).user_id;
                const id = await commentStorage.create({
                    text: body,
                    user_id,
                    article_id: post.article_id,
                    level: 1,
                    commented_at: generateRandomDate(new Date(post.created_at))
                });
                await commentStorage.update(id[0].comment_id, {path: id[0].comment_id});

            }
        }
        res.send({message: total + " comments was added"});
    })
);

router.get(
    "/friends",
    asyncHandler(async (req, res) => {
        let i = 0;
        for (let j = 0; j < 500; j++) {
            const from_user_id = (await userStorage.getRandomUserId()).user_id;
            const to_user_id = (await userStorage.getRandomUserId()).user_id;
            const status_id = getVisibilityId();
            const request1 = await friendsStorage.getByUsersId(from_user_id, to_user_id);
            const request2 = await friendsStorage.getByUsersId(to_user_id, from_user_id);
            if (!request1 && !request2) {
                const obj = {
                    from_user_id,
                    to_user_id,
                    status_id
                };
                await friendsStorage.create(obj);
                i++;
            }
        }
        res.send({message: i + " friends was added"});
    })
);

router.get(
    "/likes",
    asyncHandler(async (req, res) => {
        let i = 0;
        for (let j = 0; j < 500; j++) {
            const user_id = (await userStorage.getRandomUserId()).user_id;
            const article_id = (await articlesStorage.getRandomArticleId()).article_id;
            const like = await likesStorage.getByArticleIdAndUserId(article_id, user_id);
            if (!like) {
                const obj = {
                    user_id,
                    article_id
                };
                await likesStorage.create(obj);
                i++;
            }
        }
        res.send({message: i + " likes was added"});
    })
);

module.exports = router;
