const controller = {};
const { validationResult } = require('express-validator');


controller.list = function (req, res) {
    req.getConnection((err, conn) => {
        conn.query('select * from employee', (err, evaluatecolleaguesList) => {
            if (err) {
                res.json(err);
            }
            res.render('evaluateColleagues/evaluateColleaguesList', {
                data: evaluatecolleaguesList,
                session: req.session
            });
        });
    });
};

controller.record = function (req, res) {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id , em.username , em.lastname , em.usertype , em.sex_id , em.subdepartment_id , d.id as did , d.department , s.id as sid , s.sex , sd.id as sdid , sd.id as sdid , sd.subdepartment , ev.id as evid , ev.name , ev.employee_id as evem , ev.section from employee as em left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN subdepartment as sd ON em.subdepartment_id = s.id left JOIN evaluatecolleagues as ev ON em.id = ev.employee_id  where em.id = ?', [id], (err, employeeList) => {
            if (err) {
                res.json(err);
            }
            res.render('evaluateColleagues/evaluateColleaguesRecord', {
                data: employeeList,
                session: req.session
            });
        });
    });
};


controller.edit = (req, res) => {
    if ( req.session.admin) {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select ev.id as evid ,ev.name, ev.employee_id as evem , em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id as emd , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id, d.id as did , d.department , s.id as sid , s.sex , sd.id as sdid , sd.subdepartment , sd.department_id as sdd from evaluatecolleagues as ev left JOIN employee as em ON ev.employee_id = em.id left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id WHERE ev.id = ? ', [id], (err, evList) => {


            if (err) {
                res.json(err);
            }
            res.render('evaluateColleagues/evaluateColleaguesEdit', {
                data: evList[0],
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
    console.log(data);
    const dataform = [data.name[0]+","+data.name[1]+","+data.name[2]+","+data.name[3]+","+data.name[4]+","+data.name[5]+","+data.name[6]+","+data.name[7]+","+data.name[8]+","+data.name[9]+","+data.name[10]+","+data.name[11]+","+data.name[12]+","+data.name[13]+","+data.name[14]];
    const datasection = [data.section[0]+":"+data.section[1]+":"+data.section[2]+":"+data.section[3]+":"+data.section[4]+":"+data.section[5]+":"+data.section[6]+":"+data.section[7]+":"+data.section[8]+":"+data.section[9]+":"+data.section[10]+":"+data.section[11]+":"+data.section[12]+":"+data.section[13]+":"+data.section[14]];

    console.log(dataform);
    console.log(datasection);


    const errors = validationResult(req);
    console.log(data);
    if (!errors.isEmpty()) {
        req.session.errors = errors;
        req.session.success = false;
        req.getConnection((err, conn) => {
            conn.query('select ev.id as evid ,ev.name, ev.employee_id as evem , em.id as emid , em.firstname , em.lastname , em.nickname , em.position , em.department_id as emd , em.username , em.password , em.usertype , em.sex_id , em.subdepartment_id, d.id as did , d.department , s.id as sid , s.sex , sd.id as sdid , sd.subdepartment , sd.department_id as sdd from evaluatecolleagues as ev left JOIN employee as em ON ev.employee_id = em.id left JOIN department as d ON em.department_id = d.id left JOIN sex as s ON em.sex_id = s.id left JOIN subdepartment as sd ON em.subdepartment_id = sd.id WHERE ev.id = ?', [id], (err, hrvSave) => {
                if (err) {
                    res.json(err);
                    console.log(err);
                }
                res.render('evaluateColleagues/evaluateColleaguesEdit', {
                    data: hrvSave[0],
                    session: req.session
                });
            });
        });
    } else {
        req.session.success = true;
        req.session.topic = "แก้ไขข้อมูลสำเร็จ";
        req.getConnection((err, conn) => {
            conn.query('UPDATE evaluatecolleagues SET name = ?   WHERE id = ?', [dataform, id], (err, hrvSave) => {
                if (err) {
                    res.json(err);
                }
                res.redirect('/employeelist');
                console.log(hrvSave);
                console.log(err);
            });
        });
    }
      } else {
          res.redirect('/');
      }

};
module.exports = controller;