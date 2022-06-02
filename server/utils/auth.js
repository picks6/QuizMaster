const jwt = require('jsonwebtoken');

const secret = '2CAA0FE411BF1F45DE564808C5DE6BAD3EB1DD801CE2668CA3589AEF01074EF7';
const expiration = '2h';

module.exports = {
    authMiddleWare: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) { // expect req.headers.authorization: "Bearer <tokenvalue>"
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('invalid token check back-end auth.js')
        }
        return req;
    },

    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
        return jwt.sign({ data:payload }, secret, { expiresIn: expiration})
    },
    authMiddleWare: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }
        if (!token) {
            return req;
        }
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('invalid token check back-end auth.js')
        }
        return req;
    },
};