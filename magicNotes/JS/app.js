console.log('This is notes app');
showNotes(); // jo notes pehle se h unhe show kra dega

//If user adds a note , add it to the local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function () {
    let addTxt = document.getElementById("addTxt");
    let addTitleTxt = document.getElementById("addTitleTxt");
    let badge = document.getElementsByClassName("badge");
    let badgeForm = document.getElementById("badgeForm");
    let flag = 0;
    if ($('.badge').is(':checked')) flag = 1;
    let notes = localStorage.getItem("notes");
    if (notes == null)
        Wobj = [];
    else {
        Wobj = JSON.parse(notes); // ise notes ek object me convert ho jayga
    }
    // notesObj = [];
    // notesObj.push(addTitleTxt.value, addTxt.value); // isse txt ki value push ho jaygai
    notesObj = {
        Title: addTitleTxt.value,
        Note: addTxt.value,
        flag: `${flag}`
    };

    Wobj.push(notesObj);
    localStorage.setItem("notes", JSON.stringify(Wobj));
    addTitleTxt.value = "";
    addTxt.value = ""; // phirse aage ke liye khali krdo 
    // console.log(notesObj);
    // badge.checked = flase;
    badgeForm.reset();
    showNotes();
});


// Fnction ShowNotes is here 
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        Wobj = [];
    }
    else {
        Wobj = JSON.parse(notes); // parse kraya kyunki local storage mein string mein store hote h aur hame iterate krane ke liye object chahiye
    }
    // <p class="card-text">${element}</p>
    // ek html obj banaya ohir insert krdenge use
    let html = "";
    Wobj.forEach(function (element, index) {
        if (element["flag"] == 1) {
            console.log("guuu");
            html += `<div class=" shadow p-3 mb-5 bg-white rounded noteCard card mx-2 my-2" style="width: 18rem;">
            <div class="card-body">
                <p style="color:blue;" class="card-text"><b>${element.Title}</b>
                <span class="mx-3 badge badge-success">imp</span></p>
                <h5 class="card-title">Note ${index + 1}
                 </h5>
                <p class="card-text">${element.Note}</p>
                <button id="${index}"onclick="confirmDelete(this.id)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Delete Note</button>  
            </div>
            </div> `;
        }
        else {
            html += `<div class="shadow p-3 mb-5 bg-white rounded noteCard card mx-2 my-2" style="width: 18rem;">
            <div class="card-body">
                <p style="color:blue;" class="card-text"><b>${element.Title}</b></p>
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text">${element.Note}</p>
                <button id="${index}"onclick="confirmDelete(this.id)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Delete Note</button>  

            </div>
            </div> `;
        }

        // note that we have send index in button to deleteNote function
    });

    let notesElm = document.getElementById("notes"); // notes ID wala div le liye hamne yaha 
    if (Wobj.length != 0) {
        notesElm.innerHTML = html; // ab agar kuch notes h to unhe us div me push kr denge
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}



function confirmDelete(sendID) {
    let yes = document.getElementById('yes');
    // let no = document.getElementById('no');
    yes.addEventListener('click', () => {
        deleteNote(sendID);
    });
}
//Function to delete a node
function deleteNote(index) {
    // console.log(`i'am deleting the node`,index);


    let notes = localStorage.getItem("notes");
    if (notes == null) {
        Wobj = [];
    }
    else {
        Wobj = JSON.parse(notes);
    }
    // The splice() method adds/removes items to/from an array, and returns the removed item(s). Note: This method changes the original array
    Wobj.splice(index, 1); // splice function ki madad se delete kraya 
    console.log(Wobj);
    localStorage.setItem("notes", JSON.stringify(Wobj)); // phir naye notesObj ko daal diya usnme
    showNotes();
    // same key name mein write kroge to overwrite ho jayga
}


// Search Query Lagayi 
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () { // input event mtlb kuch bhi type krunga to input event fire hoga

    let inputVal = search.value.toLowerCase();
    console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');// note card namak class wale sare elelment a jaygnge isme
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText; //doubt
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        console.log(cardTxt);
    })
})

// HomeWork

// /*
// Further Features:
// 1. Add Title
// 2. Mark a note as Important
// 3. Separate notes by user
// 4. Sync and host to web server 
// */ 