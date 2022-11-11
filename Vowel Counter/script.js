const vowels = ['a', 'e', 'i', 'o', 'u']

const outEl = document.getElementById('out');
const formEl = document.getElementById('form');

let vowelCount = 0; 
function updateVowelsCount(text) {
    vowels.forEach(vowel => {
        const replace = `[^${vowel}]`
        const regex = new RegExp(replace, "g");
        vowelCount += text.replace(regex, "").length 
    });

    outEl.textContent = vowelCount;
    vowelCount = 0; 
}

formEl.addEventListener('input', (e) => {
    const text = e.target.value;
    updateVowelsCount(text);
}); 
