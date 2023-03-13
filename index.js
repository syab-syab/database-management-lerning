const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const port = 8000;

// データベース接続

const pool = require('./db/pool')

let datas;

const sendSql = (sql) => {
  pool.query(sql, (err, result) => {
    if (err) throw err;
    datas = result.rows
  })
}

sendSql('SELECT * FROM country')

// データベース接続・end


let title = "Top Page";


app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// insertとdeleteの後にtopページにアクセスすると反映されない問題を解決したい
// あと初回アクセス等で一度エラーになった後リロードするとちゃんと表示されるのが謎
app.get("/", (req, res) => {
  sendSql('SELECT * FROM country');
  res.render("top", { pageTitle: title, datas: datas });
});

app.post("/", (req, res) => {
  const countryName = req.body.country;
  const sql = `INSERT INTO country(name) VALUES ('${countryName}')`
  pool.query(sql)
  sendSql('SELECT * FROM country');
  res.render("temporary", { isComp: true });
})

app.get("/delete/:id", (req, res) => {
  res.render("temporary", { isComp: false })
  const sql = `DELETE FROM country WHERE id = ${req.params.id}`;
  pool.query(sql);
  sendSql('SELECT * FROM country')
})


app.get("/data/:id", (req, res) => {
  const data = datas.find(e => e.id === parseInt(req.params.id));
  res.json(data);
})

app.get('/database', (req, res) => {
  res.json(datas);
});



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});