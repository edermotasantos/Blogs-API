const express = require('express');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoutes);
app.use('/login', loginRoutes);

app.listen(PORT, () => console.log(`Server conected on port ${PORT}!`));
