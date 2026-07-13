import {
    db
} from "./firebase.js";
import {
    setVirtualSeconds,
    setRunning,
    setClientMode
} from "./clock.js";
import {
    doc,
    setDoc,
    getDoc,
    deleteDoc,
    updateDoc,
    serverTimestamp,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
const joinButton =
    document.getElementById("joinButton");

const hostButton =
    document.getElementById("hostButton");

const roomCode =
    document.getElementById("roomCode");

const roomPassword =
    document.getElementById("roomPassword");
let isHost = false;

hostButton.onclick = async function () {

    if (roomPassword.value.trim() === "") {

    alert("パスワードを入力してください。");

    return;

}
    // 5桁の部屋番号を生成
    const code =
        String(
            Math.floor(
                10000 + Math.random() * 90000
            )
        );

    roomCode.value = code;

    // Firestoreへ保存
    await setDoc(

        doc(
            db,
            "rooms",
            code
        ),

        {

            password:
                roomPassword.value,

            running:
                false,

            speed:
                60,

            virtualSeconds:
                4 * 3600,

            createdAt:
                Date.now()

        }

    );

    isHost = true;

joinButton.textContent = "部屋を終了";

roomCode.readOnly = true;
roomPassword.readOnly = true;


    alert(
        "部屋 " +
        code +
        " を作成しました！"
    );

};
joinButton.onclick = async function () {

    if (isHost) {

        await deleteDoc(

            doc(
                db,
                "rooms",
                roomCode.value
            )

        );

        isHost = false;
setClientMode(false);
        joinButton.textContent = "参加";

        roomCode.readOnly = false;
        roomPassword.readOnly = false;

        roomCode.value = "";
        roomPassword.value = "";

        alert("部屋を終了しました。");

        return;

    }

    const room =
        roomCode.value.trim();

    const password =
        roomPassword.value;

    const roomRef =
        doc(
            db,
            "rooms",
            room
        );

    const roomSnap =
        await getDoc(roomRef);

    if (!roomSnap.exists()) {

        alert("部屋が存在しません。");

        return;

    }

    const data =
        roomSnap.data();

    if (data.password !== password) {

        alert("パスワードが違います。");

        return;

    }
    setClientMode(true);
    
    alert("参加しました！");
onSnapshot(
    roomRef,
    function (snapshot) {

        const data =
    snapshot.data();

setVirtualSeconds(
    data.virtualSeconds
);

setRunning(
    data.running
);

console.log(
    "同期しました"
);

    }
);
};

document.addEventListener(

    "clockTick",

    async function (event) {

        if (!isHost) {

            return;

        }

        await updateDoc(

            doc(
                db,
                "rooms",
                roomCode.value
            ),

            {

                running:
                    event.detail.running,

                virtualSeconds:
                    event.detail.virtualSeconds,

                speed:
                    event.detail.speed,

                updatedAt:
                    serverTimestamp()

            }

        );

    }

);