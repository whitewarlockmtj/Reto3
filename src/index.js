
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const UserController = require('./userController');

app.use(express.json());

app.get('/hello', (req, res) => res.send('¡Hola Mundo desde Docker!'));
app.get('/health', (req, res) => res.send({ status: 'ok' }));

app.get('/users', (req, res) => res.status(200).json(UserController.getAll()));
app.get('/users/:id', (req, res) => {
    const user = UserController.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
});
app.post('/users', (req, res) => {
    if (!req.body.user || !req.body.name) {
        return res.status(400).json({ message: 'User and name are required' });
    }
    
    const newUser = UserController.create(req.body);
    res.status(201).json(newUser);
});
app.delete('/users/:id', (req, res) => {
    const postIndex = UserController.deleteById(req.params.id);
    if (postIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.status(204).send();
});

if (require.main === module) {
    app.listen(PORT, () => console.log(`App corriendo en puerto ${PORT}`));
}

module.exports = app;
// Para ejecutar el servidor, usa el siguiente comando: Test


