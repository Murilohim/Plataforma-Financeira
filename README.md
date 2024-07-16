# ![logo](https://github.com/user-attachments/assets/ceb99fe2-6630-4ecf-b132-ae0bed801bb6)<svg id="logo-70" width="78" height="30" viewBox="0 0 78 30" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M18.5147 0C15.4686 0 12.5473 1.21005 10.3934 3.36396L3.36396 10.3934C1.21005 12.5473 0 15.4686 0 18.5147C0 24.8579 5.14214 30 11.4853 30C14.5314 30 17.4527 28.7899 19.6066 26.636L24.4689 21.7737C24.469 21.7738 24.4689 21.7736 24.4689 21.7737L38.636 7.6066C39.6647 6.57791 41.0599 6 42.5147 6C44.9503 6 47.0152 7.58741 47.7311 9.78407L52.2022 5.31296C50.1625 2.11834 46.586 0 42.5147 0C39.4686 0 36.5473 1.21005 34.3934 3.36396L15.364 22.3934C14.3353 23.4221 12.9401 24 11.4853 24C8.45584 24 6 21.5442 6 18.5147C6 17.0599 6.57791 15.6647 7.6066 14.636L14.636 7.6066C15.6647 6.57791 17.0599 6 18.5147 6C20.9504 6 23.0152 7.58748 23.7311 9.78421L28.2023 5.31307C26.1626 2.1184 22.5861 0 18.5147 0Z" class="ccustom" fill="#fff"></path> <path d="M39.364 22.3934C38.3353 23.4221 36.9401 24 35.4853 24C33.05 24 30.9853 22.413 30.2692 20.2167L25.7982 24.6877C27.838 27.8819 31.4143 30 35.4853 30C38.5314 30 41.4527 28.7899 43.6066 26.636L62.636 7.6066C63.6647 6.57791 65.0599 6 66.5147 6C69.5442 6 72 8.45584 72 11.4853C72 12.9401 71.4221 14.3353 70.3934 15.364L63.364 22.3934C62.3353 23.4221 60.9401 24 59.4853 24C57.0498 24 54.985 22.4127 54.269 20.2162L49.798 24.6873C51.8377 27.8818 55.4141 30 59.4853 30C62.5314 30 65.4527 28.7899 67.6066 26.636L74.636 19.6066C76.7899 17.4527 78 14.5314 78 11.4853C78 5.14214 72.8579 0 66.5147 0C63.4686 0 60.5473 1.21005 58.3934 3.36396L39.364 22.3934Z" class="ccustom" fill="#fff"></path> </svg> Plataforma SaaS Financeira: Gestão de Rendas e Despesas



## :memo: Descrição

Este repositório contém um projeto full stack desenvolvido para gerenciar suas finanças pessoais. A plataforma permite o acompanhamento de rendas e despesas, categorização de transações e atribuição a contas específicas, além de importar transações através de um arquivo CSV.

# 🔗 Link para acessar

- [Finance](https://plataforma-financeira.vercel.app/)
- [Demonstração do Projeto](https://www.loom.com/share/8ab2cbe3fdf4448bb7b0984f71002fa9?sid=bb6db097-4083-4c30-a7b7-2d289c267e87)


## :books: Funcionalidades

### Front-end

- **Dashboard Financeiro Interativo**: Visualize suas finanças de forma clara e dinâmica.
- **Tipos de Gráficos Variáveis**: Alterne entre diferentes tipos de gráficos para melhor visualização dos dados.
- **Filtros por Conta e Data**: Filtre transações por contas específicas e intervalos de datas.
- **Tabela de Transações Detalhadas**: Visualize todas as transações com detalhes.
- **Formulário para Adicionar Transações**: Adicione novas transações facilmente.
- **Componentes de Seleção Personalizáveis**: Customize os componentes de seleção para melhor usabilidade.
- **Alternância de Renda e Despesa**: Visualize separadamente suas rendas e despesas.
- **Importação de Transações via CSV**: Importe transações diretamente de um arquivo CSV.
- **Autenticação via Clerk**: Sistema de autenticação seguro.
- **Exclusão em Massa e Pesquisa de Transações**: Gerencie suas transações de forma eficiente.
- **Construído com Next.js 14**: Framework robusto para desenvolvimento web.
- **Estilizado com TailwindCSS e Shadcn UI**: Interface moderna e responsiva.
- **Gerenciamento de Estado com Tanstack React Query**: Gerencie o estado da aplicação de forma eficiente.

### Back-end

- **API via Hono.js**: API rápida e eficiente para comunicação entre front-end e back-end.
- **Banco de Dados PostgreSQL & Drizzle ORM**: Persistência de dados robusta e segura.

## :wrench: Tecnologias Utilizadas

### Front-end

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn UI](https://shadcn.dev/)
- [Tanstack React Query](https://tanstack.com/query/latest)
- [Clerk](https://clerk.dev/)
- [Lucide React](https://lucide.dev/)

### Back-end

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Hono.js](https://hono.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

## :rocket: Rodando o Projeto
```
Para rodar o projeto, siga os passos abaixo:

1. Clone o repositório em sua máquina
2. Instale as dependências com `npm install`.
3. Configure as variáveis de ambiente no arquivo `.env.local`.

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
DATABASE_URL=
NEXT_PUBLIC_APP_URL=http://localhost:3000

4. Inicie o projeto com `npm run dev`.
5. Rode o comando `npm run db:generate` para gerar os schemas das tabelas.
6. Rode o comando `npm run db:migrate` para migrar as informações.
7. Rode o comando `npm run db:seed` caso queira popular seu banco com alguns dados mockados.
```

## :soon: Implementação Futura

- Integração com Plaid para conexão com contas bancárias.
- Monetização do produto utilizando Lemon Squeezy.

## 💡 Sugestões

### Front-end

- **Testes Unitários e de Integração**: Desenvolver testes automatizados para garantir a estabilidade e o funcionamento correto das funcionalidades implementadas, utilizando ferramentas como Jest e React Testing Library.

### Back-end

- **Endpoint de Estatísticas**: Desenvolver um endpoint dedicado para fornecer estatísticas sobre transações financeiras.
- **Endpoint de Importação/Exportação**: Implementar endpoints para importar e exportar dados de transações financeiras.

## :handshake: Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="http://github.com/murilohim">
        <img src="https://avatars.githubusercontent.com/u/84817937?s=400&u=889026ba86ed2fc84b6a1719fa7fbed7b6289128&v=4" width="100px;" alt="Foto de Murilo Terenciani no GitHub"/><br>
        <sub>
          <b>Murilohim</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## :dart: Status do Projeto

🟢 Finalizado

