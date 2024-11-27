const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});
let data;
let message = "Sorry this Word could not be found";
const getWordInfo = async (word) => {
    try{
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);


     data = await response.json();

    let definitions = data[0].meanings[0].definitions[0]
    resultDiv.innerHTML =
        `<h2><strong>Word: </strong>${data[0].word}</h2>
        <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>

        <p><strong>Meaning : </strong>${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>

         <p><strong>example : </strong>${definitions.example === undefined ? "Not Found" : definitions.example}</p>
         <p><strong>Antonyms</strong></p>  
         `;
         
    //fetching Antonyms
    if (definitions.antonyms.length === 0) {
        resultDiv.innerHTML += `<span> Not Found </span>`

    }
    else {
        for (let i = 0; i < definitions.antonyms.length; i++) {
            resultDiv.innerHTML +=
                `<li>${definitions.antonyms[i]}</li>`
        }
    }

         resultDiv.innerHTML +=` <p><strong>Synonyms:</strong></p> `

    if (definitions.synonyms.length === 0) {
        resultDiv.innerHTML += `<span> Not Found </span>`    
    }
    else {
        for (let i = 0; i < definitions.synonyms.length; i++) {
            resultDiv.innerHTML +=
            `<li>${definitions.synonyms[i]}</li>`
        }
    }


   resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;


}catch(err){
    resultDiv.innerHtml = `${data.Title}`;
}
    console.log(data);
}