# Simulado CEP V - Vasos Sanguíneos

Sistema interativo de estudo de anatomia vascular com simulados cronometrados e flashcards.

## 🎯 Funcionalidades

### 📝 Modo Simulado
- **20 questões aleatórias** selecionadas automaticamente
- **Cronômetro de 30 minutos**
- Apenas visualização (pergunta + imagem)
- Mensagem para anotar respostas
- Revisão completa ao final com todas as respostas

### 🃏 Modo Flashcards
- **94 flashcards** de anatomia vascular
- Cards embaralhados automaticamente
- Botão "Mostrar Resposta"
- Navegação sequencial
- Controles por teclado e gestos

## 🚀 Como usar

### Acesso Online
Visite: [https://seu-usuario.github.io/simulado-cep-v-vasos](https://seu-usuario.github.io/simulado-cep-v-vasos)

### Instalação Local
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/simulado-cep-v-vasos.git
```

2. Abra o arquivo `index.html` no navegador

## 📁 Estrutura do Projeto

```
simulado-cep-v-vasos/
├── index.html              # Página principal
├── simulado.html           # Página do simulado
├── flashcards.html         # Página dos flashcards
├── styles.css              # Estilos CSS
├── script.js               # JavaScript principal
├── simulado.js             # JavaScript do simulado
├── flashcards.js           # JavaScript dos flashcards
├── database.json           # Dados dos flashcards
├── images/                 # Imagens das questões
│   ├── card_1.jpg
│   ├── card_2.jpg
│   └── ...
└── README.md               # Este arquivo
```

## 🎮 Controles

### Simulado
- **Enter**: Próxima questão
- **Botões**: Navegação por clique

### Flashcards
- **Espaço**: Mostrar resposta
- **← →**: Navegar entre cards
- **R**: Embaralhar cards
- **Swipe**: Navegação mobile

## 🎨 Características

- **Design Responsivo**: Funciona em desktop e mobile
- **Interface Moderna**: Gradientes e animações suaves
- **94 Questões**: Anatomia vascular completa
- **Imagens HD**: Ilustrações anatômicas detalhadas
- **Sem Dependências**: Funciona offline após carregamento

## 📊 Dados

- **Total de questões**: 94
- **Questões por simulado**: 20 (aleatórias)
- **Tempo de simulado**: 30 minutos
- **Categoria**: Anatomia Vascular
- **Nível**: Intermediário

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com gradientes
- **JavaScript ES6+**: Funcionalidades interativas
- **JSON**: Base de dados local
- **Responsive Design**: Mobile-first

## 📱 Compatibilidade

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers

## 🔧 Personalização

### Adicionar Questões
Edite o arquivo `database.json`:

```json
{
  "id": 95,
  "question": "Nomeie o vaso numerado como 1",
  "image": "images/card_95.jpg",
  "answer": "Nome do vaso",
  "category": "anatomia_vascular",
  "difficulty": "intermediate"
}
```

### Modificar Tempo
No arquivo `simulado.js`, altere:
```javascript
let simuladoTimeLimit = 30 * 60; // 30 minutos em segundos
```

### Alterar Número de Questões
No arquivo `simulado.js`, modifique:
```javascript
selectedQuestions = shuffled.slice(0, 20); // 20 questões
```

## 📄 Licença

Este projeto é destinado para fins educacionais de estudo de anatomia.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou sugestões, abra uma [issue](https://github.com/seu-usuario/simulado-cep-v-vasos/issues).

---

**Desenvolvido para estudantes de medicina e anatomia** 🩺
