(() => {
  "use strict";

  const ROWS = 14;
  const COLS = 17;

  // 14 palavras oficiais com nomes legíveis (display), grafia oficial (answer), pistas curtas (≤ 15 palavras)
  const WORDS = [
    {
      id: "1H",
      num: 1,
      dir: "H",
      display: "Microcontrolador",
      answer: "MICROCONTROLADOR",
      row: 0,
      col: 0,
      clue: "Chip que reúne CPU, memória e portas de entrada e saída para função específica.",
      help: "Pense no chip ATmega328P: ele reúne todo o computador (CPU, Flash, RAM, EEPROM e E/S) em uma única peça de silício.",
      category: "Arquitetura",
      explain: "Reúne em um único chip a CPU, as memórias (Flash, RAM, EEPROM) e circuitos de entrada e saída, formando um computador compacto para tarefas dedicadas.",
      example: "O ATmega328P (chip preto da placa Arduino Uno) e o ESP32 são exemplos clássicos usados em sensores, motores e automação.",
      diff: "Diferente do microprocessador (como Intel Core ou AMD Ryzen), que traz só a CPU + cache e depende de RAM e armazenamento externos na placa-mãe.",
      svg: `<svg viewBox="0 0 260 72" aria-hidden="true">
        <rect x="10" y="10" width="240" height="52" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
        <text x="130" y="25" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="monospace">CHIP ÚNICO (ex: ATmega328P)</text>
        <rect x="22" y="32" width="52" height="22" rx="4" fill="#111c32" stroke="#22d3ee"/><text x="48" y="46" fill="#e2e8f0" font-size="9" text-anchor="middle" font-family="monospace">CPU</text>
        <rect x="82" y="32" width="84" height="22" rx="4" fill="#111c32" stroke="#22d3ee"/><text x="124" y="46" fill="#e2e8f0" font-size="8.5" text-anchor="middle" font-family="monospace">Flash/RAM/EEPROM</text>
        <rect x="174" y="32" width="64" height="22" rx="4" fill="#111c32" stroke="#f59e0b"/><text x="206" y="46" fill="#e2e8f0" font-size="9" text-anchor="middle" font-family="monospace">Pinos E/S</text>
      </svg>`
    },
    {
      id: "6H",
      num: 6,
      dir: "H",
      display: "Cache",
      answer: "CACHE",
      row: 3,
      col: 12,
      clue: "Memória volátil pequena e rápida do processador com cópia do que foi usado recentemente.",
      help: "Evita que a CPU precise descer até a RAM toda hora buscar as mesmas linhas de código repetidas em loops.",
      category: "Hierarquia de Memória",
      explain: "Memória pequena, volátil e muito rápida localizada dentro do processador. Armazena cópias dos dados e instruções usados recentemente.",
      example: "Processadores de notebooks e servidores possuem cache (L1, L2, L3). Já o ATmega328P do Arduino Uno não possui cache.",
      diff: "Fica entre os registradores (mais rápidos, dentro da CPU) e a RAM (maior, na placa-mãe). É mais lenta que registradores, porém muito mais rápida que a RAM.",
      svg: `<svg viewBox="0 0 260 72" aria-hidden="true">
        <rect x="12" y="20" width="66" height="32" rx="5" fill="#111c32" stroke="#64748b"/><text x="45" y="39" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="monospace">Reg.</text>
        <path d="M78 36h18" stroke="#22d3ee" stroke-width="2"/>
        <rect x="96" y="16" width="76" height="40" rx="6" fill="rgba(16,185,129,0.18)" stroke="#10b981" stroke-width="1.8"/><text x="134" y="39" fill="#ecfdf5" font-size="10" text-anchor="middle" font-family="monospace" font-weight="bold">CACHE</text>
        <path d="M172 36h18" stroke="#64748b" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="190" y="20" width="58" height="32" rx="5" fill="#111c32" stroke="#64748b"/><text x="219" y="39" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="monospace">RAM</text>
      </svg>`
    },
    {
      id: "7H",
      num: 7,
      dir: "H",
      display: "UC",
      answer: "UC",
      row: 4,
      col: 7,
      clue: "Parte da CPU que lê instruções, interpreta seus pedidos e comanda os outros blocos.",
      help: "No modelo da cozinha do livro, ela é o 'chef': não faz as contas na panela, apenas distribui as tarefas.",
      category: "CPU",
      explain: "A Unidade de Controle lê a instrução no registrador, interpreta qual é a operação e envia sinais de comando para os demais blocos.",
      example: "Na instrução ADD 2, 2, a UC identifica a operação de soma e comanda a ULA para realizá-la.",
      diff: "A UC coordena o fluxo; ela não faz os cálculos (papel da ULA) nem guarda os dados temporários (papel dos registradores).",
      svg: `<svg viewBox="0 0 260 72" aria-hidden="true">
        <rect x="18" y="16" width="84" height="40" rx="6" fill="rgba(16,185,129,0.18)" stroke="#10b981" stroke-width="1.8"/>
        <text x="60" y="40" fill="#ecfdf5" font-size="11" text-anchor="middle" font-family="monospace" font-weight="bold">UC</text>
        <path d="M102 28h56M102 44h56" stroke="#22d3ee" stroke-width="1.8"/>
        <rect x="158" y="14" width="84" height="20" rx="4" fill="#111c32" stroke="#64748b"/><text x="200" y="27" fill="#cbd5e1" font-size="8.5" text-anchor="middle" font-family="monospace">Ordem → ULA</text>
        <rect x="158" y="38" width="84" height="20" rx="4" fill="#111c32" stroke="#64748b"/><text x="200" y="51" fill="#cbd5e1" font-size="8.5" text-anchor="middle" font-family="monospace">Ordem → Mem.</text>
      </svg>`
    },
    {
      id: "9H",
      num: 9,
      dir: "H",
      display: "ULA",
      answer: "ULA",
      row: 5,
      col: 13,
      clue: "Circuito da CPU encarregado de efetuar contas matemáticas e comparações lógicas dos dados.",
      help: "É o bloco executor de cálculos: realiza operações como soma, subtração, AND, OR e XOR.",
      category: "CPU",
      explain: "A Unidade Lógica e Aritmética realiza as contas matemáticas e as operações lógicas sobre os dados recebidos.",
      example: "Ao executar 2 + 2 = 4, a ULA calcula o resultado e o encaminha para o Acumulador.",
      diff: "A ULA apenas calcula sob ordem da UC; quem armazena o resultado em seguida é um registrador.",
      svg: `<svg viewBox="0 0 260 72" aria-hidden="true">
        <polygon points="85,12 175,12 155,60 105,60" fill="rgba(16,185,129,0.18)" stroke="#10b981" stroke-width="1.8"/>
        <text x="130" y="40" fill="#ecfdf5" font-size="12" text-anchor="middle" font-family="monospace" font-weight="bold">ULA</text>
        <text x="42" y="26" fill="#22d3ee" font-size="9" text-anchor="middle" font-family="monospace">Dado A</text>
        <text x="42" y="52" fill="#22d3ee" font-size="9" text-anchor="middle" font-family="monospace">Dado B</text>
        <path d="M64 22h28M64 48h34" stroke="#22d3ee" stroke-width="1.5"/>
        <path d="M165 36h30" stroke="#f59e0b" stroke-width="1.8"/>
        <text x="225" y="39" fill="#fbbf24" font-size="9" text-anchor="middle" font-family="monospace">Result.</text>
      </svg>`
    },
    {
      id: "10H",
      num: 10,
      dir: "H",
      display: "Address bus",
      answer: "ADDRESSBUS",
      row: 6,
      col: 0,
      clue: "Conjunto de fios que só sai da CPU indicando qual posição acessar.",
      help: "Responde à pergunta 'ONDE?'. Se tiver n fios, alcança exatamente 2ⁿ posições diferentes de memória.",
      category: "Barramentos",
      explain: "Conjunto compartilhado de fios que transporta o endereço da memória ou do dispositivo que a CPU quer acessar.",
      example: "O Arduino Uno possui 11 fios de endereço para cobrir os seus 2.048 bytes (2 KB) de RAM (pois 2¹¹ = 2.048).",
      diff: "É unidirecional (só sai da CPU), diferentemente do barramento de dados que é bidirecional (vai e volta).",
      svg: `<svg viewBox="0 0 260 72" aria-hidden="true">
        <rect x="16" y="18" width="64" height="36" rx="6" fill="#111c32" stroke="#22d3ee"/><text x="48" y="40" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="monospace">CPU</text>
        <path d="M80 36h90" stroke="#10b981" stroke-width="3"/>
        <polygon points="170,30 182,36 170,42" fill="#10b981"/>
        <text x="130" y="26" fill="#6ee7b7" font-size="8.5" text-anchor="middle" font-family="monospace">ONDE? (2ⁿ pos.)</text>
        <rect x="184" y="18" width="62" height="36" rx="6" fill="#111c32" stroke="#64748b"/><text x="215" y="40" fill="#e2e8f0" font-size="9.5" text-anchor="middle" font-family="monospace">Memória</text>
      </svg>`
    },
    {
      id: "11H",
      num: 11,
      dir: "H",
      display: "ROM",
      answer: "ROM",
      row: 9,
      col: 2,
      clue: "Memória não volátil clássica que preserva as instruções de inicialização da máquina.",
      help: "Guarda o firmware de inicialização (BIOS ou UEFI). O termo clássico enfatiza que o conteúdo não era alterado após a fábrica.",
      category: "Tipos de Memória",
      explain: "Memória não volátil que armazena os códigos necessários para ligar o equipamento e inicializar os dispositivos.",
      example: "Na inicialização de computadores, as rotinas básicas de partida ficavam gravadas neste tipo de memória.",
      diff: "Diferente da RAM, a ROM não perde o conteúdo ao desligar o computador. Hoje esse papel é feito por Flash regravável.",
      svg: `<svg viewBox="0 0 260 72" aria-hidden="true">
        <rect x="30" y="14" width="200" height="44" rx="8" fill="#111c32" stroke="#10b981" stroke-width="1.6"/>
        <text x="130" y="33" fill="#ecfdf5" font-size="11" text-anchor="middle" font-family="monospace" font-weight="bold">ROM (Não Volátil)</text>
        <text x="130" y="48" fill="#94a3b8" font-size="8.5" text-anchor="middle" font-family="monospace">Firmware de boot • Sem energia = mantém</text>
      </svg>`
    },
    {
      id: "13H",
      num: 13,
      dir: "H",
      display: "EEPROM",
      answer: "EEPROM",
      row: 11,
      col: 3,
      clue: "Pequena memória não volátil do chip do Arduino onde o código salva configurações.",
      help: "Tem 1 KB no ATmega328P e serve para guardar dados que devem continuar salvos mesmo após cortar a alimentação elétrica.",
      category: "Tipos de Memória",
      explain: "Memória não volátil interna do microcontrolador utilizada para salvar dados permanentes gerados pelo próprio programa.",
      example: "No Arduino Uno há 1 KB de EEPROM, excelente para armazenar preferências, calibrações de sensores e limites de alerta.",
      diff: "Enquanto a Flash (32 KB) armazena o programa compilado, a EEPROM (1 KB) serve para parâmetros e dados configurados pelo código.",
      svg: `<svg viewBox="0 0 260 72" aria-hidden="true">
        <rect x="24" y="14" width="212" height="44" rx="8" fill="#111c32" stroke="#f59e0b" stroke-width="1.6"/>
        <text x="130" y="33" fill="#fef3c7" font-size="11" text-anchor="middle" font-family="monospace" font-weight="bold">EEPROM • 1 KB (Uno)</text>
        <text x="130" y="48" fill="#94a3b8" font-size="8.5" text-anchor="middle" font-family="monospace">Configurações persistentes • Não volátil</text>
      </svg>`
    },
    {
      id: "1V",
      num: 1,
      dir: "V",
      display: "Memória de massa",
      answer: "MEMORIADEMASSA",
      row: 0,
      col: 0,
      clue: "Camada permanente de armazenamento que preserva programas instalados e arquivos do usuário.",
      help: "Fica na base da pirâmide de memória (SSDs e HDs): tem enorme capacidade e baixo custo por byte, mas é mais lenta.",
      category: "Hierarquia de Memória",
      explain: "Camada de armazenamento permanente de alta capacidade na base da hierarquia de memória, guardando o sistema operacional e arquivos.",
      example: "O SSD ou HD de um notebook guarda os arquivos gravados de forma permanente, sobrevivendo a reinicializações.",
      diff: "É não volátil e oferece centenas de gigabytes, porém sua velocidade de acesso é muito inferior à da RAM e da Cache.",
      svg: `<svg viewBox="0 0 260 72" aria-hidden="true">
        <polygon points="130,8 175,30 85,30" fill="#1e293b" stroke="#64748b"/>
        <polygon points="75,34 185,34 205,46 55,46" fill="#1e293b" stroke="#64748b"/>
        <polygon points="45,50 215,50 232,64 28,64" fill="rgba(16,185,129,0.22)" stroke="#10b981" stroke-width="1.6"/>
        <text x="130" y="60" fill="#ecfdf5" font-size="8.5" text-anchor="middle" font-family="monospace" font-weight="bold">ARMAZENAMENTO (SSD / HD)</text>
      </svg>`
    },
    {
      id: "2V",
      num: 2,
      dir: "V",
      display: "Registradores",
      answer: "REGISTRADORES",
      row: 0,
      col: 3,
      clue: "Menores e mais velozes memórias internas da CPU, guardando dados em manipulação imediata.",
      help: "São poucos bytes colados na ULA no topo absoluto da pirâmide. Exemplos: Acumulador e Program Counter.",
      category: "CPU / Hierarquia",
      explain: "Memórias minúsculas e ultrarrápidas dentro da CPU que armazenam operandos imediatos, instruções atuais e endereços de execução.",
      example: "O Program Counter (PC) guarda o endereço da próxima instrução; o Acumulador recebe o resultado do cálculo da ULA.",
      diff: "São muito mais rápidos e menores que a memória cache e a memória RAM, operando diretamente na frequência do núcleo.",
      svg: `<svg viewBox="0 0 260 72" aria-hidden="true">
        <rect x="14" y="14" width="72" height="44" rx="6" fill="rgba(16,185,129,0.18)" stroke="#10b981"/><text x="50" y="34" fill="#ecfdf5" font-size="9" text-anchor="middle" font-family="monospace" font-weight="bold">PC</text><text x="50" y="48" fill="#94a3b8" font-size="7.5" text-anchor="middle" font-family="monospace">Próx. end.</text>
        <rect x="94" y="14" width="72" height="44" rx="6" fill="rgba(16,185,129,0.18)" stroke="#10b981"/><text x="130" y="34" fill="#ecfdf5" font-size="9" text-anchor="middle" font-family="monospace" font-weight="bold">RI</text><text x="130" y="48" fill="#94a3b8" font-size="7.5" text-anchor="middle" font-family="monospace">Instrução</text>
        <rect x="174" y="14" width="72" height="44" rx="6" fill="rgba(16,185,129,0.18)" stroke="#10b981"/><text x="210" y="34" fill="#ecfdf5" font-size="9" text-anchor="middle" font-family="monospace" font-weight="bold">ACC</text><text x="210" y="48" fill="#94a3b8" font-size="7.5" text-anchor="middle" font-family="monospace">Acumulador</text>
      </svg>`
    },
    {
      id: "3V",
      num: 3,
      dir: "V",
      display: "RAM",
      answer: "RAM",
      row: 0,
      col: 9,
      clue: "Memória de trabalho do sistema que perde os dados ao cortar a energia.",
      help: "É volátil: guarda as variáveis ativas do programa e o código em execução. No Arduino Uno ela tem apenas 2 KB.",
      category: "Tipos de Memória",
      explain: "Memória principal de acesso aleatório e volátil. Armazena os dados temporários e variáveis enquanto o código está sendo executado.",
      example: "No Arduino Uno, as variáveis criadas no loop() ficam na RAM de 2 KB e voltam a zero se o cabo USB for retirado.",
      diff: "Ao contrário da Flash, que mantém o programa gravado, a RAM perde totalmente as informações quando a energia é interrompida.",
      svg: `<svg viewBox="0 0 260 72" aria-hidden="true">
        <rect x="24" y="14" width="212" height="44" rx="6" fill="#111c32" stroke="#22d3ee" stroke-width="1.6"/>
        <text x="130" y="33" fill="#e0f2fe" font-size="11" text-anchor="middle" font-family="monospace" font-weight="bold">RAM • Volátil</text>
        <text x="130" y="48" fill="#94a3b8" font-size="8.5" text-anchor="middle" font-family="monospace">Variáveis e apps ativos • Sem energia = zera</text>
      </svg>`
    },
    {
      id: "4V",
      num: 4,
      dir: "V",
      display: "Data bus",
      answer: "DATABUS",
      row: 0,
      col: 13,
      clue: "Linhas compartilhadas de comunicação que transportam informações nos dois sentidos entre componentes.",
      help: "Responde à pergunta 'O QUÊ?'. Por ser bidirecional, permite leitura (traz para a CPU) e escrita (leva para a memória).",
      category: "Barramentos",
      explain: "Barramento compartilhado bidirecional encarregado de trafegar dados lidos ou escritos e também instruções de máquina.",
      example: "Quando a memória envia o conteúdo de uma posição para a CPU, esse valor viaja pelas linhas deste barramento.",
      diff: "Enquanto o barramento de endereço aponta a localização e só sai da CPU, o de dados transfere os valores em ambos os sentidos.",
      svg: `<svg viewBox="0 0 260 72" aria-hidden="true">
        <rect x="16" y="18" width="64" height="36" rx="6" fill="#111c32" stroke="#22d3ee"/><text x="48" y="40" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="monospace">CPU</text>
        <path d="M90 36h80" stroke="#22d3ee" stroke-width="3"/>
        <polygon points="92,30 80,36 92,42" fill="#22d3ee"/>
        <polygon points="168,30 180,36 168,42" fill="#22d3ee"/>
        <text x="130" y="25" fill="#67e8f9" font-size="8.5" text-anchor="middle" font-family="monospace">O QUÊ? (ida e volta)</text>
        <rect x="184" y="18" width="62" height="36" rx="6" fill="#111c32" stroke="#64748b"/><text x="215" y="40" fill="#e2e8f0" font-size="9.5" text-anchor="middle" font-family="monospace">Mem./E-S</text>
      </svg>`
    },
    {
      id: "5V",
      num: 5,
      dir: "V",
      display: "Flash",
      answer: "FLASH",
      row: 3,
      col: 5,
      clue: "Tecnologia não volátil regravável que mantém gravado o programa enviado pela IDE.",
      help: "Mesma tecnologia dos pendrives. No Arduino Uno tem 32 KB e mantém o código mesmo sem energia.",
      category: "Tipos de Memória",
      explain: "Memória não volátil e regravável que armazena o firmware ou código executável nos microcontroladores.",
      example: "No Arduino Uno, o seu sketch fica gravado na memória Flash de 32 KB (onde 0,5 KB é reservado para o bootloader).",
      diff: "Diferente das antigas ROMs de fábrica que nunca mudavam, a Flash pode ser apagada e regravada via cabo USB.",
      svg: `<svg viewBox="0 0 260 72" aria-hidden="true">
        <rect x="24" y="14" width="212" height="44" rx="8" fill="#111c32" stroke="#10b981" stroke-width="1.6"/>
        <text x="130" y="33" fill="#ecfdf5" font-size="11" text-anchor="middle" font-family="monospace" font-weight="bold">FLASH • 32 KB (Uno)</text>
        <text x="130" y="48" fill="#94a3b8" font-size="8.5" text-anchor="middle" font-family="monospace">Programa/Firmware • Regravável e não volátil</text>
      </svg>`
    },
    {
      id: "8V",
      num: 8,
      dir: "V",
      display: "CPU",
      answer: "CPU",
      row: 4,
      col: 8,
      clue: "Núcleo do sistema composto por registradores, unidade de controle e circuito de cálculo.",
      help: "É a Unidade Central de Processamento: o bloco que executa o ciclo de busca e execução das instruções.",
      category: "Bloco Principal",
      explain: "Bloco principal de processamento que busca e executa instruções. É composta internamente por ULA, UC e Registradores.",
      example: "No Arduino Uno, a CPU é o núcleo de processamento do chip ATmega328P trabalhando a 16 MHz.",
      diff: "É a processadora do sistema; em computadores ela fica num microprocessador isolado, e no Arduino divide o chip com memórias.",
      svg: `<svg viewBox="0 0 260 72" aria-hidden="true">
        <rect x="20" y="10" width="220" height="52" rx="8" fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="1.6"/>
        <text x="130" y="24" fill="#ecfdf5" font-size="9.5" text-anchor="middle" font-family="monospace" font-weight="bold">CPU</text>
        <rect x="30" y="30" width="58" height="24" rx="4" fill="#0f172a" stroke="#22d3ee"/><text x="59" y="45" fill="#e2e8f0" font-size="9" text-anchor="middle" font-family="monospace">ULA</text>
        <rect x="98" y="30" width="58" height="24" rx="4" fill="#0f172a" stroke="#22d3ee"/><text x="127" y="45" fill="#e2e8f0" font-size="9" text-anchor="middle" font-family="monospace">UC</text>
        <rect x="166" y="30" width="64" height="24" rx="4" fill="#0f172a" stroke="#22d3ee"/><text x="198" y="45" fill="#e2e8f0" font-size="8.5" text-anchor="middle" font-family="monospace">Registr.</text>
      </svg>`
    },
    {
      id: "12V",
      num: 12,
      dir: "V",
      display: "DMA",
      answer: "DMA",
      row: 10,
      col: 8,
      clue: "Técnica que transfere blocos entre dispositivos e memória sem ocupar o processador.",
      help: "Permite delegar a cópia byte a byte para um circuito controlador próprio, deixando a CPU livre para outros cálculos.",
      category: "Transferência de Dados",
      explain: "Mecanismo que permite a transferência em bloco de dados diretamente entre periféricos e a memória RAM sem intermediação da CPU a cada byte.",
      example: "Usado por discos SSD, placas de vídeo e rede. O chip ATmega328P do Arduino Uno não possui controlador de DMA.",
      diff: "Não concede prioridade especial aos dados: sua vantagem é liberar a CPU do trabalho repetitivo de movimentação.",
      svg: `<svg viewBox="0 0 260 72" aria-hidden="true">
        <rect x="16" y="14" width="62" height="22" rx="4" fill="#111c32" stroke="#64748b"/><text x="47" y="28" fill="#cbd5e1" font-size="8.5" text-anchor="middle" font-family="monospace">CPU livre</text>
        <rect x="98" y="14" width="68" height="22" rx="4" fill="rgba(16,185,129,0.2)" stroke="#10b981"/><text x="132" y="28" fill="#ecfdf5" font-size="8.5" text-anchor="middle" font-family="monospace" font-weight="bold">Ctrl. DMA</text>
        <path d="M78 25h20" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="2 2"/>
        <rect x="16" y="44" width="76" height="20" rx="4" fill="#111c32" stroke="#22d3ee"/><text x="54" y="57" fill="#e2e8f0" font-size="8.5" text-anchor="middle" font-family="monospace">Periférico</text>
        <rect x="174" y="44" width="70" height="20" rx="4" fill="#111c32" stroke="#22d3ee"/><text x="209" y="57" fill="#e2e8f0" font-size="8.5" text-anchor="middle" font-family="monospace">RAM</text>
        <path d="M92 54h82" stroke="#10b981" stroke-width="2.2"/>
      </svg>`
    }
  ];
  const QUIZ_QUESTIONS = [
    {
      topic: "ULA, UC e Registradores",
      question: "No exemplo da instrução ADD 2, 2 citado no livro didático, qual registrador guarda o endereço da próxima instrução e qual deles recebe o número 4 após a soma?",
      options: [
        "Contador de Programa (PC) guarda o endereço da próxima instrução; Acumulador recebe o 4.",
        "Registrador de Instrução guarda o endereço da próxima instrução; ULA armazena o 4 permanentemente.",
        "UC guarda o endereço da próxima instrução; Cache L1 recebe o 4.",
        "Acumulador guarda o endereço da próxima instrução; PC recebe o 4."
      ],
      correct: 0,
      wrongReasons: [
        "",
        "O Registrador de Instrução guarda a instrução atual (ADD 2, 2). A ULA apenas efetua o cálculo e não armazena resultados.",
        "A UC decodifica instruções e envia ordens, não sendo um registrador de endereçamento; quem recebe o resultado da conta é o Acumulador.",
        "Os papéis estão invertidos: o PC (Program Counter) aponta para a próxima instrução e o Acumulador armazena o resultado da operação."
      ],
      explanation: "Cap. 2.1 (p. 6 e 7): O Contador de Programa (PC) armazena o endereço da próxima instrução a ser buscada. A UC decodifica a instrução, a ULA calcula 2 + 2 = 4 e o Acumulador recebe o resultado final."
    },
    {
      topic: "Ciclo de Busca e Execução",
      question: "Qual é a sequência correta dos quatro passos do ciclo de instrução e qual é o efeito do sinal de RESET sobre o Contador de Programa (PC)?",
      options: [
        "Decodificar → Buscar → Executar → Guardar o resultado; o RESET apaga o conteúdo da Flash.",
        "Buscar → Decodificar → Executar → Guardar o resultado; o RESET zera o Contador de Programa (PC).",
        "Buscar → Executar → Decodificar → Guardar o resultado; o RESET limpa apenas os pinos analógicos.",
        "Executar → Buscar → Decodificar → Guardar o resultado; o RESET desliga o clock da placa."
      ],
      correct: 1,
      wrongReasons: [
        "Não se pode decodificar antes de buscar a instrução na memória, e a Flash é não volátil (não é apagada pelo reset).",
        "",
        "A UC precisa decodificar a instrução antes que ela possa ser executada pela ULA.",
        "A execução ocorre somente após a busca e a decodificação da instrução."
      ],
      explanation: "Cap. 2.2 (p. 8 e 9): O ciclo ocorre em 1. Buscar (fetch), 2. Decodificar (decode), 3. Executar (execute) e 4. Guardar o resultado (write back). O RESET zera o PC, fazendo a CPU buscar novamente a primeira instrução no endereço inicial."
    },
    {
      topic: "Classificação: Placa vs Chip",
      question: "Sobre a placa Arduino Uno e o chip preto ATmega328P presente nela, como o livro didático classifica cada um com exatidão?",
      options: [
        "Arduino Uno é um microprocessador porque contém memória cache e controlador de DMA embutidos.",
        "Arduino Uno é o nome da placa; o ATmega328P nela é um microcontrolador com CPU, Flash, RAM e EEPROM no mesmo chip, sem cache e sem DMA.",
        "O ATmega328P é um microprocessador genérico que depende de pentes de RAM externos soldados na placa.",
        "O Arduino Uno é um microcontrolador e o ATmega328P é o barramento de dados de 16 MHz."
      ],
      correct: 1,
      wrongReasons: [
        "Arduino Uno é a placa, não um microprocessador. Além disso, o ATmega328P não possui cache nem controlador de DMA.",
        "",
        "O ATmega328P é um microcontrolador: CPU, memórias e circuitos de entrada/saída ficam todos dentro do mesmo chip.",
        "ATmega328P é o circuito integrado (microcontrolador) da placa, não um barramento."
      ],
      explanation: "Cap. 3 (p. 10 e 11) e Cap. 3.1 (p. 12 e 13): 'Arduino é microcontrolador ou microprocessador? A resposta mais precisa é: nenhum dos dois. Arduino é o nome da placa. O chip preto no meio dela, o ATmega328P, é que é um microcontrolador.' Ele não tem cache nem DMA."
    },
    {
      topic: "Barramentos",
      question: "Durante a leitura de uma posição de memória, qual barramento é unidirecional (só sai da CPU) para indicar a localização e qual é bidirecional para trafegar o valor lido?",
      options: [
        "Barramento de controle (sai da CPU) e barramento de endereço (bidirecional).",
        "Barramento de dados (sai da CPU) e barramento de controle (bidirecional).",
        "Barramento de endereço (ONDE, só sai da CPU) e barramento de dados (O QUÊ, bidirecional).",
        "Barramento de endereço (vai e volta) e barramento de dados (só entra na CPU)."
      ],
      correct: 2,
      wrongReasons: [
        "O barramento de controle envia comandos (leitura/escrita, clock), enquanto o de endereço é que aponta a posição.",
        "Os papéis estão invertidos: endereço indica ONDE e dados transporta O QUÊ.",
        "",
        "O barramento de endereço sai exclusivamente da CPU (ela decide onde acessar); o de dados precisa ir e voltar para leitura e escrita."
      ],
      explanation: "Cap. 4 (p. 14): O barramento de endereço responde a 'ONDE?' (sai da CPU); o de dados responde a 'O QUÊ?' (bidirecional, trafega valores e instruções); e o de controle responde a 'QUANDO e COMO?'."
    },
    {
      topic: "Quantidade de Endereços (2ⁿ)",
      question: "Um computador possui barramento de dados de 8 bits e barramento de endereço de 11 fios. Quantas posições distintas de memória esse barramento alcança?",
      options: [
        "2⁸ = 256 posições.",
        "2¹¹ = 2.048 posições (equivalente aos 2 KB da RAM do Arduino Uno).",
        "2¹⁹ = 524.288 posições.",
        "11 × 8 = 88 posições."
      ],
      correct: 1,
      wrongReasons: [
        "Você utilizou os 8 bits do barramento de dados. O barramento de dados não entra no cálculo de quantidade de endereços.",
        "",
        "Não se somam os bits de dados aos de endereço no expoente.",
        "A relação de combinações binárias é exponencial (2ⁿ), e não uma multiplicação linear."
      ],
      explanation: "Cap. 4 (p. 14 e 15): Com n fios de endereço existem 2ⁿ combinações. Com 11 fios: 2¹¹ = 2.048 posições (tamanho exato da RAM do Arduino Uno: 2 KB = 2.048 bytes). A largura do barramento de dados não afeta o total de endereços."
    },
    {
      topic: "Memórias: Volátil vs Não Volátil",
      question: "Um programa grava a contagem de execuções do loop() em uma variável. Ao desconectar e reconectar o cabo USB, o programa permanece mas a contagem volta ao zero. Por quê?",
      options: [
        "O programa estava na RAM (não volátil) e a variável estava na Flash (volátil).",
        "O programa estava na memória Flash (não volátil) e a variável estava na memória RAM (volátil).",
        "A variável estava na EEPROM de 1 KB, que zera automaticamente ao desligar.",
        "O programa estava na Cache e a variável na memória ROM de fábrica."
      ],
      correct: 1,
      wrongReasons: [
        "As definições estão trocadas: a memória RAM é volátil e a memória Flash é não volátil.",
        "",
        "A EEPROM é não volátil (mantém dados sem energia); variáveis comuns do código residem na RAM.",
        "O chip ATmega328P do Arduino Uno não possui memória cache, e o sketch do usuário é gravado na Flash."
      ],
      explanation: "Cap. 5 (p. 16 e 17): Memória volátil (RAM) perde as variáveis quando a energia acaba. Memória não volátil (Flash de 32 KB no Uno) mantém o programa gravado mesmo sem alimentação."
    },
    {
      topic: "Hierarquia de Memória",
      question: "Ordene as quatro camadas da pirâmide de memória da MAIS RÁPIDA (topo) para a MAIS LENTA (base):",
      options: [
        "Cache → Registradores → RAM → Armazenamento (SSD/HD).",
        "RAM → Cache → Registradores → Armazenamento (SSD/HD).",
        "Registradores → Cache → RAM → Armazenamento (SSD/HD).",
        "Registradores → RAM → Cache → Armazenamento (SSD/HD)."
      ],
      correct: 2,
      wrongReasons: [
        "Os registradores ficam colados na ULA dentro da CPU e são ainda mais rápidos que a memória cache.",
        "A RAM fica na placa-mãe e é muito mais lenta do que a cache e os registradores.",
        "",
        "A memória cache fica dentro do processador e tem tempo de acesso bem mais veloz que a RAM."
      ],
      explanation: "Cap. 5.1 (p. 18 e 19): Da mais rápida para a mais lenta: Registradores (bytes, dentro da CPU) → Cache (KB a MB, dentro do chip) → RAM (GB, placa-mãe) → Armazenamento SSD/HD (centenas de GB a TB, não volátil)."
    },
    {
      topic: "DMA: Conceito e Função Real",
      question: "Ao transferir um arquivo grande de vídeo do pendrive para a memória RAM, qual é o papel real do controlador de DMA?",
      options: [
        "Definir prioridade máxima para o arquivo furar a fila dos outros dados do sistema operacional.",
        "Copiar os blocos diretamente entre o dispositivo e a RAM usando o barramento, deixando a CPU livre para outras tarefas.",
        "Substituir os pentes de memória RAM durante transferências pesadas.",
        "Multiplicar a frequência do clock da placa Arduino Uno durante leituras seriais."
      ],
      correct: 1,
      wrongReasons: [
        "Engano comum destacado no livro (Cap. 6): DMA não é caminho prioritário e os dados não furam fila; muda-se apenas quem faz o trabalho de cópia.",
        "",
        "A memória RAM continua recebendo os dados normalmente; o DMA apenas assume a tarefa de movimentação.",
        "O ATmega328P do Arduino Uno nem sequer tem controlador de DMA."
      ],
      explanation: "Cap. 6 (p. 20 e 21): A CPU apenas configura o controlador de DMA (origem, destino e tamanho). O controlador copia os blocos diretamente para a RAM pelo barramento e avisa à CPU quando terminar, deixando-a livre para computar."
    },
    {
      topic: "Período do Clock (P = 1/f)",
      question: "Um processador opera com frequência de clock f = 500 MHz. Aplicando a fórmula P = 1 ÷ f, qual é o período (duração de cada ciclo) em nanossegundos (ns)?",
      options: [
        "P = 0,5 ns",
        "P = 2 ns",
        "P = 5 ns",
        "P = 500 ns"
      ],
      correct: 1,
      wrongReasons: [
        "0,5 é a frequência convertida para GHz (500 MHz = 0,5 GHz), mas o período é o inverso: 1 ÷ 0,5.",
        "",
        "O cálculo correto é 1 ÷ 0,5 GHz = 2 ns, e não 5 ns.",
        "500 é o valor nominal da frequência em megahertz, não a duração do ciclo em nanossegundos."
      ],
      explanation: "Cap. 7 (p. 22): 1 GHz = 1.000 MHz, logo f = 500 MHz = 0,5 GHz. Com a frequência em GHz, o período sai direto em nanossegundos: P = 1 ÷ 0,5 = 2 ns."
    },
    {
      topic: "Tempo por Instrução (T = CPI × P)",
      question: "Compare o Processador X (500 MHz, CPI = 3) com o Processador Y (1 GHz, CPI = 8). Qual processador completa uma instrução em MENOS tempo?",
      options: [
        "Processador Y, porque clock de 1 GHz é sempre duas vezes mais rápido que 500 MHz.",
        "Processador X, pois leva T = 6 ns por instrução, contra T = 8 ns do Processador Y.",
        "Ambos empatam com exatamente 8 ns por instrução.",
        "Processador Y, pois leva T = 4 ns contra 6 ns do Processador X."
      ],
      correct: 1,
      wrongReasons: [
        "Erro clássico de avaliação: clock maior sozinho não garante desempenho se o número de ciclos por instrução (CPI) for muito alto.",
        "",
        "Para X: P = 2 ns e T = 3 × 2 ns = 6 ns. Para Y: P = 1 ns e T = 8 × 1 ns = 8 ns. Não há empate.",
        "No Processador Y: f = 1 GHz → P = 1 ns → T = 8 × 1 = 8 ns, e não 4 ns."
      ],
      explanation: "Cap. 7 (p. 22): Processador X: f = 0,5 GHz → P = 2 ns → T = 3 × 2 = 6 ns. Processador Y: f = 1 GHz → P = 1 ns → T = 8 × 1 = 8 ns. O Processador X termina a instrução antes mesmo com clock menor porque gasta menos ciclos."
    }
  ];
  const FLASHCARDS = [
    {
      tag: "CPU: ULA, UC e Registradores",
      front: "Qual o papel de cada uma das 3 partes internas da CPU?",
      back: "ULA: faz contas e operações lógicas (AND, OR, XOR, NOT). UC: lê a instrução, decodifica o que ela pede e envia ordens. Registradores: memórias minúsculas e ultrarrápidas dentro da CPU (Acumulador, PC e Registrador de Instrução)."
    },
    {
      tag: "Ciclo de Busca e Execução",
      front: "Quais são os 4 passos do ciclo e o que o botão RESET faz?",
      back: "1) Buscar na memória (fetch) → 2) Decodificar na UC (decode) → 3) Executar na ULA ou mover dado (execute) → 4) Guardar o resultado (write back). O RESET zera o Contador de Programa (PC), recomeçando da primeira instrução."
    },
    {
      tag: "Placa vs Microcontrolador",
      front: "Arduino Uno é microcontrolador ou microprocessador?",
      back: "Nenhum dos dois: Arduino Uno é a placa! O chip preto nela, o ATmega328P, é um microcontrolador (CPU 16 MHz, Flash 32 KB, RAM 2 KB, EEPROM 1 KB e pinos E/S). Ele não tem cache nem controlador de DMA."
    },
    {
      tag: "Barramentos",
      front: "Como diferenciar os 3 barramentos pelas perguntas que respondem?",
      back: "Endereço: ONDE? (sai da CPU, unidirecional). Dados: O QUÊ? (vai e volta, bidirecional, leva dados e instruções). Controle: QUANDO e COMO? (leitura/escrita, destino memória/ES e clock)."
    },
    {
      tag: "Endereçamento: 2ⁿ",
      front: "Como calcular a quantidade de endereços de um barramento?",
      back: "Com n fios no barramento de endereço existem 2ⁿ posições possíveis. Exemplo: 11 fios alcançam 2¹¹ = 2.048 posições (2 KB da RAM do Uno); 16 fios alcançam 65.536. O barramento de dados não entra na conta."
    },
    {
      tag: "Volátil vs Não Volátil",
      front: "Qual a diferença entre RAM, Flash e EEPROM no Arduino Uno?",
      back: "RAM (2 KB): volátil (perde o conteúdo sem energia; guarda as variáveis do loop). Flash (32 KB): não volátil e regravável (guarda o programa). EEPROM (1 KB): não volátil (guarda configurações)."
    },
    {
      tag: "Hierarquia de Memória",
      front: "Ordene a pirâmide de memória da mais rápida para a mais lenta.",
      back: "Registradores (bytes) → Cache (KB a MB) → RAM (GB) → Armazenamento SSD/HD (centenas de GB a TB). Quanto mais perto da CPU, mais rápida, menor e mais cara por byte."
    },
    {
      tag: "DMA",
      front: "O que o controlador de DMA faz e por que não é 'prioridade'?",
      back: "A CPU configura origem, destino e tamanho; o controlador copia blocos entre periférico e RAM pelo barramento e avisa quando termina. Não torna dados prioritários: ele apenas poupa a CPU do trabalho braçal de cópia."
    },
    {
      tag: "Período do Clock",
      front: "Como calcular o período P a partir da frequência f?",
      back: "P = 1 ÷ f. Dica do livro: com a frequência em GHz (1 GHz = 1.000 MHz), o período sai direto em nanossegundos (ns). Ex.: 500 MHz = 0,5 GHz → P = 1 ÷ 0,5 = 2 ns."
    },
    {
      tag: "Tempo por Instrução",
      front: "Como calcular T e por que clock maior não garante mais velocidade?",
      back: "T = CPI × P. Um processador de 1 GHz (P = 1 ns) com CPI = 8 leva 8 ns por instrução, sendo mais lento que um de 500 MHz (P = 2 ns) com CPI = 3 (que leva 6 ns)."
    }
  ];

  // Estado da aplicação com persistência de preferências de áudio
  const savedSound = localStorage.getItem("corequest_sound_enabled");
  const savedVolume = localStorage.getItem("corequest_volume");

  const state = {
    currentView: "home",
    gameMode: "help", // "help" ou "direct"
    gridValues: Array.from({ length: ROWS }, () => Array(COLS).fill("")),
    assignedChoices: {}, // wordId -> answerString
    wordStatuses: {}, // wordId -> 'unchecked' | 'correct' | 'wrong' | 'incomplete'
    unlockedWords: new Set(),
    activeRow: 0,
    activeCol: 0,
    activeDir: "H",
    soundEnabled: savedSound === "true", // Inicialmente falso por padrão (respeitando autoplay)
    volume: savedVolume !== null ? Math.min(1, Math.max(0, parseFloat(savedVolume))) : 0.6,
    quizIndex: 0,
    quizAnswers: {},
    audioCtx: null,
    audioMasterGain: null,
    draggedWordAnswer: null,
    selectedCardAnswer: null, // Para toque/clique no cartão antes de tocar na casa
    previewWord: null, // Palavra destacada durante o arraste
    flippedCards: new Set() // Índices dos flashcards virados
  };

  WORDS.forEach((w) => {
    state.wordStatuses[w.id] = "unchecked";
  });

  // Mapeamento bidirecional da grade
  const cellMap = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  const cellInputs = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  const cellStatusEls = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  WORDS.forEach((w) => {
    const dr = w.dir === "V" ? 1 : 0;
    const dc = w.dir === "H" ? 1 : 0;
    for (let i = 0; i < w.answer.length; i++) {
      const r = w.row + i * dr;
      const c = w.col + i * dc;
      if (!cellMap[r][c]) {
        cellMap[r][c] = { answerChar: w.answer[i], words: [], number: null };
      }
      cellMap[r][c].words.push(w);
      if (i === 0) {
        cellMap[r][c].number = w.num;
      }
    }
  });

  // -------------------------------------------------------------
  // UTILITÁRIOS DE TEXTO
  // -------------------------------------------------------------
  function normalizeLetter(raw) {
    if (!raw) return "";
    return raw
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(-1);
  }

  function normalizeWord(raw) {
    if (!raw) return "";
    return raw
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .replace(/[^A-Z]/g, "");
  }

  // -------------------------------------------------------------
  // CONTROLADOR DE ÁUDIO CENTRALIZADO (WEB AUDIO API PURA)
  // -------------------------------------------------------------
  function getAudioContext() {
    if (!state.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      state.audioCtx = new AudioCtx();
      state.audioMasterGain = state.audioCtx.createGain();
      state.audioMasterGain.gain.setValueAtTime(
        state.soundEnabled ? state.volume : 0,
        state.audioCtx.currentTime
      );
      state.audioMasterGain.connect(state.audioCtx.destination);
    }
    if (state.audioCtx.state === "suspended") {
      state.audioCtx.resume();
    }
    return state.audioCtx;
  }

  function setSoundEnabled(enabled) {
    state.soundEnabled = Boolean(enabled);
    try {
      localStorage.setItem("corequest_sound_enabled", String(state.soundEnabled));
    } catch (_) {}

    if (state.audioMasterGain && state.audioCtx) {
      state.audioMasterGain.gain.setValueAtTime(
        state.soundEnabled ? state.volume : 0,
        state.audioCtx.currentTime
      );
    }
    syncAudioUI();
    if (state.soundEnabled) {
      playSfx("switchView");
    }
  }

  function setVolume(vol) {
    const clamped = Math.min(1, Math.max(0, vol));
    state.volume = clamped;
    try {
      localStorage.setItem("corequest_volume", String(clamped));
    } catch (_) {}

    if (state.audioMasterGain && state.audioCtx && state.soundEnabled) {
      state.audioMasterGain.gain.setValueAtTime(clamped, state.audioCtx.currentTime);
    }
    syncAudioUI();
  }

  function syncAudioUI() {
    const isEnabled = state.soundEnabled;
    const volPercent = Math.round(state.volume * 100);

    const topbarBtn = document.getElementById("sound-toggle-topbar");
    if (topbarBtn) {
      topbarBtn.setAttribute("aria-pressed", String(isEnabled));
      const icon = topbarBtn.querySelector(".sound-icon");
      const lbl = topbarBtn.querySelector(".sound-label");
      if (icon) icon.textContent = isEnabled ? "🔊" : "🔇";
      if (lbl) lbl.textContent = isEnabled ? "Som: On" : "Som: Off";
    }

    const homeBtn = document.getElementById("sound-toggle-home");
    if (homeBtn) {
      homeBtn.setAttribute("aria-pressed", String(isEnabled));
      const icon = homeBtn.querySelector(".sound-icon");
      const lbl = homeBtn.querySelector(".sound-label");
      if (icon) icon.textContent = isEnabled ? "🔊" : "🔇";
      if (lbl) lbl.textContent = isEnabled ? "Som: On" : "Som: Off";
    }

    const chk = document.getElementById("toggle-audio-checkbox");
    if (chk) chk.checked = isEnabled;

    const slider = document.getElementById("volume-range");
    if (slider) slider.value = volPercent;

    const valTxt = document.getElementById("volume-val-txt");
    if (valTxt) valTxt.textContent = `${volPercent}%`;
  }

  function playTone(freq, duration = 0.08, type = "sine", vol = 0.04, delay = 0) {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx || !state.audioMasterGain) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + delay;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(vol, start + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      osc.connect(gain);
      gain.connect(state.audioMasterGain);

      osc.start(start);
      osc.stop(start + duration + 0.02);
    } catch (_) {}
  }

  function playFreqSweep(startFreq, endFreq, duration = 0.08, type = "sine", vol = 0.04, delay = 0) {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx || !state.audioMasterGain) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + delay;

      osc.type = type;
      osc.frequency.setValueAtTime(startFreq, start);
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), start + duration);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(vol, start + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      osc.connect(gain);
      gain.connect(state.audioMasterGain);

      osc.start(start);
      osc.stop(start + duration + 0.02);
    } catch (_) {}
  }

  let lastHoverSoundTime = 0;
  let lastDragSoundTime = 0;

  function playSfx(type) {
    if (!state.soundEnabled) return;

    switch (type) {
      case "hover": {
        const now = performance.now();
        if (now - lastHoverSoundTime < 80) return;
        lastHoverSoundTime = now;
        playTone(850, 0.025, "sine", 0.015);
        break;
      }
      case "btnClick":
        playFreqSweep(480, 720, 0.04, "sine", 0.03);
        break;
      case "switchView":
        playTone(380, 0.06, "sine", 0.025);
        playTone(570, 0.08, "sine", 0.025, 0.03);
        break;
      case "selectCell":
        playTone(520, 0.04, "sine", 0.02);
        break;
      case "typeKey":
        playFreqSweep(620, 780, 0.035, "triangle", 0.03);
        break;
      case "deleteKey":
        playFreqSweep(420, 260, 0.035, "sine", 0.025);
        break;
      case "dragPick":
        playFreqSweep(360, 520, 0.06, "sine", 0.03);
        break;
      case "dragEnter": {
        const now = performance.now();
        if (now - lastDragSoundTime < 120) return;
        lastDragSoundTime = now;
        playTone(480, 0.03, "sine", 0.018);
        break;
      }
      case "dropSnap":
        // Efeito neutro de encaixe: não revela se a resposta está certa ou errada
        playFreqSweep(340, 520, 0.06, "sine", 0.035);
        break;
      case "reject":
        // Encaixe incompatível ou conflito com palavra confirmada
        playTone(180, 0.07, "sawtooth", 0.03);
        playTone(140, 0.09, "sawtooth", 0.03, 0.06);
        break;
      case "check":
        // Varredura de conferência
        playTone(440, 0.05, "sine", 0.025);
        playTone(550, 0.05, "sine", 0.025, 0.04);
        playTone(660, 0.06, "sine", 0.025, 0.08);
        break;
      case "unlockComponent":
        // Componente energizado
        playFreqSweep(440, 880, 0.22, "sine", 0.04);
        playTone(880, 0.15, "triangle", 0.03, 0.1);
        break;
      case "error":
        playTone(260, 0.12, "sawtooth", 0.025);
        playTone(220, 0.14, "sawtooth", 0.025, 0.07);
        break;
      case "flashcardFlip":
        playFreqSweep(320, 480, 0.06, "sine", 0.025);
        break;
      case "quizCorrect":
        playTone(523, 0.08, "sine", 0.03);
        playTone(659, 0.08, "sine", 0.03, 0.06);
        playTone(784, 0.12, "sine", 0.035, 0.12);
        break;
      case "quizWrong":
        playTone(330, 0.08, "triangle", 0.025);
        playTone(220, 0.12, "triangle", 0.025, 0.06);
        break;
      case "reset":
        playFreqSweep(440, 220, 0.18, "sine", 0.03);
        break;
      case "victory": {
        // Sequência curta e triunfal de vitória
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          playTone(freq, 0.18, "sine", 0.035, idx * 0.09);
        });
        setTimeout(() => {
          playTone(1046.5, 0.35, "triangle", 0.04);
          playTone(1318.5, 0.35, "sine", 0.03);
        }, 380);
        break;
      }
      default:
        break;
    }
  }

  // -------------------------------------------------------------
  // NOTIFICAÇÕES E ALERTAS
  // -------------------------------------------------------------
  function showToast(msg) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }

  function showAlert(msg) {
    const alertEl = document.getElementById("crossword-alert");
    const textEl = document.getElementById("crossword-alert-text");
    textEl.textContent = msg;
    alertEl.hidden = false;
    playSfx("reject");
  }

  function hideAlert() {
    const alertEl = document.getElementById("crossword-alert");
    if (alertEl) alertEl.hidden = true;
  }

  // -------------------------------------------------------------
  // CONTROLE DE MODAIS
  // -------------------------------------------------------------
  function openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) {
      m.hidden = false;
      playSfx("switchView");
    }
  }

  function closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) {
      m.hidden = true;
      playSfx("btnClick");
    }
  }

  // -------------------------------------------------------------
  // LOCALIZAÇÃO E SELEÇÃO DE PALAVRAS
  // -------------------------------------------------------------
  function getWordAt(r, c, dir) {
    const info = cellMap[r]?.[c];
    if (!info) return null;
    return info.words.find((w) => w.dir === dir) || info.words[0] || null;
  }

  function getActiveWord() {
    return getWordAt(state.activeRow, state.activeCol, state.activeDir);
  }

  function getWordCells(word) {
    const cells = [];
    const dr = word.dir === "V" ? 1 : 0;
    const dc = word.dir === "H" ? 1 : 0;
    for (let i = 0; i < word.answer.length; i++) {
      cells.push([word.row + i * dr, word.col + i * dc]);
    }
    return cells;
  }

  function hasAnyProgress() {
    return state.gridValues.some((row) => row.some((ch) => ch !== ""));
  }

  function switchView(target) {
    state.currentView = target;

    // A barra superior fica oculta no menu inicial para criar uma experiência de jogo imersiva
    const topbar = document.getElementById("game-topbar");
    if (topbar) {
      topbar.hidden = (target === "home");
    }

    document.querySelectorAll(".nav-btn").forEach((btn) => {
      const active = btn.dataset.view === target;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".view").forEach((v) => {
      v.hidden = v.id !== `view-${target}`;
    });

    if (target === "crossword") {
      updateSelectionUI();
      refreshBoardStatusUI();
      renderWordBank();
      if (cellInputs[state.activeRow]?.[state.activeCol]) {
        cellInputs[state.activeRow][state.activeCol].focus();
      }
    } else if (target === "home") {
      updateHomeSessionCard();
    } else if (target === "lab") {
      renderLabCards();
      updateLabSchematic();
    } else if (target === "glossary") {
      renderGlossary();
    }
  }

  function setGameMode(mode) {
    state.gameMode = mode;
    document.getElementById("btn-mode-help").classList.toggle("is-active", mode === "help");
    document.getElementById("btn-mode-help").setAttribute("aria-pressed", String(mode === "help"));
    document.getElementById("btn-mode-direct").classList.toggle("is-active", mode === "direct");
    document.getElementById("btn-mode-direct").setAttribute("aria-pressed", String(mode === "direct"));

    const bankPanel = document.getElementById("word-bank-section");
    if (bankPanel) {
      bankPanel.hidden = mode !== "help";
    }
    clearCardSelection();
  }

  function updateHomeSessionCard() {
    const hasProgress = hasAnyProgress();
    const correctCount = WORDS.filter((w) => state.wordStatuses[w.id] === "correct").length;
    const filledLetters = state.gridValues.flat().filter((ch) => ch !== "").length;

    const continueBtn = document.getElementById("btn-menu-continue");
    const playText = document.getElementById("btn-menu-play-text");
    const footerText = document.getElementById("menu-footer-text");

    if (continueBtn) {
      continueBtn.hidden = !hasProgress;
    }

    if (playText) {
      playText.textContent = hasProgress ? "Nova Partida" : "Jogar";
    }

    if (footerText) {
      if (hasProgress) {
        footerText.innerHTML = `Partida em andamento: <strong>${correctCount} de 14</strong> palavras confirmadas (${filledLetters} letras preenchidas). Clique em <strong>Continuar Partida</strong> para retomar.`;
      } else {
        footerText.innerHTML = `Nenhuma letra preenchida ainda. Clique em <strong>Jogar</strong> para começar!`;
      }
    }
  }

  // -------------------------------------------------------------
  // RESOLUÇÃO DE DESTINO NA CASA DO TABULEIRO
  // -------------------------------------------------------------
  function resolveTargetWord(r, c, cardAnswer, onResolved) {
    const cellInfo = cellMap[r]?.[c];
    if (!cellInfo || !cellInfo.words || cellInfo.words.length === 0) return;

    const clean = normalizeWord(cardAnswer);

    // Caso 1: A casa pertence a apenas uma palavra
    if (cellInfo.words.length === 1) {
      onResolved(cellInfo.words[0]);
      return;
    }

    // Caso 2: A casa é um cruzamento (pertence a duas palavras)
    const matchingWords = cellInfo.words.filter((w) => w.answer.length === clean.length);

    // Se apenas uma direção comportar a quantidade de letras do cartão
    if (matchingWords.length === 1) {
      onResolved(matchingWords[0]);
      return;
    }

    // Se as duas comportam o mesmo tamanho ou nenhuma comporta
    showIntersectionDialog(cellInfo.words, clean, onResolved);
  }

  function showIntersectionDialog(words, cleanAnswer, onResolved) {
    const dialog = document.getElementById("intersection-dialog");
    const btnsContainer = document.getElementById("intersection-btns");
    btnsContainer.innerHTML = "";

    words.forEach((w) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-primary btn-sm";
      const dirLabel = w.dir === "H" ? "Horizontal" : "Vertical";
      btn.textContent = `${dirLabel} (${w.num}${w.dir} - ${w.answer.length} letras)`;
      btn.addEventListener("click", () => {
        dialog.hidden = true;
        onResolved(w);
      });
      btnsContainer.appendChild(btn);
    });

    dialog.hidden = false;
  }

  // -------------------------------------------------------------
  // CONSTRUÇÃO DO TABULEIRO
  // -------------------------------------------------------------
  function buildGrid() {
    const gridEl = document.getElementById("crossword-grid");
    gridEl.innerHTML = "";

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const info = cellMap[r][c];
        if (!info) {
          const blank = document.createElement("div");
          blank.className = "cw-cell is-empty";
          blank.setAttribute("aria-hidden", "true");
          gridEl.appendChild(blank);
          continue;
        }

        const wrap = document.createElement("div");
        wrap.className = "cw-cell is-letter";
        wrap.dataset.row = String(r);
        wrap.dataset.col = String(c);

        if (info.number) {
          const numEl = document.createElement("span");
          numEl.className = "cw-num cw-cell-num";
          numEl.textContent = String(info.number);
          wrap.appendChild(numEl);
        }

        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.className = "cw-input";
        input.autocomplete = "off";
        input.autocorrect = "off";
        input.autocapitalize = "characters";
        input.spellcheck = false;
        input.setAttribute("data-form-type", "other");
        input.setAttribute("data-1p-ignore", "true");
        input.setAttribute("data-lpignore", "true");
        input.setAttribute("name", `cw_${r}_${c}`);
        input.dataset.row = String(r);
        input.dataset.col = String(c);

        const wordLabels = info.words.map((w) => `${w.num}${w.dir}`).join(" e ");
        input.setAttribute("aria-label", `Linha ${r + 1}, coluna ${c + 1}, cruzamento ${wordLabels}`);

        // Clique/toque na casa
        input.addEventListener("click", (e) => {
          if (state.selectedCardAnswer) {
            e.preventDefault();
            const chosen = state.selectedCardAnswer;
            resolveTargetWord(r, c, chosen, (targetWord) => {
              assignWordToTarget(targetWord, chosen);
              clearCardSelection();
            });
            return;
          }

          if (state.activeRow === r && state.activeCol === c && info.words.length > 1) {
            e.preventDefault();
            toggleDirectionAt(r, c);
            input.focus();
          }
        });

        input.addEventListener("focus", () => {
          selectCell(r, c);
        });

        // Drag and Drop direto sobre as casas do tabuleiro
        wrap.addEventListener("dragover", (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";

          const cardAnswer = state.draggedWordAnswer || e.dataTransfer.getData("text/plain");
          if (!cardAnswer) return;

          let targetWord = info.words.find((w) => w.answer.length === cardAnswer.length);
          if (!targetWord) {
            targetWord = info.words.find((w) => w.dir === state.activeDir) || info.words[0];
          }

          setDropPreview(targetWord);
        });

        wrap.addEventListener("dragleave", (e) => {
          if (!wrap.contains(e.relatedTarget)) {
            clearDropPreview();
          }
        });

        wrap.addEventListener("drop", (e) => {
          e.preventDefault();
          clearDropPreview();
          const cardAnswer = e.dataTransfer.getData("text/plain") || state.draggedWordAnswer;
          if (!cardAnswer) return;

          resolveTargetWord(r, c, cardAnswer, (targetWord) => {
            assignWordToTarget(targetWord, cardAnswer);
          });
        });

        input.addEventListener("input", (e) => {
          const letter = normalizeLetter(e.target.value);
          e.target.value = letter;
          if (letter) {
            setCellLetter(r, c, letter);
            playSfx("typeKey");
            advanceCursor(r, c);
          } else {
            setCellLetter(r, c, "");
          }
        });

        input.addEventListener("keydown", (e) => {
          if (e.key === " ") {
            e.preventDefault();
            toggleDirectionAt(r, c);
            return;
          }
          if (e.key === "Backspace") {
            e.preventDefault();
            if (state.gridValues[r][c]) {
              setCellLetter(r, c, "");
              playSfx("deleteKey");
            } else {
              retreatAndClear(r, c);
            }
            return;
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            moveArrow(r, c, 0, 1, "H");
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            moveArrow(r, c, 0, -1, "H");
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            moveArrow(r, c, 1, 0, "V");
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            moveArrow(r, c, -1, 0, "V");
          }
        });

        wrap.appendChild(input);
        wrap.appendChild(statusBadge(r, c));
        gridEl.appendChild(wrap);
        cellInputs[r][c] = input;
      }
    }
  }

  function setDropPreview(word) {
    if (!word || state.previewWord === word) return;
    state.previewWord = word;
    clearDropPreview(false);

    playSfx("dragEnter");

    const cells = getWordCells(word);
    cells.forEach(([r, c]) => {
      const inp = cellInputs[r]?.[c];
      if (inp) inp.classList.add("is-drop-preview");
    });

    // Mostra a pista temporariamente durante o arraste
    document.getElementById("active-clue-badge").textContent = `${word.num}${word.dir}`;
    document.getElementById("active-clue-len").textContent = `${word.answer.length} letras`;
    document.getElementById("active-clue-text").textContent = word.clue;
  }

  function clearDropPreview(revertClue = true) {
    document.querySelectorAll(".cw-input.is-drop-preview").forEach((el) => {
      el.classList.remove("is-drop-preview");
    });
    state.previewWord = null;
    if (revertClue) {
      updateSelectionUI();
    }
  }

  function statusBadge(r, c) {
    const badge = document.createElement("span");
    badge.className = "cw-cell-status";
    badge.setAttribute("aria-hidden", "true");
    cellStatusEls[r][c] = badge;
    return badge;
  }

  function selectCell(r, c) {
    state.activeRow = r;
    state.activeCol = c;
    const info = cellMap[r]?.[c];
    if (info && !info.words.some((w) => w.dir === state.activeDir)) {
      state.activeDir = info.words[0].dir;
    }
    updateSelectionUI();
  }

  function toggleDirectionAt(r, c) {
    const info = cellMap[r]?.[c];
    if (!info || info.words.length < 2) return;
    state.activeDir = state.activeDir === "H" ? "V" : "H";
    updateSelectionUI();
    playSfx("selectCell");
  }

  function setCellLetter(r, c, letter) {
    state.gridValues[r][c] = letter;
    if (cellInputs[r]?.[c]) {
      cellInputs[r][c].value = letter;
    }
    const info = cellMap[r]?.[c];
    if (info) {
      info.words.forEach((w) => {
        if (state.wordStatuses[w.id] !== "unchecked") {
          state.wordStatuses[w.id] = "unchecked";
        }
      });
    }
    refreshBoardStatusUI();
    updateHomeSessionCard();
  }

  function advanceCursor(r, c) {
    const dr = state.activeDir === "V" ? 1 : 0;
    const dc = state.activeDir === "H" ? 1 : 0;
    const nr = r + dr;
    const nc = c + dc;
    if (nr < ROWS && nc < COLS && cellMap[nr]?.[nc]) {
      selectCell(nr, nc);
      cellInputs[nr][nc].focus();
    }
  }

  function retreatAndClear(r, c) {
    const dr = state.activeDir === "V" ? 1 : 0;
    const dc = state.activeDir === "H" ? 1 : 0;
    const pr = r - dr;
    const pc = c - dc;
    if (pr >= 0 && pc >= 0 && cellMap[pr]?.[pc]) {
      selectCell(pr, pc);
      setCellLetter(pr, pc, "");
      cellInputs[pr][pc].focus();
      playSfx("deleteKey");
    }
  }

  function moveArrow(r, c, dr, dc, preferredDir) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && cellMap[nr]?.[nc]) {
      if (preferredDir) state.activeDir = preferredDir;
      selectCell(nr, nc);
      cellInputs[nr][nc].focus();
      playSfx("selectCell");
    }
  }

  // -------------------------------------------------------------
  // BANCO DE PALAVRAS (MODO COM AJUDA)
  // -------------------------------------------------------------
  function renderWordBank() {
    const container = document.getElementById("word-bank-cards");
    if (!container) return;
    container.innerHTML = "";

    const assignedSet = new Set(Object.values(state.assignedChoices));

    // Embaralha para não coincidir com a ordem das perguntas
    const shuffled = [...WORDS].sort((a, b) => a.display.localeCompare(b.display));

    shuffled.forEach((w) => {
      const isAssigned = assignedSet.has(w.answer);
      const isSelected = state.selectedCardAnswer === w.answer;

      const card = document.createElement("button");
      card.type = "button";
      card.className = "word-card";
      if (isAssigned) card.classList.add("is-assigned");
      if (isSelected) card.classList.add("is-selected-card");

      card.draggable = !isAssigned;
      card.dataset.answer = w.answer;
      card.dataset.display = w.display;

      card.innerHTML = `
        <span class="word-card-text">${w.display}</span>
        <span class="word-card-len">(${w.answer.length})</span>
      `;

      // Drag and Drop: arrastar diretamente para o tabuleiro
      card.addEventListener("dragstart", (e) => {
        if (isAssigned) {
          e.preventDefault();
          return;
        }
        state.draggedWordAnswer = w.answer;
        e.dataTransfer.setData("text/plain", w.answer);
        e.dataTransfer.effectAllowed = "copy";
        card.classList.add("is-dragging");
        playSfx("dragPick");
      });

      card.addEventListener("dragend", () => {
        card.classList.remove("is-dragging");
        state.draggedWordAnswer = null;
        clearDropPreview();
      });

      // Toque / Clique acessível
      card.addEventListener("click", () => {
        if (isAssigned) return;

        if (state.selectedCardAnswer === w.answer) {
          clearCardSelection();
          return;
        }

        clearCardSelection();
        state.selectedCardAnswer = w.answer;
        card.classList.add("is-selected-card");
        playSfx("selectCell");

        showToast(`"${w.display}" selecionada. Toque na casa de destino na cruzadinha.`);
      });

      container.appendChild(card);
    });
  }

  function clearCardSelection() {
    state.selectedCardAnswer = null;
    document.querySelectorAll(".word-card.is-selected-card").forEach((c) => {
      c.classList.remove("is-selected-card");
    });
  }

  // -------------------------------------------------------------
  // ATRIBUIÇÃO E REMOÇÃO DE PALAVRAS NO TABULEIRO
  // -------------------------------------------------------------
  function assignWordToTarget(targetWord, chosenAnswer) {
    hideAlert();
    const cleanWord = normalizeWord(chosenAnswer);

    // 1. Verificação de tamanho
    if (cleanWord.length !== targetWord.answer.length) {
      showAlert(
        `A palavra "${chosenAnswer}" tem ${cleanWord.length} letras, mas a posição ${targetWord.num}${targetWord.dir} exige exatamente ${targetWord.answer.length} letras.`
      );
      return;
    }

    // 2. Verificação de conflito em cruzamentos confirmados como corretos
    const cells = getWordCells(targetWord);
    for (let i = 0; i < cells.length; i++) {
      const [r, c] = cells[i];
      const otherWords = cellMap[r][c].words.filter((w) => w.id !== targetWord.id);
      for (const ow of otherWords) {
        if (state.wordStatuses[ow.id] === "correct") {
          const currentCellChar = state.gridValues[r][c];
          if (cleanWord[i] !== currentCellChar) {
            showAlert(
              `Conflito no cruzamento com a palavra confirmada ${ow.num}${ow.dir} (letra "${currentCellChar}"). A palavra "${chosenAnswer}" tem a letra "${cleanWord[i]}" nessa posição. O tabuleiro não foi alterado.`
            );
            return;
          }
        }
      }
    }

    // Vincula a palavra à posição
    state.assignedChoices[targetWord.id] = cleanWord;

    // Preenche as letras na grade e aplica animação letter-pop
    for (let i = 0; i < cells.length; i++) {
      const [r, c] = cells[i];
      setCellLetter(r, c, cleanWord[i]);
      const inp = cellInputs[r]?.[c];
      if (inp) {
        inp.classList.remove("letter-pop");
        void inp.offsetWidth; // Dispara reflow
        inp.classList.add("letter-pop");
        setTimeout(() => inp.classList.remove("letter-pop"), 350);
      }
    }

    state.wordStatuses[targetWord.id] = "unchecked";

    // Atualiza direção e seleção para a palavra preenchida
    state.activeRow = targetWord.row;
    state.activeCol = targetWord.col;
    state.activeDir = targetWord.dir;

    playSfx("dropSnap"); // Efeito neutro de encaixe
    renderWordBank();
    buildClues();
    updateSelectionUI();
    refreshBoardStatusUI();
    showToast(`"${chosenAnswer}" colocada na posição ${targetWord.num}${targetWord.dir}!`);
  }

  function removeChoiceFromWord(word) {
    hideAlert();
    delete state.assignedChoices[word.id];
    state.wordStatuses[word.id] = "unchecked";

    const cells = getWordCells(word);
    cells.forEach(([r, c]) => {
      const crossingWords = cellMap[r][c].words.filter((w) => w.id !== word.id);
      const hasOtherFilled = crossingWords.some((w) => {
        const otherCells = getWordCells(w);
        return otherCells.some(([or, oc]) => state.gridValues[or][oc] !== "");
      });

      if (!hasOtherFilled) {
        setCellLetter(r, c, "");
      }
    });

    playSfx("deleteKey");
    renderWordBank();
    buildClues();
    refreshBoardStatusUI();
    updateSelectionUI();
    showToast(`Palavra removida de ${word.num}${word.dir}.`);
  }

  // -------------------------------------------------------------
  // LISTA DE PISTAS (HORIZONTAIS E VERTICAIS)
  // -------------------------------------------------------------
  function buildClues() {
    const horizList = document.getElementById("clues-horizontal");
    const vertList = document.getElementById("clues-vertical");
    horizList.innerHTML = "";
    vertList.innerHTML = "";

    WORDS.forEach((w) => {
      const li = document.createElement("li");
      li.style.listStyle = "none";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "clue-item";
      btn.dataset.wordId = w.id;
      btn.id = `clue-${w.id}`;

      const assignedAnswer = state.assignedChoices[w.id];
      const assignedBadge = assignedAnswer
        ? `<span class="clue-assigned-badge">${assignedAnswer}</span>`
        : "";

      btn.innerHTML = `
        <span class="clue-num">${w.num}${w.dir}</span>
        <span class="clue-main">${w.clue}</span>
        <span class="clue-len-badge">${w.answer.length}</span>
        ${assignedBadge}
      `;

      btn.addEventListener("click", () => {
        state.activeRow = w.row;
        state.activeCol = w.col;
        state.activeDir = w.dir;
        selectCell(w.row, w.col);
        if (cellInputs[w.row]?.[w.col]) {
          cellInputs[w.row][w.col].focus();
        }
        playSfx("selectCell");
      });

      li.appendChild(btn);

      if (w.dir === "H") horizList.appendChild(li);
      else vertList.appendChild(li);
    });
  }

  function updateSelectionUI() {
    const activeWord = getActiveWord();

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const input = cellInputs[r][c];
        if (!input) continue;
        input.classList.remove("is-active", "is-word-highlight");
      }
    }

    if (cellInputs[state.activeRow]?.[state.activeCol]) {
      cellInputs[state.activeRow][state.activeCol].classList.add("is-active");
    }

    if (activeWord) {
      const cells = getWordCells(activeWord);
      cells.forEach(([r, c]) => {
        if (cellInputs[r]?.[c]) {
          cellInputs[r][c].classList.add("is-word-highlight");
        }
      });

      document.getElementById("active-clue-badge").textContent = `${activeWord.num}${activeWord.dir}`;
      document.getElementById("active-clue-len").textContent = `${activeWord.answer.length} letras`;
      document.getElementById("active-clue-text").textContent = activeWord.clue;

      const clearBtn = document.getElementById("btn-clear-active-word");
      if (clearBtn) {
        clearBtn.hidden = !state.assignedChoices[activeWord.id];
      }

      const explainBox = document.getElementById("solved-explain-box");
      const explainTitle = document.getElementById("solved-word-title");
      const explainDesc = document.getElementById("solved-word-desc");

      if (state.wordStatuses[activeWord.id] === "correct") {
        explainBox.hidden = false;
        explainTitle.textContent = `${activeWord.display} (${activeWord.num}${activeWord.dir})`;
        explainDesc.textContent = activeWord.explanation;
      } else {
        explainBox.hidden = true;
      }
    }

    document.querySelectorAll(".clue-item").forEach((el) => {
      const isCurrent = activeWord && el.dataset.wordId === activeWord.id;
      el.classList.toggle("is-selected", Boolean(isCurrent));
    });
  }

  function showHelpForActiveWord() {
    const activeWord = getActiveWord();
    if (!activeWord) return;
    const box = document.getElementById("help-box");
    const contentEl = document.getElementById("help-box-content");
    contentEl.innerHTML = `<strong>Dica para ${activeWord.num}${activeWord.dir}:</strong> ${activeWord.hint}`;
    box.hidden = false;
    playSfx("selectCell");
  }

  function refreshBoardStatusUI() {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const input = cellInputs[r][c];
        const badge = cellStatusEls[r][c];
        if (!input) continue;

        input.classList.remove("is-correct", "is-wrong");
        if (badge) {
          badge.textContent = "";
          badge.className = "cw-cell-status";
        }

        const info = cellMap[r][c];
        if (!info) continue;

        const anyCorrect = info.words.some((w) => state.wordStatuses[w.id] === "correct");
        const anyWrong = info.words.some((w) => state.wordStatuses[w.id] === "wrong");

        if (anyCorrect) {
          input.classList.add("is-correct");
          if (badge) {
            badge.textContent = "✓";
            badge.classList.add("status-correct");
          }
        } else if (anyWrong) {
          input.classList.add("is-wrong");
          if (badge) {
            badge.textContent = "✕";
            badge.classList.add("status-wrong");
          }
        }
      }
    }

    document.querySelectorAll(".clue-item").forEach((btn) => {
      const wid = btn.dataset.wordId;
      const st = state.wordStatuses[wid];
      btn.classList.remove("is-correct", "is-wrong", "is-incomplete");
      if (st === "correct") btn.classList.add("is-correct");
      if (st === "wrong") btn.classList.add("is-wrong");
      if (st === "incomplete") btn.classList.add("is-incomplete");
    });
  }

  // -------------------------------------------------------------
  // CONFERÊNCIA E REINICIALIZAÇÃO
  // -------------------------------------------------------------
  function checkCrossword() {
    hideAlert();
    clearCardSelection();
    let correctCount = 0;
    let wrongCount = 0;
    let incompleteCount = 0;
    const newlyUnlocked = [];

    WORDS.forEach((w) => {
      const cells = getWordCells(w);
      const letters = cells.map(([r, c]) => state.gridValues[r][c]);
      if (letters.some((ch) => !ch)) {
        state.wordStatuses[w.id] = "incomplete";
        incompleteCount++;
      } else if (letters.join("") === w.answer) {
        state.wordStatuses[w.id] = "correct";
        correctCount++;
        if (!state.unlockedWords.has(w.answer)) {
          state.unlockedWords.add(w.answer);
          newlyUnlocked.push(w.answer);
        }
      } else {
        state.wordStatuses[w.id] = "wrong";
        wrongCount++;
      }
    });

    refreshBoardStatusUI();
    updateProgressState(newlyUnlocked);
    updateSelectionUI();

    const feedback = document.getElementById("check-feedback");
    feedback.textContent = `${correctCount} corretas • ${wrongCount} erradas • ${incompleteCount} incompletas`;

    if (correctCount === WORDS.length) {
      playSfx("victory");
      showToast("PARABÉNS! Sistema 100% restaurado!");
    } else if (newlyUnlocked.length > 0) {
      playSfx("unlockComponent");
      showToast(`Componente energizado: ${newlyUnlocked.join(", ")}!`);
    } else if (wrongCount > 0) {
      playSfx("error");
    } else {
      playSfx("check");
    }
  }

  function resetCrossword() {
    hideAlert();
    clearCardSelection();
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        state.gridValues[r][c] = "";
        if (cellInputs[r][c]) {
          cellInputs[r][c].value = "";
        }
      }
    }
    WORDS.forEach((w) => {
      state.wordStatuses[w.id] = "unchecked";
    });
    state.assignedChoices = {};
    state.unlockedWords.clear();

    document.getElementById("check-feedback").textContent = "";
    document.getElementById("help-box").hidden = true;
    document.getElementById("solved-explain-box").hidden = true;

    renderWordBank();
    buildClues();
    refreshBoardStatusUI();
    updateProgressState();
    updateHomeSessionCard();
    if (cellInputs[0]?.[0]) {
      cellInputs[0][0].focus();
    }
    playSfx("reset");
  }

  function updateProgressState(newlyUnlocked = []) {
    const correctWords = WORDS.filter((w) => state.wordStatuses[w.id] === "correct");
    const count = correctWords.length;
    const total = WORDS.length;
    const pct = Math.round((count / total) * 100);

    document.getElementById("score-counter").textContent = `${count} de ${total} palavras corretas`;
    document.getElementById("progress-fill").style.width = `${pct}%`;
    document.getElementById("lab-badge").textContent = `${state.unlockedWords.size}/${total}`;

    const csbTitle = document.getElementById("csb-progress-title");
    const csbBadge = document.getElementById("csb-state-badge");
    const victoryBanner = document.getElementById("victory-banner");

    if (csbTitle) csbTitle.textContent = `${count} de ${total}`;

    if (count === total) {
      csbBadge.textContent = "ONLINE";
      csbBadge.className = "csb-badge is-online";
      victoryBanner.hidden = false;
    } else if (count > 0) {
      csbBadge.textContent = `${pct}% ATIVO`;
      csbBadge.className = "csb-badge is-partial";
      victoryBanner.hidden = true;
    } else {
      csbBadge.textContent = "OFFLINE";
      csbBadge.className = "csb-badge";
      victoryBanner.hidden = true;
    }

    updateLabSchematic(newlyUnlocked);
    updateHomeSessionCard();
  }

  function updateLabSchematic(newlyUnlocked = []) {
    const activeAnswers = new Set(
      WORDS.filter((w) => state.wordStatuses[w.id] === "correct").map((w) => w.answer)
    );

    WORDS.forEach((w) => {
      const node = document.getElementById(`node-${w.answer}`);
      if (node) {
        const isOn = activeAnswers.has(w.answer);
        node.classList.toggle("is-active", isOn);
        node.classList.toggle("just-unlocked", newlyUnlocked.includes(w.answer));
      }
      const trace = document.getElementById(`trace-${w.answer}`);
      if (trace) {
        trace.classList.toggle("is-active", activeAnswers.has(w.answer));
      }
    });

    document.querySelectorAll(".svg-subtrace").forEach((el) => {
      el.classList.toggle("is-active", activeAnswers.has(el.dataset.node));
    });

    const statusEl = document.getElementById("lab-schematic-status");
    if (statusEl) {
      const count = activeAnswers.size;
      statusEl.textContent = count === 14
        ? "Todos os circuitos energizados! CPU, memórias e barramentos sincronizados com sucesso."
        : `Circuitos ativados: ${count} de 14. Confirme palavras na cruzadinha para energizar os demais blocos.`;
    }
  }

  // -------------------------------------------------------------
  // RESPOSTAS E EXPLICAÇÕES (GLOSSÁRIO)
  // -------------------------------------------------------------
  function renderGlossary() {
    const grid = document.getElementById("glossary-grid");
    if (!grid) return;
    grid.innerHTML = "";

    WORDS.forEach((w) => {
      const isUnlocked = state.unlockedWords.has(w.answer);
      const card = document.createElement("article");
      card.className = "glossary-card";

      card.innerHTML = `
        <div class="glossary-card-head">
          <span class="glossary-num">${w.num}${w.dir}</span>
          <span class="glossary-lbl">${w.category}</span>
          <span class="badge ${isUnlocked ? "badge-success" : ""}">${isUnlocked ? "Energizado" : "Pendente"}</span>
        </div>
        <h4 class="glossary-ans">${w.display} <span class="glossary-raw">(${w.answer})</span></h4>
        <p class="glossary-clue"><strong>Pista:</strong> "${w.clue}"</p>
        <p class="glossary-explain">${w.explanation}</p>
      `;
      grid.appendChild(card);
    });
  }

  // -------------------------------------------------------------
  // LABORATÓRIO (ESQUEMA TÉCNICO E CARTÕES DE COMPONENTES)
  // -------------------------------------------------------------
  function renderLabCards() {
    const grid = document.getElementById("lab-grid");
    if (!grid) return;
    grid.innerHTML = "";

    WORDS.forEach((w) => {
      const isUnlocked = state.unlockedWords.has(w.answer);
      const card = document.createElement("article");
      card.className = `lab-card ${isUnlocked ? "is-unlocked" : "is-locked"}`;

      card.innerHTML = `
        <div class="lab-card-head">
          <span class="lab-cat">${w.category}</span>
          <span class="badge ${isUnlocked ? "badge-success" : ""}">${isUnlocked ? "ONLINE" : "DESATIVADO"}</span>
        </div>
        <h4 class="lab-card-title">${w.display} (${w.num}${w.dir})</h4>
        <p class="lab-desc">${w.explanation}</p>
      `;
      grid.appendChild(card);
    });
  }

  // -------------------------------------------------------------
  // RECURSOS DIDÁTICOS DE REVISÃO (QUIZ E FLASHCARDS)
  // -------------------------------------------------------------
  function renderQuiz() {
    const q = QUIZ_QUESTIONS[state.quizIndex];
    document.getElementById("quiz-progress-text").textContent = `Questão ${state.quizIndex + 1} de ${QUIZ_QUESTIONS.length}`;

    // Calcula acertos
    const answeredKeys = Object.keys(state.quizAnswers);
    const score = answeredKeys.filter((idx) => state.quizAnswers[idx] === QUIZ_QUESTIONS[Number(idx)].correct).length;
    document.getElementById("quiz-score-text").textContent = `Acertos: ${score}/${answeredKeys.length}`;

    document.getElementById("quiz-topic").textContent = q.topic;
    document.getElementById("quiz-question").textContent = q.question;

    const optContainer = document.getElementById("quiz-options");
    optContainer.innerHTML = "";
    const feedbackBox = document.getElementById("quiz-explanation");
    feedbackBox.hidden = true;
    feedbackBox.textContent = "";

    const answered = state.quizAnswers[state.quizIndex] !== undefined;

    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option";
      btn.textContent = opt;

      if (answered) {
        btn.disabled = true;
        if (idx === q.correct) btn.classList.add("is-correct");
        if (state.quizAnswers[state.quizIndex] === idx && idx !== q.correct) {
          btn.classList.add("is-wrong");
        }
      }

      btn.addEventListener("click", () => {
        state.quizAnswers[state.quizIndex] = idx;
        const isCorrect = idx === q.correct;
        playSfx(isCorrect ? "quizCorrect" : "quizWrong");
        renderQuiz();
      });

      optContainer.appendChild(btn);
    });

    if (answered) {
      feedbackBox.hidden = false;
      const isCorrect = state.quizAnswers[state.quizIndex] === q.correct;
      feedbackBox.innerHTML = `<strong>${isCorrect ? "✓ Correto!" : "✕ Incorreto."}</strong> ${q.explanation}`;
    }

    document.getElementById("btn-quiz-prev").disabled = state.quizIndex === 0;
    document.getElementById("btn-quiz-next").disabled = state.quizIndex === QUIZ_QUESTIONS.length - 1;
  }

  function renderFlashcards() {
    const grid = document.getElementById("flashcards-grid");
    if (!grid) return;
    grid.innerHTML = "";

    FLASHCARDS.forEach((fc, idx) => {
      const isFlipped = state.flippedCards.has(idx);
      const card = document.createElement("button");
      card.type = "button";
      card.className = `flashcard ${isFlipped ? "is-flipped" : ""}`;
      card.setAttribute("aria-label", `Cartão ${idx + 1}: ${fc.tag}. Clique para virar.`);

      card.innerHTML = `
        <span class="flashcard-tag">${fc.tag}</span>
        <div class="flashcard-body">${isFlipped ? fc.back : fc.front}</div>
        <div class="flashcard-foot">${isFlipped ? "Clique para ver o conceito ↻" : "Clique para ver a síntese ↻"}</div>
      `;

      card.addEventListener("click", () => {
        if (state.flippedCards.has(idx)) {
          state.flippedCards.delete(idx);
        } else {
          state.flippedCards.add(idx);
        }
        playSfx("flashcardFlip");
        renderFlashcards();
      });

      grid.appendChild(card);
    });
  }

  // -------------------------------------------------------------
  // NAVEGAÇÃO E EVENTOS
  // -------------------------------------------------------------
  function setupNavigation() {
    // Navegação principal do Topbar
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        switchView(btn.dataset.view);
        playSfx("switchView");
      });
    });

    // -----------------------------------------------------------
    // BOTÕES DO MENU INICIAL (TELA DE JOGO)
    // -----------------------------------------------------------
    document.getElementById("btn-menu-play").addEventListener("click", () => {
      if (hasAnyProgress()) {
        openModal("modal-confirm-newgame");
      } else {
        switchView("crossword");
        playSfx("btnClick");
      }
    });

    document.getElementById("btn-menu-continue").addEventListener("click", () => {
      switchView("crossword");
      playSfx("btnClick");
    });

    document.getElementById("btn-menu-study").addEventListener("click", () => {
      switchView("study");
      playSfx("btnClick");
    });

    document.getElementById("btn-menu-howtoplay").addEventListener("click", () => {
      openModal("modal-howtoplay");
    });

    document.getElementById("btn-menu-settings").addEventListener("click", () => {
      openModal("modal-settings");
    });

    // -----------------------------------------------------------
    // MODAIS DE SUPORTE
    // -----------------------------------------------------------
    document.getElementById("btn-close-howtoplay").addEventListener("click", () => {
      closeModal("modal-howtoplay");
    });
    const howToPlayPlayBtn = document.getElementById("btn-howtoplay-play");
    if (howToPlayPlayBtn) {
      howToPlayPlayBtn.addEventListener("click", () => {
        closeModal("modal-howtoplay");
        switchView("crossword");
        playSfx("btnClick");
      });
    }

    document.getElementById("btn-close-settings").addEventListener("click", () => {
      closeModal("modal-settings");
    });
    document.getElementById("btn-save-settings").addEventListener("click", () => {
      closeModal("modal-settings");
      showToast("Configurações de som salvas com sucesso!");
    });
    document.getElementById("btn-open-settings-topbar").addEventListener("click", () => {
      openModal("modal-settings");
    });

    document.getElementById("toggle-audio-checkbox").addEventListener("change", (e) => {
      setSoundEnabled(e.target.checked);
    });
    document.getElementById("volume-range").addEventListener("input", (e) => {
      setVolume(Number(e.target.value) / 100);
    });

    document.getElementById("btn-close-confirm-new").addEventListener("click", () => {
      closeModal("modal-confirm-newgame");
    });
    document.getElementById("btn-cancel-newgame").addEventListener("click", () => {
      closeModal("modal-confirm-newgame");
      switchView("crossword");
      playSfx("btnClick");
    });
    document.getElementById("btn-proceed-newgame").addEventListener("click", () => {
      closeModal("modal-confirm-newgame");
      resetCrossword();
      switchView("crossword");
      playSfx("btnClick");
    });

    // -----------------------------------------------------------
    // CONTROLES DE ÁUDIO (TOPBAR E MENU INICIAL)
    // -----------------------------------------------------------
    const handleSoundToggle = () => {
      setSoundEnabled(!state.soundEnabled);
    };
    document.getElementById("sound-toggle-topbar").addEventListener("click", handleSoundToggle);
    document.getElementById("sound-toggle-home").addEventListener("click", handleSoundToggle);

    // -----------------------------------------------------------
    // MODOS DA CRUZADINHA (COM AJUDA / SEM AJUDA)
    // -----------------------------------------------------------
    document.getElementById("btn-mode-help").addEventListener("click", () => {
      setGameMode("help");
      playSfx("btnClick");
    });
    document.getElementById("btn-mode-direct").addEventListener("click", () => {
      setGameMode("direct");
      playSfx("btnClick");
    });

    // Atalhos
    document.getElementById("btn-quick-glossary").addEventListener("click", () => {
      switchView("glossary");
      playSfx("switchView");
    });
    document.getElementById("btn-back-to-crossword").addEventListener("click", () => {
      switchView("crossword");
      playSfx("switchView");
    });

    // Ajuda e alertas
    document.getElementById("btn-need-help").addEventListener("click", showHelpForActiveWord);
    document.getElementById("btn-close-help").addEventListener("click", () => {
      document.getElementById("help-box").hidden = true;
      playSfx("btnClick");
    });
    document.getElementById("btn-close-alert").addEventListener("click", hideAlert);
    document.getElementById("btn-cancel-intersection").addEventListener("click", () => {
      document.getElementById("intersection-dialog").hidden = true;
      clearCardSelection();
      playSfx("btnClick");
    });

    // Botão de remover palavra da pista ativa
    const clearBtn = document.getElementById("btn-clear-active-word");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        const word = getActiveWord();
        if (word) removeChoiceFromWord(word);
      });
    }

    // Subtabs de Estudo
    document.querySelectorAll(".subtab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.studyTab;
        document.querySelectorAll(".subtab-btn").forEach((b) => {
          const active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-selected", String(active));
        });
        document.getElementById("study-quiz").hidden = tab !== "quiz";
        document.getElementById("study-flashcards").hidden = tab !== "flashcards";
        playSfx("switchView");
      });
    });

    // Conferir / Reiniciar
    document.getElementById("btn-check").addEventListener("click", checkCrossword);
    document.getElementById("btn-reset").addEventListener("click", () => {
      if (hasAnyProgress()) {
        openModal("modal-confirm-newgame");
      } else {
        resetCrossword();
      }
    });

    // Quiz
    document.getElementById("btn-quiz-prev").addEventListener("click", () => {
      if (state.quizIndex > 0) {
        state.quizIndex--;
        renderQuiz();
        playSfx("btnClick");
      }
    });
    document.getElementById("btn-quiz-next").addEventListener("click", () => {
      if (state.quizIndex < QUIZ_QUESTIONS.length - 1) {
        state.quizIndex++;
        renderQuiz();
        playSfx("btnClick");
      }
    });
    document.getElementById("btn-quiz-restart").addEventListener("click", () => {
      state.quizAnswers = {};
      state.quizIndex = 0;
      renderQuiz();
      playSfx("reset");
    });

    // Hover acústico suave em botões e elementos interativos
    document.body.addEventListener("mouseover", (e) => {
      const el = e.target.closest(
        "button, .menu-btn, .nav-btn, .word-card, .quiz-option, .flashcard, .close-btn"
      );
      if (el) {
        playSfx("hover");
      }
    });
  }

  // -------------------------------------------------------------
  // INICIALIZAÇÃO
  // -------------------------------------------------------------
  buildGrid();
  buildClues();
  renderWordBank();
  setupNavigation();
  updateProgressState();
  renderQuiz();
  renderFlashcards();
  updateHomeSessionCard();
  syncAudioUI();
  setGameMode("help");
})();
