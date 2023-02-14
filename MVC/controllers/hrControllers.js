const controller = {};
const { validationResult } = require('express-validator');

controller.add = function (req, res) {
    if (req.session.hr || req.session.admin) {
        const { id } = req.params;

        req.getConnection(function (err, conn) {
            conn.query("select em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , d.id as did , d.department , s.id as sid , s.sex , v.id as vid , v.datehour , v.employee_id , v.vaeationtype , v.datetime  from employee as em left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN vaeation as v ON v.employee_id = em.id where em.id = ?  ", [id], function (err, hrList) {
                if (err) {
                    req.session.errors = errors;
                    req.session.success = false;
                    res.redirect('/hr')
                } else {
                    res.render("HR/hrAdd", {
                        data: hrList[0],
                        session: req.session

                    });
                };
            });
        });
    } else {
        res.redirect('/');
    };
};

controller.list = (req, res) => {
    if (req.session.hr || req.session.admin) {
        req.getConnection((err, conn) => {
            conn.query('select em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , d.id as did , d.department , sd.id as sdid , sd.subdepartment , s.id as sid , s.sex from employee as em left JOIN department as d ON em.department_id = d.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN sex as s ON em.sex_id = s.id;', (err, hrList) => {
                if (err) {
                    res.json(err);
                }
                res.render('HR/hrList', {
                    data: hrList,
                    session: req.session
                });
            });
        });

    } else {
        res.redirect('/');
    }

};

controller.listadmin = (req, res) => {
    if (req.session.admin) {
        req.getConnection((err, conn) => {
            conn.query('select em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , d.id as did , d.department , sd.id as sdid , sd.subdepartment , s.id as sid , s.sex from employee as em left JOIN department as d ON em.department_id = d.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN sex as s ON em.sex_id = s.id;', (err, hrList) => {
                if (err) {
                    res.json(err);
                }
                res.render('HR/hrListadmin', {
                    data: hrList,
                    session: req.session
                });
            });
        });

    } else {
        res.redirect('/');
    }

};



controller.record = (req, res) => {
    if (req.session.admin || req.session.hr || req.session.employee || req.session.leader || req.session.leaderinstallandma || req.session.leaderinstall || req.session.leaderma) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select v.id as vid , v.datehour , v.datehour , v.vaeationtype ,DATE_FORMAT(datetime,"%d/%m/%Y") as vdt , em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , d.id as did , d.department , s.id as sid , s.sex from vaeation as v left JOIN employee as em  ON v.employee_id = em.id left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id WHERE em.id = ?', [id], (err, hrList) => {
                if (err) {
                    res.json(err);
                }
                res.render('HR/hrRecord', {
                    data: hrList,
                    session: req.session
                });
            });
        });

    } else {
        res.redirect('/');
    }

};

controller.save = (req, res) => {
    if (req.session.hr || req.session.admin) {

        const { id } = req.params;
        const data = req.body;
        const datafromhr = [data.datehour[0] + "," + data.datehour[1] + ":" + data.datehour[2] + "," + data.datehour[3] + "," + data.datehour[4] + ":" + data.datehour[5] + ":" + data.datehour[6] + ":" + data.datehour[7] + ":" + data.datehour[8] + ":" + data.datehour[9] + ":" + data.datehour[10] + ":" + data.datehour[11] + ":" + data.datehour[12]];
        const datatypehr = [data.vaeationtype[0] + ":" + data.vaeationtype[1] + ":" + data.vaeationtype[2] + ":" + data.vaeationtype[3] + ":" + data.vaeationtype[4] + ":" + data.vaeationtype[5] + ":" + data.vaeationtype[6] + ":" + data.vaeationtype[7] + ":" + data.vaeationtype[8] + ":" + data.vaeationtype[9] + ":" + data.vaeationtype[10]];
        const errors = validationResult(req);
        req.getConnection((err, conn) => {
            if (!errors.isEmpty()) {

                req.session.errors = errors;
                req.session.success = false;
                req.getConnection(function (err, conn) {
                    conn.query("select em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , d.id as did , d.department , s.id as sid , s.sex , v.id as vid , v.datehour , v.employee_id , v.vaeationtype , v.datetime  from employee as em left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN vaeation as v ON v.employee_id = em.id", function (err, hrSave) {
                        if (err) {
                            req.session.errors = errors;
                            req.session.success = false;
                            res.redirect('/hr')
                        } else {
                            res.render("hr/hrAdd", {
                                data: hrSave,
                                session: req.session
                            });
                        };

                    });
                });
            } else {

                req.session.success = true;
                req.session.topic = "เพิ่มข้อมูลสำเร็จ";
                conn.query('INSERT INTO vaeation (datehour,employee_id,vaeationtype) value (?,?,?)', [datafromhr, data.employee_id, datatypehr], (err, hrSave) => {
                    res.redirect('/successfulhr')
                });
            };

        });

    } else {
        res.redirect('/');
    }


};

controller.edit = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select v.id as vid , v.datehour , v.datehour , v.vaeationtype , v.datetime , em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , d.id as did , d.department , s.id as sid , s.sex from vaeation as v left JOIN employee as em  ON v.employee_id = em.id left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id WHERE v.id = ? ', [id], (err, edithrList) => {


                if (err) {
                    res.json(err);
                }
                res.render('HR/hrEdit', {
                    data: edithrList[0],
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
        const datafromhr = [data.datehour[0] + "," + data.datehour[1] + ":" + data.datehour[2] + "," + data.datehour[3] + "," + data.datehour[4] + ":" + data.datehour[5] + ":" + data.datehour[6] + ":" + data.datehour[7] + ":" + data.datehour[8] + ":" + data.datehour[9] + ":" + data.datehour[10] + ":" + data.datehour[11] + ":" + data.datehour[12]];
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            req.getConnection((err, conn) => {
                conn.query('select v.id as vid , v.datehour , v.datehour , v.vaeationtype , v.datetime , em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , d.id as did , d.department , s.id as sid , s.sex from vaeation as v left JOIN employee as em  ON v.employee_id = em.id left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id  WHERE v.id = ?', [id], (err, hrvSave) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render('HR/hrEdit', {
                        data: hrvSave[0],
                        session: req.session
                    });
                });
            });
        } else {
            req.session.success = true;
            req.session.topic = "แก้ไขข้อมูลสำเร็จ";
            req.getConnection((err, conn) => {
                conn.query('UPDATE vaeation SET datehour = ? WHERE id = ?', [datafromhr, id], (err, hrvSave) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/hrlistadmin');
                });
            });
        }
    } else {
        res.redirect('/');
    }

};

controller.delAdmin = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select v.id as vid , v.datehour , v.datehour , v.vaeationtype ,DATE_FORMAT(datetime,"%d/%m/%Y") as vdt , em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , d.id as did , d.department , s.id as sid , s.sex from vaeation as v left JOIN employee as em  ON v.employee_id = em.id left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id  WHERE v.id = ?', [id], (err, hradminDel) => {
                if (err) {
                    res.json(err);
                }
                res.render('hr/hrAdminDel', {
                    data: hradminDel[0],
                    session: req.session

                });
            });
        });
    } else {
        res.redirect('/');
    }

};

controller.deleteAdmin = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select v.id as vid , v.datehour , v.datehour , v.vaeationtype ,DATE_FORMAT(datetime,"%d/%m/%Y") as vdt , em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , d.id as did , d.department , s.id as sid , s.sex from vaeation as v left JOIN employee as em  ON v.employee_id = em.id left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id  WHERE v.id = ?', [id], (err2, hrrradminDel) => {
                conn.query('DELETE FROM vaeation  WHERE id = ?', [id], (err, hrDelete) => {

                    if (err) {
                        const errorss = { errors: [{ value: '', msg: 'ไม่สามารถลบข้อมูลนี้ได้ ', param: '', location: '' }] }
                        req.session.errors = errorss;
                        req.session.success = false;
                    } else {
                        req.session.success = true;
                        req.session.topic = "ลบข้อมูลสำเร็จ";

                    };
                    res.redirect('/hrrecord/' + hrrradminDel[0].emid);

                });
            });
        });
    } else {
        res.redirect('/');
    }

};



module.exports = controller;