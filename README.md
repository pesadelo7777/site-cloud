# Efeito Web Experience

Projeto estruturado com Vinext, Vite e preparado para implantação no **Cloudflare Workers**.

### Requisitos

* Node.js 22.x
* npm
* Conta gratuita na Cloudflare
* Domínio próprio (opcional)

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Deploy manual futuro

Para publicar o projeto, você precisará executar pessoalmente:

```bash
npx wrangler login
npm run deploy
```

### GitHub e Cloudflare

Fluxo para implantação automatizada (opcional):

1. Envie o projeto manualmente ao GitHub.
2. Abra o painel da Cloudflare.
3. Acesse `Workers & Pages`.
4. Selecione `Create application`.
5. Selecione `Import a repository`.
6. Escolha o repositório.
7. Confirme que o nome do Worker coincide com o `name` (`efeito-web-experience`) do `wrangler.jsonc`.
8. Configure a branch de produção como `main`.
9. Use a configuração de deploy recomendada:
   - Build command: `(deixar vazio)`
   - Deploy command: `npm run deploy`
   - Root directory: `/`
   - Production branch: `main`

### Domínio próprio

O domínio não deve ser inserido no código.

Após a publicação, faça a vinculação do seu domínio na Cloudflare:

1. Adicione o domínio à sua conta Cloudflare e aguarde a zona ficar ativa.
2. Abra o seu Worker.
3. Acesse `Settings`.
4. Vá em `Domains & Routes`.
5. Selecione `Add`.
6. Selecione `Custom Domain`.
7. Informe o seu domínio ou subdomínio.
8. Crie um redirecionamento entre `www` e o domínio raiz no seu DNS ou no painel do Worker.

A Cloudflare irá gerar automaticamente o DNS e os certificados HTTPS necessários.
