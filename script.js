// Funções de navegação principal
function startSimulado() {
    window.location.href = 'simulado.html';
}

function startFlashcards() {
    window.location.href = 'flashcards.html';
}

function goHome() {
    window.location.href = 'index.html';
}

// Inicialização da página principal
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar estatísticas se estivermos na página principal
    if (document.querySelector('.stats-section')) {
        updateStats();
    }
});

function updateStats() {
    // Simular carregamento de estatísticas
    const totalQuestionsElement = document.getElementById('totalQuestions');
    if (totalQuestionsElement) {
        totalQuestionsElement.textContent = '94';
    }
}

// Adicionar efeitos visuais
document.addEventListener('DOMContentLoaded', function() {
    // Animação de entrada para os cards
    const cards = document.querySelectorAll('.mode-card, .stat-card, .instruction-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    cards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Efeito hover nos ícones SVG
    const svgIcons = document.querySelectorAll('svg');
    svgIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});
