// ===== EDIT ME: all content lives here. Anything marked [PLACEHOLDER] is not real. =====
window.SITE = {
  email: "giftsonjonathan29@gmail.com", // e.g. "you@example.com"  (empty = placeholder shown)
  github: "https://www.github.com/GiftsonJonathan", linkedin: "https://www.linkedin.com/in/giftson-jonathan-70b94629b",           // full URLs; empty = hidden
  resume: "resume/resume_v1.pdf", // drop your PDF here
  coords: "8.715872° N · 77.764449° E",  // example from brief; change or delete
  capabilities: {
    Geospatial: ["GIS","Remote Sensing","Spatial Analysis","Cartography","Geospatial Data","Earth Observation"],
    Development: ["HTML","CSS","JavaScript","React","Node.js","APIs"],
    Data: ["Data Analysis","Visualization","Python","Spatial Data Processing"],
    "AI & Automation": ["AI Tools","Prompt Engineering","AI-assisted Development","Automation"]
  },
  experience: [{org:"Sky Groups, Bangalore",role:"GIS Intern",dates:"Jul 2026 - Aug 2026",desc:"Worked on BIAAPA project",tech:[]}],
  education: [{school:"Anna University Regional Campus Tirunelveli",degree:"B.E. Geoinformatics Engineering",dates:"2022 - 26",desc:"6.6 CGPA"}],
  achievements: [{type:"Certification",title:"Nil"},{type:"Competition",title:"Nil"},{type:"Academic",title:"Nil"}]
};
// category: GIS | WEB | SOFTWARE | DATA | AI | EXPERIMENTS.  featured: true => "Selected work".
// loc: [lat, lon] puts the project on the globe (optional).
const P = (slug,title,category,loc,featured)=>({slug,featured,title,category,year:"",loc,
  description:"[PLACEHOLDER — one or two sentences on what this does.]",technologies:[],image:"",github:"",demo:"",
  problem:"[PLACEHOLDER]",approach:"[PLACEHOLDER]",features:["[PLACEHOLDER]"],outcome:"[PLACEHOLDER]"});
window.PROJECTS = [
  P("project-one","","GIS",[20,78],true), P("project-two","","WEB",[48,10],true), P("project-three","","DATA",[-15,-55],true),
  P("experiment-one","","EXPERIMENTS",[35,-100]), P("ai-one","","AI"), P("software-one","","SOFTWARE")
];
