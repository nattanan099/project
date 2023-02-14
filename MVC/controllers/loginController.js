const controller = {};
const { fail } = require('assert');
const { validationResult } = require('express-validator');
const { default: validator } = require('validator');


controller.log = function (req, res) {

    req.getConnection((err, conn) => {
        conn.query('select * FROM admin  ', (err, adminList) => {
            conn.query('select * FROM employee  ', (err2, employeeList) => {

                if (err) {
                    res.json(err);
                    res.json(err2);
                }
                res.render('login/login', {
                    data: adminList,
                    data2: employeeList,
                    session: req.session
                });

            });
        });
    });
};


controller.login = function (req, res) {
    const errors = validationResult(req);
    const { id } = req.params;
    if (!errors.isEmpty()) {
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/');
    } else {
        req.getConnection(function (err, conn) {
            conn.query('SELECT * FROM admin WHERE username = ? AND password = ?', [req.body.username, req.body.password], function (err, data1) {
                conn.query('SELECT em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , s.id as sid , s.sex , sd.id as sdid , sd.subdepartment  from employee as em left JOIN sex as s ON em.sex_id = s.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id WHERE em.username = ? AND em.password = ? ', [req.body.username, req.body.password], function (err, data3) {
                    conn.query(' SELECT DATE_FORMAT(NOW(),"%Y") as t;', (err, time) => {
                        if (err) {
                            res.json(err);
                        } else {
                            if (data1.length > 0) {
                                req.session.adminid = data1[0].id;
                                req.session.admin = [data1[0].firstname] + " " + [data1[0].lastname];
                                req.session.time = time[0].t++ + 543
                                res.redirect('/home');
                            } else if (data3.length > 0) {
                                if (data3[0].usertype == 1) {
                                    req.session.managerid = data3[0].emid;
                                    req.session.manager = data3[0].username;
                                    req.session.time = time[0].t++ + 543
                                    res.redirect('/manager');
                                } else if (data3[0].usertype == 2) {
                                    if (data3[0].department_id == 4) {
                                        if (data3[0].sdid == 6) {
                                            req.session.leaderinstallandmaid = data3[0].emid;
                                            req.session.leaderinstallandma = [data3[0].firstname] + " " + [data3[0].lastname];
                                            req.session.leaderinstallandmanickname = [data3[0].nickname];
                                            req.session.leaderinstallandmasex = [data3[0].sex];
                                            req.session.time = time[0].t++ + 543
                                            req.session.leaderinstallandmasubdepartment = [data3[0].subdepartment]
                                            req.session.leaderinstallandmaposition = [data3[0].position]
                                            res.redirect("/home");
                                        } else if (data3[0].sdid == 4) {
                                            req.session.leaderinstallid = data3[0].emid;
                                            req.session.leaderinstall = [data3[0].firstname] + " " + [data3[0].lastname];
                                            req.session.leaderinstallnickname = [data3[0].nickname];
                                            req.session.leaderinstallsex = [data3[0].sex];
                                            req.session.time = time[0].t++ + 543
                                            req.session.leaderinstallsubdepartment = [data3[0].subdepartment]
                                            req.session.leaderinstallposition = [data3[0].position]
                                            res.redirect("/home")
                                        } else if (data3[0].sdid == 5) {
                                            req.session.leadermaid = data3[0].emid;
                                            req.session.leaderma = [data3[0].firstname] + " " + [data3[0].lastname];
                                            req.session.leadermanickname = [data3[0].nickname];
                                            req.session.leadermasex = [data3[0].sex];
                                            req.session.time = time[0].t++ + 543
                                            req.session.leadermasubdepartment = [data3[0].subdepartment]
                                            req.session.leadermaposition = [data3[0].position]
                                            res.redirect("/home")
                                        }
                                    } else {
                                        req.session.leaderid = data3[0].emid;
                                        req.session.leader = [data3[0].firstname] + " " + [data3[0].lastname];
                                        req.session.department = data3[0].department_id;
                                        req.session.usertype = data3[0].usertype;
                                        req.session.leadernickname = [data3[0].nickname];
                                        req.session.leadersex = [data3[0].sex];
                                        req.session.time = time[0].t++ + 543
                                        req.session.leadersubdepartment = [data3[0].subdepartment]
                                        req.session.leaderposition = [data3[0].position]
                                        res.redirect('/home');
                                    }
                                } else if (data3[0].usertype == 3) {
                                    req.session.hrid = data3[0].emid;
                                    req.session.hr = [data3[0].firstname] + " " + [data3[0].lastname];
                                    req.session.hrnickname = [data3[0].nickname];
                                    req.session.hrsex = [data3[0].sex];
                                    req.session.time = time[0].t++ + 543
                                    req.session.hrsubdepartment = [data3[0].subdepartment]
                                    req.session.hrposition = [data3[0].position]
                                    res.redirect('/home');
                                } else if (data3[0].usertype == 4) {
                                    req.session.employeeid = data3[0].emid;
                                    req.session.employee = [data3[0].firstname + " " + data3[0].lastname];
                                    req.session.employeenickname = [data3[0].nickname];
                                    req.session.employeesex = [data3[0].sex];
                                    req.session.time = time[0].t++ + 543
                                    req.session.employeesubdepartment = [data3[0].subdepartment]
                                    req.session.employeeposition = [data3[0].position]
                                    res.redirect('/home');
                                }
                            } else {
                                req.session.errors = errors;
                                req.session.success = false;
                                req.session.topic = "ชื่อผู้ใช้ หรือ รหัสผ่าน ไม่ถูกต้อง"
                                res.redirect('/');
                            };
                        };
                    });
                });
            });
        });
    };
};

controller.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/');
};

controller.homeassessment = function (req, res) {
    if (req.session.admin) {

        req.getConnection((err, conn) => {
            res.render('homeassessment', {
                session: req.session
            });
        });
    } else {
        res.redirect('/');
    };
};

controller.homehr = function (req, res) {
    if (req.session.admin || req.session.hr) {
        req.getConnection((err, conn) => {
            res.render('homehr', {
                session: req.session
            });
        });
    } else {
        res.redirect('/');
    };
};

controller.homeleader = function (req, res) {
    if (req.session.admin || req.session.leader) {
        req.getConnection((err, conn) => {
            res.render('homeleader', {
                session: req.session
            });
        })
    } else {
        res.redirect('/');
    };
};

controller.homeinstallandma = function (req, res) {
    if (req.session.admin || req.session.leaderinstallandma) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            if (err) {
                res.json(err);
            }
            res.render('homeinstallandma', {
                session: req.session
            });
        });
    } else {
        res.redirect('/');
    };
};
controller.homeinstall = function (req, res) {
    if (req.session.admin || req.session.leaderinstall) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            if (err) {
                res.json(err);
            }
            res.render('homeinstall', {
                session: req.session
            });
        });
    } else {
        res.redirect('/');
    };
};
controller.homema = function (req, res) {
    if (req.session.admin || req.session.leaderma) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            if (err) {
                res.json(err);
            }
            res.render('homema', {
                session: req.session
            });
        });
    } else {
        res.redirect('/');
    };
};

controller.homeemployee = function (req, res) {
    if (req.session.admin || req.session.employee) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            if (err) {
                res.json(err);
            }
            res.render('homeemployee', {
                session: req.session
            });
        });
    } else {
        res.redirect('/');
    };
};

controller.home = function (req, res) {
    if (req.session.admin || req.session.employee || req.session.hr || req.session.leader || req.session.leaderinstallandma || req.session.leaderinstall || req.session.leaderma) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            if (err) {
                res.json(err);
            }
            res.render('home', {
                session: req.session
            });
        });
    } else {
        res.redirect('/');
    };
};

controller.homeot = function (req, res) {
    if (req.session.admin || req.session.employee || req.session.hr || req.session.leader || req.session.leaderinstallandma || req.session.leaderinstall || req.session.leaderma) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            if (err) {
                res.json(err);
            }
            res.render('homeot', {
                session: req.session
            });
        });
    } else {
        res.redirect('/');
    };
};

controller.homeothistory = function (req, res) {
    if (req.session.admin || req.session.employee || req.session.hr || req.session.leader || req.session.leaderinstallandma || req.session.leaderinstall || req.session.leaderma) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            if (err) {
                res.json(err);
            }
            res.render('homeothistory', {
                session: req.session
            });
        });
    } else {
        res.redirect('/');
    };
};

controller.homeotlist = function (req, res) {
    if (req.session.admin || req.session.employee || req.session.hr || req.session.leader || req.session.leaderinstallandma || req.session.leaderinstall || req.session.leaderma) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            if (err) {
                res.json(err);
            }
            res.render('homeotlist', {
                session: req.session
            });
        });
    } else {
        res.redirect('/');
    };
};

controller.employee = function (req, res) {
    if (req.session.admin || req.session.employee) {
        req.getConnection((err, conn) => {
            conn.query("select * from employee", function (err, employee) {
                res.render('employee/employeeAdd', {
                    data2: employee,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    };
};

controller.success = function (req, res) {
    req.getConnection((err, conn) => {
        res.render('successful/successfulIndex', {
            session: req.session
        });
    });
}
controller.successregister = function (req, res) {
    req.getConnection((err, conn) => {
        res.render('successful/registerIndex', {
            session: req.session
        });
    });
}

controller.successemployee = function (req, res) {
    req.getConnection((err, conn) => {
        res.render('successful/successfulIndexEmployee', {
            session: req.session
        });
    });
}

controller.successleader = function (req, res) {
    req.getConnection((err, conn) => {
        res.render('successful/successfulleader', {
            session: req.session
        });
    });
}

controller.successfulhr = function (req, res) {
    req.getConnection((err, conn) => {
        res.render('successful/successfulhr', {
            session: req.session
        });
    });
}

module.exports = controller;