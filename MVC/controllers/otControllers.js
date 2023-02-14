const controller = {};
const session = require('express-session');
const { validationResult } = require('express-validator');


controller.add = function (req, res) {
    if (req.session.employee || req.session.admin || req.session.leader || req.session.hr || req.session.leaderinstallandma || req.session.leaderinstall || req.session.leaderma) {
        const { id } = req.params;
        req.getConnection(function (err, conn) {
            conn.query("select ot.id as otid , ot.dateot , ot.datestart , ot.dateend , ot.detail , ot.employee_id , ot.month , ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where ot.id = ?;", [id], function (err, otAdd) {

                if (err) {
                    req.session.errors = errors;
                    req.session.success = false;
                    res.redirect('/homeot')
                } else {
                    res.render("ot/otAdd", {
                        data: otAdd,
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
    if (req.session.employee || req.session.admin || req.session.leader || req.session.leaderinstallandma || req.session.leaderinstall || req.session.leaderma) {
        const { id } = req.params;
        const data = req.body;
        const errors = validationResult(req);
        if (data.employee_id == "") { data.employee_id = null; }
        req.getConnection((err, conn) => {
            if (!errors.isEmpty()) {
                req.session.errors = errors;
                req.session.success = false;
                req.getConnection(function (err, conn) {
                    conn.query("select ot.id as otid , ot.dateot , ot.datestart , ot.dateend , ot.detail , ot.employee_id , ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id ", function (err, otSave) {
                        if (err) {
                            req.session.errors = errors;
                            req.session.success = false;
                            res.redirect('/homeot')
                        } else {
                            res.render("ot/otAdd", {
                                data: otSave,
                                session: req.session
                            });
                        };

                    });
                });
            } else {
                req.session.success = true;
                req.session.topic = "เพิ่มข้อมูลสำเร็จ";
                conn.query('INSERT INTO ot (dateot,datestart,dateend,detail,employee_id,month,status,break_time,statusot) value (?,?,?,?,?,?,?,?,?)', [data.dateot, data.datestart, data.dateend, data.detail, data.employee_id, data.month, data.status, data.break_time, data.statusot], (err, employeeSave) => {
                    res.redirect('/homeot')
                });
            };

        });
    } else {
        res.redirect('/');
    }
};
controller.list = function (req, res) {
    if (req.session.admin || req.session.employee) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?  ; ', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otList', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.listleader = function (req, res) {
    if (req.session.leader || req.session.admin) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = ?; ', [department_id], (err, listleader) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otListleader', {
                    data: listleader,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.listleaderinstall = function (req, res) {
    if (req.session.leaderinstall || req.session.admin) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = 4 and em.subdepartment_id = 4; ', (err, listleaderinstall) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otListleaderInstall', {
                    data: listleaderinstall,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.listleaderMa = function (req, res) {
    if (req.session.leaderma || req.session.admin) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = 4 and em.subdepartment_id = 5; ', (err, listleaderMa) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otListleaderMA', {
                    data: listleaderMa,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.listleaderInstallAndMA = function (req, res) {
    if (req.session.leaderinstallandmaid || req.session.admin) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = 4 ; ', (err, listleaderMa) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otListleaderInstallandMa', {
                    data: listleaderMa,
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
            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%Y/%m/%d") as otdo ,DATE_FORMAT(datestart,"%Y/%m/%d %T") as otds  , DATE_FORMAT(dateend,"%Y/%m/%d %T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ot.id = ?', [id], (err, otEdit) => {

                if (err) {
                    res.json(err);
                }
                res.render('ot/otEdit', {
                    data: otEdit[0],
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
                conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%Y/%m/%d") as otdo ,DATE_FORMAT(datestart,"%Y/%m/%d %T") as otds  , DATE_FORMAT(dateend,"%Y/%m/%d %T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ot.id = ?', [id], (err, otUpdate) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render('ot/otEdit', {
                        data: otUpdate[0],
                        session: req.session
                    });
                });
            });
        } else {
            req.session.success = true;
            req.session.topic = "แก้ไขข้อมูลสำเร็จ";
            req.getConnection((err, conn) => {
                conn.query('UPDATE ot SET dateot =  ?, datestart = ?, dateend = ?, detail = ? , break_time = ?  WHERE id = ?', [data.dateot, data.datestart, data.dateend, data.detail, data.break_time, id], (err, otUpdate) => {
                    conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%Y/%m/%d") as otdo ,DATE_FORMAT(datestart,"%Y/%m/%d %T") as otds  , DATE_FORMAT(dateend,"%Y/%m/%d %T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ot.id = ?', [id], (err, otUpdate) => {
                        if (err) {
                            res.json(err);
                        }
                        res.redirect('/otlist/' + otUpdate[0].employee_id);
                    });
                });
            });
        }
    } else {
        res.redirect('/');
    }

};
controller.editlast = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%Y/%m/%d") as otdo ,DATE_FORMAT(datestart,"%Y/%m/%d %T") as otds  , DATE_FORMAT(dateend,"%Y/%m/%d %T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ot.id = ?', [id], (err, otEdit) => {

                if (err) {
                    res.json(err);
                }
                res.render('ot/otEditlast', {
                    data: otEdit[0],
                    session: req.session

                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.updatelast = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        const data = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            req.getConnection((err, conn) => {
                conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%Y/%m/%d") as otdo ,DATE_FORMAT(datestart,"%Y/%m/%d %T") as otds  , DATE_FORMAT(dateend,"%Y/%m/%d %T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ot.id = ?', [id], (err, otUpdate) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render('ot/otEditlast', {
                        data: otUpdate[0],
                        session: req.session
                    });
                });
            });
        } else {
            req.session.success = true;
            req.session.topic = "แก้ไขข้อมูลสำเร็จ";
            req.getConnection((err, conn) => {
                conn.query('UPDATE ot SET dateot =  ?, datestart = ?, dateend = ?, detail = ? , status = ? WHERE id = ?', [data.dateot, data.datestart, data.dateend, data.detail, 0, id], (err, otUpdate) => {
                    conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%Y/%m/%d") as otdo ,DATE_FORMAT(datestart,"%Y/%m/%d %T") as otds  , DATE_FORMAT(dateend,"%Y/%m/%d %T") as otde, ot.detail , ot.employee_id, ot.status , em.id as emid , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ot.id = ? ', [id], (err, dataUpdate) => {
                        if (err) {
                            res.json(err);
                        }
                        res.redirect('/otlist/' + dataUpdate[0].employee_id);
                    });
                });
            });
        }
    } else {
        res.redirect('/');
    }

};
controller.listlast = function (req, res) {
    if (req.session.admin || req.session.employee) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?; ', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otListlast', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.listhistory_no = function (req, res) {
    if (req.session.admin || req.session.employee) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y %T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y %T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_no', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.listhistory_yes = function (req, res) {
    if (req.session.admin || req.session.employee) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?; ', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_yes', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.approval = (req, res) => {
    if (req.session.leaderinstallandmaid || req.session.leaderinstall || req.session.leaderma || req.session.leader || req.session.admin) {
        const { id } = req.params;
        const data = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            req.getConnection((err, conn) => {
                conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%Y/%m/%d") as otdo ,DATE_FORMAT(datestart,"%Y/%m/%d %T") as otds  , DATE_FORMAT(dateend,"%Y/%m/%d %T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ot.id = ?', [id], (err, adminUpdate) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/otlist/');
                });
            });
        } else {
            req.session.success = true;
            req.session.topic = "แก้ไขข้อมูลสำเร็จ";
            req.getConnection((err, conn) => {
                conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%Y/%m/%d") as otdo ,DATE_FORMAT(datestart,"%Y/%m/%d %T") as otds  , DATE_FORMAT(dateend,"%Y/%m/%d %T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ot.id = ?', [id], (err, adminUpdate2) => {
                    conn.query('UPDATE ot SET status =  ?  WHERE id = ?', [1, id], (err, adminUpdate) => {
                        if (err) {
                            res.json(err);
                        }
                        res.redirect('/otlist/' + adminUpdate2[0].employee_id);
                    });
                });
            });
        }
    } else {
        res.redirect('/');
    }

};
controller.disapproval = (req, res) => {
    if (req.session.leaderinstallandmaid || req.session.leaderinstall || req.session.leaderma || req.session.leader || req.session.admin) {
        const { id } = req.params;
        const data = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            req.getConnection((err, conn) => {
                conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%Y/%m/%d") as otdo ,DATE_FORMAT(datestart,"%Y/%m/%d %T") as otds  , DATE_FORMAT(dateend,"%Y/%m/%d %T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ot.id = ?', [id], (err, adminUpdate) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/otlist');
                });
            });
        } else {
            req.session.success = true;
            req.session.topic = "แก้ไขข้อมูลสำเร็จ";
            req.getConnection((err, conn) => {
                conn.query('UPDATE ot SET status =  ?  WHERE id = ?', [2, id], (err, adminUpdate) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/otlist');
                });
            });
        }
    } else {
        res.redirect('/');
    }

};
controller.approvallast = (req, res) => {
    if (req.session.leaderinstallandmaid || req.session.leaderinstall || req.session.leaderma || req.session.leader || req.session.admin) {
        const { id } = req.params;
        const data = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            req.getConnection((err, conn) => {
                conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%Y/%m/%d") as otdo ,DATE_FORMAT(datestart,"%Y/%m/%d %T") as otds  , DATE_FORMAT(dateend,"%Y/%m/%d %T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ot.id = ?', [id], (err, adminUpdate) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/otlist');
                });
            });
        } else {
            req.session.success = true;
            req.session.topic = "แก้ไขข้อมูลสำเร็จ";
            req.getConnection((err, conn) => {
                conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%Y/%m/%d") as otdo ,DATE_FORMAT(datestart,"%Y/%m/%d %T") as otds  , DATE_FORMAT(dateend,"%Y/%m/%d %T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ot.id = ?', [id], (err, adminUpdate2) => {
                    conn.query('UPDATE ot SET status =  ?  WHERE id = ?', [3, id], (err, adminUpdate) => {
                        if (err) {
                            res.json(err);
                        }
                        res.redirect('/otlistlast/' + adminUpdate2[0].employee_id);
                    });
                });
            });
        }
    } else {
        res.redirect('/');
    }

};
controller.offot_list = (req, res) => {
    if (req.session.admin || req.session.employee) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%d/%m/%Y") as otdo , DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde , ot.detail , ot.employee_id , ot.month , ot.status , ot.break_time , ot.statusot ,ofot.id as ofot , DATE_FORMAT(offset_time_source,"%d/%m/%Y :%T" ) as  ofs , DATE_FORMAT(offset_time_destination,"%d/%m/%Y :%T") as  ofd, ofot.ot_id ,  em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid  , sd.subdepartment , cp.id as cpid , cp.companyname  from ot as ot left JOIN  offset_time_ot as ofot ON ofot.ot_id =  ot.id left JOIN employee as em ON ot.employee_id = em.id  left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ? GROUP BY ot.id;', [id], (err, offotlist) => {
                conn.query('select DATE_FORMAT(now(), "%d/%m/%Y %T" ) as date;', (err, datenow) => {
                    if (err) {
                        res.json(err);
                    }

                    res.render('ot/offotList', {
                        data: offotlist,
                        data2: datenow,
                        session: req.session
                    });
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.offot_add = function (req, res) {
    const { id } = req.params;
    req.getConnection(function (err, conn) {
        conn.query("select ot.id as otid , DATE_FORMAT(dateot,'%d/%m/%Y') as otdo , DATE_FORMAT(datestart,'%d/%m/%Y :%T') as otds , DATE_FORMAT(dateend,'%d/%m/%Y :%T') as otde , ot.detail , ot.employee_id , ot.month , ot.status , ot.break_time  ,ofot.id as ofot , DATE_FORMAT(offset_time_source,'%d/%m/%Y :%T' ) as  ofs , DATE_FORMAT(offset_time_destination,'%d/%m/%Y :%T') as  ofd, ofot.ot_id ,  em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid  , sd.subdepartment , cp.id as cpid , cp.companyname  from ot as ot left JOIN  offset_time_ot as ofot ON ofot.ot_id =  ot.id left JOIN employee as em ON ot.employee_id = em.id  left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where ot.id = ? ", [id], function (err, offotadd) {
            conn.query('UPDATE ot SET statusot =  ?  WHERE id = ?', [2, id], (err, confirm_otUpdate) => {
                if (err) {
                    req.session.errors = errors;
                    req.session.success = false;
                    res.redirect('/ot/offset_time_ot_list/' + offotadd[0].employee_id)
                } else {
                    res.render("ot/offotAdd", {
                        data: offotadd[0],
                        session: req.session

                    });

                };
            });
        });
    });
};
controller.save_source_destination = (req, res) => {
    if (req.session.leaderinstallandmaid || req.session.leaderinstall || req.session.leaderma || req.session.leader || req.session.admin) {
        const { id } = req.params;
        const data = req.body;
        const errors = validationResult(req);

        req.getConnection((err, conn) => {
            if (!errors.isEmpty()) {
                req.session.errors = errors;
                req.session.success = false;
                req.getConnection(function (err, conn) {
                    conn.query("select ofot.id as ofot , ofot.offset_time_source , ofot.offset_time_destination , ofot.ot_id , ot.id as otid , ot.dateot , ot.datestart , ot.dateend , ot.detail , ot.employee_id , ot.month , ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id  from offset_time_ot as ofot left JOIN ot as ot ON ofot.ot_id = ot.id left JOIN employee as em ON ot.employee_id = em.id left JOIN sex as sx ON em.sex_id = sx.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id; ", function (err, otSave) {

                        if (err) {
                            req.session.errors = errors;
                            req.session.success = false;
                            res.redirect('/offset_time_ot_list/')
                        } else {
                            res.render("ot/otAdd", {
                                data: otSave,
                                session: req.session
                            });
                        };

                    });
                });
            } else {
                req.session.success = true;
                req.session.topic = "เพิ่มข้อมูลสำเร็จ";
                conn.query('INSERT INTO offset_time_ot (offset_time_source , offset_time_destination , ot_id) value (?,?,?)', [data.offset_time_source, data.offset_time_destination, data.ot_id], (err, employeeSave) => {
                    conn.query("select ofot.id as ofot , ofot.offset_time_source , ofot.offset_time_destination , ofot.ot_id , ot.id as otid , ot.dateot , ot.datestart , ot.dateend , ot.detail , ot.employee_id , ot.month , ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id  from offset_time_ot as ofot left JOIN ot as ot ON ofot.ot_id = ot.id left JOIN employee as em ON ot.employee_id = em.id left JOIN sex as sx ON em.sex_id = sx.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id ; ", [id], function (err, otSave) {
                        res.redirect('/ot/offset_time_ot_list/' + otSave[0].employee_id)
                    });
                });
            };

        });
    } else {
        res.redirect('/');
    }
};
controller.confirm_ot = (req, res) => {
    if (req.session.leaderinstallandmaid || req.session.leaderinstall || req.session.leaderma || req.session.leader || req.session.admin) {
        const { id } = req.params;
        const data = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            req.getConnection((err, conn) => {
                conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%Y/%m/%d") as otdo ,DATE_FORMAT(datestart,"%Y/%m/%d %T") as otds  , DATE_FORMAT(dateend,"%Y/%m/%d %T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ot.id = ?', [id], (err, confirm_otUpdate) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/otlist');
                });
            });
        } else {
            req.session.success = true;
            req.session.topic = "แก้ไขข้อมูลสำเร็จ";
            req.getConnection((err, conn) => {
                conn.query('UPDATE ot SET statusot =  ?  WHERE id = ?', [1, id], (err, confirm_otUpdate) => {
                    conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%Y/%m/%d") as otdo ,DATE_FORMAT(datestart,"%Y/%m/%d %T") as otds  , DATE_FORMAT(dateend,"%Y/%m/%d %T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id ', [id], (err, confirm_otUpdate) => {
                        if (err) {
                            res.json(err);
                        }
                        res.redirect('/ot/offset_time_ot_list/' + confirm_otUpdate[0].employee_id);
                    });
                });
            });
        }
    } else {
        res.redirect('/');
    }

};
controller.ottimeList = function (req, res) {
    if (req.session.admin || req.session.employee) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?; ', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/ottimeLIst', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otcompensateList = function (req, res) {
    if (req.session.admin || req.session.employee) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%d/%m/%Y") as otdo , DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde , ot.detail , ot.employee_id , ot.month , ot.status , ot.break_time , ot.statusot ,ofot.id as ofot , DATE_FORMAT(offset_time_source,"%d/%m/%Y :%T" ) as  ofs , DATE_FORMAT(offset_time_destination,"%d/%m/%Y :%T") as  ofd, ofot.ot_id ,  em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid  , sd.subdepartment , cp.id as cpid , cp.companyname  from ot as ot left JOIN  offset_time_ot as ofot ON ofot.ot_id =  ot.id left JOIN employee as em ON ot.employee_id = em.id  left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?; ', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otcompensateList', {
                    data: otLIst,
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
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id; ', [id], (err, otLIstAdmin) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otListAdmin', {
                    data: otLIstAdmin,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.listlastAdmin = function (req, res) {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id; ', [id], (err, otLIstAdmin) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otListlastAdmin', {
                    data: otLIstAdmin,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.listhistory_noAdmin = function (req, res) {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y %T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y %T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id  GROUP BY em.id ', [id], (err, otLIstAdmin) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_noAdmin', {
                    data: otLIstAdmin,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.listhistory_noAdminhistory = function (req, res) {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y %T") as otds  ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount , DATE_FORMAT(dateend,"%d/%m/%Y %T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id', [id], (err, otLIstAdmin) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_noAdminhistory', {
                    data: otLIstAdmin,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.listhistory_yesAdmin = function (req, res) {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id GROUP BY em.id ; ', [id], (err, otLIstAdmin) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_yesAdmin', {
                    data: otLIstAdmin,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.listhistory_yesAdminhistory = function (req, res) {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount, DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?; ', [id], (err, otLIstAdminhistory) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_yesAdminhistory', {
                    data: otLIstAdminhistory,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.listall = function (req, res) {
    if (req.session.leaderinstallandmaid || req.session.leaderinstall || req.session.leaderma || req.session.leader || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id; ', [id], (err, otLIstAdmin) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otListAll', {
                    data: otLIstAdmin,
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
            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ot.id = ?', [id], (err, otDel) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otDel', {
                    data: otDel[0],
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
            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ot.id = ?', [id], (err, otDel) => {
                conn.query('DELETE FROM ot  WHERE id = ?', [id], (err, otDelete) => {
                    if (err) {
                        const errorss = { errors: [{ value: '', msg: 'ไม่สามารถลบข้อมูลนี้ได้ ', param: '', location: '' }] }
                        req.session.errors = errorss;
                        req.session.success = false;
                    } else {
                        req.session.success = true;
                        req.session.topic = "ลบข้อมูลสำเร็จ";
                    };
                    res.redirect("/otlistadmin");
                });
            });
        });
    } else {
        res.redirect('/');
    }

};
controller.offot_listAdmin = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {

        conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%d/%m/%Y") as otdo , DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde , ot.detail , ot.employee_id , ot.month , ot.status , ot.break_time , ot.statusot ,ofot.id as ofot , DATE_FORMAT(offset_time_source,"%d/%m/%Y :%T" ) as  ofs , DATE_FORMAT(offset_time_destination,"%d/%m/%Y :%T") as  ofd, ofot.ot_id ,  em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid  , sd.subdepartment , cp.id as cpid , cp.companyname  from ot as ot left JOIN  offset_time_ot as ofot ON ofot.ot_id =  ot.id left JOIN employee as em ON ot.employee_id = em.id  left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id ', [id], (err, offotlist) => {
            if (err) {
                res.json(err);
            }

            res.render('ot/offListAll', {
                data: offotlist,
                session: req.session
            });
        });
    });
};
controller.offot_listAdminhome = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%d/%m/%Y") as otdo , DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde , ot.detail , ot.employee_id , ot.month , ot.status , ot.break_time , ot.statusot ,ofot.id as ofot , DATE_FORMAT(offset_time_source,"%d/%m/%Y :%T" ) as  ofs , DATE_FORMAT(offset_time_destination,"%d/%m/%Y :%T") as  ofd, ofot.ot_id ,  em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid  , sd.subdepartment , cp.id as cpid , cp.companyname  from ot as ot left JOIN  offset_time_ot as ofot ON ofot.ot_id =  ot.id left JOIN employee as em ON ot.employee_id = em.id  left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id ;', [id], (err, offotlist) => {
                conn.query('select DATE_FORMAT(now(), "%d/%m/%Y %T" ) as date;', (err, datenow) => {
                    if (err) {
                        res.json(err);
                    }

                    res.render('ot/offotListAdmin', {
                        data: offotlist,
                        data2: datenow,
                        session: req.session
                    });
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otcompensateListAdminhome = function (req, res) {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%d/%m/%Y") as otdo , DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde , ot.detail , ot.employee_id , ot.month , ot.status , ot.break_time , ot.statusot ,ofot.id as ofot , DATE_FORMAT(offset_time_source,"%d/%m/%Y :%T" ) as  ofs , DATE_FORMAT(offset_time_destination,"%d/%m/%Y :%T") as  ofd, ofot.ot_id ,  em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid  , sd.subdepartment , cp.id as cpid , cp.companyname  from ot as ot left JOIN  offset_time_ot as ofot ON ofot.ot_id =  ot.id left JOIN employee as em ON ot.employee_id = em.id  left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id GROUP BY em.id; ', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otcompensateListAdmin', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otcompensateListAdminhomeList = function (req, res) {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount, DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde , ot.detail , ot.employee_id , ot.month , ot.status , ot.break_time , ot.statusot ,ofot.id as ofot , DATE_FORMAT(offset_time_source,"%d/%m/%Y :%T" ) as  ofs , DATE_FORMAT(offset_time_destination,"%d/%m/%Y :%T") as  ofd, ofot.ot_id ,  em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid  , sd.subdepartment , cp.id as cpid , cp.companyname  from ot as ot left JOIN  offset_time_ot as ofot ON ofot.ot_id =  ot.id left JOIN employee as em ON ot.employee_id = em.id  left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id=? ', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otcompensateListAdminhistory', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.ottimeListAdmin = function (req, res) {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id GROUP BY em.id', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/ottimeLIstAdmin', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.ottimeListAdminhistory = function (req, res) {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/ottimeLIstAdminhistory', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.delotcompensateListadminhistory = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select ofot.id as ofot , ofot.offset_time_source , ofot.offset_time_destination , ofot.ot_id , ot.id as otid , DATE_FORMAT(dateot,"%d/%m/%Y") as otdo , DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde , ot.detail , ot.employee_id , ot.month , ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id  from offset_time_ot as ofot left JOIN ot as ot ON ofot.ot_id = ot.id left JOIN employee as em ON ot.employee_id = em.id left JOIN sex as sx ON em.sex_id = sx.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ofot.id = ?', [id], (err, otcompensateListadminhistoryDel) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otcompensateListadminhistoryDel', {
                    data: otcompensateListadminhistoryDel[0],
                    session: req.session

                });
            });
        });
    } else {
        res.redirect('/');
    }

};
controller.deletedelotcompensateListadminhistory = (req, res) => {
    if (req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('select ofot.id as ofot , ofot.offset_time_source , ofot.offset_time_destination , ofot.ot_id , ot.id as otid , ot.dateot , ot.datestart , ot.dateend , ot.detail , ot.employee_id , ot.month , ot.status , ot.break_time , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id  from offset_time_ot as ofot left JOIN ot as ot ON ofot.ot_id = ot.id left JOIN employee as em ON ot.employee_id = em.id left JOIN sex as sx ON em.sex_id = sx.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id WHERE ofot.id = ?', [id], (err, offDelete) => {
                conn.query('DELETE FROM offset_time_ot  WHERE id = ?', [id], (err, offDelete2) => {
                    if (err) {
                        const errorss = { errors: [{ value: '', msg: 'ไม่สามารถลบข้อมูลนี้ได้ ', param: '', location: '' }] }
                        req.session.errors = errorss;
                        req.session.success = false;
                    } else {
                        req.session.success = true;
                        req.session.topic = "ลบข้อมูลสำเร็จ";
                    };
                    res.redirect("/otlistadmin");;

                });
            });
        });
    } else {
        res.redirect('/');
    }

};
controller.otHistory_noleader = function (req, res) {
    if (req.session.leader || req.session.admin) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = ?  GROUP BY em.id; ', [department_id], (err, listleader) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_noleader', {
                    data: listleader,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_noleaderinstall = function (req, res) {
    if (req.session.leaderinstall || req.session.admin) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = 4 and em.subdepartment_id = 4  GROUP BY em.id; ', (err, listleaderinstall) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_noleaderinstall', {
                    data: listleaderinstall,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_noleaderleaderMa = function (req, res) {
    if (req.session.leaderma || req.session.admin) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = 4 and em.subdepartment_id = 5  GROUP BY em.id ; ', (err, listleaderMa) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_noleaderMa', {
                    data: listleaderMa,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_noleaderInstallAndMA = function (req, res) {
    if (req.session.leaderinstallandmaid || req.session.admin) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = 4 GROUP BY em.id ; ', (err, listleaderMa) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_noleaderInstallandMa', {
                    data: listleaderMa,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_noleaderhistory = function (req, res) {
    if (req.session.leader || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_noleaderhistory', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_noleaderinstallhistory = function (req, res) {
    if (req.session.leaderinstall || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo, DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_noleaderinstallhistory', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_noleaderleaderMahistory = function (req, res) {
    if (req.session.leaderma || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_noleaderMahistory', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_noleaderInstallAndMAhistory = function (req, res) {
    if (req.session.leaderinstallandmaid || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_noleaderInstallandMahistory', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_yesleader = function (req, res) {
    if (req.session.leader || req.session.admin) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = ?  GROUP BY em.id; ', [department_id], (err, listleader) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_yesleader', {
                    data: listleader,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_yesleaderinstall = function (req, res) {
    if (req.session.leaderinstall || req.session.admin) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = 4 and em.subdepartment_id = 4  GROUP BY em.id; ', (err, listleaderinstall) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_yesleaderinstall', {
                    data: listleaderinstall,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_yesleaderleaderMa = function (req, res) {
    if (req.session.leaderma || req.session.admin) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = 4 and em.subdepartment_id = 5  GROUP BY em.id ; ', (err, listleaderMa) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_yesleaderMa', {
                    data: listleaderMa,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_yesleaderInstallAndMA = function (req, res) {
    if (req.session.leaderinstallandmaid || req.session.admin) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid , DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id, ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = 4 GROUP BY em.id ; ', (err, listleaderMa) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_yesleaderinstallandMa', {
                    data: listleaderMa,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_yesleaderhistory = function (req, res) {
    if (req.session.leader || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_yesleaderhistory', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_yesleaderinstallhistory = function (req, res) {
    if (req.session.leaderinstall || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_yesleaderinstallhistory', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_yesleaderMahistory = function (req, res) {
    if (req.session.leaderma || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_yesleaderMahistory', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otHistory_yesleaderInstallAndMAhistory = function (req, res) {
    if (req.session.leaderinstallandmaid || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otHistory_yesleaderinstallandMahistory', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.ottimeListleader = function (req, res) {
    if (req.session.leader || req.session.admin) {
        const { department_id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id  = ? GROUP BY em.id', [department_id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/ottimeLIstleader', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.ottimeListleaderinstall = function (req, res) {
    if (req.session.leaderinstall || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = 4 and em.subdepartment_id = 4  GROUP BY em.id;', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/ottimeLIstleaderinstall', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.ottimeListleaderMa = function (req, res) {
    if (req.session.leaderma || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id  where em.department_id = 4 and em.subdepartment_id = 5  GROUP BY em.id ;', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/ottimeLIstleaderMa', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.ottimeListleaderInstallAndMA = function (req, res) {
    if (req.session.leaderinstallandmaid || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = 4 GROUP BY em.id ;', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/ottimeLIstleaderinstallandMa', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otcompensateListleader = function (req, res) {
    if (req.session.leader || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id  = ? GROUP BY em.id', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otcompensateListleader', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otcompensateListleaderinstall = function (req, res) {
    if (req.session.leaderinstall || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = 4 and em.subdepartment_id = 4  GROUP BY em.id;', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otcompensateListleaderinstall', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otcompensateListleaderMa = function (req, res) {
    if (req.session.leaderma || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id  where em.department_id = 4 and em.subdepartment_id = 5  GROUP BY em.id ;', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otcompensateListleaderMa', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otcompensateListInstallAndMA = function (req, res) {
    if (req.session.leaderinstallandmaid || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.department_id = 4 GROUP BY em.id ;', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otcompensateListleaderinstallandMa', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otcompensateListleaderhistory = function (req, res) {
    if (req.session.leader || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otcompensateListhistoryleader', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otcompensateListleaderinstallhistory = function (req, res) {
    if (req.session.leaderinstall || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otcompensateListhistoryleaderinstall', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otcompensateListleaderMahistory = function (req, res) {
    if (req.session.leaderma || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otcompensateListhistoryleaderMa', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.otcompensateListleaderinstallandMahistory = function (req, res) {
    if (req.session.leaderinstallandmaid || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/otcompensateListhistoryleaderinstallandMa', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.timeListleaderhistory = function (req, res) {
    if (req.session.leader || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/ottimeLIstleaderhistory', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.timeListleaderinstallhistory = function (req, res) {
    if (req.session.leaderinstall || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/ottimeLIstleaderinstallhistory', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.timeListleaderMahistory = function (req, res) {
    if (req.session.leaderma || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/ottimeLIstleaderMahistory', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
controller.timeListleaderinstallandMahistory = function (req, res) {
    if (req.session.leaderinstallandmaid || req.session.admin) {
        const { id } = req.params;
        req.getConnection((err, conn) => {

            conn.query('select ot.id as otid ,ot.statusot, DATE_FORMAT(dateot,"%W %d/%m/%Y") as otdo ,DATE_FORMAT(dateot,"%Y-%m-%d") as date,DATE_FORMAT(dateot,"%Y-%m") as mount,DATE_FORMAT(datestart,"%d/%m/%Y :%T") as otds  , DATE_FORMAT(dateend,"%d/%m/%Y :%T") as otde, ot.detail , ot.employee_id , ot.status , ot.break_time ,em.id as emid, em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id , em.company_id , de.id as deid , de.department , sx.id as sxid , sx.sex , sd.id as sdid , sd.subdepartment , sd.subdepartment , cp.id as cpid , cp.companyname from ot as ot left JOIN employee as em ON ot.employee_id = em.id left JOIN department as de ON em.department_id = de.id left JOIN sex as sx ON em.sex_id = sx.id  left JOIN subdepartment as sd ON em.subdepartment_id = sd.id left JOIN company as cp ON em.company_id = cp.id where em.id = ?', [id], (err, otLIst) => {
                if (err) {
                    res.json(err);
                }
                res.render('ot/ottimeLIstleaderinstallandMahistory', {
                    data: otLIst,
                    session: req.session
                });
            });
        });
    } else {
        res.redirect('/');
    }
};
module.exports = controller;