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

db.collection("students").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
    });
});

class App extends React.Component {

    title = (
        <Alert variant="info">
            <b>Work6 :</b> Firebase
        </Alert>
    );
    footer = (
        <div>
            By xxxxxxxxxx-x xxxxxxxxxxxxx xxxxxxxxxxxxxx <br />
            College of Computing, Khon Kaen University
        </div>
    );
    state = {
        scene: 0,
    }

    render() {
        return (
            <Card>
                <Card.Header>{this.title}</Card.Header>
                <Card.Body>
                    <Button onClick={() => this.readData()}>Read Data</Button>
                </Card.Body>
                <Card.Footer>{this.footer}</Card.Footer>
            </Card>
        );
    }
}


const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);