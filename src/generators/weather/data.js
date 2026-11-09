const WEATHER_TYPES = [
	'clear', 'cloudy', 'rain', 'storm', 'fog', 'cold', 'snow', 'heat', 'wind', 'unusual'
];

const WEATHER_PRESETS = [
	{
		icon: 'sun',
		temperatureC: 20,
		types: ['clear'],
		en: {
			condition: 'Clear skies',
			temperature: 'Pleasant and mild',
			precipitation: 'None',
			wind: 'A gentle breeze',
			visibility: 'Far horizons are crisp and clear',
			travel: 'Travel is comfortable; exposed roads offer little shelter.'
		},
		pt: {
			condition: 'Céu limpo',
			temperature: 'Agradável e amena',
			precipitation: 'Nenhuma',
			wind: 'Uma brisa suave',
			visibility: 'O horizonte vê-se com nitidez',
			travel: 'Viajar é confortável; as estradas expostas oferecem pouco abrigo.'
		}
	},
	{
		icon: 'cloud-sun',
		temperatureC: 25,
		types: ['clear', 'cloudy'],
		en: {
			condition: 'Bright sun and high clouds',
			temperature: 'Warm in the sun, cool in the shade',
			precipitation: 'None expected',
			wind: 'Light and variable',
			visibility: 'Good, though distant peaks fade into haze',
			travel: 'An easy day on the road, but keep water close at hand.'
		},
		pt: {
			condition: 'Sol forte e nuvens altas',
			temperature: 'Quente ao sol, fresca à sombra',
			precipitation: 'Não se espera',
			wind: 'Fraco e variável',
			visibility: 'Boa, embora os picos distantes se percam na bruma',
			travel: 'Um dia fácil para viajar, mas convém ter água à mão.'
		}
	},
	{
		icon: 'cloud',
		temperatureC: 14,
		types: ['cloudy'],
		en: {
			condition: 'Overcast and still',
			temperature: 'Cool and even',
			precipitation: 'A few stray drops may fall',
			wind: 'Almost none',
			visibility: 'The low cloud hides the tops of nearby hills',
			travel: 'The light is dull, but the roads remain firm and passable.'
		},
		pt: {
			condition: 'Céu encoberto e ar parado',
			temperature: 'Fresca e constante',
			precipitation: 'Podem cair alguns pingos dispersos',
			wind: 'Quase nenhum',
			visibility: 'As nuvens baixas escondem os cumes das colinas próximas',
			travel: 'A luz é baça, mas os caminhos continuam firmes e transitáveis.'
		}
	},
	{
		icon: 'cloud-drizzle',
		temperatureC: 12,
		types: ['rain', 'cloudy'],
		en: {
			condition: 'Passing showers',
			temperature: 'Cool, with sudden chills',
			precipitation: 'Brief showers come and go',
			wind: 'A shifting breeze',
			visibility: 'Clear between showers, blurred during them',
			travel: 'Cloaks and covered packs help; muddy ground may slow carts.'
		},
		pt: {
			condition: 'Aguaceiros passageiros',
			temperature: 'Fresca, com descidas súbitas',
			precipitation: 'Aguaceiros breves e intermitentes',
			wind: 'Uma brisa inconstante',
			visibility: 'Boa entre aguaceiros, reduzida durante os mesmos',
			travel: 'Capas e mochilas cobertas ajudam; a lama pode atrasar carroças.'
		}
	},
	{
		icon: 'cloud-rain',
		temperatureC: 9,
		types: ['rain', 'cloudy', 'cold'],
		en: {
			condition: 'Steady rain',
			temperature: 'Chilly and damp',
			precipitation: 'A persistent, soaking rain',
			wind: 'A cool breeze from the clouds',
			visibility: 'Grey rain softens everything at a distance',
			travel: 'Unpaved roads grow slick, and streams may begin to swell.'
		},
		pt: {
			condition: 'Chuva persistente',
			temperature: 'Fria e húmida',
			precipitation: 'Chuva contínua que encharca tudo',
			wind: 'Uma brisa fria vinda das nuvens',
			visibility: 'A chuva cinzenta difunde as formas ao longe',
			travel: 'Os caminhos de terra ficam escorregadios e os ribeiros podem subir.'
		}
	},
	{
		icon: 'cloud-rain',
		temperatureC: 8,
		types: ['rain', 'storm'],
		en: {
			condition: 'A hard downpour',
			temperature: 'Cold once soaked',
			precipitation: 'Torrential rain, with water running in the streets',
			wind: 'Strong gusts drive the rain sideways',
			visibility: 'Poor beyond a short bowshot',
			travel: 'Low ground floods quickly; seek shelter before crossing streams.'
		},
		pt: {
			condition: 'Chuva torrencial',
			temperature: 'Fria para quem fica encharcado',
			precipitation: 'Chuva intensa, com água a correr pelas ruas',
			wind: 'Rajadas fortes empurram a chuva de lado',
			visibility: 'Reduzida para lá do alcance de um tiro de arco curto',
			travel: 'As zonas baixas inundam depressa; procura abrigo antes de atravessar ribeiros.'
		}
	},
	{
		icon: 'cloud-lightning',
		temperatureC: 22,
		types: ['storm', 'rain'],
		en: {
			condition: 'Thunderstorm',
			temperature: 'Muggy before the storm, then sharply cooler',
			precipitation: 'Heavy rain in bursts',
			wind: 'Sudden gusts beneath dark, fast-moving clouds',
			visibility: 'Lightning briefly reveals the landscape',
			travel: 'Avoid exposed ridges and flooded crossings until the storm passes.'
		},
		pt: {
			condition: 'Trovoada',
			temperature: 'Abafada antes da tempestade, depois bem mais fresca',
			precipitation: 'Chuva intensa em rajadas',
			wind: 'Rajadas súbitas sob nuvens escuras e rápidas',
			visibility: 'Os relâmpagos revelam a paisagem por instantes',
			travel: 'Evita cumes expostos e passagens inundadas até a tempestade passar.'
		}
	},
	{
		icon: 'cloud-fog',
		temperatureC: 8,
		types: ['fog'],
		en: {
			condition: 'Dense morning fog',
			temperature: 'Cold and clammy',
			precipitation: 'Dew gathers on every surface',
			wind: 'Still air',
			visibility: 'Only nearby shapes are easy to make out',
			travel: 'Travellers can lose the road or one another; distant sounds carry strangely.'
		},
		pt: {
			condition: 'Nevoeiro matinal cerrado',
			temperature: 'Fria e húmida',
			precipitation: 'O orvalho acumula-se em todas as superfícies',
			wind: 'Ar parado',
			visibility: 'Só se distinguem bem as formas próximas',
			travel: 'É fácil perder o caminho ou o grupo; os sons distantes chegam deformados.'
		}
	},
	{
		icon: 'snowflake',
		temperatureC: -2,
		types: ['cold'],
		en: {
			condition: 'Frosty dawn',
			temperature: 'Bitterly cold before sunrise',
			precipitation: 'A thin frost coats the ground',
			wind: 'A cutting wind across open ground',
			visibility: 'Clear beneath a pale, cloudless sky',
			travel: 'Shallow water is frozen, and shaded paths are treacherously slick.'
		},
		pt: {
			condition: 'Madrugada gelada',
			temperature: 'Gélida antes do nascer do sol',
			precipitation: 'Uma fina camada de geada cobre o chão',
			wind: 'Um vento cortante em terreno aberto',
			visibility: 'Boa sob um céu pálido e sem nuvens',
			travel: 'A água pouco profunda está gelada e os caminhos à sombra são traiçoeiros.'
		}
	},
	{
		icon: 'cloud-snow',
		temperatureC: -4,
		types: ['cold', 'snow'],
		en: {
			condition: 'Gentle snowfall',
			temperature: 'Freezing but calm',
			precipitation: 'Soft flakes settle on the ground',
			wind: 'A light, cold breeze',
			visibility: 'Good, though the falling snow blurs distant details',
			travel: 'Tracks are easy to follow, but unprotected travellers lose heat quickly.'
		},
		pt: {
			condition: 'Queda de neve ligeira',
			temperature: 'Gelada, mas calma',
			precipitation: 'Flocos leves começam a cobrir o chão',
			wind: 'Uma brisa fria e ligeira',
			visibility: 'Boa, embora a neve difumine os detalhes distantes',
			travel: 'É fácil seguir pegadas, mas quem não se abrigar perde calor depressa.'
		}
	},
	{
		icon: 'wind',
		temperatureC: -12,
		types: ['cold', 'snow', 'storm'],
		en: {
			condition: 'Blizzard',
			temperature: 'Dangerously cold',
			precipitation: 'Heavy snow driven across the land',
			wind: 'Fierce, howling gusts',
			visibility: 'Nearly nothing beyond a few steps',
			travel: 'Roads and landmarks vanish under snow; finding shelter is urgent.'
		},
		pt: {
			condition: 'Nevasca',
			temperature: 'Perigosamente gelada',
			precipitation: 'Neve intensa arrastada pelo vento',
			wind: 'Rajadas ferozes e uivantes',
			visibility: 'Quase nula para lá de poucos passos',
			travel: 'Estradas e marcos desaparecem sob a neve; encontrar abrigo é urgente.'
		}
	},
	{
		icon: 'sun',
		temperatureC: 38,
		types: ['heat', 'clear'],
		en: {
			condition: 'Dry heat',
			temperature: 'Oppressively hot',
			precipitation: 'None; the air is parched',
			wind: 'A faint, warm breeze',
			visibility: 'Distant details shimmer in the heat',
			travel: 'Pace yourselves, seek shade at midday, and keep a close eye on water.'
		},
		pt: {
			condition: 'Calor seco',
			temperature: 'Opressivamente quente',
			precipitation: 'Nenhuma; o ar está muito seco',
			wind: 'Uma brisa ténue e quente',
			visibility: 'Os detalhes distantes tremem com o calor',
			travel: 'Avança com calma, procura sombra ao meio-dia e poupa a água.'
		}
	},
	{
		icon: 'wind',
		temperatureC: 35,
		types: ['wind', 'heat'],
		en: {
			condition: 'Dust-laden wind',
			temperature: 'Hot and drying',
			precipitation: 'No rain; dust hangs in the air',
			wind: 'Persistent gusts sweep across the ground',
			visibility: 'Dust obscures the horizon and stings the eyes',
			travel: 'Cover your face and secure loose gear; exposed fires are hard to keep lit.'
		},
		pt: {
			condition: 'Vento carregado de poeira',
			temperature: 'Quente e seca',
			precipitation: 'Sem chuva; há poeira suspensa no ar',
			wind: 'Rajadas persistentes varrem o terreno',
			visibility: 'A poeira esconde o horizonte e irrita os olhos',
			travel: 'Cobre o rosto e prende o equipamento; é difícil manter fogueiras acesas.'
		}
	},
	{
		icon: 'waves',
		temperatureC: 14,
		types: ['wind', 'rain'],
		en: {
			condition: 'Coastal gale',
			temperature: 'Cool and salt-laden',
			precipitation: 'Sea spray and occasional sheets of rain',
			wind: 'A powerful wind blows inland',
			visibility: 'Salt spray and cloud hide the far shore',
			travel: 'Small boats should stay ashore, and cliffs are hazardous in the gusts.'
		},
		pt: {
			condition: 'Temporal costeiro',
			temperature: 'Fresca e salgada',
			precipitation: 'Borrifo marítimo e cortinas ocasionais de chuva',
			wind: 'Um vento forte sopra para terra',
			visibility: 'O borrifo e as nuvens escondem a costa distante',
			travel: 'Os barcos pequenos devem ficar em terra e as arribas são perigosas com as rajadas.'
		}
	},
	{
		icon: 'cloud-fog',
		temperatureC: 24,
		types: ['unusual'],
		en: {
			condition: 'Ashfall',
			temperature: 'Unnaturally warm beneath a dim sky',
			precipitation: 'Fine grey ash drifts down',
			wind: 'A slow, erratic breeze',
			visibility: 'The sun is a dull red blur',
			travel: 'Ash coats tracks and water; breathing is uncomfortable without a cloth mask.'
		},
		pt: {
			condition: 'Queda de cinzas',
			temperature: 'Estranhamente quente sob um céu escurecido',
			precipitation: 'Cai uma fina camada de cinza',
			wind: 'Uma brisa lenta e irregular',
			visibility: 'O sol é uma mancha vermelha e baça',
			travel: 'A cinza cobre pegadas e água; respirar é difícil sem um pano sobre a boca.'
		}
	},
	{
		icon: 'sparkles',
		temperatureC: 10,
		types: ['unusual'],
		en: {
			condition: 'A strange, windless twilight',
			temperature: 'Cool, though the air feels charged',
			precipitation: 'A faint silvery mist beads on metal',
			wind: 'None; even banners hang still',
			visibility: 'The horizon glimmers with an unfamiliar light',
			travel: 'Animals are restless, and the unnatural stillness makes distant sounds carry.'
		},
		pt: {
			condition: 'Crepúsculo estranho e sem vento',
			temperature: 'Fresca, embora o ar pareça carregado',
			precipitation: 'Uma névoa prateada cobre o metal de gotas',
			wind: 'Nenhum; até os estandartes estão imóveis',
			visibility: 'O horizonte brilha com uma luz desconhecida',
			travel: 'Os animais estão inquietos e o silêncio estranho faz os sons distantes sobressaírem.'
		}
	}
];

module.exports = { WEATHER_PRESETS, WEATHER_TYPES };
