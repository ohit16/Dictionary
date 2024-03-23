
let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let inp = document.getElementById("word");
let btn = document.getElementById("search");
let box = document.getElementById("inner");


inp.addEventListener("keypress", async (event) => {
    try {
        if (event.key == "Enter") {
            await getword();
            box.style.border = "2px dotted black";
            inp.value = "";
        }
    } catch (err) {
        alert("we couldn't find definitions for the word you were looking for.");
    }
});

async function getword() {
    let word = inp.value;
    let res = await axios.get(url + word);
    let datas = res.data;
    await showAntonyms(datas);
}

//Antonymas
let antoheading = document.getElementById("antoheading");
let antoul = document.getElementById("antolist");

async function showAntonyms(datas) {
    antoul.innerText = "";
    antoheading.innerText = "Antonyms"

    for (data of datas) {
        let lists = document.createElement("li");
        antoul.appendChild(lists);

        let antonyms = data.meanings[0].antonyms;

        for (anto of antonyms) {
            let list = document.createElement("li");
            lists.appendChild(list);
            list.innerText = anto
        }
    }
    await showSynonyms(datas);
}
//Synonyms
let synoheading = document.getElementById("synoheading");
let synoul = document.getElementById("synolist");

async function showSynonyms(datas) {
    synoul.innerText = "";
    synoheading.innerText = "Synonyms"

    for (data of datas) {
        let lists = document.createElement("li");
        synoul.appendChild(lists);

        let synonyms = data.meanings[0].synonyms;

        for (syno of synonyms) {
            let list = document.createElement("li");
            lists.appendChild(list);
            list.innerText = syno
        }
    }
    await partOfSpeech(datas)
}

//  Part Of Speech 
let ul = document.getElementById("partOfSpeech");
let heading = document.getElementById("heading");

async function partOfSpeech(datas) {
    ul.innerText = "";
    heading.innerText = "Part Of Speech";

    for (data of datas) {
        let list = document.createElement("li");
        ul.appendChild(list);

        list.innerText = data.meanings[0].
            partOfSpeech;

    }

    audios(datas);
}
//Audio
let myaudio = document.getElementById("myAudio");

function audios(datas) {
    myaudio.classList.remove("hide")
    try {
        let sound = datas[0].phonetics[0].audio;
        myaudio.src = sound;
    } catch (err) {
        alert("no Audio!")
        
    }
}
 



