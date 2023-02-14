const controller = {};
const { validationResult } = require('express-validator');

controller.list = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select * FROM admin', [id], (err, adminList) => {
                if (err) {
                    res.json(err);
                }
                res.render('admin/adminList', {
                    data: adminList,
                    session: req.session
                });
            });
        });

    } else {
        res.redirect('/');
    }

};

controller.add = function (req, res) {
    if (req.session.user || req.session.admin) {
        const { id } = req.params;

        req.getConnection(function (err, conn) {
            conn.query("select * FROM admin ", [id], function (err, adminAdd) {
                if (err) {
                    req.session.errors = errors;
                    req.session.success = false;
                    res.redirect('/admin/add')
                } else {
                    res.render("admin/adminAdd", {
                        data: adminAdd[0],
                        session: req.session

                    });
                };
            });
        });
    } else {
        res.redirect('/');
    };
};




controller.save = (req, res) => {
    if (req.session.admin) {
        const data = req.body;
        const errors = validationResult(req);
        req.getConnection((err, conn) => {

            if (!errors.isEmpty()) {
                req.session.errors = errors;
                req.session.success = false;
                res.redirect('/admin/add')
            } else {
                req.session.success = true;
                req.session.topic = "เพิ่มข้อมูลสำเร็จ";
                conn.query('INSERT INTO admin set ?', [data], (err, adminSave) => {
                    res.redirect('/admin')
                });
            };

        });
    } else {
        res.redirect('/');
    }


};


controller.detail = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select * FROM admin WHERE id = ?', [id], (err, adminDetail) => {
                if (err) {
                    res.json(err);
                }
                res.render('admin/adminDetail', {
                    data: adminDetail[0],
                    session: req.session

                });
            });
        });
    } else {
        res.redirect('/');
    }

};


controller.edit = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select * FROM admin WHERE id = ?', [id], (err, adminEdit) => {

                if (err) {
                    res.json(err);
                }
                res.render('admin/adminEdit', {
                    data: adminEdit[0],
                    session: req.session

                });
            });
        });
    } else {
        res.redirect('/');
    }

};

controller.update = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        const data = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            req.getConnection((err, conn) => {
                conn.query('SELECT * FROM admin WHERE id = ?', [id], (err, adminUpdate) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render('admin/adminEdit', {
                        data: adminUpdate[0],
                        session: req.session
                    });
                });
            });
        } else {
            req.session.success = true;
            req.session.topic = "แก้ไขข้อมูลสำเร็จ";
            req.getConnection((err, conn) => {
                conn.query('UPDATE admin SET ? WHERE id = ?', [data, id], (err, adminUpdate) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/admin');
                });
            });
        }
    } else {
        res.redirect('/');
    }

};




controller.del = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select * FROM admin WHERE id = ?', [id], (err, adminDel) => {
                if (err) {
                    res.json(err);
                }
                res.render('admin/adminDel', {
                    data: adminDel[0],
                    session: req.session

                });
            });
        });
    } else {
        res.redirect('/');
    }

};

controller.delete = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('DELETE FROM admin  WHERE id = ?', [id], (err, adminDelete) => {
                if (err) {
                    const errorss = { errors: [{ value: '', msg: 'ไม่สามารถลบข้อมูลนี้ได้ ', param: '', location: '' }] }
                    req.session.errors = errorss;
                    req.session.success = false;
                } else {
                    req.session.success = true;
                    req.session.topic = "ลบข้อมูลสำเร็จ";

                };
                res.redirect('/admin');
            });
        });
    } else {
        res.redirect('/');
    }

};






module.exports = controller;