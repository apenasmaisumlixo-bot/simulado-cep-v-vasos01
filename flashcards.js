// Dados dos flashcards
let flashcardsData = [];

// Estado dos flashcards
let flashcardIndex = 0;
let isAnswerVisible = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadFlashcardsData();
    initializeFlashcards();
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
    
    // Embaralhar flashcards
    shuffleArray(flashcardsData);
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

function initializeFlashcards() {
    flashcardIndex = 0;
    isAnswerVisible = false;
    
    // Event listeners para teclado
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Space' || event.key === ' ') {
            event.preventDefault();
            showAnswer();
        } else if (event.key === 'ArrowLeft') {
            previousFlashcard();
        } else if (event.key === 'ArrowRight') {
            nextFlashcard();
        } else if (event.key === 'r' || event.key === 'R') {
            shuffleFlashcards();
        }
    });
    
    showFlashcard();
}

function showFlashcard() {
    if (flashcardsData.length === 0) {
        return;
    }
    
    if (flashcardIndex >= flashcardsData.length) {
        flashcardIndex = 0;
    }
    if (flashcardIndex < 0) {
        flashcardIndex = flashcardsData.length - 1;
    }
    
    const flashcard = flashcardsData[flashcardIndex];
    
    document.getElementById('flashcardImage').src = flashcard.image;
    document.getElementById('flashcardQuestion').textContent = flashcard.question;
    document.getElementById('flashcardAnswer').textContent = flashcard.answer;
    
    // Reset answer visibility
    isAnswerVisible = false;
    document.getElementById('flashcardAnswer').style.display = 'none';
    document.getElementById('showAnswerBtn').style.display = 'block';
    document.getElementById('nextQuestionBtn').style.display = 'none';
    
    // Atualizar progresso
    updateProgressIndicator();
    
    // Adicionar efeito de transição
    const flashcardElement = document.querySelector('.flashcard');
    flashcardElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        flashcardElement.style.transform = 'scale(1)';
    }, 150);
}

function showAnswer() {
    if (!isAnswerVisible) {
        isAnswerVisible = true;
        document.getElementById('flashcardAnswer').style.display = 'block';
        document.getElementById('showAnswerBtn').style.display = 'none';
        document.getElementById('nextQuestionBtn').style.display = 'block';
        
        // Adicionar efeito visual
        const answerElement = document.getElementById('flashcardAnswer');
        answerElement.style.opacity = '0';
        answerElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
            answerElement.style.opacity = '1';
            answerElement.style.transform = 'translateY(0)';
        }, 100);
    }
}

function nextFlashcard() {
    flashcardIndex++;
    showFlashcard();
    
    // Feedback visual
    const flashcardElement = document.querySelector('.flashcard');
    flashcardElement.style.transform = 'translateX(10px)';
    setTimeout(() => {
        flashcardElement.style.transform = 'translateX(0)';
    }, 150);
}

function previousFlashcard() {
    flashcardIndex--;
    showFlashcard();
    
    // Feedback visual
    const flashcardElement = document.querySelector('.flashcard');
    flashcardElement.style.transform = 'translateX(-10px)';
    setTimeout(() => {
        flashcardElement.style.transform = 'translateX(0)';
    }, 150);
}

function shuffleFlashcards() {
    shuffleArray(flashcardsData);
    flashcardIndex = 0;
    showFlashcard();
    
    // Feedback visual
    const flashcardElement = document.querySelector('.flashcard');
    flashcardElement.style.transform = 'rotate(5deg) scale(1.05)';
    setTimeout(() => {
        flashcardElement.style.transform = 'rotate(0deg) scale(1)';
    }, 300);
    
    // Mostrar notificação
    showNotification('Flashcards embaralhados!');
}

function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function goHome() {
    window.location.href = 'index.html';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Adicionar indicadores de progresso
function updateProgressIndicator() {
    // Criar barra de progresso se não existir
    let progressBar = document.querySelector('.progress-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.9);
            padding: 10px 20px;
            border-radius: 25px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            font-weight: 500;
            color: #2c3e50;
            z-index: 100;
        `;
        document.body.appendChild(progressBar);
    }
    
    const current = flashcardIndex + 1;
    const total = flashcardsData.length;
    progressBar.textContent = `${current} / ${total}`;
}

// Adicionar controles de gestos para dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    const threshold = 50; // Mínimo de pixels para considerar um swipe
    
    if (touchEndX < touchStartX - threshold) {
        // Swipe left - próximo flashcard
        nextFlashcard();
    }
    
    if (touchEndX > touchStartX + threshold) {
        // Swipe right - flashcard anterior
        previousFlashcard();
    }
}

// Adicionar instruções de uso
function showInstructions() {
    const instructions = document.createElement('div');
    instructions.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; text-align: center;">
                <h3 style="margin-bottom: 20px; color: #2c3e50;">Como usar os Flashcards</h3>
                <div style="text-align: left; margin-bottom: 20px; color: #7f8c8d;">
                    <p><strong>Mostrar Resposta</strong> - Clique no botão ou pressione Espaço</p>
                    <p><strong>Próxima Questão</strong> - Clique no botão após ver a resposta</p>
                    <p><strong>← →</strong> - Navegar entre cards</p>
                    <p><strong>R</strong> - Embaralhar</p>
                    <p><strong>Swipe</strong> - Navegar (mobile)</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;">Entendi</button>
            </div>
        </div>
    `;
    document.body.appendChild(instructions);
}

// Mostrar instruções na primeira visita
if (!localStorage.getItem('flashcards_instructions_shown')) {
    setTimeout(showInstructions, 1000);
    localStorage.setItem('flashcards_instructions_shown', 'true');
}
