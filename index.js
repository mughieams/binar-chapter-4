const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.set('view engine', 'ejs');

// Routes
app.use('/users', require('./routes/user'));

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.isJoi) {
        res.status(400).json({
            message: err.message,
        });
    }

    res.status(500).json({
        message: 'Internal server error',
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
