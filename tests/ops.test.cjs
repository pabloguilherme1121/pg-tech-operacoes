const test=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {runInNewContext}=require('node:vm');
const source=readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
function launch(saved){
 const map=new Map();
 function element(selector){
  if(!map.has(selector))map.set(selector,{innerHTML:'',value:'',addEventListener(){},checked:false});
  return map.get(selector);
 }
 const document={querySelector:element,querySelectorAll(){return []}};
 const context={document,fp:element('#fp'),ft:element('#ft'),fq:element('#fq'),fs:element('#fs'),
  localStorage:{getItem(){return saved===undefined?null:JSON.stringify(saved)},setItem(){}},
  Date,Math,URL,Blob,console,alert(){},confirm(){return false}};
 runInNewContext(source,context,{timeout:2000});
 return {records:element('#registros').innerHTML,projects:element('#projetos').innerHTML};
}
test('registro armazenado não injeta HTML nem link javascript no painel',()=>{
 const r={id:'"><img src=x onerror=alert(1)>',projeto:'PG Bot',tipo:'QA',estado:'pendente',prioridade:'P0',descricao:'Evidência',date:'hoje',url:'javascript:alert(1)'};
 const screen=launch({records:[r],history:[],checks:[]});
 assert.doesNotMatch(screen.records,/<img\b|javascript:/i);
 assert.match(screen.records,/Evidência/);
});
test('dados locais incompletos não derrubam o painel',()=>{
 const view=launch({records:null,history:null,checks:null});
 assert.match(view.records,/Nenhum registro/);
});
test('links dos projetos apontam para repositórios efetivos',()=>{
 const view=launch();
 assert.match(view.projects,/pabloguilherme1121\/PG-Bot/);
 assert.match(view.projects,/pabloguilherme1121\/Cuidador-a-/);
});
