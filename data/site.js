// ===== EDIT ME: all content lives here. Anything marked [PLACEHOLDER] is not real. =====
window.SITE = {
  email: "", // e.g. "you@example.com"  (empty = placeholder shown)
  github: "", linkedin: "",           // full URLs; empty = hidden
  resume: "resume/Giftson-Jonathan-Resume.pdf", // drop your PDF here
  coords: "13.0827° N · 80.2707° E",  // example from brief; change or delete
  capabilities: {
    Geospatial: ["GIS","Remote Sensing","Spatial Analysis","Cartography","Geospatial Data","Earth Observation"],
    Development: ["HTML","CSS","JavaScript","React","Node.js","APIs"],
    Data: ["Data Analysis","Visualization","Python","Spatial Data Processing"],
    "AI & Automation": ["AI Tools","Prompt Engineering","AI-assisted Development","Automation"]
  },
  experience: [{org:"[PLACEHOLDER — ORGANIZATION]",role:"[PLACEHOLDER — ROLE]",dates:"[DATES]",desc:"[PLACEHOLDER — What you did and built.]",tech:[]}],
  education: [{school:"[PLACEHOLDER — INSTITUTION]",degree:"B.E. Geoinformatics Engineering",dates:"[DATES]",desc:"[PLACEHOLDER — relevant work, achievements]"}],
  achievements: [{type:"Certification",title:"[PLACEHOLDER — ADD CERTIFICATION]"},{type:"Competition",title:"[PLACEHOLDER — ADD COMPETITION]"},{type:"Academic",title:"[PLACEHOLDER — ADD ACHIEVEMENT]"}]
};
// category: GIS | WEB | SOFTWARE | DATA | AI | EXPERIMENTS.  featured: true => "Selected work".
// loc: [lat, lon] puts the project on the globe (optional).
const P = (slug,title,category,loc,featured)=>({slug,featured,title:"[PLACEHOLDER — ADD PROJECT]",category,year:"",loc,
  description:"[PLACEHOLDER — one or two sentences on what this does.]",technologies:[],image:"",github:"",demo:"",
  problem:"[PLACEHOLDER]",approach:"[PLACEHOLDER]",features:["[PLACEHOLDER]"],outcome:"[PLACEHOLDER]"});
window.PROJECTS = [
  P("project-one","","GIS",[20,78],true), P("project-two","","WEB",[48,10],true), P("project-three","","DATA",[-15,-55],true),
  P("experiment-one","","EXPERIMENTS",[35,-100]), P("ai-one","","AI"), P("software-one","","SOFTWARE")
];
