const quotes = [
    {
        quotes : "나의 인생을 사랑하자",
        author : "-Carpe Diem"
    },
    {
        quotes : "사랑을 품을 때 삶은 진정한 의미를 되찾는다.",
        author : "-세르반테스"
    },
    {
        quotes : "행복하다는 것은 소망을 가지는 것을 말한다. ",
        author : "-헤르만 헤세"
    },
    {
        quotes : "중요한 것은 사랑을 받는 것이 아니라 사랑을 하는 것이다.",
        author : "-서머셋"
    },
    {
        quotes : "연애할 운명에 놓인 사람은 누구든 한눈에 사랑하게 된다.",
        author : "-셰익스피어"
    },
    {
        quotes : "사랑이란 슬픔 속에서도 의연하게 이해하고 미소지을 수 있는 능력을 말한다.",
        author : "-헤르만 헤세"
    },
    {
        quotes : "세상에는 단 하나의 마술, 단 하나의 힘, 단 하나의 행복이 있을 뿐이고, 그것은 사랑이라고 불리는 것이다.",
        author : "-헤르만 헤세"
    },
    {
        quotes : "우리가 사람을 미워하는 경우 그것은 단지 그의 모습을 빌려서 자신의 속에 있는 무엇인가를 미워하는 것이다. 자신의 속에 없는 것은 절대로 자기를 흥분시키지 않는다. ",
        author : "-헤르만 헤세"
    },
    {
        quotes : "지혜로운 자는 사랑하고, 그렇지 않은 자들은 탐한다.",
        author : "-아프라니우스"
    },
  
]

const quotesContainer = document.getElementById('quotes');
const desc = quotesContainer.querySelector('span:first-child'); 
const author = quotesContainer.querySelector('span:last-child'); 


const radomQuotes = quotes[Math.floor(Math.random() * quotes.length)];

desc.innerText = radomQuotes.quotes;
author.innerText = radomQuotes.author;