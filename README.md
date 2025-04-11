# Meta 100k

Aplicativo para acompanhamento de progresso financeiro com apostas esportivas, visando alcançar a meta de R$100.000.

## Características

- Dashboard para visualização de estatísticas
- Acompanhamento de apostas e saldo atual
- Cálculo de estimativas para atingir a meta
- Análise de desempenho das apostas

## 🚀 Tecnologias

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 💻 Desenvolvimento

Para começar a desenvolver o projeto:

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🏗️ Compilação

Para compilar o projeto para produção:

```bash
npm run build
```

## 🌐 Deploy no Netlify

Este projeto está configurado para fácil deploy no Netlify.

### Opção 1: Deploy via Interface do Netlify

1. Faça login ou crie uma conta no [Netlify](https://app.netlify.com/)
2. Clique em "New site from Git"
3. Conecte sua conta do GitHub, GitLab ou Bitbucket
4. Selecione o repositório deste projeto
5. Configure as opções de build:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Clique em "Deploy site"

### Opção 2: Deploy via Netlify CLI

1. Instale o Netlify CLI:

```bash
npm install -g netlify-cli
```

2. Autentique sua conta:

```bash
netlify login
```

3. Inicie o processo de deploy:

```bash
netlify deploy
```

4. Siga as instruções para configurar o site
5. Para o deploy de produção:

```bash
netlify deploy --prod
```

### Configurações Específicas

O arquivo `netlify.toml` já contém todas as configurações necessárias para o deploy adequado de uma aplicação Next.js no Netlify, incluindo:

- Configurações de build
- Configurações do plugin Next.js
- Redirecionamentos para client-side routing

## 🧪 Testes

Para executar os testes:

```bash
npm test
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
