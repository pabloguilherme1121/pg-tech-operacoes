# Auditoria individual dos repositórios PG Tech

Data: 06/11/2026. Conta GitHub inspecionada: `pabloguilherme1121`.

## Escopo e método

Foram identificados 15 repositórios acessíveis nessa conta. Esta rodada revisou os 11 que estavam fora das frentes ativas PG-portfolio, PG-Arcade, PG-Bot e PG-Estrategia. O levantamento usou GitHub e checkouts limpos em diretório temporário do Windows 11, com Node 24.19.0, npm 11.17.0 e os scripts de cada projeto. O repositório `pg-tech-operacoes` recebeu uma correção isolada nesta própria PR. Nenhuma aplicação foi publicada ou integrada automaticamente.

Os tamanhos abaixo representam a soma aproximada dos arquivos HTML/CSS/JS/TS do checkout, **inclusive testes e ferramentas**. Não são o peso de transferência, LCP ou uma medida Lighthouse. Uma busca estática por `innerHTML` e padrões perigosos é ponto de triagem, não confirmação de XSS.

## Revisão por repositório

| Repositório e SHA auditado | Código e dependências | Segurança e desempenho | Verificação e próxima ação |
| --- | --- | --- | --- |
| `elianefashion-netlify-template` `0902ab9` | 19 arquivos; 16 KiB de fonte; sem dependências npm declaradas. | Preview estático; arquivos de funções aparecem com nomes `*.js.js`, sem comprovação de backend de pagamentos publicável. | `npm run check` aprovado, 2 testes. Confirmar a arquitetura de produção antes de liberar compra, estoque ou administração. |
| `Eliane-template-01` `b52b047` | Apenas `README.md`; nenhum código executável. | Não há aplicação para escanear ou medir. | Classificar como referência, arquivar ou apontar ao repositório ativo; não declarar auditoria de runtime concluída. |
| `dainty-horse-23162a` `60bdbf3` | 16 arquivos; 72 KiB de fonte; sem dependências npm declaradas. | Vitrine e interface administrativa precisam de homologação funcional e revisão dos pontos que geram HTML. | `npm run check` aprovado, 9 testes; realizar verificação visual e de autenticação da administração. |
| `eleicoes-goias-2026` `bd6ebaa` | 44 arquivos; 211 KiB de fonte; `jsdom@30.1.2` em desenvolvimento. | `npm audit` encontrou 1 alerta alto em `undici@8.12.1`, transitivo de `jsdom`. | Após instalação, `npm test` passou. Correção mínima `undici@8.12.4` foi enviada em PR separada #15, com `npm audit` agora sem alertas. Revalidar CI da HEAD. |
| `pg-tech-storefront` `374b39b` | 239 arquivos; 808 KiB de fonte, incluindo testes e ferramentas. 5 dependências de desenvolvimento. | `npm audit`: 0 alertas. O arquivo `tools/campaign-kit/mesa.html` tem aproximadamente 121 KiB; confirmar se entra em publicação real antes de otimizar. | `npm run check` aprovado, 119 testes. Inspecionar bundle entregue, interação real e métricas LCP/INP/CLS por rota. |
| `Cuidador-a-` `b0cd2df` | 65 arquivos; 222 KiB de fonte; `app.js` aproximadamente 89 KiB. | `npm audit`: 0 alertas. Encontradas atribuições de HTML para revisão contextual; não são prova de vulnerabilidade. | `npm run build` aprovado, incluindo testes. Validar alarmes em segundo plano, permissões, privacidade e Android físico. |
| `pabloguilherme1121` `7bef57c` | README, assets e documentação; sem aplicativo. | Performance e segurança de runtime não aplicáveis. | Revisar manualmente links, portfólio, descrições e coerência com as páginas publicadas. |
| `universo-pablo-builds` `1c84bf8` | 11 arquivos; 29 KiB de fonte; sem dependências npm declaradas. | Sem alertas por dependências npm; ainda não houve auditoria visual de navegador nessa rodada. | `npm run check` aprovado, 12 testes. Validar links reais e CTA mobile em navegador. |
| `pg-tech-operacoes` `142fa52` | 3 arquivos de origem, sem scripts de teste ou CI no ponto inicial. | Reproduzidos 3 defeitos de resiliência/links; havia 3 botões com altura inferior a 44 px no mobile. | Nesta PR: testes de regressão, carregamento defensivo, sanitização de URL, fallback de armazenamento, testes locais e botões de 44 px. O workflow de CI requer permissão adicional e não foi enviado. Seis verificações locais em Chromium/Firefox/WebKit, 320/390 px, passaram. |
| `PG-Bot-Homologacao` `3b60f54` | 11 arquivos; 170 KiB de fonte; testes Node e scripts Python. | O painel usa armazenamento local e múltiplos pontos de renderização HTML; os testes cobrem importação, URLs, SHA e estados, mas não substituem inspeção completa de todas as entradas. | `node --test tests/core-tests.cjs` aprovado, 37 testes. Ainda falta executar testes de navegador/Android real e conferir SHA dos gates antes de declarar homologado. |
| `loja-roupa-publicacoes` `b77974e` | 21 arquivos; 59 KiB de fonte; Playwright e axe em desenvolvimento. | `npm audit`: 0 alertas. O servidor limita arquivos estáticos a uma lista explícita e mantém token do Instagram no backend. | 13 testes unitários e 8 E2E passaram, inclusive Chromium/Firefox/WebKit 320/390 px. Antes de exposição pública, conferir cabeçalhos HTTP, cache e uso de domínio/HTTPS. |

## Evidência dos testes

- `elianefashion-netlify-template`: build e 2 testes aprovados.
- `dainty-horse-23162a`: 9 testes aprovados.
- `eleicoes-goias-2026`: instalação limpa e testes aprovados; 1 alerta alto antes da atualização transitiva e 0 depois, com o lockfile atualizado.
- `pg-tech-storefront`: instalação e `npm run check` concluídos; 119 testes aprovados, `npm audit` com 0 alertas.
- `Cuidador-a-`: `npm run build` concluído, incluindo verificações sintáticas, testes do projeto, build da página e testes de publicação; `npm audit` com 0 alertas.
- `universo-pablo-builds`: 12 testes aprovados.
- `PG-Bot-Homologacao`: 37 testes aprovados com `node --test tests/core-tests.cjs`.
- `loja-roupa-publicacoes`: 13 unitários e 8 E2E aprovados. Os E2E incluem 320/390 px nos três motores.
- `pg-tech-operacoes`: 3 testes primeiro falharam no código original e passaram após correções. Playwright manual automatizado: 6 de 6 combinações de navegador e largura aprovadas, sem overflow ou erros de página.

## Ordem segura de execução

1. Revisar e integrar a PR #15 de `eleicoes-goias-2026` apenas depois dos checks na HEAD final. A mudança é só no lockfile de dependências.
2. Revisar esta PR de `pg-tech-operacoes`, validar os testes da HEAD, adicionar CI com permissão apropriada e confirmar se preserva o estado local anterior. O painel continua **local**, sem sincronização multiusuário.
3. Homologar autenticação e backend real dos dois projetos Eliane; não tratar preview como pagamento operacional.
4. Revisar segurança e privacidade do `Cuidador-a-` em condições reais, com Android físico e comportamento offline/segundo plano.
5. Medir recursos de produção, acessibilidade, LCP, CLS e INP do Storefront e da Homologação; a soma de arquivos fonte não substitui essa medição.
6. Consolidar repositórios apenas documentais e atualizar links, evitando declarar projetos duplicados como sistemas independentes.

## Limitações importantes

- A auditoria alcança somente os repositórios visíveis na conta GitHub conectada, não inclui outros proprietários, Bitbucket nem pastas locais fora dos 11 checkouts.
- `npm audit` foi executado nos quatro projetos com lockfile pertinentes: `eleicoes-goias-2026`, `pg-tech-storefront`, `loja-roupa-publicacoes` e `Cuidador-a-`.
- A triagem estática não demonstra ausência de falhas de autorização, API ou XSS, e os testes locais não comprovam produção, deploy ou aprovação de PR.
- Não foram feitos testes de carga, Lighthouse em todas as páginas, Android físico, auditoria profunda linha a linha dos 11 projetos nem análise de infraestrutura externa nesta rodada.`r`n- O push de `.github/workflows/quality.yml` foi recusado por falta do escopo OAuth `workflow`. O arquivo foi excluído da PR; comando `npm run check` e os testes permanecem disponíveis.

## PRs geradas

- Eleições Goiás 2026: https://github.com/pabloguilherme1121/eleicoes-goias-2026/pull/15
- Central de Operações: esta PR, aberta como rascunho para validação.

## Aprofundamento de código e QA em navegadores, 06/11/2026

Esta é uma atualização do inventário anterior. Os testes foram executados em checkouts limpos no Windows 11 com Node 24.19.0, e os testes de interface foram isolados em HTTP local. Isso não comprova deploy ou teste em Android físico.

### Cuidador(a)

- Defeito confirmado: POST /api/rooms com corpo JSON null lançava TypeError em cloudflare/worker.mjs, em vez de retornar HTTP 400. Teste RED reproduziu o defeito.
- Correção mínima: validar objeto não nulo e rejeitar arrays antes de acessar id, authHash e readHash. Teste GREEN incluído no teste existente de API.
- npm run build passou com 73 testes da aplicação e 5 testes de publicação; npm audit encontrou 0 vulnerabilidades.
- PR em rascunho: https://github.com/pabloguilherme1121/Cuidador-a-/pull/49. Run 42314853357 de qualidade e segurança na HEAD consultada: success.
- Pendente: Android físico, notificações em segundo plano, infraestrutura e confirmação de publicação.

### Eliane Fashion (dainty-horse-23162a)

- Defeito confirmado: innerHTML interpretava HTML não escapado nos dados de stories, pedidos e cupons no admin demonstrativo. Três testes RED falharam.
- Correção mínima: escape dos campos antes da interpolação. npm run check passou com 12 testes.
- PR em rascunho: https://github.com/pabloguilherme1121/dainty-horse-23162a/pull/6. Run 42315038212 na HEAD consultada: success.
- Bloqueio antes de operação real: admin.html é demonstrativo, publica senha admin123 e mantém o estado em localStorage; não é autenticação server-side.

### PG Bot Homologação

- Versão inspecionada: 3b60f54. 37 testes Node anteriores permanecem aprovados.
- Teste HTTP local em Chromium, Firefox e WebKit, 320 e 390 px, com fixtures da API pública GitHub: 6/6 cenários passaram sem overflow ou erros JS; exibição de 3 projetos, 4 PRs e 3 runs simulados.
- Teste adicional entre duas abas de mesma origem em Chromium: conflito detectado e sobrescrita impedida, aprovado. Total adicional: 7/7 cenários de navegador.
- Esses testes não executam motores de jogo, não consultam estado real das PRs e não comprovam Android físico.

### PG Tech Storefront

- Orçamento de recursos: 593.936 bytes de imagens únicas de exibição (22 arquivos), 101.181 bytes de CSS e 138.478 bytes de JS. Não representa tráfego ou Core Web Vitals de produção.
- Achado real em axe-core: label-content-name-mismatch no cabeçalho; texto visual PGTECH com seta decorativa não estava incluído de maneira correspondente no nome acessível (WCAG 2.5.3).
- Correção da marca e teste RED/GREEN. npm run check passou com 120 testes e build; npm audit retornou 0 alertas.
- PR em rascunho: https://github.com/pabloguilherme1121/pg-tech-storefront/pull/19. Run 42315933507 concluído com success na HEAD após nova consulta. Continua sem comprovar deploy.
- Playwright e axe em Chromium/Firefox/WebKit, 320/390 px: 6/6 verificações isoladas aprovadas, com contraste desativado nessa medição para separar o problema de nome acessível.
- O WebKit apresentou contraste instável enquanto estilos carregavam em laboratório. A análise completa de contraste e WCAG AA permanece pendente.
- Preparação comercial: 7 exemplos, 0 ofertas reais; dados cadastrais, horários e oferta autorizada ainda pendentes.

### Sequência segura

Revisar PRs #49, #6 e #19 na HEAD final; completar contraste em navegador real; impedir administração fictícia de ser tratada como produção; homologar Android físico para Cuidador(a) e PG Bot; medir LCP, CLS e INP das URLs efetivamente publicadas.

Não houve merge nem deploy nesta rodada. Os demais repositórios preservam os resultados e as limitações da seção inicial.
