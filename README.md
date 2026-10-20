# LogiTrack — Torre de controle Angular

**Visibilidade da frota, acompanhamento de entregas e tratamento de atrasos em uma única experiência operacional.**

Frontend do LogiTrack, projeto de portfólio alinhado à vaga de [Desenvolvedor(a) Java + Angular Sênior da Softtek](https://softtek.eightfold.ai/careers/job/893397755425).

> Status: T01 concluída. Aplicação Angular executável, com tela inicial e verificação de disponibilidade da API. Fretes, mapa, autenticação e incidentes continuam planejados.

## Experiência planejada

- Operador: cadastrar fretes, consultar cotação via API integrada a SOAP e acompanhar entregas e incidentes.
- Motorista: consultar apenas seus próprios fretes e posições.
- Diretor: consultar indicadores agregados de operação e custos contratados.

Angular, TypeScript e Material formarão a interface; Signals manterá o estado da tela e RxJS coordenará chamadas, filtros e atualização do mapa Leaflet. Interceptor e guards cuidarão da experiência de autenticação; a API fará a autorização por perfil e recurso.

O MVP começa com atualização periódica. WebSocket, reconexão e controle da frequência de renderização entram após a demonstração inicial.

## Desenvolvimento em etapas

O planejamento central está no repositório irmão `logitrack-backend`, em `docs/PLANO.md`.

| Tarefa | Entrega no frontend |
| --- | --- |
| T01 | Fundação Angular, versões fixadas e instruções de execução |
| T05 | Login, navegação, filtros, formulário e consumo da API |
| T06 | Mapa, posições simuladas e tratamento de incidentes |
| T07 | Indicadores, teste ponta a ponta, CI e demonstração documentada |
| T08 | Streaming com RxJS e recuperação após reconexão |

Cada tarefa inclui validação e documentação antes da seguinte.

## Executar localmente

Versões: Node 24.22.0 (`.nvmrc`), npm 11, Angular/CLI 22.2.3 e TypeScript 6.0.2. Dependências diretas fixadas e árvore de instalação em `package-lock.json`.

Primeiro, inicie PostgreSQL e backend seguindo o README de `logitrack-backend`. Depois, neste diretório:

```sh
nvm install
nvm use
npm ci
npm start
```

Se já usa Node 24.22.0, os comandos `nvm` são dispensáveis. Abra [LogiTrack local](http://localhost:4200). O estado **Serviço disponível** confirma a comunicação Angular → proxy → API → PostgreSQL.

O proxy em `proxy.conf.json` encaminha `/api/**` para `http://127.0.0.1:8080`. Se o backend estiver desligado, a tela informa indisponibilidade e permite tentar novamente. Esse proxy é de desenvolvimento; em produção será necessário configurar o encaminhamento de `/api`.

## Validar

```sh
npm run build
npm run format:check
```

O build fica em `dist/logitrack-frontend/browser`. Nesta etapa, a validação da interface foi manual no navegador, incluindo consulta à API e nova tentativa pelo botão. Testes automatizados de negócio e ponta a ponta entram nas tarefas correspondentes.

Ainda não há login, dados operacionais, Angular Material ou mapa. A tela identifica as funcionalidades futuras como **Em desenvolvimento**.
