//whole file is for testing the connection and redis setup
require("dotenv").config();

const app = require("./app");

require("./config/redis"); // redis connection checker

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
