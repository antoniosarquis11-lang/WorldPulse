/* WorldPulse static MVP — Netlify-ready */
const state = {
  page: 'home',
  currentCountry: null,
  focusedCountry: null,
  search: '',
  countrySearch: '',
  category: 'All',
  layer: { cities: true, ports: true },
  countriesGeo: null,
  compareA: 'Singapore',
  compareB: 'Germany',
  story: null,
  storyLayer: 'quick',
  globeStory: null,
  globeStep: 0,
  tooltip: null,
  selectedItem: null
};

const categories = ['All','Development','Macro','Energy','Geopolitics','Logistics','Fintech','Industry'];
const globeTimers = {};
const remoteImageCache = new Map();
const remoteImagePending = new Map();
const cityTitleOverrides = {
  'Madrid':'Madrid',
  'Berlin':'Berlin',
  'Amsterdam':'Amsterdam',
  'Istanbul':'Istanbul',
  'Jakarta':'Jakarta',
  'Bangkok':'Bangkok',
  'Ho Chi Minh City':'Ho Chi Minh City',
  'Kuala Lumpur':'Kuala Lumpur',
  'Manila':'Manila',
  'Dhaka':'Dhaka',
  'Karachi':'Karachi',
  'Cairo':'Cairo',
  'Cape Town':'Cape Town',
  'Casablanca':'Casablanca',
  'Santiago':'Santiago',
  'Buenos Aires':'Buenos Aires',
  'Bogotá':'Bogotá',
  'Doha':'Doha',
  'Tehran':'Tehran',
  'Warsaw':'Warsaw',
  'Vienna':'Vienna',
  'Copenhagen':'Copenhagen',
  'Helsinki':'Helsinki',
  'Auckland':'Auckland',
  'Accra':'Accra',
  'New York':'New York City',
  'London':'London',
  'Paris':'Paris',
  'Singapore':'Singapore',
  'Shanghai':'Shanghai',
  'Shenzhen':'Shenzhen',
  'Tokyo':'Tokyo',
  'Seoul':'Seoul',
  'Dubai':'Dubai',
  'Riyadh':'Riyadh',
  'Mumbai':'Mumbai',
  'São Paulo':'São Paulo',
  'Lagos':'Lagos',
  'Nairobi':'Nairobi',
  'Mexico City':'Mexico City'
};
const portTitleOverrides = {
  'New York/New Jersey':'Port of New York and New Jersey',
  'Ho Chi Minh/Cat Lai':'Cat Lai Port',
  'Lagos/Apapa':'Apapa Port',
  'Tanger Med':'Tanger Med',
  'Ningbo-Zhoushan':'Port of Ningbo-Zhoushan',
  'Tanjung Pelepas':'Port of Tanjung Pelepas',
  'Port Klang':'Port Klang',
  'Laem Chabang':'Laem Chabang Port',
  'Manila Port':'Port of Manila',
  'Colombo':'Port of Colombo',
  'Mundra':'Mundra Port',
  'Chittagong':'Port of Chittagong',
  'Alexandria':'Port of Alexandria',
  'Mombasa':'Port of Mombasa',
  'Tema':'Tema Harbour',
  'Le Havre':'Port of Le Havre',
  'Valencia':'Port of Valencia',
  'Gioia Tauro':'Port of Gioia Tauro',
  'Algeciras':'Port of Algeciras',
  'Felixstowe':'Port of Felixstowe',
  'Vancouver':'Port of Vancouver',
  'Hong Kong':'Port of Hong Kong',
  'Qingdao':'Port of Qingdao',
  'Tianjin':'Port of Tianjin',
  'Kaohsiung':'Port of Kaohsiung',
  'Shanghai Port':'Port of Shanghai',
  'Singapore Port':'Port of Singapore',
  'Rotterdam':'Port of Rotterdam',
  'Los Angeles/Long Beach':'Port of Los Angeles',
  'Jebel Ali':'Jebel Ali Port',
  'Hamburg':'Port of Hamburg',
  'Busan':'Port of Busan',
  'Shenzhen/Yantian':'Yantian International Container Terminals',
  'Santos':'Port of Santos',
  'Durban':'Port of Durban',
  'Suez/Port Said':'Port Said',
  'Panama Canal':'Panama Canal',
  'Mumbai/JNPT':'Jawaharlal Nehru Port',
  'Piraeus':'Port of Piraeus',
  'Antwerp-Bruges':'Port of Antwerp-Bruges'
};
const countryPhotoQueries = {
  'United States':'New York skyline',
  'China':'Shanghai skyline',
  'Japan':'Tokyo skyline',
  'Germany':'Berlin skyline',
  'India':'Mumbai skyline',
  'United Kingdom':'London skyline',
  'France':'Paris skyline',
  'Italy':'Rome skyline',
  'Brazil':'Rio de Janeiro skyline',
  'Canada':'Toronto skyline',
  'Russia':'Moscow skyline',
  'Mexico':'Mexico City skyline',
  'South Korea':'Seoul skyline',
  'Australia':'Sydney skyline',
  'Spain':'Madrid skyline',
  'Indonesia':'Jakarta skyline',
  'Netherlands':'Amsterdam canals',
  'Saudi Arabia':'Riyadh skyline',
  'Turkey':'Istanbul skyline',
  'Switzerland':'Swiss Alps',
  'Taiwan':'Taipei skyline',
  'Poland':'Warsaw skyline',
  'Argentina':'Buenos Aires skyline',
  'Belgium':'Brussels skyline',
  'Sweden':'Stockholm skyline',
  'Ireland':'Dublin skyline',
  'Norway':'Oslo fjord',
  'Singapore':'Singapore skyline',
  'UAE':'Dubai skyline',
  'Israel':'Tel Aviv skyline',
  'Thailand':'Bangkok skyline',
  'Vietnam':'Ho Chi Minh City skyline',
  'Malaysia':'Kuala Lumpur skyline',
  'Philippines':'Manila skyline',
  'Bangladesh':'Dhaka skyline',
  'Pakistan':'Karachi skyline',
  'Egypt':'Cairo skyline',
  'South Africa':'Cape Town skyline',
  'Nigeria':'Lagos skyline',
  'Kenya':'Nairobi skyline',
  'Ethiopia':'Addis Ababa skyline',
  'Morocco':'Casablanca skyline',
  'Algeria':'Algiers skyline',
  'Chile':'Santiago skyline',
  'Peru':'Lima skyline',
  'Colombia':'Bogotá skyline',
  'Uruguay':'Montevideo skyline',
  'Qatar':'Doha skyline',
  'Iran':'Tehran skyline',
  'Iraq':'Baghdad skyline',
  'Greece':'Athens skyline',
  'Portugal':'Lisbon skyline',
  'Austria':'Vienna skyline',
  'Czechia':'Prague skyline',
  'Denmark':'Copenhagen skyline',
  'Romania':'Bucharest skyline',
  'Hungary':'Budapest skyline',
  'Finland':'Helsinki skyline',
  'New Zealand':'Auckland skyline',
  'Kazakhstan':'Astana skyline',
  'Ghana':'Accra skyline'
};

const countries = [
  ['United States','Americas','USD','$27.4T','$82,700','335M','Innovation-led services and industry','Low','Treasuries, Tech, Aircraft','Capital depth','Fiscal polarization','Debt politics',[-98,39]],
  ['China','Asia','CNY','$17.8T','$12,600','1.41B','State-led industrial capitalism','Medium','Electronics, Machinery, Solar','Industrial scale','Demographic decline','Property stress',[104,35]],
  ['Japan','Asia','JPY','$4.2T','$33,800','124M','Advanced export economy','Very High imports','Cars, Machinery, Chips tools','Technology base','Aging','Debt paradox',[138,37]],
  ['Germany','Europe','EUR','$4.4T','$53,000','84M','Social market economy','High post-Russia shock','Cars, Machinery, Chemicals','Industrial depth','Energy costs','Export slowdown',[10,51]],
  ['India','Asia','INR','$3.7T','$2,600','1.43B','Services-led emerging giant','Medium imports','IT services, Pharma, Textiles','Demographics','Infrastructure gaps','Jobs pressure',[78,22]],
  ['United Kingdom','Europe','GBP','$3.3T','$49,000','68M','Services and finance hub','Medium','Finance, Pharma, Cars','Global finance','Low investment','Productivity',[-2,54]],
  ['France','Europe','EUR','$3.0T','$46,000','68M','Diversified mixed economy','Low-medium nuclear','Aircraft, Luxury, Agri-food','Nuclear base','Public debt','Competitiveness',[2,46]],
  ['Italy','Europe','EUR','$2.3T','$39,000','59M','Industrial SMEs and tourism','High imports','Machinery, Fashion, Food','Northern industry','Debt level','Aging',[12,43]],
  ['Brazil','Americas','BRL','$2.1T','$10,300','215M','Mixed, commodity-driven','Low energy exporter','Soybeans, Iron Ore, Crude Oil','Resource abundance','Fiscal deficits','Deforestation sanctions',[-52,-10]],
  ['Canada','Americas','CAD','$2.1T','$53,000','40M','Resource-rich advanced economy','Low exporter','Oil, Cars, Wheat','Resources','Housing strain','Commodity cycles',[-106,56]],
  ['Russia','Europe/Asia','RUB','$2.0T','$14,000','144M','Resource and war economy','Low exporter','Oil, Gas, Metals','Energy leverage','Sanctions','Military spending',[90,60]],
  ['Mexico','Americas','MXN','$1.8T','$14,000','129M','Nearshoring industrial hub','Medium','Cars, Electronics, Oil','US access','Security issues','Water stress',[-102,23]],
  ['South Korea','Asia','KRW','$1.7T','$34,000','52M','Export industrial tech','High imports','Chips, Cars, Ships','Chaebols and tech','Demographics','China exposure',[128,36]],
  ['Australia','Oceania','AUD','$1.7T','$64,000','26M','Resource services economy','Low exporter','Iron Ore, Coal, LNG','Resources','China dependence','Climate risk',[134,-25]],
  ['Spain','Europe','EUR','$1.6T','$34,000','48M','Services, tourism, industry','Medium','Cars, Food, Tourism','Renewables','Unemployment','Tourism shocks',[-4,40]],
  ['Indonesia','Asia','IDR','$1.4T','$5,000','278M','Archipelago commodity industry','Medium','Coal, Palm Oil, Nickel','Nickel leverage','Logistics gaps','Climate exposure',[118,-2]],
  ['Netherlands','Europe','EUR','$1.1T','$63,000','18M','Trade, finance and logistics hub','Medium','Machinery, Chemicals, Food','Ports','Housing','Export exposure',[5,52]],
  ['Saudi Arabia','Middle East','SAR','$1.1T','$32,000','36M','Oil and sovereign wealth','Low exporter','Crude Oil, Petrochemicals','Energy reserves','Oil dependence','Transition risk',[45,24]],
  ['Turkey','Europe/Asia','TRY','$1.1T','$13,000','85M','Manufacturing bridge economy','High imports','Cars, Textiles, Steel','Strategic geography','Inflation','Currency risk',[35,39]],
  ['Switzerland','Europe','CHF','$900B','$100,000','9M','Finance, pharma, precision','Low','Pharma, Watches, Finance','Stability','High costs','Safe-haven pressure',[8,47]],
  ['Taiwan','Asia','TWD','$760B','$33,000','23M','Semiconductor-centered economy','High imports','Chips, Electronics','TSMC ecosystem','Geopolitical risk','Strait crisis',[121,24]],
  ['Poland','Europe','PLN','$750B','$20,000','38M','Manufacturing convergence economy','Medium','Machinery, Food, Cars','EU integration','Labor shortages','Security costs',[20,52]],
  ['Argentina','Americas','ARS','$640B','$14,000','46M','Agriculture and crisis-prone macro','Medium','Soy, Corn, Lithium','Food and minerals','Inflation','Debt crises',[-64,-34]],
  ['Belgium','Europe','EUR','$630B','$54,000','12M','Open trade economy','High imports','Chemicals, Pharma, Diamonds','EU location','Debt','Fragmented politics',[4.5,50.5]],
  ['Sweden','Europe','SEK','$590B','$56,000','10.5M','High-tech welfare capitalism','Low-medium','Machinery, Vehicles, Tech','Innovation','Housing debt','Export demand',[15,62]],
  ['Ireland','Europe','EUR','$550B','$104,000','5.2M','FDI and services hub','Medium','Pharma, Software, Finance','Tax ecosystem','Housing','Tax pressure',[-8,53]],
  ['Norway','Europe','NOK','$520B','$96,000','5.5M','Oil fund social economy','Low exporter','Oil, Gas, Fish','Sovereign wealth','Oil transition','Currency swings',[8,61]],
  ['Singapore','Asia','SGD','$501B','$84,700','5.9M','Open trade, state-led capitalism','Very High imports','Finance, Chips, Logistics','Port-finance hub','Land scarcity','Trade shocks',[104,1.35]],
  ['UAE','Middle East','AED','$500B','$53,000','10M','Oil, logistics and finance hub','Low exporter','Oil, Gold, Services','Dubai logistics','Labor model','Oil cycles',[54,24]],
  ['Israel','Middle East','ILS','$510B','$55,000','10M','High-tech security economy','Medium','Tech, Diamonds, Pharma','Startup ecosystem','Security risk','Regional war',[35,31]],
  ['Thailand','Asia','THB','$520B','$7,300','72M','Tourism and manufacturing','High imports','Cars, Electronics, Food','Tourism and industry','Aging','Political risk',[101,15]],
  ['Vietnam','Asia','VND','$430B','$4,300','99M','Manufacturing export riser','Medium','Electronics, Textiles, Coffee','China+1 shift','Infrastructure','External demand',[108,16]],
  ['Malaysia','Asia','MYR','$430B','$13,000','34M','Electronics and commodities','Medium','Chips, Palm Oil, LNG','Semiconductor assembly','Middle-income trap','Commodity exposure',[102,4]],
  ['Philippines','Asia','PHP','$440B','$3,900','115M','Services and remittance economy','Medium','Electronics, BPO, Labor','Young population','Infrastructure gaps','Climate risk',[122,13]],
  ['Bangladesh','Asia','BDT','$460B','$2,700','173M','Garment-led development','High imports','Garments, Textiles','Labor scale','Energy stress','Climate exposure',[90,24]],
  ['Pakistan','Asia','PKR','$340B','$1,600','240M','Agriculture and textiles','High imports','Textiles, Rice','Demographics','Debt stress','FX shortages',[70,30]],
  ['Egypt','Africa/Middle East','EGP','$400B','$3,800','112M','Suez, tourism, gas and state projects','Medium','Gas, Fertilizer, Tourism','Suez Canal','Debt and FX','Food import risk',[30,27]],
  ['South Africa','Africa','ZAR','$380B','$6,400','60M','Mining, finance and industry','Medium','Gold, Platinum, Cars','Minerals and finance','Power shortages','Logistics failures',[24,-29]],
  ['Nigeria','Africa','NGN','$360B','$1,600','225M','Oil, services and informal scale','Medium exporter','Crude Oil, LNG','Population and energy','FX shortages','Oil theft',[8,9]],
  ['Kenya','Africa','KES','$115B','$2,100','55M','Services, agriculture and fintech','Medium imports','Tea, Flowers, Services','Mobile money','Debt pressure','Climate shocks',[38,0]],
  ['Ethiopia','Africa','ETB','$160B','$1,500','126M','Agriculture and industrialization push','Low hydro','Coffee, Textiles','Hydropower','FX shortages','Conflict risk',[40,9]],
  ['Morocco','Africa','MAD','$150B','$4,100','38M','Manufacturing and phosphates','High imports','Cars, Phosphates, Agri-food','EU proximity','Water stress','Energy imports',[-6,32]],
  ['Algeria','Africa','DZD','$240B','$5,300','45M','Hydrocarbon state economy','Low exporter','Gas, Oil','Gas reserves','Diversification gap','Price swings',[2,28]],
  ['Chile','Americas','CLP','$330B','$17,000','20M','Mining and services economy','Medium','Copper, Lithium, Fruit','Copper/lithium','Inequality','China demand',[-71,-30]],
  ['Peru','Americas','PEN','$270B','$7,900','34M','Mining and agriculture','Medium','Copper, Gold, Fishmeal','Minerals','Political instability','Social conflict',[-75,-9]],
  ['Colombia','Americas','COP','$360B','$7,000','52M','Oil, services and agriculture','Medium exporter','Oil, Coffee, Coal','Resources','Security gaps','Oil transition',[-74,4]],
  ['Uruguay','Americas','UYU','$80B','$23,000','3.5M','Stable agri-services economy','Low renewables','Beef, Soy, Pulp','Stability','Small market','Commodity cycles',[-56,-33]],
  ['Qatar','Middle East','QAR','$240B','$82,000','3M','Gas wealth and investment state','Low exporter','LNG, Petrochemicals','Gas reserves','Blockade risk','Energy transition',[51,25]],
  ['Iran','Middle East','IRR','$400B','$4,700','89M','Sanctioned energy-industrial economy','Low exporter constrained','Oil, Gas, Petrochemicals','Energy base','Sanctions','Strait tensions',[53,32]],
  ['Iraq','Middle East','IQD','$260B','$6,000','45M','Oil state rebuilding economy','Low exporter','Crude Oil','Oil reserves','Institutions','Security risk',[44,33]],
  ['Greece','Europe','EUR','$240B','$23,000','10M','Tourism, shipping and services','High imports','Tourism, Shipping, Food','Shipping fleet','Debt legacy','Tourism shock',[22,39]],
  ['Portugal','Europe','EUR','$290B','$28,000','10M','Services, tourism and manufacturing','Medium imports','Tourism, Cars, Textiles','Renewables','Low productivity','Housing pressure',[-8,39]],
  ['Czechia','Europe','CZK','$330B','$31,000','11M','Central European industry','Medium','Cars, Machinery','Industrial base','Energy costs','Auto transition',[15,49]],
  ['Ukraine','Europe','UAH','$180B','$5,000','37M','Wartime agriculture and industry','High wartime','Grain, Steel, IT','Land and skills','War damage','Energy attacks',[31,49]],
  ['Romania','Europe','RON','$350B','$18,000','19M','Manufacturing and services convergence','Medium','Cars, IT, Grain','EU integration','Infrastructure','Brain drain',[25,46]],
  ['Denmark','Europe','DKK','$400B','$68,000','6M','High-value welfare economy','Low','Pharma, Wind, Food','Green industry','Small market','Trade exposure',[10,56]],
  ['Finland','Europe','EUR','$300B','$54,000','5.6M','Tech, forestry and welfare economy','Medium','Machinery, Paper, Tech','Education','Russia exposure','Demographics',[26,64]],
  ['New Zealand','Oceania','NZD','$250B','$49,000','5.2M','Agriculture and services economy','Medium','Dairy, Meat, Tourism','Food exports','Distance','Housing',[172,-41]],
  ['Kazakhstan','Asia','KZT','$260B','$13,000','20M','Energy and minerals corridor','Low exporter','Oil, Uranium, Metals','Resources','Landlocked logistics','Russia/China balance',[67,48]],
  ['Ghana','Africa','GHS','$76B','$2,300','34M','Gold, cocoa and oil economy','Medium','Gold, Cocoa, Oil','Resource mix','Debt stress','FX pressure',[-1,8]],
  ['Ukraine','Europe','UAH','$180B','$5,200','37M','War-resilient agriculture and tech economy','Medium imports','Grain, Steel, IT services','Agriculture and tech talent','War damage','Security and reconstruction',[31, 49]],
  ['Belarus','Europe','BYN','$72B','$7,700','9.2M','State-led industrial economy','High imports','Potash, Machinery, Refined oil','Industrial base','Sanctions','Russia dependence',[28, 53]],
  ['Slovakia','Europe','EUR','$130B','$24,000','5.4M','Automotive export economy','Medium imports','Cars, Electronics, Machinery','Car manufacturing','Export concentration','Eurozone slowdown',[19, 48.7]],
  ['Slovenia','Europe','EUR','$70B','$33,000','2.1M','Small high-income manufacturing economy','Medium imports','Pharma, Cars, Machinery','EU integration','Small market','External demand',[14.8, 46.1]],
  ['Croatia','Europe','EUR','$80B','$20,000','3.9M','Tourism and services economy','Medium imports','Tourism, Ships, Food','Adriatic tourism','Seasonality','Tourism shock',[16, 45]],
  ['Serbia','Europe','RSD','$75B','$11,000','6.7M','Manufacturing and services convergence economy','High imports','Cars, Metals, Food','Regional industry','Institutional gaps','EU/Russia balance',[21, 44]],
  ['Bulgaria','Europe','BGN','$100B','$15,000','6.5M','Low-cost EU manufacturing and services','Medium imports','Machinery, Copper, IT services','EU access','Demographics','Energy politics',[25, 43]],
  ['Lithuania','Europe','EUR','$78B','$28,000','2.8M','Baltic logistics and tech economy','Medium imports','Chemicals, Machinery, Food','Digital services','Small market','Security costs',[24, 55]],
  ['Latvia','Europe','EUR','$43B','$23,000','1.9M','Baltic services and logistics economy','Medium imports','Wood, Food, Machinery','EU integration','Demographics','Regional security',[25, 57]],
  ['Estonia','Europe','EUR','$41B','$31,000','1.3M','Digital state and services economy','Medium imports','Tech services, Wood, Machinery','Digital governance','Small scale','Security costs',[26, 59]],
  ['Luxembourg','Europe','EUR','$90B','$130,000','0.7M','Finance-centered microstate economy','Medium imports','Finance, Funds, Steel','Financial hub','Regulatory pressure','Tax scrutiny',[6, 49.8]],
  ['Iceland','Europe','ISK','$31B','$82,000','0.39M','Renewable energy and tourism economy','Low renewables','Fish, Aluminum, Tourism','Clean energy','Small market','Tourism volatility',[-19, 65]],
  ['Malta','Europe','EUR','$22B','$38,000','0.5M','Services, shipping and tourism economy','High imports','Tourism, Financial services, Shipping','Mediterranean services','Scale limits','Regulation risk',[14.4, 35.9]],
  ['Cyprus','Europe','EUR','$32B','$36,000','1.2M','Tourism and business services economy','High imports','Tourism, Shipping, Services','EU location','Energy imports','Regional tensions',[33, 35]],
  ['Georgia','Asia/Europe','GEL','$31B','$8,300','3.7M','Transit, tourism and services economy','High imports','Wine, Tourism, Metals','Caucasus corridor','Small market','Regional security',[44, 42]],
  ['Armenia','Asia/Europe','AMD','$24B','$8,200','3M','Services, mining and diaspora-linked economy','High imports','Copper, IT, Brandy','Diaspora networks','Landlocked logistics','Security risk',[45, 40]],
  ['Azerbaijan','Asia/Europe','AZN','$75B','$7,300','10M','Oil and gas corridor economy','Low exporter','Oil, Gas, Petrochemicals','Caspian energy','Diversification gap','Energy price swings',[48.5, 40.5]],
  ['Jordan','Middle East','JOD','$51B','$4,700','11M','Aid, services and logistics economy','High imports','Pharma, Potash, Services','Stability','Water scarcity','Regional shocks',[36, 31]],
  ['Lebanon','Middle East','LBP','$24B','$3,500','5.5M','Crisis-hit services economy','High imports','Services, Food, Jewelry','Human capital','Banking collapse','Political paralysis',[35.8, 33.8]],
  ['Oman','Middle East','OMR','$110B','$23,000','4.6M','Oil, gas and logistics economy','Low exporter','Oil, Gas, Metals','Indian Ocean access','Oil dependence','Fiscal transition',[57, 21]],
  ['Kuwait','Middle East','KWD','$160B','$34,000','4.3M','Oil rentier economy','Low exporter','Crude Oil, Refined products','Oil wealth','Public-sector dependence','Oil cycles',[47.5, 29.3]],
  ['Bahrain','Middle East','BHD','$45B','$29,000','1.5M','Finance and aluminum Gulf economy','High imports','Aluminum, Finance, Oil products','Financial services','Limited resources','Regional competition',[50.5, 26]],
  ['Nepal','Asia','NPR','$41B','$1,300','30M','Remittance and tourism economy','High imports','Remittances, Textiles, Tourism','Hydropower potential','Infrastructure gaps','Climate risk',[84, 28]],
  ['Sri Lanka','Asia','LKR','$84B','$3,800','22M','Tourism, tea and apparel economy','High imports','Tea, Apparel, Tourism','Indian Ocean location','Debt stress','FX shortages',[81, 7]],
  ['Myanmar','Asia','MMK','$65B','$1,200','55M','Resource and agriculture economy','Medium','Gas, Garments, Rice','Natural resources','Conflict','Sanctions and instability',[96, 21]],
  ['Cambodia','Asia','KHR','$31B','$1,900','17M','Garment, tourism and construction economy','High imports','Garments, Tourism, Rice','Low-cost manufacturing','External dependence','Political risk',[105, 12]],
  ['Laos','Asia','LAK','$15B','$2,000','7.5M','Hydropower and mining economy','Medium','Electricity, Copper, Tourism','Hydropower exports','Debt exposure','Currency stress',[103, 18]],
  ['Mongolia','Asia','MNT','$17B','$5,000','3.5M','Mining corridor economy','Medium imports','Coal, Copper, Gold','Mineral wealth','Landlocked logistics','China dependence',[103, 46]],
  ['Uzbekistan','Asia','UZS','$91B','$2,600','36M','Reforming resource and textile economy','Low-medium','Gold, Cotton, Gas','Demographics','State dominance','Water stress',[64, 41]],
  ['Tunisia','Africa','TND','$49B','$4,000','12M','Tourism, manufacturing and services economy','High imports','Textiles, Tourism, Olive oil','EU proximity','Fiscal stress','Political risk',[9, 34]],
  ['Senegal','Africa','XOF','$31B','$1,700','18M','Services, agriculture and emerging energy economy','Medium imports','Fish, Gold, Phosphates','Stability','Youth jobs','Debt pressure',[-14, 14]],
  ["Côte d'Ivoire",'Africa','XOF','$79B','$2,700','29M','Cocoa-led West African growth economy','Medium imports','Cocoa, Cashew, Gold','Agribusiness','Commodity dependence','Climate and price risk',[-5, 7.5]],
  ['Tanzania','Africa','TZS','$79B','$1,200','67M','Agriculture, mining and tourism economy','Medium imports','Gold, Tourism, Coffee','Natural resources','Infrastructure gaps','Climate risk',[35, -6]],
  ['Uganda','Africa','UGX','$52B','$1,100','49M','Agriculture and emerging oil economy','Medium imports','Coffee, Gold, Fish','Agriculture','Infrastructure gaps','Oil execution risk',[32, 1.5]],
  ['Rwanda','Africa','RWF','$14B','$1,000','14M','Services and reform-driven economy','High imports','Tourism, Coffee, Minerals','Governance capacity','Small market','Regional tensions',[30, -2]],
  ['Angola','Africa','AOA','$85B','$2,400','36M','Oil and reconstruction economy','Low exporter','Oil, Diamonds','Energy reserves','Oil dependence','FX volatility',[18, -12]],
  ['DR Congo','Africa','CDF','$67B','$650','105M','Mineral-rich frontier economy','Medium','Copper, Cobalt, Gold','Critical minerals','Institutions','Conflict risk',[23, -3]],
  ['Cameroon','Africa','XAF','$49B','$1,800','28M','Diversified Central African economy','Medium','Oil, Cocoa, Timber','Regional hub','Infrastructure','Security risk',[12, 6]],
  ['Zambia','Africa','ZMW','$29B','$1,400','20M','Copper and agriculture economy','Medium imports','Copper, Cobalt, Tobacco','Copper reserves','Debt pressure','Copper price swings',[28, -14]],
  ['Mozambique','Africa','MZN','$22B','$650','33M','Gas, minerals and agriculture economy','Medium','Coal, Aluminum, Gas','LNG potential','Debt and security','Insurgency risk',[35, -18]],
].map(([name,region,currency,gdp,gdppc,pop,model,energy,exports,strength,vulnerability,risk,coords])=>({name,region,currency,gdp,gdppc,pop,model,energy,exports,strength,vulnerability,risk,coords}));

const countryByName = Object.fromEntries(countries.map(c=>[c.name,c]));
const uniqueCountries = Object.values(countryByName).sort((a,b)=>a.name.localeCompare(b.name));
function geoCountryMatches(geoName, c){
  if(!geoName || !c) return false;
  if(geoName===c.name) return true;
  if(geoName.includes(c.name) || c.name.includes(geoName)) return true;
  if(c.name==='United States' && (geoName==='United States of America' || geoName==='USA')) return true;
  if(c.name==='Russia' && geoName==='Russian Federation') return true;
  if(c.name==='UAE' && geoName==='United Arab Emirates') return true;
  return false;
}
function hashText(str){
  return [...String(str)].reduce((h,ch)=>((h<<5)-h+ch.charCodeAt(0))|0,0);
}
function entityVisual(kind, name, subtitle=''){
  const palettes={
    country:['#dfe7d6','#f6d59f','#7b8f6a'],
    city:['#dbeafe','#c7d2fe','#1d4ed8'],
    finance:['#ede9fe','#ddd6fe','#6d28d9'],
    port:['#ffedd5','#fed7aa','#c2410c'],
    route:['#e0f2fe','#bae6fd','#0369a1']
  };
  const key = kind==='finance' ? 'finance' : kind;
  const pal=palettes[key]||palettes.country;
  const h=Math.abs(hashText(name));
  const icon=kind==='port'?'⚓':kind==='route'?'↝':kind==='finance'?'◆':kind==='city'?'◉':'●';
  const lines=Array.from({length:8}).map((_,i)=>{
    const x=(h*(i+3))%900, y=80+((h>>i)%360), w=140+((h+i*37)%230);
    return `<rect x="${x}" y="${y}" width="${w}" height="8" rx="4" fill="rgba(255,255,255,.34)"/>`;
  }).join('');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${pal[0]}"/><stop offset=".58" stop-color="${pal[1]}"/><stop offset="1" stop-color="${pal[2]}"/></linearGradient><radialGradient id="r" cx="72%" cy="22%" r="60%"><stop offset="0" stop-color="rgba(255,255,255,.7)"/><stop offset="1" stop-color="rgba(255,255,255,0)"/></radialGradient></defs>
    <rect width="900" height="520" fill="url(#g)"/> <rect width="900" height="520" fill="url(#r)"/> ${lines}
    <circle cx="735" cy="112" r="82" fill="rgba(255,255,255,.22)"/><circle cx="762" cy="133" r="116" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
    <text x="58" y="112" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="900" fill="#172033">${escapeXml(icon)} ${escapeXml(name)}</text>
    <text x="62" y="164" font-family="Inter, Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="3" fill="rgba(23,32,51,.68)">${escapeXml((subtitle||kind).toUpperCase())}</text>
    <path d="M60 430 C180 360, 310 470, 445 390 S710 380, 842 292" fill="none" stroke="rgba(23,32,51,.25)" stroke-width="5" stroke-linecap="round"/>
    <circle cx="60" cy="430" r="9" fill="#172033"/><circle cx="445" cy="390" r="9" fill="#172033"/><circle cx="842" cy="292" r="9" fill="#172033"/>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
function escapeXml(v){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
const countryFlagCodes = {
  'United States':'us','China':'cn','Japan':'jp','Germany':'de','India':'in','United Kingdom':'gb','France':'fr','Italy':'it','Brazil':'br','Canada':'ca','Russia':'ru','Mexico':'mx','South Korea':'kr','Australia':'au','Spain':'es','Indonesia':'id','Netherlands':'nl','Saudi Arabia':'sa','Turkey':'tr','Switzerland':'ch','Taiwan':'tw','Poland':'pl','Argentina':'ar','Belgium':'be','Sweden':'se','Ireland':'ie','Norway':'no','Singapore':'sg','UAE':'ae','Israel':'il','Thailand':'th','Vietnam':'vn','Malaysia':'my','Philippines':'ph','Bangladesh':'bd','Pakistan':'pk','Egypt':'eg','South Africa':'za','Nigeria':'ng','Kenya':'ke','Ethiopia':'et','Morocco':'ma','Algeria':'dz','Chile':'cl','Peru':'pe','Colombia':'co','Uruguay':'uy','Qatar':'qa','Iran':'ir','Iraq':'iq','Greece':'gr','Portugal':'pt','Austria':'at','Czechia':'cz','Ukraine':'ua','Romania':'ro','Hungary':'hu','Denmark':'dk','Finland':'fi','New Zealand':'nz','Kazakhstan':'kz','Ghana':'gh','Belarus':'by','Slovakia':'sk','Slovenia':'si','Croatia':'hr','Serbia':'rs','Bulgaria':'bg','Lithuania':'lt','Latvia':'lv','Estonia':'ee','Luxembourg':'lu','Iceland':'is','Malta':'mt','Cyprus':'cy','Georgia':'ge','Armenia':'am','Azerbaijan':'az','Jordan':'jo','Lebanon':'lb','Oman':'om','Kuwait':'kw','Bahrain':'bh','Nepal':'np','Sri Lanka':'lk','Myanmar':'mm','Cambodia':'kh','Laos':'la','Mongolia':'mn','Uzbekistan':'uz','Tunisia':'tn','Senegal':'sn',"Côte d'Ivoire":'ci','Tanzania':'tz','Uganda':'ug','Rwanda':'rw','Angola':'ao','DR Congo':'cd','Cameroon':'cm','Zambia':'zm','Mozambique':'mz'
};
function countryCodeForFlag(name){ return countryFlagCodes[name] || null; }
function flagImageUrl(name){
  const code = countryFlagCodes[name];
  return code ? `https://flagcdn.com/w640/${code}.png` : entityVisual('country', name, 'Flag');
}
function photoSeed(kind, name){
  return Math.abs(hashText(`${kind}:${name}`));
}
function wikipediaSummaryUrl(title){
  return `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
}
function photoQuery(kind, name){
  const direct = kind==='country' ? (countryPhotoQueries[name] || `${name} skyline`) : name;
  if(kind==='port') return `${direct} port harbor containers ship`;
  if(kind==='finance' || kind==='city') return `${direct} skyline city downtown`;
  return `${direct} landscape city skyline travel`;
}
function fallbackPhotoUrl(kind, name){
  const query = photoQuery(kind, name).replace(/\//g,' ').replace(/\s+/g,',');
  return `https://loremflickr.com/1200/800/${encodeURIComponent(query)}?lock=${photoSeed(kind,name)}`;
}
function wikipediaTitleFor(kind, name){
  if(kind==='country') return null;
  if(kind==='port') return portTitleOverrides[name] || name;
  return cityTitleOverrides[name] || name;
}
async function fetchRemotePhoto(kind, name){
  const cacheKey = `${kind}:${name}`;
  if(kind==='country'){
    const url = flagImageUrl(name);
    remoteImageCache.set(cacheKey, url);
    return url;
  }
  if(remoteImageCache.has(cacheKey)) return remoteImageCache.get(cacheKey);
  if(remoteImagePending.has(cacheKey)) return remoteImagePending.get(cacheKey);
  const pending = (async()=>{
    let url = fallbackPhotoUrl(kind, name);
    try{
      const wikiTitle = wikipediaTitleFor(kind, name);
      if(wikiTitle){
        const res = await fetch(wikipediaSummaryUrl(wikiTitle));
        if(res.ok){
          const data = await res.json();
          url = data.originalimage?.source || data.thumbnail?.source || url;
        }
      }
    }catch(e){}
    remoteImageCache.set(cacheKey, url);
    remoteImagePending.delete(cacheKey);
    return url;
  })();
  remoteImagePending.set(cacheKey, pending);
  return pending;
}
function infoImage(kind, name, subtitle){
  if(kind==='country'){
    return `<div class="info-image country-flag-image is-photo" data-kind="country" data-name="${escapeXml(name)}" data-subtitle="${escapeXml(subtitle||'')}" style="background-image:url('${flagImageUrl(name)}')" aria-label="${escapeXml(name)} flag"></div>`;
  }
  return `<div class="info-image" data-kind="${escapeXml(kind)}" data-name="${escapeXml(name)}" data-subtitle="${escapeXml(subtitle||'')}" style="background-image:url('${entityVisual(kind,name,subtitle)}')" aria-label="${escapeXml(name)} visual"></div>`;
}
function hydratePanelImages(scope=document){
  scope.querySelectorAll?.('.info-image[data-kind][data-name]').forEach(el=>{
    if(el.dataset.loaded==='1') return;
    const kind = el.dataset.kind;
    const name = el.dataset.name;
    const cacheKey = `${kind}:${name}`;
    if(remoteImageCache.has(cacheKey)){
      el.style.backgroundImage = `url('${remoteImageCache.get(cacheKey)}')`;
      el.dataset.loaded='1';
      el.classList.add('is-photo');
      return;
    }
    fetchRemotePhoto(kind, name).then(url=>{
      if(!document.body.contains(el)) return;
      el.style.backgroundImage = `url('${url}')`;
      el.dataset.loaded='1';
      el.classList.add('is-photo');
    }).catch(()=>{});
  });
}
function lensForItem(item){
  const profile=getEntityProfile(item);
  if(profile?.lens) return profile.lens;
  if(item.kind==='route') return 'This corridor matters because it converts geography into prices: distance, fuel, insurance, canal capacity and security risk all shape the final cost of goods.';
  if(item.type==='port') return 'Ports are physical bottlenecks of globalization. They combine ships, containers, customs, warehouses, finance and insurance in one place.';
  return 'Cities concentrate decision-making, workers, capital, universities, firms and infrastructure. They often explain a country better than national averages do.';
}


const cities = [
  ['New York','financial hub',-74.0,40.7,'finance'],['London','financial hub',-0.1,51.5,'finance'],['Paris','capital',2.35,48.86,'city'],['Singapore','port-finance hub',103.85,1.29,'finance'],['Shanghai','industrial port',121.47,31.23,'city'],['Shenzhen','electronics cluster',114.06,22.54,'city'],['Tokyo','megacity',139.7,35.68,'city'],['Seoul','chips and industry',127,37.56,'city'],['Dubai','logistics hub',55.27,25.2,'finance'],['Riyadh','Vision 2030 hub',46.7,24.7,'city'],['Mumbai','finance',72.87,19.07,'finance'],['São Paulo','Latin America business hub',-46.63,-23.55,'finance'],['Lagos','Africa megacity',3.38,6.52,'city'],['Nairobi','fintech hub',36.82,-1.29,'finance'],['Mexico City','nearshoring command center',-99.13,19.43,'city'],['Madrid','political and services capital',-3.7,40.42,'city'],['Berlin','industrial-policy capital',13.4,52.52,'city'],['Amsterdam','trade and finance hub',4.9,52.37,'finance'],['Istanbul','Eurasian bridge city',28.98,41.01,'city'],['Jakarta','Southeast Asian megacity',106.85,-6.21,'city'],['Bangkok','tourism and manufacturing hub',100.5,13.76,'city'],['Ho Chi Minh City','Vietnam export engine',106.63,10.82,'city'],['Kuala Lumpur','finance and electronics node',101.69,3.14,'finance'],['Manila','services and remittance hub',120.98,14.6,'city'],['Dhaka','garment megacity',90.41,23.81,'city'],['Karachi','Pakistan port-finance hub',67.01,24.86,'finance'],['Cairo','Arab world megacity',31.24,30.04,'city'],['Cape Town','tourism and port city',18.42,-33.92,'city'],['Casablanca','Morocco business hub',-7.59,33.57,'finance'],['Santiago','copper-finance capital',-70.66,-33.45,'finance'],['Buenos Aires','macro and culture capital',-58.38,-34.6,'city'],['Bogotá','Andean services hub',-74.07,4.71,'city'],['Doha','gas wealth capital',51.53,25.29,'finance'],['Tehran','sanctioned industrial capital',51.39,35.69,'city'],['Warsaw','CEE growth hub',21.01,52.23,'city'],['Vienna','Central European services hub',16.37,48.21,'city'],['Copenhagen','green urban economy',12.57,55.68,'city'],['Helsinki','Nordic tech capital',24.94,60.17,'city'],['Auckland','Pacific services hub',174.76,-36.85,'city'],['Accra','West African services hub',-0.19,5.56,'city']
].map(([name,desc,lon,lat,type])=>({name,desc,lon,lat,type}));

const ports = [
  ['Shanghai Port','world-scale container gateway',121.8,31.2],['Singapore Port','global transshipment hub',103.75,1.25],['Rotterdam','Europe gateway',4.47,51.92],['Los Angeles/Long Beach','Pacific gateway',-118.24,33.74],['Jebel Ali','Gulf logistics hub',55.05,25.01],['Hamburg','German trade port',9.99,53.55],['Busan','Korea export hub',129.04,35.1],['Shenzhen/Yantian','electronics export port',114.27,22.59],['Santos','Brazil agribusiness port',-46.33,-23.96],['Durban','Southern Africa gateway',31.02,-29.87],['Suez/Port Said','canal chokepoint',32.3,31.25],['Panama Canal','inter-oceanic chokepoint',-79.55,9.08],['Mumbai/JNPT','India west gateway',72.94,18.95],['Piraeus','Mediterranean gateway',23.63,37.94],['Antwerp-Bruges','chemical/logistics hub',4.4,51.22],['Hong Kong','Asian container and finance gateway',114.16,22.3],['Ningbo-Zhoushan','Chinese mega-port complex',121.55,29.87],['Qingdao','North China manufacturing port',120.38,36.07],['Tianjin',"Beijing's maritime gateway",117.2,39.08],['Kaohsiung','Taiwan export port',120.3,22.62],['Tanjung Pelepas','Malacca transshipment hub',103.55,1.36],['Port Klang','Malaysia container gateway',101.39,3.0],['Laem Chabang','Thailand industrial port',100.89,13.08],['Ho Chi Minh/Cat Lai','Vietnam export port',106.79,10.76],['Manila Port','Philippines trade gateway',120.96,14.59],['Colombo','Indian Ocean transshipment hub',79.85,6.95],['Mundra','India private mega-port',69.7,22.75],['Chittagong','Bangladesh garment gateway',91.82,22.32],['Alexandria','Egypt Mediterranean gateway',29.91,31.2],['Tanger Med','Morocco Europe-Africa port',-5.5,35.89],['Lagos/Apapa','Nigeria container gateway',3.36,6.45],['Mombasa','East African corridor port',39.67,-4.04],['Tema','Ghana Gulf of Guinea port',0.01,5.64],['Le Havre','French Atlantic gateway',0.11,49.49],['Valencia','Spanish Mediterranean port',-0.32,39.45],['Gioia Tauro','Italy transshipment hub',15.9,38.43],['Algeciras','Strait of Gibraltar gateway',-5.45,36.14],['Felixstowe','UK container gateway',1.32,51.96],['Vancouver','Canadian Pacific gateway',-123.12,49.29],['New York/New Jersey','US Atlantic gateway',-74.05,40.67]
].map(([name,desc,lon,lat])=>({name,desc,lon,lat,type:'port'}));

const cityProfiles = {
  'New York': {tag:'Finance + media command center', lens:'New York turns capital markets, corporate HQs, media and immigrant labor into global influence.', watch:'Commercial real estate stress, Wall Street regulation, tech employment and port congestion.', matters:'It prices risk for the world while also acting as a consumer and logistics gateway.'},
  'London': {tag:'Global finance after Brexit', lens:'London remains a legal, banking, insurance and FX hub even as it renegotiates its role with Europe.', watch:'Financial regulation, City hiring, housing pressure and UK-EU services access.', matters:'It shows how institutions and trust can keep a city central even outside a large single market.'},
  'Paris': {tag:'State, luxury and innovation capital', lens:'Paris concentrates government power, luxury groups, tourism, transport and a growing AI/startup ecosystem.', watch:'Transit investment, housing costs, tourism flows and industrial policy around tech.', matters:'It links national strategy, culture exports and high-value services in one urban system.'},
  'Singapore': {tag:'Port-finance city-state', lens:'Singapore uses logistics, law, education and sovereign planning to turn a small island into a global connector.', watch:'Shipping cycles, wealth management rules, labor constraints and regional competition.', matters:'It is the clearest example of geography upgraded by institutions and infrastructure.'},
  'Shanghai': {tag:'China’s industrial-financial gateway', lens:'Shanghai connects Chinese manufacturing, finance, consumers and the Yangtze River Delta export machine.', watch:'Property confidence, export demand, port volumes and state support for finance.', matters:'It reveals how China links domestic scale to global trade.'},
  'Shenzhen': {tag:'Hardware and electronics cluster', lens:'Shenzhen compresses factories, suppliers, design teams and entrepreneurs into one fast industrial ecosystem.', watch:'US-China tech controls, electronics demand, labor costs and innovation policy.', matters:'It shows why industrial clusters can move faster than isolated firms.'},
  'Tokyo': {tag:'Megacity of capital and technology', lens:'Tokyo concentrates Japan’s finance, advanced services, corporate headquarters and high-end urban infrastructure.', watch:'Demographics, yen weakness, wages, productivity reform and real-estate resilience.', matters:'It shows how an aging economy can remain globally sophisticated.'},
  'Seoul': {tag:'Chaebol-tech command hub', lens:'Seoul links government, universities, finance and conglomerates behind Korea’s chips, batteries and entertainment exports.', watch:'Chip cycles, household debt, demographics and exposure to China.', matters:'It converts industrial policy and culture into global soft and hard power.'},
  'Dubai': {tag:'Logistics, tourism and capital hub', lens:'Dubai turns airport capacity, ports, real estate and business services into a Gulf gateway.', watch:'Property cycles, oil-linked liquidity, tourism, sanctions compliance and regional competition.', matters:'It shows how a city can monetize connectivity even without being a huge domestic market.'},
  'Riyadh': {tag:'Vision 2030 command center', lens:'Riyadh is being repositioned from administrative capital into finance, tourism and corporate headquarters hub.', watch:'Public spending, private-sector job creation, megaproject execution and oil revenue.', matters:'It is the test of whether oil rents can become diversified productivity.'},
  'Mumbai': {tag:'India’s finance and film metropolis', lens:'Mumbai concentrates banking, capital markets, entertainment and port access in India’s west coast economy.', watch:'Infrastructure delivery, housing pressure, monsoon risk and India’s credit cycle.', matters:'It links India’s domestic demand to global capital.'},
  'São Paulo': {tag:'Latin America business engine', lens:'São Paulo is Brazil’s finance, industry and services core, pulling talent and capital from across the region.', watch:'Interest rates, fiscal policy, logistics costs and consumer credit.', matters:'It shows the weight of Brazil’s internal market beyond commodities.'},
  'Lagos': {tag:'Africa megacity and informal powerhouse', lens:'Lagos combines ports, finance, entertainment, startups and informal trade in a fast-growing urban economy.', watch:'Power supply, transport, port clearance, naira stability and housing.', matters:'It shows the scale and friction of urban development in emerging markets.'},
  'Nairobi': {tag:'East African fintech hub', lens:'Nairobi links mobile money, logistics, NGOs, startups and regional services into East Africa’s main business node.', watch:'Debt pressure, digital regulation, climate shocks and regional trade.', matters:'It shows how financial inclusion can become urban economic power.'},
  'Mexico City': {tag:'Nearshoring command center', lens:'Mexico City coordinates finance, policy and corporate strategy behind Mexico’s manufacturing integration with the US.', watch:'Water stress, security, peso strength and industrial investment.', matters:'It connects North American supply chains with a huge domestic market.'}
};

const portProfiles = {
  'Shanghai Port': {tag:'World container scale', lens:'Shanghai is the maritime outlet of the Yangtze River Delta, one of the densest manufacturing regions on earth.', watch:'Export demand, inland river logistics, typhoon disruption and China-US trade policy.', matters:'When Shanghai slows, global retailers and factories feel it quickly.'},
  'Singapore Port': {tag:'Transshipment superhub', lens:'Singapore is less a final market than a switching station where Asian, European and Indian Ocean routes connect.', watch:'Malacca security, bunker fuel rules, port automation and regional competition.', matters:'It makes geography operational: ships save time because the port system is trusted and efficient.'},
  'Rotterdam': {tag:'Europe’s industrial gateway', lens:'Rotterdam connects ocean shipping to German and European industry through pipelines, barges, rail and warehouses.', watch:'Rhine water levels, energy transition, customs flow and chemical demand.', matters:'It is where global commodities become European industrial inputs.'},
  'Los Angeles/Long Beach': {tag:'US Pacific gateway', lens:'LA/Long Beach is the main US door for Asian manufactured goods and a barometer of American consumption.', watch:'Labor negotiations, rail capacity, warehouse stocks and Pacific shipping rates.', matters:'Congestion here can raise costs across the US retail system.'},
  'Jebel Ali': {tag:'Gulf logistics platform', lens:'Jebel Ali turns Dubai into a regional re-export, warehousing and free-zone hub between Asia, Africa and Europe.', watch:'Regional conflict risk, sanctions enforcement, air-sea logistics and Gulf investment cycles.', matters:'It shows how a port can create an economy around itself.'},
  'Hamburg': {tag:'Germany’s maritime door', lens:'Hamburg links German industry to container shipping, especially machinery, vehicles and high-value exports.', watch:'Elbe access, China exposure, rail links and German industrial demand.', matters:'It reflects the health of Europe’s export machine.'},
  'Busan': {tag:'Korean export outlet', lens:'Busan supports South Korea’s shipbuilding, autos, electronics and container transshipment networks.', watch:'Chip exports, shipping alliances, Korea-Japan-China trade and automation.', matters:'It connects Korea’s industrial depth to global markets.'},
  'Shenzhen/Yantian': {tag:'Electronics export valve', lens:'Yantian is a key release point for Pearl River Delta electronics, hardware and e-commerce shipments.', watch:'Tech controls, holiday backlogs, typhoons and US consumer demand.', matters:'Small disruptions can ripple through global electronics supply chains.'},
  'Santos': {tag:'Brazil agribusiness gateway', lens:'Santos moves soy, sugar, coffee and containers from Brazil’s interior to global markets.', watch:'Harvest size, road/rail bottlenecks, China demand and currency movements.', matters:'It turns Brazilian land and agriculture into export power.'},
  'Durban': {tag:'Southern Africa gateway', lens:'Durban links South African industry and regional trade to the Indian Ocean.', watch:'Rail reliability, port reform, power shortages and regional corridors.', matters:'It is a logistics constraint on Southern Africa’s growth.'},
  'Suez/Port Said': {tag:'Canal chokepoint', lens:'Suez compresses Asia-Europe shipping into a narrow Egyptian corridor where time, insurance and security meet.', watch:'Red Sea attacks, canal fees, rerouting around Africa and Egyptian FX needs.', matters:'A local shock here becomes a global shipping cost shock.'},
  'Panama Canal': {tag:'Two-ocean shortcut', lens:'Panama monetizes geography by letting ships avoid the long route around South America.', watch:'Drought, vessel restrictions, US-Asia flows and canal pricing.', matters:'It proves that water levels can become a macroeconomic variable.'},
  'Mumbai/JNPT': {tag:'India west-coast gateway', lens:'JNPT connects India’s industrial west with container shipping, energy imports and consumer demand.', watch:'Dedicated freight corridors, port expansion, rupee moves and manufacturing growth.', matters:'It is central to India’s attempt to become a larger export platform.'},
  'Piraeus': {tag:'Mediterranean bridge', lens:'Piraeus links Mediterranean shipping, Balkan corridors and Europe-Asia trade strategy.', watch:'Rail links into Europe, Greek tourism cycles and China-Europe politics.', matters:'It shows how ports can become geopolitical infrastructure.'},
  'Antwerp-Bruges': {tag:'Chemicals and logistics hub', lens:'Antwerp-Bruges combines container trade with one of Europe’s deepest petrochemical and industrial clusters.', watch:'Energy prices, chemical demand, customs security and North Sea competition.', matters:'It is not just a port: it is an industrial ecosystem.'}
};

function generatedEntityProfile(item){
  if(!item) return null;
  if(item.type==='port'){
    return {
      tag:item.desc || 'Port / chokepoint',
      lens:`${item.name} is a logistics node where maritime routes, customs, storage and inland transport meet.`,
      watch:'Container flows, terminal capacity, hinterland rail/roads, labor reliability, weather and geopolitical disruption.',
      matters:'Ports turn geography into economic power by deciding how fast goods, energy and inputs reach markets.'
    };
  }
  return {
    tag:item.desc || (item.type==='finance' ? 'Finance and services hub' : 'City / economic node'),
    lens:`${item.name} concentrates people, firms, infrastructure and decision-making into one urban economy.`,
    watch:'Investment flows, housing pressure, transport capacity, talent concentration and national policy choices.',
    matters:'Cities make national economies visible: they show where capital, workers and infrastructure actually meet.'
  };
}
function getEntityProfile(item){
  if(!item) return null;
  if(item.type==='port') return portProfiles[item.name] || generatedEntityProfile(item);
  return cityProfiles[item.name] || generatedEntityProfile(item);
}

const tradeRoutes = [
  {name:'Asia → Europe via Malacca, Suez and Rotterdam', type:'trade', desc:'The classic sea corridor from East Asian factories through the Taiwan Strait, South China Sea, Malacca, Indian Ocean, Bab el-Mandeb, Red Sea, Suez, Mediterranean and Northern Europe.', pts:[[121.8,31.2],[122,24],[118,18],[110,8],[103.75,1.25],[95,5],[83,7],[70,10],[58,12],[48,12],[43.3,12.6],[40,18],[37,23],[32.3,30.4],[28,33],[20,36],[12,40],[4.47,51.92]]},
  {name:'Pacific electronics route', type:'trade', desc:'A trans-Pacific sea lane linking East Asian electronics clusters with North American consumer and tech markets.', pts:[[121.8,31.2],[130,32],[145,35],[160,39],[178,42],[-170,43],[-155,42],[-140,40],[-126,36],[-118.24,33.74]]},
  {name:'Atlantic agribusiness and energy route', type:'route', desc:'A South Atlantic sea lane moving food, minerals and energy from Brazil and West Africa toward European ports.', pts:[[-46.33,-23.96],[-38,-25],[-28,-18],[-20,-8],[-18,5],[-17,18],[-12,28],[-9,36],[-5,44],[4.47,51.92]]},
  {name:'Panama inter-oceanic corridor', type:'route', desc:'A water route joining the Pacific and Atlantic systems through the Panama Canal, one of globalization’s narrow gates.', pts:[[-118.24,33.74],[-110,25],[-92,12],[-79.55,9.08],[-78,18],[-74,40.7]]},
  {name:'Gulf oil to Asia', type:'route', desc:'Energy flows from the Gulf across the Arabian Sea and Indian Ocean toward Asian industrial demand.', pts:[[51,25],[58,23],[68,16],[80,7],[103.75,1.25],[121.8,31.2]]}
];

const stories = [
  ["pix-brazil","🇧🇷","How Pix changed Brazil","Brazil","Fintech","How a public instant payment system changed daily life, small businesses and money in Brazil.",[-47.88,-15.8]],
  ["singapore-rich","🇸🇬","Why Singapore became rich","Singapore","Development","How a small island with few resources became one of the world’s most useful economic hubs.",[103.85,1.29]],
  ["argentina-currency","🇦🇷","Why Argentina keeps facing currency crises","Argentina","Macro","Why inflation, dollars, debt and mistrust keep pulling Argentina back into crisis.",[-58.38,-34.6]],
  ["ports-matter","⚓","Why ports matter more than you think","Global","Logistics","How ports, containers and chokepoints quietly hold the world economy together.",[103.75,1.25]],
  ["taiwan-strait","🇹🇼","Why the Taiwan Strait matters","Taiwan","Geopolitics","Why one narrow waterway connects chips, China, the United States and global technology.",[121,24]]
].map(([id,icon,title,place,category,description,coords])=>({id,icon,title,place,category,description,coords,coming:false}));

const comingSoon = [];

const didYouKnow = [
  {text:'Brazil’s Pix payment system reached mass adoption in only a few years.', story:'pix-brazil'},
  {text:'Singapore has almost no natural resources, yet became one of the richest economies in the world.', story:'singapore-rich'},
  {text:'Argentina’s peso crisis is also a crisis of memory and trust.', story:'argentina-currency'},
  {text:'Ports and canals are invisible until they break — then prices and delays reveal them.', story:'ports-matter'},
  {text:'Taiwan’s chip industry is one of the world economy’s biggest pressure points.', story:'taiwan-strait'}
];
let factIndex = Math.floor(Math.random()*didYouKnow.length);

const dailyBrief = [
  {
    "cat": "Energy",
    "place": "Global",
    "title": "Oil shock risk is worsening as inventories are drained fast",
    "h": "The biggest global macro story is the energy shock linked to the Iran war and the Strait of Hormuz. The International Energy Agency warned that global commercial oil inventories are being depleted rapidly. In simple terms, this means the world is using stored oil faster than expected. Strategic reserves have helped by adding supply, but they are not unlimited. Reuters reported that global oil inventories fell by a record 246 million barrels in March and April, while the IEA revised its 2026 oil supply forecast downward.",
    "m": "Oil affects almost everything: transport, food prices, electricity, factories, shipping, inflation, and central-bank decisions. If oil prices stay high, households pay more for fuel and energy. Companies face higher costs. Central banks may hesitate to cut interest rates because inflation could remain too strong. The simple chain is: war risk → oil supply fear → higher oil prices → inflation pressure → higher interest rates → weaker growth.",
    "sources": [
      {
        "name": "Reuters — IEA warning on commercial oil inventories",
        "url": "https://www.reuters.com/business/energy/iea-chief-birol-commercial-oil-inventories-depleting-rapidly-only-weeks-left-2026-05-18/"
      },
      {
        "name": "International Energy Agency — May 2026 Oil Market Report",
        "url": "https://www.iea.org/reports/oil-market-report-may-2026"
      }
    ]
  },
  {
    "cat": "Finance",
    "place": "G7",
    "title": "Global bond markets are under pressure, raising spending-crunch fears",
    "h": "Government bond yields have risen sharply across major economies. A bond yield is basically the interest rate a government must pay when it borrows money. When yields rise, borrowing becomes more expensive. Reuters reported that the U.S. 10-year Treasury yield climbed to around 4.6%, its highest level in more than a year. Yields also rose in Japan and Europe. Investors are worried that the oil shock and geopolitical instability could keep inflation higher for longer.",
    "m": "Higher bond yields make borrowing more expensive for everyone: governments, companies, banks, and households. That can create a spending squeeze. Governments have less room to spend. Companies delay investment. Consumers borrow less. Mortgage rates can stay high. Growth can slow. The simple chain is: inflation fear → higher bond yields → more expensive borrowing → weaker spending → slower growth.",
    "sources": [
      {
        "name": "Reuters — global bond rout and spending-crunch fears",
        "url": "https://www.reuters.com/world/europe/global-bond-rout-deepens-inflation-fears-mount-2026-05-18/"
      },
      {
        "name": "Reuters — G7 finance chiefs discuss bond volatility and inflation risks",
        "url": "https://www.reuters.com/world/china/g7-finance-chiefs-seek-tackle-imbalances-trade-strains-unity-2026-05-18/"
      }
    ]
  },
  {
    "cat": "Macro",
    "place": "China",
    "title": "China’s economy is showing renewed weakness despite export resilience",
    "h": "China’s latest economic data showed signs of weakness. Industrial output rose by 4.1% year-on-year, retail sales increased by only 0.2%, and fixed-asset investment fell 1.6% over January to April. This means factories are still producing, but households are not spending strongly enough. China’s economy remains unbalanced: production and exports are stronger than domestic consumption. The property crisis, weak confidence, and uncertainty continue to weigh on Chinese consumers.",
    "m": "China is one of the main engines of the global economy. If Chinese consumers are weak, global companies that sell to China suffer. If China keeps producing more than it consumes, it may rely even more on exports. That can increase trade tensions with the United States and Europe. The simple idea is: China produces a lot, but if Chinese consumers do not buy enough, the rest of the world absorbs the pressure through trade imbalances.",
    "sources": [
      {
        "name": "Reuters — China April industrial output and retail sales data",
        "url": "https://www.reuters.com/world/asia-pacific/chinas-april-industrial-output-retail-sales-growth-miss-expectations-2026-05-18/"
      }
    ]
  },
  {
    "cat": "Trade",
    "place": "U.S.–China",
    "title": "U.S.–China trade tensions cooled slightly through a new agriculture deal",
    "h": "China agreed to increase purchases of U.S. agricultural goods after the Trump–Xi summit in Beijing. The agreement includes purchases of U.S. beef and poultry at an annual rate of around $17 billion from 2026 to 2028, alongside broader agricultural trade commitments. This could help American farmers, especially after U.S. agricultural exports to China had fallen during the trade war. However, it may also affect exporters such as Brazil, Australia, and Canada if China shifts some purchases away from them and toward the United States.",
    "m": "This is not only about beef, poultry, or soybeans. It shows the return of managed trade. Instead of trade being guided only by prices and markets, governments negotiate purchase targets. That can reduce tensions temporarily, but it does not solve the deeper U.S.–China rivalry over technology, tariffs, industrial policy, and strategic dependence. The simple idea is: the deal helps farmers and reduces short-term tension, but it does not end the trade-war logic.",
    "sources": [
      {
        "name": "AP — China agrees to boost U.S. beef and poultry trade",
        "url": "https://apnews.com/article/832bafb5ca0be21e4a1d149c5db56b58"
      },
      {
        "name": "Reuters — impact of China’s new U.S. farm purchases on global trade",
        "url": "https://www.reuters.com/world/china/what-do-chinas-new-us-farm-purchases-mean-global-trade-2026-05-18/"
      }
    ]
  },
  {
    "cat": "Geopolitics",
    "place": "G7",
    "title": "G7 finance leaders are worried about global imbalances and critical minerals",
    "h": "At the G7 finance meeting in Paris, officials focused on global imbalances, bond-market volatility, and dependence on China for critical minerals. French finance minister Roland Lescure described the global economy as distorted by three major imbalances: China’s under-consumption, U.S. over-consumption, and Europe’s under-investment. The G7 also discussed critical minerals, which are needed for electric vehicles, batteries, renewable energy, electronics, defense, and advanced technology.",
    "m": "The world economy is becoming more political. Countries are no longer asking only: Where is the cheapest supplier? They are also asking: Who controls the materials we need for batteries, chips, weapons, grids, and clean energy? The simple idea is: supply chains are no longer judged only by price, but also by security.",
    "sources": [
      {
        "name": "Reuters — G7 finance meeting, global imbalances, bond volatility, and critical minerals",
        "url": "https://www.reuters.com/world/china/g7-finance-chiefs-seek-tackle-imbalances-trade-strains-unity-2026-05-18/"
      },
      {
        "name": "Reuters — Germany says G7 has “no time to lose” on rare-earth dependence",
        "url": "https://www.reuters.com/world/china/g7-countries-have-no-time-lose-bid-cut-rare-earths-dependencies-germanys-2026-05-18/"
      }
    ]
  }
];

const modules = [
  ['📈','Inflation','Why prices rise — and why it matters.'],['🚢','Trade','How countries exchange goods, services, and IOUs.'],['💱','Currency','What gives money its value.'],['🏦','Debt','Why governments borrow — and when it becomes dangerous.'],['⚡','Energy','The hidden input behind every economy.'],['🏗️','Development',"How poor countries become rich — or don't."],['🌍','Geography','Why location still shapes power.'],['🧩','Institutions','The rules behind prosperity.'],['💾','Technology','How innovation changes national power.'],['🛡️','Sanctions','How finance becomes a weapon.']
].map(([icon,title,desc],i)=>({icon,title,desc,num:String(i+1).padStart(2,'0')}));

const storySteps = {
  'ports-matter': [
    {title:'A small country can become powerful through trade',place:'Singapore',coords:[103.75,1.25],text:'Singapore is a small island country, but its port connects many parts of the world. In 2024, Singapore handled 41.12 million TEUs of containers. A TEU is the standard unit used to count shipping containers. Around 90% of Singapore’s container traffic was transshipment, meaning many goods were passing through on the way to another country. Simple lesson: a port can make a small country powerful if it becomes useful to global trade.'},
    {title:'A shortcut that the world depends on',place:'Suez Canal, Egypt',coords:[32.3,30.4],text:'The Suez Canal connects the Mediterranean Sea to the Red Sea. It lets ships travel between Europe and Asia without going all the way around Africa. That saves time and fuel. But because so many ships depend on it, disruption can create global problems. Simple lesson: a shortcut is useful, but it becomes risky when too much trade depends on it.'},
    {title:'Even trade depends on water',place:'Panama Canal',coords:[-79.55,9.08],text:'The Panama Canal connects the Atlantic Ocean and the Pacific Ocean. Without it, many ships would need longer routes around South America. But the canal depends on water: its lock system uses water to lift and lower ships. Drought can reduce how many ships pass. Simple lesson: even modern trade can be slowed down by something basic: not enough water.'},
    {title:'Where global trade becomes daily life',place:'Rotterdam, Netherlands',coords:[4.47,51.92],text:'Rotterdam is one of Europe’s biggest ports. Goods arrive by ship and then move inland by truck, train, river or pipeline. These goods can become supermarket products, factory inputs, fuel, chemicals, construction materials or medicines. Simple lesson: ports connect the global economy to ordinary homes, shops, factories and cities.'}
  ]
};
const globeStoryIds = Object.keys(storySteps);

const storyCountryTags = {
  'pix-brazil': ['Brazil'],
  'singapore-rich': ['Singapore'],
  'argentina-currency': ['Argentina'],
  'ports-matter': ['Singapore','Egypt','Panama','Netherlands','Global'],
  'taiwan-strait': ['Taiwan','China','United States','Japan','South Korea','Philippines','Australia']
};

const storyReadingTimes = {
  "pix-brazil": {
    "quick": "1–2 min",
    "medium": "5–6 min",
    "deep": "9–11 min"
  },
  "singapore-rich": {
    "quick": "1–2 min",
    "medium": "5–6 min",
    "deep": "9–10 min"
  },
  "argentina-currency": {
    "quick": "1–2 min",
    "medium": "5–7 min",
    "deep": "10–12 min"
  },
  "ports-matter": {
    "quick": "1–2 min",
    "medium": "5–6 min",
    "deep": "9–11 min"
  },
  "taiwan-strait": {
    "quick": "1–2 min",
    "medium": "5–7 min",
    "deep": "10–12 min"
  }
};

function estimateMinutes(text, layer, storyId=''){
  if(storyReadingTimes[storyId] && storyReadingTimes[storyId][layer]) return storyReadingTimes[storyId][layer];
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const m = Math.max(1, Math.round(words / 185));
  return `${m} min`;
}

const mexicoNearshoringLayers = {};

const customStoryProfiles = {};

const independentStoryLayers = {
  "pix-brazil": {
    "quick": "Sources and recommended reading: Brazil’s central bank explains that Pix has operated since November 16, 2020, as an instant payment system. Data summaries based on Central Bank figures report around 165 million individual Pix users by early 2025. https://www.bcb.gov.br/en/financialstability/pix_en\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\nPix is Brazil’s instant payment system.\n\nIt lets people send and receive money in seconds, using a phone. You can pay with a QR code, a phone number, an email, or a Pix key. The money arrives almost immediately, even at night, on weekends, or during holidays.\n\nThat sounds simple, but it changed daily life in Brazil.\n\nImagine a small food seller in São Paulo, Rio de Janeiro, Brasília, or a smaller town. Before Pix, the seller often needed cash, a card machine, or a slower bank transfer. Cash could be risky. Card machines could be expensive. Bank transfers could be slow.\n\nWith Pix, the seller can show a QR code, the customer scans it, and the payment arrives in seconds.\n\nPix was launched by the Central Bank of Brazil in 2020. That is important because it was not simply a private app trying to make profit. It was public digital infrastructure: a basic system that many banks, businesses, and people could use.\n\nBy early 2025, around 165 million individuals had signed up for Pix. In a country of around 200 million people, that is enormous. It means Pix became part of normal life: paying a shop, sending money to family, splitting a bill, receiving business payments, or paying for services.\n\nBut Pix also created risks. If money moves instantly, scams can also happen instantly. A person can be tricked into sending money very quickly. So Pix is both a success story and a warning: faster finance needs stronger protection.",
    "medium": "Sources and recommended reading: Brazil’s central bank explains that Pix has operated since November 16, 2020, as an instant payment system. Data summaries based on Central Bank figures report around 165 million individual Pix users by early 2025. https://www.bcb.gov.br/en/financialstability/pix_en\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\n01 — Why payments matter\nPayments may sound boring, but they are one of the most important parts of an economy. Every day, people need to pay and be paid. A shop sells food. A worker receives money. A family sends support to a relative. A company pays suppliers. A customer pays a bill.\n\nIf payments are slow, expensive, or complicated, the whole economy becomes less efficient. Think of an economy like a city. Roads help people and goods move. If the roads are blocked, everything slows down. A payment system is like a road for money. If money cannot move easily, people and businesses struggle.\n\nBefore Pix, Brazil already had banks, cards, and transfers. But many payments still had problems. Card payments could involve fees. Bank transfers could be slower or limited. Cash was simple, but it could be unsafe and hard to track. For small businesses and informal workers, this mattered a lot.\n\n02 — What Pix changed\nPix made digital payments instant and simple. A person can send money with a phone. A customer can scan a QR code. A small business can receive money without needing a traditional card machine. A family can send emergency money immediately.\n\nThis is why Pix became so popular. It solved a real problem in ordinary life. It was not only useful for big companies. It was useful for everyone: students, parents, street vendors, small shops, restaurants, hairdressers, taxi drivers, online sellers, and families.\n\nPix also works outside normal banking hours. This matters because life does not happen only from Monday to Friday. People need to pay at night. They need to send money on Sundays. Businesses need to receive money quickly. Pix made this normal.\n\n03 — Why the Central Bank matters\nPix was created by Brazil’s central bank. This is one of the most important parts of the story. Usually, when people think about financial innovation, they imagine private companies: banks, fintech startups, card networks, or payment apps. But Pix shows that a public institution can also create powerful innovation.\n\nThe Central Bank created a basic payment system that many financial institutions had to connect to. This made Pix feel universal. It was not locked inside one bank or one company. That gave Pix a strong advantage: people could use it across the financial system.\n\nThis also increased competition. If people can transfer money instantly and cheaply, banks and payment companies have to improve their services. They cannot rely only on controlling basic payments.\n\n04 — Why Pix helped small businesses\nPix helped small businesses because it reduced friction. Friction means the little difficulties that make an action harder: fees, waiting time, paperwork, machines, uncertainty, or complicated steps.\n\nFor a small seller, friction is expensive. If accepting card payments costs too much, the seller may prefer cash. If customers do not carry cash, the seller may lose sales. If bank transfers are slow, the seller may not trust the payment.\n\nPix made payment easier. A customer can pay quickly. The seller receives money quickly. The transaction is digital. This can help small businesses sell more easily and manage money better.\n\n05 — Why Pix is linked to financial inclusion\nFinancial inclusion means that more people can use financial services. This includes payments, savings, transfers, credit, and insurance. Pix is not all of finance, but it is an entry point. It helps people become more connected to digital money.\n\nFor example, a person who used mostly cash can now receive digital payments. A worker can receive money instantly. A seller can build a record of transactions. A family can send support without needing physical cash.\n\nThis matters in Brazil because the informal economy is important. Many people work outside traditional contracts or formal business structures. Pix gives these people a simple digital tool.\n\n06 — The risk of scams\nPix is fast. That is its strength. But speed can also be dangerous. If someone is tricked into sending money, the transfer happens immediately. Scammers can pretend to be relatives, banks, shops, or officials. Criminals can pressure people into paying quickly.\n\nThis means Pix needs strong security rules, education, fraud detection, and ways to help victims. The lesson is not that Pix is bad. The lesson is that every powerful technology creates new responsibilities.",
    "deep": "Sources and recommended reading: Brazil’s central bank explains that Pix has operated since November 16, 2020, as an instant payment system. Data summaries based on Central Bank figures report around 165 million individual Pix users by early 2025. https://www.bcb.gov.br/en/financialstability/pix_en\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\n01 — Start with a simple idea: money needs roads\nWhen we think about economic development, we often think about factories, education, roads, ports, energy, or natural resources. But money also needs infrastructure.\n\nIf you want to buy bread, pay rent, send money to your family, receive your salary, or run a business, money has to move. If it moves slowly or expensively, life becomes harder.\n\nA payment system is the infrastructure that lets money move. In the past, this infrastructure was often controlled by banks, card companies, and older transfer systems. These systems worked, but not always equally well for everyone. Large companies usually had access to better tools. Small businesses and ordinary people often faced more friction. Pix changed this in Brazil.\n\n02 — Brazil before Pix\nBefore Pix, Brazil was not financially primitive. It had large banks, digital banking, cards, and transfers. But there were still many problems.\n\nCash was widely used, especially for small payments. Cash is easy to understand, but it has weaknesses. It can be lost or stolen. It is hard to use online. It does not create a digital record. It can make business management harder.\n\nCard payments were useful, but they often involved fees and machines. For a small seller, this could be a barrier. Traditional transfers existed, but they were not always instant, simple, or available at any time.\n\nSo the problem was not that Brazil had no payment system. The problem was that payment was still too costly or complicated for many daily situations. Pix attacked this problem directly.\n\n03 — What Pix actually is\nPix is an instant payment system created by the Central Bank of Brazil. It allows people and businesses to send money immediately. Users can pay with QR codes or simple identifiers called Pix keys. These keys can be linked to a phone number, email, tax ID, or random code.\n\nThe idea is to avoid the complicated details of traditional bank transfers. Instead of needing full bank information, the user can send money in a simple way. Pix works 24 hours a day, 7 days a week.\n\nThis matters. A payment system that only works during business hours does not match real life. People buy food at night. Families need emergency transfers on Sundays. Small businesses operate during weekends. Pix made instant payment normal.\n\n04 — Why adoption became so fast\nPix spread quickly because it was useful immediately. Many technologies fail because they are interesting but not necessary. Pix solved a problem people already had.\n\nFor consumers, Pix was convenient. For sellers, Pix was practical. For banks, Pix became impossible to ignore. For the central bank, Pix helped modernize the payment system.\n\nThe network effect was powerful. A network effect means that a service becomes more useful when more people use it. A phone is useless if nobody else has one. A payment system is less useful if few shops accept it. But once many people and businesses use Pix, everyone else has an incentive to join.\n\nBy early 2025, around 165 million individuals were signed up for Pix. That shows the network effect had become massive.\n\n05 — Pix as public infrastructure\nThe most interesting part of Pix is not only that it is digital. It is that it is public infrastructure.\n\nPublic infrastructure does not mean every detail is run directly by the state. It means the state creates or organizes a basic system that many people can use. Roads are public infrastructure. Electricity grids are infrastructure. Internet cables are infrastructure. Pix is financial infrastructure.\n\nThis changes the way we think about innovation. Innovation is not always a private company creating an app. Sometimes innovation is a public institution creating rules, standards, and systems that make markets work better.\n\nPix forced the financial sector to adapt. If basic transfers are fast and cheap, banks must compete on other services: credit, investment, customer experience, insurance, business tools, and trust.\n\n06 — Why Pix matters for inequality\nPix does not eliminate inequality. It does not create jobs by itself. It does not make poor families rich overnight. But it lowers one barrier.\n\nA person who struggles with traditional banking can still use a simple payment tool. A small seller can accept digital money. A family can transfer money instantly. A worker can receive payment without delay. In a country with large inequalities and a large informal economy, that matters.\n\nThe informal economy includes work and business activity that is not fully inside official contracts, tax systems, or formal companies. In such an economy, payment tools can help people connect to more formal services.\n\n07 — The fraud problem\nNo serious story about Pix should ignore fraud. Instant payment means instant risk. If a scammer convinces someone to send money, the money moves quickly. If a person is threatened, pressured, or tricked, the damage can happen in seconds.\n\nSo Pix creates a policy challenge: how do you keep speed while protecting people? Possible answers include transaction limits, fraud monitoring, user education, bank responsibility, reporting systems, and tools to block suspicious accounts.\n\n08 — The global lesson\nPix matters because it shows a different future for digital finance. In some countries, digital payments are dominated by private apps. In others, card networks remain central. In Brazil, the central bank created a system that became part of everyday life.\n\nThis makes Pix a major case study for development, competition, public technology, and financial inclusion. Its deeper lesson is simple: sometimes, the most powerful economic reforms are tools that make daily life easier for millions of people."
  },
  "singapore-rich": {
    "quick": "Sources and recommended reading: Singapore’s Maritime and Port Authority reported that in 2024 Singapore reached a record 41.12 million TEUs in container throughput, with around 90% of container traffic used for transshipment. https://www.mpa.gov.sg/media-centre/details/strong-growth-momentum-for-maritime-singapore\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\nSingapore became rich even though it had almost no natural resources.\n\nThat is what makes the story interesting.\n\nWhen Singapore became independent in 1965, it was small, vulnerable, and uncertain about its future. It had little land. It had no oil. It had no big farms. It did not have a huge internal market like China, India, or the United States.\n\nSo Singapore could not simply rely on selling natural resources or selling goods to a huge domestic population. Instead, it chose a different strategy: become useful to the world.\n\nSingapore built one of the world’s best ports. It invested in education, housing, public order, clean administration, transport, and reliable rules. It became a place where ships, companies, banks, investors, and workers could operate efficiently.\n\nIts location helped. Singapore sits near the Strait of Malacca, one of the most important maritime routes in the world. But location alone is not enough. A good location only becomes powerful if it is organized well.\n\nIn 2024, Singapore handled 41.12 million TEUs of containers. Around 90% of that was transshipment, meaning goods passed through Singapore on the way to another destination.\n\nThat is the key idea: Singapore became rich by becoming a hub.",
    "medium": "Sources and recommended reading: Singapore’s Maritime and Port Authority reported that in 2024 Singapore reached a record 41.12 million TEUs in container throughput, with around 90% of container traffic used for transshipment. https://www.mpa.gov.sg/media-centre/details/strong-growth-momentum-for-maritime-singapore\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\n01 — Singapore started with a weak hand\nSingapore’s success was not obvious at the beginning. When it became independent in 1965, it faced many problems. It was small. It had limited land. It had few natural resources. It depended heavily on trade. It had unemployment, housing pressure, and ethnic tensions.\n\nMany countries with more resources have struggled to become rich. Singapore had fewer easy advantages than many of them. This is why Singapore’s story is not just about geography. It is about strategy.\n\nThe country had to answer a basic question: if we are small and resource-poor, how do we survive? The answer was: connect to the world economy and become extremely efficient.\n\n02 — The port was the foundation\nSingapore is located near the Strait of Malacca. This is one of the busiest sea routes in the world. Ships moving between the Indian Ocean, East Asia, the Middle East, and Europe pass near this area.\n\nThat location gave Singapore an opportunity. But a port does not become powerful just because it is well located. Ships need speed, safety, fuel, repairs, customs systems, legal reliability, and good connections to other routes.\n\nSingapore invested in all of this. Its port became not just a place where ships stop, but a complete logistics machine. Goods could arrive, be unloaded, stored, sorted, transferred, and sent somewhere else.\n\nThis is why the number 41.12 million TEUs in 2024 matters. It shows scale. Singapore is not moving a few ships. It is moving a huge part of global container trade.\n\n03 — What transshipment means\nA very important word for Singapore is transshipment. Transshipment means goods pass through a place on the way to another destination.\n\nFor example, a container may leave China, pass through Singapore, and then go to Europe, India, or another Southeast Asian country. The container is not necessarily meant for Singapore’s consumers. Singapore is acting as a connector.\n\nIn 2024, around 90% of Singapore’s container throughput was transshipment. That means Singapore’s port is much bigger than what the local economy alone would require.\n\n04 — Singapore became more than a port\nThe port was the beginning, but not the whole story. Singapore also became a center for finance, shipping services, oil trading, logistics, electronics, pharmaceuticals, technology, and regional headquarters.\n\nA regional headquarters is when a multinational company uses Singapore as a base to manage operations in Asia. Companies choose Singapore because it offers stability, skilled workers, strong infrastructure, clear rules, and good connections.\n\nCompanies do not only look for cheap labor. They also look for reliability. They want electricity that works, contracts that are respected, corruption that is low, courts that function, ports that are efficient, and workers who are trained.\n\n05 — The role of education and the state\nSingapore could not rely on natural resources, so it invested in people. Education helped the country move from lower-value activities to higher-value ones: engineering, finance, technology, research, advanced logistics, medicine, and management.\n\nThe government also played a central role. It invested in public housing, infrastructure, transport, education, health, industrial planning, and administrative efficiency. The lesson is not that every country can copy Singapore exactly. The lesson is that state capacity matters.\n\nState capacity means the government can actually do what it says. It can build roads, run schools, enforce rules, reduce corruption, manage ports, and plan for the long term.\n\n06 — Singapore’s vulnerability\nSingapore is rich, but it is still vulnerable. It imports much of its food and energy. It has limited land. It depends on global trade. If shipping is disrupted, if global demand falls, or if geopolitical conflict rises, Singapore can be affected.\n\nSo Singapore must keep adapting. The country’s wealth is not guaranteed by oil or minerals under the ground. It depends on performance. Singapore must stay useful.",
    "deep": "Sources and recommended reading: Singapore’s Maritime and Port Authority reported that in 2024 Singapore reached a record 41.12 million TEUs in container throughput, with around 90% of container traffic used for transshipment. https://www.mpa.gov.sg/media-centre/details/strong-growth-momentum-for-maritime-singapore\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\n01 — A small country with a big problem\nSingapore’s development story begins with a difficult fact: the country did not have the usual ingredients of power. It did not have a large territory. It did not have oil fields. It did not have major mineral wealth. It did not have a huge internal market. It did not have large agricultural land.\n\nFor many countries, these things matter. Oil can bring export revenue. Farmland can support food production. A large population can create a large internal market. A large territory can provide natural resources and strategic depth.\n\nSingapore had almost none of this. So Singapore had to build wealth through connection, organization, and trust.\n\n02 — Why location helped\nSingapore’s location is one of its biggest advantages. It sits near the Strait of Malacca, a narrow maritime corridor between the Indian Ocean and the Pacific side of Asia. This route connects major economies: China, Japan, South Korea, Southeast Asia, India, the Middle East, and Europe.\n\nShips naturally pass near Singapore. But location is only potential. It is like being born near a busy road. You still need to build a useful service station, warehouse, market, or transport system. Otherwise the traffic passes by without helping you much.\n\nSingapore transformed location into an economic system.\n\n03 — Ports as development engines\nSingapore’s port became a development engine. A port can do more than unload ships. It can attract shipping companies, warehouses, fuel services, insurance, finance, legal services, customs specialists, logistics firms, and manufacturers.\n\nWhen all these activities gather in one place, they reinforce each other. A ship comes because the port is efficient. A logistics company comes because ships are there. A bank comes because trade finance is needed. A company headquarters comes because the region can be managed from there. Workers become trained because firms need skills.\n\nIn 2024, Singapore’s port handled 41.12 million TEUs, and around 90% of that container traffic was transshipment. That means Singapore was serving global trade, not just itself.\n\n04 — Why trust is economic power\nOne of Singapore’s biggest assets is trust. Trust sounds abstract, but it has real economic value.\n\nIf companies trust the courts, they are more willing to sign contracts. If ships trust the port, they are more willing to stop there. If investors trust the rules, they are more willing to put money there. If citizens trust that the city works, daily life becomes more stable.\n\nTrust reduces uncertainty. Uncertainty is expensive. If a business fears corruption, legal confusion, electricity cuts, strikes, or sudden policy changes, it may avoid investing. Singapore tried to make itself predictable. That predictability became part of its economic brand.\n\n05 — Public housing and social stability\nSingapore also invested heavily in public housing. This matters more than people think. A city cannot become a productive economic hub if workers cannot live there, move around, or build stable lives. Housing affects social peace, family stability, savings, and the relationship between citizens and the state.\n\nSingapore’s public housing system helped create a more organized urban society. It gave many residents a stake in the country’s development. This does not mean the system has no problems. Singapore faces high living costs and pressure on space. But housing was still a central part of the development model.\n\n06 — Moving up the value chain\nAt the beginning, Singapore needed jobs. Manufacturing helped. But a country cannot become very rich forever by doing only simple, low-wage production. As wages rise, cheaper countries can compete. The country must move into more advanced activities.\n\nThis is called moving up the value chain. Singapore moved into electronics, petrochemicals, pharmaceuticals, finance, high-end logistics, aviation, technology, and regional management. This required education, infrastructure, foreign investment, and planning.\n\n07 — Foreign investment, but with a strategy\nMany developing countries want foreign investment. But foreign investment can be shallow if it only uses cheap labor and leaves little behind.\n\nSingapore tried to use foreign investment as a learning tool. Foreign companies brought technology, management methods, training, and access to global markets. Singapore offered them stability and infrastructure. Over time, the country developed more skills and deeper industries.\n\n08 — The limits of the Singapore model\nSingapore’s model is impressive, but it is not perfect and not easy to copy. Singapore is very small. That makes some policies easier to organize. A large country with rural regions, deep inequality, weak institutions, or political fragmentation cannot simply copy Singapore.\n\nSingapore also depends heavily on global trade. If the world becomes more protectionist, more unstable, or more divided, Singapore faces risks. It also faces social pressures: high housing costs, competition for jobs, inequality concerns, and the challenge of staying innovative.\n\n09 — The deeper lesson\nSingapore became rich because it understood its weakness and built a strategy around it. It could not be self-sufficient, so it became connected. It could not rely on natural resources, so it invested in people and systems. It could not dominate through size, so it became indispensable through efficiency."
  },
  "argentina-currency": {
    "quick": "Sources and recommended reading: In April 2025, the IMF approved a 48-month, US$20 billion Extended Fund Facility for Argentina, including an immediate US$12 billion disbursement. https://www.imf.org/en/news/articles/2025/04/12/pr25101-argentina-imf-executive-board-approves-48-month-usd20-billion-extended-arrangement\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\nArgentina often has currency crises because many people do not trust the peso.\n\nThe peso is Argentina’s national currency. In theory, people should use it not only to buy things today, but also to save for tomorrow. But in Argentina, many people prefer to save in U.S. dollars.\n\nThis is not just a habit. It comes from history. Argentina has experienced repeated inflation, devaluations, debt crises, and controls on access to dollars. Many people have seen the peso lose value again and again.\n\nSo when Argentinians fear another crisis, they often try to protect themselves by buying dollars. But this creates a loop.\n\nIf many people want dollars, demand for dollars rises. If people do not want pesos, the peso weakens. When the peso weakens, imported goods become more expensive. When imports become more expensive, prices can rise. When prices rise, people trust the peso even less.\n\nThis is why Argentina’s currency problem is not only about economics. It is also about memory and trust.\n\nIn 2025, Argentina agreed to a new US$20 billion IMF program, showing again how difficult it is for the country to stabilize its economy.",
    "medium": "Sources and recommended reading: In April 2025, the IMF approved a 48-month, US$20 billion Extended Fund Facility for Argentina, including an immediate US$12 billion disbursement. https://www.imf.org/en/news/articles/2025/04/12/pr25101-argentina-imf-executive-board-approves-48-month-usd20-billion-extended-arrangement\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\n01 — What is a currency crisis?\nA currency crisis happens when people lose confidence in a country’s money. Imagine you are paid in pesos. Today, your money can buy food, transport, clothes, and rent. But if you think prices will rise quickly, you may worry that your pesos will buy less next month.\n\nSo you try to protect yourself. In Argentina, many people protect themselves by buying U.S. dollars. The dollar is seen as safer because it is used around the world and usually loses value more slowly than the peso.\n\nThis is understandable. But if everyone tries to escape the peso at the same time, the peso becomes weaker. That is the beginning of the crisis.\n\n02 — Why the dollar matters so much in Argentina\nIn many countries, people mostly save in their own currency. In Argentina, the dollar plays a special role. People may use pesos for daily purchases, but dollars for savings, property, and long-term security.\n\nThis is because Argentina has lived through many moments when the peso lost value. When people experience inflation and devaluation repeatedly, they learn to protect themselves.\n\nThis creates dollar thinking. People do not only ask, “How many pesos do I have?” They also ask, “How many dollars is this worth?” That is a sign of weak trust in the national currency.\n\n03 — Inflation makes trust weaker\nInflation means prices are rising. A little inflation is normal in many economies. But high inflation is dangerous because it changes how people behave.\n\nIf shop owners expect costs to rise, they raise prices early. If workers expect prices to rise, they demand higher wages. If families expect the peso to lose value, they spend quickly or buy dollars. If investors expect instability, they take money out of the country.\n\nEach person is trying to protect themselves. But when everyone acts defensively, the crisis can get worse. This is why inflation is not only a number. It becomes a social behavior.\n\n04 — Argentina needs dollars\nArgentina needs dollars for several reasons. It imports goods from abroad: energy, machines, medicine, technology, industrial parts, and consumer products. Many of these imports are paid in dollars. It also has foreign debt. Some debt must be repaid in dollars.\n\nArgentina earns dollars by exporting goods and services. Important exports include soy, wheat, beef, energy, lithium, and other products. The problem appears when Argentina does not earn enough dollars to pay for everything it needs.\n\nThis is called an external constraint. It means the country’s growth is limited by how many foreign currencies it can obtain.\n\n05 — What happens when dollars become scarce?\nWhen dollars become scarce, the government has difficult choices. It can let the peso fall. This is called devaluation. Devaluation can make exports more competitive, but it also makes imports more expensive. That can push prices up.\n\nIt can restrict access to dollars. This may protect reserves for a while, but it creates black markets and confusion. It can borrow dollars from abroad. But borrowing creates future debt. It can reduce imports and spending. But this can hurt growth and living standards.\n\nThere is no easy choice.\n\n06 — Why the IMF appears\nThe International Monetary Fund, or IMF, often appears when countries have trouble paying foreign debts or stabilizing their currency.\n\nIn April 2025, the IMF approved a US$20 billion program for Argentina. The agreement included an immediate US$12 billion disbursement. This shows how serious Argentina’s problem is. The country needs external support to stabilize reserves, rebuild confidence, and manage debt.\n\nBut IMF programs are politically sensitive. They often involve reforms, spending control, and difficult economic adjustments.\n\n07 — Why the cycle repeats\nThe crisis repeats because every crisis damages trust. If people remember past devaluations, they fear new ones. If they fear new ones, they buy dollars. If they buy dollars, the peso weakens. If the peso weakens, inflation can rise. If inflation rises, people trust the peso even less.\n\nThis is a credibility trap. The country needs trust to stabilize. But it needs stability to rebuild trust.",
    "deep": "Sources and recommended reading: In April 2025, the IMF approved a 48-month, US$20 billion Extended Fund Facility for Argentina, including an immediate US$12 billion disbursement. https://www.imf.org/en/news/articles/2025/04/12/pr25101-argentina-imf-executive-board-approves-48-month-usd20-billion-extended-arrangement\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\n01 — Money is based on belief\nMoney works because people believe in it. A banknote is just paper. A number in a bank account is just a digital record. It has value because people believe others will accept it tomorrow.\n\nIf everyone trusts the currency, life is easier. People save in it. Companies sign contracts in it. Banks lend in it. Workers accept wages in it. But if people do not trust the currency, they try to escape it.\n\nThis is Argentina’s central problem. The peso is used for daily life, but many people do not trust it as a safe store of value.\n\n02 — The peso carries history\nArgentina’s currency problem is not just about today’s policy. It is about decades of memory. Argentinians have experienced inflation, devaluations, banking restrictions, debt crises, and changing government rules. These events shape behavior.\n\nIf your family has seen savings lose value before, you will not easily trust promises of stability. If your business has suffered from sudden currency changes, you will plan defensively. If your salary loses value quickly, you will demand protection.\n\nThis is why economic history matters. Past crises are not really past. They live inside people’s expectations.\n\n03 — Inflation as a loop\nInflation is often explained as “prices going up.” That is true, but incomplete. In a country like Argentina, inflation becomes a loop of expectations.\n\nA shopkeeper expects suppliers to raise prices, so the shopkeeper raises prices first. Workers expect prices to rise, so they ask for higher wages. Firms expect higher wages, so they raise prices again. Families expect the peso to lose value, so they buy dollars. Investors expect more inflation, so they avoid lending in pesos.\n\nThis is how inflation becomes self-reinforcing. It is not enough for the government to say, “Inflation will fall.” People must believe it. And belief is hard to rebuild.\n\n04 — The dollar as a shelter\nFor many Argentinians, the dollar is a shelter. It is not because they love foreign currency. It is because they want protection.\n\nIf a person saves in pesos during high inflation, their savings may lose value. If they save in dollars, they feel safer. This creates a strange situation. The national currency is used for daily transactions, but the foreign currency is used for trust.\n\n05 — The external constraint\nArgentina also faces a foreign currency problem. The world economy often uses dollars for international trade and finance. Argentina needs dollars to import goods, pay debts, and support the peso.\n\nThe country earns dollars through exports, especially agriculture and natural resources. Soy and other agricultural products have historically been important. Energy and lithium are also important opportunities.\n\nBut if export earnings are not enough, and if debt payments are high, Argentina runs short of dollars. This creates pressure on the exchange rate.\n\n06 — What devaluation does\nDevaluation means the peso loses value compared with the dollar. For example, if one dollar becomes more expensive in pesos, imported goods become more expensive. A machine from abroad, medicine, fuel, electronics, or industrial parts may cost more.\n\nThis can increase inflation. But devaluation can also help exporters. If Argentine goods become cheaper in dollar terms, foreign buyers may buy more. Exporters may earn more pesos for each dollar of export revenue.\n\nSo devaluation has both sides. It can help some sectors but hurt consumers. In a country with high inflation expectations, devaluation can quickly feed into prices.\n\n07 — Why exchange controls appear\nWhen dollars are scarce, governments often try to control access to dollars. They may create official exchange rates, special rates for exporters, restrictions for individuals, or rules for importers.\n\nThe goal is to protect scarce reserves. But controls create distortions. If the official dollar price is lower than the market price, people try to find ways around the rules. Black markets appear. Businesses delay decisions. Exporters may wait to sell dollars. Importers may rush to access cheap dollars.\n\nMultiple exchange rates are usually a symptom of deeper mistrust.\n\n08 — Debt makes the problem worse\nDebt in foreign currency is dangerous for a country with a weak currency. The government collects much of its revenue in pesos. But if it must repay debt in dollars, devaluation makes the debt burden heavier.\n\nImagine you owe one billion dollars. If the peso loses value, you need many more pesos to buy the same number of dollars. That makes repayment harder.\n\nInvestors know this. If they fear default or devaluation, they demand higher interest rates. Higher interest rates make debt harder to repay. That creates more fear.\n\n09 — Why fixing the problem is politically hard\nCurrency stabilization is painful. A government may need to reduce spending, raise interest rates, cut subsidies, devalue the currency, rebuild reserves, or negotiate with creditors.\n\nBut these policies affect real people. If subsidies are cut, energy or transport can become more expensive. If the currency devalues, prices can rise. If public spending falls, some people lose support. If interest rates rise, borrowing becomes harder for businesses.\n\n10 — The credibility trap\nArgentina is stuck in a credibility trap. To stabilize the peso, people must believe the plan will work. But people will only believe the plan if they see stability. And stability is hard to create when people do not believe.\n\nThat is why each crisis makes the next one harder. The deeper solution is not only a new exchange-rate policy or a new loan. It is rebuilding trust over time."
  },
  "ports-matter": {
    "quick": "Sources and recommended reading: UNCTAD’s Review of Maritime Transport 2024 warns that chokepoints such as the Suez Canal, Panama Canal and Red Sea routes are under pressure. By mid-2024, UNCTAD reported that tonnage transiting the Suez Canal had been cut by 70%, while Cape of Good Hope arrivals surged 89%. https://unctad.org/publication/review-maritime-transport-2024\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\nPorts matter because globalization is physical.\n\nWhen people talk about globalization, they often think about the internet, finance, apps, or online shopping. But most goods still have to move through the real world.\n\nYour phone, clothes, food, medicine, car parts, fuel, furniture, and machines may have travelled by ship.\n\nA port is where ships meet land. Containers are unloaded. Goods are checked. Trucks, trains, rivers, and warehouses take over.\n\nIf ports work well, trade is faster and cheaper. If ports slow down, goods arrive late and prices can rise.\n\nPorts also depend on chokepoints. A chokepoint is a narrow passage that many ships need to use. The Suez Canal, Panama Canal, and Strait of Malacca are examples.\n\nThese places are powerful because they save time. But they are fragile because too much trade depends on them.\n\nIn 2024, disruption around major routes became so serious that UNCTAD reported a 70% cut in tonnage transiting the Suez Canal by mid-year, while ships using the Cape of Good Hope route increased sharply.\n\nThat means ships had to travel farther, use more fuel, and spend more time at sea.",
    "medium": "Sources and recommended reading: UNCTAD’s Review of Maritime Transport 2024 warns that chokepoints such as the Suez Canal, Panama Canal and Red Sea routes are under pressure. By mid-2024, UNCTAD reported that tonnage transiting the Suez Canal had been cut by 70%, while Cape of Good Hope arrivals surged 89%. https://unctad.org/publication/review-maritime-transport-2024\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\n01 — Globalization is not just digital\nGlobalization often feels invisible. You click a button, order a product, and it arrives. You may not think about where it came from, how it travelled, or how many systems had to work for it to reach you.\n\nBut the world economy is still very physical. Goods must be produced, packed, loaded, shipped, unloaded, checked, stored, and delivered.\n\nShips are especially important because they can carry enormous quantities of goods at relatively low cost. Air transport is faster, but it is much more expensive. For heavy goods, bulk goods, energy, food, and containers, shipping is essential.\n\nPorts are the places where this system connects to land.\n\n02 — What a port actually does\nA port is not just a place where boats stop. A modern port is a machine made of many parts: cranes, docks, containers, warehouses, customs offices, computers, workers, trucks, trains, fuel services, security systems, and shipping companies.\n\nA container arriving at a port must be unloaded. It may be scanned. Documents must be checked. Taxes or customs duties may be handled. The container may be stored. Then it must move to another ship, a truck, a train, a warehouse, or a factory.\n\nIf one part of this system is slow, everything slows down. That is why port efficiency matters. A slow port is like a traffic jam for the economy.\n\n03 — Containers changed trade\nContainers are standard metal boxes. They may look boring, but they changed the world.\n\nBefore containers, goods were loaded and unloaded piece by piece. This took time. It required many workers. Goods could be damaged or stolen. Ships spent longer in port.\n\nContainers made trade much easier. The same box can move from a truck to a ship, from a ship to a train, and from a train to a warehouse without being unpacked.\n\nThis helped companies build global supply chains. A product could have parts from several countries and be assembled somewhere else.\n\n04 — Why chokepoints matter\nA chokepoint is a narrow route that many ships need. The Suez Canal connects Europe and Asia without requiring ships to go around Africa. The Panama Canal connects the Atlantic and Pacific. The Strait of Malacca connects the Indian Ocean to East Asia.\n\nThese routes are shortcuts. They save time, fuel, and money. But that also makes them dangerous. If a shortcut is blocked or unsafe, many ships must change route.\n\nIn 2024, disruptions in the Red Sea and pressure on Suez showed how fragile the system can be. UNCTAD reported that by mid-2024, tonnage transiting the Suez Canal had been cut by 70%, while Cape of Good Hope arrivals surged 89%.\n\n05 — Why this affects ordinary people\nIf ships take longer routes, companies pay more for fuel, insurance, and time. If companies pay more, prices may rise. If goods are delayed, factories may wait for parts. If food or energy shipments are disrupted, countries can face shortages or higher costs.\n\nThis is why ports matter. They are not just local infrastructure. They are pressure points in the world economy.\n\n06 — Ports and development\nFor developing countries, ports can be gateways to growth. A good port can help farmers export food, factories import machines, mining companies ship resources, and consumers access cheaper goods.\n\nBut a port alone is not enough. It must connect to roads, railways, warehouses, cities, industrial zones, and customs systems. If the port is modern but the roads behind it are weak, goods still get stuck.",
    "deep": "Sources and recommended reading: UNCTAD’s Review of Maritime Transport 2024 warns that chokepoints such as the Suez Canal, Panama Canal and Red Sea routes are under pressure. By mid-2024, UNCTAD reported that tonnage transiting the Suez Canal had been cut by 70%, while Cape of Good Hope arrivals surged 89%. https://unctad.org/publication/review-maritime-transport-2024\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\n01 — The world economy moves through physical places\nGlobalization is often explained with big ideas: free trade, international markets, global value chains, multinational companies, and comparative advantage. But behind all these ideas is a simple fact: goods must move.\n\nA phone must move from factory to consumer. Oil must move from producer to refinery. Wheat must move from farms to ports and then to importers. Machines must move to factories. Medicine must move to hospitals.\n\nThis movement depends on ships and ports. Ports are where global trade becomes visible. They are the meeting point between oceans and land economies.\n\n02 — Ports reduce friction\nA good port reduces friction. Friction means anything that slows trade down or makes it more expensive: waiting time, bad paperwork, slow cranes, weak customs systems, poor roads, strikes, congestion, corruption, or security problems.\n\nEvery delay is a cost. If a ship waits outside a port for two days, someone pays. If containers sit too long, someone pays. If goods arrive late at a factory, production may stop. If food arrives late, prices may rise.\n\nThis is why ports are productivity machines. They do not only move goods. They reduce the hidden costs of moving goods.\n\n03 — Why containers were revolutionary\nThe container revolution was one of the biggest economic changes of the 20th century. Before containers, shipping was slower and messier. Goods were packed in different shapes and handled manually. Loading and unloading took a long time. Theft and damage were more common.\n\nThe standardized container solved many of these problems. A container can be lifted by crane, stacked on a ship, placed on a truck, moved by train, and stored in a warehouse. It creates a single system across different transport modes.\n\nThe result was cheaper and more reliable trade. Companies could organize production across the world because they could trust goods to move more predictably.\n\n04 — Singapore as an example\nSingapore shows how a port can make a small country powerful. Singapore does not have a large territory or many natural resources. But it sits near the Strait of Malacca, one of the world’s most important maritime routes.\n\nThe country built a highly efficient port and became a global transshipment hub. In 2024, Singapore handled 41.12 million TEUs of containers. Around 90% of that container throughput was transshipment, meaning goods passed through Singapore on the way somewhere else.\n\n05 — Chokepoints are shortcuts and weaknesses\nChokepoints are places where geography narrows trade. The Suez Canal is a shortcut between Europe and Asia. The Panama Canal is a shortcut between the Atlantic and Pacific. The Strait of Malacca is a key route between the Indian Ocean and East Asia. The Bab el-Mandeb links the Red Sea to the Indian Ocean.\n\nThese places matter because they save time. But the same thing that makes them useful makes them risky. If too many ships depend on a narrow route, disruption can have global effects.\n\nA blockage, war, attack, drought, accident, or political crisis can force ships to reroute. When ships reroute, they travel farther. Longer routes mean more fuel, more time, more emissions, higher insurance costs, and sometimes higher prices.\n\n06 — The Red Sea and Suez example\nRecent disruptions around the Red Sea and Suez Canal show this clearly. When ships avoid Suez, many travel around the Cape of Good Hope in southern Africa. This is much longer.\n\nUNCTAD reported that by mid-2024, tonnage transiting the Suez Canal had been cut by 70%, while arrivals around the Cape of Good Hope surged 89%. This is not a small logistical detail. It changes shipping schedules, fuel use, container availability, delivery times, and costs.\n\nIt also shows that geopolitics can quickly become economics.\n\n07 — Ports are strategic assets\nPorts are not only economic. They are geopolitical. A country with major ports can influence trade flows. A naval base near a port can influence military power. A foreign company operating a terminal may raise security questions. A port used for energy exports can become strategically important.\n\nThis is why governments care about ports. Ports can be used for development, but also for pressure. During conflicts, blockades can damage an enemy’s economy. Attacks near shipping lanes can increase insurance costs. Control of a port can shape regional power.\n\n08 — Climate risk\nPorts also face climate risk. Many ports are located on coasts, which makes them vulnerable to sea-level rise and storms. Extreme weather can damage infrastructure. Heat can affect workers and equipment. Drought can reduce water levels in canals.\n\nThe Panama Canal is a good example of how nature affects trade. The canal depends on water to operate its locks. If drought reduces water availability, fewer ships may pass, or ships may need to carry less cargo.\n\n09 — Ports and national development\nFor developing countries, a good port can help growth. But only if it is connected to the rest of the country.\n\nA port should help farmers export, factories import inputs, cities receive goods, and businesses connect to global markets. If the port is isolated, it may mainly serve foreign companies or extractive industries. If it is connected to roads, railways, industrial zones, and local firms, it can support broader development.\n\n10 — The deeper lesson\nPorts teach us that globalization is not weightless. It depends on steel boxes, cranes, canals, straits, fuel, workers, insurance, customs, laws, weather, and security. When everything works, consumers forget this system exists. When something breaks, everyone suddenly remembers it."
  },
  "taiwan-strait": {
    "quick": "Sources and recommended reading: Taiwan is central to the global semiconductor industry. TSMC’s 2024 annual report says advanced technologies of 7 nanometers and beyond accounted for 69% of its wafer revenue, and that it manufactured 11,878 products for 522 customers. https://investor.tsmc.com/english/annual-reports\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\nThe Taiwan Strait matters because one small area connects technology, trade, China, the United States, and the global economy.\n\nThe Taiwan Strait is the water between Taiwan and mainland China. On a map, it does not look very large. But it is one of the most important places in the world.\n\nWhy? Because Taiwan is central to semiconductor production.\n\nA semiconductor, often called a chip, is a tiny electronic part that helps machines process information. Phones need chips. Cars need chips. Computers need chips. Artificial intelligence needs chips. Hospitals, factories, satellites, and weapons systems also need chips.\n\nTaiwan is especially important for advanced chips. These are the most difficult chips to produce.\n\nThis matters because China sees Taiwan as part of its territory, while Taiwan governs itself. The United States supports Taiwan’s security in different ways and wants to prevent China from controlling the region by force.\n\nSo a crisis in the Taiwan Strait would not only be a local conflict. It could disrupt global technology, global trade, and the balance of power in Asia.",
    "medium": "Sources and recommended reading: Taiwan is central to the global semiconductor industry. TSMC’s 2024 annual report says advanced technologies of 7 nanometers and beyond accounted for 69% of its wafer revenue, and that it manufactured 11,878 products for 522 customers. https://investor.tsmc.com/english/annual-reports\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\n01 — What is the Taiwan Strait?\nThe Taiwan Strait is the sea between Taiwan and mainland China. Taiwan is an island with its own government, military, elections, economy, and laws. China says Taiwan is part of China and wants eventual unification. Beijing has not ruled out using force.\n\nThis creates one of the world’s most dangerous geopolitical tensions. The United States does not officially recognize Taiwan as a fully separate country in the same way it recognizes most states, but it supports Taiwan’s ability to defend itself and opposes a forced change in the status quo.\n\nThis makes the Taiwan Strait a place where local politics, great-power rivalry, and global economics meet.\n\n02 — Why chips are so important\nThe most important economic reason Taiwan matters is semiconductors. A semiconductor is a tiny component that controls electricity inside machines. The simple idea is this: chips are the brains of modern devices.\n\nWithout chips, smartphones do not work. Cars cannot run many electronic systems. Data centers cannot process information. AI models cannot train or operate. Military systems become weaker. Hospitals lose access to important machines.\n\nChips are not just another product. They are the foundation of modern technology.\n\n03 — Why Taiwan is special\nTaiwan became one of the world’s most important chip producers. Its most famous company is TSMC, Taiwan Semiconductor Manufacturing Company. TSMC is a foundry. That means many companies design chips, but TSMC manufactures them.\n\nThis is very difficult. Advanced chipmaking requires extremely precise machines, clean rooms, engineers, chemicals, water, electricity, and years of experience. You cannot simply replace Taiwan overnight.\n\nTSMC’s 2024 annual report says advanced technologies of 7 nanometers and beyond accounted for 69% of its wafer revenue. It also says TSMC manufactured 11,878 products for 522 customers. That shows how many companies depend on its factories.\n\n04 — Why concentration is risky\nConcentration can be efficient. If Taiwan is very good at making chips, companies around the world benefit. They get advanced chips from the best producers.\n\nBut concentration is dangerous during crisis. If a conflict, blockade, cyberattack, earthquake, or political shock disrupted Taiwan’s chip production, the effects would spread everywhere.\n\nCar factories could slow down. Electronics companies could face shortages. AI companies could pay more for hardware. Governments could worry about weapons systems and national security.\n\n05 — Why China and the United States care\nFor China, Taiwan is tied to sovereignty, national identity, historical memory, and the legitimacy of the Chinese Communist Party. Beijing sees unification as a core national goal.\n\nFor the United States, Taiwan matters for technology, alliances, and the balance of power in Asia. U.S. allies such as Japan, South Korea, the Philippines, and Australia watch how Washington handles the Taiwan issue.\n\nThis is why Taiwan is so sensitive. It is not only about land or water. It is about power, credibility, and technology.\n\n06 — The simple lesson\nThe Taiwan Strait shows a weakness in globalization. The world created efficient supply chains by concentrating production in the best places. But when one of those places becomes too important, the whole world becomes vulnerable.\n\nTaiwan’s success made it indispensable. Its location makes that indispensability risky.",
    "deep": "Sources and recommended reading: Taiwan is central to the global semiconductor industry. TSMC’s 2024 annual report says advanced technologies of 7 nanometers and beyond accounted for 69% of its wafer revenue, and that it manufactured 11,878 products for 522 customers. https://investor.tsmc.com/english/annual-reports\n\nNote: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way.\n\n01 — A small strait with global consequences\nThe Taiwan Strait is not very wide compared with the size of the world economy. But it connects several major systems at once: China’s national ambitions, Taiwan’s democracy and security, U.S. power in Asia, global shipping, semiconductor production, and modern technology.\n\nThis is why Taiwan appears so often in discussions about geopolitics. A crisis there could become much bigger than Taiwan itself.\n\n02 — Taiwan’s political situation\nTaiwan governs itself. It has its own political institutions, military, courts, currency, companies, and elections. China sees Taiwan as part of its territory and wants unification. Beijing says this is a core national interest.\n\nThe disagreement comes from the Chinese Civil War and the political split between the People’s Republic of China on the mainland and the Republic of China government that continued in Taiwan.\n\nOver time, Taiwan became a democratic and highly developed economy. China became a rising superpower. The United States remained deeply involved in Asia. This is why the Taiwan issue is difficult: it is about history, identity, power, alliances, and technology.\n\n03 — What semiconductors are\nTo understand Taiwan’s importance, you need to understand chips. A semiconductor is a material and a component used to control electricity. In everyday language, people usually say chip.\n\nChips are inside almost everything modern: phones, computers, cars, washing machines, aircraft, satellites, medical devices, power grids, data centers, AI systems, and military equipment.\n\nAdvanced chips are especially important because they allow powerful computing. They are used in artificial intelligence, high-performance computing, smartphones, advanced weapons, and data centers.\n\n04 — Why advanced chips are hard to make\nAdvanced chipmaking is one of the most complex industrial activities in the world. It requires factories called fabs. These fabs cost billions of dollars. They need ultra-clean rooms, because even tiny dust particles can damage production. They require extremely precise machines, advanced chemicals, specialized engineers, reliable electricity, and large amounts of water.\n\nThe production process involves many steps. It is not like building a simple object in a normal factory. This is why only a few companies in the world can make the most advanced chips.\n\nTSMC is one of the most important. In its 2024 reporting, TSMC said advanced technologies of 7 nanometers and beyond accounted for 69% of total wafer revenue. It also manufactured 11,878 products for 522 customers.\n\n05 — Why Taiwan became central\nTaiwan did not become important by accident. It built a semiconductor ecosystem over decades. This included companies, engineers, suppliers, universities, government support, and manufacturing experience.\n\nTSMC’s business model was especially important. Instead of designing all chips itself, it focused on manufacturing chips for other companies. This allowed global chip designers to rely on TSMC as a production partner.\n\nMany of the world’s most important technology companies depend on Taiwan’s manufacturing capacity. This is why Taiwan’s semiconductor industry is sometimes called a silicon shield: the idea that Taiwan’s importance to global technology may discourage conflict because too many countries would suffer from disruption.\n\nBut the shield is not perfect. Importance can protect, but it can also attract pressure.\n\n06 — Why a crisis would spread quickly\nA Taiwan crisis would affect the world even without a full invasion. A blockade could prevent goods and chips from leaving the island. Cyberattacks could disrupt companies or infrastructure. Military exercises could raise insurance costs and scare investors. Sanctions could divide technology markets. Export controls could intensify.\n\nThe effects would travel through supply chains. A car company in Europe or the United States might lack chips. A phone company might delay products. AI firms might struggle with hardware supply. Defense companies might worry about secure components. Financial markets might fall because investors fear a larger war.\n\n07 — China’s perspective\nFor China, Taiwan is deeply symbolic and strategic. Beijing sees Taiwan as unfinished national reunification. Chinese leaders also worry about foreign influence near China’s coast. From Beijing’s point of view, Taiwan’s alignment with the United States is a major security concern.\n\nTaiwan also matters militarily. If China controlled Taiwan, the strategic geography of East Asia would change. It could affect sea routes, military access, and the balance of power near Japan and the Philippines.\n\n08 — The U.S. perspective\nFor the United States, Taiwan matters for three main reasons. First, technology: Taiwan is crucial to advanced chips. Second, alliances: U.S. allies in Asia watch Taiwan closely. Third, balance of power: the United States wants to prevent one country from dominating East Asia.\n\nThis does not mean the United States wants war. The goal is usually deterrence: making conflict too costly so it does not happen. But deterrence is difficult. If one side sends too weak a signal, the other side may become more aggressive. If one side sends too strong a signal, tensions may rise.\n\n09 — Why countries are trying to diversify chip production\nBecause Taiwan is so important, many countries want to build more chip production at home. The United States, Europe, Japan, South Korea, and others have launched industrial policies to support semiconductors.\n\nThe goal is not to replace Taiwan completely. That would be extremely difficult and would take a long time. The goal is resilience: the system should survive shocks. If one place is disrupted, the whole world should not stop.\n\n10 — The deeper lesson\nThe Taiwan Strait shows a contradiction in modern globalization. The world became efficient by specializing. Countries and companies focused on what they did best. Taiwan became exceptional at advanced chip manufacturing. This helped the whole world access better technology.\n\nBut specialization also created fragility. If one place becomes too important, a crisis there can affect everyone. Taiwan’s success made it indispensable. Its geopolitical position makes that indispensability dangerous."
  }
};

function storyText(story, layer){
  const entry = independentStoryLayers[story.id];
  if(entry && entry[layer]) return entry[layer];
  return story.description || story.title;
}

function navigate(page, opts={}){
  state.page = page;
  if(opts.story) state.story = opts.story;
  render();
  window.scrollTo({top:0,behavior:'smooth'});
}

function scrollHomeSection(id){
  const target = document.getElementById(id);
  if(!target) return;
  requestAnimationFrame(() => target.scrollIntoView({behavior:'smooth', block:'start'}));
}

function layout(content){
  return `<div class="shell">
    <aside class="sidebar">
      <div class="nav-label nav-label-top">Navigate</div>
      <nav class="nav">
        ${navButton('discover','◉','Discover')}
        ${navButton('search','⌕','Search')}
        ${navButton('compare','⇄','Compare')}
        ${navButton('stories','▰','Stories')}
        ${navButton('daily','▤','Daily Brief')}
      </nav>
      <div class="side-footer">Static MVP · no accounts · built for Netlify. Content is editable in the code.</div>
    </aside>
    <main class="main">
      <header class="topbar"><button class="pill-btn" onclick="navigate('home')">← Home</button><div class="live">LIVE ATLAS</div></header>
      <section class="content fade-in">${content}</section>
    </main>
  </div>`;
}
function navButton(page,icon,label){return `<button class="${state.page===page?'active':''}" onclick="navigate('${page}')"><span class="nav-icon">${icon}</span>${label}</button>`}

function home(){
  return `<div class="home">
    <nav class="home-nav home-nav-actions-only"><div class="home-actions"><a class="pill-btn" href="https://docs.google.com/forms/d/e/1FAIpQLSfFIOOyXHESA-_SzKrPxkeaoVsOElPLU3BJiiVLTo1cubgv0A/viewform?usp=header" target="_blank" rel="noopener">Feedback</a><button class="pill-btn" onclick="scrollHomeSection('tour')">How it works</button><button class="dark-btn" onclick="navigate('discover')">Enter WorldPulse →</button></div></nav>
    <section class="hero">
      <div><div class="kicker">Not a newspaper. Not a feed. Not doomscrolling.</div><h1>Understand the world as a system.</h1><p>WorldPulse is a smooth interactive atlas for economics and geopolitics. It connects countries, ports, cities, trade routes, currencies, energy and stories — so the world feels less like random headlines and more like a map you can read.</p><div class="hero-cta"><button class="dark-btn" onclick="navigate('discover')">Discover the atlas →</button><button class="ghost-btn" onclick="navigate('stories')">Browse stories</button></div><div class="hero-note">Atlas · search · compare · story mode · daily brief</div></div>
      <div class="world-mosaic" aria-hidden="true"><div class="mosaic-card big"><span>🌊</span><b>Chokepoints</b><p>Suez, Malacca, Panama, Hormuz.</p></div><div class="mosaic-card"><span>🏙️</span><b>Cities</b><p>Finance, technology, industry.</p></div><div class="mosaic-card"><span>⚓</span><b>Ports</b><p>Where globalization becomes physical.</p></div><div class="mosaic-card dark"><span>⚡</span><b>Power</b><p>Energy, chips, money and leverage.</p></div></div>
    </section>
    <section id="tour" class="home-strip">
      <button class="strip-card" onclick="navigate('discover')"><h3>Discover</h3><p>Open the atlas. Activate cities, ports and sea routes. Click countries directly to understand their economy.</p></button>
      <button class="strip-card" onclick="navigate('search')"><h3>Search countries</h3><p>Find one of the countries in the atlas, read its profile, then jump to related stories or its globe view.</p></button>
      <button class="strip-card" onclick="navigate('stories')"><h3>Stories in 3 layers</h3><p>Choose quick insight, medium story or deep dive depending on how far you want to go.</p></button>
    </section>
    <section class="feedback-section" id="feedback">
      <div class="feedback-card">
        <div>
          <div class="section-kicker">Feedback</div>
          <h2>Help improve WorldPulse</h2>
          <p>Found a bug, noticed missing information, or have an idea for a new story? Send quick feedback through the form and it will go directly to the WorldPulse feedback responses.</p>
        </div>
        <a class="dark-btn feedback-btn" href="https://docs.google.com/forms/d/e/1FAIpQLSfFIOOyXHESA-_SzKrPxkeaoVsOElPLU3BJiiVLTo1cubgv0A/viewform?usp=header" target="_blank" rel="noopener">Send feedback →</a>
      </div>
    </section>
  </div>`
}

function discover(){
  const fact = didYouKnow[factIndex % didYouKnow.length];
  return layout(`
    <div class="row-head"><span>▤ Today's World</span><button class="link-line" onclick="navigate('daily')">Daily brief ↗</button></div>
    <div class="brief-row">${dailyBrief.map(b=>`<button class="brief-card" onclick="navigate('daily')"><span class="tag ${b.cat}">${b.cat}</span><span class="meta">${b.place}</span><h3>${b.title}</h3></button>`).join('')}</div>
    <button class="fact-card" onclick="navigate('story',{story:'${fact.story}'})"><div class="spark">✦</div><div><div class="row-head" style="margin:0 0 4px"><span>Did you know?</span></div><h3>${fact.text}</h3><span class="link-line">Read the story ↗</span></div></button>
    <div class="atlas-head"><div><div class="section-kicker">WorldPulse · Atlas</div><h2>Scroll the world,<br>not a feed.</h2><p>Spin the globe. Tap a country, city, port or trade route to learn how money, power and geography shape it.</p></div></div>
    ${atlas('main')}
  `);
}

const cityDescriptions = {
  "New York": "New York is the largest city in the United States, with more than 8 million residents in the city and one of the world’s biggest metro economies. It concentrates Wall Street finance, corporate headquarters, media, universities, immigration and the Port of New York/New Jersey, making it a global command center for capital, culture and consumption.",
  "London": "London is a city of nearly 9 million people and one of the world’s most important financial and legal hubs. Its strength comes from the City of London, insurance, foreign exchange, universities, culture, airports and a deep professional-services ecosystem that keeps it central even after Brexit.",
  "Paris": "Paris has more than 2 million residents in the city and over 12 million in the wider region. It is France’s political, luxury, tourism, transport and innovation center, combining ministries, corporate headquarters, world-famous cultural assets, major universities and a growing startup and AI ecosystem.",
  "Singapore": "Singapore is a city-state of about 6 million people built around one of the world’s busiest ports and airports. Its importance comes from logistics, finance, law, education, high-end services and careful state planning that turned a small island with no natural resources into a global connector.",
  "Shanghai": "Shanghai is China’s largest urban economy, with more than 24 million residents and a strategic position at the mouth of the Yangtze River. It combines finance, advanced manufacturing, consumer markets and the world’s largest container port, making it a key gateway between China and global trade.",
  "Shenzhen": "Shenzhen grew from a small border city into a metropolis of more than 17 million people. It is one of China’s most important technology and hardware clusters, combining electronics factories, design teams, suppliers, startups and proximity to Hong Kong in a dense innovation ecosystem.",
  "Tokyo": "Tokyo is the core of the world’s largest metropolitan economy, with more than 37 million people in the wider urban region. It concentrates Japan’s government, finance, corporate headquarters, rail infrastructure, universities and advanced services, making it a high-productivity hub inside an aging economy.",
  "Seoul": "Seoul is a metropolitan region of more than 20 million people and the command center of South Korea’s economy. It links government, universities, finance, entertainment and major conglomerates in chips, cars, batteries and consumer electronics, giving Korea both industrial and cultural global influence.",
  "Dubai": "Dubai has more than 3 million residents and functions as a logistics, tourism, aviation, real-estate and finance hub between Asia, Africa and Europe. Its importance comes from Jebel Ali port, Emirates airline, free zones, luxury tourism and its role as a safe regional base for capital and business.",
  "Riyadh": "Riyadh is Saudi Arabia’s capital and largest city, with more than 7 million people in the metro area. It is being transformed into the administrative, financial and corporate center of Vision 2030, as the kingdom tries to turn oil revenue into services, construction, tourism and private-sector jobs.",
  "Mumbai": "Mumbai has over 12 million residents in the city and more than 20 million in its metro area. It is India’s financial capital, home to major banks, stock exchanges, film studios, port infrastructure and corporate headquarters, linking India’s domestic demand to global capital and trade.",
  "São Paulo": "São Paulo is Brazil’s largest city, with more than 12 million residents and the biggest metro economy in Latin America. It concentrates finance, industry, business services, technology, universities and consumer demand, making it the main economic engine of Brazil beyond commodities.",
  "Lagos": "Lagos is Nigeria’s largest urban economy, with a metro population often estimated above 20 million. It combines ports, finance, music, film, startups, informal trade and manufacturing, but its growth is constrained by congestion, housing shortages, power supply problems and infrastructure pressure.",
  "Nairobi": "Nairobi is Kenya’s capital and East Africa’s main business hub, with a metro population of several million. It is important for mobile money, startups, logistics, NGOs, finance, regional headquarters and access to East African markets, making it a services platform for the wider region.",
  "Mexico City": "Mexico City is one of the largest urban areas in the Americas, with more than 20 million people in the metro region. It concentrates Mexican government, finance, media, universities and corporate strategy, while connecting the country’s domestic market to North American manufacturing and nearshoring decisions.",
  "Madrid": "Madrid is Spain’s capital and largest metropolitan economy, with more than 6 million people in the region. It concentrates government, banks, transport links, corporate headquarters, universities and services, making it Spain’s political and business command center.",
  "Berlin": "Berlin is Germany’s capital and a city of nearly 4 million people. It combines government, startups, universities, creative industries and industrial-policy debates, making it important less as a factory city than as the political and innovation center of Europe’s largest economy.",
  "Amsterdam": "Amsterdam is a compact city with a large regional economy built around trade, finance, technology, tourism and Schiphol airport. Its importance comes from Dutch logistics, legal and business services, digital infrastructure and proximity to the Port of Rotterdam.",
  "Istanbul": "Istanbul has more than 15 million residents and sits between Europe and Asia. It is Turkey’s commercial, logistics, industrial, tourism and financial center, controlling a strategic position near the Bosporus and linking Black Sea, Mediterranean, European and Middle Eastern networks.",
  "Jakarta": "Jakarta is Indonesia’s largest urban economy and the core of a metro region of more than 30 million people. It concentrates finance, government, consumer markets, logistics and corporate headquarters, but faces congestion, flooding, pollution and the long-term relocation of Indonesia’s capital functions.",
  "Bangkok": "Bangkok is Thailand’s capital and main economic hub, with a metro population above 10 million. It combines tourism, finance, manufacturing services, retail, transport and government, making it central to Thailand’s economy and to mainland Southeast Asian connectivity.",
  "Ho Chi Minh City": "Ho Chi Minh City is Vietnam’s largest business hub, with roughly 9 million residents and a much larger economic region around it. It drives exports, finance, startups, consumer markets and foreign investment, especially as Vietnam becomes a key China+1 manufacturing destination.",
  "Kuala Lumpur": "Kuala Lumpur is Malaysia’s main metropolitan economy and financial center. It links banking, government-linked companies, electronics, services, infrastructure and regional headquarters, while the wider Klang Valley connects the city to ports, airports and manufacturing corridors.",
  "Manila": "Metro Manila is a dense urban region of more than 13 million people and the political, financial and services center of the Philippines. It is important for business-process outsourcing, remittances, retail, media and government, but suffers from congestion and infrastructure strain.",
  "Dhaka": "Dhaka is one of the world’s fastest-growing megacities, with a metro population above 20 million. It is the center of Bangladesh’s garment industry, politics, finance and migration flows, showing both the job-creating power and urban pressure of export-led development.",
  "Karachi": "Karachi is Pakistan’s largest city and main port, with a population often estimated above 15 million. It concentrates finance, manufacturing, trade, logistics and media, making it Pakistan’s commercial engine despite security, infrastructure and governance challenges.",
  "Cairo": "Cairo is Egypt’s capital and the largest urban area in the Arab world, with more than 20 million people in the metro region. It concentrates government, media, universities, construction, services and consumption, while sitting near the Nile and the Suez-linked economy.",
  "Cape Town": "Cape Town is South Africa’s legislative capital and a major tourism, port, services and technology city. Its importance comes from the Atlantic location, wine and tourism economy, universities, creative industries and role as a gateway to southern African markets.",
  "Casablanca": "Casablanca is Morocco’s largest city and main business hub, with several million people in its urban region. It concentrates banks, ports, industry, services and corporate headquarters, linking Morocco’s Atlantic trade, European proximity and manufacturing strategy.",
  "Santiago": "Santiago is Chile’s capital and dominant metro economy, with more than 7 million people in the region. It concentrates government, banks, mining headquarters, universities and services, making it the command center of a copper-rich, trade-oriented economy.",
  "Buenos Aires": "Buenos Aires is Argentina’s capital and one of Latin America’s major cultural and economic centers, with more than 15 million people in the metro area. It concentrates government, finance, media, services, universities and the politics of Argentina’s repeated currency and inflation crises.",
  "Bogotá": "Bogotá is Colombia’s capital and largest economic center, with around 8 million residents in the city. It concentrates government, finance, education, services, startups and corporate headquarters, linking Colombia’s Andean interior to national politics and global investment.",
  "Doha": "Doha is Qatar’s capital and a fast-growing Gulf city of finance, diplomacy, aviation, gas wealth and major events. Its importance comes from LNG revenue, sovereign wealth, Qatar Airways, education hubs and the state’s effort to convert energy wealth into global influence.",
  "Tehran": "Tehran is Iran’s capital and largest urban economy, with a metro population above 15 million. It concentrates government, finance, universities, industry and sanctions management, making it the center of a large economy operating under heavy geopolitical constraints.",
  "Warsaw": "Warsaw is Poland’s capital and fastest-growing major business hub, with nearly 2 million residents and a large metro region. It concentrates finance, government, technology, services and logistics, reflecting Poland’s rise as a central European growth and security hub.",
  "Vienna": "Vienna is Austria’s capital and a wealthy Central European services city of nearly 2 million residents. It is important for diplomacy, finance, tourism, universities, public transport and regional headquarters connecting Western Europe with Central and Eastern Europe.",
  "Copenhagen": "Copenhagen is Denmark’s capital and a Nordic hub for green urban planning, shipping, life sciences, design and high-income services. Its importance comes from clean infrastructure, human capital, the Øresund link with Sweden and strong institutions.",
  "Helsinki": "Helsinki is Finland’s capital and the center of its technology, education, design, government and services economy. It is small by global-city standards but important for digital governance, Nordic innovation, Baltic connectivity and security politics near Russia.",
  "Auckland": "Auckland is New Zealand’s largest city and main international gateway, with about a third of the country’s population in its wider region. It concentrates finance, ports, airports, universities, migration, tourism and Pacific-facing services.",
  "Accra": "Accra is Ghana’s capital and main services hub, with a fast-growing metropolitan region. It concentrates government, finance, technology, education, media and access to the Gulf of Guinea, making it one of West Africa’s most important business nodes."
};

const portDescriptions = {
  "Shanghai Port": "Shanghai Port is the world’s largest container port and the maritime outlet of the Yangtze River Delta, one of the densest manufacturing regions on earth. Its scale comes from deep links to factories, inland river logistics, rail, warehouses and China’s export machine.",
  "Singapore Port": "Singapore Port is one of the world’s busiest transshipment hubs, handling cargo that often passes through Singapore rather than ending there. Its strength comes from location near the Strait of Malacca, fast operations, bunkering, logistics services and trusted maritime infrastructure.",
  "Rotterdam": "Rotterdam is Europe’s largest seaport and the main ocean gateway for the Rhine industrial corridor. It links containers, energy, chemicals, pipelines, barges, rail and warehouses to Germany and the wider European market.",
  "Los Angeles/Long Beach": "Los Angeles/Long Beach is the largest container gateway in the United States, especially for goods arriving from Asia. It matters because port congestion here can affect retailers, warehouses, rail networks and consumer prices across the American economy.",
  "Jebel Ali": "Jebel Ali is Dubai’s flagship port and one of the Middle East’s most important logistics platforms. Combined with free zones, warehousing and air links, it turns Dubai into a re-export hub between Asia, Africa, Europe and the Gulf.",
  "Hamburg": "Hamburg is Germany’s main maritime gateway and a major container port on the Elbe River. It connects German machinery, vehicles, chemicals and high-value exports to global markets, while depending heavily on rail, inland waterways and access to the North Sea.",
  "Busan": "Busan is South Korea’s main port and one of Asia’s busiest container hubs. It supports Korea’s export economy by moving cars, electronics, machinery and shipbuilding-related cargo through dense links with Northeast Asian trade routes.",
  "Shenzhen/Yantian": "Shenzhen/Yantian is a crucial export port for the Pearl River Delta, one of the world’s strongest electronics and manufacturing clusters. It moves hardware, consumer electronics, e-commerce goods and components from southern China to global markets.",
  "Santos": "Santos is Brazil’s most important port and a major outlet for soy, sugar, coffee, meat and container cargo. It links the agricultural and industrial interior of Brazil to global demand, especially through road and rail corridors into São Paulo state.",
  "Durban": "Durban is South Africa’s busiest port and a key gateway for southern African trade. It handles containers, vehicles and regional cargo, but its performance depends on rail reliability, port reform, power supply and corridor links into the interior.",
  "Suez/Port Said": "Suez/Port Said sits at the northern entrance of the Suez Canal, one of the world’s most important shipping shortcuts. It matters because Asia-Europe trade, oil products and container flows can be delayed or rerouted when security, fees or canal capacity are disrupted.",
  "Panama Canal": "The Panama Canal is an inter-oceanic passage linking the Atlantic and Pacific. Its importance comes from saving ships the long journey around South America, but drought and water levels can directly reduce capacity and raise shipping costs.",
  "Mumbai/JNPT": "Mumbai/JNPT is India’s main west-coast container gateway, serving the Mumbai-Pune industrial region and western India’s consumer market. It is central to India’s export ambitions, freight-corridor projects and energy and manufacturing supply chains.",
  "Piraeus": "Piraeus is Greece’s largest port and a major Mediterranean gateway near Athens. It links container shipping, tourism, ferries and Balkan rail corridors, while also showing how port ownership and infrastructure can carry geopolitical influence.",
  "Antwerp-Bruges": "Antwerp-Bruges is one of Europe’s largest port complexes and a major chemicals, logistics and container hub. Its importance comes from petrochemicals, inland connections, customs systems and access to the Belgian, Dutch, French and German industrial markets.",
  "Hong Kong": "Hong Kong remains an important Asian container, finance and logistics gateway even after losing some port traffic to mainland competitors. Its value comes from legal services, air cargo, finance, re-export networks and proximity to the Pearl River Delta.",
  "Ningbo-Zhoushan": "Ningbo-Zhoushan is one of the world’s largest port complexes by cargo tonnage and containers. It serves the Yangtze River Delta and handles containers, oil, iron ore and bulk commodities, making it a key pillar of China’s trade system.",
  "Qingdao": "Qingdao is a major port in northern China, serving Shandong’s manufacturing, agriculture and petrochemical base. It handles containers, bulk goods, cold-chain cargo and energy flows, linking North China industry to Northeast Asian and global markets.",
  "Tianjin": "Tianjin is the main maritime gateway for Beijing and the wider Bohai economic region. It handles containers, vehicles, bulk cargo and industrial inputs, connecting northern China’s heavy industry and consumer markets to global shipping.",
  "Kaohsiung": "Kaohsiung is Taiwan’s largest port and a key outlet for the island’s electronics, petrochemicals, machinery and container trade. Its importance is tied to Taiwan’s export economy and to the strategic vulnerability of trade around the Taiwan Strait.",
  "Tanjung Pelepas": "Tanjung Pelepas is a Malaysian transshipment port near the Strait of Malacca and Singapore. It competes by offering large-scale container handling, strategic location and fast links to global shipping networks.",
  "Port Klang": "Port Klang is Malaysia’s main container port and the maritime gateway for the Klang Valley around Kuala Lumpur. It handles consumer goods, electronics, palm oil-related cargo and industrial inputs for Malaysia’s central economic corridor.",
  "Laem Chabang": "Laem Chabang is Thailand’s main deep-sea port and a key outlet for the Eastern Economic Corridor. It supports car exports, electronics, industrial goods and container flows from Thailand’s manufacturing base.",
  "Ho Chi Minh/Cat Lai": "Ho Chi Minh/Cat Lai is Vietnam’s busiest container gateway, serving the country’s southern manufacturing and consumer economy. It is especially important as Vietnam grows as an export platform for textiles, electronics, furniture and consumer goods.",
  "Manila Port": "Manila Port is the main maritime gateway for the Philippines’ largest consumer and business region. It handles containers, food, fuel and industrial goods, but congestion and urban density make port efficiency a constant challenge.",
  "Colombo": "Colombo is a major Indian Ocean transshipment hub, positioned near the main East-West shipping lane. It serves Sri Lanka and transfers containers between large ocean vessels and regional routes to India, the Middle East and Southeast Asia.",
  "Mundra": "Mundra is India’s largest private port and a major gateway for containers, coal, crude, agricultural goods and industrial cargo. Its scale and private logistics ecosystem make it central to western India’s trade and infrastructure model.",
  "Chittagong": "Chittagong is Bangladesh’s main seaport and the essential gateway for the country’s garment export economy. It handles most of Bangladesh’s seaborne trade, linking factories around Dhaka and Chittagong to global apparel buyers.",
  "Alexandria": "Alexandria is Egypt’s historic Mediterranean port and a major gateway for food, containers and industrial cargo. It serves Egypt’s large consumer market and connects the Nile Delta economy to Mediterranean shipping.",
  "Tanger Med": "Tanger Med is Morocco’s flagship port complex near the Strait of Gibraltar. It connects African, European and Atlantic routes and supports Morocco’s car, aerospace, textile and logistics industries through nearby industrial zones.",
  "Lagos/Apapa": "Lagos/Apapa is Nigeria’s main container gateway and one of West Africa’s most important ports. It serves Africa’s largest population and consumer market, but congestion, customs delays and road access often shape its economic impact.",
  "Mombasa": "Mombasa is Kenya’s main port and the gateway to East Africa’s Northern Corridor. It serves Kenya, Uganda, Rwanda, South Sudan and parts of the Great Lakes region through road, rail and logistics networks.",
  "Tema": "Tema is Ghana’s main seaport and a key Gulf of Guinea logistics hub. It handles containers, cocoa-related trade, fuel, machinery and consumer goods, linking Ghana’s growing services and industrial economy to global markets.",
  "Le Havre": "Le Havre is France’s main Atlantic container port and a gateway to the Paris region through the Seine corridor. It handles containers, energy products and industrial goods, connecting French consumption and production to ocean shipping.",
  "Valencia": "Valencia is Spain’s leading Mediterranean container port and a major gateway for Iberian trade. It serves consumer goods, food exports, automotive supply chains and shipping routes linking Europe with North Africa and the wider Mediterranean.",
  "Gioia Tauro": "Gioia Tauro is Italy’s main transshipment port in the central Mediterranean. Its location allows containers to be transferred between large ocean vessels and regional services, though its wider impact depends on inland links and southern Italian development.",
  "Algeciras": "Algeciras sits near the Strait of Gibraltar, one of the world’s busiest maritime passages. It is important for container transshipment, ferries, fuel, and trade between Europe, North Africa, the Atlantic and the Mediterranean.",
  "Felixstowe": "Felixstowe is the United Kingdom’s largest container port and a key gateway for British consumer and industrial imports. It links North Sea shipping routes to warehouses, rail terminals and distribution networks across the UK.",
  "Vancouver": "Vancouver is Canada’s largest port and its main Pacific gateway. It handles grain, potash, coal, containers and forest products, linking Canadian resources and Asian markets through rail corridors across the country.",
  "New York/New Jersey": "The Port of New York and New Jersey is the largest container gateway on the U.S. East Coast. It serves the dense Northeast consumer market through terminals, warehouses, rail links and trucking networks around one of the world’s biggest metro economies."
};

function atlas(id){
  return `<div class="atlas-wrap atlas-wrap-stacked">
    <div class="globe-panel"><div class="globe-toolbar"><div class="hint">Drag · scroll to zoom</div></div><svg id="globe-${id}" class="globe-svg"></svg></div>
    <section class="atlas-info-below">
      <div class="layer-controls">
        <h4>Layers</h4>
        <div class="layer-toggle-grid">${toggle('cities','Cities')}${toggle('ports','Ports')}</div>
      </div>
      <div id="country-pop-${id}" class="country-pop country-pop-wide">${itemPanel(state.selectedItem)}</div>
    </section>
  </div>`;
}
function toggle(key,label){return `<div class="toggle-row"><span>${label}</span><button class="switch ${state.layer[key]?'on':''}" onclick="state.layer.${key}=!state.layer.${key}; render()"></button></div>`}
function itemPanel(item){
  if(!item) return countryPanel(state.currentCountry || countryByName.Brazil);
  // v1.4 bugfix: finance hubs are still cities in the Discover atlas.
  // They should use the same green marker color and simple city description panel,
  // not the purple route-style logic panel.
  const kind = item.kind==='route' ? 'route' : item.type==='port' ? 'port' : 'city';
  const profile=getEntityProfile(item);
  const subtitle = item.kind==='route' ? 'Trade route · sea corridor' : item.type==='port' ? (profile?.tag || 'Port / chokepoint') : (profile?.tag || 'City / economic node');
  if(item.type==='port' || kind==='city'){
    const description = item.type==='port'
      ? (portDescriptions[item.name] || `${item.name} is an important maritime node for cargo, customs, storage and inland logistics. Its role depends on terminal capacity, hinterland links, shipping routes and the industries or consumer markets it serves.`)
      : (cityDescriptions[item.name] || `${item.name} is an economic node where people, firms, infrastructure and institutions concentrate. Its importance comes from the way it connects local activity to national and global markets.`);
    return `${infoImage(kind,item.name,subtitle)}<h3>${item.name}</h3><p>${subtitle}</p><p>${description}</p>`;
  }
  const watch = 'Canal congestion, naval risk, weather, insurance costs and rerouting.';
  const matters = 'Sea routes are the hidden map underneath prices and supply chains.';
  return `${infoImage(kind,item.name,subtitle)}<h3>${item.name}</h3><p>${subtitle}</p><p>${item.desc || 'A maritime corridor connecting production, energy, ports and final demand.'}</p><div class="info-list"><b>Route logic</b><span>${lensForItem(item)}</span><b>What to watch</b><span>${watch}</span><b>Why it matters</b><span>${matters}</span></div>`;
}
function countryPanel(c){
  if(!c) return `<h3>World Atlas</h3><p>Click a country, city or port to inspect it.</p>`;
  const angle = `${c.name} is shaped by ${c.model.toLowerCase()}, with ${c.exports} linking it to global demand.`;
  const power = `${c.strength} is its main source of leverage; ${c.vulnerability.toLowerCase()} is the constraint that can weaken it.`;
  return `${infoImage('country',c.name,c.region)}<h3>${c.name}</h3><p>${c.region} · ${c.pop} · ${c.currency}</p><p>${c.model}. Main exports: ${c.exports}.</p><div class="metric-grid"><div class="metric-mini"><span>GDP</span><b>${c.gdp}</b></div><div class="metric-mini"><span>GDP / cap</span><b>${c.gdppc}</b></div><div class="metric-mini"><span>Energy</span><b>${c.energy}</b></div><div class="metric-mini"><span>Key risk</span><b>${c.risk}</b></div></div><div class="info-list"><b>Economic model</b><span>${angle}</span><b>Strengths</b><span>${power}</span><b>Vulnerabilities</b><span>${c.name}'s key pressure point is ${c.vulnerability.toLowerCase()}, especially if ${c.risk.toLowerCase()} becomes more severe.</span><b>WorldPulse reading</b><span>Read ${c.name} through four lenses: geography, exports, energy dependence and institutional capacity. That mix explains its room for maneuver.</span></div><button class="pill-btn" style="margin-top:12px" onclick="navigate('compare')">Compare ↗</button>`;
}


function filteredStories(){
  const q = state.search.toLowerCase().trim();
  return stories.filter(s=>{
    const tagText = (storyCountryTags[s.id] || []).join(' ');
    const searchable = [s.title,s.place,s.category,s.description,tagText].join(' ').toLowerCase();
    return (state.category==='All'||s.category===state.category) && searchable.includes(q);
  });
}
function storyResultsHTML(){
  const filtered = filteredStories();
  const empty = `<div class="empty-state"><h3>No stories found</h3><p>Try another country, region or topic.</p></div>`;
  return filtered.length ? filtered.map(storyCard).join('') : empty;
}
function handleStorySearch(input){
  state.search = input.value;
  const grid = document.getElementById('story-results');
  if(grid) grid.innerHTML = storyResultsHTML();
}
function setStoryCategory(cat){
  state.category = cat;
  render();
  setTimeout(()=>{
    const input = document.getElementById('story-search');
    if(input){ input.focus(); input.setSelectionRange(input.value.length,input.value.length); }
  },0);
}
function storiesPage(){
  return layout(`
    <div class="section-kicker">Stories</div><h2 class="page-title">Country deep dives</h2><p class="page-sub">Five core WorldPulse explainers, each written in three layers: quick, medium, and deep.</p>
    <input id="story-search" class="search" placeholder="Search these five stories — e.g. Singapore, Pix, ports, Taiwan" value="${state.search}" oninput="handleStorySearch(this)" autocomplete="off" />
    <div class="chips">${categories.map(c=>`<button class="chip ${state.category===c?'active':''}" onclick="setStoryCategory('${c}')">${c}</button>`).join('')}</div>
    <div id="story-results" class="story-grid">${storyResultsHTML()}</div>
  `);
}
function storyCard(s){
  return `<button class="story-card ${s.coming?'locked':''}" ${s.coming?'':'onclick="navigate(\'story\',{story:\''+s.id+'\'})"'}><div class="story-top"><span class="story-icon">${s.icon}</span><span class="tag ${s.category}">${s.category}</span>${s.coming?'<span class="lock">▢</span>':''}</div><h3>${s.title}</h3><div class="story-place">${s.place}</div><p class="story-desc">${s.description}</p><div class="story-bottom"><span>◷ 3 layers</span><span class="read-link">${s.coming?'Locked':'Read →'}</span></div></button>`;
}

function storyPage(){
  const s = stories.find(x=>x.id===state.story) || stories[0];
  const txt = storyText(s,state.storyLayer);
  const time = estimateMinutes(txt,state.storyLayer,s.id);
  const hasGlobe = globeStoryIds.includes(s.id);
  return layout(`<div class="story-detail"><button class="pill-btn" onclick="navigate('stories')">← Back to stories</button><div class="story-hero"><div class="story-top"><span class="story-icon">${s.icon}</span><span class="tag ${s.category}">${s.category}</span></div><div class="section-kicker">${s.place} · ${time}</div><h2>${s.title}</h2><p class="page-sub" style="margin-bottom:0">${s.description}</p><div class="story-actions">${hasGlobe?`<button class="dark-btn" onclick="openStoryGlobe('${s.id}')">View on globe →</button>`:''}</div></div><div class="layer-tabs">${['quick','medium','deep'].map(l=>`<button class="layer-tab ${state.storyLayer===l?'active':''}" onclick="state.storyLayer='${l}'; render()">${l==='quick'?'Quick Insight':l==='medium'?'Medium Story':'Deep Dive'} · ${estimateMinutes(storyText(s,l),l,s.id)}</button>`).join('')}</div><article class="article">${articleHTML(s,txt)}</article></div>`);
}

function storyVisual(s){
  const vals = [34,58,73,46,82].map((v,i)=>v + ((s.id.charCodeAt(i%s.id.length)||0)%12));
  if(s.category==='Macro') return `<div class="story-visual"><div><b>Macro pressure map</b><p>Currency, debt, inflation and confidence move together.</p></div><div class="bars">${vals.map((v,i)=>`<span style="height:${v}%"></span>`).join('')}</div></div>`;
  if(s.category==='Logistics') return `<div class="story-visual route-visual"><b>Supply chain logic</b><p>Production → port → chokepoint → market → price shock.</p><div class="flow"><span>Factory</span><i></i><span>Port</span><i></i><span>Canal</span><i></i><span>Consumer</span></div></div>`;
  if(s.category==='Energy') return `<div class="story-visual energy-visual"><b>Energy transition tension</b><p>Old fuels still power the system while new infrastructure is built.</p><div class="split"><span>Oil / gas rents</span><strong>↔</strong><span>Renewables / grids</span></div></div>`;
  if(s.category==='Industry') return `<div class="story-visual"><div><b>Industrial concentration</b><p>A few clusters can control global capacity.</p></div><div class="chip-grid">${Array.from({length:16}).map((_,i)=>`<span class="${i%5===0?'hot':''}"></span>`).join('')}</div></div>`;
  return `<div class="story-visual"><div><b>Timeline logic</b><p>The story is easier to read when you separate constraint, strategy, bottleneck and result.</p></div><div class="mini-timeline"><span>Constraint</span><span>Strategy</span><span>Bottleneck</span><span>Result</span></div></div>`;
}

const storyTakeaways = {
  "pix-brazil": "Pix shows how one simple public payment system can change daily life, help small businesses, and modernize the way money moves through an economy.",
  "singapore-rich": "Singapore became rich by turning a small and vulnerable island into one of the world’s most useful economic hubs.",
  "argentina-currency": "Argentina’s currency crises repeat because people do not fully trust the peso, and that mistrust makes each new crisis harder to stop.",
  "ports-matter": "Ports are the hidden machinery of globalization: when they work, we forget them; when they fail, everyone feels it.",
  "taiwan-strait": "The Taiwan Strait matters because a crisis there could disrupt both global technology and global power politics at the same time."
};
function escapeHTML(str){return String(str).replace(/[&<>]/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]));}
function linkifyText(str){return escapeHTML(str).replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');}
function articleHTML(s,txt){
  const blocks = txt.split(/\n\n+/).filter(Boolean);
  return blocks.map(block=>{
    const source = block.match(/^Sources and recommended reading:\s*([\s\S]*)/);
    if(source) return `<div class="source-note"><b>To go further</b><p>${linkifyText(source[1])}</p></div>`;
    const note = block.match(/^Note:\s*([\s\S]*)/);
    if(note) return `<div class="ai-note"><b>AI + human review note</b><p>${linkifyText(note[1])}</p></div>`;
    const m=block.match(/^(\d{2}\s[—-]\s[^\n]+)\n([\s\S]*)/);
    if(m) return `<section><h3>${escapeHTML(m[1])}</h3><p>${linkifyText(m[2])}</p></section>`;
    return `<p>${linkifyText(block)}</p>`;
  }).join('') + `<div class="takeaway"><b>Key takeaway</b><p>${escapeHTML(storyTakeaways[s.id] || s.description || s.title)}</p></div>`;
}


function jsArg(v){return escapeXml(JSON.stringify(v));}
function countryMatchesSearch(c,q){
  if(!q) return false;
  const hay = [c.name,c.region,c.currency,c.model,c.exports,c.risk,c.strength,c.vulnerability].join(' ').toLowerCase();
  return hay.includes(q.toLowerCase().trim());
}
function countrySearchResults(){
  const q = state.countrySearch.trim();
  if(!q) return [];
  return uniqueCountries.filter(c=>countryMatchesSearch(c,q)).slice(0,12);
}
function handleCountrySearch(input){
  state.countrySearch = input.value;
  const results = document.getElementById('country-search-results');
  if(results) results.innerHTML = countrySearchResultsHTML();
}
function openCountryStories(name){
  state.search = name;
  state.category = 'All';
  navigate('stories');
}
function viewCountryInDiscover(name){
  const c = countryByName[name];
  if(c){
    state.currentCountry = c;
    state.focusedCountry = c;
    state.selectedItem = null;
  }
  navigate('discover');
}
function countrySearchCard(c){
  const related = stories.filter(s=>(storyCountryTags[s.id]||[]).includes(c.name));
  const storyLabel = related.length ? `${related.length} related ${related.length===1?'story':'stories'}` : 'No direct story yet';
  return `<article class="search-result-card">
    <div class="search-result-head"><span class="country-flag">${flag(c.name)}</span><div><h3>${c.name}</h3><p>${c.region} · ${c.pop} · ${c.currency}</p></div></div>
    <div class="search-profile">${countryPanel(c)}</div>
    <div class="search-actions">
      <button class="dark-btn" onclick="openCountryStories(${jsArg(c.name)})">View ${storyLabel} →</button>
      <button class="pill-btn" onclick="viewCountryInDiscover(${jsArg(c.name)})">Open on Discover globe ↗</button>
    </div>
  </article>`;
}
function countrySearchResultsHTML(){
  const q = state.countrySearch.trim();
  if(!q) return `<div class="empty-state"><h3>Search the atlas</h3><p>Type a country name, region, currency or economic keyword. The current dataset contains ${uniqueCountries.length} countries.</p></div>`;
  const results = countrySearchResults();
  if(!results.length) return `<div class="empty-state"><h3>No country found</h3><p>Try another spelling or search by region, currency, export, risk or economic model.</p></div>`;
  return results.map(countrySearchCard).join('');
}
function searchPage(){
  const examples = ['Brazil','Singapore','Argentina','Taiwan','Germany','Nigeria'];
  return layout(`
    <div class="section-kicker">Search</div><h2 class="page-title">Find a country in WorldPulse</h2>
    <p class="page-sub">Search across the ${uniqueCountries.length} countries currently available in the atlas. The result uses the same country profile logic as Discover, then lets you jump to related stories or open the country directly on the globe.</p>
    <input id="country-search" class="search" placeholder="Search a country — e.g. Brazil, Singapore, Taiwan, Nigeria" value="${escapeXml(state.countrySearch)}" oninput="handleCountrySearch(this)" autocomplete="off" />
    <div class="chips">${examples.map(x=>`<button class="chip" onclick="state.countrySearch='${x}'; render()">${x}</button>`).join('')}</div>
    <div id="country-search-results" class="search-results">${countrySearchResultsHTML()}</div>
  `);
}

function compare(){
  const a=countryByName[state.compareA] || uniqueCountries[0], b=countryByName[state.compareB] || uniqueCountries[1] || uniqueCountries[0];
  const rows=[['GDP',a.gdp,b.gdp],['GDP per capita',a.gdppc,b.gdppc],['Population',a.pop,b.pop],['Currency',a.currency,b.currency],['Energy dependence',a.energy,b.energy],['Debt / risk lens',a.risk,b.risk],['Economic model',a.model,b.model],['Main exports',a.exports,b.exports]];
  return layout(`<div class="section-kicker">Compare</div><h2 class="page-title">Two countries, side by side</h2><p class="page-sub">A quick way to spot what makes economies different.</p><div class="compare-selectors"><div class="selector-card"><h3>${flag(a.name)} ${a.name}</h3>${selectCountry('compareA')}</div><div class="selector-card"><h3>${flag(b.name)} ${b.name}</h3>${selectCountry('compareB')}</div></div><div class="contrast"><b>Key contrast</b>${a.name} is shaped by ${a.model.toLowerCase()}, while ${b.name} is shaped by ${b.model.toLowerCase()}.</div><div class="compare-table">${rows.map(r=>`<div class="compare-row"><div class="left">${r[1]}</div><div class="label">${r[0]}</div><div class="right">${r[2]}</div></div>`).join('')}</div>`);
}
function selectCountry(key){const sorted=uniqueCountries;return `<select class="select" onchange="state.${key}=this.value; render()">${sorted.map(c=>`<option value="${escapeXml(c.name)}" ${state[key]===c.name?'selected':''}>${flag(c.name)} ${c.name}</option>`).join('')}</select>`}
function flag(name){const code=countryCodeForFlag(name); if(!code) return '🌐'; return code.toUpperCase().replace(/./g,ch=>String.fromCodePoint(127397+ch.charCodeAt(0)));}

function daily(){
  const notice = `<div class="daily-notice">This Daily Brief is generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is renewed every 48 hours.</div>`;
  return layout(`<div class="section-kicker">▣ Daily Brief · renewed every 48 hours</div><h2 class="page-title">5 things shaping the world today</h2><p class="page-sub">Clear explanations of major economic, financial and geopolitical developments. Sources appear at the end of each update.</p>${notice}<div class="daily-list">${dailyBrief.map((d,i)=>`<div class="daily-card"><div class="daily-top"><span class="daily-num">${String(i+1).padStart(2,'0')}</span><span class="tag ${d.cat}">${d.cat}</span><span class="story-place">${d.place}</span></div><h3>${d.title}</h3><div class="brief-sections"><div class="brief-section"><b>What happened</b><p>${linkifyText(d.h)}</p></div><div class="brief-section"><b>Why it matters</b><p>${linkifyText(d.m)}</p></div><div class="brief-section sources"><b>Sources</b><ul>${(d.sources||[]).map(src=>`<li><a href="${src.url}" target="_blank" rel="noopener">${src.name}</a></li>`).join('')}</ul></div></div></div>`).join('')}</div>`)
}
// Learn tab removed in version 1.4; Search replaces it in the navigation.

function openStoryGlobe(id){
  state.globeStory = id;
  state.globeStep = 0;
  renderStoryGlobeOverlay();
}
function closeStoryGlobe(){const el=document.getElementById('story-globe-overlay'); if(el) el.remove(); state.globeStory=null;}
function continueGlobeStory(){const ids=globeStoryIds; const i=ids.indexOf(state.globeStory); state.globeStory=ids[(i+1+ids.length)%ids.length]; state.globeStep=0; renderStoryGlobeOverlay();}
function nextStep(){
  const steps = getSteps();
  if(state.globeStep < steps.length-1){state.globeStep++; renderStoryGlobeOverlay();}
}
function prevStep(){if(state.globeStep>0){state.globeStep--; renderStoryGlobeOverlay();}}
function getSteps(){
  const s=stories.find(x=>x.id===state.globeStory)||stories[0];
  return storySteps[s.id] || [
    {title:s.title,place:s.place,coords:s.coords,text:s.description},
    {title:'The economic layer',place:'Trade and finance',coords:s.coords,text:'The story connects production, capital, transport and policy incentives.'},
    {title:'The geopolitical layer',place:s.place,coords:s.coords,text:'The same facts can become leverage when states, firms and investors react to risk.'},
    {title:'The global consequence',place:'World system',coords:[0,20],text:'The lesson travels beyond one country: geography and institutions shape the whole system.'}
  ];
}
function renderStoryGlobeOverlay(){
  let el=document.getElementById('story-globe-overlay');
  const steps=getSteps(); const step=steps[state.globeStep];
  const s=stories.find(x=>x.id===state.globeStory)||stories[0];
  const html=`<div id="story-globe-overlay" class="story-globe"><button class="close" onclick="closeStoryGlobe()">×</button><div class="story-globe-map"><div class="globe-panel"><svg id="globe-story" class="globe-svg"></svg></div></div><aside class="story-globe-panel"><div class="step-kicker">Step ${state.globeStep+1} of ${steps.length} · ${s.title}</div><div class="location-chip">● ${step.place}</div><h2>${step.title}</h2><p>${step.text}</p><div class="globe-note"><b>Map logic</b><span>This location is a node in the wider system: follow the movement of money, goods, energy and leverage as the globe turns.</span></div><div class="progress">${steps.map((_,i)=>`<div class="bar ${i<=state.globeStep?'done':''}"><span></span></div>`).join('')}</div><div class="story-globe-actions"><button class="pill-btn" onclick="prevStep()">← Back</button>${state.globeStep===steps.length-1?`<button class="dark-btn" onclick="continueGlobeStory()">Restart Story Globe →</button><button class="ghost-btn" onclick="closeStoryGlobe(); navigate('stories')">Back to stories</button>`:`<button class="dark-btn" onclick="nextStep()">Continue →</button>`}</div></aside></div>`;
  if(!el){document.body.insertAdjacentHTML('beforeend',html)} else {el.outerHTML=html}
  setTimeout(()=>drawGlobe('story',{focus:step.coords, markers:steps.map((x,i)=>({name:x.place,desc:x.title,lon:x.coords[0],lat:x.coords[1],type:'story',active:i===state.globeStep})), storyMode:true}),40);
}

function render(){
  const app=document.getElementById('app');
  if(state.page==='home') app.innerHTML=home();
  if(state.page==='discover') app.innerHTML=discover();
  if(state.page==='search') app.innerHTML=searchPage();
  if(state.page==='stories') app.innerHTML=storiesPage();
  if(state.page==='story') app.innerHTML=storyPage();
  if(state.page==='compare') app.innerHTML=compare();
  if(state.page==='daily') app.innerHTML=daily();
  setTimeout(()=>{
    if(document.getElementById('globe-main')) drawGlobe('main',{});
    hydratePanelImages(app);
  },50);
}

function loadGeo(){
  if(state.countriesGeo) return Promise.resolve(state.countriesGeo);
  return fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(r=>r.json()).then(world=>{
    state.countriesGeo = topojson.feature(world, world.objects.countries).features;
    return state.countriesGeo;
  }).catch(()=>{ state.countriesGeo=[]; return []; });
}

function drawGlobe(id, opts={}){
  loadGeo().then(features=>{
    const svg=d3.select(`#globe-${id}`); if(svg.empty()) return;
    if(globeTimers[id]) globeTimers[id].stop();
    svg.selectAll('*').remove();
    const node=svg.node(); const width=node.clientWidth||900, height=node.clientHeight||630;
    const focus=opts.focus || (state.focusedCountry?.coords) || [0,20];
    const scale = opts.storyMode ? Math.min(width,height)*0.54 : Math.min(width,height)*0.46;
    const projection=d3.geoOrthographic().translate([width/2,height/2]).scale(scale).rotate([-focus[0],-focus[1],0]).clipAngle(90).precision(.3);
    const path=d3.geoPath(projection);
    svg.attr('viewBox',`0 0 ${width} ${height}`);
    const defs=svg.append('defs');
    const grad=defs.append('radialGradient').attr('id',`sea-${id}`).attr('cx','38%').attr('cy','30%');
    grad.append('stop').attr('offset','0%').attr('stop-color','#f8fbff');
    grad.append('stop').attr('offset','55%').attr('stop-color','#e2f2f7');
    grad.append('stop').attr('offset','100%').attr('stop-color','#cfe6f2');
    svg.append('circle').attr('class','sphere').attr('cx',width/2).attr('cy',height/2).attr('r',projection.scale()).attr('fill',`url(#sea-${id})`);
    const g=svg.append('g');
    g.append('path').datum(d3.geoGraticule10()).attr('class','graticule').attr('d',path);
    g.selectAll('path.country').data(features).join('path').attr('class',d=>`country ${state.focusedCountry && geoCountryMatches(d.properties?.name,state.focusedCountry)?'focused':''}`).attr('d',path).on('click',(e,d)=>{
      const name=d.properties?.name;
      const match = countryByName[name] || countries.find(c=>name && (name.includes(c.name)||c.name.includes(name)));
      if(match){ state.currentCountry=match; state.focusedCountry=match; state.selectedItem=null; render(); }
    });

    const markers=[];
    if(opts.markers) markers.push(...opts.markers);
    else {
      if(state.layer.cities) markers.push(...cities);
      if(state.layer.ports) markers.push(...ports);
    }
    // v1.4 final cleanup: the Discover globe no longer has a Trade Routes layer.
    // Route visuals are kept only inside Story Globe Mode where they support a story narrative.
    if(opts.storyMode) drawRoutes(svg, projection, path, true);
    drawMarkers(svg, projection, markers, opts.storyMode);

    const repaintGlobe=()=>{
      g.selectAll('path').attr('d',path);
      svg.selectAll('.route').attr('d',d=>routePath(d.pts,projection));
      updateMarkers(svg, projection);
    };
    let resumeAt=0, lastTick=Date.now();
    const pauseAuto=(ms=2800)=>{ resumeAt=Date.now()+ms; };
    svg.on('pointerdown.autospin',()=>pauseAuto(3600)).on('wheel.autospin',()=>pauseAuto(3600)).on('touchstart.autospin',()=>pauseAuto(3600));

    const drag=d3.drag().on('start',()=>pauseAuto(4200)).on('drag', (event)=>{
      pauseAuto(4200);
      const r=projection.rotate();
      projection.rotate([r[0]+event.dx/3, r[1]-event.dy/3, r[2]]);
      repaintGlobe();
    });
    if(!opts.storyMode){ svg.call(drag); svg.call(d3.zoom().scaleExtent([.85,2.8]).on('zoom',(event)=>{pauseAuto(4200); projection.scale(scale*event.transform.k); svg.select('circle.sphere').attr('r',projection.scale()); repaintGlobe();})); }
    else { svg.call(drag); }

    globeTimers[id]=d3.timer(()=>{
      const now=Date.now();
      if(now<resumeAt){ lastTick=now; return; }
      const dt=Math.min(40, now-lastTick); lastTick=now;
      const r=projection.rotate();
      projection.rotate([r[0]+dt*0.006, r[1], r[2]]);
      repaintGlobe();
    });
  });
}
function drawRoutes(svg, projection, path, all=false){
  const data=all?tradeRoutes.slice(0,3):tradeRoutes;
  svg.append('g').selectAll('path.route').data(data).join('path')
    .attr('class',d=>`route ${d.type}`)
    .attr('d',d=>routePath(d.pts,projection))
    .on('mousemove',(e,d)=>showTip(e,`<b>${d.name}</b><br>${d.desc||'Sea trade corridor'}`))
    .on('mouseleave',hideTip)
    .on('click',(e,d)=>{state.selectedItem={kind:'route',...d}; updateInfoPanel();});
}
function frontVisible(lon,lat,projection){
  const r=projection.rotate();
  const center=[-r[0],-r[1]];
  return d3.geoDistance([lon,lat], center) < Math.PI/2 - 0.025;
}
function routePath(pts, projection){
  // Build curved maritime segments only on the visible hemisphere.
  // Each original route uses many sea waypoints, so the visual line bends around coasts instead of cutting across land.
  let d='';
  for(let i=0;i<pts.length-1;i++){
    const a=pts[i], b=pts[i+1];
    const interp=d3.geoInterpolate(a,b);
    const samples=[];
    for(let t=0;t<=1.0001;t+=0.18){
      const ll=interp(t);
      if(!frontVisible(ll[0],ll[1],projection)){ samples.length=0; break; }
      const p=projection(ll); if(p) samples.push(p);
    }
    if(samples.length<2) continue;
    d += `M ${samples[0][0].toFixed(1)} ${samples[0][1].toFixed(1)} `;
    for(let j=1;j<samples.length;j++){
      const prev=samples[j-1], cur=samples[j];
      const mx=(prev[0]+cur[0])/2, my=(prev[1]+cur[1])/2 - 10;
      d += `Q ${mx.toFixed(1)} ${my.toFixed(1)} ${cur[0].toFixed(1)} ${cur[1].toFixed(1)} `;
    }
  }
  return d;
}
function updateInfoPanel(){
  document.querySelectorAll('.country-pop').forEach(el=>{el.innerHTML=itemPanel(state.selectedItem); hydratePanelImages(el);});
}

function markerColor(t){return t==='port'?'#d97706':t==='story'?'#2563eb':(t==='city'||t==='finance')?'#2f855a':'#111827'}
function drawMarkers(svg, projection, markers, storyMode){
  const g=svg.append('g').attr('class','markers');
  const groups=g.selectAll('g.marker').data(markers).join('g').attr('class',d=>`marker ${d.active?'active':''}`).attr('data-lon',d=>d.lon).attr('data-lat',d=>d.lat).on('mousemove',(e,d)=>showTip(e,`<b>${d.name}</b><br>${d.desc||d.type}`)).on('mouseleave',hideTip).on('click',(e,d)=>{state.selectedItem=d; updateInfoPanel();});
  groups.append('circle').attr('class','pulse-ring').style('display',d=>d.active?'block':'none');
  groups.append('circle').attr('class','core').attr('r',d=>d.active?8:storyMode?5:5.5).attr('fill',d=>markerColor(d.type));
  groups.append('text').text(d=>d.active||storyMode?d.name:'' ).attr('x',12).attr('y',4);
  updateMarkers(svg,projection);
}
function updateMarkers(svg, projection){
  svg.selectAll('g.marker').each(function(d){
    const p=projection([d.lon,d.lat]);
    const visible=p && frontVisible(d.lon,d.lat,projection);
    d3.select(this).attr('transform',p?`translate(${p[0]},${p[1]})`:'translate(-999,-999)').style('display',visible?'block':'none');
  });
}
function showTip(e,html){
  let t=document.querySelector('.tooltip'); if(!t){t=document.createElement('div');t.className='tooltip';document.body.appendChild(t)}
  t.innerHTML=html; t.style.left=(e.clientX+14)+'px'; t.style.top=(e.clientY+14)+'px'; t.style.opacity=1;
}
function hideTip(){const t=document.querySelector('.tooltip'); if(t)t.style.opacity=0;}

window.navigate=navigate; window.handleCountrySearch=handleCountrySearch; window.openCountryStories=openCountryStories; window.viewCountryInDiscover=viewCountryInDiscover; window.continueGlobeStory=continueGlobeStory; window.openStoryGlobe=openStoryGlobe; window.closeStoryGlobe=closeStoryGlobe; window.nextStep=nextStep; window.prevStep=prevStep;
render();
