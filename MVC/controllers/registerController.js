const controller = {};
const { validationResult } = require('express-validator');

controller.list = (req, res) => {
    if (req.session.admin) {
        req.getConnection((err, conn) => {
            conn.query('select em.id as emid ,em.firstname ,em.lastname ,em.nickname ,em.position ,em.department_id ,em.username ,em.password ,em.usertype ,em.sex_id,em.subdepartment_id ,em.company_id ,s.id as sid ,s.sex ,de.id as deid ,de.department ,cp.id as cpid ,cp.companyname FROM employee as em left JOIN sex as s on em.sex_id = s.id left JOIN department as de ON em.department_id = de.id left JOIN company as cp ON em.company_id = cp.id', (err, registerList) => {
                if (err) {
                    res.json(err);
                }
                res.render('register/registerList', {
                    data: registerList,
                    session: req.session
                });
            });
        });

    } else {
        res.redirect('/');
    }

};
controller.add = function (req, res) {
    const { id } = req.params;

    req.getConnection(function (err, conn) {
        conn.query("select em.id as emid ,em.firstname ,em.lastname ,em.nickname ,em.position ,em.department_id ,em.username ,em.password ,em.usertype ,em.sex_id,em.subdepartment_id ,em.company_id ,s.id as sid ,s.sex ,de.id as deid ,de.department ,cp.id as cpid ,cp.companyname FROM employee as em left JOIN sex as s on em.sex_id = s.id left JOIN department as de ON em.department_id = de.id left JOIN company as cp ON em.company_id = cp.id", [id], function (err, employeeList) {

            conn.query("select * FROM sex ", function (err, sex) {

                conn.query("select * FROM department ", function (err, department) {

                    conn.query("select * from subdepartment ;", function (err, subdepartment) {

                        conn.query("select * from company ;", function (err, company) {

                            if (err) {
                                req.session.errors = errors;
                                req.session.success = false;
                                res.redirect('/register/add')
                            } else {
                                res.render("register/registerAdd", {
                                    data: employeeList[0],
                                    data2: sex,
                                    data3: department,
                                    data4: subdepartment,
                                    data5: company,
                                    session: req.session

                                });
                            };
                        });
                    });
                });
            });
        });
    });
};


controller.save = (req, res) => {
    const data = req.body;
    const errors = validationResult(req);
    req.getConnection((err, conn) => {

        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            res.redirect('/register/add')
        } else {
            req.session.success = true;
            req.session.topic = "เพิ่มข้อมูลสำเร็จ";
            conn.query('INSERT INTO employee set ?', [data], (err, registerList) => {
                res.redirect('/successfulregister')
            });
        };

    });
};

controller.detail = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select em.id as emid ,em.firstname ,em.lastname ,em.nickname ,em.position ,em.department_id ,em.username ,em.password ,em.usertype ,em.sex_id,em.subdepartment_id ,em.company_id ,s.id as sid ,s.sex ,de.id as deid ,de.department ,cp.id as cpid ,cp.companyname , sd.id as sdid , sd.subdepartment FROM employee as em left JOIN sex as s on em.sex_id = s.id left JOIN department as de ON em.department_id = de.id left JOIN company as cp ON em.company_id = cp.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id  WHERE em.id = ?', [id], (err, registerDetail) => {
                if (err) {
                    res.json(err);
                }
                res.render('register/registerDetail', {
                    data: registerDetail[0],
                    session: req.session

                });
            });
        });
    } else {
        res.redirect('/');
    }

};


controller.del = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select em.id as emid ,em.firstname ,em.lastname ,em.nickname ,em.position ,em.department_id ,em.username ,em.password ,em.usertype ,em.sex_id,em.subdepartment_id ,em.company_id ,s.id as sid ,s.sex ,de.id as deid ,de.department ,cp.id as cpid ,cp.companyname , sd.id as sdid , sd.subdepartment FROM employee as em left JOIN sex as s on em.sex_id = s.id left JOIN department as de ON em.department_id = de.id left JOIN company as cp ON em.company_id = cp.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id  WHERE em.id = ?', [id], (err, registerDel) => {
                if (err) {
                    res.json(err);
                }
                res.render('register/registerDel', {
                    data: registerDel[0],
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
            conn.query('DELETE FROM employee  WHERE id = ?', [id], (err, employeeDelete) => {
                if (err) {
                    const errorss = { errors: [{ value: '', msg: 'ไม่สามารถลบข้อมูลนี้ได้ ', param: '', location: '' }] }
                    req.session.errors = errorss;
                    req.session.success = false;
                } else {
                    req.session.success = true;
                    req.session.topic = "ลบข้อมูลสำเร็จ";

                };
                res.redirect('/register');
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
            conn.query('select em.id as emid ,em.firstname ,em.lastname ,em.nickname ,em.position ,em.department_id ,em.username ,em.password ,em.usertype ,em.sex_id,em.subdepartment_id ,em.company_id ,s.id as sid ,s.sex ,de.id as deid ,de.department ,cp.id as cpid ,cp.companyname FROM employee as em left JOIN sex as s on em.sex_id = s.id left JOIN department as de ON em.department_id = de.id left JOIN company as cp ON em.company_id = cp.id  WHERE em.id = ?', [id], (err, registerEdit) => {
                conn.query("select * FROM sex ", function (err, sex) {
                    conn.query("select * FROM department ", function (err, department) {
                        conn.query("select * from company ;", function (err, company) {
                            if (err) {
                                res.json(err);
                            }
                            res.render('register/registerEdit', {
                                data: registerEdit[0],
                                data2: sex,
                                data3: department,
                                data4: company,
                                session: req.session

                            });
                        });
                    });
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
                conn.query('SELECT * FROM employee WHERE id = ?', [id], (err, registerUpdate) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render('register/registerEdit', {
                        data: registerUpdate[0],
                        session: req.session
                    });
                });
            });
        } else {
            req.session.success = true;
            req.session.topic = "แก้ไขข้อมูลสำเร็จ";
            req.getConnection((err, conn) => {
                conn.query('UPDATE employee SET ? WHERE id = ?', [data, id], (err, registerUpdate) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/register');
                });
            });
        }
    } else {
        res.redirect('/');
    }

};



module.exports = controller;