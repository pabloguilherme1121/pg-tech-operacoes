const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

function boot(storageValue, options = {}) {
  const elements = new Map();
  function element(selector) {
    if (!elements.has(selector)) {
      elements.set(selector, {
        innerHTML: '',
        textContent: '',
        value: '',
        handlers: {},
        addEventListener(event, handler) { this.handlers[event] = handler; },
      });
    }
    return elements.get(selector);
  }
  const scope = {
    document: { querySelector: element, querySelectorAll: () => [] },
    localStorage: {
      getItem: () => storageValue,
      setItem: () => {
        if (options.failWrite) throw new Error('quota excedida');
      },
    },
    URL, Blob, Date, Math,
    fp: { value: '' }, ft: { value: '' }, fq: { value: '' }, fs: { value: '' },
    alert: () => {}, confirm: () => true,
    FormData: class { constructor() { return [
      ['projeto', 'PG-portfolio'], ['tipo', 'CI'], ['prioridade', 'P2'],
      ['estado', 'pendente'], ['descricao', 'Teste válido'], ['url', ''],
    ]; } },
  };
  vm.runInNewContext(source, scope, { filename: 'app.js' });
  return { element };
}

test('dados locais com arrays inválidos não derrubam o painel', () => {
  assert.doesNotThrow(() => boot('{"records":"inválido","history":[null],"checks":{}}'));
});

test('link javascript salvo previamente nunca vira href clicável', () => {
  const record = {
    id: '1', projeto: 'PG-portfolio', tipo: 'CI',
    prioridade: 'P1', estado: 'pendente', descricao: 'Confira a origem',
    date: '06/11/2026', url: 'javascript:alert(1)',
  };
  const { element } = boot(JSON.stringify({ records: [record], history: [], checks: [] }));
  assert.doesNotMatch(element('#registros').innerHTML, /href=["']javascript:/i);
  assert.match(element('#registros').innerHTML, /Confira a origem/);
});

test('falha no armazenamento mantém novo registro em memória e informa o usuário', () => {
  const { element } = boot(null, { failWrite: true });
  const event = { preventDefault() {}, target: { reset() {} } };
  assert.doesNotThrow(() => element('#form').handlers.submit(event));
  assert.match(element('#registros').innerHTML, /Teste válido/);
  assert.match(element('#storage-status').textContent, /armazenamento/i);
});
