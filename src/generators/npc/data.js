const SPECIES = [
	'Aasimar', 'Dragonborn', 'Dwarf', 'Elf', 'Gnome',
	'Goliath', 'Halfling', 'Human', 'Orc', 'Tiefling'
];

const GENDERS = ['Woman', 'Man', 'Nonbinary', 'Genderfluid', 'Agender'];

const SKIN_DETAILS = {
	Aasimar: {
		looks: ['warm brown skin, smooth with a luminous sheen', 'deep brown skin, smooth with faint freckles', 'golden skin, softly pearlescent', 'olive skin, smooth and clear', 'fair skin, luminous and unmarked']
	},
	Dragonborn: {
		looks: ['copper-red scales, small and overlapping', 'bronze scales, broad and ridged', 'emerald-green scales, fine and pebbled', 'deep blue scales, smooth and tightly fitted', 'gold scales, edged with darker ridges']
	},
	Dwarf: {
		looks: ['ruddy skin, weathered', 'warm brown skin, freckled', 'deep brown skin, smooth with laugh lines', 'olive skin, coarse and sun-weathered', 'fair skin, lightly freckled']
	},
	Elf: {
		looks: ['pale skin, smooth with a silvery sheen', 'olive skin, smooth and clear', 'warm brown skin, faintly freckled', 'deep brown skin, smooth and luminous', 'coppery skin, fine-textured']
	},
	Gnome: {
		looks: ['rosy skin, smooth and freckled', 'warm brown skin, softly freckled', 'olive skin, smooth with laugh lines', 'deep brown skin, smooth and clear', 'fair skin, dusted with freckles']
	},
	Goliath: {
		looks: ['cool gray skin, broadly mottled', 'slate blue skin, marked with darker patches', 'pale lilac skin, pale and marbled', 'warm brown skin, stone-like mottling', 'deep brown skin, broadly mottled']
	},
	Halfling: {
		looks: ['rosy skin, lightly freckled', 'warm brown skin, smooth', 'olive skin, sun-weathered', 'deep brown skin, smooth and clear', 'fair skin, dotted with freckles']
	},
	Human: {
		looks: ['fair skin, smooth', 'olive skin, sun-weathered', 'coppery skin, lightly freckled', 'warm brown skin, smooth', 'deep brown skin, marked by old scars']
	},
	Orc: {
		looks: ['moss green skin, tough and pebbled', 'gray-green skin, darkly mottled', 'deep olive skin, rough with old scars', 'ashen gray skin, tough and pebbled']
	},
	Tiefling: {
		looks: ['crimson skin, smooth with glowing markings', 'copper skin, subtly ember-like', 'violet skin, smooth and clear', 'deep blue skin, faintly luminous', 'warm brown skin, smooth with glowing markings']
	}
};

const SPECIES_DETAILS = {
	Aasimar: { age: [18, 90], firstNames: ['Aurelia', 'Cassian', 'Dara', 'Ilyan', 'Mira', 'Sol', 'Tavian', 'Zora'], lastNames: ['Brightwell', 'Dawncrest', 'Evenstar', 'Goldhand', 'Sunmere', 'Trueheart'] },
	Dragonborn: { age: [15, 80], firstNames: ['Arjhan', 'Balasar', 'Donnar', 'Ghesh', 'Kava', 'Mishann', 'Rhogar', 'Tarhun'], lastNames: ['Clearsky', 'Dawnscale', 'Flamecrest', 'Ironhide', 'Stormwing', 'Sunglaive'] },
	Dwarf: { age: [18, 350], firstNames: ['Anika', 'Balin', 'Dagna', 'Edda', 'Fargrim', 'Helja', 'Rurik', 'Torbera'], lastNames: ['Battlehammer', 'Coppervein', 'Deepdelver', 'Ironfoot', 'Stonefist', 'Strongale'] },
	Elf: { age: [18, 750], firstNames: ['Adran', 'Aelar', 'Enna', 'Laucian', 'Mialee', 'Naivara', 'Soveliss', 'Thia'], lastNames: ['Amakiir', 'Galanodel', 'Holimion', 'Ilphelkiir', 'Liadon', 'Siannodel'] },
	Gnome: { age: [18, 425], firstNames: ['Alston', 'Bimpnottin', 'Carlin', 'Dimble', 'Eldeth', 'Lilli', 'Namfoodle', 'Zanna'], lastNames: ['Beren', 'Daergel', 'Folkor', 'Garrick', 'Nackle', 'Scheppen', 'Timbers', 'Turen'] },
	Goliath: { age: [18, 80], firstNames: ['Aukan', 'Eglath', 'Gae-Al', 'Ilikan', 'Keothi', 'Lo-Kag', 'Maveith', 'Thalai'], lastNames: ['Anakalathai', 'Elanithino', 'Gathakanathi', 'Katho-Olavi', 'Thuliaga', 'Vaimei-Laga'] },
	Halfling: { age: [18, 150], firstNames: ['Andry', 'Cora', 'Eldon', 'Lavinia', 'Merric', 'Osborn', 'Roscoe', 'Seraphina'], lastNames: ['Brushgather', 'Goodbarrel', 'Greenbottle', 'High-hill', 'Hilltopple', 'Tealeaf'] },
	Human: { age: [18, 90], firstNames: ['Amara', 'Bram', 'Elara', 'Jonas', 'Kestrel', 'Maren', 'Ronan', 'Tamsin'], lastNames: ['Ashford', 'Blackwood', 'Fairwind', 'Hawthorne', 'Rivers', 'Thornfield'] },
	Orc: { age: [14, 80], firstNames: ['Arha', 'Baggi', 'Dench', 'Emen', 'Gell', 'Henk', 'Shump', 'Thokk'], lastNames: ['Bloodmark', 'Fangbreaker', 'Ironjaw', 'Redtusk', 'Stonefury', 'Wolfslayer'] },
	Tiefling: { age: [18, 90], firstNames: ['Akmenos', 'Damaia', 'Kairon', 'Leucis', 'Melech', 'Mordai', 'Nemeia', 'Orianna'], lastNames: ['Ashenveil', 'Duskwalker', 'Emberfall', 'Nightsong', 'Redhand', 'Vexley'] }
};

const APPEARANCES = [
	'bright, watchful eyes', 'a weathered face and an easy smile',
	'a neat braid threaded with small charms', 'a collection of old scars',
	'ink-stained fingers', 'a carefully trimmed beard',
	'clothes mended with colorful thread', 'a polished brooch that looks well-loved',
	'a crooked nose and a confident grin', 'a cloak dusted with road grit',
	'one sleeve rolled higher than the other', 'a faint scent of cedar and smoke'
];

const CLOTHING = [
	'a travel-worn coat with bright brass buttons',
	'a carefully patched wool cloak over practical clothes',
	'a spotless apron with a dozen little pockets',
	'a formal jacket that has seen better days',
	'layered earth-toned clothes and sturdy boots',
	'a colorful scarf pinned with an old silver brooch',
	'soft leather gloves and a weatherproof hood',
	'a well-tailored outfit with one conspicuously mended sleeve',
	'a simple tunic embroidered with tiny flowers',
	'a heavy coat that smells faintly of woodsmoke'
];

const MANNERISMS = [
	'pause to consider every question', 'laugh at their own dry jokes',
	'never sit with their back to a door', 'greet strangers like old friends',
	'keep a running tally of small favors', 'whistle when nervous',
	'have a story for every scar', 'quietly hum while working',
	'ask thoughtful questions about everyone they meet',
	'have a habit of giving people memorable nicknames',
	'speak softly but never hesitate', 'can turn almost any conversation toward food'
];

const SPEECH_STYLES = [
	'a warm, unhurried cadence',
	'a crisp formality that softens when they laugh',
	'a low murmur and carefully chosen words',
	'a lively rhythm, as if every story is urgent',
	'a dry wit and a fondness for rhetorical questions',
	'a lilting cadence and an occasional local idiom',
	'a blunt directness, softened by a gentle tone',
	'a habit of pausing before the most important word'
];

const SPECIAL_TRAITS = [
	'they remember every face they have ever met',
	'a tiny brass key hangs from a ribbon around their wrist',
	'they can identify most herbs by scent alone',
	'they keep a little notebook of overheard sayings',
	'a tame mouse sometimes appears in their coat pocket',
	'they are an unexpectedly talented whistler',
	'they always carry a wrapped sweet to give to a child',
	'they know an old ballad with a verse for almost any occasion',
	'their shadow briefly points toward the nearest source of danger',
	'they never forget a promise once made'
];

const OCCUPATIONS = [
	'a caravan guide', 'an apprentice apothecary', 'a retired soldier',
	'a village storyteller', 'a traveling cook', 'a meticulous mapmaker',
	'a local messenger', 'a patient stablehand', 'a jewelry repairer',
	'a shrine caretaker', 'a river ferryperson', 'a collector of unusual rumors',
	'a village blacksmith', 'an armorer', 'a fletcher who makes arrows',
	'a bowyer', 'a village miller', 'a brewer', 'an innkeeper',
	'a village healer', 'a midwife', 'a gravedigger', 'a village reeve',
	'a local magistrate', 'a tax collector', 'a royal herald', 'a court scribe',
	'a translator of ancient texts', 'a temple acolyte', 'a wandering priest',
	'a battlefield medic', 'a monster hunter', 'a bounty hunter',
	'a caravan guard', 'a mercenary scout', 'a dungeon delver', 'a relic hunter',
	'a hedge wizard', 'an alchemist', "an enchanter's assistant",
	'a seller of charms and curios', 'a fortune-teller', 'a lighthouse keeper',
	'a beekeeper', 'a falconer', "a courier for the thieves' guild",
	'a smuggler', 'an undertaker', 'a traveling performer', 'a puppeteer',
	'a seller of maps and travel charts', 'a dungeon cartographer',
	'a trapmaker for adventuring parties', 'a magical item appraiser',
	'a seller of spell components', 'a curse-breaker', 'a monster naturalist',
	'a monster veterinarian', 'a relic appraiser', 'a dungeon salvage broker',
	'an adventurers guild quartermaster', 'a caravan quartermaster',
	'a rune carver', 'a siege engineer', 'a ship navigator',
	'a planar guide', 'a portal keeper', 'a wandering knight-errant',
	'a squire seeking a patron', 'a druidic trail guide',
	'a bardic chronicler', 'an exorcist for hire',
	'a keeper of the local bounty board'
];

const MOTIVATIONS = [
	'trying to repay an old debt', 'searching for a missing friend',
	'saving money to open a shop', 'hoping to learn who sent an anonymous letter',
	'looking for a place to finally settle down', 'trying to keep a family promise',
	'seeking a rare ingredient for someone they love',
	'quietly investigating a local mystery', 'longing to see the sea for the first time',
	'carrying a secret they are not ready to share'
];

const PORTUGUESE_TEXT = {
	appearances: [
		'uns olhos atentos e vivos', 'um rosto marcado pelo tempo e um sorriso fácil',
		'uma trança arranjada com pequenos amuletos', 'várias cicatrizes antigas',
		'dedos manchados de tinta', 'uma barba cuidadosamente aparada',
		'roupa remendada com linha colorida', 'um alfinete polido e muito estimado',
		'um nariz torto e um sorriso confiante', 'uma capa coberta de pó da estrada',
		'uma manga arregaçada mais do que a outra', 'um leve cheiro a cedro e fumo'
	],
	clothing: [
		'um casaco gasto pela viagem, com botões de latão brilhantes',
		'uma capa de lã remendada sobre roupa prática',
		'um avental impecável com uma dúzia de bolsos',
		'um casaco formal que já conheceu melhores dias',
		'roupa em tons de terra e botas resistentes',
		'um lenço colorido preso por um velho alfinete de prata',
		'luvas de couro macio e um capuz impermeável',
		'roupa bem cortada com uma manga remendada à vista',
		'uma túnica simples bordada com pequenas flores',
		'um casaco pesado com um leve cheiro a lenha queimada'
	],
	mannerisms: [
		'faz uma pausa para ponderar cada pergunta', 'ri-se das próprias piadas secas',
		'nunca se senta de costas para uma porta', 'cumprimenta estranhos como velhos amigos',
		'regista mentalmente todos os pequenos favores', 'assobia quando está nervoso',
		'tem uma história para cada cicatriz', 'trauteia enquanto trabalha',
		'faz perguntas ponderadas a todas as pessoas que conhece',
		'tem o hábito de dar alcunhas memoráveis', 'fala baixo, mas sem hesitar',
		'consegue levar quase qualquer conversa até à comida'
	],
	speechStyles: [
		'um ritmo caloroso e pausado',
		'uma formalidade nítida que se desfaz quando se ri',
		'um murmúrio grave e palavras escolhidas com cuidado',
		'um ritmo vivo, como se cada história fosse urgente',
		'um humor seco e gosto por perguntas retóricas',
		'uma cadência melodiosa e expressões locais ocasionais',
		'uma franqueza direta, suavizada por um tom gentil',
		'o hábito de fazer uma pausa antes da palavra mais importante'
	],
	specialTraits: [
		'não se esquece de nenhum rosto que tenha visto',
		'tem uma pequena chave de latão presa ao pulso por uma fita',
		'identifica a maioria das ervas apenas pelo cheiro',
		'anota num caderno as frases que ouve por acaso',
		'um rato domesticado aparece por vezes no bolso do casaco',
		'assobia com um talento inesperado',
		'traz sempre um doce embrulhado para oferecer a uma criança',
		'conhece uma velha cantiga com um verso para quase todas as ocasiões',
		'a sua sombra aponta por instantes para a fonte de perigo mais próxima',
		'nunca se esquece de uma promessa'
	],
	occupations: [
		'guia de caravanas', 'aprendiz numa botica', 'com experiência militar',
		'pessoa que conta histórias na aldeia', 'à frente de uma cozinha itinerante',
		'especialista em cartografia', 'pessoa mensageira local',
		'responsável pelos estábulos', 'responsável pela reparação de joias',
		'responsável por um santuário', 'a fazer travessias de barco no rio',
		'quem coleciona rumores invulgares', 'ferreiro de uma aldeia',
		'armeiro', 'fabricante de flechas', 'fabricante de arcos',
		'moleiro de uma aldeia', 'cervejeiro', 'estalajadeiro',
		'curandeiro de uma aldeia', 'parteira', 'coveiro',
		'representante de uma aldeia', 'magistrado local', 'cobrador de impostos',
		'arauto real', 'escrivão da corte', 'tradutor de textos antigos',
		'acólito de um templo', 'sacerdote itinerante', 'socorrista de campo de batalha',
		'caçador de monstros', 'caçador de recompensas', 'guarda de caravanas',
		'batedor mercenário', 'explorador de masmorras', 'caçador de relíquias',
		'mago autodidata', 'alquimista', 'assistente de um encantador',
		'vendedor de amuletos e curiosidades', 'adivinho', 'faroleiro',
		'apicultor', 'falcoeiro', 'correio da guilda dos ladrões',
		'contrabandista', 'agente funerário', 'artista itinerante',
		'mestre de marionetas', 'vendedor de mapas e cartas de navegação',
		'cartógrafo de masmorras', 'fabricante de armadilhas para grupos de aventureiros',
		'avaliador de objetos mágicos', 'vendedor de componentes para feitiços',
		'quebrador de maldições', 'estudioso de monstros',
		'veterinário de monstros', 'avaliador de relíquias',
		'negociante de salvados de masmorras', 'responsável pelo equipamento de uma guilda de aventureiros',
		'responsável pelo abastecimento de uma caravana', 'entalhador de runas',
		'engenheiro de cercos', 'navegador de navios', 'guia planar',
		'guardião de portais', 'cavaleiro errante', 'escudeiro à procura de patrono',
		'guia druídico por trilhos', 'cronista de feitos heroicos',
		'exorcista contratado', 'responsável pelo quadro de recompensas local'
	],
	motivations: [
		'a tentar saldar uma dívida antiga', 'à procura de uma pessoa amiga desaparecida',
		'a juntar dinheiro para abrir uma loja', 'na esperança de descobrir quem enviou uma carta anónima',
		'à procura de um lugar onde finalmente assentar', 'a tentar cumprir uma promessa de família',
		'à procura de um ingrediente raro para alguém que ama',
		'a investigar discretamente um mistério local', 'com vontade de ver o mar pela primeira vez',
		'a guardar um segredo que ainda não pode partilhar'
	],
	skinLooks: {
		Aasimar: ['pele castanha quente, lisa e com um brilho luminoso', 'pele castanha escura, lisa e com sardas ténues', 'pele dourada com um brilho nacarado', 'pele morena, lisa e uniforme', 'pele clara, luminosa e sem marcas'],
		Dragonborn: ['escamas vermelho-cobre, pequenas e sobrepostas', 'escamas de bronze, largas e estriadas', 'escamas verde-esmeralda, finas e rugosas', 'escamas azul-escuras, lisas e justas', 'escamas douradas com rebordos mais escuros'],
		Dwarf: ['pele rosada e curtida', 'pele castanha quente com sardas', 'pele castanha escura, lisa e marcada por rugas de expressão', 'pele morena, áspera e curtida pelo sol', 'pele clara com sardas discretas'],
		Elf: ['pele clara, lisa e com um brilho prateado', 'pele morena, lisa e uniforme', 'pele castanha quente com sardas ténues', 'pele castanha escura, lisa e luminosa', 'pele acobreada de textura fina'],
		Gnome: ['pele rosada, lisa e sardenta', 'pele castanha quente com sardas discretas', 'pele morena, lisa e marcada por rugas de expressão', 'pele castanha escura, lisa e uniforme', 'pele clara coberta de sardas'],
		Goliath: ['pele cinzenta fria com manchas largas', 'pele azul-ardósia marcada por zonas mais escuras', 'pele lilás-pálida com um padrão marmoreado', 'pele castanha quente com manchas pétreas', 'pele castanha escura com manchas largas'],
		Halfling: ['pele rosada com sardas discretas', 'pele castanha quente e lisa', 'pele morena curtida pelo sol', 'pele castanha escura, lisa e uniforme', 'pele clara salpicada de sardas'],
		Human: ['pele clara e lisa', 'pele morena curtida pelo sol', 'pele acobreada com sardas discretas', 'pele castanha quente e lisa', 'pele castanha escura marcada por cicatrizes antigas'],
		Orc: ['pele verde-musgo, áspera e granulosa', 'pele verde-acinzentada com manchas escuras', 'pele verde-azeitona escura, áspera e marcada por cicatrizes', 'pele cinzenta, áspera e granulosa'],
		Tiefling: ['pele carmesim, lisa e com marcas luminosas', 'pele acobreada com um subtil brilho de brasa', 'pele violeta, lisa e uniforme', 'pele azul-escura com um brilho ténue', 'pele castanha quente, lisa e com marcas luminosas']
	}
};

const PORTUGUESE_GENDERS = {
	Woman: 'Mulher',
	Man: 'Homem',
	Nonbinary: 'Não binário',
	Genderfluid: 'Género fluido',
	Agender: 'Agénero'
};

module.exports = {
	APPEARANCES,
	CLOTHING,
	GENDERS,
	MANNERISMS,
	MOTIVATIONS,
	OCCUPATIONS,
	PORTUGUESE_GENDERS,
	PORTUGUESE_TEXT,
	SKIN_DETAILS,
	SPECIAL_TRAITS,
	SPEECH_STYLES,
	SPECIES,
	SPECIES_DETAILS
};
