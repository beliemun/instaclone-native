module.exports = {
  client: {
    include: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "instaclone-backend",
      url: process.env.NODE_ENV === "production"
        ? "https://beliemun-instaclone-backend.herokuapp.com/graphql"
        : "http://localhost:4000/graphql",
    },
  },
};
