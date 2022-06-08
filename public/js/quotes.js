const quotes = [
    {
        quotes : "기도는 음악처럼 신성하고 구원이 된다. 기도는 신뢰이며 확인이다. 진정 기도하는 자는 원하지 않는다. 단지 자기의 경우와 고뇌를 말할 뿐이다.",
        author : "-헤르만 헤세"
    },
    {
        quotes : "큰 일에는 진지하게 대하지만 작은 일에는 손을 빼는 것이 당연하다고 생각하는 것, 몰락은 언제나 여기에서 시작된다.",
        author : "-헤르만 헤세"
    },
    {
        quotes : "행복하다는 것은 소망을 가지는 것을 말한다. ",
        author : "-헤르만 헤세"
    },
    {
        quotes : "다른 사람에게서 사랑을 바라는 생활은 위험하다. 그 사람이 스스로 충만 되어서 나에게서 떠난다고 해도 그 사람을 위해 기도드릴 각오 없이 사랑하는 것은 처음부터 잘못된 일이다.",
        author : "-헤르만 헤세"
    },
    {
        quotes : "모든 인간의 생활은 자기자신에의 길이며, 하나의 시도이다.",
        author : "-헤르만 헤세"
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
        quotes : "인간은 각자 모두 자신의 운명을 손에 쥐고 있다. 완전히 자신의 작품이며 자신의 것인 생활을 창조하지 않으면 안 된다.",
        author : "-헤르만 헤세"
    },
  
]

const quotesContainer = document.getElementById('quotes');
const desc = quotesContainer.querySelector('span:first-child'); 
const author = quotesContainer.querySelector('span:last-child'); 


const radomQuotes = quotes[Math.floor(Math.random() * quotes.length)];

desc.innerText = radomQuotes.quotes;
author.innerText = radomQuotes.author;