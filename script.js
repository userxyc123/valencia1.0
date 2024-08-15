document.getElementById('send-btn').addEventListener('click', chatBot);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        chatBot();
    }
});

async function loadKnowledgeBase() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/userxyc123/knowledge_base/main/knowledge_base.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Knowledge base loaded:', data); // Debugging line
        return data;
    } catch (error) {
        console.error('Error loading knowledge base:', error);
        return null;
    }
}

function findBestMatch(userQuestion, questions) {
    const matches = getCloseMatches(userQuestion, questions, 1, 0.4);
    console.log('Matches found:', matches); // Debugging line
    return matches[0] ? matches[0] : null;
}

function getCloseMatches(word, possibilities, n, cutoff) {
    function similarity(s1, s2) {
        const m = s1.length;
        const n = s2.length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (s1[i - 1] === s2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        const longestCommonSubsequenceLength = dp[m][n];
        const normalizedLCS = longestCommonSubsequenceLength / Math.max(m, n);
        return normalizedLCS;
    }

    const matches = possibilities
        .map(possibility => ({ word: possibility, similarity: similarity(word, possibility) }))
        .filter(item => item.similarity >= cutoff)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, n)
        .map(item => item.word);

    return matches;
}

function getAnswerForQuestion(question, knowledgeBase) {
    for (let q of knowledgeBase.questions) {
        if (q.question === question) {
            return q.answer;
        }
    }
    return null;
}

function getFeelingForQuestion(question, knowledgeBase) {
    for (let q of knowledgeBase.questions) {
        if (q.question === question) {
            return q.feeling;
        }
    }
    return null;
}

function displayGIF(feeling) {
    const gifContainer = document.getElementById('gif-container');
    if (feeling === 'good') {
        gifContainer.innerHTML = `
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG85ZGRtM2VjaG44MDdsczl0dzhpeGhqeG0zd3ZxZ2dldTV2bDYyeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FRg4tmAquWDQdp67w9/giphy.gif" width="560" height="315" alt="Good Feeling GIF">
        `;
    }
    else if (feeling === 'great') {
      gifContainer.innerHTML = `
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXd5MW1obnZzYmUyb3hmNndvNWVheGdpbDRzNnluZ2ppYnM2NjNwciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yOcvqq6OfxGcRMW4up/giphy.gif" width="560" height="315" alt="Good Feeling GIF">
         `;
    } else if (feeling === 'bad') {
        gifContainer.innerHTML = `
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3NpemJsdTM3eDg4NnUyczlodGxneDBwd2F1MG14ZHR1YWIxbzJrdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UgddKA7adnI1vF3res/giphy.gif" width="560" height="315" alt="Bad Feeling GIF">
        `;
    } else if (feeling === 'terrible') {
        gifContainer.innerHTML = `
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWw4bWN4OGFlZDVucnZuMGhlbG9seXVoajR4ZDRzM2g0dDloY2JjcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NjK1QhzloDBfolcZxz/giphy.gif" width="560" height="315" alt="Bad Feeling GIF">
        `;
    } else { // sorry feeling
        gifContainer.innerHTML = `
            <img src="https://media.giphy.com/media/jrPChMzFupA2x9d2oD/giphy.gif" width="560" height="315" alt="Bad Feeling GIF">
        `;
    }
}

async function chatBot() {
    const userInputElement = document.getElementById('user-input');
    const userInput = userInputElement.value.trim();
    if (userInput === '') return;

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div class="message user">${userInput}</div>`;
    userInputElement.value = '';

    const knowledgeBase = await loadKnowledgeBase();
    if (!knowledgeBase) {
        chatBox.innerHTML += `<div class="message bot">Error loading knowledge base. Please try again later.</div>`;
        return;
    }

    const bestMatch = findBestMatch(userInput, knowledgeBase.questions.map(q => q.question));
    console.log('Best match:', bestMatch); // Debugging line

    if (bestMatch) {
        const answer = getAnswerForQuestion(bestMatch, knowledgeBase);
        const feeling = getFeelingForQuestion(bestMatch, knowledgeBase);
        if (answer) {
            chatBox.innerHTML += `<div class="message bot">${answer}</div>`;
        }
        if (feeling) {
            chatBox.innerHTML += `<div class="message bot">${feeling}</div>`;
            displayGIF(feeling); // Display GIF based on feeling
        }
    } else {
        chatBox.innerHTML += `<div class="message bot">I don't know the answer</div>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
