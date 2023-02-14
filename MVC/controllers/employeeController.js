const controller = {};
const { validationResult } = require('express-validator');


controller.list = function (req, res) {
    if (req.session.admin || req.session.employee) {
        req.getConnection((err, conn) => {
            conn.query('select em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id, d.id as did, d.department, s.id as sid,  s.sex , sd.id as sdid , sd.subdepartment   from employee as em left join department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id', (err, employeeList) => {
                if (err) {
                    res.json(err);
                }
                res.render('employee/employeeList', {
                    data: employeeList,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};

controller.record = function (req, res) {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id, d.id as did, d.department, s.id as sid, s.sex ,w.id as wid ,  w.section , w.assessmentscore , w.employee_id , DATE_FORMAT(datetime,"%d/%m/%Y") as wdt  from employee as em left join department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN workevaluation as w ON w.employee_id = em.id where em.id = ?', [id], (err, employeeList) => {
                conn.query('select em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.lastname , em.usertype , em.sex_id , em.subdepartment_id , d.id as did , d.department , s.id as sid , s.sex , sd.id as sdid , sd.id as sdid , sd.subdepartment , ev.id as evid , ev.name , ev.employee_id as evem , ev.section from employee as em left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN subdepartment as sd ON em.subdepartment_id = s.id left JOIN evaluatecolleagues as ev ON em.id = ev.employee_id  where em.id = ?', [id], (err, evList) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render('employee/employeeRecord', {
                        data: employeeList,
                        data2: evList,
                        session: req.session
                    });
                });
            });
        });
    } else {
        res.redirect('/');
    }
};

controller.add = function (req, res) {
    if (req.session.employee || req.session.admin || req.session.leader || req.session.hr || req.session.leaderinstallandma || req.session.leaderinstall || req.session.leaderma) {
        const { id } = req.params;

        req.getConnection(function (err, conn) {
            conn.query("select em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id ,  w.id as wid, w.section, w.assessmentscore, w.employee_id  from  employee as em left JOIN  workevaluation as w ON w.employee_id = em.id where em.id = ?;", [id], function (err, employeeAdd) {
                conn.query("select * from employee", function (err, employee) {
                    if (err) {
                        req.session.errors = errors;
                        req.session.success = false;
                        res.redirect('/employee')
                    } else {
                        res.render("employee/employeeAdd", {
                            data: employeeAdd,
                            data2: employee,
                            session: req.session

                        });
                    };
                });
            });
        });
    } else {
        res.redirect('/');
    };
};

controller.add2 = function (req, res) {
    if (req.session.employee || req.session.admin || req.session.leader || req.session.leaderinstallandma || req.session.leaderinstall || req.session.leaderma) {
        const { id } = req.params;

        req.getConnection(function (err, conn) {
            conn.query("select em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id ,  w.id as wid, w.section, w.assessmentscore, w.employee_id  from  employee as em left JOIN  workevaluation as w ON w.employee_id = em.id where em.id = ?;", [id], function (err, employeeAdd) {
                conn.query("select * from employee", function (err, employee) {
                    if (err) {
                        req.session.errors = errors;
                        req.session.success = false;
                        res.redirect('/employee')
                    } else {
                        res.render("employee/employeeAdd2", {
                            data: employeeAdd,
                            data2: employee,
                            session: req.session

                        });
                    };
                });
            });
        });
    } else {
        res.redirect('/');
    };
};

controller.save = (req, res) => {
    if (req.session.employee || req.session.admin || req.session.leader || req.session.leaderinstallandma || req.session.leaderinstall || req.session.leaderma) {

        const { id } = req.params;
        const data = req.body;
        const datafrom = [data.assessmentscore[0] + "," + data.assessmentscore[1] + "," + data.assessmentscore[2] + "," + data.assessmentscore[3] + "," + data.assessmentscore[4] + "," + data.assessmentscore[5] + "," + data.assessmentscore[6] + "," + data.assessmentscore[7] + "," + data.assessmentscore[8] + "," + data.assessmentscore[9] + "," + data.assessmentscore[10] + "," + data.assessmentscore[11] + "," + data.assessmentscore[12] + "," + data.assessmentscore[13] + "," + data.assessmentscore[14] + "," + data.assessmentscore[15] + "," + data.assessmentscore[16] + "," + data.assessmentscore[17] + "," + data.assessmentscore[18] + "," + data.assessmentscore[19]];
        const datasection = [data.section[0] + "," + data.section[1] + "," + data.section[2] + "," + data.section[3] + "," + data.section[4] + "," + data.section[5] + "," + data.section[6] + "," + data.section[7] + "," + data.section[8] + "," + data.section[9] + "," + data.section[10] + "," + data.section[11] + "," + data.section[12] + ":" + data.section[13] + "," + data.section[14] + "," + data.section[15] + "," + data.section[16] + "," + data.section[17] + ":" + data.section[18] + "," + data.section[19]];
        const dataform2 = [data.name[0] + "," + data.name[1] + "," + data.name[2] + "," + data.name[3] + "," + data.name[4] + "," + data.name[5] + "," + data.name[6] + "," + data.name[7] + "," + data.name[8] + "," + data.name[9] + "," + data.name[10] + "," + data.name[11] + "," + data.name[12] + "," + data.name[13] + "," + data.name[14]];
        const datasection2 = [data.section[0] + ":" + data.section[1] + ":" + data.section[2] + ":" + data.section[3] + ":" + data.section[4] + ":" + data.section[5] + ":" + data.section[6] + ":" + data.section[7] + ":" + data.section[8] + ":" + data.section[9] + ":" + data.section[10] + ":" + data.section[11] + ":" + data.section[12] + ":" + data.section[13] + ":" + data.section[14]];
        const errors = validationResult(req);
        if (data.employee_id == "") { data.employee_id = null; }


        req.getConnection((err, conn) => {

            if (!errors.isEmpty()) {

                req.session.errors = errors;
                req.session.success = false;
                req.getConnection(function (err, conn) {
                    conn.query("select w.id as wid, w.section, w.assessmentscore, w.employee_id, em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id  from workevaluation as w left JOIN employee as em ON w.employee_id = em.id; ", function (err, employeeSave) {
                        conn.query("select ev.id as evid , ev.employee_id as evem , em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id as emd , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id, d.id as did , d.department , s.id as sid , s.sex , sd.id as sdid , sd.subdepartment , sd.department_id as sdd from evaluatecolleagues as ev left JOIN employee as em ON ev.employee_id = em.id left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id;", function (err, leaderSave2) {
                            if (err) {
                                req.session.errors = errors;
                                req.session.success = false;
                                res.redirect('/leader')
                            } else {
                                res.render("leader/leaderAdd", {
                                    data: employeeSave,
                                    data2: leaderSave2,
                                    session: req.session
                                });
                            };
                        });
                    });
                });
            } else {

                req.session.success = true;
                req.session.topic = "เพิ่มข้อมูลสำเร็จ";
                conn.query('INSERT INTO workevaluation (assessmentscore,employee_id,section) value (?,?,?)', [datafrom, data.employee_id, datasection], (err, employeeSave) => {
                    conn.query('INSERT INTO evaluatecolleagues (name,employee_id,section) value (?,?,?)', [dataform2, data.employee_id, datasection2], (err2, leaderSave) => {
                        res.redirect('/successful')
                    });
                });
            };

        });

    } else {
        res.redirect('/');
    }


};
controller.save2 = (req, res) => {
    if (req.session.employee || req.session.admin || req.session.leader || req.session.leader2) {

        const { id } = req.params;
        const data = req.body;
        const datafrom = [data.assessmentscore[0] + "," + data.assessmentscore[1] + "," + data.assessmentscore[2] + "," + data.assessmentscore[3] + "," + data.assessmentscore[4] + "," + data.assessmentscore[5] + "," + data.assessmentscore[6] + "," + data.assessmentscore[7] + "," + data.assessmentscore[8] + "," + data.assessmentscore[9] + "," + data.assessmentscore[10] + "," + data.assessmentscore[11] + "," + data.assessmentscore[12] + "," + data.assessmentscore[13] + "," + data.assessmentscore[14] + "," + data.assessmentscore[15] + "," + data.assessmentscore[16] + "," + data.assessmentscore[17] + "," + data.assessmentscore[18] + "," + data.assessmentscore[19]];
        const datasection = [data.section[0] + "," + data.section[1] + "," + data.section[2] + "," + data.section[3] + "," + data.section[4] + "," + data.section[5] + "," + data.section[6] + "," + data.section[7] + "," + data.section[8] + "," + data.section[9] + "," + data.section[10] + "," + data.section[11] + "," + data.section[12] + ":" + data.section[13] + "," + data.section[14] + "," + data.section[15] + "," + data.section[16] + "," + data.section[17] + ":" + data.section[18] + "," + data.section[19]];
        const dataform2 = [data.name[0] + "," + data.name[1] + "," + data.name[2] + "," + data.name[3] + "," + data.name[4] + "," + data.name[5] + "," + data.name[6] + "," + data.name[7] + "," + data.name[8] + "," + data.name[9] + "," + data.name[10] + "," + data.name[11] + "," + data.name[12] + "," + data.name[13] + "," + data.name[14]];
        const datasection2 = [data.section[0] + ":" + data.section[1] + ":" + data.section[2] + ":" + data.section[3] + ":" + data.section[4] + ":" + data.section[5] + ":" + data.section[6] + ":" + data.section[7] + ":" + data.section[8] + ":" + data.section[9] + ":" + data.section[10] + ":" + data.section[11] + ":" + data.section[12] + ":" + data.section[13] + ":" + data.section[14]];
        const errors = validationResult(req);
        if (data.employee_id == "") { data.employee_id = null; }


        req.getConnection((err, conn) => {

            if (!errors.isEmpty()) {

                req.session.errors = errors;
                req.session.success = false;
                req.getConnection(function (err, conn) {
                    conn.query("select w.id as wid, w.section, w.assessmentscore, w.employee_id, em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id  from workevaluation as w left JOIN employee as em ON w.employee_id = em.id; ", function (err, employeeSave) {
                        conn.query("select ev.id as evid , ev.employee_id as evem , em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id as emd , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id, d.id as did , d.department , s.id as sid , s.sex , sd.id as sdid , sd.subdepartment , sd.department_id as sdd from evaluatecolleagues as ev left JOIN employee as em ON ev.employee_id = em.id left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id;", function (err, leaderSave2) {
                            if (err) {
                                req.session.errors = errors;
                                req.session.success = false;
                                res.redirect('/leader')
                            } else {
                                res.render("leader/leaderAdd", {
                                    data: employeeSave,
                                    data2: leaderSave2,
                                    session: req.session
                                });
                            };
                        });
                    });
                });
            } else {

                req.session.success = true;
                req.session.topic = "เพิ่มข้อมูลสำเร็จ";
                conn.query('INSERT INTO workevaluation (assessmentscore,employee_id,section) value (?,?,?)', [datafrom, data.employee_id, datasection], (err, employeeSave) => {
                    conn.query('INSERT INTO evaluatecolleagues (name,employee_id,section) value (?,?,?)', [dataform2, data.employee_id, datasection2], (err2, leaderSave) => {
                        res.redirect('/successemployee')
                    });
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
            conn.query('select w.id as wid, w.section, w.assessmentscore, w.employee_id, em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id  from workevaluation as w left JOIN employee as em ON w.employee_id = em.id  WHERE w.id = ? ', [id], (err, editemployeeList) => {


                if (err) {
                    res.json(err);
                }
                res.render('employee/employeeEdit', {
                    data: editemployeeList[0],
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
        const datafrom = [data.assessmentscore[0] + "," + data.assessmentscore[1] + "," + data.assessmentscore[2] + "," + data.assessmentscore[3] + "," + data.assessmentscore[4] + "," + data.assessmentscore[5] + "," + data.assessmentscore[6] + "," + data.assessmentscore[7] + "," + data.assessmentscore[8] + "," + data.assessmentscore[9] + "," + data.assessmentscore[10] + "," + data.assessmentscore[11] + "," + data.assessmentscore[12] + "," + data.assessmentscore[13] + "," + data.assessmentscore[14] + "," + data.assessmentscore[15] + "," + data.assessmentscore[16] + "," + data.assessmentscore[17] + "," + data.assessmentscore[18] + "," + data.assessmentscore[19]];
        const datasection = [data.section[0] + "," + data.section[1] + "," + data.section[2] + "," + data.section[3] + "," + data.section[4] + "," + data.section[5] + "," + data.section[6] + "," + data.section[7] + "," + data.section[8] + "," + data.section[9] + "," + data.section[10] + "," + data.section[11] + "," + data.section[12] + ":" + data.section[13] + "," + data.section[14] + "," + data.section[15] + "," + data.section[16] + "," + data.section[17] + ":" + data.section[18] + "," + data.section[19]];
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            req.getConnection((err, conn) => {
                conn.query('select w.id as wid, w.section, w.assessmentscore, w.employee_id, em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id  from workevaluation as w left JOIN employee as em ON w.employee_id = em.id WHERE w.id = ?', [id], (err, editemployeeList) => {

                    if (err) {
                        res.json(err);

                    }
                    res.render('employee/employeeEdit', {
                        data: editemployeeList[0],
                        session: req.session
                    });
                });
            });
        } else {
            req.session.success = true;
            req.session.topic = "แก้ไขข้อมูลสำเร็จ";
            req.getConnection((err, conn) => {
                conn.query('UPDATE workevaluation SET assessmentscore = ?   WHERE id = ?', [datafrom, id], (err, editemployeeList) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/employeelist');
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
            conn.query('select w.id as wid, w.section, w.assessmentscore, w.employee_id, DATE_FORMAT(datetime,"%d/%m/%Y") as wdt ,em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id  from workevaluation as w left JOIN employee as em ON w.employee_id = em.id WHERE w.id = ?', [id], (err, employeeDel) => {
                if (err) {
                    res.json(err);
                }
                res.render('employee/employeeRecordDel', {
                    data: employeeDel[0],
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
            conn.query('select w.id as wid, w.section, w.assessmentscore, w.employee_id, em.id as emid, em.firstname, em.lastname, em.nickname, em.position, em.username, em.password, em.usertype, em.department_id, em.sex_id  from workevaluation as w left JOIN employee as em ON w.employee_id = em.id WHERE w.id = ? ', [id], (err2, employeeDel) => {
                conn.query('DELETE FROM workevaluation  WHERE id = ?', [id], (err, employeeDelete) => {
                    if (err) {
                        const errorss = { errors: [{ value: '', msg: 'ไม่สามารถลบข้อมูลนี้ได้ ', param: '', location: '' }] }
                        req.session.errors = errorss;
                        req.session.success = false;
                    } else {
                        req.session.success = true;
                        req.session.topic = "ลบข้อมูลสำเร็จ";

                    };
                    res.redirect('/employeelistrecord/' + employeeDel[0].emid);
                });
            });
        });
    } else {
        res.redirect('/');
    }

};






module.exports = controller;