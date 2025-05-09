const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Rota para busca de vídeos
app.get('/search', async (req, res) => {
    try {
        const { q, key } = req.query;
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                maxResults: 10,
                q,
                type: 'video',
                key
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Erro na busca:', error);
        res.status(500).json({ error: 'Erro ao buscar vídeos' });
    }
});

// Rota para obter informações do vídeo
app.get('/video', async (req, res) => {
    try {
        const { id, key } = req.query;
        const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'snippet,contentDetails',
                id,
                key
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao obter vídeo:', error);
        res.status(500).json({ error: 'Erro ao obter informações do vídeo' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
