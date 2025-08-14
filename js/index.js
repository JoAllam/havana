document.addEventListener('DOMContentLoaded', async() => {
    let creators = document.querySelectorAll('.name');
    let creatorsImg = document.querySelectorAll('.pfp');
    let url = 'https://randomuser.me/api/';
    let number = Math.max(creators.length, creatorsImg.length);
    url += `?results=${number}`
    let data = await fetch(url);
    data = await data.json();
    console.log(data);
    let index = 0;
    creators.forEach((creator) => {
        creator.textContent += `${data.results[index].name.first} ${data.results[index].name.last}`;
        index++;
    })
    index = 0;
    creatorsImg.forEach((img) => {
        img.setAttribute('src', data.results[index].picture.large);
        index++;
    })
})