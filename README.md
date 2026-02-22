1. Flick Mode (Alvos Parados)
Treine sua precisão e tempo de reação. Os alvos surgem em posições aleatórias e você deve atingi-los antes que desapareçam.

Dificuldades: Fácil, Médio e Hardcore (cada uma com velocidades e efeitos de vibração visuais exclusivos).

Penalidade: Errar o clique ou demorar demais aumenta o contador de erros.

2. Tracking Mode (Acompanhar)
Treine sua consistência de rastreio. O alvo se move continuamente pela tela.

Mecânica: Você ganha pontos enquanto mantiver o mouse sobre o alvo. Se o mouse sair, os erros começam a subir rapidamente.

Tolerância: Modo de alta pontuação com limite de 1000 erros.

🛠️ Tecnologias Utilizadas
HTML5: Estrutura semântica do jogo.

CSS3: Layout adaptativo e animações avançadas de Glitch/3D (Cyan & Magenta) usando pseudo-elementos (::before, ::after) e @keyframes.

JavaScript (ES6+): Lógica principal, controle de setInterval, gerenciamento de estados de jogo e detecção de colisões de mouse.

🎨 Destaques do Código
Efeito Glitch Inteligente: Os botões possuem um efeito visual que só é ativado no hover, otimizando a performance visual e a experiência do usuário.

Gerenciamento de Memória: O jogo limpa automaticamente todos os intervalos (clearInterval) ao trocar de modo ou dar Game Over, evitando bugs de processamento.

Vibrações Dinâmicas: Cada nível de dificuldade possui uma assinatura de vibração diferente calculada via CSS.
