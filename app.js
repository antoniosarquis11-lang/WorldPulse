/* WorldPulse static MVP — Netlify-ready */
const state = {
  page: 'home',
  currentCountry: null,
  focusedCountry: null,
  search: '',
  category: 'All',
  layer: { cities: true, ports: true, routes: false },
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
  ['singapore-rich','🇸🇬','Why Singapore became rich','Singapore','Development','From a swampy port to a global financial hub in one generation.', [103.85,1.29]],
  ['pix-brazil','🇧🇷','How Pix changed Brazil','Brazil','Fintech','A free instant payment system rewired an entire economy in months.', [-47.88,-15.8]],
  ['argentina-currency','🇦🇷','Why Argentina keeps facing currency crises','Argentina','Macro','A century of inflation, defaults, and dollar shortages — explained simply.', [-58.38,-34.6]],
  ['ports-matter','⚓','Why ports matter more than you think','Global','Logistics','90% of global trade travels by sea — and a few chokepoints control it all.', [103.75,1.25]],
  ['gulf-oil','🛢️','How oil transformed Gulf economies','Middle East','Energy','Sand, sovereign wealth, and the race to a post-oil future.', [46.7,24.7]],
  ['africa-complex','🌍','Why African economies are more complex than people think','Africa','Development','54 countries, 1.4 billion people, and a story far beyond aid.', [20,2]],
  ['belt-road','🇨🇳','The Belt and Road, explained','China','Geopolitics',"Beijing's $1 trillion bet on infrastructure diplomacy.", [116.4,39.9]],
  ['germany-industry','🇩🇪',"Germany's industrial puzzle",'Germany','Industry',"Why Europe's powerhouse is suddenly looking fragile.", [10,51]],
  ['south-china-sea','🌊','The South China Sea: a global chokepoint','Asia','Geopolitics','One-third of global shipping flows through contested waters.', [114,15]],
  ['semiconductors','💾','Why semiconductors control modern power','Global','Industry','Chips are the new oil — and a few companies make them all.', [121,24]],
  ['future-energy','⚡','The future of global energy','Global','Energy',"Renewables are surging, but oil isn't going quietly.", [55,24]],
  ['supply-chains','📦','How supply chains are being reshaped','Global','Logistics','Friend-shoring, near-shoring, and the end of hyper-globalization.', [-102,23]],
  ['demographic-decline','👥','Why demographic decline matters','Japan & Europe','Macro','Shrinking populations are quietly rewriting the global economy.', [138,37]],
  ['india-rise','🇮🇳',"India's economic rise",'India','Development',"How the world's most populous nation is reshaping global growth.", [78,22]],
  ['rare-earth','🪨','The rare earth war','Global','Industry','Why a handful of metals decide the future of tech and defense.', [104,35]],
  ['dollar-system','💵','The dollar system, explained','Global','Macro','How one currency quietly anchors the entire world economy.', [-74,40]],
  ['arctic-frontier','🧊','The Arctic: the new frontier','Arctic','Geopolitics','Melting ice is opening trade routes — and a great-power race.', [50,72]],
  ['africa-fintech','📱',"Africa's fintech leapfrog",'Africa','Fintech','From M-Pesa to mobile-first banking for a billion people.', [36.82,-1.29]],
  ['taiwan-strait','🇹🇼','Why the Taiwan Strait matters','Taiwan','Geopolitics','A narrow waterway carries chips, ships and the future of global tech.', [121,24]],
  ['saudi-vision','🏗️','Saudi Vision 2030, decoded','Saudi Arabia','Development','Megaprojects, sovereign wealth, and a race to a post-oil identity.', [46.7,24.7]],
  ['mexico-nearshoring','🇲🇽',"Mexico's nearshoring boom",'Mexico','Industry','How geography turned Mexico into the new factory of North America.', [-99.13,19.43]],
  ['green-deal','🌱',"Europe's Green Deal gamble",'Europe','Energy','A continent betting industrial policy on decarbonisation.', [8,50]],
  ['russia-war-economy','🛡️',"Russia's war economy",'Russia','Macro',"How sanctions reshaped — but did not break — Russia's economy.", [37.6,55.75]],

  ['japan-debt','🇯🇵',"Japan's debt paradox",'Japan','Macro','Why a country can owe so much and still remain financially stable.', [138,37]],
  ['chaebols-korea','🏢','How chaebols built Korea','South Korea','Industry','How family-controlled conglomerates powered industrial catch-up and created new vulnerabilities.', [127,37.56]],
  ['lithium-triangle','🔋','The Lithium Triangle','Latin America','Energy','Why Argentina, Chile and Bolivia sit at the center of the battery economy.', [-68,-23]],
  ['ai-geography','🧠','The new AI compute geography','Global','Industry','Why data centers, chips, power grids and water are becoming strategic infrastructure.', [-122,37]],
  ['water-crunch','💧','The global water crunch','Global','Development','How water scarcity is becoming an economic and geopolitical constraint.', [35,31]],
  ['panama-drought','🚢','When the Panama Canal runs short of water','Panama','Logistics','How drought can slow ships, raise prices and expose the hidden fragility of trade.', [-79.55,9.08]],
  ['red-sea-shock','🌊','Why the Red Sea matters','Middle East','Logistics','A narrow maritime corridor shows how security shocks can reroute global commerce.', [43.3,12.6]],
  ['nigeria-oil','🛢️',"Nigeria's oil paradox",'Nigeria','Energy','Why huge oil reserves do not automatically create fiscal stability or development.', [8,9]],
  ['kenya-mobile-money','📱','Kenya and the mobile money leap','Kenya','Fintech','How mobile payments changed finance before traditional banking reached everyone.', [36.82,-1.29]],
  ['morocco-industrial','🚗',"Morocco's industrial bet",'Morocco','Industry','How cars, ports, renewables and EU proximity reshaped a North African economy.', [-6,32]],
  ['egypt-suez-fx','🛳️','Egypt, Suez and the dollar shortage','Egypt','Macro','Why canals, food imports, tourism and foreign currency all connect.', [32.3,30.4]],
  ['turkey-inflation','💱',"Turkey's inflation experiment",'Turkey','Macro','How currency pressure, interest rates and politics reshape household life.', [35,39]],
  ['indonesia-nickel','🪨',"Indonesia's nickel strategy",'Indonesia','Industry','How one resource became a lever in the electric vehicle supply chain.', [118,-2]],
  ['vietnam-china-plus-one','🏭','Vietnam and China+1','Vietnam','Industry','Why manufacturers use Vietnam to diversify Asian supply chains.', [108,16]],
  ['qatar-lng','⛽','Qatar and the LNG age','Qatar','Energy','How gas wealth turned a small state into a global energy player.', [51,25]],
  ['uae-logistics','✈️','The UAE logistics model','UAE','Logistics','How ports, airlines, free zones and finance created a Gulf platform economy.', [54,24]],
  ['swiss-safe-haven','🏦','Why Switzerland is a safe haven','Switzerland','Macro','How stability, finance, currency credibility and institutions reinforce each other.', [8,47]],
  ['poland-convergence','🇵🇱',"Poland's convergence story",'Poland','Development','How EU integration, manufacturing and institutions helped narrow the income gap.', [20,52]],
  ['ethiopia-hydro','⚡',"Ethiopia's hydropower gamble",'Ethiopia','Energy','Why dams can become development tools, diplomatic pressure points and financial risks.', [40,9]],
  ['south-africa-power','🔌',"South Africa's power crisis",'South Africa','Energy','How electricity shortages can limit growth in an industrial economy.', [24,-29]],
  ['mexico-border-factories','🏭','Mexico, borders and factories','Mexico','Industry','Why proximity to the US is becoming one of Mexico’s biggest economic assets.', [-102,23]],
  ['arctic-shipping','🧊','Arctic shipping and great power rivalry','Arctic','Geopolitics','How melting ice creates new routes, risks and strategic competition.', [50,72]],
  ['cocoa-west-africa','🍫','Cocoa and West Africa','Côte d\'Ivoire & Ghana','Development','Why the world’s chocolate supply depends on farmers with little pricing power.', [-3,7]],
  ['green-hydrogen','🟢','The green hydrogen race','Global','Energy','Why countries with sun, wind, ports and industry want to export clean molecules.', [10,25]],
  ['remittances-economy','💸','How remittances shape economies','Global','Macro','Why money sent by migrants can stabilize households and entire countries.', [72,19]],
].map(([id,icon,title,place,category,description,coords])=>({id,icon,title,place,category,description,coords,coming:false}));

const comingSoon = [
  ['food-security','🌾','Food security in a hotter world','Global','Development'],
  ['space-economy','🛰️','The space economy and national power','Global','Industry'],
  ['insurance-climate','☔','Climate insurance and fragile states','Global','Macro'],
  ['african-rail','🚆','Africa’s rail corridor race','Africa','Logistics'],
  ['digital-currencies','🪙','Central bank digital currencies','Global','Fintech']
].map(([id,icon,title,place,category])=>({id,icon,title,place,category,description:'Coming soon.',coming:true}));

const didYouKnow = [
  {text:'South Korea was once poorer than Ghana — today it builds some of the world’s most advanced chips.', story:'semiconductors'},
  {text:'Singapore has almost no natural resources, yet became one of the richest economies in the world.', story:'singapore-rich'},
  {text:'Brazil’s Pix payment system changed how millions of people use money in only a few years.', story:'pix-brazil'},
  {text:'The Suez Canal is a narrow artificial passage but a major artery of world trade.', story:'ports-matter'},
  {text:'Taiwan’s chip industry is one of the world economy’s biggest pressure points.', story:'taiwan-strait'},
  {text:'A country can be rich in resources and still struggle if institutions, logistics and currency stability are weak.', story:'africa-complex'}
];
let factIndex = Math.floor(Math.random()*didYouKnow.length);

const dailyBrief = [
  {cat:'Currency',place:'Japan',title:'Yen pressure shows the growth-versus-inflation trap',h:'The yen stays under pressure as markets expect gradual normalization rather than a sharp policy shock.',m:'Japan must support growth while defending households from imported energy and food inflation.',w:'Watch central-bank language, FX intervention signals, and spillovers into Asian currencies.'},
  {cat:'Macro',place:'China',title:'China’s property problem keeps shaping consumption',h:'Policy support is trying to stabilize confidence after a long property downturn.',m:'Housing wealth affects household spending, local government finance and commodity demand.',w:'Watch whether support reaches private buyers and smaller developers.'},
  {cat:'Energy',place:'Europe',title:'Energy security is now industrial policy',h:'European governments are treating power prices, grids and clean industry as strategic questions.',m:'Cheap, reliable energy determines whether factories stay competitive during decarbonisation.',w:'Watch grid investment, nuclear debates and subsidy disputes.'},
  {cat:'Logistics',place:'Global',title:'Chokepoints remain the weak links of globalization',h:'Canals, straits and ports concentrate enormous trade flows into narrow spaces.',m:'A local disruption can quickly become a global price and supply problem.',w:'Watch the Red Sea, Panama Canal water levels, and South China Sea tensions.'},
  {cat:'Industry',place:'Global',title:'Chip supply chains are becoming geopolitical infrastructure',h:'Semiconductors sit at the center of AI, defense, cars and consumer electronics.',m:'The world depends on a small number of firms, regions and machines.',w:'Watch export controls, Taiwan risk and new fabs in the US, Europe and Japan.'}
];

const modules = [
  ['📈','Inflation','Why prices rise — and why it matters.'],['🚢','Trade','How countries exchange goods, services, and IOUs.'],['💱','Currency','What gives money its value.'],['🏦','Debt','Why governments borrow — and when it becomes dangerous.'],['⚡','Energy','The hidden input behind every economy.'],['🏗️','Development',"How poor countries become rich — or don't."],['🌍','Geography','Why location still shapes power.'],['🧩','Institutions','The rules behind prosperity.'],['💾','Technology','How innovation changes national power.'],['🛡️','Sanctions','How finance becomes a weapon.']
].map(([icon,title,desc],i)=>({icon,title,desc,num:String(i+1).padStart(2,'0')}));

const storySteps = {
  'belt-road': [
    {title:'It starts in Beijing', place:'Beijing, China', coords:[116.4,39.9], text:"BRI is announced from Beijing in 2013 — Xi Jinping's signature foreign-policy project, framed as a modern Silk Road of ports, rail and digital infrastructure."},
    {title:'The route moves through Central Asia and the Gulf', place:'Riyadh / Gulf corridor', coords:[46.7,24.7], text:'Energy, finance and logistics pull the project westward. Gulf states become connectors between Asian capital, oil wealth and new infrastructure.'},
    {title:'Chokepoints decide the economics', place:'Suez and Red Sea', coords:[32.3,29.9], text:'The dream of connectivity still depends on narrow passages. Suez and the Red Sea show how geography can compress world trade into fragile corridors.'},
    {title:'Europe becomes the final test', place:'Piraeus / Rotterdam', coords:[23.6,37.9], text:'Ports and rail links into Europe are not just trade tools. They become questions of influence, dependency and political leverage.'}
  ],
  'ports-matter': [
    {title:'Trade begins at the port',place:'Singapore',coords:[103.75,1.25],text:'A port is not just a dock. It is where customs, finance, insurance, containers and shipping schedules meet.'},
    {title:'The canal compresses the world',place:'Suez Canal',coords:[32.3,30.4],text:'A narrow artificial passage can save thousands of kilometers and decide the price of goods in distant countries.'},
    {title:'The Atlantic has its own gate',place:'Panama Canal',coords:[-79.55,9.08],text:'Panama connects two oceans, but drought and congestion reveal the physical limits of globalization.'},
    {title:'Final demand pulls everything',place:'Rotterdam',coords:[4.47,51.92],text:'Europe’s ports turn ship movements into factories, supermarkets and energy flows.'}
  ],
  'taiwan-strait': [
    {title:'A narrow sea lane',place:'Taiwan Strait',coords:[121,24],text:'The Taiwan Strait is small on a map but enormous in economic importance.'},
    {title:'Chips concentrate power',place:'Hsinchu / Taiwan',coords:[121,24.8],text:'The semiconductor ecosystem turns local industrial capacity into global leverage.'},
    {title:'Shipping routes amplify risk',place:'South China Sea',coords:[114,15],text:'Regional tensions interact with global shipping flows, electronics supply chains and insurance costs.'},
    {title:'The impact is global',place:'California / Tech demand',coords:[-122,37],text:'A disruption would be felt not only in Asia but across AI, cars, phones, defense and cloud infrastructure.'}
  ],
  'saudi-vision': [
    {title:'Oil built the state',place:'Eastern Province',coords:[50,26],text:'Saudi Arabia’s modern economy was built on oil rents, energy exports and state-led development.'},
    {title:'Riyadh becomes the command center',place:'Riyadh',coords:[46.7,24.7],text:'Vision 2030 turns the capital into a hub for investment, tourism, finance and administrative reform.'},
    {title:'Megaprojects sell a new future',place:'NEOM',coords:[35.1,28.1],text:'Projects like NEOM are designed to signal a post-oil identity and attract global capital.'},
    {title:'The test is private productivity',place:'Gulf region',coords:[54,24],text:'The long-term challenge is whether spending can become a durable private-sector economy.'}
  ],

  'panama-drought': [
    {title:'The canal is a water machine',place:'Panama Canal',coords:[-79.55,9.08],text:'The Panama Canal is not only a shortcut. It depends on freshwater locks, rainfall and lake levels.'},
    {title:'Drought becomes a trade constraint',place:'Gatun Lake',coords:[-79.9,9.25],text:'When water levels fall, authorities can restrict ship draft or daily crossings, turning climate into logistics policy.'},
    {title:'Shippers reroute and prices adjust',place:'Pacific and Atlantic routes',coords:[-84,12],text:'Delays push companies to pay premiums, wait longer or reroute through other corridors.'},
    {title:'A local weather shock becomes global',place:'US and Asian markets',coords:[-118,34],text:'The effects spread into shipping schedules, inventories and consumer prices far beyond Panama.'}
  ],
  'red-sea-shock': [
    {title:'A narrow corridor carries global trade',place:'Bab el-Mandeb',coords:[43.3,12.6],text:'The Red Sea links the Indian Ocean to Suez, making it central to Asia-Europe trade.'},
    {title:'Security risk changes the route',place:'Red Sea',coords:[38,20],text:'Attacks, insurance costs and naval risk can make ships avoid the corridor.'},
    {title:'The long way is expensive',place:'Cape of Good Hope',coords:[18,-34],text:'Rerouting around Africa adds time, fuel and uncertainty.'},
    {title:'Europe feels the delay',place:'Rotterdam',coords:[4.47,51.92],text:'The shock arrives as delayed inputs, higher freight rates and pressure on inventories.'}
  ],
  'lithium-triangle': [
    {title:'Lithium starts in the salt flats',place:'Atacama / Andes',coords:[-68,-23],text:'Lithium brines in Argentina, Chile and Bolivia sit beneath some of the driest landscapes on earth.'},
    {title:'Batteries pull demand north',place:'North America',coords:[-100,38],text:'Electric vehicles and grid batteries turn mineral deposits into industrial strategy.'},
    {title:'Processing decides value',place:'China and Asia',coords:[104,35],text:'Mining is only one part of the chain. Refining and battery manufacturing decide who captures value.'},
    {title:'The local constraint is water',place:'Andean communities',coords:[-67,-22],text:'The economic opportunity collides with water use, environmental stress and local politics.'}
  ],
  'indonesia-nickel': [
    {title:'Nickel begins in the islands',place:'Sulawesi / Indonesia',coords:[121,-3],text:'Indonesia’s nickel deposits became strategically valuable as EV battery demand increased.'},
    {title:'Export bans force processing at home',place:'Jakarta',coords:[106.85,-6.21],text:'Policy pushed firms to build smelters and processing capacity inside Indonesia.'},
    {title:'Capital and technology connect to Asia',place:'China and Korea',coords:[120,30],text:'Battery supply chains link Indonesian resources to Asian industrial firms.'},
    {title:'The test is upgrading',place:'Global EV markets',coords:[10,50],text:'The challenge is moving from raw materials into higher-value industrial capability.'}
  ],
  'uae-logistics': [
    {title:'The model starts at the port',place:'Jebel Ali',coords:[55.05,25.01],text:'Jebel Ali turned Dubai into a regional re-export and warehousing platform.'},
    {title:'Air routes multiply the effect',place:'Dubai',coords:[55.27,25.2],text:'Airlines and airports connect high-value goods, tourism and business services.'},
    {title:'Free zones reduce friction',place:'Gulf corridors',coords:[54,24],text:'Rules, logistics and finance are packaged together to attract firms.'},
    {title:'The platform reaches three continents',place:'Asia, Africa and Europe',coords:[43,20],text:'The UAE model depends on being a connector between regions rather than a large domestic market.'}
  ],

};
const globeStoryIds = Object.keys(storySteps);

function estimateMinutes(text, layer, storyId=''){
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  let m = Math.round(words / 185);
  if(layer==='quick') m = Math.min(1, Math.max(1, m));
  if(layer==='medium') m = Math.min(5, Math.max(3, m));
  if(layer==='deep') m = Math.min(10, Math.max(7, m));
  return `${m} min`;
}

const mexicoNearshoringLayers = {
  quick: `Mexico is becoming one of the clearest winners of the global shift toward nearshoring: the relocation of factories and supply chains closer to final markets.

For companies selling to the United States, Mexico offers a rare combination: lower production costs than the U.S., direct border access, deep manufacturing experience, and privileged trade access through the USMCA, the trade agreement linking Mexico, the United States, and Canada. This makes Mexico especially attractive for industries like cars, electronics, machinery, appliances, medical devices, aerospace, logistics, and industrial real estate.

But the boom is not automatic. Mexico’s opportunity depends on whether it can solve its internal bottlenecks: electricity shortages, water stress, transport congestion, insecurity, weak rule of law, and uncertainty around U.S. trade policy. Nearshoring could help Mexico boost productivity, integrate smaller firms into value chains, and create better jobs, but only if the country improves logistics, digital connectivity, competition, regulation, and climate resilience.

WorldPulse lens: Mexico is not just receiving factories. It is being tested as the future industrial backbone of North America.`,
  medium: `01 — The old globalization model
For decades, globalization had a simple logic: produce where it is cheapest, even if that means building complex supply chains across oceans. China became the central factory of the world, and companies accepted long shipping routes because the cost advantages were enormous.

That model is now changing. The pandemic exposed how fragile global supply chains could be. Shipping delays, port congestion, factory shutdowns, trade wars, and geopolitical tensions made companies rethink the risks of depending too heavily on distant production. At the same time, tensions between the United States and China pushed firms to search for alternatives that were closer, safer, and easier to control.

02 — Why Mexico benefits
Nearshoring means moving production closer to the final consumer market. For U.S. companies, Mexico is almost perfectly positioned. It shares a long border with the United States, has established industrial zones, and is already deeply integrated into North American trade. Under the USMCA, goods that meet regional-content rules can move across the North American market with preferential treatment, making Mexico more attractive than many Asian manufacturing hubs.

The result is a wave of interest in Mexican manufacturing. Northern and central states such as Nuevo León, Coahuila, Chihuahua, Baja California, Querétaro, Guanajuato, and San Luis Potosí have become especially important. These regions already have factories, suppliers, roads, rail links, industrial parks, and workers trained in advanced manufacturing. Monterrey, one of Mexico’s main industrial cities, has become a symbol of this shift.

03 — The sectors behind the boom
The sectors benefiting from nearshoring are not random. They are the sectors where proximity to the U.S. market matters most: automotive production, electric vehicles, batteries, electronics, aerospace components, medical devices, industrial machinery, logistics, and data-related infrastructure. Mexico is not just trying to attract low-value assembly. Its real opportunity is to move deeper into advanced manufacturing.

But there is a paradox. Mexico is benefiting from nearshoring, yet its overall economic growth remains limited. This shows the difference between a nearshoring boom and a full economic transformation. More factories do not automatically mean stronger national development.

04 — The domestic test
To turn nearshoring into a long-term success, Mexico needs reliable electricity, enough water for industrial parks, faster customs procedures, safer transport corridors, better infrastructure, and stronger legal certainty.

Electricity is one of the biggest issues. Modern factories need stable and affordable power. Water is another constraint, especially in northern states that are attractive to investors but already face water stress. Security also matters: if trucks, workers, or industrial parks are exposed to organized crime, companies become more cautious. And legal uncertainty can delay investment, especially when firms fear sudden regulatory changes or unpredictable tax enforcement.

05 — The WorldPulse lens
This is why Mexico’s boom is both real and fragile. The country has the geography, trade access, and manufacturing experience to become a central industrial hub of North America. But the next phase depends less on attracting attention and more on execution.

Can Mexico build enough infrastructure? Can it provide clean and reliable energy? Can it include smaller Mexican firms in global value chains? Can it spread the benefits beyond a few wealthy industrial regions?

If it succeeds, nearshoring could become one of the most important development opportunities in modern Mexican history. If it fails, Mexico may gain factories without solving its deeper productivity, inequality, and infrastructure problems.

WorldPulse lens: Mexico’s nearshoring boom is a race between global opportunity and domestic capacity.`,
  deep: `01 — The global reorganization behind the boom
Mexico’s nearshoring boom is one of the most important economic shifts in the Americas because it sits at the intersection of three major global transformations: the reorganization of supply chains, the rivalry between the United States and China, and the search for more resilient regional production networks.

For much of the late 20th and early 21st century, globalization was built around efficiency. Companies tried to minimize production costs, even if that meant producing goods thousands of kilometers away from final consumers. China became the dominant manufacturing hub because it offered scale, infrastructure, cheap labor, supplier networks, and strong export capacity.

But that system had a weakness: it was efficient in normal times, yet fragile in crisis. The COVID-19 pandemic revealed this fragility. A factory shutdown in one country could delay production across the world. A port bottleneck could slow the delivery of thousands of containers. A shortage of semiconductors could paralyze car production in North America and Europe. Companies realized that the cheapest supply chain was not always the safest one.

Then geopolitics reinforced the shift. Trade tensions between Washington and Beijing made dependence on China more risky. Tariffs, export controls, technology restrictions, and security concerns encouraged firms to diversify production. This gave rise to nearshoring, friendshoring, and regionalization. Mexico benefits from all three.

02 — Why Mexico is so attractive
For the United States, Mexico is geographically close, commercially integrated, and industrially experienced. It is not a distant supplier across the Pacific. It is a neighboring economy connected by trucks, trains, pipelines, border crossings, industrial parks, and decades of manufacturing integration.

Mexico has four major strengths in the nearshoring race. The first is geography. A product made in northern Mexico can reach the United States much faster than a product shipped from East Asia. This reduces transport times, lowers inventory risks, and gives companies more flexibility. In industries where timing matters, proximity becomes a competitive advantage.

The second is trade access. Mexico is part of the USMCA, alongside the United States and Canada. This gives Mexico privileged access to the North American market, provided goods comply with rules of origin. For firms trying to avoid tariff uncertainty and reduce exposure to China, producing inside the USMCA zone can be highly attractive.

The third is industrial depth. Mexico is not starting from zero. It already has strong manufacturing clusters in cars, auto parts, aerospace, electronics, appliances, machinery, and medical devices. This matters because companies do not only need land and workers. They need suppliers, technicians, logistics providers, customs brokers, engineers, warehouses, and industrial services.

The fourth is labor and cost competitiveness. Mexico offers lower labor costs than the United States while being much closer than Asia. For many firms, this makes Mexico a compromise between cost efficiency and supply-chain resilience.

03 — The industrial geography of the boom
The nearshoring boom is not evenly spread across Mexico. Northern Mexico benefits the most because it is closest to the U.S. market. States like Nuevo León, Coahuila, Chihuahua, Baja California, Sonora, and Tamaulipas are central to cross-border manufacturing. They are connected to U.S. supply chains and have long experience in export-oriented production.

Nuevo León is especially important. Its capital, Monterrey, is one of Latin America’s strongest industrial cities. It has infrastructure, universities, suppliers, business networks, and proximity to Texas. This explains why many investors see it as a natural nearshoring hub.

Central states also matter. Querétaro, Guanajuato, San Luis Potosí, Aguascalientes, and the State of Mexico have strong manufacturing ecosystems, especially in automotive and aerospace industries. Querétaro, for example, has become known for aerospace and high-value manufacturing.

But this geography creates a major challenge. If nearshoring mainly benefits northern and central industrial zones, it could deepen regional inequality. Southern Mexico may remain disconnected from the boom unless infrastructure, education, and industrial policy are used to spread investment more widely.

04 — From assembly to upgrading
The most basic version of nearshoring would make Mexico an assembly platform. Companies would import parts, assemble them in Mexico, and export the final goods to the United States. That would create jobs and exports, but the long-term impact would be limited if Mexico remained dependent on foreign technology, foreign suppliers, and low-value manufacturing tasks.

The more ambitious version is different. In this stronger scenario, Mexico uses nearshoring to upgrade its economy. That means building deeper domestic supplier networks, training more engineers and technicians, improving logistics, investing in clean energy, and helping Mexican firms enter global value chains.

This point is crucial. Nearshoring is not only about foreign companies arriving. It is about whether Mexican firms can participate in the production networks that arrive with them. If local suppliers provide parts, services, software, packaging, transport, maintenance, engineering, and logistics, then the benefits multiply. If not, Mexico risks becoming a place where foreign companies operate without deeply transforming the domestic economy.

The difference is productivity. Mexico has long struggled with weak productivity growth. Many workers remain in informal or low-productivity activities. Nearshoring could help change this if it expands formal employment, raises technical skills, and spreads advanced manufacturing practices. But that requires policy coordination, education, infrastructure, and business development.

05 — Infrastructure is the bottleneck
Factories do not operate in isolation. They need electricity, water, roads, railways, ports, customs systems, digital networks, and safe transport corridors. This is where Mexico’s nearshoring boom becomes more fragile.

Electricity is one of the main constraints. Modern manufacturing requires stable power, especially in sectors such as electronics, electric vehicles, medical devices, and data infrastructure. If industrial zones cannot guarantee reliable electricity, investment slows or moves elsewhere.

Water is another major issue. Many of the regions most attractive to nearshoring are also regions facing water stress. Northern Mexico, especially, must balance industrial expansion with urban demand, agriculture, and climate pressure. This could become a serious long-term constraint.

Transport infrastructure is also decisive. Nearshoring increases pressure on highways, railways, border crossings, ports, and customs systems. If trucks spend too long at the border, proximity loses some of its value. If ports and roads are congested, companies cannot fully benefit from Mexico’s geography.

Digital connectivity matters too. Advanced manufacturing increasingly depends on data, automation, sensors, cloud systems, and real-time supply-chain coordination. Mexico’s challenge is not only to attract factories. It must build the systems that allow factories to operate efficiently.

06 — Political and trade-policy risk
Nearshoring depends on confidence. A company that builds a factory is not making a short-term decision. It is committing capital for years. It needs predictable taxes, stable regulation, reliable contracts, secure property rights, and confidence in the courts.

This is why rule of law matters so much. If investors fear arbitrary enforcement, corruption, insecurity, or sudden policy reversals, they may delay or reduce investment. This does not mean companies will leave Mexico. The country’s advantages are too strong. But it does mean that Mexico may receive less investment than it could have received under clearer and more predictable conditions.

The USMCA review cycle is another major uncertainty. Mexico’s nearshoring boom is strongly linked to access to the U.S. market. If U.S. trade policy becomes more protectionist, or if rules of origin become stricter, some companies could rethink their plans.

This is the paradox of Mexico’s position. Its closeness to the United States is its greatest advantage. But dependence on the U.S. market also exposes Mexico to U.S. political cycles, tariff threats, and trade negotiations.

07 — Why the boom has not automatically produced spectacular growth
One of the most interesting parts of Mexico’s nearshoring story is that the boom has not automatically produced spectacular GDP growth. Foreign investment and manufacturing interest are rising, but national growth remains constrained by infrastructure, informality, regional inequality, weak productivity, and policy uncertainty.

This matters because it shows that nearshoring is not magic. A country can attract investment and still struggle with low productivity, informal employment, regional inequality, weak infrastructure, and policy uncertainty. Nearshoring creates an opening, not a guarantee.

The real question is whether Mexico can convert investment into broader development. That means moving from more exports to better capabilities. It means not only producing more cars or electronics, but also increasing local technological content, improving worker training, strengthening domestic suppliers, and building infrastructure that benefits the whole economy.

08 — The North American angle
Nearshoring is also reshaping North America itself. For the United States, Mexico offers a way to reduce dependence on China without bringing all production back home. Full reshoring to the U.S. can be expensive and difficult because of higher labor costs and capacity constraints. Mexico provides a middle path: production remains close to the U.S. market but at lower cost.

For Mexico, this creates leverage. The country becomes more important to U.S. supply-chain security, especially in strategic sectors such as cars, batteries, electronics, machinery, medical devices, and possibly energy-related manufacturing.

For Canada, the USMCA framework means North American production can become more integrated as a regional bloc. The result is not the end of globalization, but a more regional form of globalization.

09 — The environmental challenge
Nearshoring also has a climate dimension. On one hand, producing closer to the U.S. market can reduce some transport-related emissions. Shorter supply chains may be less carbon-intensive than shipping goods across oceans.

On the other hand, industrial expansion increases demand for electricity, water, land, and transport. If Mexico powers new factories with fossil fuels or expands industrial parks without sustainable planning, the environmental costs could rise.

This is why clean energy matters. Many multinational companies have their own climate targets. They increasingly want renewable electricity for their factories. If Mexico cannot provide enough clean and reliable energy, it may lose some investment to countries with greener industrial systems.

10 — The possible futures
Mexico’s nearshoring boom could lead to three different futures. The first is the limited boom scenario. Mexico attracts factories, exports rise, and industrial real estate expands, but the benefits remain concentrated in a few regions. Local suppliers remain weak, productivity improves only slightly, and infrastructure bottlenecks limit the impact.

The second is the fragile boom scenario. Mexico attracts attention, but investment is slowed by electricity shortages, water stress, insecurity, legal uncertainty, and U.S. trade tensions. Companies still use Mexico, but the country fails to capture the full opportunity.

The third is the development breakthrough scenario. Mexico uses nearshoring to upgrade infrastructure, expand clean energy, train skilled workers, integrate small and medium-sized firms, strengthen rule of law, and move into higher-value manufacturing. In this version, nearshoring becomes not just a trade story but a national development strategy.

Mexico already has the geography. It already has the trade agreement. It already has the industrial base. What it needs now is the domestic capacity to turn a global opening into long-term economic transformation.

WorldPulse lens: Mexico’s nearshoring boom is not simply about companies leaving China. It is about whether Mexico can turn a geopolitical advantage into a deeper industrial future.`
};


const customStoryProfiles = {
  "singapore-rich": {
    "place": "Singapore",
    "topic": "Singapore’s rise from vulnerable port city to one of the world’s richest economies",
    "start": "independence left Singapore small, resource-poor and exposed, with little domestic market and almost no natural resources",
    "mechanism": "state capacity, port logistics, strict urban planning, education, housing policy and a relentless focus on becoming useful to global capital",
    "actors": "Lee Kuan Yew’s government, multinational firms, port operators, banks, public housing agencies and a highly trained workforce",
    "bottlenecks": "land scarcity, dependence on global trade, inequality pressures, housing affordability and the risk of being bypassed by new Asian hubs",
    "watch": "port competitiveness, financial regulation, migration policy, housing costs, regional trade tensions and the city’s ability to stay trusted",
    "stakes": "Singapore shows how geography becomes wealth only when institutions turn a constraint into a platform."
  },
  "pix-brazil": {
    "place": "Brazil",
    "topic": "Brazil’s Pix instant payment revolution",
    "start": "Brazil entered the 2020s with expensive banking services, millions of underbanked people and a payment system that often moved slowly",
    "mechanism": "a central-bank-designed instant payment network made transfers free or cheap, available 24/7 and simple enough to use through QR codes and phone apps",
    "actors": "the Central Bank of Brazil, banks, fintechs, retailers, informal workers, small businesses and millions of households",
    "bottlenecks": "fraud, cybersecurity, bank profitability, digital exclusion and the need to preserve trust in a public payment rail",
    "watch": "fraud rules, merchant adoption, credit products built on Pix, competition between banks and fintechs, and whether Pix expands into cross-border payments",
    "stakes": "Pix shows that financial infrastructure can change daily economic behavior faster than almost any traditional reform."
  },
  "argentina-currency": {
    "place": "Argentina",
    "topic": "Argentina’s recurring currency crises",
    "start": "Argentina has repeatedly faced inflation, debt stress and shortages of dollars despite having land, food exports, minerals and human capital",
    "mechanism": "weak confidence in the peso pushes households, firms and investors toward dollars, while fiscal deficits and external debt make stabilization difficult",
    "actors": "the central bank, finance ministry, exporters, the IMF, households saving in dollars and firms needing imported inputs",
    "bottlenecks": "inflation expectations, capital controls, fiscal credibility, low reserves, political polarization and dependence on commodity cycles",
    "watch": "central-bank reserves, exchange-rate gaps, inflation, IMF negotiations, fiscal adjustment and whether households start trusting the peso again",
    "stakes": "Argentina shows how a currency can become the central battlefield of an entire economy."
  },
  "ports-matter": {
    "place": "Global",
    "topic": "the hidden power of ports and maritime chokepoints",
    "start": "most physical trade still moves by sea, so globalisation depends on a small number of ports, canals and narrow passages",
    "mechanism": "ports combine cranes, customs, insurance, storage, finance, shipping schedules and inland transport into one logistical machine",
    "actors": "port authorities, shipping lines, customs agencies, insurers, exporters, importers and governments controlling canals or straits",
    "bottlenecks": "congestion, strikes, drought, cyberattacks, war risk, shipping insurance, canal limits and weak inland connections",
    "watch": "Suez, Panama, Malacca, Hormuz, Bab el-Mandeb, container rates, port automation and rerouting around chokepoints",
    "stakes": "Ports matter because they turn geography into prices, shortages, delays and strategic leverage."
  },
  "gulf-oil": {
    "place": "the Gulf",
    "topic": "the transformation of Gulf economies through oil",
    "start": "small desert monarchies became energy powers once oil and gas rents began flowing into state budgets",
    "mechanism": "hydrocarbon exports financed infrastructure, sovereign wealth funds, welfare systems, migrant labor models and regional influence",
    "actors": "national oil companies, ruling families, sovereign wealth funds, migrant workers, global energy firms and Asian energy buyers",
    "bottlenecks": "oil dependence, climate transition, private-sector productivity, youth employment, water scarcity and the limits of state-led megaprojects",
    "watch": "oil prices, OPEC strategy, sovereign wealth investments, renewable projects, tourism plans and progress in non-oil employment",
    "stakes": "The Gulf shows how resource wealth can buy time, but not automatically build a post-oil economy."
  },
  "africa-complex": {
    "place": "Africa",
    "topic": "the complexity of African economies beyond the usual stereotypes",
    "start": "Africa is often described as one single economic story even though it contains 54 countries with very different resources, institutions and growth paths",
    "mechanism": "development outcomes depend on infrastructure, demographics, commodity exposure, regional integration, governance, urbanization and access to finance",
    "actors": "national governments, regional blocs, farmers, miners, mobile-money firms, foreign investors, young workers and diaspora networks",
    "bottlenecks": "debt pressure, weak grids, logistics costs, conflict, climate exposure, commodity dependence and limited industrial depth",
    "watch": "AfCFTA integration, power investment, debt restructuring, urban growth, fintech adoption, food systems and industrial corridors",
    "stakes": "Africa’s economies matter because they combine the world’s youngest population with some of its biggest infrastructure and productivity gaps."
  },
  "belt-road": {
    "place": "China and Eurasia",
    "topic": "China’s Belt and Road Initiative",
    "start": "China used its excess construction capacity, foreign-exchange reserves and global ambitions to finance infrastructure abroad",
    "mechanism": "loans, ports, railways, roads, energy projects and digital infrastructure create trade links but also political and financial dependencies",
    "actors": "Chinese policy banks, state firms, host governments, port operators, construction companies and rival powers worried about influence",
    "bottlenecks": "debt sustainability, project quality, corruption, local backlash, strategic suspicion and the difficulty of turning infrastructure into productive growth",
    "watch": "debt renegotiations, port concessions, rail usage, EU and US alternatives, Chinese lending patterns and host-country politics",
    "stakes": "The Belt and Road shows how infrastructure can become diplomacy, finance and geopolitical leverage at the same time."
  },
  "germany-industry": {
    "place": "Germany",
    "topic": "Germany’s industrial model under pressure",
    "start": "Germany built prosperity on export manufacturing, cheap energy, skilled labor, strong Mittelstand firms and deep links to global markets",
    "mechanism": "high-value manufacturing, vocational training, engineering quality and integration with European supply chains made Germany an industrial powerhouse",
    "actors": "automakers, machinery firms, unions, Mittelstand suppliers, the German state, EU regulators and Chinese demand",
    "bottlenecks": "energy costs, slow digitalization, aging workers, China competition, EV transition and weaker global demand for traditional machinery",
    "watch": "electric-vehicle production, energy prices, factory investment, China exposure, labor shortages and industrial-policy debates in Berlin and Brussels",
    "stakes": "Germany’s puzzle matters because Europe’s economic strength depends heavily on whether its industrial core can adapt."
  },
  "south-china-sea": {
    "place": "South China Sea",
    "topic": "the South China Sea as a global chokepoint",
    "start": "a large share of world trade passes through waters where sovereignty claims, naval power and energy interests overlap",
    "mechanism": "shipping lanes, fisheries, undersea resources, military bases and legal claims turn a sea into a strategic pressure point",
    "actors": "China, ASEAN states, the United States, shipping firms, coast guards, navies, fishers and energy companies",
    "bottlenecks": "militarization, accidents, legal disputes, insurance costs, escalation risk and the difficulty of enforcing maritime rules",
    "watch": "naval incidents, artificial-island activity, ASEAN diplomacy, US patrols, energy exploration and shipping insurance reactions",
    "stakes": "The South China Sea matters because one local confrontation could disturb trade across the entire world economy."
  },
  "semiconductors": {
    "place": "Global",
    "topic": "semiconductors as the infrastructure of modern power",
    "start": "chips became essential for cars, phones, data centers, weapons, AI systems and almost every advanced industrial process",
    "mechanism": "extreme specialization concentrates design, fabrication, lithography, materials and packaging across a small number of firms and regions",
    "actors": "TSMC, ASML, Nvidia, Samsung, Intel, governments, cloud firms, carmakers and defense planners",
    "bottlenecks": "Taiwan risk, export controls, fab costs, lithography dependence, skilled labor shortages and energy-intensive production",
    "watch": "new fabs in the US, Japan and Europe, Taiwan tensions, AI chip demand, export controls and packaging capacity",
    "stakes": "Semiconductors matter because the digital economy depends on factories that are expensive, concentrated and geopolitically exposed."
  },
  "future-energy": {
    "place": "Global",
    "topic": "the future of global energy",
    "start": "the world is adding renewables quickly while still depending heavily on oil, gas and coal for transport, heating, industry and power",
    "mechanism": "energy transitions require grids, storage, critical minerals, industrial policy, finance and political acceptance, not only solar panels and wind turbines",
    "actors": "oil producers, utilities, grid operators, mining companies, households, climate policymakers and heavy industry",
    "bottlenecks": "grid delays, storage limits, fossil-fuel dependence, permitting fights, mineral concentration and unequal access to cheap capital",
    "watch": "electricity demand, battery costs, grid investment, oil demand, LNG markets, nuclear debates and critical-mineral supply chains",
    "stakes": "Energy is the base layer of every economy, so the transition is also an industrial and geopolitical transformation."
  },
  "supply-chains": {
    "place": "Global",
    "topic": "the reshaping of global supply chains",
    "start": "companies once optimized mainly for cost, but pandemics, wars and trade tensions revealed the fragility of very long production networks",
    "mechanism": "firms diversify suppliers, move production closer to consumers and separate sensitive technologies from risky geopolitical zones",
    "actors": "multinationals, logistics firms, customs agencies, governments, industrial parks and workers in manufacturing hubs",
    "bottlenecks": "higher costs, duplicated capacity, supplier shortages, tariff uncertainty, transport chokepoints and the difficulty of replacing China’s scale",
    "watch": "nearshoring to Mexico, China+1 strategies in Vietnam and India, freight rates, export controls and inventory policies",
    "stakes": "Supply-chain redesign matters because it changes where jobs, factories, leverage and vulnerabilities are located."
  },
  "demographic-decline": {
    "place": "Japan and Europe",
    "topic": "demographic decline and aging societies",
    "start": "many rich economies are moving from population growth to stagnation or decline, with a rising share of elderly citizens",
    "mechanism": "fewer workers support more retirees, changing savings, pensions, healthcare costs, housing demand and growth potential",
    "actors": "families, employers, pension systems, healthcare providers, migrants, automation firms and governments trying to raise fertility",
    "bottlenecks": "low birth rates, political resistance to immigration, pension strain, labor shortages and unequal regional decline",
    "watch": "fertility rates, migration rules, retirement ages, productivity growth, automation and the fiscal cost of healthcare and pensions",
    "stakes": "Demographic decline matters because it quietly rewrites the economic contract between generations."
  },
  "india-rise": {
    "place": "India",
    "topic": "India’s economic rise",
    "start": "India combines enormous population scale with rapid digitalization, urbanization and a growing role in services and manufacturing",
    "mechanism": "domestic demand, IT services, public digital infrastructure, manufacturing incentives and geopolitics make India a central growth story",
    "actors": "the Indian state, entrepreneurs, software firms, manufacturers, farmers, young workers and foreign investors seeking alternatives to China",
    "bottlenecks": "jobs, education quality, infrastructure gaps, rural inequality, pollution, female labor-force participation and bureaucratic friction",
    "watch": "manufacturing exports, infrastructure spending, digital public goods, labor-market data, state-level competition and foreign investment flows",
    "stakes": "India’s rise matters because its growth path will shape global demand, supply chains and the balance of Asian power."
  },
  "rare-earth": {
    "place": "Global",
    "topic": "the rare earth and critical minerals race",
    "start": "clean energy, defense systems and electronics depend on minerals that are difficult to mine, process and refine at scale",
    "mechanism": "control over mining, refining and magnet production gives countries leverage over batteries, wind turbines, chips and weapons systems",
    "actors": "China, mining countries, automakers, defense firms, battery producers, environmental regulators and industrial-policy agencies",
    "bottlenecks": "Chinese refining dominance, environmental damage, long permitting times, community opposition and price volatility",
    "watch": "new mines, refining capacity outside China, export restrictions, recycling, stockpiles and partnerships with mineral-rich countries",
    "stakes": "Critical minerals matter because the energy transition can create new dependencies even as it reduces old ones."
  },
  "dollar-system": {
    "place": "Global",
    "topic": "the global dollar system",
    "start": "the US dollar became the main currency for trade, finance, reserves and crisis liquidity after decades of American financial dominance",
    "mechanism": "dollar invoicing, US Treasury markets, global banking, swap lines and reserve holdings reinforce one another",
    "actors": "the Federal Reserve, US Treasury, central banks, global banks, commodity traders, borrowers and countries exposed to dollar debt",
    "bottlenecks": "US interest rates, sanctions, debt burdens in emerging markets, reserve diversification and the shortage of safe alternatives",
    "watch": "Treasury-market stress, Fed policy, dollar debt, sanctions use, BRICS currency debates and central-bank reserve choices",
    "stakes": "The dollar system matters because one country’s currency quietly structures the financial options of the entire world."
  },
  "arctic-frontier": {
    "place": "Arctic",
    "topic": "the Arctic as a new economic and strategic frontier",
    "start": "melting ice is making Arctic resources and shipping routes more accessible, even as the region remains harsh and fragile",
    "mechanism": "climate change opens navigation windows, resource extraction possibilities and military access across a previously frozen frontier",
    "actors": "Russia, Nordic states, Canada, the United States, China, shipping firms, energy companies and Indigenous communities",
    "bottlenecks": "extreme weather, weak infrastructure, environmental damage, military tension, insurance costs and uncertain commercial viability",
    "watch": "Northern Sea Route traffic, Russian infrastructure, NATO posture, Chinese polar investment and Arctic environmental regulation",
    "stakes": "The Arctic matters because climate change is turning geography itself into a new arena of competition."
  },
  "africa-fintech": {
    "place": "Africa",
    "topic": "Africa’s fintech leapfrog",
    "start": "many African economies had limited branch banking but widespread mobile-phone adoption, creating space for mobile-first finance",
    "mechanism": "mobile money, agent networks, digital wallets and fintech platforms let people store, send and receive money without traditional banks",
    "actors": "M-Pesa, telecom firms, central banks, startups, merchants, informal workers and households receiving remittances",
    "bottlenecks": "regulation, fraud, interoperability, data costs, low incomes, electricity access and the challenge of turning payments into productive credit",
    "watch": "mobile-money rules, cross-border payments, fintech funding, credit scoring, merchant adoption and digital identity systems",
    "stakes": "Africa’s fintech leapfrog shows how missing infrastructure can sometimes push economies toward newer systems faster."
  },
  "taiwan-strait": {
    "place": "Taiwan Strait",
    "topic": "the Taiwan Strait as a technological and maritime pressure point",
    "start": "a narrow sea lane separates Taiwan from mainland China while carrying trade and sitting next to the world’s most important chip cluster",
    "mechanism": "semiconductor dependence, shipping routes and military deterrence link a local security risk to global production",
    "actors": "Taiwan, China, the United States, TSMC, shipping firms, insurers, chip buyers and regional allies",
    "bottlenecks": "military escalation, blockade risk, export controls, insurance shocks, undersea cables and dependence on advanced fabs in Taiwan",
    "watch": "Chinese military exercises, US policy signals, TSMC investment abroad, chip inventories and shipping rerouting scenarios",
    "stakes": "The Taiwan Strait matters because disruption there would hit technology, trade and security at the same time."
  },
  "saudi-vision": {
    "place": "Saudi Arabia",
    "topic": "Saudi Vision 2030",
    "start": "Saudi Arabia wants to reduce reliance on oil rents before the global energy transition weakens the old economic model",
    "mechanism": "sovereign wealth, tourism, entertainment, mining, logistics, privatization and megaprojects are used to build a post-oil identity",
    "actors": "the Saudi state, Public Investment Fund, foreign investors, young Saudis, migrant workers, oil companies and tourism developers",
    "bottlenecks": "private-sector productivity, fiscal dependence on oil, project execution, social change, water scarcity and global investor confidence",
    "watch": "PIF spending, non-oil growth, tourism numbers, NEOM progress, oil prices, job creation and fiscal balances",
    "stakes": "Vision 2030 matters because it tests whether oil wealth can be converted into a diversified economy before it loses value."
  },
  "green-deal": {
    "place": "Europe",
    "topic": "Europe’s Green Deal industrial gamble",
    "start": "Europe is trying to decarbonize while preserving industry, energy security and social support for climate policy",
    "mechanism": "carbon pricing, regulation, subsidies, renewable power, grids and industrial standards push firms toward cleaner production",
    "actors": "the European Commission, member states, utilities, automakers, heavy industry, households and green technology firms",
    "bottlenecks": "high energy prices, slow permitting, political backlash, Chinese competition, grid congestion and uneven costs across countries",
    "watch": "carbon-border rules, electric-vehicle policy, heat pumps, renewable permitting, industrial subsidies and voter reactions",
    "stakes": "The Green Deal matters because Europe is trying to make climate policy into industrial strategy rather than decline."
  },
  "russia-war-economy": {
    "place": "Russia",
    "topic": "Russia’s war economy under sanctions",
    "start": "Russia’s invasion of Ukraine triggered sanctions, military mobilization and a shift of resources toward defense production",
    "mechanism": "energy exports, state spending, import substitution, shadow trade and military contracts keep activity going while distorting the economy",
    "actors": "the Kremlin, defense firms, oil and gas companies, sanctioned banks, China, India, workers and households facing inflation",
    "bottlenecks": "technology access, labor shortages, inflation, fiscal dependence on energy revenue, sanctions enforcement and long-term productivity loss",
    "watch": "oil revenue, budget deficits, defense spending, ruble pressure, China trade, inflation and skilled-labor shortages",
    "stakes": "Russia’s war economy matters because it shows how an economy can adapt to sanctions while becoming more militarized and less balanced."
  },
  "japan-debt": {
    "place": "Japan",
    "topic": "Japan’s debt paradox",
    "start": "Japan has one of the world’s highest public-debt ratios but has avoided the kind of market panic seen in many other countries",
    "mechanism": "domestic savings, central-bank bond purchases, low inflation history and yen credibility allow the state to borrow heavily",
    "actors": "the Ministry of Finance, Bank of Japan, pension funds, households, banks and investors watching interest-rate normalization",
    "bottlenecks": "aging, weak growth, rising interest costs, yen depreciation and the challenge of exiting ultra-low rates without destabilizing debt markets",
    "watch": "BOJ policy, bond yields, yen moves, inflation expectations, pension pressure and fiscal-reform debates",
    "stakes": "Japan’s debt paradox matters because it shows that debt sustainability depends on institutions, currency credibility and who holds the debt."
  },
  "chaebols-korea": {
    "place": "South Korea",
    "topic": "South Korea’s chaebol-led industrial rise",
    "start": "South Korea used large family-controlled conglomerates to accelerate industrialization after war and poverty",
    "mechanism": "state-directed credit, export targets, technology learning and scale allowed chaebols to compete globally in ships, cars, electronics and chips",
    "actors": "Samsung, Hyundai, LG, SK, the Korean state, workers, banks, suppliers and households affected by concentrated corporate power",
    "bottlenecks": "corporate concentration, succession issues, inequality, labor pressure, innovation dependence and vulnerability to global electronics cycles",
    "watch": "chip investment, corporate governance reforms, export demand, youth employment, labor disputes and competition with China and Taiwan",
    "stakes": "Chaebols matter because they show how concentrated corporate power can create rapid catch-up and long-term vulnerabilities."
  },
  "lithium-triangle": {
    "place": "Argentina, Chile and Bolivia",
    "topic": "the Lithium Triangle",
    "start": "South America’s salt flats contain huge lithium resources just as batteries become central to electric vehicles and grids",
    "mechanism": "brine extraction, refining, battery demand and state policy determine whether mineral wealth becomes industrial upgrading or raw exports",
    "actors": "mining companies, local communities, national governments, Chinese and Western investors, automakers and battery firms",
    "bottlenecks": "water use, environmental conflict, processing capacity, regulatory uncertainty, infrastructure and competition from other battery chemistries",
    "watch": "lithium prices, extraction rules, community resistance, processing plants, EV demand and whether countries capture more value locally",
    "stakes": "The Lithium Triangle matters because the energy transition is creating a new map of resource power."
  },
  "ai-geography": {
    "place": "Global",
    "topic": "the new geography of AI compute",
    "start": "AI seems digital, but it depends on physical data centers, chips, electricity, cooling systems and fiber connections",
    "mechanism": "compute clusters concentrate where power, land, water, regulation, chips and cloud customers can be combined at scale",
    "actors": "cloud providers, chipmakers, utilities, governments, data-center developers, grid operators and local communities",
    "bottlenecks": "electricity demand, water use, chip shortages, permitting, grid delays, security concerns and concentration in a few cloud platforms",
    "watch": "data-center locations, power-purchase agreements, AI chip supply, nuclear and renewable deals, water politics and export controls",
    "stakes": "AI geography matters because the future of software is being shaped by very physical constraints."
  },
  "water-crunch": {
    "place": "Global",
    "topic": "the global water crunch",
    "start": "water scarcity is becoming an economic constraint for cities, farms, factories, mines and energy systems",
    "mechanism": "drought, overuse, pollution, weak pricing and climate change turn water into a limit on growth and political stability",
    "actors": "farmers, utilities, mining companies, households, city governments, food exporters and countries sharing river basins",
    "bottlenecks": "aging pipes, groundwater depletion, inefficient irrigation, weak governance, conflict over rivers and the political difficulty of pricing water",
    "watch": "reservoir levels, groundwater rules, desalination, drought insurance, food prices, industrial water permits and cross-border river disputes",
    "stakes": "Water matters because every economy needs it, but many treat it as unlimited until shortages expose the real cost."
  },
  "panama-drought": {
    "place": "Panama",
    "topic": "drought pressure on the Panama Canal",
    "start": "the Panama Canal is a shortcut between oceans, but its lock system depends on freshwater and rainfall",
    "mechanism": "low water levels force limits on ship drafts or daily crossings, turning drought into a global logistics problem",
    "actors": "the Panama Canal Authority, shipping firms, exporters, importers, insurers, US and Asian supply chains and local water users",
    "bottlenecks": "climate variability, freshwater demand, canal capacity, waiting times, rerouting costs and competition between human and commercial water needs",
    "watch": "Gatun Lake levels, transit restrictions, shipping premiums, El Niño patterns, canal expansion plans and alternative routes",
    "stakes": "The Panama Canal story shows how climate stress can hit global trade through one narrow infrastructure system."
  },
  "red-sea-shock": {
    "place": "Red Sea",
    "topic": "Red Sea disruptions and global trade",
    "start": "the Red Sea links the Indian Ocean to Suez, making it a core route for Asia-Europe commerce",
    "mechanism": "security attacks raise insurance costs and push ships around Africa, adding time, fuel costs and uncertainty",
    "actors": "shipping lines, navies, insurers, exporters, importers, Egypt, Gulf states and European manufacturers",
    "bottlenecks": "military escalation, insurance premiums, longer routes, port congestion, fuel prices and dependence on the Suez corridor",
    "watch": "Bab el-Mandeb security, naval missions, freight rates, Suez revenues, rerouting around the Cape and delivery delays",
    "stakes": "The Red Sea matters because one security shock can redraw shipping routes and transmit costs into factories and shops."
  },
  "nigeria-oil": {
    "place": "Nigeria",
    "topic": "Nigeria’s oil paradox",
    "start": "Nigeria has large oil reserves but has struggled to turn them into stable public finances and broad development",
    "mechanism": "oil exports generate foreign currency, but theft, subsidies, weak refining, corruption and price swings reduce the benefits",
    "actors": "the Nigerian state, NNPC, oil majors, local communities, smugglers, households, banks and foreign buyers",
    "bottlenecks": "oil theft, refinery constraints, FX shortages, subsidy politics, regional insecurity and dependence on crude exports",
    "watch": "oil production, naira pressure, refinery output, subsidy reforms, government revenue and security in the Niger Delta",
    "stakes": "Nigeria’s oil paradox shows that resource wealth is not development unless institutions can capture and use it well."
  },
  "kenya-mobile-money": {
    "place": "Kenya",
    "topic": "Kenya’s mobile-money leap",
    "start": "Kenya expanded financial access through mobile phones before traditional banking reached much of the population",
    "mechanism": "agent networks and phone-based wallets allowed households and businesses to send, save and receive money cheaply",
    "actors": "M-Pesa, Safaricom, the central bank, merchants, farmers, urban workers, families receiving transfers and fintech startups",
    "bottlenecks": "market concentration, transaction fees, fraud, digital exclusion, credit risk and dependence on telecom infrastructure",
    "watch": "interoperability rules, mobile-loan regulation, merchant payments, cross-border transfers and competition from new fintechs",
    "stakes": "Kenya shows how payments infrastructure can become a development tool when it solves a daily problem at scale."
  },
  "morocco-industrial": {
    "place": "Morocco",
    "topic": "Morocco’s industrial bet",
    "start": "Morocco used proximity to Europe, ports and targeted industrial policy to move beyond agriculture and tourism",
    "mechanism": "Tanger Med, automotive clusters, aerospace suppliers, renewables and trade links with Europe created an export platform",
    "actors": "the Moroccan state, Renault, Stellantis, port authorities, EU buyers, renewable-energy firms and local suppliers",
    "bottlenecks": "water stress, skills, energy costs, regional inequality, dependence on European demand and the need to deepen local value chains",
    "watch": "car exports, battery investment, Tanger Med capacity, renewable power, drought and supplier development",
    "stakes": "Morocco matters because it shows how a North African economy can use geography and infrastructure to enter industrial value chains."
  },
  "egypt-suez-fx": {
    "place": "Egypt",
    "topic": "Egypt’s Suez revenues and dollar shortage",
    "start": "Egypt earns foreign currency from the Suez Canal, tourism, gas and remittances, yet still faces recurring dollar shortages",
    "mechanism": "large import needs, debt payments and confidence problems can overwhelm foreign-currency inflows, putting pressure on the pound",
    "actors": "the Egyptian state, central bank, canal authority, tourists, Gulf investors, IMF, households and import-dependent firms",
    "bottlenecks": "food imports, external debt, currency credibility, state-led megaprojects, Red Sea disruptions and inflation",
    "watch": "Suez revenues, tourism receipts, pound movements, IMF reviews, wheat prices, Gulf investment and import restrictions",
    "stakes": "Egypt shows how a strategic canal can be powerful but still not enough to solve a fragile external balance."
  },
  "turkey-inflation": {
    "place": "Turkey",
    "topic": "Turkey’s inflation experiment",
    "start": "Turkey has faced repeated inflation and currency pressure while trying to sustain growth and credit expansion",
    "mechanism": "low-rate policies, weak confidence, external financing needs and exchange-rate depreciation feed into prices and household expectations",
    "actors": "the central bank, presidency, banks, exporters, households, construction firms and foreign investors",
    "bottlenecks": "central-bank credibility, dollarization, import dependence, wage-price pressure and the political cost of tightening",
    "watch": "interest rates, lira movements, inflation expectations, reserves, wage deals and whether investors regain confidence",
    "stakes": "Turkey matters because it shows how monetary credibility becomes a daily issue for households when prices move too fast."
  },
  "indonesia-nickel": {
    "place": "Indonesia",
    "topic": "Indonesia’s nickel strategy",
    "start": "Indonesia holds major nickel resources just as electric-vehicle batteries increase demand for processed minerals",
    "mechanism": "export bans and industrial policy push companies to refine and process nickel domestically instead of exporting raw ore",
    "actors": "the Indonesian state, Chinese investors, battery firms, miners, local communities, automakers and environmental regulators",
    "bottlenecks": "environmental damage, coal-powered smelters, local conflict, price swings and the challenge of moving beyond basic processing",
    "watch": "nickel prices, battery chemistry changes, smelter investment, EV demand, environmental rules and domestic value-added targets",
    "stakes": "Indonesia’s nickel strategy matters because it tries to turn a raw mineral into industrial power."
  },
  "vietnam-china-plus-one": {
    "place": "Vietnam",
    "topic": "Vietnam and the China+1 manufacturing strategy",
    "start": "firms exposed to China risk increasingly use Vietnam as an additional manufacturing base in Asia",
    "mechanism": "low costs, export zones, trade agreements, improving infrastructure and proximity to China allow Vietnam to absorb supply-chain diversification",
    "actors": "multinationals, Vietnamese factories, Korean and Japanese investors, Chinese suppliers, workers and the Vietnamese state",
    "bottlenecks": "power shortages, logistics capacity, skills, land constraints, dependence on imported inputs and exposure to US-China trade rules",
    "watch": "electronics exports, FDI flows, factory wages, grid investment, trade investigations and supplier upgrading",
    "stakes": "Vietnam matters because it shows how smaller economies can gain from geopolitical diversification without fully replacing China."
  },
  "qatar-lng": {
    "place": "Qatar",
    "topic": "Qatar and the LNG age",
    "start": "Qatar turned huge gas reserves into one of the world’s most powerful liquefied natural gas export systems",
    "mechanism": "liquefaction plants, long-term contracts, shipping fleets and sovereign wealth transform a small population into global energy leverage",
    "actors": "QatarEnergy, Asian buyers, European utilities, LNG shippers, sovereign wealth funds and governments seeking energy security",
    "bottlenecks": "energy-transition risk, competition from US LNG, shipping chokepoints, regional politics and dependence on gas demand",
    "watch": "North Field expansion, LNG contract prices, Asian demand, European energy security, fleet capacity and methane rules",
    "stakes": "Qatar’s LNG model matters because gas can make a small state central to the energy security of much larger economies."
  },
  "uae-logistics": {
    "place": "United Arab Emirates",
    "topic": "the UAE logistics model",
    "start": "the UAE used location between Asia, Africa and Europe to build a platform economy around ports, airlines and free zones",
    "mechanism": "Jebel Ali, Emirates, Dubai airports, free zones, finance and real estate connect trade, tourism, capital and services",
    "actors": "Dubai and Abu Dhabi authorities, DP World, airlines, logistics firms, migrant workers, investors and regional traders",
    "bottlenecks": "regional competition, real-estate cycles, labor-model criticism, water and energy demand, and dependence on global flows",
    "watch": "port expansion, airline traffic, free-zone rules, India-Africa trade, financial regulation and Gulf competition",
    "stakes": "The UAE matters because it shows how a small domestic market can become large by becoming a connector."
  },
  "swiss-safe-haven": {
    "place": "Switzerland",
    "topic": "Switzerland’s safe-haven status",
    "start": "Switzerland built a reputation for stability, strong institutions, finance and currency credibility",
    "mechanism": "political neutrality, low inflation, strong banks, legal trust and the Swiss franc attract capital during uncertainty",
    "actors": "the Swiss National Bank, banks, pharmaceutical firms, watchmakers, global investors and regulators",
    "bottlenecks": "strong-currency pressure, banking secrecy reforms, high costs, housing pressure and dependence on global confidence",
    "watch": "franc appreciation, SNB interventions, banking regulation, pharma exports and safe-haven flows during crises",
    "stakes": "Switzerland matters because trust itself can become an economic asset."
  },
  "poland-convergence": {
    "place": "Poland",
    "topic": "Poland’s convergence story",
    "start": "after communism, Poland used EU integration and market reforms to narrow the income gap with Western Europe",
    "mechanism": "foreign investment, manufacturing, EU funds, education and access to European markets supported catch-up growth",
    "actors": "Polish firms, EU institutions, German supply chains, workers, migrants, municipalities and foreign manufacturers",
    "bottlenecks": "labor shortages, demographics, energy transition, rule-of-law disputes and the need to move from cost advantage to innovation",
    "watch": "wages, EU funds, defense spending, energy mix, manufacturing exports and productivity growth",
    "stakes": "Poland matters because it is one of Europe’s clearest examples of post-communist economic convergence."
  },
  "ethiopia-hydro": {
    "place": "Ethiopia",
    "topic": "Ethiopia’s hydropower gamble",
    "start": "Ethiopia invested heavily in dams to use its rivers for electricity, development and regional leverage",
    "mechanism": "large hydropower projects can expand power supply, support industry and create export revenue, but also create diplomatic tensions",
    "actors": "the Ethiopian state, power utility, Sudan, Egypt, local communities, lenders and industrial firms needing electricity",
    "bottlenecks": "debt, drought risk, conflict, grid capacity, regional diplomacy and whether electricity reaches productive users",
    "watch": "GERD negotiations, rainfall, electricity exports, industrial-park demand, grid expansion and debt service",
    "stakes": "Ethiopia’s dams matter because infrastructure can be both a development tool and a geopolitical pressure point."
  },
  "south-africa-power": {
    "place": "South Africa",
    "topic": "South Africa’s power crisis",
    "start": "South Africa’s industrial economy has been constrained by electricity shortages and repeated load-shedding",
    "mechanism": "aging coal plants, weak maintenance, utility debt and slow investment reduce power reliability, hurting factories, mines and households",
    "actors": "Eskom, the government, miners, manufacturers, households, renewable developers and municipalities",
    "bottlenecks": "grid capacity, coal dependence, corruption legacies, financing, local politics and social costs of tariff increases",
    "watch": "load-shedding hours, Eskom reforms, renewable procurement, grid investment, mining output and business confidence",
    "stakes": "South Africa’s power crisis matters because no industrial economy can grow steadily without reliable electricity."
  },
  "mexico-border-factories": {
    "place": "Mexico",
    "topic": "Mexico’s border factory economy",
    "start": "Mexico’s proximity to the United States has become more valuable as companies seek shorter and safer supply chains",
    "mechanism": "border factories, trucking corridors, USMCA rules and supplier networks allow firms to serve the US market quickly",
    "actors": "maquiladoras, US firms, Mexican workers, customs agencies, industrial parks and border cities like Tijuana, Juárez and Monterrey",
    "bottlenecks": "border congestion, security, electricity, water, labor conditions and uncertainty around US trade policy",
    "watch": "factory investment, border wait times, US tariffs, industrial park occupancy, wage growth and supplier upgrading",
    "stakes": "Mexico’s border factories matter because geography is becoming an industrial asset again."
  },
  "arctic-shipping": {
    "place": "Arctic",
    "topic": "Arctic shipping and great-power rivalry",
    "start": "melting ice is making northern routes more visible, especially the Russian Arctic corridor between Asia and Europe",
    "mechanism": "shorter routes, resource access, military presence and icebreaker capacity turn climate change into strategic geography",
    "actors": "Russia, China, NATO states, shipping firms, insurers, energy companies and Arctic communities",
    "bottlenecks": "ice conditions, weak ports, sanctions, environmental risk, military tension and uncertain commercial demand",
    "watch": "Northern Sea Route volumes, icebreaker fleets, Russian energy projects, NATO posture and Chinese polar policy",
    "stakes": "Arctic shipping matters because a warming planet is opening routes that could also increase rivalry."
  },
  "cocoa-west-africa": {
    "place": "Côte d’Ivoire and Ghana",
    "topic": "cocoa and West Africa’s pricing power problem",
    "start": "Côte d’Ivoire and Ghana produce much of the world’s cocoa but farmers capture only a small share of chocolate’s final value",
    "mechanism": "raw-bean exports, global traders, processing firms and branded chocolate companies shape prices far from the farms",
    "actors": "smallholder farmers, cocoa boards, traders, chocolate brands, consumers, governments and sustainability certifiers",
    "bottlenecks": "low farm incomes, child labor risks, climate stress, disease, weak processing capacity and limited bargaining power",
    "watch": "cocoa prices, farmgate prices, weather, disease outbreaks, processing investment and EU deforestation rules",
    "stakes": "Cocoa matters because it shows how being essential to a global product does not guarantee control over value."
  },
  "green-hydrogen": {
    "place": "Global",
    "topic": "the green hydrogen race",
    "start": "countries with cheap renewable power want to use hydrogen to decarbonize industry and export clean energy",
    "mechanism": "electricity splits water into hydrogen, which can then feed steel, chemicals, shipping fuel or energy exports if costs fall enough",
    "actors": "renewable-rich countries, electrolyzer firms, ports, steelmakers, ammonia producers, investors and governments subsidizing demand",
    "bottlenecks": "high costs, water needs, transport infrastructure, uncertain demand, safety rules and competition from direct electrification",
    "watch": "electrolyzer costs, offtake contracts, port projects, ammonia trade, EU subsidies and industrial users willing to pay",
    "stakes": "Green hydrogen matters because it could create a new energy trade map, but only if economics catch up with ambition."
  },
  "remittances-economy": {
    "place": "Global",
    "topic": "the economic role of remittances",
    "start": "money sent by migrants often becomes a lifeline for households and a major source of foreign currency for countries",
    "mechanism": "small transfers across borders support consumption, education, housing, health spending and sometimes local investment",
    "actors": "migrant workers, families, money-transfer firms, digital wallets, central banks and governments reliant on diaspora income",
    "bottlenecks": "transfer fees, exchange rates, migration policy, informal channels and the risk that remittances substitute for weak domestic job creation",
    "watch": "migration flows, transfer costs, digital wallets, exchange-rate shocks, labor demand abroad and household spending patterns",
    "stakes": "Remittances matter because private family transfers can stabilize economies more quietly than official aid or investment."
  }
};

function storyCategoryFrame(category){
  const frames = {
    Macro: 'currency, debt, prices, credibility and the confidence of households and investors',
    Logistics: 'ports, routes, chokepoints, insurance, distance and the physical movement of goods',
    Energy: 'fuel, electricity, grids, resource rents, climate pressure and industrial power',
    Industry: 'factories, suppliers, technology, skills, scale and the control of production networks',
    Geopolitics: 'territory, security, strategic dependence, alliances and the control of critical nodes',
    Fintech: 'payments, trust, access, data, regulation and the daily infrastructure of money',
    Development: 'institutions, infrastructure, productivity, demographics, education and the distribution of opportunity'
  };
  return frames[category] || 'geography, institutions, infrastructure, capital and political risk';
}

function buildCustomStoryText(story, layer){
  const p = customStoryProfiles[story.id];
  if(!p) return null;
  const frame = storyCategoryFrame(story.category);
  if(layer === 'quick'){
    return `${p.topic} is a WorldPulse story about how ${frame} shape economic power. The starting point is simple: ${p.start}. From there, the story becomes bigger than one headline because the real mechanism is ${p.mechanism}.

The important actors are ${p.actors}. Their decisions determine whether the opportunity becomes broad development or remains concentrated in a few firms, regions or institutions. The main limits are ${p.bottlenecks}. These limits matter because they decide whether the model is resilient or fragile when conditions change.

What to watch: ${p.watch}.

WorldPulse lens: ${p.stakes}`;
  }
  if(layer === 'medium'){
    return `01 — The starting point
${p.topic} begins with a concrete constraint: ${p.start}. This constraint does not mechanically decide the outcome, but it shapes the space in which governments, firms, households and foreign partners act. In ${p.place}, the visible headline is only the surface. The deeper story is about how an economy organizes itself around a pressure point.

02 — The mechanism
The key mechanism is ${p.mechanism}. This is why the story cannot be understood through one variable alone. It is not only about growth, exports, technology or geography. It is about the connection between ${frame}. Once those elements reinforce each other, a local structure can become a national strategy or even a global vulnerability.

03 — The actors
The main actors are ${p.actors}. Each one has a different incentive. Governments want stability and influence. Firms want lower costs, scale and predictability. Households want jobs, income and protection from shocks. Foreign partners want access, security and leverage. The story becomes interesting when these incentives align, and risky when they collide.

04 — The bottlenecks
The limits are ${p.bottlenecks}. These are not secondary details; they are the real test. An economy can have a strong headline advantage and still fail to transform if infrastructure, trust, finance, skills or political stability do not follow. WorldPulse reads these bottlenecks as the hidden map beneath the story.

05 — Why it matters now
This story matters now because the world economy is becoming less neutral. Trade, finance, energy, technology and logistics are increasingly treated as strategic assets. Countries and companies are trying to reduce dangerous dependencies while creating useful dependencies for others. That is why ${p.topic} is not only an economic issue. It is also a map of power.

06 — What to watch
The next signals are practical: ${p.watch}. These indicators reveal whether the story is accelerating, stalling or becoming more fragile. They also show who gains leverage when the system is stressed.

WorldPulse lens: ${p.stakes}`;
  }
  return `01 — The structure behind the story
${p.topic} should be read as a system. The starting point is ${p.start}. That starting point matters because it creates the first constraint: what the economy lacks, what it controls, what it depends on, and what other actors need from it. A WorldPulse deep dive begins here because the most important economic stories are rarely isolated events. They are structures built over time.

02 — The core mechanism
The mechanism is ${p.mechanism}. This mechanism connects local decisions to wider consequences. It explains why the story is not just about ${p.place}, but about how ${frame} move through the global economy. A port can become leverage if trade needs it. A currency can become power if others borrow in it. A resource can become strategic if new industries depend on it. A payment system can reshape an economy if millions of people use it every day.

03 — The actors and their incentives
The main actors are ${p.actors}. They do not all want the same thing. Governments usually want growth, stability and room for maneuver. Firms want profit, scale, reliability and access to markets. Households want cheaper services, jobs, wages and protection from inflation or insecurity. Foreign powers and investors look for influence, returns and reduced risk. The story develops through the interaction of these incentives.

04 — Geography and infrastructure
Geography still matters, but it only becomes power when infrastructure activates it. Location, ports, rivers, borders, grids, data centers, factories, pipelines, payment systems, railways and canals are not background details. They are the hardware of economic power. In this story, infrastructure determines whether the opportunity can scale or whether it remains trapped by congestion, scarcity, high costs or institutional weakness.

05 — Institutions and trust
The institutional layer decides whether the mechanism becomes durable. Rules, courts, regulators, central banks, customs systems, public investment agencies and local administrations shape the credibility of the model. Without trust, capital hesitates. Without rules, small firms stay excluded. Without capable institutions, even a strong geographic or resource advantage can be wasted. This is why institutional quality is often the difference between a boom and transformation.

06 — The bottlenecks
The main bottlenecks are ${p.bottlenecks}. These bottlenecks decide who absorbs the cost when the system is stressed. If infrastructure is weak, delays become prices. If finance is fragile, investment slows. If security is weak, firms demand higher returns or leave. If energy, water or skills are scarce, growth hits a ceiling. The bottleneck is where the story becomes concrete.

07 — Winners, losers and distribution
Every economic model produces winners and losers. The winners are usually the actors who control the scarce node: capital, infrastructure, data, energy, technology, land, logistics or credibility. The losers are those who depend on the system without controlling it. They may face higher prices, weaker bargaining power, fewer jobs or exposure to shocks. A good WorldPulse reading asks not only whether the country gains, but who inside the country gains.

08 — External dependency
No economy acts alone. ${p.topic} depends on external demand, foreign finance, technology, trade routes, regulation, interest rates, climate shocks or geopolitical decisions. Dependencies can be useful because they connect a country to markets and capital. But they become dangerous when one buyer, one route, one currency, one commodity or one foreign power becomes too important. The key question is whether ${p.place} can manage dependency without becoming trapped by it.

09 — Productivity and upgrading
The deepest development question is productivity. Does the story make workers, firms and institutions more capable over time? Does it create skills, suppliers, infrastructure, technical knowledge and trust? Or does it only create a temporary gain based on prices, geography or outside demand? A boom can raise activity for a few years, but productivity changes the long-term path of an economy.

10 — Resilience
The resilience test asks what happens when the system is hit by a shock: a currency fall, a drought, a war, a trade dispute, a technology restriction, an energy-price spike or a change in interest rates. A resilient model can absorb the shock and adapt. A fragile model breaks at the point where dependence was too concentrated. This is why WorldPulse focuses on bottlenecks as much as opportunities.

11 — What to watch next
The signals to watch are ${p.watch}. These are more useful than dramatic headlines because they show whether the underlying system is improving. Investment, capacity, rules, prices, adoption, trust and infrastructure reveal the future before the political speeches do.

12 — The WorldPulse lens
${p.stakes} The important question is therefore not simply whether the story is positive or negative. The question is who controls the bottleneck, who pays for the risk, who captures the value, and whether the mechanism creates broader capabilities. That is what turns ${p.topic} from a headline into a map of power, dependency and adaptation.`;
}

function genericStoryText(story, layer){
  const angle = story.category === 'Macro' ? 'currency, debt, inflation and policy credibility' : story.category === 'Logistics' ? 'ports, sea lanes, insurance and chokepoints' : story.category === 'Energy' ? 'energy, infrastructure, prices and political leverage' : story.category === 'Geopolitics' ? 'geography, security, influence and strategic dependency' : story.category === 'Industry' ? 'technology, production networks and industrial capacity' : story.category === 'Fintech' ? 'payments, trust, banking access and digital infrastructure' : 'institutions, development strategy and geography';
  const place = story.place || 'Global';
  if(layer==='quick'){
    return `${story.title} is a compact WorldPulse story about ${angle}. ${story.description}\n\nThe key idea is that economic power rarely comes from one factor alone. It emerges when geography, institutions, infrastructure, capital and timing reinforce each other. In ${place}, the visible headline is only the surface. Under it sits a deeper system of incentives: who controls access, who absorbs risk, who gains leverage, and who becomes dependent on the choices of others.\n\nWorldPulse lens: this story matters because it turns a local economic fact into a wider map of power, vulnerability and adaptation.`;
  }
  if(layer==='medium'){
    return `01 — The starting point\n${story.title} begins with a constraint: location, resources, debt, population, technology or access to markets. ${story.description} That constraint does not automatically decide the outcome, but it shapes the field on which governments, firms, households and investors act.\n\n02 — The mechanism\nThe core mechanism is ${angle}. A port can become power if trade needs it. A payment system can change an economy if millions of people adopt it. An industrial cluster can become strategic if the world depends on its output. A currency can become a weapon if others need it to borrow, trade or store value.\n\n03 — The actors\nThe main actors are not only governments. Firms search for margins and stability. Households react to prices, wages and access. Investors price credibility. Foreign powers look for leverage. Local institutions decide whether an opportunity becomes broad development or remains concentrated in a few sectors.\n\n04 — The winners and losers\nEvery economic model creates advantages and vulnerabilities. The winners are usually the actors who control infrastructure, finance, technology, energy or access. The losers are those exposed to price shocks, currency pressure, supply-chain disruption, demographic decline or weak institutions.\n\n05 — Why it matters now\nThe reason this story matters is that the world economy is becoming less neutral. Trade routes, chips, ports, currencies, food, energy and data are increasingly treated as strategic assets. That means economic facts quickly become geopolitical facts.\n\n06 — The wider consequence\nThe important part is not only what happens inside ${place}. The story matters because it changes how other actors behave. Investors may move capital. Governments may adjust strategy. Firms may redesign supply chains. Households may face new prices, new jobs or new constraints. A WorldPulse story is therefore never isolated: it shows how one node in the system can influence another.\n\n07 — What to watch\nThe next signals are usually practical rather than spectacular: investment announcements, infrastructure pressure, currency movements, regulatory changes, energy prices, demographic shifts, security risks and public trust. These indicators reveal whether the story is becoming stronger, stalling, or creating new vulnerabilities.\n\nWorldPulse lens: ${story.title} matters because it shows how a local structure can connect to a global pressure point.`;
  }
  return `01 — The structure behind the story\n${story.title} should be read as a system rather than a single event. ${story.description} The visible event is only the surface. Under it sits a structure made of geography, capital, infrastructure, institutions, technology and political risk.\n\n02 — Geography and infrastructure\nGeography still matters because every economy must move people, energy, goods, data or money through physical and institutional channels. Ports, straits, grids, pipelines, factories, data centers, rail corridors and payment networks are not neutral background details. They are the hardware of power.\n\n03 — Incentives and institutions\nThe next layer is institutional. States decide rules, investors price credibility, firms search for margins, households react to prices, and foreign powers look for leverage. A strong institution can turn a weak starting position into an advantage. A weak institution can waste natural resources, population size or strategic location.\n\n04 — Global transmission\nWhat makes the topic global is transmission. A local shock can travel through exchange rates, commodity prices, container shipping, sanctions, supply contracts, insurance premiums, bond markets or technology controls. That is why a canal, a chip factory, a currency decision or a resource deposit can matter far beyond its own region.\n\n05 — Strategic consequence\nThe deeper lesson is that modern power is no longer only military. It is the ability to control critical nodes: finance, logistics, energy, data, technology and standards. Countries compete to reduce dependency while making others depend on them.\n\n06 — The trade-off\nEvery model has a cost. Openness brings growth but exposure. Industrial policy brings capacity but waste risk. Energy wealth brings capital but dependence. Financial power brings influence but fragility. Development is the art of choosing which vulnerabilities to accept and which ones to eliminate.\n\n07 — The development question\nThe key question is whether the story produces broad capabilities or only narrow gains. A country can receive investment without upgrading. It can export more without becoming more productive. It can control a resource without building the institutions needed to use it well. The difference between a boom and a transformation is whether the gains spread through skills, suppliers, infrastructure and trust.\n\n08 — What to watch\nWatch the bottlenecks: power, water, ports, public finance, security, regulation, demographics, technology access and external demand. These details decide whether the story accelerates or stalls. They also reveal who has leverage when the system is stressed.\n\n09 — The political economy layer\nBehind every economic mechanism there is a political economy question. Who benefits from the existing system? Who wants reform? Who loses if the model changes? Which groups have enough power to block adaptation? A country can know the right economic answer and still fail to implement it if the coalition behind the old model is stronger than the coalition behind change.\n\n10 — The external dependency layer\nNo economy acts alone. A country may depend on foreign demand, imported energy, external finance, foreign technology, migrant remittances, shipping insurance, military protection or access to another country’s consumer market. These dependencies can be useful in good times because they create growth, but they become vulnerabilities during shocks. The strongest economies are not those with no dependencies at all; they are those that understand which dependencies are dangerous and which ones can be managed.\n\n11 — The productivity layer\nThe deepest development question is productivity. Does the story make workers, firms and institutions more capable over time? Does it create skills, suppliers, infrastructure, trust and technical knowledge? Or does it only produce a temporary boom based on prices, geography or outside demand? A boom can raise income for a moment, but productivity changes the long-term path of a country.\n\n12 — The distribution layer\nEven when the story creates growth, the benefits may not be shared equally. One region can gain while another is left behind. Large firms can benefit while small firms remain excluded. Skilled workers can see new opportunities while informal workers face higher prices without better wages. This is why WorldPulse reads development through both national averages and local bottlenecks.\n\n13 — The resilience test\nThe final test is resilience. A system is strong if it can absorb shocks without collapsing: a currency shock, a drought, a war, a trade dispute, a technological disruption, a change in interest rates or a sudden fall in demand. The more concentrated the system is around one port, one commodity, one buyer, one industry or one political bargain, the more fragile it becomes.\n\n14 — The WorldPulse lens\nThe important question is not simply whether the story is good or bad. The question is who controls the bottleneck, who absorbs the risk, who pays when the system breaks, and who gains leverage when everyone else needs access. That is why ${story.title} is not just a topic. It is a map of power, dependency and adaptation.`;
}

function storyText(story, layer){
  if(story.id==='mexico-nearshoring') return mexicoNearshoringLayers[layer] || mexicoNearshoringLayers.quick;
  const custom = buildCustomStoryText(story, layer);
  if(custom) return custom;
  return genericStoryText(story, layer);
}

function navigate(page, opts={}){
  state.page = page;
  if(opts.story) state.story = opts.story;
  render();
  window.scrollTo({top:0,behavior:'smooth'});
}

function layout(content){
  return `<div class="shell">
    <aside class="sidebar">
      <button class="brand side-brand" onclick="navigate('home')"><span class="brand-orb">🌍</span><span>WorldPulse<div class="brand-sub">Economics · Geopolitics</div></span></button>
      <div class="nav-label">Navigate</div>
      <nav class="nav">
        ${navButton('discover','◉','Discover')}
        ${navButton('stories','▰','Stories')}
        ${navButton('compare','⇄','Compare')}
        ${navButton('daily','▤','Daily Brief')}
        ${navButton('learn','◇','Learn')}
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
    <nav class="home-nav"><button class="brand" onclick="navigate('home')"><span class="brand-orb">🌍</span><span>WorldPulse<div class="brand-sub">Economics · Geopolitics</div></span></button><div class="home-actions"><button class="pill-btn" onclick="document.getElementById('tour').scrollIntoView({behavior:'smooth'})">How it works</button><button class="dark-btn" onclick="navigate('discover')">Enter WorldPulse →</button></div></nav>
    <section class="hero">
      <div><div class="kicker">Not a newspaper. Not a feed. Not doomscrolling.</div><h1>Understand the world as a system.</h1><p>WorldPulse is a smooth interactive atlas for economics and geopolitics. It connects countries, ports, cities, trade routes, currencies, energy and stories — so the world feels less like random headlines and more like a map you can read.</p><div class="hero-cta"><button class="dark-btn" onclick="navigate('discover')">Discover the atlas →</button><button class="ghost-btn" onclick="navigate('stories')">Browse stories</button></div><div class="hero-note">Atlas · story mode · country profiles · daily brief · learning modules</div></div>
      <div class="world-mosaic" aria-hidden="true"><div class="mosaic-card big"><span>🌊</span><b>Chokepoints</b><p>Suez, Malacca, Panama, Hormuz.</p></div><div class="mosaic-card"><span>🏙️</span><b>Cities</b><p>Finance, technology, industry.</p></div><div class="mosaic-card"><span>⚓</span><b>Ports</b><p>Where globalization becomes physical.</p></div><div class="mosaic-card dark"><span>⚡</span><b>Power</b><p>Energy, chips, money and leverage.</p></div></div>
    </section>
    <section id="tour" class="home-strip">
      <button class="strip-card" onclick="navigate('discover')"><h3>Discover</h3><p>Open the atlas. Activate cities, ports and sea routes. Click countries directly to understand their economy.</p></button>
      <button class="strip-card" onclick="navigate('stories')"><h3>Stories in 3 layers</h3><p>Choose quick insight, medium story or deep dive depending on how far you want to go.</p></button>
      <button class="strip-card" onclick="navigate('compare')"><h3>Compare countries</h3><p>See how two economies differ across GDP, population, currency, energy and model.</p></button>
    </section>
  </div>`
}

function discover(){
  const fact = didYouKnow[factIndex % didYouKnow.length];
  return layout(`
    <div class="row-head"><span>▤ Today's World</span><button class="link-line" onclick="navigate('daily')">Daily brief ↗</button></div>
    <div class="brief-row">${dailyBrief.slice(0,3).map(b=>`<button class="brief-card" onclick="navigate('daily')"><span class="tag ${b.cat}">${b.cat}</span><span class="meta">${b.place}</span><h3>${b.title}</h3></button>`).join('')}</div>
    <button class="fact-card" onclick="navigate('story',{story:'${fact.story}'})"><div class="spark">✦</div><div><div class="row-head" style="margin:0 0 4px"><span>Did you know?</span></div><h3>${fact.text}</h3><span class="link-line">Read the story ↗</span></div></button>
    <div class="atlas-head"><div><div class="section-kicker">WorldPulse · Atlas</div><h2>Scroll the world,<br>not a feed.</h2><p>Spin the globe. Tap a country, city, port or trade route to learn how money, power and geography shape it.</p></div></div>
    ${atlas('main')}
  `);
}

function atlas(id){
  return `<div class="atlas-wrap atlas-wrap-stacked">
    <div class="globe-panel"><div class="globe-toolbar"><div class="hint">Drag · scroll to zoom</div></div><svg id="globe-${id}" class="globe-svg"></svg></div>
    <section class="atlas-info-below">
      <div class="layer-controls">
        <h4>Layers</h4>
        <div class="layer-toggle-grid">${toggle('cities','Cities')}${toggle('ports','Ports')}${toggle('routes','Trade routes')}</div>
      </div>
      <div id="country-pop-${id}" class="country-pop country-pop-wide">${itemPanel(state.selectedItem)}</div>
    </section>
  </div>`;
}
function toggle(key,label){return `<div class="toggle-row"><span>${label}</span><button class="switch ${state.layer[key]?'on':''}" onclick="state.layer.${key}=!state.layer.${key}; render()"></button></div>`}
function itemPanel(item){
  if(!item) return countryPanel(state.currentCountry || countryByName.Brazil);
  const kind = item.kind==='route' ? 'route' : item.type==='port' ? 'port' : (item.type==='finance'?'finance':'city');
  const profile=getEntityProfile(item);
  const subtitle = item.kind==='route' ? 'Trade route · sea corridor' : item.type==='port' ? (profile?.tag || 'Port / chokepoint') : (profile?.tag || 'City / economic node');
  const watch = item.kind==='route'?'Canal congestion, naval risk, weather, insurance costs and rerouting.':(profile?.watch || (item.type==='port'?'Terminal capacity, hinterland rail/roads, strikes, customs delays and geopolitical shocks.':'Investment flows, talent concentration, infrastructure pressure and policy choices.'));
  const matters = item.kind==='route'?'Sea routes are the hidden map underneath prices and supply chains.':(profile?.matters || 'This node links local geography to the global economy.');
  return `${infoImage(kind,item.name,subtitle)}<h3>${item.name}</h3><p>${subtitle}</p><p>${item.desc || 'A maritime corridor connecting production, energy, ports and final demand.'}</p><div class="info-list"><b>WorldPulse lens</b><span>${lensForItem(item)}</span><b>What to watch</b><span>${watch}</span><b>Why it matters</b><span>${matters}</span></div>`;
}
function countryPanel(c){
  if(!c) return `<h3>World Atlas</h3><p>Click a country, city, port or route to inspect it.</p>`;
  const angle = `${c.name} is shaped by ${c.model.toLowerCase()}, with ${c.exports} linking it to global demand.`;
  const power = `${c.strength} is its main source of leverage; ${c.vulnerability.toLowerCase()} is the constraint that can weaken it.`;
  return `${infoImage('country',c.name,c.region)}<h3>${c.name}</h3><p>${c.region} · ${c.pop} · ${c.currency}</p><p>${c.model}. Main exports: ${c.exports}.</p><div class="metric-grid"><div class="metric-mini"><span>GDP</span><b>${c.gdp}</b></div><div class="metric-mini"><span>GDP / cap</span><b>${c.gdppc}</b></div><div class="metric-mini"><span>Energy</span><b>${c.energy}</b></div><div class="metric-mini"><span>Key risk</span><b>${c.risk}</b></div></div><div class="info-list"><b>Economic model</b><span>${angle}</span><b>Strengths</b><span>${power}</span><b>Vulnerabilities</b><span>${c.name}'s key pressure point is ${c.vulnerability.toLowerCase()}, especially if ${c.risk.toLowerCase()} becomes more severe.</span><b>WorldPulse reading</b><span>Read ${c.name} through four lenses: geography, exports, energy dependence and institutional capacity. That mix explains its room for maneuver.</span></div><button class="pill-btn" style="margin-top:12px" onclick="navigate('compare')">Compare ↗</button>`;
}


function storiesPage(){
  const q = state.search.toLowerCase();
  const filtered = stories.filter(s=>(state.category==='All'||s.category===state.category) && [s.title,s.place,s.category,s.description].join(' ').toLowerCase().includes(q));
  return layout(`
    <div class="section-kicker">Stories</div><h2 class="page-title">Country deep dives</h2><p class="page-sub">Long-form explainers — but never long-winded. Read each story in 3 layers: quick, medium or deep.</p>
    <input class="search" placeholder="Search by country, region or topic — e.g. Singapore, Africa, energy" value="${state.search}" oninput="state.search=this.value; render()" />
    <div class="chips">${categories.map(c=>`<button class="chip ${state.category===c?'active':''}" onclick="state.category='${c}'; render()">${c}</button>`).join('')}</div>
    <div class="story-grid">${filtered.map(storyCard).join('')}</div>
    <div class="coming"><div class="row-head"><span>Coming soon</span></div><div class="story-grid">${comingSoon.map(storyCard).join('')}</div></div>
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

function articleHTML(s,txt){
  const blocks = txt.split(/\n\n+/).filter(Boolean);
  return blocks.map(block=>{
    const m=block.match(/^(\d{2}\s[—-]\s[^\n]+)\n([\s\S]*)/);
    if(m) return `<section><h3>${m[1]}</h3><p>${m[2]}</p></section>`;
    return `<p>${block}</p>`;
  }).join('') + `<div class="takeaway"><b>Key takeaway</b><p>${s.title} matters because it turns an economic fact into a map of incentives, dependencies and power.</p></div>`;
}

function compare(){
  const a=countryByName[state.compareA] || uniqueCountries[0], b=countryByName[state.compareB] || uniqueCountries[1] || uniqueCountries[0];
  const rows=[['GDP',a.gdp,b.gdp],['GDP per capita',a.gdppc,b.gdppc],['Population',a.pop,b.pop],['Currency',a.currency,b.currency],['Energy dependence',a.energy,b.energy],['Debt / risk lens',a.risk,b.risk],['Economic model',a.model,b.model],['Main exports',a.exports,b.exports]];
  return layout(`<div class="section-kicker">Compare</div><h2 class="page-title">Two countries, side by side</h2><p class="page-sub">A quick way to spot what makes economies different.</p><div class="compare-selectors"><div class="selector-card"><h3>${flag(a.name)} ${a.name}</h3>${selectCountry('compareA')}</div><div class="selector-card"><h3>${flag(b.name)} ${b.name}</h3>${selectCountry('compareB')}</div></div><div class="contrast"><b>Key contrast</b>${a.name} is shaped by ${a.model.toLowerCase()}, while ${b.name} is shaped by ${b.model.toLowerCase()}.</div><div class="compare-table">${rows.map(r=>`<div class="compare-row"><div class="left">${r[1]}</div><div class="label">${r[0]}</div><div class="right">${r[2]}</div></div>`).join('')}</div>`);
}
function selectCountry(key){const sorted=uniqueCountries;return `<select class="select" onchange="state.${key}=this.value; render()">${sorted.map(c=>`<option value="${escapeXml(c.name)}" ${state[key]===c.name?'selected':''}>${flag(c.name)} ${c.name}</option>`).join('')}</select>`}
function flag(name){const code=countryCodeForFlag(name); if(!code) return '🌐'; return code.toUpperCase().replace(/./g,ch=>String.fromCodePoint(127397+ch.charCodeAt(0)));}

function daily(){
  return layout(`<div class="section-kicker">▣ Daily Brief · Demo edition</div><h2 class="page-title">5 things shaping the world today</h2><p class="page-sub">Read in 4 minutes. Sound smart at lunch.</p><div class="daily-list">${dailyBrief.map((d,i)=>`<div class="daily-card"><div class="daily-top"><span class="daily-num">${String(i+1).padStart(2,'0')}</span><span class="tag ${d.cat}">${d.cat}</span><span class="story-place">${d.place}</span></div><h3>${d.title}</h3><div class="brief-sections"><div class="brief-section"><b>What happened</b><p>${d.h}</p></div><div class="brief-section"><b>Why it matters</b><p>${d.m}</p></div><div class="brief-section"><b>What to watch</b><p>${d.w}</p></div></div></div>`).join('')}</div>`)
}
function learn(){return layout(`<div class="section-kicker">Learn</div><h2 class="page-title">10 modules to think like an economist</h2><p class="page-sub">Bite-sized lessons. Real examples. A short quiz later.</p><div class="module-grid">${modules.map(m=>`<button class="module-card"><span class="module-num">${m.num}</span><div class="module-icon">${m.icon}</div><h3>${m.title}</h3><p>${m.desc}</p><div class="progress-line"><span></span></div></button>`).join('')}</div>`)}

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
  const html=`<div id="story-globe-overlay" class="story-globe"><button class="close" onclick="closeStoryGlobe()">×</button><div class="story-globe-map"><div class="globe-panel"><svg id="globe-story" class="globe-svg"></svg></div></div><aside class="story-globe-panel"><div class="step-kicker">Step ${state.globeStep+1} of ${steps.length} · ${s.title}</div><div class="location-chip">● ${step.place}</div><h2>${step.title}</h2><p>${step.text}</p><div class="globe-note"><b>Map logic</b><span>This location is a node in the wider system: follow the movement of money, goods, energy and leverage as the globe turns.</span></div><div class="progress">${steps.map((_,i)=>`<div class="bar ${i<=state.globeStep?'done':''}"><span></span></div>`).join('')}</div><div class="story-globe-actions"><button class="pill-btn" onclick="prevStep()">← Back</button>${state.globeStep===steps.length-1?`<button class="dark-btn" onclick="continueGlobeStory()">Continue with another story →</button><button class="ghost-btn" onclick="closeStoryGlobe(); navigate('stories')">Back to stories</button>`:`<button class="dark-btn" onclick="nextStep()">Continue →</button>`}</div></aside></div>`;
  if(!el){document.body.insertAdjacentHTML('beforeend',html)} else {el.outerHTML=html}
  setTimeout(()=>drawGlobe('story',{focus:step.coords, markers:steps.map((x,i)=>({name:x.place,desc:x.title,lon:x.coords[0],lat:x.coords[1],type:'story',active:i===state.globeStep})), storyMode:true}),40);
}

function render(){
  const app=document.getElementById('app');
  if(state.page==='home') app.innerHTML=home();
  if(state.page==='discover') app.innerHTML=discover();
  if(state.page==='stories') app.innerHTML=storiesPage();
  if(state.page==='story') app.innerHTML=storyPage();
  if(state.page==='compare') app.innerHTML=compare();
  if(state.page==='daily') app.innerHTML=daily();
  if(state.page==='learn') app.innerHTML=learn();
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
    if(!opts.storyMode && state.layer.routes) drawRoutes(svg, projection, path);
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

function markerColor(t){return t==='port'?'#d97706':t==='finance'?'#6d28d9':t==='story'?'#2563eb':t==='city'?'#2f855a':'#111827'}
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

window.navigate=navigate; window.continueGlobeStory=continueGlobeStory; window.openStoryGlobe=openStoryGlobe; window.closeStoryGlobe=closeStoryGlobe; window.nextStep=nextStep; window.prevStep=prevStep;
render();
