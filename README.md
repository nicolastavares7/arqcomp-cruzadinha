# CORE QUEST — Reconstrua o sistema

Jogo educativo interativo de Arquitetura Computacional desenvolvido em **HTML, CSS e JavaScript puros** (sem bibliotecas ou frameworks externos), compatível com hospedagem estática em subpastas como `/arqcomp-cruzadinha/`.

## Proposta do Jogo

Em um laboratório futurista, o jogador recupera um computador desativado enquanto estuda para a prova de Arquitetura Computacional. Resolvendo as palavras cruzadas baseadas no livro-texto oficial da disciplina, os circuitos de barramento e memórias se energizam, liberando fichas técnicas no Laboratório e consolidando conceitos teóricos.

## Link do Jogo Publicado

> **Insira aqui o link após publicar no GitHub Pages:**  
> `https://SEU-USUARIO.github.io/arqcomp-cruzadinha/`

## Como Abrir e Jogar

1. Abra o arquivo `index.html` diretamente em seu navegador (ou execute `python3 -m http.server 8080 --bind 127.0.0.1` para rodar localmente).
2. Na **Tela Inicial**, clique em **Começar cruzadinha** (ou **Continuar partida** se já houver letras preenchidas).
3. **Dois Modos de Jogo:**
   - **Com ajuda (padrão):** exibe o **Banco de Palavras** no topo com os 14 cartões embaralhados em nomes legíveis (ex: *Memória de massa*, *Address bus*, *Cache*).
     - **Arrastar diretamente para as casas:** arraste um cartão e solte sobre qualquer casa da palavra no tabuleiro. Ao passar o cursor por cima de uma casa, o tabuleiro destaca todas as casas de destino e a pista correspondente.
     - **Clique no cartão e depois na casa (Celular e Acessibilidade):** clique em um cartão para selecioná-lo e depois toque na casa desejada da cruzadinha.
   - **Sem ajuda:** esconde o Banco de Palavras para quem prefere resolver como cruzadinha clássica, digitando diretamente nas casas.
   - *Nota:* a digitação direta nas casas permanece sempre habilitada nos dois modos! Trocar de modo não apaga a partida.
4. **Resolução de Cruzamentos:**
   - Se uma casa pertencer a duas palavras e apenas uma delas comportar o tamanho do cartão, o jogo escolhe automaticamente essa direção.
   - Se ambas comportarem o tamanho, abre-se uma janela para o jogador escolher livremente entre Horizontal e Vertical (sem dedução automática baseada na resposta correta).
5. **Remoção ou Troca de Resposta:** use o botão **Remover palavra** na barra da pista ativa para limpar uma escolha; letras compartilhadas com outras palavras preenchidas nos cruzamentos são preservadas.
6. **Preciso de Ajuda:** se tiver dúvidas conceituais, clique em **Preciso de ajuda** ao lado da pista selecionada para receber uma orientação didática sem que as letras sejam preenchidas.
7. **Respostas e Explicações:** acesse a aba ou botão **Respostas e explicações** a qualquer momento para consultar o gabarito comentado oficial sem alterar seu progresso no jogo.
8. **Conferir:** clique em **Conferir** para validar acertos, erros e pendências, atualizando o contador e o status do sistema.
9. **Reiniciar:** use a qualquer momento para zerar o tabuleiro e o progresso da cruzadinha.

## Controles

- **Arrastar e Soltar:** arraste o cartão do Banco de Palavras diretamente para qualquer casa da palavra no tabuleiro da cruzadinha.
- **Clique ou Toque (Celular/Teclado):** clique no cartão do banco e depois clique na casa de destino.
- **Digitação Direta (A–Z):** digite na casa ativa; o cursor avança automaticamente.
- **Backspace:** apaga a letra atual; se vazia, retrocede e apaga a letra anterior da palavra.
- **Setas direcionais (↑ ↓ ← →):** movimentam o cursor livremente entre as casas.
- **Espaço ou clique na casa ativa:** alterna a orientação entre **Horizontal** e **Vertical** nas interseções.
- **Som:** efeitos sonoros gerados por Web Audio API pura, inicialmente desligados (botão **Som: Off / On**).

## Palavras e Pistas (14 palavras - todas com ≤ 15 palavras)

Todas as pistas são formuladas estritamente a partir do livro de referência da disciplina (*[SP3 MAT3] - Tópicos de Arquitetura Computacional*):

### Horizontais

| Nº | Cartão Legível | No Tabuleiro | Pista (≤ 15 palavras) | Palavras |
| :--- | :--- | :--- | :--- | :---: |
| **1H** | Microcontrolador | `MICROCONTROLADOR` | Chip que reúne CPU, memória e portas de entrada e saída para função específica. | 13 |
| **6H** | Cache | `CACHE` | Memória volátil pequena e rápida do processador com cópia do que foi usado recentemente. | 14 |
| **7H** | UC | `UC` | Parte da CPU que lê instruções, interpreta seus pedidos e comanda os outros blocos. | 14 |
| **9H** | ULA | `ULA` | Circuito da CPU encarregado de efetuar contas matemáticas e comparações lógicas dos dados. | 13 |
| **10H** | Address bus | `ADDRESSBUS` | Conjunto de fios que só sai da CPU indicando qual posição acessar. | 12 |
| **11H** | ROM | `ROM` | Memória não volátil clássica que preserva as instruções de inicialização da máquina. | 12 |
| **13H** | EEPROM | `EEPROM` | Pequena memória não volátil do chip do Arduino onde o código salva configurações. | 13 |

### Verticais

| Nº | Cartão Legível | No Tabuleiro | Pista (≤ 15 palavras) | Palavras |
| :--- | :--- | :--- | :--- | :---: |
| **1V** | Memória de massa | `MEMORIADEMASSA` | Camada permanente de armazenamento que preserva programas instalados e arquivos do usuário. | 12 |
| **2V** | Registradores | `REGISTRADORES` | Menores e mais velozes memórias internas da CPU, guardando dados em manipulação imediata. | 13 |
| **3V** | RAM | `RAM` | Memória de trabalho do sistema que perde os dados ao cortar a energia. | 13 |
| **4V** | Data bus | `DATABUS` | Linhas compartilhadas de comunicação que transportam informações nos dois sentidos entre componentes. | 12 |
| **5V** | Flash | `FLASH` | Tecnologia não volátil regravável que mantém gravado o programa enviado pela IDE. | 12 |
| **8V** | CPU | `CPU` | Núcleo do sistema composto por registradores, unidade de controle e circuito de cálculo. | 13 |
| **12V** | DMA | `DMA` | Técnica que transfere blocos entre dispositivos e memória sem ocupar o processador. | 12 |

## Recursos de Estudo Disponíveis

1. **Dois Modos de Jogo:** "Com ajuda" (com cartões arrastáveis diretamente para as casas) e "Sem ajuda" (digitação direta pura).
2. **Respostas e Explicações:** área dedicada para consulta rápida de gabarito e explicação de cada conceito sem interferir no tabuleiro.
3. **Botão "Preciso de ajuda":** exibe dica ou pergunta orientadora extraída do PDF sem revelar a resposta.
4. **Laboratório de Componentes:** diagrama esquemático e fichas técnicas desbloqueadas progressivamente.
5. **Treino para a Prova:** 10 questões com cálculos comentados ($2^n$, $P = 1/f$, $T = \text{CPI} \times P$) e 10 cartões de revisão (*flashcards*).
6. **Rastreabilidade Pedagógica:** consulte o arquivo local [`REVISAO_PEDAGOGICA.md`](file:///Users/ntavares/Documents/Arq%20Comp/trabalho_arq/REVISAO_PEDAGOGICA.md).
