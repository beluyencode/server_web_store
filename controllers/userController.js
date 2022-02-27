const db = require("../db");
const jwt = require('jsonwebtoken');

class User {
    getUser(req, res) {
        let findUser = db.db.find(user => user.userName === req.user.userName);
        let user = {
            message: "successful",
            user: {
                name: findUser.name,
                userName: findUser.userName,
                cart: findUser.cart,
                order: findUser.order
            }
        }
        res.json(user);
    }

    getCart(req, res) {
        let user = db.db.find(user => user.userName === req.user.userName);
        let product = [];
        user.cart.map(item => {
            let p = db.product.find(product => {
                return product.id === item;
            });
            product.push(p);
        })
        res.json(product);
    }

    removeProductFromCart(req, res) {
        let user = db.db.find(user => user.userName === req.user.userName);
        user.cart = user.cart.filter(id => id !== req.body.id);
        let product = [];
        user.cart.map(item => {
            let p = db.product.find(product => {
                return product.id === item;
            });
            product.push(p);
        })
        res.json(product);
    }

    login(req, res) {
        let findUser = db.db.find((user) => {
            return user.userName === req.body.userName && user.password === req.body.password
        });
        if (findUser !== undefined) {
            var user = {
                name: findUser.name,
                userName: findUser.userName
            }
            const token = jwt.sign(user, process.env.jwtSignature, { expiresIn: "24h" });
            res.json({ message: "successful", token: token });
        } else {
            res.json({ message: 'error', contentError: "Tài khoản hoặc mật khẩu không đúng" });
        }
    }

    signin(req, res) {
        let findUserName = db.db.find(user => {
            return user.userName === req.body.userName;
        });
        if (findUserName) {
            res.json({ message: 'error', contentError: "Tài khoản đã tồn tại" });
        } else {
            req.body.cart = [];
            db.db.push(req.body);
            console.log(db.db);
            res.json({ message: 'successful' });
        }
    }

    addProductToCart(req, res) {
        let user = db.db.find(user => user.userName === req.user.userName);
        user.cart.push(req.body.id);
        let userAfterUpdate = {
            message: "successful",
            user: {
                name: user.name,
                userName: user.userName,
                cart: user.cart,
                order: user.order
            }
        }
        res.send(JSON.stringify(userAfterUpdate));
    }

    order(req, res) {
        let date = new Date();
        let time = date.getHours() + ':' + date.getMinutes();
        db.order.push({
            user : req.user,
            product : req.body.product,
            price : req.body.totalPrice,
            date : date.toLocaleDateString(),
            time :time

        })
        let findUser = db.db.find(user => user.userName === req.user.userName);
        findUser.order.push({
            product : req.body.product,
            price : req.body.totalPrice,
            date : date.toLocaleDateString(),
            time : time
        });
        let arr = [...findUser.cart];
        findUser.cart.forEach((cart,index) => {
            req.body.product.forEach(product => {
                if (cart === product.id) {
                    delete findUser.cart[index];
                }
            })
        })
        findUser.cart = findUser.cart.filter(cart => {return cart !== null});
        res.json({messages: "successful"});
    }

    getOrder(req, res) {
        let findUser = db.db.find(user => user.userName === req.user.userName);
        res.json({messages: "successful", order: findUser.order});
    }

}

module.exports = new User;