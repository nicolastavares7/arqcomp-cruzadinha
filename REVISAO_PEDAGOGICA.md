# Fundamentação Teórica das Pistas, Questões e Cartões (SP3 MAT3)

Este documento registra a rastreabilidade pedagógica direta com o livro didático oficial da disciplina:  
**`[SP3 MAT3] - Tópicos de Arquitetura Computacional (São Paulo Tech School)`**.

---

## 1. Pistas da Cruzadinha (14 Termos)

Todas as pistas possuem no máximo 15 palavras, não revelam parte da resposta nem expandem siglas, e possuem dica orientadora complementar no botão "Preciso de ajuda".

| ID | Termo | Nº de Casas | Pista (≤ 15 palavras) | Contagem de Palavras | Dica / Pergunta Orientadora | Fundamentação no PDF |
|---|---|---|---|---|---|---|
| **1H** | `MICROCONTROLADOR` | 16 | Chip que reúne CPU, memória e portas de entrada e saída para função específica. | 13 palavras | Pense no ATmega328P: ele tem tudo o que precisa dentro de um único circuito integrado. | Cap. 3 (p. 10): "reúne em um único chip a CPU, a memória e os circuitos de entrada e saída... feito para uma tarefa específica" |
| **6H** | `CACHE` | 5 | Memória volátil pequena e rápida do processador com cópia do que foi usado recentemente. | 14 palavras | Evita que o processador precise descer até a RAM toda hora buscar dados repetidos. | Cap. 5 (p. 16, 17) e Glossário (p. 26): "memória pequena e muito rápida dentro do processador, com cópia do que a CPU usou há pouco" |
| **7H** | `UC` | 2 | Parte da CPU que lê instruções, interpreta seus pedidos e comanda os outros blocos. | 14 palavras | É comparada ao chefe de cozinha: ela não calcula, apenas decodifica e distribui ordens. | Cap. 2.1 (p. 6) e Glossário (p. 26): "Unidade de Controle: lê cada instrução, descobre o que ela pede e envia as ordens" |
| **9H** | `ULA` | 3 | Circuito da CPU encarregado de efetuar contas matemáticas e comparações lógicas dos dados. | 13 palavras | É onde ocorre a soma binária 2 + 2 = 4 e operações como AND e OR. | Cap. 2.1 (p. 6, Exemplo p. 6) e Glossário (p. 26): "faz as contas (soma, subtração) e as operações lógicas" |
| **10H** | `ADDRESSBUS` | 10 | Conjunto de fios que só sai da CPU indicando qual posição acessar. | 12 palavras | Responde à pergunta 'ONDE?'. Sua quantidade de fios $n$ determina as $2^n$ posições. | Cap. 4 (p. 14, 15): "De endereço: ONDE? sai da CPU... o número da posição de memória ou dispositivo" |
| **11H** | `ROM` | 3 | Memória não volátil clássica que preserva as instruções de inicialização da máquina. | 12 palavras | Guarda a BIOS ou UEFI; mesmo desligando a máquina, as instruções continuam lá. | Cap. 5 (p. 16, 17) e Glossário (p. 26): "memória somente de leitura... não volátil e guarda o que o equipamento precisa para começar a funcionar" |
| **13H** | `EEPROM` | 6 | Pequena memória não volátil do chip do Arduino onde o código salva configurações. | 13 palavras | Tem 1 KB no ATmega328P e serve para guardar dados que devem sobreviver ao desligamento. | Cap. 3.1 (p. 12), Cap. 5 (p. 16) e Glossário (p. 26): "memória não volátil pequena do Arduino, onde o programa pode guardar dados que sobrevivem ao desligamento" |
| **1V** | `MEMORIADEMASSA` | 14 | Camada permanente de armazenamento que preserva programas instalados e arquivos do usuário. | 12 palavras | Representada por SSDs e HDs na base da pirâmide; tem muitos gigabytes e é não volátil. | Cap. 5.1 (p. 18, 19): "Armazenamento (SSD, HD): arquivos e programas instalados, guardados de forma permanente" |
| **2V** | `REGISTRADORES` | 13 | Menores e mais velozes memórias internas da CPU, guardando dados em manipulação imediata. | 13 palavras | Ficam coladas na ULA. Exemplos são o Acumulador e o Contador de Programa (PC). | Cap. 2.1 (p. 6) e Cap. 5.1 (p. 18): "memória minúscula que fica dentro da CPU. É a memória mais rápida do computador... guarda poucos bytes" |
| **3V** | `RAM` | 3 | Memória de trabalho do sistema que perde os dados ao cortar a energia. | 13 palavras | É volátil: no Arduino guarda as variáveis do loop(), e no computador fica em pentes. | Cap. 5 (p. 16, 17) e Glossário (p. 26): "memória de trabalho do computador. Guarda os programas que estão rodando e os dados que eles usam. É volátil." |
| **4V** | `DATABUS` | 7 | Linhas compartilhadas de comunicação que transportam informações nos dois sentidos entre componentes. | 12 palavras | Responde à pergunta 'O QUÊ?'. É por onde viajam tanto os dados quanto as instruções. | Cap. 4 (p. 14): "De dados: O QUÊ? vai e volta... o valor que está sendo lido ou escrito, e também as instruções" |
| **5V** | `FLASH` | 5 | Tecnologia não volátil regravável que mantém gravado o programa enviado pela IDE. | 12 palavras | Possui 32 KB no Uno; é a mesma tecnologia de pendrives e não apaga sem energia. | Cap. 3.1 (p. 12), Cap. 5 (p. 16) e Glossário (p. 26): "memória não volátil e regravável, a mesma tecnologia do pendrive: guarda o programa do Arduino" |
| **8V** | `CPU` | 3 | Núcleo do sistema composto por registradores, unidade de controle e circuito de cálculo. | 13 palavras | É o 'cérebro' do computador que busca e executa instruções; no kit é o núcleo do ATmega328P. | Cap. 2 (p. 4), Cap. 2.1 (p. 6) e Glossário (p. 26): "Unidade Central de Processamento: busca e executa as instruções; formada por ULA, UC e registradores" |
| **12V** | `DMA` | 3 | Técnica que transfere blocos entre dispositivos e memória sem ocupar o processador. | 12 palavras | Permite que um controlador copie dados direto para a RAM enquanto a CPU executa outras tarefas. | Cap. 6 (p. 20, 21) e Glossário (p. 26): "permite que um dispositivo troque dados com a RAM sem passar pela CPU a cada byte" |

---

## 2. Questões do Quiz (10 Questões)

Todas as questões, respostas corretas e justificativas das alternativas erradas têm base textual exata no livro didático:

1. **ULA, UC e Registradores (Exemplo `ADD 2, 2`):**
   - *Fundamentação:* Cap. 2.1 (p. 6 e 7).
   - O Contador de Programa (PC) indica o endereço da próxima instrução; o Registrador de Instrução guarda a instrução em execução; a UC comanda; a ULA calcula; e o Acumulador recebe o resultado.
2. **Ciclo de Busca e Execução e Efeito do RESET:**
   - *Fundamentação:* Cap. 2.2 (p. 8 e 9).
   - 4 passos: 1. Buscar (fetch), 2. Decodificar (decode), 3. Executar (execute), 4. Guardar o resultado (write back). O RESET zera o Contador de Programa (PC), fazendo a CPU voltar à primeira instrução da memória.
3. **Classificação do Arduino Uno vs ATmega328P:**
   - *Fundamentação:* Cap. 3 (p. 10 e 11) e Cap. 3.1 (p. 12 e 13).
   - "Arduino é microcontrolador ou microprocessador? A resposta mais precisa é: nenhum dos dois. Arduino é o nome da placa. O chip preto no meio dela, o ATmega328P, é que é um microcontrolador." Além disso, o ATmega328P não possui cache (p. 16) nem controlador de DMA (p. 21).
4. **Funções e Sentidos dos Três Barramentos:**
   - *Fundamentação:* Cap. 4 (p. 14).
   - Endereço = ONDE? (sai da CPU, unidirecional); Dados = O QUÊ? (vai e volta, bidirecional); Controle = QUANDO e COMO? (leitura/escrita, memória/ES, clock).
5. **Cálculo da Quantidade de Endereços ($2^n$):**
   - *Fundamentação:* Cap. 4 (p. 14 e 15).
   - Com $n$ fios de endereço, existem $2^n$ combinações/posições. Para a RAM de 2 KB ($2.048$ bytes) do Uno, são $11$ fios ($2^{11} = 2.048$). O barramento de dados não entra na conta.
6. **Memórias Voláteis vs Não Voláteis no Arduino:**
   - *Fundamentação:* Cap. 5 (p. 16 e 17).
   - Ao desligar a placa, as variáveis do `loop()` na RAM são perdidas (volátil), enquanto o programa gravado na Flash permanece intacto (não volátil).
7. **Hierarquia de Memória (Ordenação por Velocidade):**
   - *Fundamentação:* Cap. 5.1 (p. 18 e 19).
   - Da mais rápida para a mais lenta: Registradores (dentro da CPU) $\rightarrow$ Cache $\rightarrow$ RAM $\rightarrow$ Armazenamento (SSD/HD).
8. **DMA e a Desmistificação de 'Prioridade':**
   - *Fundamentação:* Cap. 6 (p. 20 e 21).
   - Box "UM ENGANO COMUM": DMA não torna os dados prioritários nem os coloca na frente; ele delega a cópia bloco a bloco a um controlador dedicado para liberar a CPU.
9. **Cálculo do Período do Clock ($P = 1/f$):**
   - *Fundamentação:* Cap. 7 (p. 22 e 23).
   - $P = 1 \div f$. Convertendo $500\text{ MHz}$ em $\text{GHz}$ ($0,5\text{ GHz}$), o período resulta diretamente em nanossegundos: $P = 1 \div 0,5 = 2\text{ ns}$.
10. **Tempo por Instrução ($T = \text{CPI} \times P$):**
    - *Fundamentação:* Cap. 7 (p. 22 e 23).
    - Clock maior sozinho não garante melhor desempenho. Processador X ($500\text{ MHz}$, $\text{CPI}=3 \rightarrow P=2\text{ ns} \rightarrow T=6\text{ ns}$) termina antes do Processador Y ($1\text{ GHz}$, $\text{CPI}=8 \rightarrow P=1\text{ ns} \rightarrow T=8\text{ ns}$).

---

## 3. Cartões de Revisão (Flashcards - 10 Tópicos)

Os 10 cartões cobrem com exatidão a síntese de final de capítulo e o glossário oficial (Cap. 9, p. 26-27), sem extrapolações:
1. Dentro da CPU: ULA, UC e Registradores (Cap. 2.1).
2. Ciclo de busca e execução em 4 passos e o botão RESET (Cap. 2.2).
3. Arduino Uno (placa) e ATmega328P (microcontrolador) (Cap. 3 e 3.1).
4. As 3 perguntas dos barramentos: ONDE, O QUÊ, QUANDO/COMO (Cap. 4).
5. Quantidade de endereços: $2^n$ posições (Cap. 4).
6. Volatilidade e as memórias do Arduino (Flash, RAM, EEPROM) (Cap. 5).
7. Pirâmide da hierarquia da mais rápida para a mais lenta (Cap. 5.1).
8. Funcionamento do DMA e o engano comum sobre prioridade (Cap. 6).
9. Período do clock: $P = 1/f$ com frequência em GHz para período em ns (Cap. 7).
10. Tempo de instrução $T = \text{CPI} \times P$ (Cap. 7).
