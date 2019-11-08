/**
 * Main application file.
 * 
 */

// Setup Express
const express = require("express");
const app = express();
const port = 3000;

// Setup Handlebars
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Setup body-parser
const bodyParser = require("body-parser");
// Resize the image file (especially large ones) to be able to upload
app.use(bodyParser.json({ limit: '5mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

// Setup cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Setup express-session
const session = require("express-session");
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "CS719"
}));

// Make the "public" folder available statically
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Setup home routes
const appRouter = require("./routes/home.js");
app.use(appRouter);

// Setup sign in routes
const signInRouter = require("./routes/signin-routes.js");
app.use(signInRouter);

// Setup sign up routes
const signUpRouter = require("./routes/signup-routes.js");
app.use(signUpRouter);

// Setup avatar routes
const avatarRouter = require("./routes/avatar-routes.js");
app.use(avatarRouter);

//Setup blog routes
const blogRouter = require("./routes/blog-routes.js");
app.use(blogRouter);

// Setup my-articles routes
const myarticlesRouter = require("./routes/myarticles-routes.js");
app.use(myarticlesRouter);

// Setup add-articles routes
const addArticlesRouter = require("./routes/addarticles-routes.js");
app.use(addArticlesRouter);

// Setup add-individual-articles routes
const individualArticleRouter = require("./routes/individualarticle-routes.js");
app.use(individualArticleRouter);

// Setup edit-articles routes
const editArticleRouter = require("./routes/editarticle-routes.js");
app.use(editArticleRouter);

// Setup comments routes
const commentsRouter = require("./routes/comment-routes.js");
app.use(commentsRouter);

// Setup account-setting or account-displaying routes
const accountRouter = require("./routes/account-routes.js");
app.use(accountRouter);

// Setup reset routes 
const resetRouter = require("./routes/reset-routes.js");
app.use(resetRouter);

// Setup delete-account routes
const deleteAccountRouter = require("./routes/deleteAccount-routes.js");
app.use(deleteAccountRouter);

// Start the server running.
app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});