const test=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const root=join(__dirname,'..');
const html=readFileSync(join(root,'index.html'),'utf8');
const css=readFileSync(join(root,'styles.css'),'utf8');

test('painel possui navegação de salto acessível e título visível',()=>{
 assert.match(html,/<a[^>]+class="skip-link"[^>]+href="#painel"/);
 assert.match(html,/<main[^>]+id="painel"/);
 assert.match(html,/<meta name="theme-color"/);
});
test('hierarquia visual oferece textos e controles legíveis no mobile',()=>{
 assert.match(css,/body\s*\{[^}]*font-size:\s*16px/);
 assert.match(css,/\.metric-card small\s*\{[^}]*font-size:\s*13px/);
 assert.match(css,/button,\s*input,\s*select\s*\{[^}]*min-height:\s*46px/);
 assert.match(css,/@media\s*\(max-width:\s*420px\)/);
});
test('acessibilidade respeita movimento reduzido, foco e texto longo',()=>{
 assert.match(css,/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
 assert.match(css,/\.skip-link:focus-visible/);
 assert.match(css,/#registros\s+\.queue-item\s+span\s*\{[^}]*overflow-wrap:\s*anywhere/);
});
