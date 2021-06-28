# PerguntaAí - Plataforma de Q&A em tempo real 🗣❔

![mock1](https://user-images.githubusercontent.com/71772559/123696082-ba911700-d831-11eb-87e9-5ac47f79d3eb.png)

## 📚 Informações sobre o projeto

* O PerguntaAí (originalmente Letmeask) foi desenvolvido durante a Next Level Week Together da Rocketseat!

&nbsp;

## 💻 Funcionalidades iniciais do projeto

* Criação de contas via google, usando o serviço de autenticação do Firebase;
* Criação de salas únicas e compartilháveis, onde os usuários podem perguntar em tempo real para o administrador da sala interagir em sua live stream;

&nbsp;

## 👨🏻‍💻 Funcionalidades desenvolvidas por mim, para levar o projeto ao próximo nível
* Página "My Rooms" onde o usuário logado consegue ver a lista de salas criadas, podendo acessar as mesmas;
* Convertido todos os estilos da aplicação (de SASS para Styled Components);
* Adicionado o modal de remoção, que sugerido como desafio no final do evento;
* Thema Light e dark (Paleta totalmente diferente do tema originalmente feito);
* Re-design da logotipo/nome do projeto;
* Possibilidade de deslogar da aplicação
* Verificações que estavam ausente (Acessar uma sala administrativa sem permissões, acessar sala que já foi finalizada e etc...);
* Perguntas ordenadas da seguinte maneira: Marcadas como destaque => Maior quantidade de likes => Mais recentes => Respondidas;
* Responsividade total da aplicação;
* Versão PWA;
* SEO básico;

![mock2](https://user-images.githubusercontent.com/71772559/123698391-7f441780-d834-11eb-8d8a-f1382a6abced.png)

&nbsp;

## 🛠️ Tecnologias/Ferramentas ultilizadas

* [React](https://pt-br.reactjs.org/E)
* [Next Auth](https://next-auth.js.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Styled Components](https://styled-components.com/)

![ezgif com-optimize (2)](https://user-images.githubusercontent.com/71772559/109437018-7a479680-7a01-11eb-9f7b-23cd97c875e6.gif)

&nbsp;

## 🖌️ Layouts usados nesse projeto
* [Move.it 1.0 (Desenvolvido em aula)](https://www.figma.com/file/pZbJns12UgFmKhXKDPTli4/Move.it-1.0-(Copy))
* [Move.it 2.0 (Deixado como desafio)](https://www.figma.com/file/v98FU24x8P7z0nguwTh3pU/Move.it-2.0-(Copy)?node-id=160%3A2761)

&nbsp;

## 🖥 Todas as páginas da aplicação

![allpages](https://user-images.githubusercontent.com/71772559/110255830-7e7d3200-7f74-11eb-99c5-d5e060af60b2.png)

&nbsp;

## ⚙️ Instalação
```
# Abra um terminal e copie este repositório com o comando
$ git clone https://github.com/GBDev13/moveit.git
```

```
# Acesse a pasta da aplicação
$ cd moveit

# Crie um arquivo .env.local e coloque as variaveis
# de ambiente baseado no arquivo .env.example que
# se encontra na pasta moveit

# Instale as dependências
$ yarn install

# Inicie a aplicação
$ yarn start



## Como alterar o tempo do timer? (Está como 6 segundos para testes práticos)
## Abra o arquivo src/contexts/CountdownContext.tsx
## Lá você irá encontrar essas linhas:

const [time, setTime] = useState(0.1 * 60)
setTime(0.1 * 60);

## Para retornar aos 25 minutos, apenas altere o 0.1 para 25

## Também é necessário alterar o tempo da barra de progresso, para
## fazer essa alteração, acesse o arquivo src/styles/components/ButtonStyles.tsx
## Lá você irá encontrar essa linha:

animation: roundtime calc(6 * 1s) linear forwards;

## Para retornar aos 25 minutos, altere de 6 * 1s para 1500 * 1s



# Deploy na Vercel (INFORMAÇÃO SUPER IMPORTANTE)
# Para o sistema de compartilhamento no twitter funcionar
# é necessário usar a versão do Node 12.x, que pode ser alterada nas
# configurações do seu projeto
```

&nbsp;

### 🔗 Link para o projeto online


[MoveIt](https://moveit-eight-omega.vercel.app)

&nbsp;

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo de [LICENÇA](https://github.com/GBDev13/moveit/blob/main/LICENSE) para detalhes.


---

<p align="center">Feito com 💙 por Gabriel Borges</p>


