const controller = {};
const session = require('express-session');
const { validationResult } = require('express-validator');
controller.add = function (req, res) {
    if (req.session.leader || req.session.admin || req.session.leaderinstallandmaid || req.session.leaderma || req.session.leaderinstall) {
        const { id } = req.params;

        req.getConnection(function (err, conn) {
            conn.query("select em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , d.id as did , d.department , em.subdepartment_id , s.id as sid , s.sex , sd.id as sdid , sd.subdepartment , ch.id as chid , ch.assessmentscore , ch.employee_id , ch.chiefassessmenttype , ch.datetime , ch.other FROM employee as em left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN chiefassessment as ch ON em.id = ch.employee_id where em.id = ? ", [id], function (err, leaderADD) {
                if (err) {
                    req.session.errors = errors;
                    req.session.success = false;
                    res.redirect('/leader')
                } else {
                    res.render("leader/leaderAdd", {
                        data: leaderADD[0],
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
    if (req.session.leader || req.session.admin || req.session.leaderinstallandmaid || req.session.leaderma || req.session.leaderinstall) {

        const { id } = req.params;

        const data = req.body;
        const datafrom = [data.assessmentscore[0] + "," + data.assessmentscore[1] + "," + data.assessmentscore[2] + "," + data.assessmentscore[3] + "," + data.assessmentscore[4]
            + "," + data.assessmentscore[5] + "," + data.assessmentscore[6] + "," + data.assessmentscore[7] + "," + data.assessmentscore[8] + "," + data.assessmentscore[9]
            + "," + data.assessmentscore[10] + "," + data.assessmentscore[11] + "," + data.assessmentscore[12] + "," + data.assessmentscore[13] + "," + data.assessmentscore[14]
            + "," + data.assessmentscore[15] + "," + data.assessmentscore[16] + "," + data.assessmentscore[17] + "," + data.assessmentscore[18] + "," + data.assessmentscore[19]
        ];
        const datatypeid = [data.chiefassessmenttype[0] + "," + data.chiefassessmenttype[1] + "," + data.chiefassessmenttype[2] + "," + data.chiefassessmenttype[3] + "," + data.chiefassessmenttype[4]
            + "||" + data.chiefassessmenttype[5] + "," + data.chiefassessmenttype[6] + "," + data.chiefassessmenttype[7] + "," + data.chiefassessmenttype[8] + "," + data.chiefassessmenttype[9] + "," + data.chiefassessmenttype[10] + "," + data.chiefassessmenttype[11]
            + "||" + data.chiefassessmenttype[12] + "," + data.chiefassessmenttype[13] + "," + data.chiefassessmenttype[14] + "," + data.chiefassessmenttype[15] + "," + data.chiefassessmenttype[16] + "," + data.chiefassessmenttype[17] + "," + data.chiefassessmenttype[18] + "," + data.chiefassessmenttype[19]];
        const dataother = [data.other[0] + "," + data.other[1] + "," + data.other[2] + "," + data.other[3] + "," + data.other[4] + "," + data.other[5] + "," + data.other[6]
            + "," + data.other[7] + "," + data.other[8] + "," + data.other[9] + "," + data.other[10] + "," + data.other[11] + "," + data.other[12] + "," + data.other[13] + "," + data.other[14]];
        const errors = validationResult(req);
        if (data.employee_id == "") { data.employee_id = null; }
        req.getConnection((err, conn) => {

            if (!errors.isEmpty()) {

                req.session.errors = errors;
                req.session.success = false;
                req.getConnection(function (err, conn) {
                    conn.query("select em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , d.id as did , d.department , em.subdepartment_id , s.id as sid , s.sex , sd.id as sdid , sd.subdepartment , ch.id as chid , ch.assessmentscore , ch.employee_id , ch.chiefassessmenttype , ch.datetime , ch.other FROM employee as em left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN chiefassessment as ch ON em.id = ch.employee_id  ", function (err, leaderSave) {
                        if (err) {
                            req.session.errors = errors;
                            req.session.success = false;
                            res.redirect('/leader')
                        } else {
                            res.render("leader/leaderAdd", {
                                data: leaderSave,
                                session: req.session
                            });
                        };

                    });
                });
            } else {

                req.session.success = true;
                req.session.topic = "เพิ่มข้อมูลสำเร็จ";
                conn.query("select em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , d.id as did , d.department , em.subdepartment_id , s.id as sid , s.sex , sd.id as sdid , sd.subdepartment , ch.id as chid , ch.assessmentscore , ch.employee_id , ch.chiefassessmenttype , ch.datetime , ch.other FROM employee as em left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN chiefassessment as ch ON em.id = ch.employee_id where em.id = ? ", [id], function (err, leader2Save) {
                    conn.query('INSERT INTO chiefassessment (assessmentscore,employee_id,chiefassessmenttype,other) value (?,?,?,?)', [datafrom, data.employee_id, datatypeid, dataother], (err, leaderSave) => {
                        res.redirect('/successfulleader');
                    });
                });
            };

        });
    } else {
        res.redirect('/');
    }
};



controller.list = function (req, res) {
    if (req.session.leader || req.session.admin || req.session.leader2) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , d.id as did , d.department , sd.id as sdid , sd.subdepartment , s.id as sid , s.sex  from employee as em left JOIN department as d ON em.department_id = d.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN sex as s ON em.sex_id = s.id where em.department_id = ?; ', [department_id], (err, leaderList) => {
                if (err) {
                    res.json(err);
                }
                res.render('leader/leaderList', {
                    data: leaderList,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};

controller.listadmin = function (req, res) {
    if (req.session.admin) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , d.id as did , d.department , sd.id as sdid , sd.subdepartment , s.id as sid , s.sex  from employee as em left JOIN department as d ON em.department_id = d.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN sex as s ON em.sex_id = s.id; ', [department_id], (err, leaderList) => {
                if (err) {
                    res.json(err);
                }
                res.render('leader/leaderListadmin', {
                    data: leaderList,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};



controller.list2 = (req, res) => {
    if (req.session.leader || req.session.admin || req.session.leaderinstallandmaid) {
        req.getConnection((err, conn) => {
            conn.query('select em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , d.id as did , d.department , em.subdepartment_id , s.id as sid , s.sex , sd.id as sdid , sd.subdepartment  FROM employee as em left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id where em.department_id = 4 ', (err, adminList) => {
                if (err) {
                    res.json(err);
                }
                res.render('leader/leaderList2', { //หน้าพนักงานในทีมของ homeleader2
                    data: adminList,
                    session: req.session
                });
            });
        });

    } else {
        res.redirect('/');
    }

};


controller.list3 = (req, res) => {
    if (req.session.leader || req.session.admin || req.session.leaderma) {

        req.getConnection((err, conn) => {
            conn.query('select em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , d.id as did , d.department , em.subdepartment_id , s.id as sid , s.sex , sd.id as sdid , sd.subdepartment  FROM employee as em left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id where em.department_id = 4 AND em.subdepartment_id = 5;', (err, adminList) => {
                if (err) {
                    res.json(err);
                }
                res.render('leader/leaderListma', { //หน้าพนักงานในทีมของ listleaderma
                    data: adminList,
                    session: req.session
                });
            });
        });

    } else {
        res.redirect('/');
    }

};

controller.list4 = (req, res) => {
    if (req.session.leader || req.session.admin || req.session.leaderinstall) {
        req.getConnection((err, conn) => {
            conn.query('select em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , d.id as did , d.department , em.subdepartment_id , s.id as sid , s.sex , sd.id as sdid , sd.subdepartment  FROM employee as em left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id where em.department_id = 4 AND em.subdepartment_id = 4;', (err, adminList) => {
                if (err) {
                    res.json(err);
                }
                res.render('leader/leaderListinstall', {
                    data: adminList,
                    session: req.session
                });
            });
        });

    } else {
        res.redirect('/');
    }

};

controller.record = (req, res) => {
    if (req.session.leader || req.session.admin || req.session.leaderinstallandma || req.session.leaderinstall || req.session.leaderma) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select ch.id as chid, ch.assessmentscore, ch.employee_id,DATE_FORMAT(datetime,"%d/%m/%Y") as chdt , em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id, d.id as did, d.department, s.id as sid, s.sex  FROM chiefassessment as ch left JOIN employee as em ON ch.employee_id = em.id left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id  WHERE em.id = ?', [id], (err, hrList) => {
                if (err) {
                    res.json(err);
                }
                res.render('leader/leaderRecord', {
                    data: hrList,
                    session: req.session
                });
            });
        });

    } else {
        res.redirect('/');
    }

};



controller.edit = (req, res) => {
    if (req.session.leader || req.session.admin || req.session.leader2) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select ch.id as chid, ch.assessmentscore, ch.employee_id , ch.other ,  em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id, d.id as did, d.department, s.id as sid, s.sex  FROM chiefassessment as ch left JOIN employee as em ON ch.employee_id = em.id left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id  WHERE ch.id = ? ', [id], (err, editleaderList) => {


                if (err) {
                    res.json(err);
                }
                res.render('leader/leaderEdit', {
                    data: editleaderList[0],
                    session: req.session

                });

            });
        });
    } else {
        res.redirect('/');
    }

};


controller.update = (req, res) => {
    if (req.session.leader || req.session.admin || req.session.leader2) {
        const { id } = req.params;
        const data = req.body;
        const datafrom = [data.assessmentscore[0] + "," + data.assessmentscore[1] + "," + data.assessmentscore[2] + "," + data.assessmentscore[3] + "," + data.assessmentscore[4]
            + "," + data.assessmentscore[5] + "," + data.assessmentscore[6] + "," + data.assessmentscore[7] + "," + data.assessmentscore[8] + "," + data.assessmentscore[9]
            + "," + data.assessmentscore[10] + "," + data.assessmentscore[11] + "," + data.assessmentscore[12] + "," + data.assessmentscore[13] + "," + data.assessmentscore[14]
            + "," + data.assessmentscore[15] + "," + data.assessmentscore[16] + "," + data.assessmentscore[17] + "," + data.assessmentscore[18] + "," + data.assessmentscore[19]
        ];
        const datatypeid = [data.chiefassessmenttype[0] + "," + data.chiefassessmenttype[1] + "," + data.chiefassessmenttype[2] + "," + data.chiefassessmenttype[3] + "," + data.chiefassessmenttype[4]
            + "||" + data.chiefassessmenttype[5] + "," + data.chiefassessmenttype[6] + "," + data.chiefassessmenttype[7] + "," + data.chiefassessmenttype[8] + "," + data.chiefassessmenttype[9] + "," + data.chiefassessmenttype[10] + "," + data.chiefassessmenttype[11]
            + "||" + data.chiefassessmenttype[12] + "," + data.chiefassessmenttype[13] + "," + data.chiefassessmenttype[14] + "," + data.chiefassessmenttype[15] + "," + data.chiefassessmenttype[16] + "," + data.chiefassessmenttype[17] + "," + data.chiefassessmenttype[18] + "," + data.chiefassessmenttype[19]];
        const dataother = [data.other[0] + "," + data.other[1] + "," + data.other[2] + "," + data.other[3] + "," + data.other[4] + "," + data.other[5] + "," + data.other[6]
            + "|||" + data.other[7] + "," + data.other[8] + "," + data.other[9] + "," + data.other[10] + "," + data.other[11] + "," + data.other[12] + "," + data.other[13] + "," + data.other[14]];
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            req.getConnection((err, conn) => {
                conn.query('select ch.id as chid, ch.assessmentscore, ch.employee_id , ch.other ,  em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id, d.id as did, d.department, s.id as sid, s.sex  FROM chiefassessment as ch left JOIN employee as em ON ch.employee_id = em.id left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id   WHERE ch.id = ?', [id], (err, hrvSave) => {
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
                conn.query('UPDATE chiefassessment SET assessmentscore = ? ,other = ?  WHERE id = ?', [datafrom, dataother, id], (err, hrvSave) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/leaderlistadmin');
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
            conn.query('select ch.id as chid, ch.assessmentscore, ch.employee_id , ch.other ,DATE_FORMAT(datetime,"%d/%m/%Y") as chdt,  em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id, d.id as did, d.department, s.id as sid, s.sex  FROM chiefassessment as ch left JOIN employee as em ON ch.employee_id = em.id left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id  WHERE ch.id = ?', [id], (err, leaderDel) => {
                if (err) {
                    res.json(err);
                }
                res.render('leader/leaderRecordDel', {
                    data: leaderDel[0],
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
            conn.query('select ch.id as chid, ch.assessmentscore, ch.employee_id , ch.other ,DATE_FORMAT(datetime,"%d/%m/%Y") as chdt,  em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id, d.id as did, d.department, s.id as sid, s.sex  FROM chiefassessment as ch left JOIN employee as em ON ch.employee_id = em.id left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id where ch.id = ? ', [id], (err2, leaderDel) => {
                conn.query('DELETE FROM chiefassessment  WHERE id = ?', [id], (err, leaderDelete) => {
                    if (err) {
                        const errorss = { errors: [{ value: '', msg: 'ไม่สามารถลบข้อมูลนี้ได้ ', param: '', location: '' }] }
                        req.session.errors = errorss;
                        req.session.success = false;
                    } else {
                        req.session.success = true;
                        req.session.topic = "ลบข้อมูลสำเร็จ";

                    };
                    res.redirect('/leaderrecord/' + leaderDel[0].employee_id);
                });
            });
        });
    } else {
        res.redirect('/');
    }

};





module.exports = controller;