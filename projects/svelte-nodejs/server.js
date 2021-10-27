const express = require('express');
const app = express();
const inertia = require("inertia-node");

const html = (pageString, viewData) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <!-- Custom data -->
    <title>${viewData.title}</title>

    <!-- Your React, Vue or Svelte SPA -->
    <link rel="stylesheet" href="/build/bundle.css" />
    <script defer type="module" src="/build/main.js"></script>
  </head>

hello world
  <!-- The Inertia page object -->
  <body id="app" data-page='${pageString}'></body>
</html>
`;

app.use(inertia(html, "1"));
app.use(express.static('public'))

app.get("/", (req, res) => {
    req
        .Inertia
        .setViewData({ title: "Inertia Page" })
        .render({
            component: "Counter",
            props: { username: "ironman" },
        });
});

app.listen(5000, () => {
    console.log('Server running on port 5000.');
});