# Social App

Este projeto tem como objetivo desenvolver uma plataforma fictícia na qual pessoas podem criar um perfil público e realizar postagens, tal como no Twitter.

Demo: https://bubble-social-app.netlify.app/login

## Fluxo básico

Inicial:
- Cadastrar usuário ou Autenticar usuário

Dado o acesso o usuário poderá:
- Visualizar todas as postagens
- Editar o próprio perfil
- Curtir ou descurtir uma postagem
- Criar uma postagem
- Deletar uma postagem própria
- Comentar uma postagem
- Visualizar perfil e postagens de outros usuários
- Sair

## Tecnologias :rocket: 

<table border="0">
 <tr>
    <td width="300px"><b style="font-size:30px"> Front:</b></td>
    <td width="300px"><b style="font-size:30px"> Back:</b></td>
 </tr>
 <tr>
    <td> 
     - React JS <br/>
     - Axios <br/>
     - React Router <br/>
     - Dotenv <br/>
     - Redux, React-redux e Redux Thunk <br/>
     - Material UI core <br/>
     - Material UI icons <br/>
     - Dayjs <br/>
  </td>
    <td>
     - Node.js <br/>
     - Express <br/>
     - Firebase (Firestore, Auth, Cloud Storage...) <br/>
     - Cors <br/>
     - Dotenv <br/>
     - Celebrate <br/>
     - Multer <br/>
  </td>
 </tr>
</table>
 
## Testando

Para clonar o repositório em sua máquina:
```sh
   git clone https://github.com/fernndes/socialapp-frontend
```
Para rodar o projeto:
```sh
  cd socialapp-frontend
  npm start 
```

## Imagens :house:

<h1 align="center">
  <img src="https://user-images.githubusercontent.com/59981795/120333107-c090e800-c2c5-11eb-852f-22fdaaab758d.png" width="400"/>
  <img src="https://user-images.githubusercontent.com/59981795/120333267-e6b68800-c2c5-11eb-86bb-dda0179dcf39.png" width="400"/>
  <img src="https://user-images.githubusercontent.com/59981795/120333431-0ea5eb80-c2c6-11eb-8d5b-ca1957bcbdbf.png" width="400"/>
  <img src="https://user-images.githubusercontent.com/59981795/120333603-3bf29980-c2c6-11eb-85a1-cc9f70e4a0ed.png" width="400"/>
  <img src="https://user-images.githubusercontent.com/59981795/120333684-5167c380-c2c6-11eb-9c2c-37d3cef9100a.png" width="400"/>
</h1>

## Etapas de desenvolvimento :bookmark_tabs:

A primeira etapa de desenvolvimento se deu pelo backend da aplicação e posteriormente o frontend.

## Backend

O backend da aplicação pode ser encontrado em https://github.com/fernndes/socialapp-backend.

Etapas:

- [x] Configurações iniciais do Firebase
- [x] Configurações básicas do Express
- [x] Implementação do Firebase para Registro e Autenticação de usuários
- [x] Implementação da funcionalidade de criar e solicitar postagens
- [x] Middleware para validação do Token de acesso
- [x] Upload de imagem com a lib Multer
- [x] Implementação do perfil de usuário
- [x] Comentários nas postagens
- [x] Like e Unlike nas postagens
- [x] Deletar minhas postagens
- [x] Refatoração e otimização

## Frontend

Etapas:

- [x] Criando projeto React e configurações iniciais
- [x] Componente: Cards para exibir postagens
- [x] Formulário de Login
- [x] Formulário de Cadastro
- [x] Implementação do Redux e authenticação de usuário com token de acesso
- [x] Axios para conexão com o backend
- [x] Exibir perfil do usuário autenticado
- [x] Implementação da funcionalidade para trocar a imagem de perfil
- [x] Logout e edição de perfil (Componente)
- [x] Componente: NavBar
- [x] Componente: Like e Unlike
- [x] Componente: Delete Button
- [x] Componente: Comment
- [x] Component: Post para adicionar postagens
- [x] Exibir comentários (Componente popup)
- [x] Adicionar comentários
- [x] Exibir perfil do usuário da postagem
- [x] Refatoração e correção de pequenos bugs
- [x] Redesenhar UI
- [x] Deploy

## Créditos :star:
Este projeto foi baseado em uma video aula fornecida pelo canal freeCampCode.org cujo link https://www.youtube.com/watch?v=m_u6P5k0vP0.<br/>Realizei algumas alterações para aprendizado, um exemplo foi utilizar a lib celebrate para validação ao invés de utilizar Helper Functions como nos videos, e ainda realizei uma reformulação no design de algumas páginas e modifiquei a paleta de cores. 
