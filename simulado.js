// Dados dos flashcards para simulado
let flashcardsData = [];
let selectedQuestions = [];

// Estado do simulado
let currentQuestionIndex = 0;
let simuladoStartTime = null;
let simuladoTimer = null;
let simuladoTimeLimit = 30 * 60; // 30 minutos em segundos
let simuladoTimeRemaining = simuladoTimeLimit;
let simuladoFinished = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadFlashcardsData();
    initializeSimulado();
});

async function loadFlashcardsData() {
    // Carregar dados do banco de dados local
    try {
        const response = await fetch('database.json');
        if (response.ok) {
            const data = await response.json();
            flashcardsData = data.cards || [];
        } else {
            // Dados de fallback
            flashcardsData = generateFallbackData();
        }
    } catch (error) {
        console.log('Usando dados de fallback');
        flashcardsData = generateFallbackData();
    }
    
    // Selecionar 20 questões aleatórias
    selectRandomQuestions();
}

function generateFallbackData() {
    const fallbackData = [];
    for (let i = 1; i <= 94; i++) {
        fallbackData.push({
            id: i,
            question: `Nomeie o vaso numerado como ${Math.floor(Math.random() * 8) + 1}`,
            image: `images/card_${i}.jpg`,
            answer: `Vaso sanguíneo ${i}`
        });
    }
    return fallbackData;
}

function selectRandomQuestions() {
    // Embaralhar todas as questões
    const shuffled = [...flashcardsData];
    shuffleArray(shuffled);
    
    // Selecionar apenas 20 questões
    selectedQuestions = shuffled.slice(0, 20);
    
    // Atualizar total de questões na interface
    document.getElementById('totalQuestions').textContent = selectedQuestions.length;
}

function initializeSimulado() {
    simuladoStartTime = new Date();
    simuladoTimeRemaining = simuladoTimeLimit;
    currentQuestionIndex = 0;
    simuladoFinished = false;
    
    startSimuladoTimer();
    showQuestion();
    
    // Event listener para Enter
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !simuladoFinished) {
            nextQuestion();
        }
    });
}

function showQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length) {
        finishSimulado();
        return;
    }
    
    const question = selectedQuestions[currentQuestionIndex];
    
    document.getElementById('questionImage').src = question.image;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    
    // Mostrar botão finalizar na última questão
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');
    
    if (currentQuestionIndex === selectedQuestions.length - 1) {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        finishBtn.style.display = 'none';
    }
    
    // Adicionar efeito de transição
    const questionContainer = document.querySelector('.question-container');
    questionContainer.style.opacity = '0';
    setTimeout(() => {
        questionContainer.style.opacity = '1';
    }, 100);
}

function nextQuestion() {
    if (simuladoFinished) return;
    
    currentQuestionIndex++;
    showQuestion();
}

function startSimuladoTimer() {
    simuladoTimer = setInterval(() => {
        simuladoTimeRemaining--;
        updateTimerDisplay();
        
        if (simuladoTimeRemaining <= 0) {
            finishSimulado();
        }
    }, 1000);
}

function stopSimuladoTimer() {
    if (simuladoTimer) {
        clearInterval(simuladoTimer);
        simuladoTimer = null;
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(simuladoTimeRemaining / 60);
    const seconds = simuladoTimeRemaining % 60;
    const timerElement = document.getElementById('simuladoTimer');
    
    if (timerElement) {
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Mudar cor quando restam poucos minutos
        if (simuladoTimeRemaining <= 300) { // 5 minutos
            timerElement.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
        }
        
        // Piscar quando restam 30 segundos
        if (simuladoTimeRemaining <= 30) {
            timerElement.style.animation = 'blink 1s infinite';
        }
    }
}

function finishSimulado() {
    simuladoFinished = true;
    stopSimuladoTimer();
    
    // Redirecionar para página de resultados com as questões e respostas
    showResults();
}

function showResults() {
    // Esconder container do simulado
    document.querySelector('.simulado-header').style.display = 'none';
    document.querySelector('.question-container').style.display = 'none';
    
    // Criar container de resultados
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'results-container';
    resultsContainer.innerHTML = `
        <div class="results-header">
            <h2>Simulado Finalizado!</h2>
            <p class="results-message">Confira as questões e suas respectivas respostas abaixo:</p>
            <div class="timer-stopped">
                <span class="timer-label">Cronômetro parado:</span>
                <span class="timer-final" id="finalTimer">${document.getElementById('simuladoTimer').textContent}</span>
            </div>
        </div>
        
        <div class="questions-review">
            <h3>Revisão das Questões</h3>
            <div id="questionsReviewList"></div>
        </div>
        
        <div class="results-actions">
            <button class="btn btn-primary" onclick="restartSimulado()">Novo Simulado</button>
            <button class="btn btn-secondary" onclick="goHome()">Voltar ao Início</button>
        </div>
    `;
    
    document.querySelector('.container').appendChild(resultsContainer);
    
    // Mostrar todas as questões com respostas
    showQuestionsReview();
}

function showQuestionsReview() {
    const reviewList = document.getElementById('questionsReviewList');
    
    selectedQuestions.forEach((question, index) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-review-item';
        questionItem.innerHTML = `
            <div class="question-number">Questão ${index + 1}</div>
            <div class="question-content">
                <div class="question-image-small">
                    <img src="${question.image}" alt="Questão ${index + 1}">
                </div>
                <div class="question-details">
                    <div class="question-text-review">${question.question}</div>
                    <div class="question-answer">
                        <strong>Resposta:</strong> ${question.answer}
                    </div>
                </div>
            </div>
        `;
        reviewList.appendChild(questionItem);
    });
}

function restartSimulado() {
    // Recarregar a página para reiniciar
    window.location.reload();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function goHome() {
    // Confirmar se deseja sair apenas se o simulado estiver em andamento
    if (!simuladoFinished && simuladoTimer) {
        if (confirm('Tem certeza que deseja sair do simulado? Seu progresso será perdido.')) {
            stopSimuladoTimer();
            window.location.href = 'index.html';
        }
    } else {
        window.location.href = 'index.html';
    }
}

// Adicionar CSS para animação de piscar
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0.5; }
    }
    
    .results-container {
        margin-top: 20px;
    }
    
    .results-header {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 15px;
        padding: 30px;
        text-align: center;
        margin-bottom: 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
    }
    
    .results-header h2 {
        color: #27ae60;
        font-size: 2rem;
        margin-bottom: 15px;
    }
    
    .results-message {
        color: #7f8c8d;
        font-size: 1.1rem;
        margin-bottom: 20px;
    }
    
    .timer-stopped {
        background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        display: inline-block;
        font-weight: 600;
    }
    
    .timer-label {
        margin-right: 10px;
    }
    
    .timer-final {
        font-size: 1.2rem;
    }
    
    .questions-review {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 15px;
        padding: 30px;
        margin-bottom: 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
    }
    
    .questions-review h3 {
        color: #2c3e50;
        font-size: 1.5rem;
        margin-bottom: 25px;
        text-align: center;
    }
    
    .question-review-item {
        border: 2px solid #e9ecef;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 20px;
        transition: all 0.3s ease;
    }
    
    .question-review-item:hover {
        border-color: #667eea;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
    }
    
    .question-number {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 8px 15px;
        border-radius: 20px;
        font-weight: 600;
        display: inline-block;
        margin-bottom: 15px;
        font-size: 0.9rem;
    }
    
    .question-content {
        display: flex;
        gap: 20px;
        align-items: flex-start;
    }
    
    .question-image-small {
        flex-shrink: 0;
    }
    
    .question-image-small img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }
    
    .question-details {
        flex: 1;
    }
    
    .question-text-review {
        font-size: 1.1rem;
        font-weight: 500;
        color: #2c3e50;
        margin-bottom: 10px;
    }
    
    .question-answer {
        color: #27ae60;
        font-size: 1rem;
        padding: 10px 15px;
        background: rgba(39, 174, 96, 0.1);
        border-radius: 8px;
        border-left: 4px solid #27ae60;
    }
    
    .results-actions {
        text-align: center;
        margin-bottom: 30px;
    }
    
    .results-actions .btn {
        margin: 0 10px;
    }
    
    @media (max-width: 768px) {
        .question-content {
            flex-direction: column;
        }
        
        .question-image-small img {
            width: 100%;
            height: auto;
            max-width: 200px;
        }
        
        .results-actions .btn {
            display: block;
            margin: 10px auto;
            width: 200px;
        }
    }
`;
document.head.appendChild(style);

// Prevenir saída acidental apenas durante o simulado
window.addEventListener('beforeunload', function(event) {
    if (simuladoTimer && !simuladoFinished) {
        event.preventDefault();
        event.returnValue = 'Tem certeza que deseja sair? Seu progresso será perdido.';
    }
});
