const RB = ReactBootstrap;
const { Alert, Card, Button, Table } = ReactBootstrap;

const firebaseConfig = {
    apiKey: "AIzaSyAKh5oTxEpZqBIyiEHpoFrZkyIIHYu-Zzs",
    authDomain: "web2566-3666e.firebaseapp.com",
    projectId: "web2566-3666e",
    storageBucket: "web2566-3666e.appspot.com",
    messagingSenderId: "64257554198",
    appId: "1:64257554198:web:b3b00497f884aee38b4237",
    measurementId: "G-RTCF36DSFG"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// db.collection("students").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} =>`, doc.data());
//     });
// });

class App extends React.Component {

    title = (
        <Alert variant="info">
            <b>Work6 :</b> Firebase
        </Alert>
    );
    footer = (
        <div>
            By 643020422-2 สุวินัย แสงแก้ว <br />
            College of Computing, Khon Kaen University
        </div>
    );
    state = {
        scene: 0,
        students: [],
        stdid: "",
        stdtitle: "",
        stdfname: "",
        stdlname: "",
        stdemail: "",
        stdphone: "",
        showMessage: false,
    }

    readData() {
        db.collection("students").get().then((querySnapshot) => {
            var stdlist = [];
            querySnapshot.forEach((doc) => {
                stdlist.push({ id: doc.id, ...doc.data() });
            });
            console.log(stdlist);
            this.setState({ students: stdlist });
        });
    }

    autoRead() {
        db.collection("students").onSnapshot((querySnapshot) => {
            var stdlist = [];
            querySnapshot.forEach((doc) => {
                stdlist.push({ id: doc.id, ...doc.data() });
            });
            this.setState({ students: stdlist });
        });
    }

    insertData() {
        db.collection("students").doc(this.state.stdid).set({
            title: this.state.stdtitle,
            fname: this.state.stdfname,
            lname: this.state.stdlname,
            phone: this.state.stdphone,
            email: this.state.stdemail,
        });

        this.setState({
            stdid: "",
            stdtitle: "",
            stdfname: "",
            stdlname: "",
            stdemail: "",
            stdphone: "",
            showMessage: true,
        });

        setTimeout(() => {
            this.setState({
                showMessage: false,
            });
        }, 3000);
    }

    edit(std) {
        this.setState({
            stdid: std.id,
            stdtitle: std.title,
            stdfname: std.fname,
            stdlname: std.lname,
            stdemail: std.email,
            stdphone: std.phone,
        })
    }

    delete(std) {
        if (confirm("ต้องการลบข้อมูล")) {
            db.collection("students").doc(std.id).delete();
        }
    }

    render() {
        // var stext = JSON.stringify(this.state.students);  
        return (
            <Card>
                <Card.Header>{this.title}</Card.Header>
                <Card.Body>
                    <Button onClick={() => this.readData()}>Read Data</Button>
                    <Button onClick={() => this.autoRead()}>Auto Read</Button>
                    <div>
                        <StudentTable data={this.state.students} app={this} />
                    </div>
                </Card.Body>
                <Card.Footer>
                    <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</b><br />
                    <TextInput label="ID" app={this} value="stdid" style={{ width: 120 }} />
                    <TextInput label="คำนำหน้า" app={this} value="stdtitle" style={{ width: 100 }} />
                    <TextInput label="ชื่อ" app={this} value="stdfname" style={{ width: 120 }} />
                    <TextInput label="สกุล" app={this} value="stdlname" style={{ width: 120 }} />
                    <TextInput label="Email" app={this} value="stdemail" style={{ width: 150 }} />
                    <TextInput label="Phone" app={this} value="stdphone" style={{ width: 120 }} />
                    <Button onClick={() => this.insertData()}>Save</Button>
                    
                    {/* แสดงข้อความเมื่อ showMessage เป็น true */}
                    {this.state.showMessage && <Alert variant="success">บันทึกสำเร็จ!</Alert>}
                </Card.Footer>
                <Card.Footer>{this.footer}</Card.Footer>
            </Card>
        );
    }
}

function StudentTable({ data, app }) {
    var rows = [];
    for (var s of data) {
        rows.push(
            <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.title}</td>
                <td>{s.fname}</td>
                <td>{s.lname}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td><EditButton std={s} app={app} /></td>
                <td><DeleteButton std={s} app={app} /></td>
            </tr>
        );
    }
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>รหัส</th>
                    <th>คำนำหน้า</th>
                    <th>ชื่อ</th>
                    <th>สกุล</th>
                    <th>email</th>
                    <th>เบอร์โทร</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

function TextInput({ label, app, value, style }) {
    return <label className="form-label">
        {label}:
        <input className="form-control" style={style}
            value={app.state[value]} onChange={(ev) => {
                var s = {};
                s[value] = ev.target.value;
                app.setState(s)
            }
            }></input>
    </label>;
}

function EditButton({ std, app }) {
    return <button onClick={() => app.edit(std)}>แก้ไข</button>
}
function DeleteButton({ std, app }) {
    return <button onClick={() => app.delete(std)}>ลบ</button>
}


const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);